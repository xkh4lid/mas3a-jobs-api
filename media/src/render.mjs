import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";
import { jobCardSvg } from "./card.mjs";

function arg(name, fallback = "") {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] ?? fallback : fallback;
}

function hasCommand(command, args = ["-version"]) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  return !result.error && result.status === 0;
}

async function renderPng(job, width, height, path) {
  const svg = jobCardSvg(job, { width, height });
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path);
}

async function main() {
  const input = resolve(arg("--input", "sample-job.json"));
  const out = resolve(arg("--out", "output/job"));
  await mkdir(out, { recursive: true });
  const job = JSON.parse(await readFile(input, "utf8"));

  const square = resolve(out, "job-1200x1200.png");
  const portrait = resolve(out, "job-1080x1350.png");
  const story = resolve(out, "job-1080x1920.png");
  const webp = resolve(out, "job-1200x1200.webp");
  const video = resolve(out, "job-1080x1920.mp4");
  const jpeg = resolve(out, "job-preview-600.jpg");

  await renderPng(job, 1200, 1200, square);
  await renderPng(job, 1080, 1350, portrait);
  await renderPng(job, 1080, 1920, story);
  await sharp(square).webp({ quality: 88 }).toFile(webp);

  let videoCreated = false;
  if (hasCommand("ffmpeg")) {
    const args = [
      "-y", "-loop", "1", "-i", story,
      "-vf", "scale=1080:1920,zoompan=z='min(zoom+0.00045,1.04)':d=300:s=1080x1920,fade=t=in:st=0:d=0.6,fade=t=out:st=10.8:d=1.2,format=yuv420p",
      "-t", "12", "-r", "25", "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", video
    ];
    const ffmpeg = spawnSync("ffmpeg", args, { encoding: "utf8" });
    videoCreated = ffmpeg.status === 0;
    if (!videoCreated) console.error(ffmpeg.stderr);
  }

  let imagemagickCreated = false;
  const magick = hasCommand("magick") ? "magick" : (hasCommand("convert") ? "convert" : "");
  if (magick) {
    const result = spawnSync(magick, [square, "-resize", "600x600", "-quality", "86", jpeg], { encoding: "utf8" });
    imagemagickCreated = result.status === 0;
  }

  const manifest = {
    job_id: String(job.id || ""),
    created_at: new Date().toISOString(),
    outputs: {
      square_png: square,
      portrait_png: portrait,
      story_png: story,
      webp,
      motion_mp4: videoCreated ? video : null,
      imagemagick_preview: imagemagickCreated ? jpeg : null
    }
  };
  const manifestPath = resolve(out, "manifest.json");
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(JSON.stringify(manifest, null, 2));
}

await main();
