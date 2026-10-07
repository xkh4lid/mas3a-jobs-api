import { makeProject } from "@revideo/core";
import scene from "./masaa-job-scene";

export default makeProject({
  name: "masaa-job-motion",
  scenes: [scene],
  settings: {
    shared: {
      background: "#031C18",
      range: [0, Infinity],
      size: { x: 1080, y: 1920 }
    },
    preview: {
      fps: 30,
      resolutionScale: 1
    },
    rendering: {
      exporter: {
        name: "@revideo/core/wasm"
      },
      fps: 30,
      resolutionScale: 1,
      colorSpace: "srgb"
    }
  }
});
