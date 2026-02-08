# CyberDreams AI Trading Bot

Ein voll funktionsfähiger, KI-gesteuerter Trading-Bot für Kryptowährungen, entwickelt mit Python. Dieses Projekt kombiniert modernste Machine-Learning-Techniken mit robusten Trading-Strategien und einem umfassenden Risikomanagement.

![Dashboard Screenshot](https://i.imgur.com/your-screenshot.png) <!-- Platzhalter für Screenshot -->

## Features

- **KI-Ensemble-Modell**: Nutzt ein gewichtetes Ensemble aus **LightGBM, XGBoost und RandomForest** für präzise Marktvorhersagen.
- **Multi-Strategie-Ansatz**: Kombiniert Trendfolge-, Mean-Reversion-, Momentum- und Volatilitäts-Breakout-Strategien.
- **Umfassendes Risikomanagement**: Dynamisches Position-Sizing (Kelly-Criterion), ATR-basierter Stop-Loss, Drawdown-Kontrolle und Portfolio-Optimierung.
- **Echtzeit-Web-Dashboard**: Interaktives Dashboard mit Flask und Socket.IO zur Live-Überwachung von Portfolio, Trades, KI-Signalen und Performance.
- **Backtesting-Engine**: Integriertes System für detaillierte Backtests und Walk-Forward-Analysen zur Validierung von Strategien.
- **Multi-Exchange-Support**: Einfache Anbindung an über 100 Krypto-Börsen dank der **CCXT**-Bibliothek.
- **Paper-Trading-Modus**: Risikofreies Testen der Strategien im Simulationsmodus.
- **Modulare Architektur**: Klar strukturierter und erweiterbarer Code, aufgeteilt in logische Module (Core, KI, Strategien, Dashboard, etc.).

## Architektur

Der Bot ist in mehrere logische Komponenten unterteilt, um eine hohe Wartbarkeit und Erweiterbarkeit zu gewährleisten:

- **/core**: Enthält die `TradingEngine`, den `ExchangeConnector` und das `RiskManager`-Modul.
- **/models**: Beinhaltet das `TradingAIModel` mit dem Ensemble-Ansatz.
- **/strategies**: Implementiert verschiedene Trading-Strategien (`TrendFollowing`, `MeanReversion`, etc.).
- **/dashboard**: Die Flask-Webanwendung für das Echtzeit-Dashboard.
- **/backtest**: Die Backtesting-Engine zur Strategie-Validierung.
- **/config**: Zentrale Konfigurationsdateien.
- **/utils**: Hilfsfunktionen wie der Logger.

## Erste Schritte

### 1. Voraussetzungen

- Python 3.9+
- Git

### 2. Installation

1.  **Repository klonen:**
    ```bash
    git clone https://github.com/joachimgassmann1/cyberdreams-hub.git
    cd cyberdreams-hub/ai-trading-bot
    ```

2.  **Abhängigkeiten installieren:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Konfiguration einrichten:**

    Kopieren Sie die `.env.example`-Datei zu `.env` und passen Sie die Werte an.

    ```bash
    cp .env.example .env
    ```

    -   Für **Paper-Trading** sind keine API-Schlüssel erforderlich (`EXCHANGE_SANDBOX=true`).
    -   Für **Live-Trading** tragen Sie Ihre API-Schlüssel ein und setzen `EXCHANGE_SANDBOX=false`.

### 3. Verwendung

Der Bot kann in verschiedenen Modi gestartet werden:

#### a) Paper-Trading mit Dashboard

Dies ist der Standardmodus. Der Bot handelt simuliert und Sie können die Aktivitäten im Web-Dashboard verfolgen.

```bash
python main.py trade
```

Öffnen Sie anschließend Ihr Browser und navigieren Sie zu `http://127.0.0.1:5000`.

#### b) Live-Trading

**WARNUNG:** Die Verwendung im Live-Modus erfolgt auf eigene Gefahr. Stellen Sie sicher, dass Sie die Konfiguration und die Risikoparameter sorgfältig geprüft haben.

```bash
python main.py trade --live
```

#### c) Backtesting

Führen Sie einen Backtest für ein bestimmtes Handelspaar und einen bestimmten Zeitraum durch.

```bash
python main.py backtest --symbol "BTC/USDT" --timeframe "1h" --days 365
```

Die Ergebnisse werden in der Konsole ausgegeben und als JSON-Datei im Ordner `backtest/results` gespeichert.

## Haftungsausschluss

Dieses Projekt dient ausschließlich zu Bildungs- und Demonstrationszwecken. Der Handel mit Kryptowährungen birgt ein hohes Risiko und kann zum Totalverlust des eingesetzten Kapitals führen. Die Entwickler übernehmen keine Haftung für finanzielle Verluste, die durch die Verwendung dieses Bots entstehen. Handeln Sie verantwortungsbewusst.
