# Masaa Media Engine

A separate media workspace for مَسعى. It is intentionally isolated from the Cloudflare Worker runtime so image/video tooling cannot bloat or destabilize the jobs API.

## What is wired in

- **Sharp**: production image rendering and WebP output.
- **FFmpeg**: 1080×1920 MP4 motion output from the story artwork.
- **ImageMagick**: additional image conversion/preview validation.
- **Satori**: HTML/CSS-style social card rendering.
- **Remotion**: programmable React video composition.
- **Motion Canvas**: motion-graphics scene source.
- **Lottie Web + SVG.js + Fabric.js + Konva**: browser-based design/motion studio.
- **ComfyUI**: optional adapter + bootstrap installer. It stays disabled unless a ComfyUI server is explicitly configured because model inference needs a suitable GPU/model environment.

The approved Masaa traced vector identity paths are reused from the production Telegram card implementation. No replacement logo is invented.

## Automatic validation

`.github/workflows/media-engine.yml` installs Node media dependencies plus FFmpeg/ImageMagick, verifies every toolkit package, runs tests, renders sample assets, builds the visual studio, and uploads the generated media as a GitHub Actions artifact.

## Local/CI commands

```bash
cd media
npm install
npm run check
npm run render:sample
npm run render:satori
npm run studio:build
npm run remotion:bundle
```

Output is written under `media/output/` and is ignored by Git.

## ComfyUI

The adapter is safe-by-default and does nothing when `COMFYUI_URL` is absent. To provision a compatible machine:

```bash
cd media
bash tools/comfyui-bootstrap.sh
```

Models are not downloaded automatically because they are large, licensing varies by model, and GitHub-hosted standard runners do not provide the GPU environment needed for useful generation.
