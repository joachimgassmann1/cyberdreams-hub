"""
CyberDreams AI Trading Bot - Konfiguration
============================================
Zentrale Konfigurationsdatei für alle Bot-Parameter.
"""

import os
from dotenv import load_dotenv

load_dotenv()

# ============================================================
# EXCHANGE-KONFIGURATION
# ============================================================
EXCHANGE_CONFIG = {
    "exchange_id": os.getenv("EXCHANGE_ID", "binance"),
    "api_key": os.getenv("EXCHANGE_API_KEY", ""),
    "api_secret": os.getenv("EXCHANGE_API_SECRET", ""),
    "sandbox": os.getenv("EXCHANGE_SANDBOX", "true").lower() == "true",
    "options": {
        "defaultType": "spot",
        "adjustForTimeDifference": True,
    },
}

# ============================================================
# TRADING-PARAMETER
# ============================================================
TRADING_CONFIG = {
    # Handelspaare
    "symbols": ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT", "XRP/USDT"],
    # Zeitrahmen für Analyse
    "timeframes": ["1h", "4h", "1d"],
    # Primärer Zeitrahmen für Signale
    "primary_timeframe": "1h",
    # Maximale gleichzeitige Positionen
    "max_positions": 3,
    # Startkapital (Paper Trading)
    "initial_capital": 10000.0,
    # Mindest-Handelsvolumen in USDT
    "min_trade_amount": 10.0,
}

# ============================================================
# KI-MODELL-KONFIGURATION
# ============================================================
AI_CONFIG = {
    # Modelltyp: "ensemble" (LightGBM + XGBoost + RandomForest)
    "model_type": "ensemble",
    # Lookback-Periode für Features (Anzahl Kerzen)
    "lookback_period": 100,
    # Trainings-Split (80% Training, 20% Validierung)
    "train_split": 0.8,
    # Mindest-Konfidenz für Trades (0.0 - 1.0)
    "min_confidence": 0.65,
    # Retrain-Intervall in Stunden
    "retrain_interval_hours": 24,
    # Feature-Importance-Schwelle
    "feature_importance_threshold": 0.01,
}

# ============================================================
# RISIKOMANAGEMENT
# ============================================================
RISK_CONFIG = {
    # Maximaler Verlust pro Trade (% des Portfolios)
    "max_risk_per_trade": 0.02,
    # Stop-Loss (% vom Einstiegspreis)
    "stop_loss_pct": 0.03,
    # Take-Profit (% vom Einstiegspreis)
    "take_profit_pct": 0.06,
    # Trailing-Stop aktivieren
    "trailing_stop": True,
    # Trailing-Stop-Distanz (%)
    "trailing_stop_pct": 0.02,
    # Maximaler Drawdown bevor Bot pausiert (%)
    "max_drawdown": 0.10,
    # Maximaler täglicher Verlust (%)
    "max_daily_loss": 0.05,
    # Cooldown nach Verlust-Trade (Minuten)
    "loss_cooldown_minutes": 30,
}

# ============================================================
# TECHNISCHE INDIKATOREN
# ============================================================
INDICATOR_CONFIG = {
    # RSI
    "rsi_period": 14,
    "rsi_overbought": 70,
    "rsi_oversold": 30,
    # MACD
    "macd_fast": 12,
    "macd_slow": 26,
    "macd_signal": 9,
    # Bollinger Bands
    "bb_period": 20,
    "bb_std": 2.0,
    # EMA
    "ema_short": 9,
    "ema_medium": 21,
    "ema_long": 50,
    # ATR
    "atr_period": 14,
    # Stochastic
    "stoch_k": 14,
    "stoch_d": 3,
    # Volume
    "volume_ma_period": 20,
    # ADX
    "adx_period": 14,
    "adx_threshold": 25,
}

# ============================================================
# BACKTESTING
# ============================================================
BACKTEST_CONFIG = {
    # Historische Daten (Tage)
    "history_days": 365,
    # Kommission pro Trade (%)
    "commission": 0.001,
    # Slippage (%)
    "slippage": 0.0005,
}

# ============================================================
# DASHBOARD
# ============================================================
DASHBOARD_CONFIG = {
    "host": "0.0.0.0",
    "port": 5000,
    "debug": False,
    "secret_key": os.getenv("DASHBOARD_SECRET", "cyberdreams-trading-2025"),
}

# ============================================================
# LOGGING
# ============================================================
LOG_CONFIG = {
    "level": "INFO",
    "file": "logs/trading_bot.log",
    "max_size_mb": 50,
    "backup_count": 5,
}

# ============================================================
# BENACHRICHTIGUNGEN
# ============================================================
NOTIFICATION_CONFIG = {
    "enabled": os.getenv("NOTIFICATIONS_ENABLED", "false").lower() == "true",
    "telegram_token": os.getenv("TELEGRAM_BOT_TOKEN", ""),
    "telegram_chat_id": os.getenv("TELEGRAM_CHAT_ID", ""),
    "email_enabled": os.getenv("EMAIL_NOTIFICATIONS", "false").lower() == "true",
}
