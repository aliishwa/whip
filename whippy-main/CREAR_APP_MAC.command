#!/bin/bash
set -euo pipefail
cd -- "$(dirname -- "$0")"
if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "Ejecuta este archivo en un Mac."
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  echo "Instala Node.js con npm y vuelve a ejecutarlo."
  exit 1
fi
npm ci
npm run dist:mac
echo "DMG creado en la carpeta dist."
open dist
