"""
CyberDreams AI Trading Bot - Web Dashboard
=============================================
Echtzeit-Dashboard zur Überwachung des Trading-Bots.
"""

import json
import os
import sys
import threading
import time
from datetime import datetime

from flask import Flask, render_template_string, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit

# Pfad für Imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config.settings import DASHBOARD_CONFIG, TRADING_CONFIG, RISK_CONFIG, AI_CONFIG
from utils.logger import log

app = Flask(__name__)
app.config["SECRET_KEY"] = DASHBOARD_CONFIG["secret_key"]
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading")

# Globaler Bot-Referenz
trading_engine = None


def set_engine(engine):
    """Setzt die Trading-Engine-Referenz."""
    global trading_engine
    trading_engine = engine


# ============================================================
# HTML TEMPLATE
# ============================================================
DASHBOARD_HTML = """
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CyberDreams AI Trading Bot</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.2/socket.io.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
            --bg-primary: #0a0e17;
            --bg-secondary: #111827;
            --bg-card: #1a2332;
            --bg-card-hover: #1f2b3d;
            --text-primary: #e2e8f0;
            --text-secondary: #94a3b8;
            --text-muted: #64748b;
            --accent-blue: #3b82f6;
            --accent-cyan: #06b6d4;
            --accent-green: #10b981;
            --accent-red: #ef4444;
            --accent-yellow: #f59e0b;
            --accent-purple: #8b5cf6;
            --border: #1e293b;
            --gradient-1: linear-gradient(135deg, #3b82f6, #06b6d4);
            --gradient-2: linear-gradient(135deg, #10b981, #06b6d4);
            --gradient-3: linear-gradient(135deg, #ef4444, #f59e0b);
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            min-height: 100vh;
        }

        .header {
            background: var(--bg-secondary);
            border-bottom: 1px solid var(--border);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .header h1 {
            font-size: 1.5rem;
            background: var(--gradient-1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
        }

        .header .status {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .status-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }

        .status-dot.active { background: var(--accent-green); }
        .status-dot.paused { background: var(--accent-yellow); }
        .status-dot.stopped { background: var(--accent-red); }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 1.5rem;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1.25rem;
            transition: all 0.3s ease;
        }

        .card:hover {
            background: var(--bg-card-hover);
            border-color: var(--accent-blue);
            transform: translateY(-2px);
        }

        .card-title {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
            margin-bottom: 0.5rem;
        }

        .card-value {
            font-size: 1.75rem;
            font-weight: 700;
            margin-bottom: 0.25rem;
        }

        .card-change {
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        .positive { color: var(--accent-green); }
        .negative { color: var(--accent-red); }
        .neutral { color: var(--text-secondary); }

        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
            .grid-2 { grid-template-columns: 1fr; }
        }

        .section-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid var(--border);
            font-size: 0.85rem;
        }

        th {
            color: var(--text-muted);
            font-weight: 500;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.05em;
        }

        .badge {
            display: inline-block;
            padding: 0.2rem 0.6rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .badge-buy { background: rgba(16, 185, 129, 0.15); color: var(--accent-green); }
        .badge-sell { background: rgba(239, 68, 68, 0.15); color: var(--accent-red); }
        .badge-hold { background: rgba(148, 163, 184, 0.15); color: var(--text-secondary); }

        .signal-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            border-radius: 8px;
            background: rgba(255,255,255,0.03);
            margin-bottom: 0.5rem;
        }

        .chart-container {
            position: relative;
            height: 300px;
            width: 100%;
        }

        .controls {
            display: flex;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
        }

        .btn {
            padding: 0.6rem 1.25rem;
            border: none;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-primary {
            background: var(--gradient-1);
            color: white;
        }

        .btn-success {
            background: var(--accent-green);
            color: white;
        }

        .btn-danger {
            background: var(--accent-red);
            color: white;
        }

        .btn-warning {
            background: var(--accent-yellow);
            color: #1a1a1a;
        }

        .btn:hover { opacity: 0.85; transform: translateY(-1px); }

        .risk-meter {
            height: 8px;
            background: var(--border);
            border-radius: 4px;
            overflow: hidden;
            margin-top: 0.5rem;
        }

        .risk-meter-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.5s ease;
        }

        .risk-low { background: var(--accent-green); }
        .risk-medium { background: var(--accent-yellow); }
        .risk-high { background: var(--accent-red); }

        .log-container {
            max-height: 300px;
            overflow-y: auto;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            line-height: 1.6;
        }

        .log-entry {
            padding: 0.25rem 0;
            border-bottom: 1px solid rgba(255,255,255,0.03);
        }

        .log-time { color: var(--text-muted); }
        .log-info { color: var(--accent-cyan); }
        .log-trade { color: var(--accent-green); }
        .log-warning { color: var(--accent-yellow); }
        .log-error { color: var(--accent-red); }

        .model-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
        }

        .model-stat {
            padding: 0.5rem;
            background: rgba(255,255,255,0.03);
            border-radius: 6px;
        }

        .model-stat-label {
            font-size: 0.7rem;
            color: var(--text-muted);
            text-transform: uppercase;
        }

        .model-stat-value {
            font-size: 1rem;
            font-weight: 600;
            margin-top: 0.25rem;
        }

        .footer {
            text-align: center;
            padding: 2rem;
            color: var(--text-muted);
            font-size: 0.8rem;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>&#x1F916; CyberDreams AI Trading Bot</h1>
        <div class="status">
            <div class="status-dot" id="statusDot"></div>
            <span id="statusText">Verbinde...</span>
            <span style="color: var(--text-muted); margin-left: 1rem;" id="lastUpdate"></span>
        </div>
    </div>

    <div class="container">
        <!-- Steuerung -->
        <div class="controls">
            <button class="btn btn-success" onclick="startBot()">&#x25B6; Start</button>
            <button class="btn btn-warning" onclick="pauseBot()">&#x23F8; Pause</button>
            <button class="btn btn-danger" onclick="stopBot()">&#x23F9; Stop</button>
            <button class="btn btn-primary" onclick="runCycle()">&#x1F504; Zyklus ausf&uuml;hren</button>
            <button class="btn btn-primary" onclick="refreshData()">&#x1F4CA; Aktualisieren</button>
        </div>

        <!-- KPI Cards -->
        <div class="grid">
            <div class="card">
                <div class="card-title">Portfolio-Wert</div>
                <div class="card-value" id="totalValue">$0.00</div>
                <div class="card-change" id="totalReturn">--</div>
            </div>
            <div class="card">
                <div class="card-title">Verf&uuml;gbares Kapital</div>
                <div class="card-value" id="balance">$0.00</div>
                <div class="card-change neutral">Cash Balance</div>
            </div>
            <div class="card">
                <div class="card-title">Gesamt P&L</div>
                <div class="card-value" id="totalPnl">$0.00</div>
                <div class="card-change" id="dailyPnl">Heute: --</div>
            </div>
            <div class="card">
                <div class="card-title">Win Rate</div>
                <div class="card-value" id="winRate">0%</div>
                <div class="card-change" id="tradeCount">0 Trades</div>
            </div>
            <div class="card">
                <div class="card-title">Offene Positionen</div>
                <div class="card-value" id="openPositions">0</div>
                <div class="card-change" id="positionsValue">$0.00</div>
            </div>
            <div class="card">
                <div class="card-title">Max Drawdown</div>
                <div class="card-value" id="maxDrawdown">0%</div>
                <div class="risk-meter">
                    <div class="risk-meter-fill risk-low" id="drawdownMeter" style="width: 0%"></div>
                </div>
            </div>
        </div>

        <!-- Charts und Signale -->
        <div class="grid-2">
            <div class="card">
                <div class="section-title">&#x1F4C8; Portfolio-Entwicklung</div>
                <div class="chart-container">
                    <canvas id="portfolioChart"></canvas>
                </div>
            </div>
            <div class="card">
                <div class="section-title">&#x1F9E0; KI-Signale</div>
                <div id="signalsList">
                    <p style="color: var(--text-muted);">Warte auf Analyse...</p>
                </div>
            </div>
        </div>

        <!-- Positionen und Trades -->
        <div class="grid-2">
            <div class="card">
                <div class="section-title">&#x1F4BC; Offene Positionen</div>
                <table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Seite</th>
                            <th>Einstieg</th>
                            <th>P&L</th>
                            <th>SL / TP</th>
                        </tr>
                    </thead>
                    <tbody id="positionsTable">
                        <tr><td colspan="5" style="color: var(--text-muted);">Keine offenen Positionen</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="card">
                <div class="section-title">&#x1F4DD; Letzte Trades</div>
                <table>
                    <thead>
                        <tr>
                            <th>Zeit</th>
                            <th>Typ</th>
                            <th>Symbol</th>
                            <th>Preis</th>
                            <th>P&L</th>
                        </tr>
                    </thead>
                    <tbody id="tradesTable">
                        <tr><td colspan="5" style="color: var(--text-muted);">Keine Trades</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modell-Info und Log -->
        <div class="grid-2">
            <div class="card">
                <div class="section-title">&#x1F9E0; KI-Modell Status</div>
                <div class="model-info" id="modelInfo">
                    <div class="model-stat">
                        <div class="model-stat-label">Status</div>
                        <div class="model-stat-value" id="modelStatus">Nicht trainiert</div>
                    </div>
                    <div class="model-stat">
                        <div class="model-stat-label">Accuracy</div>
                        <div class="model-stat-value" id="modelAccuracy">--</div>
                    </div>
                    <div class="model-stat">
                        <div class="model-stat-label">F1-Score</div>
                        <div class="model-stat-value" id="modelF1">--</div>
                    </div>
                    <div class="model-stat">
                        <div class="model-stat-label">Features</div>
                        <div class="model-stat-value" id="modelFeatures">--</div>
                    </div>
                    <div class="model-stat">
                        <div class="model-stat-label">Letztes Training</div>
                        <div class="model-stat-value" id="modelLastTrain">--</div>
                    </div>
                    <div class="model-stat">
                        <div class="model-stat-label">Min. Konfidenz</div>
                        <div class="model-stat-value" id="modelConfidence">--</div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="section-title">&#x1F4CB; Live-Log</div>
                <div class="log-container" id="logContainer">
                    <div class="log-entry">
                        <span class="log-time">[System]</span>
                        <span class="log-info">Dashboard gestartet. Warte auf Bot-Verbindung...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        CyberDreams AI Trading Bot v1.0 | Paper Trading Modus |
        &#x26A0; Kein finanzieller Rat - Nur zu Bildungszwecken
    </div>

    <script>
        const socket = io();
        let portfolioChart;
        let portfolioData = { labels: [], values: [] };

        // Chart initialisieren
        function initChart() {
            const ctx = document.getElementById('portfolioChart').getContext('2d');
            portfolioChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: portfolioData.labels,
                    datasets: [{
                        label: 'Portfolio-Wert ($)',
                        data: portfolioData.values,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        borderWidth: 2,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: {
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            ticks: { color: '#64748b', maxTicksLimit: 10 }
                        },
                        y: {
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            ticks: { color: '#64748b', callback: v => '$' + v.toLocaleString() }
                        }
                    }
                }
            });
        }

        // Dashboard aktualisieren
        function updateDashboard(data) {
            if (!data || !data.portfolio) return;
            const p = data.portfolio;

            document.getElementById('totalValue').textContent = '$' + (p.total_value || 0).toLocaleString(undefined, {minimumFractionDigits: 2});
            document.getElementById('balance').textContent = '$' + (p.balance || 0).toLocaleString(undefined, {minimumFractionDigits: 2});

            const totalPnl = p.total_pnl || 0;
            document.getElementById('totalPnl').textContent = (totalPnl >= 0 ? '+$' : '-$') + Math.abs(totalPnl).toLocaleString(undefined, {minimumFractionDigits: 2});
            document.getElementById('totalPnl').className = 'card-value ' + (totalPnl >= 0 ? 'positive' : 'negative');

            const dailyPnl = p.daily_pnl || 0;
            document.getElementById('dailyPnl').textContent = 'Heute: ' + (dailyPnl >= 0 ? '+' : '') + '$' + dailyPnl.toFixed(2);
            document.getElementById('dailyPnl').className = 'card-change ' + (dailyPnl >= 0 ? 'positive' : 'negative');

            const totalReturn = p.total_return_pct || 0;
            document.getElementById('totalReturn').textContent = (totalReturn >= 0 ? '+' : '') + totalReturn.toFixed(2) + '%';
            document.getElementById('totalReturn').className = 'card-change ' + (totalReturn >= 0 ? 'positive' : 'negative');

            document.getElementById('winRate').textContent = (p.win_rate || 0).toFixed(1) + '%';
            document.getElementById('tradeCount').textContent = (p.total_trades || 0) + ' Trades (' + (p.winning_trades || 0) + 'W / ' + (p.losing_trades || 0) + 'L)';

            const positions = p.open_positions || [];
            document.getElementById('openPositions').textContent = positions.length;
            document.getElementById('positionsValue').textContent = '$' + (p.open_positions_value || 0).toFixed(2);

            const dd = p.max_drawdown || 0;
            document.getElementById('maxDrawdown').textContent = dd.toFixed(2) + '%';
            const ddMeter = document.getElementById('drawdownMeter');
            ddMeter.style.width = Math.min(dd * 10, 100) + '%';
            ddMeter.className = 'risk-meter-fill ' + (dd < 3 ? 'risk-low' : dd < 7 ? 'risk-medium' : 'risk-high');

            // Status
            const dot = document.getElementById('statusDot');
            const text = document.getElementById('statusText');
            if (p.is_running) {
                dot.className = 'status-dot active';
                text.textContent = p.is_paused ? 'Pausiert' : 'Aktiv';
            } else {
                dot.className = 'status-dot stopped';
                text.textContent = 'Gestoppt';
            }

            // Positionen
            updatePositions(positions);

            // Modell-Info
            if (p.model_info) updateModelInfo(p.model_info);

            // Chart
            const now = new Date().toLocaleTimeString('de-DE');
            portfolioData.labels.push(now);
            portfolioData.values.push(p.total_value || 0);
            if (portfolioData.labels.length > 100) {
                portfolioData.labels.shift();
                portfolioData.values.shift();
            }
            if (portfolioChart) portfolioChart.update();

            document.getElementById('lastUpdate').textContent = 'Aktualisiert: ' + now;
        }

        function updatePositions(positions) {
            const tbody = document.getElementById('positionsTable');
            if (!positions || positions.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="color: var(--text-muted);">Keine offenen Positionen</td></tr>';
                return;
            }
            tbody.innerHTML = positions.map(p => `
                <tr>
                    <td><strong>${p.symbol}</strong></td>
                    <td><span class="badge badge-buy">${p.side.toUpperCase()}</span></td>
                    <td>$${(p.entry_price || 0).toLocaleString()}</td>
                    <td class="${(p.pnl || 0) >= 0 ? 'positive' : 'negative'}">
                        ${(p.pnl || 0) >= 0 ? '+' : ''}$${(p.pnl || 0).toFixed(2)}
                        (${(p.pnl_pct || 0).toFixed(2)}%)
                    </td>
                    <td>$${(p.stop_loss || 0).toFixed(2)} / $${(p.take_profit || 0).toFixed(2)}</td>
                </tr>
            `).join('');
        }

        function updateSignals(analyses) {
            const container = document.getElementById('signalsList');
            if (!analyses || Object.keys(analyses).length === 0) {
                container.innerHTML = '<p style="color: var(--text-muted);">Warte auf Analyse...</p>';
                return;
            }
            container.innerHTML = Object.entries(analyses).map(([symbol, a]) => {
                const rec = a.recommendation || {};
                const ai = a.ai_signal || {};
                const action = rec.action || 'HOLD';
                const badgeClass = action === 'BUY' ? 'badge-buy' : action === 'SELL' ? 'badge-sell' : 'badge-hold';
                return `
                    <div class="signal-card">
                        <div>
                            <strong>${symbol}</strong>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">
                                $${(a.current_price || 0).toLocaleString()} | Konfidenz: ${((ai.confidence || 0) * 100).toFixed(1)}%
                            </div>
                        </div>
                        <span class="badge ${badgeClass}">${action}</span>
                    </div>
                `;
            }).join('');
        }

        function updateTrades(trades) {
            const tbody = document.getElementById('tradesTable');
            if (!trades || trades.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="color: var(--text-muted);">Keine Trades</td></tr>';
                return;
            }
            tbody.innerHTML = trades.slice(-10).reverse().map(t => {
                const badgeClass = t.type === 'BUY' ? 'badge-buy' : 'badge-sell';
                const pnl = t.pnl || 0;
                const time = t.timestamp ? new Date(t.timestamp).toLocaleTimeString('de-DE') : '--';
                return `
                    <tr>
                        <td>${time}</td>
                        <td><span class="badge ${badgeClass}">${t.type}</span></td>
                        <td>${t.symbol}</td>
                        <td>$${(t.price || 0).toLocaleString()}</td>
                        <td class="${pnl >= 0 ? 'positive' : 'negative'}">
                            ${t.type === 'SELL' ? (pnl >= 0 ? '+' : '') + '$' + pnl.toFixed(2) : '--'}
                        </td>
                    </tr>
                `;
            }).join('');
        }

        function updateModelInfo(info) {
            document.getElementById('modelStatus').textContent = info.is_trained ? 'Trainiert' : 'Nicht trainiert';
            document.getElementById('modelStatus').style.color = info.is_trained ? 'var(--accent-green)' : 'var(--accent-red)';

            const metrics = info.train_metrics || {};
            document.getElementById('modelAccuracy').textContent = metrics.accuracy ? (metrics.accuracy * 100).toFixed(1) + '%' : '--';
            document.getElementById('modelF1').textContent = metrics.f1_score ? (metrics.f1_score * 100).toFixed(1) + '%' : '--';
            document.getElementById('modelFeatures').textContent = info.feature_count || '--';
            document.getElementById('modelLastTrain').textContent = info.last_train_time ? new Date(info.last_train_time).toLocaleString('de-DE') : '--';
            document.getElementById('modelConfidence').textContent = ((info.min_confidence || 0) * 100) + '%';
        }

        function addLog(message, type = 'info') {
            const container = document.getElementById('logContainer');
            const time = new Date().toLocaleTimeString('de-DE');
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            entry.innerHTML = `<span class="log-time">[${time}]</span> <span class="log-${type}">${message}</span>`;
            container.appendChild(entry);
            container.scrollTop = container.scrollHeight;
            if (container.children.length > 100) container.removeChild(container.firstChild);
        }

        // API Calls
        async function fetchAPI(endpoint, method = 'GET') {
            try {
                const res = await fetch('/api/' + endpoint, { method });
                return await res.json();
            } catch (e) {
                addLog('API Fehler: ' + e.message, 'error');
                return null;
            }
        }

        async function refreshData() {
            const data = await fetchAPI('status');
            if (data) {
                updateDashboard(data);
                updateTrades(data.trade_history || []);
                addLog('Daten aktualisiert', 'info');
            }
        }

        async function startBot() {
            const data = await fetchAPI('start', 'POST');
            if (data) addLog('Bot gestartet', 'trade');
        }

        async function pauseBot() {
            const data = await fetchAPI('pause', 'POST');
            if (data) addLog('Bot pausiert', 'warning');
        }

        async function stopBot() {
            const data = await fetchAPI('stop', 'POST');
            if (data) addLog('Bot gestoppt', 'error');
        }

        async function runCycle() {
            addLog('Starte Trading-Zyklus...', 'info');
            const data = await fetchAPI('cycle', 'POST');
            if (data) {
                updateDashboard(data);
                if (data.analyses) updateSignals(data.analyses);
                if (data.trades && data.trades.length > 0) {
                    data.trades.forEach(t => addLog(`Trade: ${t.type} ${t.symbol} @ $${t.price}`, 'trade'));
                }
                addLog('Zyklus abgeschlossen', 'info');
                // Trades aktualisieren
                const status = await fetchAPI('status');
                if (status) updateTrades(status.trade_history || []);
            }
        }

        // WebSocket Events
        socket.on('connect', () => {
            addLog('Dashboard verbunden', 'info');
            refreshData();
        });

        socket.on('update', (data) => {
            updateDashboard(data);
            if (data.analyses) updateSignals(data.analyses);
        });

        socket.on('trade', (data) => {
            addLog(`Trade: ${data.type} ${data.symbol} @ $${data.price}`, 'trade');
        });

        socket.on('log', (data) => {
            addLog(data.message, data.type || 'info');
        });

        // Init
        initChart();
        refreshData();
        setInterval(refreshData, 30000);
    </script>
</body>
</html>
"""


# ============================================================
# API ROUTES
# ============================================================

@app.route("/")
def index():
    return render_template_string(DASHBOARD_HTML)


@app.route("/api/status")
def api_status():
    if trading_engine is None:
        return jsonify({"error": "Engine nicht initialisiert", "portfolio": {
            "total_value": TRADING_CONFIG["initial_capital"],
            "balance": TRADING_CONFIG["initial_capital"],
            "total_pnl": 0, "daily_pnl": 0, "total_return_pct": 0,
            "win_rate": 0, "total_trades": 0, "winning_trades": 0,
            "losing_trades": 0, "open_positions": [], "open_positions_value": 0,
            "max_drawdown": 0, "is_running": False, "is_paused": False,
            "model_info": {"is_trained": False}
        }, "trade_history": []})

    return jsonify({
        "portfolio": trading_engine.get_portfolio_status(),
        "trade_history": trading_engine.get_trade_history(),
        "last_analysis": trading_engine.last_analysis,
    })


@app.route("/api/cycle", methods=["POST"])
def api_cycle():
    if trading_engine is None:
        return jsonify({"error": "Engine nicht initialisiert"})

    result = trading_engine.run_cycle()
    socketio.emit("update", result)
    return jsonify(result)


@app.route("/api/start", methods=["POST"])
def api_start():
    if trading_engine is None:
        return jsonify({"error": "Engine nicht initialisiert"})

    trading_engine.is_running = True
    trading_engine.is_paused = False
    return jsonify({"status": "started"})


@app.route("/api/pause", methods=["POST"])
def api_pause():
    if trading_engine is None:
        return jsonify({"error": "Engine nicht initialisiert"})

    trading_engine.is_paused = True
    return jsonify({"status": "paused"})


@app.route("/api/stop", methods=["POST"])
def api_stop():
    if trading_engine is None:
        return jsonify({"error": "Engine nicht initialisiert"})

    trading_engine.is_running = False
    trading_engine.save_state()
    return jsonify({"status": "stopped"})


@app.route("/api/analyze/<symbol>")
def api_analyze(symbol):
    if trading_engine is None:
        return jsonify({"error": "Engine nicht initialisiert"})

    result = trading_engine.analyze_symbol(symbol)
    return jsonify(result)


@app.route("/api/trades")
def api_trades():
    if trading_engine is None:
        return jsonify([])
    return jsonify(trading_engine.get_trade_history())


@app.route("/api/config")
def api_config():
    return jsonify({
        "trading": TRADING_CONFIG,
        "risk": RISK_CONFIG,
        "ai": AI_CONFIG,
    })


def run_dashboard(engine=None, host="0.0.0.0", port=5000):
    """Startet das Dashboard."""
    if engine:
        set_engine(engine)
    log.info(f"🌐 Dashboard gestartet auf http://{host}:{port}")
    socketio.run(app, host=host, port=port, debug=False, allow_unsafe_werkzeug=True)


if __name__ == "__main__":
    run_dashboard()
