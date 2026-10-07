const BASE = (process.env.MASAA_SITE_URL || "https://mas3a.pages.dev").replace(/\/$/, "");
const MAX_URLS = Math.min(Math.max(Number(process.env.AUDIT_MAX_URLS || 200), 10), 500);
const CONCURRENCY = Math.min(Math.max(Number(process.env.AUDIT_CONCURRENCY || 8), 2), 16);
const TIMEOUT_MS = Math.min(Math.max(Number(process.env.AUDIT_TIMEOUT_MS || 12000), 3000), 30000);

const report = {
  generated_at: new Date().toISOString(),
  base: BASE,
  totals: {},
  critical: [],
  warnings: [],
  pages: []
};

function issue(level, code, url, message) {
  const item = { level, code, url, message };
  if (level === "critical") report.critical.push(item);
  else report.warnings.push(item);
}

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const started = Date.now();
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "MasaaSiteAudit/1.0 (+https://mas3a.pages.dev/)" },
      signal: controller.signal
    });
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      url: response.url,
      ms: Date.now() - started,
      text,
      contentType: response.headers.get("content-type") || ""
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      url,
      ms: Date.now() - started,
      text: "",
      contentType: "",
      error: String(error?.name || error?.message || error)
    };
  } finally {
    clearTimeout(timer);
  }
}

function decodeHtml(value = "") {
  return String(value)
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstMatch(html, re) {
  const match = html.match(re);
  return match ? decodeHtml(match[1] || "") : "";
}

function allMatches(html, re) {
  return [...html.matchAll(re)].map((match) => decodeHtml(match[1] || ""));
}

function metaContent(html, name) {
  const patterns = [
    new RegExp('<meta[^>]+name=["\\\']' + name + '["\\\'][^>]+content=["\\\']([^"\\\']*)["\\\'][^>]*>', "i"),
    new RegExp('<meta[^>]+content=["\\\']([^"\\\']*)["\\\'][^>]+name=["\\\']' + name + '["\\\'][^>]*>', "i")
  ];
  for (const pattern of patterns) {
    const value = firstMatch(html, pattern);
    if (value) return value;
  }
  return "";
}

function linkHref(html, rel) {
  const patterns = [
    new RegExp('<link[^>]+rel=["\\\']' + rel + '["\\\'][^>]+href=["\\\']([^"\\\']+)["\\\'][^>]*>', "i"),
    new RegExp('<link[^>]+href=["\\\']([^"\\\']+)["\\\'][^>]+rel=["\\\']' + rel + '["\\\'][^>]*>', "i")
  ];
  for (const pattern of patterns) {
    const value = firstMatch(html, pattern);
    if (value) return value;
  }
  return "";
}

function collectTypedObjects(value, type, out = []) {
  if (!value || typeof value !== "object") return out;
  if (Array.isArray(value)) {
    for (const item of value) collectTypedObjects(item, type, out);
    return out;
  }
  const valueType = value["@type"];
  if (valueType === type || (Array.isArray(valueType) && valueType.includes(type))) out.push(value);
  for (const child of Object.values(value)) collectTypedObjects(child, type, out);
  return out;
}

function parseJsonLd(html) {
  const blocks = allMatches(
    html,
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  );
  const parsed = [];
  for (const block of blocks) {
    try {
      parsed.push(JSON.parse(block));
    } catch {}
  }
  return parsed;
}

function isLikelyJobDetail(url) {
  try {
    const path = new URL(url).pathname;
    if (!path.startsWith("/jobs/")) return false;
    const slug = path.slice("/jobs/".length).replace(/\/$/, "");
    const categorySlugs = new Set([
      "riyadh", "jeddah", "madinah", "dammam", "jubail",
      "fresh-graduates", "no-experience"
    ]);
    return Boolean(slug) && !categorySlugs.has(slug);
  } catch {
    return false;
  }
}

function visibleText(html) {
  return decodeHtml(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  );
}

async function auditPage(url) {
  const result = await fetchText(url);
  const page = {
    url,
    status: result.status,
    response_ms: result.ms,
    title: "",
    description: "",
    canonical: "",
    robots: "",
    h1_count: 0,
    jobposting_count: 0,
    issues: []
  };

  const add = (level, code, message) => {
    page.issues.push({ level, code, message });
    issue(level, code, url, message);
  };

  if (!result.ok) {
    add("warning", "http_status", result.error ? `Request failed: ${result.error}` : `HTTP ${result.status}`);
    report.pages.push(page);
    return page;
  }

  if (!/text\/html/i.test(result.contentType)) {
    report.pages.push(page);
    return page;
  }

  const html = result.text;
  page.title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  page.description = metaContent(html, "description");
  page.canonical = linkHref(html, "canonical");
  page.robots = metaContent(html, "robots");
  page.h1_count = (html.match(/<h1\b/gi) || []).length;

  if (!page.title) add("warning", "missing_title", "Missing <title>.");
  if (!page.description) add("warning", "missing_description", "Missing meta description.");
  if (!page.canonical) add("warning", "missing_canonical", "Missing canonical URL.");
  if (page.h1_count !== 1) add("warning", "h1_count", `Expected 1 H1, found ${page.h1_count}.`);

  if (page.canonical) {
    try {
      const canonical = new URL(page.canonical, BASE).href.replace(/\/$/, "");
      const actual = new URL(url).href.replace(/\/$/, "");
      if (canonical !== actual) add("warning", "canonical_mismatch", `Canonical points to ${canonical}.`);
    } catch {
      add("warning", "invalid_canonical", "Canonical is not a valid URL.");
    }
  }

  const text = visibleText(html);
  if (/\b(?:المؤهل|الخبرة)\s*[:：]?\s*[&×,،]+(?:\s|$)/u.test(text)) {
    add("warning", "malformed_job_detail", "Visible job details contain malformed qualification/experience.");
  }

  if (isLikelyJobDetail(url)) {
    const h1 = firstMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (/^(?:شركة|وظيفة|فرصة وظيفية|jobs?|careers?)$/iu.test(h1)) {
      add("warning", "generic_job_title", `Job H1 looks generic: "${h1}".`);
    }

    const ld = parseJsonLd(html);
    const jobPostings = [];
    for (const item of ld) collectTypedObjects(item, "JobPosting", jobPostings);
    page.jobposting_count = jobPostings.length;

    if (!jobPostings.length) {
      add("warning", "missing_jobposting_schema", "No schema.org JobPosting JSON-LD found.");
    } else {
      const jp = jobPostings[0];
      const required = [
        ["title", jp.title],
        ["description", jp.description],
        ["hiringOrganization", jp.hiringOrganization],
        ["datePosted", jp.datePosted]
      ];
      for (const [field, value] of required) {
        if (!value) add("warning", "jobposting_missing_" + field.toLowerCase(), `JobPosting is missing ${field}.`);
      }
      if (!jp.jobLocation && !jp.applicantLocationRequirements && jp.jobLocationType !== "TELECOMMUTE") {
        add("warning", "jobposting_missing_location", "JobPosting has no job location or remote applicant location.");
      }
    }
  }

  report.pages.push(page);
  return page;
}

async function runPool(items, worker, concurrency) {
  let index = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (true) {
      const current = index++;
      if (current >= items.length) return;
      await worker(items[current]);
    }
  });
  await Promise.all(runners);
}

console.log(`Masaa site audit: ${BASE}`);

const [home, robots, sitemap] = await Promise.all([
  fetchText(BASE + "/"),
  fetchText(BASE + "/robots.txt"),
  fetchText(BASE + "/sitemap.xml")
]);

if (!home.ok) issue("critical", "homepage_down", BASE + "/", `Homepage returned ${home.status || home.error}.`);
if (!robots.ok) {
  issue("critical", "robots_unavailable", BASE + "/robots.txt", `robots.txt returned ${robots.status || robots.error}.`);
} else {
  if (!/User-agent:\s*\*/i.test(robots.text) || !/Allow:\s*\//i.test(robots.text)) {
    issue("critical", "robots_blocking", BASE + "/robots.txt", "robots.txt does not clearly allow the site.");
  }
  if (!/Sitemap:\s*https?:\/\//i.test(robots.text)) {
    issue("warning", "robots_missing_sitemap", BASE + "/robots.txt", "robots.txt does not declare a sitemap.");
  }
}

let urls = [];
if (!sitemap.ok) {
  issue("critical", "sitemap_unavailable", BASE + "/sitemap.xml", `sitemap.xml returned ${sitemap.status || sitemap.error}.`);
} else {
  urls = allMatches(sitemap.text, /<loc>([\s\S]*?)<\/loc>/gi)
    .filter((url) => {
      try { return new URL(url).origin === new URL(BASE).origin; } catch { return false; }
    });
  if (!urls.length) issue("critical", "sitemap_empty", BASE + "/sitemap.xml", "Sitemap contains no URLs.");
}

urls = [...new Set([BASE + "/", ...urls])].slice(0, MAX_URLS);
await runPool(urls, auditPage, CONCURRENCY);

const failedPages = report.pages.filter((page) => page.status < 200 || page.status >= 400);
if (report.pages.length >= 10 && failedPages.length / report.pages.length > 0.1) {
  issue(
    "critical",
    "too_many_broken_pages",
    BASE,
    `${failedPages.length}/${report.pages.length} audited pages returned an error status.`
  );
}

report.totals = {
  sitemap_urls: urls.length,
  audited_pages: report.pages.length,
  broken_pages: failedPages.length,
  job_pages: report.pages.filter((page) => isLikelyJobDetail(page.url)).length,
  job_pages_with_schema: report.pages.filter((page) => page.jobposting_count > 0).length,
  critical: report.critical.length,
  warnings: report.warnings.length
};

await import("node:fs/promises").then(async (fs) => {
  await fs.writeFile("site-audit-report.json", JSON.stringify(report, null, 2) + "\n");
  const lines = [
    "# Masaa Site Audit",
    "",
    `Generated: ${report.generated_at}`,
    "",
    "## Summary",
    "",
    `- Audited pages: ${report.totals.audited_pages}`,
    `- Broken pages: ${report.totals.broken_pages}`,
    `- Job pages: ${report.totals.job_pages}`,
    `- Job pages with JobPosting schema: ${report.totals.job_pages_with_schema}`,
    `- Critical issues: ${report.totals.critical}`,
    `- Warnings: ${report.totals.warnings}`,
    "",
    "## Critical",
    "",
    ...(report.critical.length
      ? report.critical.map((x) => `- **${x.code}** — ${x.url} — ${x.message}`)
      : ["- None"]),
    "",
    "## Warnings",
    "",
    ...(report.warnings.length
      ? report.warnings.slice(0, 100).map((x) => `- **${x.code}** — ${x.url} — ${x.message}`)
      : ["- None"]),
    ""
  ];
  await fs.writeFile("site-audit-report.md", lines.join("\n"));
});

console.log(JSON.stringify(report.totals, null, 2));
if (report.critical.length) {
  console.error("Critical site audit issues detected.");
  process.exitCode = 1;
}
