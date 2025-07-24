#!/bin/bash

# === Percorso del progetto ===
PROJECT_DIR="/home/gianmarco/Tesi/Prototipo-IdS/BackEnd"

# === Vai nella cartella del progetto ===
cd "$PROJECT_DIR" || {
  echo "❌ Errore: la cartella $PROJECT_DIR non esiste."
  exit 1
}

# === Avvia il server in background ===
echo "🚀 Avvio del server dotnet..."
dotnet run
