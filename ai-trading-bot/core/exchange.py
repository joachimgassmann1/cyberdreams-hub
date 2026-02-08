"""
CyberDreams AI Trading Bot - Exchange Connector
=================================================
Verbindung zu Krypto-Börsen via CCXT mit Paper-Trading-Fallback.
"""

import ccxt
import time
import pandas as pd
from typing import Optional, Dict, List
from config.settings import EXCHANGE_CONFIG, TRADING_CONFIG
from utils.logger import log


class ExchangeConnector:
    """Verwaltet die Verbindung zur Krypto-Börse."""

    def __init__(self, paper_trading: bool = True):
        self.paper_trading = paper_trading
        self.exchange = None
        self._init_exchange()

    def _init_exchange(self):
        """Initialisiert die Exchange-Verbindung."""
        exchange_id = EXCHANGE_CONFIG["exchange_id"]

        try:
            exchange_class = getattr(ccxt, exchange_id)
            config = {
                "apiKey": EXCHANGE_CONFIG["api_key"],
                "secret": EXCHANGE_CONFIG["api_secret"],
                "options": EXCHANGE_CONFIG["options"],
                "enableRateLimit": True,
            }

            if EXCHANGE_CONFIG["sandbox"] or self.paper_trading:
                config["sandbox"] = True

            self.exchange = exchange_class(config)

            if self.paper_trading:
                log.info(f"📊 Paper-Trading-Modus aktiv ({exchange_id})")
            else:
                log.info(f"🔗 Verbunden mit {exchange_id}")

        except Exception as e:
            log.warning(f"Exchange-Verbindung fehlgeschlagen: {e}")
            log.info("Verwende Offline-Modus mit historischen Daten")
            self.exchange = getattr(ccxt, exchange_id)({"enableRateLimit": True})

    def fetch_ohlcv(
        self,
        symbol: str,
        timeframe: str = "1h",
        limit: int = 500,
        since: Optional[int] = None,
    ) -> pd.DataFrame:
        """
        Holt OHLCV-Daten (Open, High, Low, Close, Volume).

        Args:
            symbol: Handelspaar (z.B. 'BTC/USDT')
            timeframe: Zeitrahmen ('1m', '5m', '1h', '4h', '1d')
            limit: Anzahl der Kerzen
            since: Startzeit als Unix-Timestamp (ms)

        Returns:
            DataFrame mit OHLCV-Daten
        """
        try:
            ohlcv = self.exchange.fetch_ohlcv(
                symbol, timeframe, since=since, limit=limit
            )

            df = pd.DataFrame(
                ohlcv, columns=["timestamp", "open", "high", "low", "close", "volume"]
            )
            df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms")
            df.set_index("timestamp", inplace=True)
            df = df.astype(float)

            log.debug(
                f"OHLCV geladen: {symbol} {timeframe} - {len(df)} Kerzen"
            )
            return df

        except Exception as e:
            log.error(f"Fehler beim Laden von OHLCV ({symbol}): {e}")
            return pd.DataFrame()

    def fetch_ticker(self, symbol: str) -> Dict:
        """Holt den aktuellen Ticker für ein Symbol."""
        try:
            return self.exchange.fetch_ticker(symbol)
        except Exception as e:
            log.error(f"Ticker-Fehler ({symbol}): {e}")
            return {}

    def fetch_order_book(self, symbol: str, limit: int = 20) -> Dict:
        """Holt das Orderbuch."""
        try:
            return self.exchange.fetch_order_book(symbol, limit)
        except Exception as e:
            log.error(f"Orderbuch-Fehler ({symbol}): {e}")
            return {}

    def fetch_balance(self) -> Dict:
        """Holt den Kontostand."""
        try:
            if self.paper_trading:
                return {"USDT": {"free": TRADING_CONFIG["initial_capital"], "used": 0}}
            return self.exchange.fetch_balance()
        except Exception as e:
            log.error(f"Balance-Fehler: {e}")
            return {}

    def create_order(
        self,
        symbol: str,
        order_type: str,
        side: str,
        amount: float,
        price: Optional[float] = None,
    ) -> Dict:
        """
        Erstellt eine Order.

        Args:
            symbol: Handelspaar
            order_type: 'market' oder 'limit'
            side: 'buy' oder 'sell'
            amount: Menge
            price: Preis (nur bei Limit-Orders)

        Returns:
            Order-Details
        """
        try:
            if self.paper_trading:
                log.info(
                    f"📝 Paper-Order: {side.upper()} {amount} {symbol} @ {order_type}"
                )
                return {
                    "id": f"paper_{int(time.time()*1000)}",
                    "symbol": symbol,
                    "type": order_type,
                    "side": side,
                    "amount": amount,
                    "price": price,
                    "status": "filled",
                    "paper": True,
                }

            if order_type == "market":
                order = self.exchange.create_market_order(symbol, side, amount)
            else:
                order = self.exchange.create_limit_order(
                    symbol, side, amount, price
                )

            log.info(
                f"✅ Order erstellt: {side.upper()} {amount} {symbol} - ID: {order['id']}"
            )
            return order

        except Exception as e:
            log.error(f"Order-Fehler: {e}")
            return {"error": str(e)}

    def cancel_order(self, order_id: str, symbol: str) -> Dict:
        """Storniert eine Order."""
        try:
            if self.paper_trading:
                return {"id": order_id, "status": "canceled"}
            return self.exchange.cancel_order(order_id, symbol)
        except Exception as e:
            log.error(f"Cancel-Fehler: {e}")
            return {"error": str(e)}

    def get_supported_symbols(self) -> List[str]:
        """Gibt alle unterstützten Handelspaare zurück."""
        try:
            self.exchange.load_markets()
            return list(self.exchange.markets.keys())
        except Exception as e:
            log.error(f"Markets-Fehler: {e}")
            return TRADING_CONFIG["symbols"]

    def fetch_historical_data(
        self, symbol: str, timeframe: str, days: int = 365
    ) -> pd.DataFrame:
        """
        Holt umfangreiche historische Daten durch mehrere API-Aufrufe.

        Args:
            symbol: Handelspaar
            timeframe: Zeitrahmen
            days: Anzahl Tage

        Returns:
            DataFrame mit historischen OHLCV-Daten
        """
        all_data = []
        timeframe_ms = self._timeframe_to_ms(timeframe)
        since = int((time.time() - days * 86400) * 1000)
        now = int(time.time() * 1000)

        while since < now:
            try:
                ohlcv = self.exchange.fetch_ohlcv(
                    symbol, timeframe, since=since, limit=1000
                )
                if not ohlcv:
                    break
                all_data.extend(ohlcv)
                since = ohlcv[-1][0] + timeframe_ms
                time.sleep(self.exchange.rateLimit / 1000)
            except Exception as e:
                log.error(f"Historische Daten Fehler: {e}")
                break

        if not all_data:
            return pd.DataFrame()

        df = pd.DataFrame(
            all_data, columns=["timestamp", "open", "high", "low", "close", "volume"]
        )
        df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms")
        df.set_index("timestamp", inplace=True)
        df = df.astype(float)
        df = df[~df.index.duplicated(keep="first")]
        df.sort_index(inplace=True)

        log.info(
            f"📈 Historische Daten geladen: {symbol} {timeframe} - {len(df)} Kerzen ({days} Tage)"
        )
        return df

    @staticmethod
    def _timeframe_to_ms(timeframe: str) -> int:
        """Konvertiert Zeitrahmen zu Millisekunden."""
        multipliers = {
            "1m": 60000,
            "5m": 300000,
            "15m": 900000,
            "30m": 1800000,
            "1h": 3600000,
            "4h": 14400000,
            "1d": 86400000,
        }
        return multipliers.get(timeframe, 3600000)
