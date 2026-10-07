import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const require = createRequire(import.meta.url);
const packages = [
  "sharp",
  "satori",
  "remotion",
  "@remotion/cli",
  "@remotion/bundler",
  "@motion-canvas/core",
  "@motion-canvas/2d",
  "lottie-web",
  "@svgdotjs/svg.js",
  "fabric",
  "konva"
];

const missing = [];
for (const name of packages) {
  try {
    require.resolve(name);
    console.log(`ok npm: ${name}`);
  } catch {
    missing.push(name);
    console.error(`missing npm: ${name}`);
  }
}

function commandExists(command, args = ["-version"]) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  return !result.error && result.status === 0;
}

if (!commandExists("ffmpeg")) missing.push("ffmpeg");
else console.log("ok system: ffmpeg");

if (commandExists("magick")) console.log("ok system: ImageMagick (magick)");
else if (commandExists("convert")) console.log("ok system: ImageMagick (convert)");
else missing.push("imagemagick");

if (!existsSync(new URL("../comfyui/adapter.mjs", import.meta.url))) missing.push("comfyui-adapter");
else console.log("ok integration: ComfyUI adapter");

if (missing.length) {
  console.error(`Masaa media toolkit missing: ${missing.join(", ")}`);
  process.exit(1);
}
console.log("Masaa media toolkit ready.");
