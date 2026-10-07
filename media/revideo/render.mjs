import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { renderVideo } from "@revideo/renderer";

const width = Number(process.env.REVIDEO_WIDTH || 1080);
const height = Number(process.env.REVIDEO_HEIGHT || 1920);
const duration = Number(process.env.REVIDEO_DURATION || 6);
const outDir = resolve(process.env.REVIDEO_OUT_DIR || "output/revideo");
const outFile = process.env.REVIDEO_OUT_FILE || "masaa-job-motion.mp4";

mkdirSync(outDir, { recursive: true });

const file = await renderVideo({
  projectFile: resolve("revideo/project.ts"),
  settings: {
    outFile,
    outDir,
    workers: 1,
    logProgress: true,
    projectSettings: {
      range: [0, duration],
      size: { x: width, y: height }
    },
    ffmpeg: {
      ffmpegPath: "ffmpeg",
      ffmpegLogLevel: "error"
    },
    puppeteer: {
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    }
  }
});

console.log(file);
