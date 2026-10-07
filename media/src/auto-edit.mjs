import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

function valueAfter(args, flag, fallback = null) {
  const index = args.indexOf(flag);
  if (index === -1 || index + 1 >= args.length) return fallback;
  return args[index + 1];
}

export function resolveAutoEditorBinary() {
  if (process.env.AUTO_EDITOR_BIN) return process.env.AUTO_EDITOR_BIN;
  const local = resolve(".tools", "bin", process.platform === "win32" ? "auto-editor.exe" : "auto-editor");
  return existsSync(local) ? local : "auto-editor";
}

export function buildAutoEditorArgs({
  input,
  output,
  threshold = "4%",
  margin = "0.2s"
}) {
  return [
    input,
    "--edit", `audio:threshold=${threshold}`,
    "--margin", margin,
    "-o", output,
    "--no-open"
  ];
}

export function autoEdit({
  input,
  output,
  threshold = "4%",
  margin = "0.2s"
}) {
  const source = resolve(input);
  const destination = resolve(output);
  if (!existsSync(source)) throw new Error(`Input not found: ${source}`);

  mkdirSync(dirname(destination), { recursive: true });
  const binary = resolveAutoEditorBinary();
  const result = spawnSync(binary, buildAutoEditorArgs({
    input: source,
    output: destination,
    threshold,
    margin
  }), { stdio: "inherit" });

  if (result.error || result.status !== 0) {
    throw new Error(`${binary} failed with status ${result.status ?? "unknown"}`);
  }

  return destination;
}

function main() {
  const args = process.argv.slice(2);
  const input = valueAfter(args, "--input");
  const output = valueAfter(args, "--out");
  if (!input || !output) {
    console.error("Usage: npm run auto-edit -- --input raw.mp4 --out output/edited.mp4 [--threshold 4%] [--margin 0.2s]");
    process.exit(2);
  }

  const threshold = valueAfter(args, "--threshold", "4%");
  const margin = valueAfter(args, "--margin", "0.2s");
  console.log(autoEdit({ input, output, threshold, margin }));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
