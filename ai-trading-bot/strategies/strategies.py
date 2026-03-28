"""
CyberDreams AI Trading Bot - Trading-Strategien
==================================================
Verschiedene Trading-Strategien die einzeln oder kombiniert verwendet werden können.
"""

import numpy as np
import pandas as pd
from typing import Dict, List
from utils.logger import log


class BaseStrategy:
    """Basis-Klasse für Trading-Strategien."""

    name = "base"
    description = "Basis-Strategie"

    def generate_signal(self, df: pd.DataFrame) -> Dict:
        """Generiert ein Trading-Signal."""
        raise NotImplementedError

    def _signal_result(
        self, signal: int, confidence: float, reason: str
    ) -> Dict:
        return {
            "strategy": self.name,
            "signal": signal,  # 1=BUY, 0=HOLD, -1=SELL
            "confidence": confidence,
            "reason": reason,
        }


class TrendFollowingStrategy(BaseStrategy):
    """
    Trendfolge-Strategie.
    Nutzt EMA-Crossovers und ADX für Trendbestätigung.
    """

    name = "trend_following"
    description = "EMA-Crossover mit ADX-Trendbestätigung"

    def generate_signal(self, df: pd.DataFrame) -> Dict:
        latest = df.iloc[-1]
        prev = df.iloc[-2]

        ema_short = latest.get("ema_9", 0)
        ema_medium = latest.get("ema_21", 0)
        ema_long = latest.get("ema_50", 0)
        adx = latest.get("adx", 0)
        supertrend_dir = latest.get("supertrend_direction", 0)

        # Bullish: Short EMA > Medium EMA > Long EMA + starker Trend
        bullish = (
            ema_short > ema_medium > ema_long
            and adx > 25
            and supertrend_dir > 0
        )

        # Bearish: Short EMA < Medium EMA < Long EMA + starker Trend
        bearish = (
            ema_short < ema_medium < ema_long
            and adx > 25
            and supertrend_dir < 0
        )

        # Crossover-Signal
        cross_up = (
            prev.get("ema_cross_short_medium", 0) <= 0
            and latest.get("ema_cross_short_medium", 0) > 0
        )
        cross_down = (
            prev.get("ema_cross_short_medium", 0) >= 0
            and latest.get("ema_cross_short_medium", 0) < 0
        )

        if bullish and cross_up:
            confidence = min(adx / 50, 1.0) * 0.9
            return self._signal_result(1, confidence, "Bullish EMA-Crossover + starker Trend")
        elif bearish and cross_down:
            confidence = min(adx / 50, 1.0) * 0.9
            return self._signal_result(-1, confidence, "Bearish EMA-Crossover + starker Trend")
        elif bullish:
            return self._signal_result(1, 0.5, "Bullisher Trend")
        elif bearish:
            return self._signal_result(-1, 0.5, "Bearisher Trend")

        return self._signal_result(0, 0.5, "Kein klarer Trend")


class MeanReversionStrategy(BaseStrategy):
    """
    Mean-Reversion-Strategie.
    Nutzt Bollinger Bands und RSI für Überkauft/Überverkauft-Signale.
    """

    name = "mean_reversion"
    description = "Bollinger Bands + RSI Mean Reversion"

    def generate_signal(self, df: pd.DataFrame) -> Dict:
        latest = df.iloc[-1]

        rsi = latest.get("rsi", 50)
        bb_position = latest.get("bb_position", 0.5)
        stoch_k = latest.get("stoch_k", 50)
        williams_r = latest.get("williams_r", -50)
        mfi = latest.get("mfi", 50)

        # Überverkauft-Signale
        oversold_count = sum([
            rsi < 30,
            bb_position < 0.1,
            stoch_k < 20,
            williams_r < -80,
            mfi < 20,
        ])

        # Überkauft-Signale
        overbought_count = sum([
            rsi > 70,
            bb_position > 0.9,
            stoch_k > 80,
            williams_r > -20,
            mfi > 80,
        ])

        if oversold_count >= 3:
            confidence = oversold_count / 5
            return self._signal_result(
                1, confidence, f"Stark überverkauft ({oversold_count}/5 Indikatoren)"
            )
        elif overbought_count >= 3:
            confidence = overbought_count / 5
            return self._signal_result(
                -1, confidence, f"Stark überkauft ({overbought_count}/5 Indikatoren)"
            )

        return self._signal_result(0, 0.5, "Neutral")


class MomentumStrategy(BaseStrategy):
    """
    Momentum-Strategie.
    Nutzt MACD, Momentum und Volumen für Momentum-Signale.
    """

    name = "momentum"
    description = "MACD + Momentum + Volumen-Bestätigung"

    def generate_signal(self, df: pd.DataFrame) -> Dict:
        latest = df.iloc[-1]

        macd_hist = latest.get("macd_histogram", 0)
        macd_cross = latest.get("macd_cross", 0)
        momentum_10 = latest.get("momentum_10", 0)
        momentum_20 = latest.get("momentum_20", 0)
        volume_ratio = latest.get("volume_ratio", 1)
        roc_5 = latest.get("roc_5", 0)

        # Bullish Momentum
        bullish_signals = sum([
            macd_hist > 0,
            macd_cross == 1,
            momentum_10 > 0.02,
            momentum_20 > 0.05,
            volume_ratio > 1.5,
            roc_5 > 0.01,
        ])

        # Bearish Momentum
        bearish_signals = sum([
            macd_hist < 0,
            macd_cross == -1,
            momentum_10 < -0.02,
            momentum_20 < -0.05,
            volume_ratio > 1.5,
            roc_5 < -0.01,
        ])

        if bullish_signals >= 4 and volume_ratio > 1.2:
            confidence = bullish_signals / 6
            return self._signal_result(
                1, confidence, f"Starkes bullishes Momentum ({bullish_signals}/6)"
            )
        elif bearish_signals >= 4 and volume_ratio > 1.2:
            confidence = bearish_signals / 6
            return self._signal_result(
                -1, confidence, f"Starkes bearishes Momentum ({bearish_signals}/6)"
            )

        return self._signal_result(0, 0.4, "Schwaches Momentum")


class VolatilityBreakoutStrategy(BaseStrategy):
    """
    Volatilitäts-Breakout-Strategie.
    Nutzt Bollinger Band Squeeze und Keltner Channels.
    """

    name = "volatility_breakout"
    description = "Bollinger/Keltner Squeeze Breakout"

    def generate_signal(self, df: pd.DataFrame) -> Dict:
        latest = df.iloc[-1]
        prev = df.iloc[-2] if len(df) > 1 else latest

        bb_width = latest.get("bb_width", 0)
        bb_upper = latest.get("bb_upper", 0)
        bb_lower = latest.get("bb_lower", 0)
        keltner_upper = latest.get("keltner_upper", 0)
        keltner_lower = latest.get("keltner_lower", 0)
        close = latest.get("close", latest.name) if "close" in df.columns else 0
        volume_ratio = latest.get("volume_ratio", 1)

        # Squeeze Detection: BB innerhalb Keltner
        is_squeeze = bb_upper < keltner_upper and bb_lower > keltner_lower

        # Vorheriger Squeeze
        prev_bb_upper = prev.get("bb_upper", 0)
        prev_keltner_upper = prev.get("keltner_upper", 0)
        was_squeeze = prev_bb_upper < prev_keltner_upper

        # Breakout nach Squeeze
        if was_squeeze and not is_squeeze:
            if close > bb_upper and volume_ratio > 1.3:
                return self._signal_result(
                    1, 0.75, "Bullish Breakout nach Squeeze"
                )
            elif close < bb_lower and volume_ratio > 1.3:
                return self._signal_result(
                    -1, 0.75, "Bearish Breakout nach Squeeze"
                )

        if is_squeeze:
            return self._signal_result(0, 0.3, "Squeeze aktiv - Warte auf Breakout")

        return self._signal_result(0, 0.4, "Kein Breakout-Signal")


class MultiStrategyManager:
    """
    Verwaltet und kombiniert mehrere Strategien.
    """

    def __init__(self):
        self.strategies = {
            "trend_following": TrendFollowingStrategy(),
            "mean_reversion": MeanReversionStrategy(),
            "momentum": MomentumStrategy(),
            "volatility_breakout": VolatilityBreakoutStrategy(),
        }

        # Gewichtung der Strategien
        self.weights = {
            "trend_following": 0.30,
            "mean_reversion": 0.25,
            "momentum": 0.25,
            "volatility_breakout": 0.20,
        }

        log.info(f"📋 {len(self.strategies)} Strategien geladen")

    def analyze(self, df: pd.DataFrame) -> Dict:
        """
        Analysiert mit allen Strategien und kombiniert die Signale.

        Args:
            df: DataFrame mit OHLCV + Indikatoren

        Returns:
            Kombiniertes Signal mit Details
        """
        results = {}
        weighted_signal = 0.0
        total_weight = 0.0

        for name, strategy in self.strategies.items():
            try:
                result = strategy.generate_signal(df)
                results[name] = result

                weight = self.weights.get(name, 0.25)
                weighted_signal += result["signal"] * result["confidence"] * weight
                total_weight += weight

            except Exception as e:
                log.error(f"Strategie-Fehler ({name}): {e}")
                results[name] = {
                    "strategy": name,
                    "signal": 0,
                    "confidence": 0,
                    "reason": f"Fehler: {e}",
                }

        # Normalisiertes Signal
        if total_weight > 0:
            normalized_signal = weighted_signal / total_weight
        else:
            normalized_signal = 0

        # Finales Signal
        if normalized_signal > 0.2:
            final_signal = 1
        elif normalized_signal < -0.2:
            final_signal = -1
        else:
            final_signal = 0

        return {
            "final_signal": final_signal,
            "normalized_score": float(normalized_signal),
            "confidence": float(abs(normalized_signal)),
            "individual_strategies": results,
            "consensus": all(
                r["signal"] == final_signal
                for r in results.values()
                if r["signal"] != 0
            ),
        }
