#!/usr/bin/env bash
set -euo pipefail

VERSION="${AUTO_EDITOR_VERSION:-31.7.2}"
TOOLS_ROOT="${MASAA_TOOLS_DIR:-.tools}"
BIN_DIR="${TOOLS_ROOT}/bin"
DEST="${BIN_DIR}/auto-editor"
mkdir -p "${BIN_DIR}"

OS="$(uname -s)"
ARCH="$(uname -m)"

case "${OS}-${ARCH}" in
  Linux-x86_64)
    ASSET="auto-editor-linux-x86_64"
    SHA256="3da1ff7fb0dbc9057527d5776310e4b0a680004814a7bbb60db2f8c37c45269a"
    ;;
  Linux-aarch64|Linux-arm64)
    ASSET="auto-editor-linux-aarch64"
    SHA256="77b0a06233d088eeb898b80c8a90549a06dabc7f9ed19946e648037f8ae073c2"
    ;;
  Darwin-arm64)
    ASSET="auto-editor-macos-arm64"
    SHA256="874310a405c88c4d06b9ee7b60b3a4e59ecbb09cfecd56ff54f1bf712b3b776e"
    ;;
  Darwin-x86_64)
    ASSET="auto-editor-macos-x86_64"
    SHA256="21fe494fb4e3b583ce717df2c62bdade7bcc244666cba6973fa1f5c40469438d"
    ;;
  *)
    echo "Unsupported Auto-Editor platform: ${OS}-${ARCH}" >&2
    exit 1
    ;;
esac

if [ -x "${DEST}" ] && "${DEST}" --version 2>/dev/null | grep -q "${VERSION}"; then
  echo "Auto-Editor ${VERSION} already installed at ${DEST}"
  exit 0
fi

URL="https://github.com/WyattBlue/auto-editor/releases/download/${VERSION}/${ASSET}"
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

curl -fL --retry 3 "${URL}" -o "${TMP}"

if command -v sha256sum >/dev/null 2>&1; then
  echo "${SHA256}  ${TMP}" | sha256sum -c -
else
  ACTUAL="$(shasum -a 256 "${TMP}" | awk '{print $1}')"
  [ "${ACTUAL}" = "${SHA256}" ] || { echo "Auto-Editor SHA256 mismatch" >&2; exit 1; }
fi

install -m 0755 "${TMP}" "${DEST}"
"${DEST}" --version
echo "Auto-Editor installed at ${DEST}"
