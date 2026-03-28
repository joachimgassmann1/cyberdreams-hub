"""
CyberDreams AI Trading Bot - Risikomanagement
================================================
Umfassendes Risikomanagement mit Position-Sizing, Drawdown-Kontrolle
und Portfolio-Optimierung.
"""

import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
from config.settings import RISK_CONFIG, TRADING_CONFIG
from utils.logger import log


class RiskManager:
    """
    Verwaltet alle Risiko-Aspekte des Trading-Bots.

    Features:
    - Kelly-Criterion Position-Sizing
    - Dynamischer Stop-Loss basierend auf ATR
    - Korrelations-basiertes Portfolio-Risiko
    - Drawdown-Überwachung
    - Exposure-Limits
    """

    def __init__(self):
        self.max_risk_per_trade = RISK_CONFIG["max_risk_per_trade"]
        self.max_drawdown = RISK_CONFIG["max_drawdown"]
        self.max_daily_loss = RISK_CONFIG["max_daily_loss"]
        self.max_positions = TRADING_CONFIG["max_positions"]

        # Tracking
        self.daily_trades: List[Dict] = []
        self.daily_pnl = 0.0
        self.peak_equity = 0.0
        self.current_drawdown = 0.0
        self.consecutive_losses = 0
        self.risk_level = "normal"  # normal, elevated, critical

        log.info("🛡️ Risikomanagement initialisiert")

    def assess_trade_risk(
        self,
        symbol: str,
        side: str,
        entry_price: float,
        portfolio_value: float,
        open_positions: Dict,
        signal_confidence: float,
        atr: float = 0,
    ) -> Dict:
        """
        Bewertet das Risiko eines geplanten Trades.

        Args:
            symbol: Handelspaar
            side: 'buy' oder 'sell'
            entry_price: Geplanter Einstiegspreis
            portfolio_value: Aktueller Portfoliowert
            open_positions: Offene Positionen
            signal_confidence: Konfidenz des Signals (0-1)
            atr: Average True Range

        Returns:
            Risiko-Bewertung mit Empfehlung
        """
        risk_factors = []
        risk_score = 0.0

        # 1. Portfolio-Exposure prüfen
        if len(open_positions) >= self.max_positions:
            risk_factors.append("Maximale Positionen erreicht")
            return {
                "approved": False,
                "risk_score": 1.0,
                "risk_level": "critical",
                "reason": "Maximale Positionen erreicht",
                "position_size": 0,
                "stop_loss": 0,
                "take_profit": 0,
            }

        # 2. Drawdown prüfen
        if self.current_drawdown >= self.max_drawdown * 0.8:
            risk_score += 0.3
            risk_factors.append(f"Hoher Drawdown: {self.current_drawdown:.1%}")

        # 3. Täglicher Verlust prüfen
        daily_loss_pct = abs(min(self.daily_pnl, 0)) / max(portfolio_value, 1)
        if daily_loss_pct >= self.max_daily_loss * 0.7:
            risk_score += 0.25
            risk_factors.append(f"Hoher täglicher Verlust: {daily_loss_pct:.1%}")

        # 4. Consecutive Losses
        if self.consecutive_losses >= 3:
            risk_score += 0.2
            risk_factors.append(f"{self.consecutive_losses} Verluste in Folge")

        # 5. Korrelation mit offenen Positionen
        if symbol in open_positions:
            risk_score += 0.15
            risk_factors.append("Position bereits offen")

        # 6. Niedrige Konfidenz
        if signal_confidence < 0.5:
            risk_score += 0.15
            risk_factors.append(f"Niedrige Konfidenz: {signal_confidence:.2f}")

        # Position-Sizing berechnen
        position_size = self._calculate_position_size(
            portfolio_value, entry_price, signal_confidence, atr
        )

        # Stop-Loss berechnen (ATR-basiert wenn verfügbar)
        stop_loss, take_profit = self._calculate_sl_tp(
            entry_price, side, atr
        )

        # Risiko-Level bestimmen
        if risk_score >= 0.6:
            risk_level = "critical"
            approved = False
            reason = "Zu hohes Risiko: " + ", ".join(risk_factors)
        elif risk_score >= 0.35:
            risk_level = "elevated"
            position_size *= 0.5  # Halbe Positionsgröße
            approved = True
            reason = "Erhöhtes Risiko - reduzierte Position: " + ", ".join(risk_factors)
        else:
            risk_level = "normal"
            approved = True
            reason = "Risiko akzeptabel"

        self.risk_level = risk_level

        return {
            "approved": approved,
            "risk_score": float(risk_score),
            "risk_level": risk_level,
            "risk_factors": risk_factors,
            "reason": reason,
            "position_size": float(position_size),
            "position_size_pct": float(position_size / max(portfolio_value, 1)),
            "stop_loss": float(stop_loss),
            "take_profit": float(take_profit),
            "risk_reward_ratio": float(
                abs(take_profit - entry_price) / max(abs(entry_price - stop_loss), 0.01)
            ),
        }

    def _calculate_position_size(
        self,
        portfolio_value: float,
        entry_price: float,
        confidence: float,
        atr: float,
    ) -> float:
        """
        Berechnet die optimale Positionsgröße.

        Verwendet eine modifizierte Kelly-Criterion-Formel:
        Position = Portfolio * Risk% * Confidence * Adjustment
        """
        # Basis-Risiko pro Trade
        base_risk = portfolio_value * self.max_risk_per_trade

        # Konfidenz-Anpassung (höhere Konfidenz = größere Position)
        confidence_factor = 0.5 + (confidence * 0.5)

        # Drawdown-Anpassung (bei hohem Drawdown kleinere Positionen)
        drawdown_factor = max(0.3, 1 - self.current_drawdown * 2)

        # Consecutive-Loss-Anpassung
        loss_factor = max(0.5, 1 - self.consecutive_losses * 0.1)

        # Volatilitäts-Anpassung (bei hoher Volatilität kleinere Positionen)
        if atr > 0 and entry_price > 0:
            volatility = atr / entry_price
            vol_factor = max(0.5, 1 - volatility * 10)
        else:
            vol_factor = 1.0

        position_size = (
            base_risk * confidence_factor * drawdown_factor * loss_factor * vol_factor
        )

        # Maximale Positionsgröße: 30% des Portfolios
        max_size = portfolio_value * 0.30
        position_size = min(position_size, max_size)

        # Mindestgröße
        position_size = max(position_size, TRADING_CONFIG["min_trade_amount"])

        return position_size

    def _calculate_sl_tp(
        self, entry_price: float, side: str, atr: float
    ) -> Tuple[float, float]:
        """
        Berechnet dynamische Stop-Loss und Take-Profit Levels.

        Verwendet ATR für volatilitätsangepasste Levels.
        """
        if atr > 0:
            # ATR-basiert (2x ATR für SL, 3x ATR für TP)
            sl_distance = atr * 2
            tp_distance = atr * 3
        else:
            # Prozentual
            sl_distance = entry_price * RISK_CONFIG["stop_loss_pct"]
            tp_distance = entry_price * RISK_CONFIG["take_profit_pct"]

        if side == "buy" or side == "long":
            stop_loss = entry_price - sl_distance
            take_profit = entry_price + tp_distance
        else:
            stop_loss = entry_price + sl_distance
            take_profit = entry_price - tp_distance

        return stop_loss, take_profit

    def update_after_trade(self, pnl: float, portfolio_value: float):
        """Aktualisiert Risiko-Metriken nach einem Trade."""
        self.daily_pnl += pnl

        if pnl < 0:
            self.consecutive_losses += 1
        else:
            self.consecutive_losses = 0

        # Drawdown aktualisieren
        self.peak_equity = max(self.peak_equity, portfolio_value)
        if self.peak_equity > 0:
            self.current_drawdown = (
                self.peak_equity - portfolio_value
            ) / self.peak_equity

        self.daily_trades.append({
            "pnl": pnl,
            "portfolio_value": portfolio_value,
            "timestamp": str(datetime.now()),
        })

    def reset_daily(self):
        """Setzt tägliche Metriken zurück."""
        self.daily_pnl = 0.0
        self.daily_trades = []
        log.info("🔄 Tägliche Risiko-Metriken zurückgesetzt")

    def get_risk_report(self, portfolio_value: float) -> Dict:
        """Erstellt einen Risiko-Bericht."""
        return {
            "risk_level": self.risk_level,
            "current_drawdown": float(self.current_drawdown),
            "max_drawdown_limit": float(self.max_drawdown),
            "daily_pnl": float(self.daily_pnl),
            "daily_loss_limit": float(self.max_daily_loss * portfolio_value),
            "consecutive_losses": self.consecutive_losses,
            "daily_trades_count": len(self.daily_trades),
            "peak_equity": float(self.peak_equity),
            "portfolio_value": float(portfolio_value),
            "risk_utilization": float(
                self.current_drawdown / max(self.max_drawdown, 0.01)
            ),
        }
