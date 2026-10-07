#!/usr/bin/env bash
set -euo pipefail

VERSION="${WHISPER_CPP_VERSION:-v1.9.5}"
MODEL="${WHISPER_MODEL:-base}"
TOOLS_ROOT="${MASAA_TOOLS_DIR:-.tools}"
ROOT="${TOOLS_ROOT}/whisper.cpp"
BIN="${ROOT}/build/bin/whisper-cli"

if [ ! -d "${ROOT}/.git" ]; then
  rm -rf "${ROOT}"
  git clone --depth 1 --branch "${VERSION}" https://github.com/ggml-org/whisper.cpp.git "${ROOT}"
else
  CURRENT="$(git -C "${ROOT}" describe --tags --exact-match 2>/dev/null || true)"
  if [ "${CURRENT}" != "${VERSION}" ]; then
    git -C "${ROOT}" fetch --depth 1 origin "refs/tags/${VERSION}:refs/tags/${VERSION}"
    git -C "${ROOT}" checkout --detach "${VERSION}"
  fi
fi

if [ ! -x "${BIN}" ]; then
  cmake -S "${ROOT}" -B "${ROOT}/build"     -DCMAKE_BUILD_TYPE=Release     -DWHISPER_BUILD_TESTS=OFF     -DWHISPER_BUILD_EXAMPLES=ON
  cmake --build "${ROOT}/build" --config Release --target whisper-cli -j "${WHISPER_BUILD_JOBS:-2}"
fi

"${BIN}" -h >/dev/null

if [ "${MODEL}" != "none" ]; then
  MODEL_FILE="${ROOT}/models/ggml-${MODEL}.bin"
  if [ ! -s "${MODEL_FILE}" ]; then
    bash "${ROOT}/models/download-ggml-model.sh" "${MODEL}"
  fi
  echo "whisper.cpp model ready: ${MODEL_FILE}"
else
  echo "whisper.cpp installed without model download."
fi

echo "whisper.cpp installed at ${ROOT}"
