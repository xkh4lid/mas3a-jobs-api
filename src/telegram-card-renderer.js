import { initWasm, Resvg } from "@resvg/resvg-wasm";
import resvgWasm from "@resvg/resvg-wasm/index_bg.wasm";

let initPromise = null;

async function ensureResvg() {
  if (!initPromise) {
    initPromise = initWasm(resvgWasm).catch((error) => {
      initPromise = null;
      throw error;
    });
  }
  return initPromise;
}

export async function renderTelegramJobCardPng(svg, fontBytes) {
  await ensureResvg();
  const renderer = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    font: {
      fontBuffers: [fontBytes],
      defaultFontFamily: "Noto Kufi Arabic"
    }
  });
  const png = renderer.render().asPng();
  if (!(png instanceof Uint8Array) || png.byteLength < 1000) {
    throw new Error("telegram_card_png_invalid");
  }
  return png;
}
