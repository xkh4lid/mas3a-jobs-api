import fs from "node:fs/promises";
import path from "node:path";

const site = "https://mas3a.pages.dev";
const asset = "app-v7.20.js";
const response = await fetch(`${site}/${asset}`, { headers: { "User-Agent": "MasaaFrontendRepair/1.0" } });
if (!response.ok) throw new Error(`Download failed: HTTP ${response.status}`);
if (!/javascript/i.test(response.headers.get("content-type") || "")) {
  throw new Error("Live asset is not JavaScript; refuse to patch");
}
const original = await response.text();
if (original.length < 60000 || !original.includes("const SOURCE_RULES = {")) {
  throw new Error("Unexpected live frontend version; refuse to patch");
}

const anchor = "    {host:'www.moh.gov.sa'},";
if (!original.includes(anchor)) throw new Error("Trusted-host anchor changed");
if (original.includes("{host:'uqu.edu.sa'}") || original.includes("{host:'irec.srg.gov.sa'}")) {
  throw new Error("Frontend already includes one or more requested hosts; inspect live site first");
}
let updated = original.replace(anchor,
  "    {host:'uqu.edu.sa'},\n    {host:'irec.srg.gov.sa'},\n" + anchor);
const classification = "const isDiscovery=j.verification_level==='discovery'||j.status==='discovered';";
if (!updated.includes(classification)) throw new Error("Verification classification changed");
updated = updated.replace(classification,
  "const isDiscovery=j.verification_level==='discovery'||j.verification_level==='reported'||j.status==='discovered';");
for (const host of ["uqu.edu.sa", "irec.srg.gov.sa"]) {
  if (!updated.includes(`{host:'${host}'}`)) throw new Error(`Patch missing ${host}`);
}
if (updated.length - original.length > 500) throw new Error("Unexpected patch size");
await fs.mkdir("frontend-card-fix", { recursive: true });
await fs.writeFile(path.join("frontend-card-fix", asset), updated);
await fs.writeFile("frontend-card-fix/README.txt",
  "Masaa v7.20 JavaScript card fix. Add this file to the COMPLETE original Pages deployment directory, replacing only app-v7.20.js. Do not upload this one-file folder by itself as a new Pages deployment: it would omit the rest of the site. Changes: trust official UQU and Royal Guard application hosts and correctly label press-reported notices.\n");
console.log(JSON.stringify({ok:true,file:asset,originalBytes:original.length,updatedBytes:updated.length,governmentHost:"uqu.edu.sa",militaryHost:"irec.srg.gov.sa"}));
