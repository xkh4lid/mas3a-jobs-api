# Masaa Media Engine

A separate media workspace for مَسعى. It is intentionally isolated from the Cloudflare Worker runtime so image/video tooling cannot bloat or destabilize the jobs API.

## What is wired in

- **Sharp**: production image rendering and WebP output.
- **FFmpeg**: 1080×1920 MP4 processing, encoding, audio prep, and final assembly.
- **ImageMagick**: additional image conversion/preview validation.
- **Satori**: HTML/CSS-style social card rendering.
- **Remotion**: programmable React video composition.
- **Motion Canvas**: TypeScript motion graphics with voice-over friendly timing.
- **Revideo 0.11**: MIT-licensed headless TypeScript video renderer for automated motion scenes.
- **whisper.cpp v1.9.5**: local/offline speech recognition for Arabic captions (SRT/VTT/TXT).
- **Auto-Editor 31.7.2**: automatic silence/audio-based cuts before final motion assembly.
- **Lottie Web + SVG.js + Fabric.js + Konva**: browser-based design/motion studio.
- **ComfyUI**: optional adapter + bootstrap installer. It stays disabled unless a ComfyUI server is explicitly configured because model inference needs a suitable GPU/model environment.

The approved Masaa traced vector identity paths are reused from the production Telegram card implementation. No replacement logo is invented.

## Install

The three new open-source tools are kept under the ignored `.tools/` directory, so native binaries and model weights are never committed.

```bash
cd media
npm install
npm run native:install
npm run check
```

The default whisper.cpp installer downloads the multilingual `base` model, which supports Arabic. CI sets `WHISPER_MODEL=none` so it validates the binary without downloading model weights.

Pinned native versions:

- whisper.cpp: `v1.9.5`
- Auto-Editor: `31.7.2`

The Auto-Editor installer verifies the downloaded release asset with its published SHA-256 before installing it.

## Revideo

A Masaa vertical motion sample lives in `media/revideo/`.

```bash
npm run revideo:check
npm run revideo:render
```

Default output:

```text
media/output/revideo/masaa-job-motion.mp4
```

The renderer accepts optional environment overrides such as `REVIDEO_WIDTH`, `REVIDEO_HEIGHT`, and `REVIDEO_DURATION`.

## Arabic captions with whisper.cpp

```bash
npm run transcribe -- --input output/video.mp4 --out output/captions --language ar
```

This normalizes audio through FFmpeg and produces:

- `.txt`
- `.srt`
- `.vtt`

Use `--model /path/to/ggml-model.bin` or `WHISPER_MODEL_PATH` to select a different local model.

## Automatic silence cuts

```bash
npm run auto-edit -- \
  --input raw-presenter.mp4 \
  --out output/edited-presenter.mp4 \
  --threshold 4% \
  --margin 0.2s
```

The wrapper deliberately starts with conservative audio-based cuts. The source file is never overwritten.

## Existing outputs

```bash
npm run render:sample
npm run render:satori
npm run studio:build
npm run remotion:bundle
```

Output is written under `media/output/` and is ignored by Git.

## Automatic validation

`.github/workflows/media-engine.yml` installs Node dependencies, FFmpeg/ImageMagick, the pinned whisper.cpp and Auto-Editor binaries, runs unit/type checks, renders the existing media samples, bundles Remotion, renders a Revideo preview, validates MP4 dimensions with ffprobe, and uploads the generated samples as a short-lived GitHub Actions artifact.

## ComfyUI

The adapter is safe-by-default and does nothing when `COMFYUI_URL` is absent. To provision a compatible machine:

```bash
cd media
bash tools/comfyui-bootstrap.sh
```

Models are not downloaded automatically because they are large, licensing varies by model, and GitHub-hosted standard runners do not provide the GPU environment needed for useful generation.
