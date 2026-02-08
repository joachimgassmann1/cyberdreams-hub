"""
CyberDreams AI Trading Bot - Logging System
=============================================
Zentrales Logging mit Datei- und Konsolen-Output.
"""

import logging
import os
from logging.handlers import RotatingFileHandler
from config.settings import LOG_CONFIG


def setup_logger(name: str = "trading_bot") -> logging.Logger:
    """Erstellt und konfiguriert den Logger."""
    logger = logging.getLogger(name)
    logger.setLevel(getattr(logging, LOG_CONFIG["level"]))

    # Verzeichnis erstellen
    log_dir = os.path.dirname(LOG_CONFIG["file"])
    if log_dir:
        os.makedirs(log_dir, exist_ok=True)

    # Datei-Handler mit Rotation
    file_handler = RotatingFileHandler(
        LOG_CONFIG["file"],
        maxBytes=LOG_CONFIG["max_size_mb"] * 1024 * 1024,
        backupCount=LOG_CONFIG["backup_count"],
    )
    file_handler.setLevel(logging.DEBUG)

    # Konsolen-Handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(getattr(logging, LOG_CONFIG["level"]))

    # Format
    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)-8s | %(name)-20s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    if not logger.handlers:
        logger.addHandler(file_handler)
        logger.addHandler(console_handler)

    return logger


# Globaler Logger
log = setup_logger()
