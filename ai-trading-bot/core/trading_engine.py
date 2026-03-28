"""
CyberDreams AI Trading Bot - Trading Engine
=============================================
Zentrale Engine die alle Komponenten orchestriert.
"""

import time
import json
import os
from datetime import datetime, timedelta
from typing import Dict, List, Optional

import pandas as pd

from config.settings import TRADING_CONFIG, AI_CONFIG, RISK_CONFIG
from core.exchange import ExchangeConnector
from core.indicators import TechnicalIndicators
from models.ai_model import TradingAIModel
from utils.logger import log


class Position:
    """Repräsentiert eine offene Position."""

    def __init__(
        self,
        symbol: str,
        side: str,
        entry_price: float,
        amount: float,
        stop_loss: float,
        take_profit: float,
        timestamp: datetime = None,
    ):
        self.symbol = symbol
        self.side = side  # 'long' oder 'short'
        self.entry_price = entry_price
        self.amount = amount
        self.stop_loss = stop_loss
        self.take_profit = take_profit
        self.trailing_stop = stop_loss
        self.highest_price = entry_price
        self.lowest_price = entry_price
        self.timestamp = timestamp or datetime.now()
        self.pnl = 0.0
        self.pnl_pct = 0.0

    def update(self, current_price: float):
        """Aktualisiert die Position mit dem aktuellen Preis."""
        if self.side == "long":
            self.pnl = (current_price - self.entry_price) * self.amount
            self.pnl_pct = (current_price / self.entry_price - 1) * 100
        else:
            self.pnl = (self.entry_price - current_price) * self.amount
            self.pnl_pct = (self.entry_price / current_price - 1) * 100

        # Trailing Stop aktualisieren
        if RISK_CONFIG["trailing_stop"]:
            if self.side == "long" and current_price > self.highest_price:
                self.highest_price = current_price
                new_stop = current_price * (1 - RISK_CONFIG["trailing_stop_pct"])
                self.trailing_stop = max(self.trailing_stop, new_stop)
            elif self.side == "short" and current_price < self.lowest_price:
                self.lowest_price = current_price
                new_stop = current_price * (1 + RISK_CONFIG["trailing_stop_pct"])
                self.trailing_stop = min(self.trailing_stop, new_stop)

    def should_close(self, current_price: float) -> tuple:
        """Prüft ob die Position geschlossen werden soll."""
        self.update(current_price)

        if self.side == "long":
            if current_price <= self.trailing_stop:
                return True, "Trailing Stop-Loss"
            if current_price <= self.stop_loss:
                return True, "Stop-Loss"
            if current_price >= self.take_profit:
                return True, "Take-Profit"
        else:
            if current_price >= self.trailing_stop:
                return True, "Trailing Stop-Loss"
            if current_price >= self.stop_loss:
                return True, "Stop-Loss"
            if current_price <= self.take_profit:
                return True, "Take-Profit"

        return False, ""

    def to_dict(self) -> Dict:
        """Konvertiert zu Dictionary."""
        return {
            "symbol": self.symbol,
            "side": self.side,
            "entry_price": self.entry_price,
            "amount": self.amount,
            "stop_loss": self.stop_loss,
            "take_profit": self.take_profit,
            "trailing_stop": self.trailing_stop,
            "pnl": self.pnl,
            "pnl_pct": self.pnl_pct,
            "timestamp": str(self.timestamp),
        }


class TradingEngine:
    """
    Zentrale Trading-Engine.

    Orchestriert Exchange, Indikatoren, KI-Modell und Risikomanagement.
    """

    def __init__(self, paper_trading: bool = True):
        self.paper_trading = paper_trading
        self.exchange = ExchangeConnector(paper_trading=paper_trading)
        self.indicators = TechnicalIndicators()
        self.ai_model = TradingAIModel()

        # Portfolio-State
        self.positions: Dict[str, Position] = {}
        self.trade_history: List[Dict] = []
        self.balance = TRADING_CONFIG["initial_capital"]
        self.initial_balance = TRADING_CONFIG["initial_capital"]
        self.peak_balance = self.balance

        # Performance-Tracking
        self.total_trades = 0
        self.winning_trades = 0
        self.losing_trades = 0
        self.total_pnl = 0.0
        self.daily_pnl = 0.0
        self.daily_reset_date = datetime.now().date()

        # Status
        self.is_running = False
        self.is_paused = False
        self.last_analysis: Dict = {}
        self.cooldown_until: Optional[datetime] = None

        # Daten-Cache
        self.data_cache: Dict[str, pd.DataFrame] = {}

        log.info("🚀 Trading Engine initialisiert")
        log.info(f"   Modus: {'Paper Trading' if paper_trading else 'LIVE TRADING'}")
        log.info(f"   Startkapital: ${self.balance:,.2f}")
        log.info(f"   Symbole: {TRADING_CONFIG['symbols']}")

    def initialize(self):
        """Initialisiert die Engine: Lädt Daten und trainiert das Modell."""
        log.info("📊 Lade historische Daten und trainiere KI-Modell...")

        for symbol in TRADING_CONFIG["symbols"]:
            try:
                # Daten laden
                df = self.exchange.fetch_ohlcv(
                    symbol,
                    TRADING_CONFIG["primary_timeframe"],
                    limit=500,
                )

                if df.empty:
                    log.warning(f"Keine Daten für {symbol}")
                    continue

                # Indikatoren berechnen
                df = self.indicators.calculate_all(df)

                # Target erstellen
                self.ai_model.create_target(df)

                # Cache
                self.data_cache[symbol] = df

                log.info(f"✅ {symbol}: {len(df)} Datenpunkte geladen")

            except Exception as e:
                log.error(f"Fehler bei {symbol}: {e}")

        # Modell trainieren (mit dem größten Datensatz)
        if self.data_cache:
            # Alle Daten kombinieren für Training
            all_data = []
            for symbol, df in self.data_cache.items():
                if "target" in df.columns:
                    all_data.append(df.dropna())

            if all_data:
                combined = pd.concat(all_data, ignore_index=True)
                metrics = self.ai_model.train(combined)
                self.ai_model.save()
                log.info(f"🧠 Modell trainiert: {metrics.get('accuracy', 0):.4f} Accuracy")
            else:
                log.warning("Keine Trainingsdaten verfügbar")

    def analyze_symbol(self, symbol: str) -> Dict:
        """
        Analysiert ein Symbol und generiert ein Trading-Signal.

        Args:
            symbol: Handelspaar

        Returns:
            Analyse-Ergebnis mit Signal und Details
        """
        try:
            # Aktuelle Daten laden
            df = self.exchange.fetch_ohlcv(
                symbol, TRADING_CONFIG["primary_timeframe"], limit=200
            )

            if df.empty:
                return {"symbol": symbol, "error": "Keine Daten"}

            # Indikatoren berechnen
            df = self.indicators.calculate_all(df)

            # KI-Vorhersage
            prediction = self.ai_model.predict(df)

            # Aktueller Preis
            current_price = float(df["close"].iloc[-1])

            # Technische Zusammenfassung
            tech_summary = self._get_technical_summary(df)

            analysis = {
                "symbol": symbol,
                "timestamp": str(datetime.now()),
                "current_price": current_price,
                "ai_signal": prediction,
                "technical_summary": tech_summary,
                "recommendation": self._get_recommendation(prediction, tech_summary),
            }

            self.last_analysis[symbol] = analysis
            return analysis

        except Exception as e:
            log.error(f"Analyse-Fehler ({symbol}): {e}")
            return {"symbol": symbol, "error": str(e)}

    def _get_technical_summary(self, df: pd.DataFrame) -> Dict:
        """Erstellt eine technische Zusammenfassung."""
        latest = df.iloc[-1]

        summary = {
            "trend": "bullish" if latest.get("ema_cross_short_long", 0) > 0 else "bearish",
            "rsi": float(latest.get("rsi", 50)),
            "rsi_signal": (
                "oversold" if latest.get("rsi", 50) < 30
                else "overbought" if latest.get("rsi", 50) > 70
                else "neutral"
            ),
            "macd_signal": (
                "bullish" if latest.get("macd_histogram", 0) > 0 else "bearish"
            ),
            "bb_position": float(latest.get("bb_position", 0.5)),
            "adx": float(latest.get("adx", 0)),
            "trend_strength": (
                "strong" if latest.get("adx", 0) > 25 else "weak"
            ),
            "volume_ratio": float(latest.get("volume_ratio", 1)),
            "supertrend": (
                "bullish" if latest.get("supertrend_direction", 0) > 0 else "bearish"
            ),
            "volatility": float(latest.get("atr_pct", 0)),
        }

        # Bullish/Bearish Score
        bullish_count = sum([
            summary["trend"] == "bullish",
            summary["rsi_signal"] == "oversold",
            summary["macd_signal"] == "bullish",
            summary["bb_position"] < 0.2,
            summary["supertrend"] == "bullish",
            summary["volume_ratio"] > 1.5,
        ])

        summary["bullish_score"] = bullish_count
        summary["bearish_score"] = 6 - bullish_count

        return summary

    def _get_recommendation(self, prediction: Dict, tech_summary: Dict) -> Dict:
        """Kombiniert KI-Signal und technische Analyse zu einer Empfehlung."""
        ai_signal = prediction.get("signal", 0)
        ai_confidence = prediction.get("confidence", 0)
        bullish_score = tech_summary.get("bullish_score", 3)

        # Gewichtete Kombination
        combined_score = (ai_signal * ai_confidence * 0.6) + (
            (bullish_score - 3) / 3 * 0.4
        )

        if combined_score > 0.3:
            action = "BUY"
            strength = min(combined_score, 1.0)
        elif combined_score < -0.3:
            action = "SELL"
            strength = min(abs(combined_score), 1.0)
        else:
            action = "HOLD"
            strength = 1 - abs(combined_score)

        return {
            "action": action,
            "strength": float(strength),
            "combined_score": float(combined_score),
            "ai_weight": 0.6,
            "technical_weight": 0.4,
        }

    def execute_trade(self, symbol: str, analysis: Dict) -> Optional[Dict]:
        """
        Führt einen Trade basierend auf der Analyse aus.

        Args:
            symbol: Handelspaar
            analysis: Analyse-Ergebnis

        Returns:
            Trade-Details oder None
        """
        # Cooldown prüfen
        if self.cooldown_until and datetime.now() < self.cooldown_until:
            log.debug(f"Cooldown aktiv bis {self.cooldown_until}")
            return None

        # Drawdown prüfen
        if self._check_max_drawdown():
            log.warning("⚠️ Maximaler Drawdown erreicht - Trading pausiert")
            self.is_paused = True
            return None

        # Täglichen Verlust prüfen
        if self._check_daily_loss():
            log.warning("⚠️ Maximaler täglicher Verlust erreicht")
            return None

        recommendation = analysis.get("recommendation", {})
        action = recommendation.get("action", "HOLD")
        strength = recommendation.get("strength", 0)
        current_price = analysis.get("current_price", 0)

        if action == "HOLD" or current_price <= 0:
            return None

        # Position-Sizing
        position_size = self._calculate_position_size(current_price)

        if position_size < TRADING_CONFIG["min_trade_amount"]:
            log.debug(f"Position zu klein: ${position_size:.2f}")
            return None

        amount = position_size / current_price

        if action == "BUY" and symbol not in self.positions:
            if len(self.positions) >= TRADING_CONFIG["max_positions"]:
                log.debug("Maximale Positionen erreicht")
                return None

            # Stop-Loss und Take-Profit berechnen
            stop_loss = current_price * (1 - RISK_CONFIG["stop_loss_pct"])
            take_profit = current_price * (1 + RISK_CONFIG["take_profit_pct"])

            # Order erstellen
            order = self.exchange.create_order(
                symbol, "market", "buy", amount
            )

            if "error" not in order:
                self.positions[symbol] = Position(
                    symbol=symbol,
                    side="long",
                    entry_price=current_price,
                    amount=amount,
                    stop_loss=stop_loss,
                    take_profit=take_profit,
                )
                self.balance -= position_size

                trade = {
                    "type": "BUY",
                    "symbol": symbol,
                    "price": current_price,
                    "amount": amount,
                    "value": position_size,
                    "stop_loss": stop_loss,
                    "take_profit": take_profit,
                    "confidence": analysis["ai_signal"]["confidence"],
                    "timestamp": str(datetime.now()),
                }
                self.trade_history.append(trade)
                self.total_trades += 1

                log.info(
                    f"🟢 BUY {symbol} @ ${current_price:,.2f} | "
                    f"Menge: {amount:.6f} | Wert: ${position_size:,.2f} | "
                    f"SL: ${stop_loss:,.2f} | TP: ${take_profit:,.2f}"
                )
                return trade

        elif action == "SELL" and symbol in self.positions:
            return self._close_position(symbol, current_price, "KI-Signal: SELL")

        return None

    def check_positions(self):
        """Prüft alle offenen Positionen auf Stop-Loss/Take-Profit."""
        symbols_to_close = []

        for symbol, position in self.positions.items():
            try:
                ticker = self.exchange.fetch_ticker(symbol)
                if not ticker:
                    continue

                current_price = ticker.get("last", 0)
                if current_price <= 0:
                    continue

                should_close, reason = position.should_close(current_price)

                if should_close:
                    symbols_to_close.append((symbol, current_price, reason))

            except Exception as e:
                log.error(f"Position-Check Fehler ({symbol}): {e}")

        # Positionen schließen
        for symbol, price, reason in symbols_to_close:
            self._close_position(symbol, price, reason)

    def _close_position(
        self, symbol: str, current_price: float, reason: str
    ) -> Optional[Dict]:
        """Schließt eine Position."""
        if symbol not in self.positions:
            return None

        position = self.positions[symbol]
        position.update(current_price)

        # Sell-Order
        order = self.exchange.create_order(
            symbol, "market", "sell", position.amount
        )

        if "error" in order:
            return None

        # PnL berechnen
        pnl = position.pnl
        pnl_pct = position.pnl_pct
        sell_value = current_price * position.amount

        self.balance += sell_value
        self.total_pnl += pnl
        self.daily_pnl += pnl

        if pnl > 0:
            self.winning_trades += 1
            emoji = "💰"
        else:
            self.losing_trades += 1
            emoji = "📉"
            # Cooldown nach Verlust
            self.cooldown_until = datetime.now() + timedelta(
                minutes=RISK_CONFIG["loss_cooldown_minutes"]
            )

        # Peak-Balance aktualisieren
        self.peak_balance = max(self.peak_balance, self.balance)

        trade = {
            "type": "SELL",
            "symbol": symbol,
            "price": current_price,
            "amount": position.amount,
            "value": sell_value,
            "entry_price": position.entry_price,
            "pnl": pnl,
            "pnl_pct": pnl_pct,
            "reason": reason,
            "timestamp": str(datetime.now()),
        }
        self.trade_history.append(trade)

        log.info(
            f"{emoji} SELL {symbol} @ ${current_price:,.2f} | "
            f"PnL: ${pnl:,.2f} ({pnl_pct:+.2f}%) | Grund: {reason}"
        )

        del self.positions[symbol]
        return trade

    def _calculate_position_size(self, current_price: float) -> float:
        """Berechnet die optimale Positionsgröße (Kelly-Criterion-basiert)."""
        max_risk = self.balance * RISK_CONFIG["max_risk_per_trade"]

        # Basierend auf Stop-Loss
        stop_loss_amount = current_price * RISK_CONFIG["stop_loss_pct"]
        if stop_loss_amount > 0:
            risk_based_size = max_risk / RISK_CONFIG["stop_loss_pct"]
        else:
            risk_based_size = max_risk

        # Maximale Positionsgröße (nicht mehr als 30% des Portfolios)
        max_position = self.balance * 0.30

        return min(risk_based_size, max_position)

    def _check_max_drawdown(self) -> bool:
        """Prüft ob der maximale Drawdown überschritten wurde."""
        if self.peak_balance <= 0:
            return False
        drawdown = (self.peak_balance - self.balance) / self.peak_balance
        return drawdown >= RISK_CONFIG["max_drawdown"]

    def _check_daily_loss(self) -> bool:
        """Prüft den täglichen Verlust."""
        today = datetime.now().date()
        if today != self.daily_reset_date:
            self.daily_pnl = 0.0
            self.daily_reset_date = today

        if self.initial_balance <= 0:
            return False
        daily_loss_pct = abs(min(self.daily_pnl, 0)) / self.initial_balance
        return daily_loss_pct >= RISK_CONFIG["max_daily_loss"]

    def run_cycle(self) -> Dict:
        """
        Führt einen kompletten Trading-Zyklus aus.

        Returns:
            Zyklus-Ergebnis mit allen Analysen und Trades
        """
        cycle_result = {
            "timestamp": str(datetime.now()),
            "analyses": {},
            "trades": [],
            "portfolio": self.get_portfolio_status(),
        }

        if self.is_paused:
            log.info("⏸️ Trading ist pausiert")
            cycle_result["status"] = "paused"
            return cycle_result

        # Retrain prüfen
        if self.ai_model.needs_retrain():
            log.info("🔄 Modell-Retrain wird durchgeführt...")
            self.initialize()

        # Positionen prüfen
        self.check_positions()

        # Alle Symbole analysieren
        for symbol in TRADING_CONFIG["symbols"]:
            try:
                analysis = self.analyze_symbol(symbol)
                cycle_result["analyses"][symbol] = analysis

                # Trade ausführen
                trade = self.execute_trade(symbol, analysis)
                if trade:
                    cycle_result["trades"].append(trade)

            except Exception as e:
                log.error(f"Zyklus-Fehler ({symbol}): {e}")

        cycle_result["portfolio"] = self.get_portfolio_status()
        cycle_result["status"] = "active"

        return cycle_result

    def get_portfolio_status(self) -> Dict:
        """Gibt den aktuellen Portfolio-Status zurück."""
        # Offene Positionen bewerten
        open_positions_value = 0
        positions_list = []

        for symbol, pos in self.positions.items():
            try:
                ticker = self.exchange.fetch_ticker(symbol)
                if ticker:
                    current_price = ticker.get("last", pos.entry_price)
                    pos.update(current_price)
                    open_positions_value += current_price * pos.amount
                    positions_list.append({
                        **pos.to_dict(),
                        "current_price": current_price,
                    })
            except Exception:
                open_positions_value += pos.entry_price * pos.amount
                positions_list.append(pos.to_dict())

        total_value = self.balance + open_positions_value
        total_return = (total_value / self.initial_balance - 1) * 100

        win_rate = (
            self.winning_trades / max(self.total_trades, 1) * 100
        )

        return {
            "balance": self.balance,
            "open_positions_value": open_positions_value,
            "total_value": total_value,
            "initial_capital": self.initial_balance,
            "total_return_pct": total_return,
            "total_pnl": self.total_pnl,
            "daily_pnl": self.daily_pnl,
            "total_trades": self.total_trades,
            "winning_trades": self.winning_trades,
            "losing_trades": self.losing_trades,
            "win_rate": win_rate,
            "open_positions": positions_list,
            "max_drawdown": (
                (self.peak_balance - self.balance) / max(self.peak_balance, 1) * 100
            ),
            "is_running": self.is_running,
            "is_paused": self.is_paused,
            "model_info": self.ai_model.get_model_info(),
        }

    def get_trade_history(self) -> List[Dict]:
        """Gibt die Trade-Historie zurück."""
        return self.trade_history

    def save_state(self, filepath: str = "data/bot_state.json"):
        """Speichert den Bot-Status."""
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        state = {
            "balance": self.balance,
            "total_pnl": self.total_pnl,
            "total_trades": self.total_trades,
            "winning_trades": self.winning_trades,
            "losing_trades": self.losing_trades,
            "peak_balance": self.peak_balance,
            "trade_history": self.trade_history[-100:],  # Letzte 100 Trades
            "positions": {s: p.to_dict() for s, p in self.positions.items()},
            "timestamp": str(datetime.now()),
        }
        with open(filepath, "w") as f:
            json.dump(state, f, indent=2)
        log.debug(f"Status gespeichert: {filepath}")

    def load_state(self, filepath: str = "data/bot_state.json"):
        """Lädt den Bot-Status."""
        if not os.path.exists(filepath):
            return

        with open(filepath, "r") as f:
            state = json.load(f)

        self.balance = state.get("balance", self.balance)
        self.total_pnl = state.get("total_pnl", 0)
        self.total_trades = state.get("total_trades", 0)
        self.winning_trades = state.get("winning_trades", 0)
        self.losing_trades = state.get("losing_trades", 0)
        self.peak_balance = state.get("peak_balance", self.balance)
        self.trade_history = state.get("trade_history", [])

        log.info(f"📂 Status geladen: Balance=${self.balance:,.2f}")
