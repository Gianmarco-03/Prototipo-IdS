#!/bin/bash

# === CONFIGURA QUI IL PERCORSO DEL TUO PROGETTO ===
PROJECT_DIR="/home/gianmarco/Tesi/Prototipo-IdS/FrontEnd"

# === VAI NELLA CARTELLA DEL PROGETTO ===
cd "$PROJECT_DIR" || {
  echo "❌ Errore: la cartella $PROJECT_DIR non esiste."
  exit 1
}

# === AVVIA IL SERVER CON npm start ===
echo "🚀 Avvio del server npm in $PROJECT_DIR..."
npm start &

# === Attendi qualche secondo per dare tempo al server di avviarsi ===
sleep 3

# === Apri il browser su localhost:3000 ===
xdg-open http://localhost:3000
