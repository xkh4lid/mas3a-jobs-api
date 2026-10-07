import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const packages = [
  "sharp",
  "satori",
  "remotion",
  "@remotion/cli",
  "@remotion/bundler",
  "@motion-canvas/core",
  "@motion-canvas/2d",
  "@revideo/core",
  "@revideo/2d",
  "@revideo/renderer",
  "@revideo/ffmpeg",
  "lottie-web",
  "@svgdotjs/svg.js",
  "fabric",
  "konva",
  "typescript"
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

function commandExists(command, args = ["--version"]) {
  if (!command) return false;
  const result = spawnSync(command, args, { encoding: "utf8" });
  return !result.error && result.status === 0;
}

const toolsRoot = resolve(process.env.MASAA_TOOLS_DIR || ".tools");
const localAutoEditor = resolve(toolsRoot, "bin", process.platform === "win32" ? "auto-editor.exe" : "auto-editor");
const localWhisper = resolve(
  toolsRoot,
  "whisper.cpp",
  "build",
  "bin",
  process.platform === "win32" ? "whisper-cli.exe" : "whisper-cli"
);

if (!commandExists("ffmpeg", ["-version"])) missing.push("ffmpeg");
else console.log("ok system: ffmpeg");

if (commandExists("magick", ["-version"])) console.log("ok system: ImageMagick (magick)");
else if (commandExists("convert", ["-version"])) console.log("ok system: ImageMagick (convert)");
else missing.push("imagemagick");

const autoEditor = process.env.AUTO_EDITOR_BIN || (existsSync(localAutoEditor) ? localAutoEditor : "auto-editor");
if (!commandExists(autoEditor, ["--version"])) missing.push("auto-editor");
else console.log(`ok system: Auto-Editor (${autoEditor})`);

const whisperCli = process.env.WHISPER_CPP_BIN || (existsSync(localWhisper) ? localWhisper : "whisper-cli");
if (!commandExists(whisperCli, ["-h"])) missing.push("whisper.cpp");
else console.log(`ok system: whisper.cpp (${whisperCli})`);

if (!existsSync(new URL("../comfyui/adapter.mjs", import.meta.url))) missing.push("comfyui-adapter");
else console.log("ok integration: ComfyUI adapter");

if (missing.length) {
  console.error(`Masaa media toolkit missing: ${missing.join(", ")}`);
  process.exit(1);
}
console.log("Masaa media toolkit ready.");
