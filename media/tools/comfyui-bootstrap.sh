#!/usr/bin/env bash
set -euo pipefail
ROOT="${1:-.tools/comfyui}"
if [ ! -d "$ROOT/.git" ]; then
  git clone --depth 1 https://github.com/Comfy-Org/ComfyUI.git "$ROOT"
fi
python3 -m venv "$ROOT/.venv"
"$ROOT/.venv/bin/python" -m pip install --upgrade pip
"$ROOT/.venv/bin/pip" install -r "$ROOT/requirements.txt"
echo "ComfyUI installed at $ROOT. Models/GPU are intentionally not bundled."
