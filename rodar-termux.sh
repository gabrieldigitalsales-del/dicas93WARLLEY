#!/data/data/com.termux/files/usr/bin/bash
set -e
ZIP_NAME="dicas93WARLLEY-modificado.zip"
DEST="$HOME/dicas93tv"

pkg update -y
pkg install -y unzip nodejs

rm -rf "$DEST"
mkdir -p "$DEST"
unzip -q "$HOME/storage/downloads/$ZIP_NAME" -d "$DEST"
cd "$DEST/dicas93WARLLEY-main"
npm install
npm run dev -- --host 0.0.0.0
