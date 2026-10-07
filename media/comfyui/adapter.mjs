import { readFile } from "node:fs/promises";

export async function queueComfyWorkflow({ workflowPath, server = process.env.COMFYUI_URL } = {}) {
  if (!server) return { ok: false, skipped: true, reason: "COMFYUI_URL_not_configured" };
  if (!/^https?:\/\//i.test(server)) throw new Error("COMFYUI_URL must use http or https");
  const workflow = JSON.parse(await readFile(workflowPath, "utf8"));
  const response = await fetch(new URL("/prompt", server), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ prompt: workflow })
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) return { ok: false, status: response.status, body };
  return { ok: true, body };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const workflowPath = process.argv[2];
  if (!workflowPath) throw new Error("Usage: node comfyui/adapter.mjs <workflow.json>");
  console.log(JSON.stringify(await queueComfyWorkflow({ workflowPath }), null, 2));
}
