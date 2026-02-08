"""
CyberDreams AI Trading Bot - Backtesting Engine
==================================================
Umfassendes Backtesting-System für Strategie-Validierung.
"""

import numpy as np
import pandas as pd
from datetime import datetime
from typing import Dict, List, Optional

from config.settings import BACKTEST_CONFIG, RISK_CONFIG, TRADING_CONFIG
from core.indicators import TechnicalIndicators
from models.ai_model import TradingAIModel
from strategies.strategies import MultiStrategyManager
from utils.logger import log


class BacktestResult:
    """Speichert und analysiert Backtesting-Ergebnisse."""

    def __init__(self):
        self.trades: List[Dict] = []
        self.equity_curve: List[float] = []
        self.timestamps: List = []
        self.initial_capital = 0.0
        self.final_capital = 0.0

    def calculate_metrics(self) -> Dict:
        """Berechnet umfassende Performance-Metriken."""
        if not self.trades:
            return {"error": "Keine Trades"}

        pnls = [t["pnl"] for t in self.trades if "pnl" in t]
        returns = [t["return_pct"] for t in self.trades if "return_pct" in t]

        winning = [p for p in pnls if p > 0]
        losing = [p for p in pnls if p < 0]

        total_return = (
            (self.final_capital / self.initial_capital - 1) * 100
            if self.initial_capital > 0
            else 0
        )

        # Sharpe Ratio (annualisiert)
        if returns:
            avg_return = np.mean(returns)
            std_return = np.std(returns) if len(returns) > 1 else 1
            sharpe = (avg_return / std_return) * np.sqrt(252) if std_return > 0 else 0
        else:
            sharpe = 0

        # Max Drawdown
        max_dd = self._calculate_max_drawdown()

        # Sortino Ratio
        downside_returns = [r for r in returns if r < 0]
        downside_std = np.std(downside_returns) if downside_returns else 1
        sortino = (
            (np.mean(returns) / downside_std) * np.sqrt(252)
            if downside_std > 0 and returns
            else 0
        )

        # Profit Factor
        gross_profit = sum(winning) if winning else 0
        gross_loss = abs(sum(losing)) if losing else 1
        profit_factor = gross_profit / gross_loss if gross_loss > 0 else float("inf")

        # Calmar Ratio
        calmar = total_return / abs(max_dd) if max_dd != 0 else 0

        # Consecutive Wins/Losses
        max_consec_wins = self._max_consecutive(pnls, positive=True)
        max_consec_losses = self._max_consecutive(pnls, positive=False)

        return {
            "total_return_pct": round(total_return, 2),
            "total_pnl": round(sum(pnls), 2),
            "initial_capital": round(self.initial_capital, 2),
            "final_capital": round(self.final_capital, 2),
            "total_trades": len(self.trades) // 2,  # Buy + Sell = 1 Trade
            "winning_trades": len(winning),
            "losing_trades": len(losing),
            "win_rate": round(
                len(winning) / max(len(winning) + len(losing), 1) * 100, 2
            ),
            "avg_win": round(np.mean(winning), 2) if winning else 0,
            "avg_loss": round(np.mean(losing), 2) if losing else 0,
            "largest_win": round(max(winning), 2) if winning else 0,
            "largest_loss": round(min(losing), 2) if losing else 0,
            "profit_factor": round(profit_factor, 2),
            "sharpe_ratio": round(sharpe, 2),
            "sortino_ratio": round(sortino, 2),
            "calmar_ratio": round(calmar, 2),
            "max_drawdown_pct": round(max_dd, 2),
            "avg_trade_duration": self._avg_duration(),
            "max_consecutive_wins": max_consec_wins,
            "max_consecutive_losses": max_consec_losses,
            "expectancy": round(
                (
                    (len(winning) / max(len(pnls), 1)) * (np.mean(winning) if winning else 0)
                    + (len(losing) / max(len(pnls), 1)) * (np.mean(losing) if losing else 0)
                ),
                2,
            ),
        }

    def _calculate_max_drawdown(self) -> float:
        """Berechnet den maximalen Drawdown."""
        if not self.equity_curve:
            return 0

        peak = self.equity_curve[0]
        max_dd = 0

        for value in self.equity_curve:
            if value > peak:
                peak = value
            dd = (peak - value) / peak * 100
            max_dd = max(max_dd, dd)

        return max_dd

    def _max_consecutive(self, pnls: List[float], positive: bool) -> int:
        """Berechnet maximale aufeinanderfolgende Gewinne/Verluste."""
        max_count = 0
        current = 0

        for pnl in pnls:
            if (positive and pnl > 0) or (not positive and pnl < 0):
                current += 1
                max_count = max(max_count, current)
            else:
                current = 0

        return max_count

    def _avg_duration(self) -> str:
        """Berechnet die durchschnittliche Trade-Dauer."""
        durations = []
        for t in self.trades:
            if "duration_hours" in t:
                durations.append(t["duration_hours"])

        if not durations:
            return "N/A"

        avg = np.mean(durations)
        if avg < 1:
            return f"{avg * 60:.0f} Min"
        elif avg < 24:
            return f"{avg:.1f} Std"
        else:
            return f"{avg / 24:.1f} Tage"

    def to_dict(self) -> Dict:
        """Konvertiert zu Dictionary."""
        return {
            "metrics": self.calculate_metrics(),
            "trades": self.trades,
            "equity_curve": self.equity_curve,
        }


class Backtester:
    """
    Backtesting-Engine für Trading-Strategien.

    Simuliert historisches Trading mit realistischen Bedingungen
    (Kommissionen, Slippage, etc.).
    """

    def __init__(self):
        self.indicators = TechnicalIndicators()
        self.strategy_manager = MultiStrategyManager()
        self.commission = BACKTEST_CONFIG["commission"]
        self.slippage = BACKTEST_CONFIG["slippage"]

    def run(
        self,
        df: pd.DataFrame,
        initial_capital: float = 10000.0,
        use_ai: bool = True,
        symbol: str = "BTC/USDT",
    ) -> BacktestResult:
        """
        Führt einen Backtest durch.

        Args:
            df: DataFrame mit OHLCV-Daten
            initial_capital: Startkapital
            use_ai: KI-Modell verwenden
            symbol: Handelspaar

        Returns:
            BacktestResult mit Metriken und Trades
        """
        log.info(f"🔬 Starte Backtest: {symbol} | Kapital: ${initial_capital:,.2f}")
        log.info(f"   Zeitraum: {df.index[0]} bis {df.index[-1]} ({len(df)} Kerzen)")

        result = BacktestResult()
        result.initial_capital = initial_capital

        # Indikatoren berechnen
        df = self.indicators.calculate_all(df)

        # KI-Modell trainieren (auf ersten 60% der Daten)
        ai_model = None
        if use_ai:
            ai_model = TradingAIModel()
            train_end = int(len(df) * 0.6)
            train_data = df.iloc[:train_end].copy()
            ai_model.create_target(train_data)
            metrics = ai_model.train(train_data)
            log.info(f"   KI trainiert auf {train_end} Kerzen: {metrics.get('accuracy', 0):.4f}")

        # Simulation
        capital = initial_capital
        position = None
        start_idx = int(len(df) * 0.6) if use_ai else 100  # Nach Training starten

        for i in range(start_idx, len(df)):
            current = df.iloc[i]
            current_price = float(current["close"])
            timestamp = df.index[i]

            result.equity_curve.append(
                capital + (
                    (current_price - position["entry_price"]) * position["amount"]
                    if position
                    else 0
                )
            )
            result.timestamps.append(timestamp)

            # Signal generieren
            window = df.iloc[max(0, i - 100) : i + 1]

            # Strategie-Signal
            strategy_signal = self.strategy_manager.analyze(window)

            # KI-Signal
            ai_signal = {"signal": 0, "confidence": 0.5}
            if ai_model and ai_model.is_trained:
                ai_signal = ai_model.predict(window)

            # Kombiniertes Signal
            combined = self._combine_signals(strategy_signal, ai_signal)

            # Position verwalten
            if position is None:
                # Kein Position - Einstieg prüfen
                if combined["signal"] == 1 and combined["confidence"] > 0.55:
                    # Kaufen
                    entry_price = current_price * (1 + self.slippage)
                    amount = (capital * 0.25) / entry_price  # 25% des Kapitals
                    cost = entry_price * amount * (1 + self.commission)

                    if cost <= capital:
                        position = {
                            "entry_price": entry_price,
                            "amount": amount,
                            "entry_time": timestamp,
                            "stop_loss": entry_price * (1 - RISK_CONFIG["stop_loss_pct"]),
                            "take_profit": entry_price * (1 + RISK_CONFIG["take_profit_pct"]),
                        }
                        capital -= cost

                        result.trades.append({
                            "type": "BUY",
                            "price": entry_price,
                            "amount": amount,
                            "timestamp": str(timestamp),
                        })

            else:
                # Position offen - Ausstieg prüfen
                should_sell = False
                reason = ""

                # Stop-Loss
                if current_price <= position["stop_loss"]:
                    should_sell = True
                    reason = "Stop-Loss"

                # Take-Profit
                elif current_price >= position["take_profit"]:
                    should_sell = True
                    reason = "Take-Profit"

                # Sell-Signal
                elif combined["signal"] == -1 and combined["confidence"] > 0.55:
                    should_sell = True
                    reason = "Signal"

                if should_sell:
                    exit_price = current_price * (1 - self.slippage)
                    revenue = exit_price * position["amount"] * (1 - self.commission)
                    pnl = revenue - (position["entry_price"] * position["amount"])
                    return_pct = (exit_price / position["entry_price"] - 1) * 100

                    capital += revenue

                    # Trade-Dauer
                    entry_time = position["entry_time"]
                    if hasattr(entry_time, "timestamp") and hasattr(timestamp, "timestamp"):
                        duration = (timestamp - entry_time).total_seconds() / 3600
                    else:
                        duration = 0

                    result.trades.append({
                        "type": "SELL",
                        "price": exit_price,
                        "amount": position["amount"],
                        "entry_price": position["entry_price"],
                        "pnl": pnl,
                        "return_pct": return_pct,
                        "reason": reason,
                        "duration_hours": duration,
                        "timestamp": str(timestamp),
                    })

                    position = None

        # Offene Position am Ende schließen
        if position:
            final_price = float(df.iloc[-1]["close"])
            revenue = final_price * position["amount"] * (1 - self.commission)
            pnl = revenue - (position["entry_price"] * position["amount"])
            capital += revenue

            result.trades.append({
                "type": "SELL",
                "price": final_price,
                "amount": position["amount"],
                "entry_price": position["entry_price"],
                "pnl": pnl,
                "return_pct": (final_price / position["entry_price"] - 1) * 100,
                "reason": "End of Backtest",
                "timestamp": str(df.index[-1]),
            })

        result.final_capital = capital
        metrics = result.calculate_metrics()

        log.info(f"📊 Backtest abgeschlossen:")
        log.info(f"   Rendite: {metrics['total_return_pct']:+.2f}%")
        log.info(f"   Trades: {metrics['total_trades']} (Win Rate: {metrics['win_rate']:.1f}%)")
        log.info(f"   Sharpe: {metrics['sharpe_ratio']:.2f} | Max DD: {metrics['max_drawdown_pct']:.2f}%")
        log.info(f"   Profit Factor: {metrics['profit_factor']:.2f}")

        return result

    def _combine_signals(self, strategy_signal: Dict, ai_signal: Dict) -> Dict:
        """Kombiniert Strategie- und KI-Signale."""
        s_signal = strategy_signal.get("final_signal", 0)
        s_conf = strategy_signal.get("confidence", 0.5)
        a_signal = ai_signal.get("signal", 0)
        a_conf = ai_signal.get("confidence", 0.5)

        # Gewichtete Kombination (60% KI, 40% Strategie)
        combined_score = (a_signal * a_conf * 0.6) + (s_signal * s_conf * 0.4)

        if combined_score > 0.2:
            signal = 1
        elif combined_score < -0.2:
            signal = -1
        else:
            signal = 0

        return {
            "signal": signal,
            "confidence": abs(combined_score),
            "strategy_signal": s_signal,
            "ai_signal": a_signal,
        }

    def run_walk_forward(
        self,
        df: pd.DataFrame,
        initial_capital: float = 10000.0,
        n_splits: int = 5,
        symbol: str = "BTC/USDT",
    ) -> Dict:
        """
        Walk-Forward-Analyse für robustere Ergebnisse.

        Trainiert auf einem Fenster und testet auf dem nächsten.
        """
        log.info(f"🔬 Walk-Forward-Analyse: {n_splits} Splits")

        split_size = len(df) // (n_splits + 1)
        results = []

        for i in range(n_splits):
            train_start = i * split_size
            train_end = (i + 1) * split_size
            test_end = min((i + 2) * split_size, len(df))

            train_data = df.iloc[train_start:train_end]
            test_data = df.iloc[train_end:test_end]

            if len(test_data) < 50:
                continue

            # Backtest auf Test-Daten
            result = self.run(
                pd.concat([train_data, test_data]),
                initial_capital=initial_capital,
                use_ai=True,
                symbol=symbol,
            )
            results.append(result.calculate_metrics())

        # Aggregierte Metriken
        if results:
            avg_metrics = {
                "avg_return": np.mean([r["total_return_pct"] for r in results]),
                "avg_win_rate": np.mean([r["win_rate"] for r in results]),
                "avg_sharpe": np.mean([r["sharpe_ratio"] for r in results]),
                "avg_max_drawdown": np.mean([r["max_drawdown_pct"] for r in results]),
                "consistency": np.std([r["total_return_pct"] for r in results]),
                "splits": results,
            }
        else:
            avg_metrics = {"error": "Keine gültigen Splits"}

        return avg_metrics
