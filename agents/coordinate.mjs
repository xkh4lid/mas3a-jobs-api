import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const SOURCE_HOSTS = new Set([
  "www.spa.gov.sa", "spa.gov.sa", "www.sang.gov.sa", "sang.gov.sa", "portal.sang.gov.sa"
]);
export const APPLY_HOSTS = new Set([
  "jobs.sa", "jobs.sang.gov.sa", "tajnid.mod.gov.sa",
  "afca.mod.gov.sa", "kkmar.gov.sa", "www.kkmar.gov.sa"
]);
const TRACKING_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];
const MAX_REPORT_BYTES = 8_000_000;

function asArray(x) { return Array.isArray(x) ? x : []; }
function limitedText(x, limit = 300) { return String(x ?? "").replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, limit); }
function safeMd(x) { return limitedText(x).replace(/[|<>]/g, " ").replace(/`/g, "'"); }

export function canonicalOfficialUrl(value, allowedHosts) {
  if (typeof value !== "string" || value.length > 2048) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
    if (!allowedHosts.has(url.hostname.toLowerCase())) return null;
    for (const param of TRACKING_PARAMS) url.searchParams.delete(param);
    url.hash = "";
    return url.href;
  } catch { return null; }
}

export function trustCandidate(item) {
  const reasons = [];
  const sourceUrl = canonicalOfficialUrl(item?.sourceUrl, SOURCE_HOSTS);
  if (!sourceUrl) reasons.push("untrusted_official_source");
  const status = Number(item?.status);
  if (!Number.isInteger(status) || status < 200 || status >= 400) reasons.push("announcement_unavailable");
  if (item?.militarySignal !== true) reasons.push("military_signal_missing");
  if (item?.closed === true) reasons.push("recruitment_closed");
  if (item?.challenge === true) reasons.push("access_challenge");
  if (item?.auth === true) reasons.push("authentication_required");
  if (limitedText(item?.title).length < 7) reasons.push("invalid_title");
  if (item?.publishable !== true) reasons.push("probe_did_not_pass");
  const officialApply = asArray(item?.applyLinks)
    .map((link) => canonicalOfficialUrl(link?.url, APPLY_HOSTS))
    .filter(Boolean);
  if (!officialApply.length) reasons.push("official_apply_link_missing");
  const uniqueApply = [...new Set(officialApply)];
  const portalHomeOnly = uniqueApply.length > 0 && uniqueApply.every((url) => {
    const parsed = new URL(url);
    return parsed.pathname === "/" || /^\/(?:login|signin)\/?$/i.test(parsed.pathname);
  });
  if (portalHomeOnly) reasons.push("portal_home_not_specific_application");
  return {
    id: createHash("sha256").update(sourceUrl || limitedText(item?.sourceUrl, 2048)).digest("hex").slice(0, 16),
    title: limitedText(item?.title, 220),
    sourceUrl,
    sourceKey: limitedText(item?.sourceKey, 80),
    applyUrls: uniqueApply,
    reasons,
    status: reasons.length ? "rejected_or_unconfirmed" : "needs_manual_verification",
    // A portal URL is not proof that the application window is still open.
    publishable: false
  };
}

export function auditSources(report) {
  const sources = asArray(report?.sources).slice(0, 100);
  const entries = sources.map((source) => ({
    key: limitedText(source?.sourceKey, 80),
    loaded: source?.ok === true && Number(source?.status) >= 200 && Number(source?.status) < 400,
    challenge: source?.challenge === true,
    auth: source?.auth === true,
    note: limitedText(source?.error || "", 300)
  }));
  return {
    agent:"masaa-source-researcher",
    checked:entries.length,
    loaded:entries.filter(x=>x.loaded).length,
    failed:entries.filter(x=>!x.loaded).length,
    entries
  };
}

export function auditSecurity(report) {
  const candidates = asArray(report?.candidates).slice(0, 500);
  const issues = [];
  for (const item of candidates) {
    if (!canonicalOfficialUrl(item?.sourceUrl, SOURCE_HOSTS))
      issues.push({source:limitedText(item?.sourceKey,80),reason:"untrusted_source"});
    if (item?.challenge === true || item?.auth === true)
      issues.push({source:limitedText(item?.sourceKey,80),reason:"challenge_or_auth"});
    for (const link of asArray(item?.applyLinks).slice(0,30)) {
      if (!canonicalOfficialUrl(link?.url, APPLY_HOSTS))
        issues.push({source:limitedText(item?.sourceKey,80),reason:"untrusted_apply"});
    }
  }
  return {agent:"masaa-security-auditor",safeToExecuteRemoteInstructions:false,issues:issues.slice(0,200)};
}

export function deduplicate(items) {
  const seen = new Set();
  return items.map((item) => {
    const key = item.sourceUrl || item.id;
    if (seen.has(key)) {
      return {...item,status:"duplicate",reasons:[...item.reasons,"duplicate_official_announcement"],publishable:false};
    }
    seen.add(key);
    return item;
  });
}

export function reviewMilitaryReport(report, config) {
  if (!report || typeof report !== "object" || Array.isArray(report)) throw new Error("Invalid probe JSON object");
  if (!Array.isArray(report.sources) || !Array.isArray(report.candidates)) throw new Error("Missing source/candidate arrays");
  if (report.policy?.bypassCaptcha !== false || report.policy?.bypassLogin !== false || report.policy?.officialPublicPagesOnly !== true) {
    throw new Error("Probe lacks safe public-only policy");
  }
  if (!config || config.execution !== "read_only" || config.automaticBilling !== false || config.productionWrites !== false || config.maxAgents > 8 || config.roles?.length !== 6) {
    throw new Error("Invalid Masaa agent security policy");
  }
  if (report.candidates.length > 500 || report.sources.length > 100) throw new Error("Excessive probe data");

  const sources=auditSources(report);
  const security=auditSecurity(report);
  const trusted=deduplicate(report.candidates.map(trustCandidate));
  const awaitingReview=trusted.filter(x=>x.status==="needs_manual_verification");
  const duplicates=trusted.filter(x=>x.status==="duplicate");

  return {
    version:1,
    observedAt:limitedText(report.generatedAt,70),
    coordination:"hierarchical",
    provider:"none",
    spendUsd:0,
    agents:[
      {...sources},
      {agent:"masaa-trust-reviewer",inspected:trusted.length,reviewNeeded:awaitingReview.length},
      {agent:"masaa-dedupe-reviewer",duplicates:duplicates.length},
      {...security},
      {agent:"masaa-release-reviewer",reviewOnly:true,noAutoPublish:true},
      {agent:"masaa-coordinator",state:"complete_read_only",agentCount:6}
    ],
    candidates:trusted,
    gate:{
      publishAllowed:false,
      deployAllowed:false,
      mergeAllowed:false,
      manualVerificationRequired:true,
      explanation:"Public announcement and official portal URL do not prove an active application window."
    }
  };
}

export function reportMarkdown(review) {
  const source=review.agents.find(a=>a.agent==="masaa-source-researcher");
  const security=review.agents.find(a=>a.agent==="masaa-security-auditor");
  return [
    "# مَسعى — مراجعة الوكلاء للوظائف العسكرية",
    "",
    "**Read-only; no AI API calls, no automatic job publication.**",
    "",
    `- Official sources loaded: ${source.loaded}/${source.checked}`,
    `- Announcements inspected: ${review.candidates.length}`,
    `- Awaiting manual confirmation: ${review.candidates.filter(c=>c.status==="needs_manual_verification").length}`,
    `- Duplicate announcements: ${review.candidates.filter(c=>c.status==="duplicate").length}`,
    `- Security warnings: ${security.issues.length}`,
    "- Auto-publish: **disabled**",
    "",
    "| Agent | Status |",
    "| --- | --- |",
    ...review.agents.map(a=>`| ${safeMd(a.agent)} | ${safeMd(a.state || "checked")} |`),
    "",
    "## Candidate review",
    "",
    "| Official source | Title | Status | Issues |",
    "| --- | --- | --- | --- |",
    ...review.candidates.slice(0,80).map(c=>
      `| ${safeMd(c.sourceUrl || c.sourceKey)} | ${safeMd(c.title)} | ${safeMd(c.status)} | ${safeMd(c.reasons.join(", "))} |`
    ),
    "",
    "No announcement is considered open until the application period is confirmed at its official source.",
    ""
  ].join("\n");
}

function arg(name) {
 const at=process.argv.indexOf(name);
 return at>=0 ? process.argv[at+1] : null;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const input=arg("--input");
  const output=arg("--out");
  if (!input || !output) {
    console.error("Usage: node agents/coordinate.mjs --input military-probe/output/report.json --out military-probe/output/agent-review.json");
    process.exitCode=2;
  } else {
    const inputPath=resolve(input);
    const raw=readFileSync(inputPath);
    if (raw.byteLength > MAX_REPORT_BYTES) throw new Error("Probe report exceeds size cap");
    const config=JSON.parse(readFileSync(resolve(".agents/masaa-agents.json"),"utf8"));
    const review=reviewMilitaryReport(JSON.parse(raw.toString("utf8")),config);
    const outputPath=resolve(output);
    mkdirSync(dirname(outputPath),{recursive:true});
    writeFileSync(outputPath,JSON.stringify(review,null,2)+"\n");
    const markdownPath=outputPath.replace(/\.json$/i,".md");
    writeFileSync(markdownPath,reportMarkdown(review));
    console.log(JSON.stringify({
      agents:review.agents.length,
      sources:review.agents[0].checked,
      manualReview:review.candidates.filter(x=>x.status==="needs_manual_verification").length,
      autoPublished:0
    }));
  }
}
