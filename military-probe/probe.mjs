import { PlaywrightCrawler } from "crawlee";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export const MILITARY_KEYWORDS = [
  "فتح باب",
  "القبول والتسجيل",
  "القبول الموحد",
  "التجنيد الموحد",
  "التجنيد",
  "الخدمة العسكرية",
  "رتبة جندي",
  "رتبة جندي أول",
  "وكيل رقيب",
  "عريف",
  "الالتحاق بالخدمة العسكرية",
  "الوظائف العسكرية",
  "وظائف عسكرية"
];

export const CLOSED_SIGNALS = [
  "انتهى التقديم",
  "انتهت فترة التقديم",
  "التقديم مغلق",
  "أغلق التقديم",
  "اغلق التقديم",
  "لا يوجد تقديم",
  "applications are closed",
  "application period has ended",
  "no longer accepting applications"
];

export const CHALLENGE_SIGNALS = [
  "captcha",
  "recaptcha",
  "تحقق أنك إنسان",
  "verify you are human",
  "access denied",
  "request blocked",
  "forbidden",
  "security check",
  "checking your browser",
  "incapsula",
  "akamai",
  "cloudflare"
];

export const AUTH_SIGNALS = [
  "تسجيل الدخول",
  "اسم المستخدم",
  "كلمة المرور",
  "login",
  "sign in",
  "username",
  "password"
];

const SOURCES = [
  {
    key: "sang-news",
    name: "وزارة الحرس الوطني - الأخبار",
    url: "https://www.sang.gov.sa/MediaAffairs/MONGNews/Pages/default.aspx",
    kind: "listing",
    officialHosts: ["www.sang.gov.sa", "sang.gov.sa", "portal.sang.gov.sa"],
    applyHosts: ["jobs.sang.gov.sa", "jobs.sa"]
  },
  {
    key: "sang-military-page",
    name: "وزارة الحرس الوطني - صفحة الوظائف العسكرية",
    url: "https://portal.sang.gov.sa/Jobs/ads/Pages/MilitaryJobs.aspx",
    kind: "listing",
    officialHosts: ["portal.sang.gov.sa", "www.sang.gov.sa", "sang.gov.sa"],
    applyHosts: ["jobs.sang.gov.sa", "jobs.sa"]
  },
  {
    key: "spa-military",
    name: "وكالة الأنباء السعودية - الأخبار",
    url: "https://www.spa.gov.sa/news/latest-news?page=1",
    kind: "listing",
    officialHosts: ["www.spa.gov.sa", "spa.gov.sa"],
    applyHosts: ["jobs.sa", "tajnid.mod.gov.sa", "jobs.sang.gov.sa", "afca.mod.gov.sa", "kkmar.gov.sa", "www.kkmar.gov.sa"]
  },
  {
    key: "spa-search-tajnid",
    name: "واس - بحث التجنيد الموحد",
    url: "https://www.spa.gov.sa/search?q=%D8%A7%D9%84%D8%AA%D8%AC%D9%86%D9%8A%D8%AF%20%D8%A7%D9%84%D9%85%D9%88%D8%AD%D8%AF",
    kind: "listing",
    officialHosts: ["www.spa.gov.sa", "spa.gov.sa"],
    applyHosts: ["jobs.sa", "tajnid.mod.gov.sa", "jobs.sang.gov.sa", "afca.mod.gov.sa", "kkmar.gov.sa", "www.kkmar.gov.sa"]
  },
  {
    key: "spa-search-military-service",
    name: "واس - بحث الخدمة العسكرية",
    url: "https://www.spa.gov.sa/search?q=%D8%A7%D9%84%D8%AE%D8%AF%D9%85%D8%A9%20%D8%A7%D9%84%D8%B9%D8%B3%D9%83%D8%B1%D9%8A%D8%A9",
    kind: "listing",
    officialHosts: ["www.spa.gov.sa", "spa.gov.sa"],
    applyHosts: ["jobs.sa", "tajnid.mod.gov.sa", "jobs.sang.gov.sa", "afca.mod.gov.sa", "kkmar.gov.sa", "www.kkmar.gov.sa"]
  },
  {
    key: "absher-jobs",
    name: "أبشر توظيف",
    url: "https://jobs.sa/",
    kind: "portal",
    officialHosts: ["jobs.sa"],
    applyHosts: ["jobs.sa"]
  },
  {
    key: "mod-tajnid",
    name: "وزارة الدفاع - التجنيد الموحد",
    url: "https://tajnid.mod.gov.sa/",
    kind: "portal",
    officialHosts: ["tajnid.mod.gov.sa"],
    applyHosts: ["tajnid.mod.gov.sa"]
  },
  {
    key: "sang-jobs",
    name: "بوابة توظيف الحرس الوطني",
    url: "https://jobs.sang.gov.sa/",
    kind: "portal",
    officialHosts: ["jobs.sang.gov.sa"],
    applyHosts: ["jobs.sang.gov.sa"]
  }
];

function clean(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

export function containsAny(value, signals) {
  const haystack = clean(value).toLowerCase();
  return signals.some((signal) => haystack.includes(signal.toLowerCase()));
}

export function hasMilitarySignal(value) {
  return containsAny(value, MILITARY_KEYWORDS);
}

export function isClosedText(value) {
  return containsAny(value, CLOSED_SIGNALS);
}

export function isChallengeText(value) {
  return containsAny(value, CHALLENGE_SIGNALS);
}

export function isAuthText(value) {
  return containsAny(value, AUTH_SIGNALS);
}

export function hostnameMatches(host, allowedHosts) {
  const normalized = clean(host).toLowerCase().replace(/\.$/, "");
  return allowedHosts.some((allowed) => {
    const candidate = clean(allowed).toLowerCase().replace(/\.$/, "");
    return normalized === candidate || normalized.endsWith("." + candidate);
  });
}

export function isAllowedHttpsUrl(value, allowedHosts) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password && hostnameMatches(url.hostname, allowedHosts);
  } catch {
    return false;
  }
}

export function looksLikeOfficialArticle(url, source) {
  try {
    const parsed = new URL(url);
    if (!hostnameMatches(parsed.hostname, source.officialHosts)) return false;

    if (source.key === "sang-news") {
      return /\/MediaAffairs\/MONGNews\/\d+\/Pages\/[^/?#]+\.aspx/i.test(parsed.pathname);
    }

    if (source.key === "sang-military-page") {
      return parsed.pathname.toLowerCase().includes("/jobs/ads/");
    }

    if (source.key.startsWith("spa-")) {
      return /\/(?:ar\/)?N\d+$/i.test(parsed.pathname) || /^\/\d{6,}$/i.test(parsed.pathname);
    }

    return false;
  } catch {
    return false;
  }
}

function absoluteUrl(href, base) {
  try {
    return new URL(href, base).href;
  } catch {
    return "";
  }
}

function dedupeBy(items, keyFn) {
  const map = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (key && !map.has(key)) map.set(key, item);
  }
  return [...map.values()];
}

function sourceSummaryRow(result) {
  const flags = [];
  if (result.challenge) flags.push("challenge");
  if (result.auth) flags.push("auth");
  if (result.closed) flags.push("closed");
  if (result.militarySignal) flags.push("military-signal");
  return [
    result.sourceKey,
    String(result.status ?? ""),
    result.ok ? "yes" : "no",
    result.finalUrl || "",
    flags.join(",") || "none",
    String(result.linksFound ?? 0)
  ];
}

async function snapshotPage(page, source, response) {
  const title = clean(await page.title().catch(() => ""));
  const bodyText = clean(await page.locator("body").innerText({ timeout: 5000 }).catch(() => ""));
  const finalUrl = page.url();
  const anchors = await page.locator("a[href]").evaluateAll((nodes) =>
    nodes.slice(0, 800).map((node) => ({
      href: node.getAttribute("href") || "",
      text: (node.textContent || "").replace(/\s+/g, " ").trim()
    }))
  ).catch(() => []);
  const resources = await page.evaluate(() =>
    performance.getEntriesByType("resource").slice(-400).map((entry) => ({
      name: entry.name,
      initiatorType: entry.initiatorType
    }))
  ).catch(() => []);
  const networkUrls = [...new Set(
    resources
      .filter((item) => ["fetch", "xmlhttprequest"].includes(item.initiatorType))
      .map((item) => item.name)
  )].slice(0, 120);

  const combined = clean(title + " " + bodyText.slice(0, 12000));
  const status = typeof response?.status === "function" ? response.status() : null;

  return {
    sourceKey: source.key,
    sourceName: source.name,
    requestedUrl: source.url,
    finalUrl,
    status,
    ok: status === null ? Boolean(bodyText || title) : status >= 200 && status < 400,
    title,
    bodyPreview: bodyText.slice(0, 1600),
    challenge: isChallengeText(combined),
    auth: isAuthText(combined),
    closed: isClosedText(combined),
    militarySignal: hasMilitarySignal(combined),
    linksFound: anchors.length,
    networkUrls,
    anchors
  };
}

function discoverCandidates(snapshot, source) {
  const candidates = [];

  for (const anchor of snapshot.anchors || []) {
    const url = absoluteUrl(anchor.href, snapshot.finalUrl || source.url);
    if (!url) continue;

    const text = clean(anchor.text);
    const combined = clean(text + " " + url);

    if (!looksLikeOfficialArticle(url, source)) continue;

    if ((source.key.startsWith("spa-") || source.key === "sang-news") && !hasMilitarySignal(combined)) {
      continue;
    }

    candidates.push({
      url,
      sourceKey: source.key,
      sourceName: source.name,
      officialHosts: source.officialHosts,
      applyHosts: source.applyHosts,
      anchorText: text
    });
  }

  // Some official pages publish the entire military notice directly on the
  // listing page. Keep it as a candidate only when there is a military signal.
  if (source.key === "sang-military-page" && snapshot.militarySignal) {
    candidates.push({
      url: snapshot.finalUrl || source.url,
      sourceKey: source.key,
      sourceName: source.name,
      officialHosts: source.officialHosts,
      applyHosts: source.applyHosts,
      anchorText: snapshot.title
    });
  }

  return dedupeBy(candidates, (item) => item.url);
}

async function inspectArticle(page, request, response) {
  const meta = request.userData;
  const title = clean(
    await page.locator("h1").first().innerText({ timeout: 2500 }).catch(() => "") ||
    await page.title().catch(() => "") ||
    meta.anchorText
  );
  const bodyText = clean(await page.locator("body").innerText({ timeout: 5000 }).catch(() => ""));
  const anchors = await page.locator("a[href]").evaluateAll((nodes) =>
    nodes.slice(0, 1000).map((node) => ({
      href: node.getAttribute("href") || "",
      text: (node.textContent || "").replace(/\s+/g, " ").trim()
    }))
  ).catch(() => []);

  const applyLinks = dedupeBy(
    anchors
      .map((anchor) => ({
        url: absoluteUrl(anchor.href, page.url()),
        text: clean(anchor.text)
      }))
      .filter((item) => item.url && isAllowedHttpsUrl(item.url, meta.applyHosts)),
    (item) => item.url
  );

  const combined = clean(title + " " + bodyText.slice(0, 18000));
  const status = typeof response?.status === "function" ? response.status() : null;
  const militarySignal = hasMilitarySignal(combined);
  const closed = isClosedText(combined);
  const challenge = isChallengeText(combined);
  const auth = isAuthText(combined);
  const sourceUrl = page.url();
  const sourceTrusted = isAllowedHttpsUrl(sourceUrl, meta.officialHosts);
  const publishable = Boolean(
    sourceTrusted &&
    militarySignal &&
    !closed &&
    !challenge &&
    applyLinks.length > 0
  );

  const reasons = [];
  if (!sourceTrusted) reasons.push("untrusted_source_url");
  if (!militarySignal) reasons.push("missing_military_signal");
  if (closed) reasons.push("closed");
  if (challenge) reasons.push("challenge");
  if (applyLinks.length === 0) reasons.push("missing_official_apply_link");

  return {
    sourceKey: meta.sourceKey,
    sourceName: meta.sourceName,
    sourceUrl,
    status,
    title,
    militarySignal,
    closed,
    challenge,
    auth,
    publishable,
    reasons,
    applyLinks,
    bodyPreview: bodyText.slice(0, 1800)
  };
}

export async function runProbe() {
  const outputDir = resolve("output");
  mkdirSync(outputDir, { recursive: true });

  const sourceResults = [];
  const candidateRequests = [];

  const listingCrawler = new PlaywrightCrawler({
    maxConcurrency: 2,
    maxRequestRetries: 0,
    requestHandlerTimeoutSecs: 25,
    navigationTimeoutSecs: 15,
    launchContext: {
      launchOptions: {
        headless: true
      }
    },
    preNavigationHooks: [
      async ({ page }, gotoOptions) => {
        gotoOptions.waitUntil = "domcontentloaded";
        await page.setExtraHTTPHeaders({
          "Accept-Language": "ar-SA,ar;q=0.9,en;q=0.8"
        });
      }
    ],
    async requestHandler({ request, page, response }) {
      const source = request.userData;
      const snapshot = await snapshotPage(page, source, response);
      sourceResults.push(snapshot);

      if (source.kind === "listing" && snapshot.ok && !snapshot.challenge) {
        candidateRequests.push(...discoverCandidates(snapshot, source));
      }
    },
    async failedRequestHandler({ request, error }) {
      const source = request.userData;
      sourceResults.push({
        sourceKey: source.key,
        sourceName: source.name,
        requestedUrl: source.url,
        finalUrl: "",
        status: null,
        ok: false,
        title: "",
        bodyPreview: "",
        challenge: false,
        auth: false,
        closed: false,
        militarySignal: false,
        linksFound: 0,
        error: clean(error?.message || error)
      });
    }
  });

  await listingCrawler.run(SOURCES.map((source) => ({
    url: source.url,
    uniqueKey: "source:" + source.key,
    userData: source
  })));

  const dedupedCandidates = dedupeBy(candidateRequests, (item) => item.url).slice(0, 24);
  const articleResults = [];

  if (dedupedCandidates.length > 0) {
    const articleCrawler = new PlaywrightCrawler({
      maxConcurrency: 2,
      maxRequestRetries: 0,
      requestHandlerTimeoutSecs: 25,
      navigationTimeoutSecs: 15,
      launchContext: {
        launchOptions: {
          headless: true
        }
      },
      preNavigationHooks: [
        async ({ page }, gotoOptions) => {
          gotoOptions.waitUntil = "domcontentloaded";
          await page.setExtraHTTPHeaders({
            "Accept-Language": "ar-SA,ar;q=0.9,en;q=0.8"
          });
        }
      ],
      async requestHandler({ request, page, response }) {
        articleResults.push(await inspectArticle(page, request, response));
      },
      async failedRequestHandler({ request, error }) {
        articleResults.push({
          sourceKey: request.userData.sourceKey,
          sourceName: request.userData.sourceName,
          sourceUrl: request.url,
          status: null,
          title: clean(request.userData.anchorText),
          militarySignal: false,
          closed: false,
          challenge: false,
          auth: false,
          publishable: false,
          reasons: ["fetch_failed"],
          applyLinks: [],
          error: clean(error?.message || error)
        });
      }
    });

    await articleCrawler.run(dedupedCandidates.map((candidate) => ({
      url: candidate.url,
      uniqueKey: "article:" + candidate.url,
      userData: candidate
    })));
  }

  const report = {
    generatedAt: new Date().toISOString(),
    engine: {
      playwright: "1.63.0",
      crawlee: "3.18.2"
    },
    policy: {
      bypassCaptcha: false,
      bypassLogin: false,
      officialPublicPagesOnly: true
    },
    sources: sourceResults.map(({ anchors, ...rest }) => rest),
    candidates: articleResults,
    publishable: articleResults.filter((item) => item.publishable)
  };

  writeFileSync(resolve(outputDir, "report.json"), JSON.stringify(report, null, 2) + "\n");

  const lines = [
    "# Masaa Military Browser Probe",
    "",
    "Generated: " + report.generatedAt,
    "",
    "Policy: public official pages only; no CAPTCHA/login bypass.",
    "",
    "## Sources",
    "",
    "| Source | HTTP | Loaded | Final URL | Flags | Links |",
    "| --- | ---: | --- | --- | --- | ---: |",
    ...sourceResults.map((item) =>
      "| " + sourceSummaryRow(item).map((value) => String(value).replace(/\|/g, "\\|")).join(" | ") + " |"
    ),
    "",
    "## Network/API clues",
    "",
    ...sourceResults.flatMap((item) => {
      const urls = (item.networkUrls || []).filter((url) => /(?:api|news|job|career|backend|graphql|search|vacan|recruit)/i.test(url)).slice(0, 12);
      if (!urls.length) return [];
      return ["### " + item.sourceKey, "", ...urls.map((url) => "- " + url), ""];
    }),
    "## Candidate announcements",
    "",
    articleResults.length
      ? "| Source | Publishable | Title | Apply links | Reasons |\n| --- | --- | --- | ---: | --- |\n" +
        articleResults.map((item) =>
          "| " +
          [
            item.sourceKey,
            item.publishable ? "yes" : "no",
            clean(item.title).replace(/\|/g, "\\|"),
            String(item.applyLinks?.length || 0),
            (item.reasons || []).join(",")
          ].join(" | ") +
          " |"
        ).join("\n")
      : "No candidate announcements discovered.",
    "",
    "Publishable candidates: **" + report.publishable.length + "**"
  ];

  writeFileSync(resolve(outputDir, "summary.md"), lines.join("\n") + "\n");
  console.log(JSON.stringify({
    sources: report.sources.length,
    candidates: report.candidates.length,
    publishable: report.publishable.length
  }, null, 2));

  return report;
}

if (import.meta.url === new URL(process.argv[1], "file:").href) {
  await runProbe();
}
