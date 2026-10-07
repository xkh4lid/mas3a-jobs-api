import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { basename, dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

function valueAfter(args, flag, fallback = null) {
  const index = args.indexOf(flag);
  if (index === -1 || index + 1 >= args.length) return fallback;
  return args[index + 1];
}

export function resolveWhisperBinary() {
  if (process.env.WHISPER_CPP_BIN) return process.env.WHISPER_CPP_BIN;
  const local = resolve(".tools", "whisper.cpp", "build", "bin", process.platform === "win32" ? "whisper-cli.exe" : "whisper-cli");
  return existsSync(local) ? local : "whisper-cli";
}

export function defaultWhisperModel() {
  if (process.env.WHISPER_MODEL_PATH) return process.env.WHISPER_MODEL_PATH;
  return resolve(".tools", "whisper.cpp", "models", "ggml-base.bin");
}

export function buildWhisperArgs({ model, inputWav, language = "ar", outputPrefix }) {
  return [
    "-m", model,
    "-f", inputWav,
    "-l", language,
    "-osrt",
    "-ovtt",
    "-otxt",
    "-of", outputPrefix
  ];
}

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.error || result.status !== 0) {
    throw new Error(`${command} failed with status ${result.status ?? "unknown"}`);
  }
}

export function transcribe({ input, outDir, model, language = "ar" }) {
  const source = resolve(input);
  if (!existsSync(source)) throw new Error(`Input not found: ${source}`);

  const destination = resolve(outDir);
  mkdirSync(destination, { recursive: true });

  const stem = basename(source, extname(source)).replace(/[^\p{L}\p{N}._-]+/gu, "-");
  const wav = resolve(destination, `.${stem}-whisper.wav`);
  const outputPrefix = resolve(destination, stem);

  run("ffmpeg", ["-y", "-i", source, "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", wav]);

  const whisperBin = resolveWhisperBinary();
  const whisperModel = resolve(model || defaultWhisperModel());
  if (!existsSync(whisperModel)) {
    rmSync(wav, { force: true });
    throw new Error(
      `Whisper model not found: ${whisperModel}. Run WHISPER_MODEL=base npm run native:install first.`
    );
  }

  try {
    run(whisperBin, buildWhisperArgs({
      model: whisperModel,
      inputWav: wav,
      language,
      outputPrefix
    }));
  } finally {
    rmSync(wav, { force: true });
  }

  return {
    text: `${outputPrefix}.txt`,
    srt: `${outputPrefix}.srt`,
    vtt: `${outputPrefix}.vtt`
  };
}

function main() {
  const args = process.argv.slice(2);
  const input = valueAfter(args, "--input");
  if (!input) {
    console.error("Usage: npm run transcribe -- --input video.mp4 [--out output/captions] [--language ar] [--model path]");
    process.exit(2);
  }

  const outDir = valueAfter(args, "--out", resolve("output", "captions"));
  const language = valueAfter(args, "--language", "ar");
  const model = valueAfter(args, "--model", null);

  const result = transcribe({ input, outDir, model, language });
  console.log(JSON.stringify(result, null, 2));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
