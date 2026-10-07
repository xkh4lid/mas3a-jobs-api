import test from "node:test";
import assert from "node:assert/strict";
import { buildWhisperArgs } from "../src/transcribe.mjs";
import { buildAutoEditorArgs } from "../src/auto-edit.mjs";

test("builds Arabic whisper.cpp caption outputs", () => {
  const args = buildWhisperArgs({
    model: "/tmp/ggml-base.bin",
    inputWav: "/tmp/input.wav",
    language: "ar",
    outputPrefix: "/tmp/captions/job"
  });

  assert.deepEqual(args, [
    "-m", "/tmp/ggml-base.bin",
    "-f", "/tmp/input.wav",
    "-l", "ar",
    "-osrt",
    "-ovtt",
    "-otxt",
    "-of", "/tmp/captions/job"
  ]);
});

test("builds conservative Auto-Editor silence-cut command", () => {
  const args = buildAutoEditorArgs({
    input: "/tmp/raw.mp4",
    output: "/tmp/edited.mp4",
    threshold: "4%",
    margin: "0.2s"
  });

  assert.deepEqual(args, [
    "/tmp/raw.mp4",
    "--edit", "audio:threshold=4%",
    "--margin", "0.2s",
    "-o", "/tmp/edited.mp4",
    "--no-open"
  ]);
});
