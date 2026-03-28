"""
CyberDreams AI Trading Bot - KI-Ensemble-Modell
=================================================
Ensemble aus LightGBM, XGBoost und RandomForest für Marktvorhersagen.
"""

import numpy as np
import pandas as pd
import joblib
import os
from datetime import datetime
from typing import Tuple, Dict, Optional, List

from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.model_selection import TimeSeriesSplit
from sklearn.metrics import accuracy_score, classification_report, f1_score
from sklearn.preprocessing import StandardScaler
import lightgbm as lgb
import xgboost as xgb

from config.settings import AI_CONFIG
from utils.logger import log


class TradingAIModel:
    """
    Ensemble-KI-Modell für Trading-Signale.

    Kombiniert LightGBM, XGBoost und RandomForest zu einem
    gewichteten Ensemble für robustere Vorhersagen.
    """

    # Signale
    SIGNAL_BUY = 1
    SIGNAL_HOLD = 0
    SIGNAL_SELL = -1

    def __init__(self, model_dir: str = "models/saved"):
        self.model_dir = model_dir
        os.makedirs(model_dir, exist_ok=True)

        self.scaler = StandardScaler()
        self.feature_names: List[str] = []
        self.model = None
        self.is_trained = False
        self.last_train_time: Optional[datetime] = None
        self.train_metrics: Dict = {}

        self._build_ensemble()

    def _build_ensemble(self):
        """Erstellt das Ensemble-Modell."""
        self.lgb_model = lgb.LGBMClassifier(
            n_estimators=300,
            max_depth=8,
            learning_rate=0.05,
            num_leaves=31,
            min_child_samples=20,
            subsample=0.8,
            colsample_bytree=0.8,
            reg_alpha=0.1,
            reg_lambda=0.1,
            random_state=42,
            verbose=-1,
            n_jobs=-1,
        )

        self.xgb_model = xgb.XGBClassifier(
            n_estimators=300,
            max_depth=8,
            learning_rate=0.05,
            subsample=0.8,
            colsample_bytree=0.8,
            reg_alpha=0.1,
            reg_lambda=0.1,
            random_state=42,
            use_label_encoder=False,
            eval_metric="mlogloss",
            verbosity=0,
            n_jobs=-1,
        )

        self.rf_model = RandomForestClassifier(
            n_estimators=200,
            max_depth=10,
            min_samples_split=10,
            min_samples_leaf=5,
            random_state=42,
            n_jobs=-1,
        )

        self.model = VotingClassifier(
            estimators=[
                ("lgb", self.lgb_model),
                ("xgb", self.xgb_model),
                ("rf", self.rf_model),
            ],
            voting="soft",
            weights=[0.4, 0.35, 0.25],
        )

        log.info("🧠 KI-Ensemble-Modell erstellt (LightGBM + XGBoost + RandomForest)")

    def prepare_features(self, df: pd.DataFrame) -> Tuple[np.ndarray, List[str]]:
        """
        Bereitet Features für das Modell vor.

        Args:
            df: DataFrame mit OHLCV + Indikatoren

        Returns:
            Feature-Matrix und Feature-Namen
        """
        # Ausschließen von OHLCV-Rohwerten und Nicht-Feature-Spalten
        exclude_cols = [
            "open", "high", "low", "close", "volume",
            "target", "future_return",
        ]

        feature_cols = [c for c in df.columns if c not in exclude_cols]
        self.feature_names = feature_cols

        X = df[feature_cols].values
        return X, feature_cols

    def create_target(
        self,
        df: pd.DataFrame,
        forward_period: int = 5,
        threshold: float = 0.01,
    ) -> pd.Series:
        """
        Erstellt die Zielvariable basierend auf zukünftigen Renditen.

        Args:
            df: DataFrame mit Preisdaten
            forward_period: Vorhersage-Horizont (Kerzen)
            threshold: Schwelle für Buy/Sell-Signal (%)

        Returns:
            Series mit Signalen (-1, 0, 1)
        """
        future_return = df["close"].shift(-forward_period) / df["close"] - 1

        target = pd.Series(self.SIGNAL_HOLD, index=df.index)
        target[future_return > threshold] = self.SIGNAL_BUY
        target[future_return < -threshold] = self.SIGNAL_SELL

        df["future_return"] = future_return
        df["target"] = target

        return target

    def train(self, df: pd.DataFrame) -> Dict:
        """
        Trainiert das Ensemble-Modell.

        Args:
            df: DataFrame mit Features und Target

        Returns:
            Trainings-Metriken
        """
        log.info("🎓 Starte Modell-Training...")

        # Features und Target vorbereiten
        X, feature_names = self.prepare_features(df)
        y = df["target"].values

        # NaN-Zeilen entfernen
        valid_mask = ~(np.isnan(X).any(axis=1) | np.isnan(y))
        X = X[valid_mask]
        y = y[valid_mask].astype(int)

        if len(X) < 100:
            log.error("Zu wenig Trainingsdaten!")
            return {"error": "Zu wenig Daten"}

        # Train/Test Split (zeitbasiert)
        split_idx = int(len(X) * AI_CONFIG["train_split"])
        X_train, X_test = X[:split_idx], X[split_idx:]
        y_train, y_test = y[:split_idx], y[split_idx:]

        # Skalierung
        X_train = self.scaler.fit_transform(X_train)
        X_test = self.scaler.transform(X_test)

        # Training
        self.model.fit(X_train, y_train)

        # Evaluation
        y_pred = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred, average="weighted")

        # Feature Importance (von LightGBM)
        try:
            importances = self.lgb_model.feature_importances_
            feature_importance = dict(zip(feature_names, importances))
            top_features = sorted(
                feature_importance.items(), key=lambda x: x[1], reverse=True
            )[:15]
        except Exception:
            top_features = []

        self.train_metrics = {
            "accuracy": float(accuracy),
            "f1_score": float(f1),
            "train_samples": len(X_train),
            "test_samples": len(X_test),
            "top_features": top_features,
            "class_distribution": {
                "buy": int((y_train == 1).sum()),
                "hold": int((y_train == 0).sum()),
                "sell": int((y_train == -1).sum()),
            },
        }

        self.is_trained = True
        self.last_train_time = datetime.now()

        log.info(
            f"✅ Training abgeschlossen - Accuracy: {accuracy:.4f}, F1: {f1:.4f}"
        )
        log.info(f"   Samples: {len(X_train)} Train / {len(X_test)} Test")
        if top_features:
            log.info(f"   Top-3 Features: {[f[0] for f in top_features[:3]]}")

        return self.train_metrics

    def predict(self, df: pd.DataFrame) -> Dict:
        """
        Generiert eine Vorhersage für die aktuellen Daten.

        Args:
            df: DataFrame mit Features (letzte Zeile = aktuell)

        Returns:
            Dict mit Signal, Konfidenz und Details
        """
        if not self.is_trained:
            return {
                "signal": self.SIGNAL_HOLD,
                "confidence": 0.0,
                "reason": "Modell nicht trainiert",
            }

        X, _ = self.prepare_features(df)

        # Letzte Zeile nehmen
        X_latest = X[-1:].copy()

        # NaN-Check
        if np.isnan(X_latest).any():
            return {
                "signal": self.SIGNAL_HOLD,
                "confidence": 0.0,
                "reason": "Ungültige Feature-Werte",
            }

        X_latest = self.scaler.transform(X_latest)

        # Vorhersage mit Wahrscheinlichkeiten
        probabilities = self.model.predict_proba(X_latest)[0]
        classes = self.model.classes_

        # Signal und Konfidenz bestimmen
        pred_idx = np.argmax(probabilities)
        signal = int(classes[pred_idx])
        confidence = float(probabilities[pred_idx])

        # Individuelle Modell-Vorhersagen
        individual_preds = {}
        for name, estimator in [
            ("LightGBM", self.lgb_model),
            ("XGBoost", self.xgb_model),
            ("RandomForest", self.rf_model),
        ]:
            try:
                pred = estimator.predict(X_latest)[0]
                prob = estimator.predict_proba(X_latest)[0]
                individual_preds[name] = {
                    "signal": int(pred),
                    "confidence": float(max(prob)),
                }
            except Exception:
                individual_preds[name] = {"signal": 0, "confidence": 0.0}

        # Konsens prüfen
        signals = [v["signal"] for v in individual_preds.values()]
        consensus = len(set(signals)) == 1

        # Mindest-Konfidenz prüfen
        if confidence < AI_CONFIG["min_confidence"]:
            signal = self.SIGNAL_HOLD
            reason = f"Konfidenz zu niedrig ({confidence:.2f} < {AI_CONFIG['min_confidence']})"
        elif consensus:
            reason = f"Starker Konsens aller Modelle"
        else:
            reason = f"Mehrheitsentscheidung"

        signal_names = {1: "BUY 🟢", 0: "HOLD ⚪", -1: "SELL 🔴"}

        result = {
            "signal": signal,
            "signal_name": signal_names.get(signal, "HOLD"),
            "confidence": confidence,
            "probabilities": {
                int(c): float(p) for c, p in zip(classes, probabilities)
            },
            "individual_models": individual_preds,
            "consensus": consensus,
            "reason": reason,
        }

        return result

    def save(self, filename: str = "trading_model"):
        """Speichert das Modell."""
        if not self.is_trained:
            log.warning("Kein trainiertes Modell zum Speichern")
            return

        path = os.path.join(self.model_dir, filename)
        joblib.dump(
            {
                "model": self.model,
                "scaler": self.scaler,
                "feature_names": self.feature_names,
                "train_metrics": self.train_metrics,
                "last_train_time": self.last_train_time,
            },
            f"{path}.pkl",
        )
        log.info(f"💾 Modell gespeichert: {path}.pkl")

    def load(self, filename: str = "trading_model") -> bool:
        """Lädt ein gespeichertes Modell."""
        path = os.path.join(self.model_dir, f"{filename}.pkl")

        if not os.path.exists(path):
            log.warning(f"Kein Modell gefunden: {path}")
            return False

        data = joblib.load(path)
        self.model = data["model"]
        self.scaler = data["scaler"]
        self.feature_names = data["feature_names"]
        self.train_metrics = data["train_metrics"]
        self.last_train_time = data["last_train_time"]
        self.is_trained = True

        # Individuelle Modelle aus dem Ensemble extrahieren
        for name, est in self.model.named_estimators_.items():
            if name == "lgb":
                self.lgb_model = est
            elif name == "xgb":
                self.xgb_model = est
            elif name == "rf":
                self.rf_model = est

        log.info(f"📂 Modell geladen: {path}")
        return True

    def needs_retrain(self) -> bool:
        """Prüft ob ein Retrain nötig ist."""
        if not self.is_trained or self.last_train_time is None:
            return True

        hours_since_train = (
            datetime.now() - self.last_train_time
        ).total_seconds() / 3600
        return hours_since_train >= AI_CONFIG["retrain_interval_hours"]

    def get_model_info(self) -> Dict:
        """Gibt Modell-Informationen zurück."""
        return {
            "is_trained": self.is_trained,
            "last_train_time": str(self.last_train_time) if self.last_train_time else None,
            "train_metrics": self.train_metrics,
            "feature_count": len(self.feature_names),
            "model_type": AI_CONFIG["model_type"],
            "min_confidence": AI_CONFIG["min_confidence"],
        }
