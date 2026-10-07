import { readFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import React from "react";
import satori from "satori";
import sharp from "sharp";
import { MASAA } from "./brand.mjs";

function arg(name, fallback = "") {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] ?? fallback : fallback;
}

async function loadFont() {
  const candidates = [
    process.env.MASAA_FONT_FILE,
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/noto/NotoKufiArabic-Regular.ttf"
  ].filter(Boolean);
  for (const path of candidates) {
    try { return await readFile(path); } catch {}
  }
  throw new Error("No local Arabic-capable font found for Satori");
}

const input = resolve(arg("--input", "sample-job.json"));
const out = resolve(arg("--out", "output/social-1200x630.png"));
await mkdir(dirname(out), { recursive: true });
const job = JSON.parse(await readFile(input, "utf8"));
const font = await loadFont();

const element = React.createElement(
  "div",
  {
    dir: "rtl",
    style: {
      width: "1200px", height: "630px", display: "flex", flexDirection: "column",
      justifyContent: "space-between", padding: "64px", background: MASAA.deep2,
      color: "white", fontFamily: "MasaaArabic"
    }
  },
  React.createElement("div", {style:{fontSize:"42px",fontWeight:700,color:MASAA.mint}}, "مَسعى وظائف"),
  React.createElement("div", {style:{display:"flex",flexDirection:"column",gap:"18px"}},
    React.createElement("div", {style:{fontSize:"34px",color:MASAA.gold}}, job.company || "جهة موثوقة"),
    React.createElement("div", {style:{fontSize:"54px",fontWeight:700,lineHeight:1.35}}, job.title || "فرصة وظيفية"),
    React.createElement("div", {style:{fontSize:"28px",color:"#DCE6E1"}}, `${job.city || "السعودية"} • ${job.sector || "وظائف"}`)
  ),
  React.createElement("div", {style:{fontSize:"26px",color:"#DCE6E1"}}, "✓ متحقق من المصدر الرسمي")
);

const svg = await satori(element, {
  width: 1200,
  height: 630,
  fonts: [{ name: "MasaaArabic", data: font, weight: 400, style: "normal" },
          { name: "MasaaArabic", data: font, weight: 700, style: "normal" }]
});

await sharp(Buffer.from(svg)).png().toFile(out);
console.log(out);
