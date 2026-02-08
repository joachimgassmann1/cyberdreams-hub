"""
CyberDreams AI Trading Bot - Main Application
=============================================
Haupt-Einstiegspunkt zum Starten des Bots in verschiedenen Modi.
"""

import argparse
import os
import sys
import threading
import time
from datetime import datetime

from config.settings import TRADING_CONFIG, DASHBOARD_CONFIG
from core.exchange import ExchangeConnector
from core.trading_engine import TradingEngine
from dashboard.app import run_dashboard, set_engine
from utils.logger import log


def run_live_trading(engine: TradingEngine):
    """Führt den Live-Trading-Loop aus."""
    log.info("🚀 Starte Live-Trading-Loop...")
    engine.is_running = True

    while engine.is_running:
        if not engine.is_paused:
            log.info("--- Neuer Trading-Zyklus --- ")
            result = engine.run_cycle()
            engine.save_state()
            log.info(f"Portfolio-Wert: ${result["portfolio"]["total_value"]:,.2f}")
            log.info("--- Zyklus beendet ---")
        else:
            log.info("⏸️ Bot ist pausiert...")

        # Wartezeit basierend auf dem primären Zeitrahmen
        timeframe = TRADING_CONFIG["primary_timeframe"]
        if "m" in timeframe:
            sleep_seconds = int(timeframe.replace("m", "")) * 60
        elif "h" in timeframe:
            sleep_seconds = int(timeframe.replace("h", "")) * 3600
        else:
            sleep_seconds = 3600  # Standard: 1 Stunde

        log.info(f"Warte {sleep_seconds // 60} Minuten bis zum nächsten Zyklus...")
        time.sleep(sleep_seconds)

    log.info("🛑 Trading-Loop beendet.")


def run_backtest(args):
    """Führt einen Backtest durch."""
    from backtest.backtester import Backtester

    log.info("🔬 Starte Backtest...")
    backtester = Backtester()
    exchange = ExchangeConnector(paper_trading=True)

    # Daten laden
    df = exchange.fetch_historical_data(
        args.symbol,
        args.timeframe,
        days=args.days,
    )

    if df.empty:
        log.error("Keine Daten für den Backtest gefunden.")
        return

    # Backtest ausführen
    result = backtester.run(
        df,
        initial_capital=args.capital,
        use_ai=not args.no_ai,
        symbol=args.symbol,
    )

    # Ergebnisse speichern
    output_dir = "backtest/results"
    os.makedirs(output_dir, exist_ok=True)
    filename = f"backtest_{args.symbol.replace("/", "")}_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json"
    filepath = os.path.join(output_dir, filename)

    with open(filepath, "w") as f:
        import json
        json.dump(result.to_dict(), f, indent=2)

    log.info(f"✅ Backtest-Ergebnisse gespeichert: {filepath}")
    print(json.dumps(result.calculate_metrics(), indent=2))


def main():
    """Hauptfunktion mit Argument-Parser."""
    parser = argparse.ArgumentParser(description="CyberDreams AI Trading Bot")
    subparsers = parser.add_subparsers(dest="mode", required=True)

    # Live/Paper Trading Modus
    trade_parser = subparsers.add_parser("trade", help="Live- oder Paper-Trading starten")
    trade_parser.add_argument("--live", action="store_true", help="Live-Trading mit echtem Geld")

    # Backtest Modus
    backtest_parser = subparsers.add_parser("backtest", help="Strategie-Backtesting")
    backtest_parser.add_argument("-s", "--symbol", default="BTC/USDT", help="Handelspaar")
    backtest_parser.add_argument("-t", "--timeframe", default="1h", help="Zeitrahmen")
    backtest_parser.add_argument("-d", "--days", type=int, default=365, help="Anzahl Tage")
    backtest_parser.add_argument("-c", "--capital", type=float, default=10000, help="Startkapital")
    backtest_parser.add_argument("--no-ai", action="store_true", help="KI-Modell deaktivieren")

    # Dashboard Modus
    subparsers.add_parser("dashboard", help="Nur das Web-Dashboard starten")

    args = parser.parse_args()

    if args.mode == "trade":
        is_paper = not args.live
        engine = TradingEngine(paper_trading=is_paper)
        engine.initialize()
        engine.load_state()

        # Dashboard in einem separaten Thread starten
        dashboard_thread = threading.Thread(
            target=run_dashboard,
            args=(engine, DASHBOARD_CONFIG["host"], DASHBOARD_CONFIG["port"]),
            daemon=True,
        )
        dashboard_thread.start()

        # Trading-Loop im Haupt-Thread starten
        run_live_trading(engine)

    elif args.mode == "backtest":
        run_backtest(args)

    elif args.mode == "dashboard":
        # Dashboard ohne Trading-Engine starten (nur für UI-Entwicklung)
        run_dashboard(host=DASHBOARD_CONFIG["host"], port=DASHBOARD_CONFIG["port"])


if __name__ == "__main__":
    main()
