"""
CyberDreams AI Trading Bot - Technische Indikatoren
=====================================================
Berechnung aller technischen Indikatoren für die KI-Analyse.
"""

import numpy as np
import pandas as pd
from config.settings import INDICATOR_CONFIG
from utils.logger import log


class TechnicalIndicators:
    """Berechnet technische Indikatoren auf OHLCV-Daten."""

    def __init__(self, config: dict = None):
        self.config = config or INDICATOR_CONFIG

    def calculate_all(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Berechnet alle technischen Indikatoren.

        Args:
            df: DataFrame mit OHLCV-Daten

        Returns:
            DataFrame mit allen Indikatoren
        """
        if df.empty:
            return df

        df = df.copy()

        # Trend-Indikatoren
        df = self._add_ema(df)
        df = self._add_macd(df)
        df = self._add_adx(df)
        df = self._add_supertrend(df)

        # Momentum-Indikatoren
        df = self._add_rsi(df)
        df = self._add_stochastic(df)
        df = self._add_williams_r(df)
        df = self._add_momentum(df)

        # Volatilität
        df = self._add_bollinger_bands(df)
        df = self._add_atr(df)
        df = self._add_keltner_channels(df)

        # Volumen
        df = self._add_volume_indicators(df)

        # Preis-Muster
        df = self._add_price_patterns(df)

        # Bereinigung
        df.replace([np.inf, -np.inf], np.nan, inplace=True)
        df.fillna(method="ffill", inplace=True)
        df.fillna(0, inplace=True)

        log.debug(f"Indikatoren berechnet: {len(df.columns)} Features")
        return df

    def _add_ema(self, df: pd.DataFrame) -> pd.DataFrame:
        """Exponential Moving Averages."""
        for period in [
            self.config["ema_short"],
            self.config["ema_medium"],
            self.config["ema_long"],
        ]:
            df[f"ema_{period}"] = df["close"].ewm(span=period, adjust=False).mean()

        # EMA-Crossover-Signale
        df["ema_cross_short_medium"] = (
            df[f"ema_{self.config['ema_short']}"]
            - df[f"ema_{self.config['ema_medium']}"]
        )
        df["ema_cross_short_long"] = (
            df[f"ema_{self.config['ema_short']}"]
            - df[f"ema_{self.config['ema_long']}"]
        )
        df["ema_cross_medium_long"] = (
            df[f"ema_{self.config['ema_medium']}"]
            - df[f"ema_{self.config['ema_long']}"]
        )

        # Preis relativ zu EMAs
        df["price_vs_ema_short"] = (
            df["close"] / df[f"ema_{self.config['ema_short']}"] - 1
        )
        df["price_vs_ema_long"] = (
            df["close"] / df[f"ema_{self.config['ema_long']}"] - 1
        )

        return df

    def _add_rsi(self, df: pd.DataFrame) -> pd.DataFrame:
        """Relative Strength Index."""
        period = self.config["rsi_period"]
        delta = df["close"].diff()
        gain = delta.where(delta > 0, 0).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
        rs = gain / loss.replace(0, np.nan)
        df["rsi"] = 100 - (100 / (1 + rs))

        # RSI-Divergenz
        df["rsi_sma"] = df["rsi"].rolling(window=10).mean()
        df["rsi_slope"] = df["rsi"].diff(5) / 5

        return df

    def _add_macd(self, df: pd.DataFrame) -> pd.DataFrame:
        """Moving Average Convergence Divergence."""
        fast = self.config["macd_fast"]
        slow = self.config["macd_slow"]
        signal = self.config["macd_signal"]

        ema_fast = df["close"].ewm(span=fast, adjust=False).mean()
        ema_slow = df["close"].ewm(span=slow, adjust=False).mean()

        df["macd"] = ema_fast - ema_slow
        df["macd_signal"] = df["macd"].ewm(span=signal, adjust=False).mean()
        df["macd_histogram"] = df["macd"] - df["macd_signal"]

        # MACD-Crossover
        df["macd_cross"] = np.where(
            (df["macd"] > df["macd_signal"])
            & (df["macd"].shift(1) <= df["macd_signal"].shift(1)),
            1,
            np.where(
                (df["macd"] < df["macd_signal"])
                & (df["macd"].shift(1) >= df["macd_signal"].shift(1)),
                -1,
                0,
            ),
        )

        return df

    def _add_bollinger_bands(self, df: pd.DataFrame) -> pd.DataFrame:
        """Bollinger Bands."""
        period = self.config["bb_period"]
        std = self.config["bb_std"]

        sma = df["close"].rolling(window=period).mean()
        rolling_std = df["close"].rolling(window=period).std()

        df["bb_upper"] = sma + (rolling_std * std)
        df["bb_middle"] = sma
        df["bb_lower"] = sma - (rolling_std * std)
        df["bb_width"] = (df["bb_upper"] - df["bb_lower"]) / df["bb_middle"]
        df["bb_position"] = (df["close"] - df["bb_lower"]) / (
            df["bb_upper"] - df["bb_lower"]
        ).replace(0, np.nan)

        return df

    def _add_atr(self, df: pd.DataFrame) -> pd.DataFrame:
        """Average True Range."""
        period = self.config["atr_period"]

        high_low = df["high"] - df["low"]
        high_close = (df["high"] - df["close"].shift()).abs()
        low_close = (df["low"] - df["close"].shift()).abs()

        true_range = pd.concat([high_low, high_close, low_close], axis=1).max(axis=1)
        df["atr"] = true_range.rolling(window=period).mean()
        df["atr_pct"] = df["atr"] / df["close"]

        return df

    def _add_stochastic(self, df: pd.DataFrame) -> pd.DataFrame:
        """Stochastic Oscillator."""
        k_period = self.config["stoch_k"]
        d_period = self.config["stoch_d"]

        low_min = df["low"].rolling(window=k_period).min()
        high_max = df["high"].rolling(window=k_period).max()

        df["stoch_k"] = (
            100 * (df["close"] - low_min) / (high_max - low_min).replace(0, np.nan)
        )
        df["stoch_d"] = df["stoch_k"].rolling(window=d_period).mean()

        return df

    def _add_adx(self, df: pd.DataFrame) -> pd.DataFrame:
        """Average Directional Index."""
        period = self.config["adx_period"]

        plus_dm = df["high"].diff()
        minus_dm = -df["low"].diff()

        plus_dm = plus_dm.where((plus_dm > minus_dm) & (plus_dm > 0), 0)
        minus_dm = minus_dm.where((minus_dm > plus_dm) & (minus_dm > 0), 0)

        atr = self._calc_atr(df, period)

        plus_di = 100 * (plus_dm.rolling(window=period).mean() / atr)
        minus_di = 100 * (minus_dm.rolling(window=period).mean() / atr)

        dx = 100 * ((plus_di - minus_di).abs() / (plus_di + minus_di).replace(0, np.nan))
        df["adx"] = dx.rolling(window=period).mean()
        df["plus_di"] = plus_di
        df["minus_di"] = minus_di

        return df

    def _add_williams_r(self, df: pd.DataFrame) -> pd.DataFrame:
        """Williams %R."""
        period = 14
        highest_high = df["high"].rolling(window=period).max()
        lowest_low = df["low"].rolling(window=period).min()
        df["williams_r"] = (
            -100
            * (highest_high - df["close"])
            / (highest_high - lowest_low).replace(0, np.nan)
        )
        return df

    def _add_momentum(self, df: pd.DataFrame) -> pd.DataFrame:
        """Momentum und Rate of Change."""
        df["momentum_10"] = df["close"] / df["close"].shift(10) - 1
        df["momentum_20"] = df["close"] / df["close"].shift(20) - 1
        df["roc_5"] = df["close"].pct_change(5)
        df["roc_10"] = df["close"].pct_change(10)
        return df

    def _add_supertrend(self, df: pd.DataFrame) -> pd.DataFrame:
        """Supertrend Indikator."""
        period = 10
        multiplier = 3.0

        atr = self._calc_atr(df, period)
        hl2 = (df["high"] + df["low"]) / 2

        upper_band = hl2 + (multiplier * atr)
        lower_band = hl2 - (multiplier * atr)

        supertrend = pd.Series(index=df.index, dtype=float)
        direction = pd.Series(index=df.index, dtype=float)

        supertrend.iloc[0] = upper_band.iloc[0]
        direction.iloc[0] = 1

        for i in range(1, len(df)):
            if df["close"].iloc[i] > upper_band.iloc[i - 1]:
                direction.iloc[i] = 1
            elif df["close"].iloc[i] < lower_band.iloc[i - 1]:
                direction.iloc[i] = -1
            else:
                direction.iloc[i] = direction.iloc[i - 1]

            if direction.iloc[i] == 1:
                supertrend.iloc[i] = lower_band.iloc[i]
            else:
                supertrend.iloc[i] = upper_band.iloc[i]

        df["supertrend"] = supertrend
        df["supertrend_direction"] = direction

        return df

    def _add_keltner_channels(self, df: pd.DataFrame) -> pd.DataFrame:
        """Keltner Channels."""
        period = 20
        atr_mult = 1.5

        ema = df["close"].ewm(span=period, adjust=False).mean()
        atr = self._calc_atr(df, period)

        df["keltner_upper"] = ema + (atr_mult * atr)
        df["keltner_lower"] = ema - (atr_mult * atr)
        df["keltner_position"] = (df["close"] - df["keltner_lower"]) / (
            df["keltner_upper"] - df["keltner_lower"]
        ).replace(0, np.nan)

        return df

    def _add_volume_indicators(self, df: pd.DataFrame) -> pd.DataFrame:
        """Volumen-basierte Indikatoren."""
        period = self.config["volume_ma_period"]

        # Volume Moving Average
        df["volume_sma"] = df["volume"].rolling(window=period).mean()
        df["volume_ratio"] = df["volume"] / df["volume_sma"].replace(0, np.nan)

        # On-Balance Volume (OBV)
        df["obv"] = (
            (np.sign(df["close"].diff()) * df["volume"]).fillna(0).cumsum()
        )
        df["obv_sma"] = df["obv"].rolling(window=period).mean()

        # Volume Price Trend (VPT)
        df["vpt"] = (df["close"].pct_change() * df["volume"]).fillna(0).cumsum()

        # Money Flow Index (MFI)
        typical_price = (df["high"] + df["low"] + df["close"]) / 3
        money_flow = typical_price * df["volume"]
        positive_flow = money_flow.where(typical_price > typical_price.shift(1), 0)
        negative_flow = money_flow.where(typical_price < typical_price.shift(1), 0)

        positive_mf = positive_flow.rolling(window=14).sum()
        negative_mf = negative_flow.rolling(window=14).sum()
        mfi_ratio = positive_mf / negative_mf.replace(0, np.nan)
        df["mfi"] = 100 - (100 / (1 + mfi_ratio))

        return df

    def _add_price_patterns(self, df: pd.DataFrame) -> pd.DataFrame:
        """Preis-basierte Features."""
        # Kerzen-Muster
        df["body_size"] = abs(df["close"] - df["open"]) / df["open"]
        df["upper_shadow"] = (df["high"] - df[["close", "open"]].max(axis=1)) / df[
            "open"
        ]
        df["lower_shadow"] = (df[["close", "open"]].min(axis=1) - df["low"]) / df[
            "open"
        ]
        df["is_bullish"] = (df["close"] > df["open"]).astype(int)

        # Preisänderungen
        for period in [1, 3, 5, 10, 20]:
            df[f"return_{period}"] = df["close"].pct_change(period)

        # Volatilität
        df["volatility_10"] = df["close"].pct_change().rolling(window=10).std()
        df["volatility_20"] = df["close"].pct_change().rolling(window=20).std()

        # High/Low-Ratio
        df["hl_ratio"] = (df["high"] - df["low"]) / df["close"]

        # Abstand vom Hoch/Tief
        df["dist_from_high_20"] = (
            df["close"] / df["high"].rolling(window=20).max() - 1
        )
        df["dist_from_low_20"] = df["close"] / df["low"].rolling(window=20).min() - 1

        return df

    @staticmethod
    def _calc_atr(df: pd.DataFrame, period: int) -> pd.Series:
        """Berechnet ATR (Hilfsfunktion)."""
        high_low = df["high"] - df["low"]
        high_close = (df["high"] - df["close"].shift()).abs()
        low_close = (df["low"] - df["close"].shift()).abs()
        true_range = pd.concat([high_low, high_close, low_close], axis=1).max(axis=1)
        return true_range.rolling(window=period).mean()
