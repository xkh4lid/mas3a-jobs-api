const SUCCESSFACTORS_SOURCES = [
  {
    key: "stc",
    name: "stc Careers",
    company: "stc",
    companyAr: "stc",
    sector: "خاص",
    host: "careers.stc.com.sa",
    listingUrls: [
      "https://careers.stc.com.sa/viewalljobs/?q=&sortColumn=referencedate&sortDirection=desc",
      "https://careers.stc.com.sa/go/All-Jobs-Except-JAP/7754423/?q=&sortColumn=referencedate&sortDirection=desc"
    ]
  },
  {
    key: "kaust",
    name: "KAUST Careers",
    company: "King Abdullah University of Science & Technology",
    companyAr: "جامعة الملك عبدالله للعلوم والتقنية",
    sector: "خاص",
    host: "careers.kaust.edu.sa",
    listingUrls: [
      "https://careers.kaust.edu.sa/viewalljobs/?q=&sortColumn=referencedate&sortDirection=desc",
      "https://careers.kaust.edu.sa/KAUST/go/KAUST-Jobs/2989101/?q=&sortColumn=referencedate&sortDirection=desc"
    ]
  }
];

const MILITARY_NEWS_SOURCES = [
  {
    key: "sang-military",
    name: "وزارة الحرس الوطني - القبول العسكري",
    company: "وزارة الحرس الوطني",
    sector: "عسكري",
    host: "www.sang.gov.sa",
    listingUrls: [
      "https://www.sang.gov.sa/MediaAffairs/MONGNews/Pages/default.aspx"
    ],
    articlePath: /\/MediaAffairs\/MONGNews\/\d+\/Pages\/[^?#]+\.aspx/i,
    applyHosts: ["jobs.sang.gov.sa"],
    applyUrl: "https://jobs.sang.gov.sa/",
    keywords: [
      "فتح باب القبول",
      "فتح باب التسجيل",
      "القبول والتسجيل",
      "الراغبين في الالتحاق بالخدمة العسكرية",
      "الالتحاق بالخدمة العسكرية",
      "التجنيد",
      "وظائف عسكرية"
    ]
  }
];

const SOURCE_CATALOG = [
  {
    key: "jadarat",
    name: "جدارات",
    url: "https://jadarat.sa/",
    source_type: "official_portal",
    sector: "حكومي",
    enabled: 1,
    supported: 0,
    status: "portal"
  },
  {
    key: "absher-military",
    name: "أبشر توظيف",
    url: "https://jobs.sa/",
    source_type: "official_portal",
    sector: "عسكري",
    enabled: 1,
    supported: 0,
    status: "portal"
  },
  {
    key: "mod-tajnid",
    name: "التجنيد الموحد - وزارة الدفاع",
    url: "https://tajnid.mod.gov.sa/",
    source_type: "official_portal",
    sector: "عسكري",
    enabled: 1,
    supported: 0,
    status: "portal"
  },
  {
    key: "sang-jobs",
    name: "بوابة توظيف الحرس الوطني",
    url: "https://jobs.sang.gov.sa/",
    source_type: "official_portal",
    sector: "عسكري",
    enabled: 1,
    supported: 0,
    status: "portal"
  }
];

const VERSION = "2.2.1";
const LOCALIZATION_VERSION = "ar-v3";
const nowIso = () => new Date().toISOString();

const clean = (value) =>
  String(value ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const decodeBasicEntities = (value) =>
  String(value ?? "")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#x2f;/gi, "/")
    .replace(/&#47;/gi, "/");

function withoutScripts(value) {
  return String(value ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");
}

const stripHtml = (value) =>
  clean(
    decodeBasicEntities(withoutScripts(value))
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<\/li>/gi, "\n")
      .replace(/<[^>]*>/g, " ")
  );

const absoluteUrl = (href, base) => {
  try {
    return new URL(href, base).href;
  } catch {
    return "";
  }
};

const sha256 = async (value) => {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(String(value))
  );

  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

function externalIdFromUrl(url) {
  const match = String(url).match(/\/(\d{6,})\/?(?:[?#]|$)/);
  return match?.[1] || null;
}

function parseDate(value) {
  const text = clean(value);
  if (!text) return null;

  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return null;

  return parsed.toISOString().slice(0, 10);
}

function parseDmyDate(value) {
  const match = String(value ?? "").match(/\b(\d{1,2})[\/-](\d{1,2})[\/-](20\d{2})\b/);
  if (!match) return null;
  const [, d, m, y] = match;
  const iso = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const date = new Date(`${iso}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : iso;
}

function addDays(isoDate, days) {
  if (!isoDate) return null;
  const date = new Date(`${isoDate}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function daysSince(isoDate) {
  if (!isoDate) return Infinity;
  const date = new Date(`${isoDate}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return Infinity;
  return Math.floor((Date.now() - date.getTime()) / 86400000);
}

function normalizeListingHtml(html) {
  return decodeBasicEntities(String(html ?? ""))
    .replace(/\\u002f/gi, "/")
    .replace(/\\u002F/g, "/")
    .replace(/\\\//g, "/");
}

function discoverJobUrls(html, source, baseUrl) {
  const normalized = normalizeListingHtml(html);
  const found = new Set();

  const add = (candidate) => {
    if (!candidate) return;

    const url = absoluteUrl(candidate, baseUrl);

    try {
      const parsed = new URL(url);
      if (parsed.hostname !== source.host) return;
      if (!/\/job\//i.test(parsed.pathname)) return;
      if (!/\/\d{6,}\/?$/i.test(parsed.pathname)) return;
      found.add(parsed.href);
    } catch {
      // Ignore invalid URLs.
    }
  };

  const hrefRegex = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = hrefRegex.exec(normalized))) {
    add(match[1]);
  }

  const rawJobRegex =
    /((?:https?:\/\/[^"'<>\\\s]+)?\/job\/[^"'<>\\\s?#]+\/\d{6,}\/?)/gi;

  while ((match = rawJobRegex.exec(normalized))) {
    add(match[1]);
  }

  return [...found];
}

function discoverArticleUrls(html, source, baseUrl) {
  const normalized = normalizeListingHtml(html);
  const found = new Set();
  const hrefRegex = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = hrefRegex.exec(normalized))) {
    const url = absoluteUrl(match[1], baseUrl);
    try {
      const parsed = new URL(url);
      if (parsed.hostname !== source.host) continue;
      if (!source.articlePath.test(parsed.pathname)) continue;
      found.add(parsed.href);
    } catch {
      // Ignore malformed URLs.
    }
  }

  return [...found];
}

function pageExplicitlyHasNoJobs(html) {
  const text = stripHtml(html).toLowerCase();

  return [
    "there are currently no open positions",
    "0 most recent jobs",
    "no jobs found",
    "لا توجد حاليًا أي مناصب شاغرة",
    "لا توجد وظائف",
    "لا توجد فرص"
  ].some((phrase) => text.includes(phrase.toLowerCase()));
}

function visibleFieldFromHtml(html, labels, maxLength = 220) {
  const visible = withoutScripts(html);
  for (const label of labels) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const patterns = [
      new RegExp(`<strong[^>]*>\\s*${escaped}\\s*:?\\s*<\\/strong>\\s*([\\s\\S]{0,${maxLength * 3}}?)<\\/p>`, "i"),
      new RegExp(`<p[^>]*>\\s*${escaped}\\s*:?\\s*([\\s\\S]{0,${maxLength * 3}}?)<\\/p>`, "i")
    ];

    for (const regex of patterns) {
      const match = visible.match(regex);
      if (match?.[1]) {
        const value = stripHtml(match[1]).slice(0, maxLength);
        if (value) return value;
      }
    }
  }
  return "";
}

function textAfterLabel(text, labels, maxLength = 250) {
  for (const label of labels) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = String(text).match(
      new RegExp(`(?:^|\\n|\\s)${escaped}\\s*:?\\s*([^\\n|]{1,${maxLength}})`, "i")
    );

    if (match?.[1]) return clean(match[1]).slice(0, maxLength);
  }

  return "";
}

function removeBoilerplate(value) {
  return clean(
    String(value ?? "")
      .replace(/Skip to main content/gi, " ")
      .replace(/Home Professional Life at KAUST[\s\S]*?Search by Keyword/gi, " ")
      .replace(/Select how often \(in days\) to receive an alert:?/gi, " ")
      .replace(/Create Alert/gi, " ")
      .replace(/Apply now\s*»?/gi, " ")
      .replace(/Find similar jobs/gi, " ")
      .replace(/View Profile/gi, " ")
      .replace(/When you visit any website[\s\S]{0,1800}?(?:cookies?|privacy)/gi, " ")
      .replace(/Your cookie preferences[\s\S]{0,1600}?(?:cookies?|privacy)/gi, " ")
      .replace(/This website uses cookies[\s\S]{0,1600}?(?:Accept|Reject|Settings)/gi, " ")
      .replace(/Cookie Preferences[\s\S]{0,1200}?(?:Accept|Reject|Settings)/gi, " ")
      .replace(/Manage Preferences[\s\S]{0,1200}?(?:Accept|Reject|Settings)/gi, " ")
  );
}

function containsCookieNoise(value) {
  return /(?:cookies?|cookie preferences|privacy preferences|local storage|browser storage|manage preferences|accept cookies|reject cookies)/i.test(String(value ?? ""));
}

function sanitizeQualification(value) {
  const raw = clean(value);
  if (!raw || containsCookieNoise(raw)) return null;
  return clean(
    removeBoilerplate(raw)
      .replace(/\b(?:Experience requirement|Years of Experience|Additional Education|Certifications|Apply now)\b[\s\S]*$/i, " ")
  ).slice(0, 420) || null;
}

function sanitizeExperience(value) {
  const raw = clean(value);
  if (!raw || containsCookieNoise(raw)) return null;
  return clean(
    removeBoilerplate(raw)
      .replace(/\b(?:Nature of Experience|Job Band|Professional Skills|Managerial Skills|Education|Additional Education|Certifications|Apply now)\b[\s\S]*$/i, " ")
  ).slice(0, 320) || null;
}

function markerIndex(source, marker, from = 0) {
  const escaped = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (/^[A-Za-z0-9 ]+$/.test(marker)) {
    const regex = new RegExp(`\\b${escaped}\\b`, "ig");
    regex.lastIndex = from;
    const match = regex.exec(source);
    return match ? match.index : -1;
  }
  return source.toLowerCase().indexOf(marker.toLowerCase(), from);
}

function extractSection(text, startMarkers, stopMarkers, maxLength = 900) {
  const source = removeBoilerplate(String(text ?? ""));
  let start = -1;
  let markerLength = 0;

  // Marker order is intentional: prefer specific labels before generic words.
  // Word boundaries prevent "Education" from matching "Educational" in a job title.
  for (const marker of startMarkers) {
    const idx = markerIndex(source, marker);
    if (idx >= 0) {
      start = idx;
      markerLength = marker.length;
      break;
    }
  }

  if (start < 0) return "";
  let end = source.length;
  const from = start + markerLength;
  for (const marker of stopMarkers) {
    const idx = markerIndex(source, marker, from);
    if (idx >= 0 && idx < end) end = idx;
  }

  return removeBoilerplate(source.slice(from, end)).slice(0, maxLength);
}

function extractDescription(html) {
  const text = removeBoilerplate(stripHtml(html));
  const summary = extractSection(
    text,
    ["Job Purpose", "About The Role", "About the Role", "Role Purpose", "Position Summary", "Job Summary", "Job Description"],
    ["Responsibilities", "Job Responsibility", "Major Responsibilities", "Major Accountabilities", "Qualifications", "Requirements", "Years of Experience", "Education", "Required Skills", "Preferred Skills", "Skills", "Apply now"],
    900
  );

  if (summary.length >= 35) return summary;

  const fallback = removeBoilerplate(text)
    .replace(/^.*?(?:Company\s*:?\s*[^.]{1,120})/i, "")
    .slice(0, 700);

  return fallback.length >= 35 ? fallback : null;
}

function normalizeCity(value) {
  const city = clean(value)
    .replace(/^[-:–—]+|[-:–—]+$/g, "")
    .replace(/^=\s*self\.location\s*;?$/i, "")
    .replace(/^self\.location\s*;?$/i, "");

  if (!city) return null;

  const map = new Map([
    ["SA", "السعودية"],
    ["Saudi Arabia", "السعودية"],
    ["Kingdom of Saudi Arabia", "السعودية"],
    ["Riyadh", "الرياض"],
    ["Jeddah", "جدة"],
    ["Makkah", "مكة المكرمة"],
    ["Mecca", "مكة المكرمة"],
    ["Madinah", "المدينة المنورة"],
    ["Medina", "المدينة المنورة"],
    ["Dammam", "الدمام"],
    ["Khobar", "الخبر"],
    ["Al Khobar", "الخبر"],
    ["Dhahran", "الظهران"],
    ["Tabuk", "تبوك"],
    ["Abha", "أبها"],
    ["Jazan", "جازان"],
    ["Najran", "نجران"]
  ]);

  return map.get(city) || city;
}

function isArabic(value) {
  return /[\u0600-\u06FF]/.test(String(value ?? ""));
}

function explicitRemoteFlag({ title, city, workMode, description }) {
  const explicit = `${title || ""} ${city || ""} ${workMode || ""}`;
  if (/\b(remote|work from home|hybrid)\b/i.test(explicit)) return true;
  if (/عن بُعد|عن بعد|العمل من المنزل|هجين/.test(explicit)) return true;

  const intro = clean(description).slice(0, 260);
  return /\b(?:this (?:is|role is) a remote position|remote role|work remotely|work from home|hybrid role|hybrid position)\b/i.test(intro) ||
    /(?:وظيفة|العمل|الدور).{0,25}(?:عن بُعد|عن بعد|هجين)/.test(intro);
}

function inferEntryLevel({ title, description, experience }) {
  const text = `${title || ""} ${description || ""} ${experience || ""}`;
  const freshGraduate = /fresh graduate|graduate program|graduate trainee|حديثي التخرج|حديث التخرج|برنامج خريجين/i.test(text) ||
    /(?:^|\D)0\s*[-–]\s*2\s*(?:years?|سنوات?)/i.test(text);
  const noExperience = /no experience required|no prior experience|0 years|بدون خبرة|لا تشترط الخبرة/i.test(text);
  return { freshGraduate, noExperience };
}

function extractDetail(html, source, url) {
  const visibleHtml = withoutScripts(html);
  const fullText = removeBoilerplate(stripHtml(visibleHtml));

  const title =
    stripHtml((visibleHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || ["", ""])[1]) ||
    visibleFieldFromHtml(visibleHtml, ["Job Title", "Title"]) ||
    clean(decodeBasicEntities((visibleHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || ["", ""])[1]))
      .replace(/\s*[-|]\s*(?:stc|kaust).*$/i, "");

  const cityRaw =
    visibleFieldFromHtml(visibleHtml, ["Location", "Primary Location", "مدينة الوظيفة", "الموقع"]) ||
    textAfterLabel(fullText, ["Location", "Primary Location", "مدينة الوظيفة", "الموقع"], 100);

  const qualification =
    sanitizeQualification(visibleFieldFromHtml(visibleHtml, ["Education", "Minimum Qualifications", "Qualifications", "المؤهل", "المؤهلات"], 500)) ||
    sanitizeQualification(extractSection(fullText, ["Minimum Qualifications", "Qualifications", "Education"], ["Experience requirement", "Years of Experience", "Experience", "Required Skills", "Preferred Skills", "Additional Education", "Certifications", "Apply now"], 500));

  const experience =
    sanitizeExperience(visibleFieldFromHtml(visibleHtml, ["Years of Experience", "Minimum Experience", "Experience", "الخبرة"], 450)) ||
    sanitizeExperience(extractSection(fullText, ["Years of Experience", "Minimum Experience", "Experience"], ["Nature of Experience", "Job Band", "Professional Skills", "Managerial Skills", "Skills", "Education", "Apply now"], 450));

  const published =
    visibleFieldFromHtml(visibleHtml, ["Date", "Posting Date", "Date Posted", "تاريخ النشر"], 80) ||
    textAfterLabel(fullText, ["Posting Date", "Date Posted", "Date", "تاريخ النشر"], 80);

  const description = extractDescription(visibleHtml);
  const city = normalizeCity(cityRaw);
  const workMode = visibleFieldFromHtml(visibleHtml, ["Work Mode", "Work Arrangement", "نوع العمل"], 80);
  const remote = explicitRemoteFlag({ title, city, workMode, description });
  const entry = inferEntryLevel({ title, description, experience });

  return {
    external_id: externalIdFromUrl(url),
    title: clean(title),
    company: source.company,
    sector: source.sector,
    city,
    region: null,
    work_mode: remote ? "عن بُعد" : null,
    qualification,
    specialization: null,
    experience,
    salary: null,
    published_at: parseDate(published),
    expires_at: null,
    summary: clean(description) || null,
    source_url: url,
    apply_url: url,
    remote: remote ? 1 : 0,
    fresh_graduate: entry.freshGraduate ? 1 : 0,
    no_experience: entry.noExperience ? 1 : 0
  };
}

function findApplyUrl(html, source, fallback) {
  const hrefRegex = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = hrefRegex.exec(String(html ?? "")))) {
    const url = absoluteUrl(match[1], fallback);
    try {
      const parsed = new URL(url);
      if (source.applyHosts?.includes(parsed.hostname)) return parsed.href;
    } catch {
      // Ignore invalid URL.
    }
  }

  const raw = String(html ?? "").match(/https:\/\/(?:jobs\.sang\.gov\.sa|jobs\.sa)[^\s"'<>]*/i)?.[0];
  return raw || fallback;
}

function extractMilitaryAnnouncement(html, source, url) {
  const text = removeBoilerplate(stripHtml(html));
  const title =
    stripHtml((String(html).match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || ["", ""])[1]) ||
    clean(decodeBasicEntities((String(html).match(/<title[^>]*>([\s\S]*?)<\/title>/i) || ["", ""])[1]));

  const focused = clean(`${title} ${text}`);
  const recruitmentPatterns = [
    /فتح\s+باب\s+(?:القبول|التسجيل)/i,
    /القبول\s+والتسجيل/i,
    /الراغبين\s+في\s+الالتحاق\s+بالخدمة\s+العسكرية/i,
    /الالتحاق\s+بالخدمة\s+العسكرية/i,
    /وظائف\s+عسكرية/i,
    /(?:التجنيد|تجنيد)\s*(?:-|–|—)?\s*(?:رجال|نساء)?/i
  ];

  const hasRecruitmentSignal = recruitmentPatterns.some((pattern) => pattern.test(focused));
  const hasApplicationSignal =
    /(?:رابط\s+التقديم|التقديم\s+(?:متاح|يبدأ|عبر)|التسجيل\s+(?:متاح|يبدأ|عبر)|jobs\.sang\.gov\.sa)/i.test(focused);

  // General ministry news must never become a military vacancy.
  if (!hasRecruitmentSignal || !hasApplicationSignal) return null;

  const summaryMatch = text.match(
    /(?:تعلن|أعلنت)[\s\S]{20,900}?(?=رابط\s+التقديم|للتقديم|التقديم\s+عبر|جميع\s+الحقوق|هل\s+كانت\s+هذه\s+الصفحة\s+مفيدة|$)/i
  );
  if (!summaryMatch) return null;

  const parsedPublishedAt = parseDmyDate(text);
  if (parsedPublishedAt && daysSince(parsedPublishedAt) > 35) return null;
  const publishedAt = parsedPublishedAt || nowIso().slice(0, 10);

  let expiresAt = null;
  const gregorianDeadline = text.match(/حتى\s+يوم[^\d]{0,80}(\d{1,2})\s*[\/-]\s*(\d{1,2})\s*[\/-]\s*(20\d{2})\s*م?/i);
  if (gregorianDeadline) {
    expiresAt = `${gregorianDeadline[3]}-${String(gregorianDeadline[2]).padStart(2, "0")}-${String(gregorianDeadline[1]).padStart(2, "0")}`;
  } else {
    expiresAt = addDays(publishedAt, 14);
  }

  if (expiresAt && new Date(`${expiresAt}T23:59:59Z`).getTime() < Date.now()) return null;

  const summary = removeBoilerplate(summaryMatch[0]).slice(0, 520);
  const parsedUrl = new URL(url);
  const pathMatch = parsedUrl.pathname.match(/\/MONGNews\/([^/]+)\/Pages\/([^/.]+)/i);
  const slug = pathMatch ? `${pathMatch[1]}-${pathMatch[2]}` : parsedUrl.pathname.split("/").filter(Boolean).pop()?.replace(/\.aspx$/i, "") || "announcement";

  return {
    external_id: slug,
    title: clean(title) || "فتح باب القبول والتسجيل للخدمة العسكرية",
    company: source.company,
    sector: "عسكري",
    city: /مختلف مناطق المملكة|جميع مناطق المملكة/.test(text) ? "مختلف مناطق المملكة" : null,
    region: null,
    work_mode: "حضوري",
    qualification: null,
    specialization: "قبول عسكري",
    experience: null,
    salary: null,
    published_at: publishedAt,
    expires_at: expiresAt,
    summary,
    source_url: url,
    apply_url: findApplyUrl(html, source, source.applyUrl || "https://jobs.sang.gov.sa/"),
    remote: 0,
    fresh_graduate: 0,
    no_experience: 0
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; MasaaJobsBot/2.2; +https://mas3a.pages.dev)",
      Accept: "text/html,application/xhtml+xml"
    },
    redirect: "follow"
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  return response.text();
}

const TITLE_TRANSLATIONS = new Map([
  ["Events Coordinator", "منسق فعاليات"],
  ["Energy Transition Educational Initiatives Lead", "قائد مبادرات التعليم في تحول الطاقة"],
  ["Senior HPC Systems Administrator", "مسؤول أول أنظمة الحوسبة عالية الأداء (HPC)"],
  ["Operational Authorities Analyst", "محلل الصلاحيات التشغيلية"],
  ["Research User Computing Linux Specialist", "أخصائي لينكس لحوسبة المستخدمين البحثية"],
  ["Business Manager", "مدير أعمال"],
  ["Technology Support Lead", "قائد دعم التقنية"],
  ["Digital Audit Operations Analyst", "محلل عمليات التدقيق الرقمي"],
  ["Technology Internal Auditor", "مدقق داخلي للتقنية"],
  ["HR Analytics Analyst", "محلل تحليلات الموارد البشرية"],
  ["Lead Integration Architect", "مهندس معماري أول للتكامل"],
  ["Software Engineer", "مهندس برمجيات"],
  ["Research Scientist", "باحث علمي"],
  ["Security Specialist", "أخصائي أمن"],
  ["Network Engineer", "مهندس شبكات"]
]);

function normalizedEnglishTitle(value) {
  return clean(value)
    .replace(/\s*[-–—]\s*\d{6,}\s*$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function professionalTitleArabic(value) {
  const title = normalizedEnglishTitle(value);
  return TITLE_TRANSLATIONS.get(title) || null;
}

function cleanLocalizedText(value, maxLength) {
  return clean(value)
    .replace(/^["'«»]+|["'«»]+$/g, "")
    .replace(/^(?:الترجمة|العربية|النص المترجم)\s*[:：-]\s*/i, "")
    .slice(0, maxLength) || null;
}

function usableArabic(value, kind = "text") {
  const text = clean(value);
  if (!text || !isArabic(text)) return false;
  if (/كوكيز|ملفات تعريف الارتباط|تفضيلات الخصوصية|سياسة الكوكيز/i.test(text)) return false;
  if (kind === "title" && text.length > 120) return false;
  return true;
}

async function translateFallback(env, value, maxLength = 900) {
  const text = clean(value).slice(0, maxLength);
  if (!text || isArabic(text) || !env.AI) return text || null;

  try {
    const response = await env.AI.run("@cf/meta/m2m100-1.2b", {
      text,
      source_lang: "en",
      target_lang: "ar"
    });

    const translated = cleanLocalizedText(
      response?.translated_text ||
      response?.translation ||
      response?.result?.translated_text ||
      response?.translations?.[0]?.translated_text ||
      response?.translations?.[0]?.text ||
      "",
      maxLength
    );

    return usableArabic(translated) ? translated : text;
  } catch {
    return text;
  }
}

async function localizeFieldsWithAI(env, job) {
  if (!env.AI) return null;

  const payload = {
    title: normalizedEnglishTitle(job.title),
    summary: clean(removeBoilerplate(job.summary)).slice(0, 650) || null,
    experience: sanitizeExperience(job.experience),
    qualification: sanitizeQualification(job.qualification)
  };

  try {
    const prompt = `أنت محرر وظائف سعودي. ترجم البيانات الإنجليزية التالية إلى عربية مهنية طبيعية وواضحة فقط. لا تضف أي معلومة غير موجودة. حافظ على الاختصارات التقنية مثل HPC وLinux وAI وGPU كما هي. احذف أي نص خاص بالكوكيز أو التنقل أو أزرار الموقع. أعد JSON فقط بالمفاتيح title وsummary وexperience وqualification، والقيمة null إذا كان الحقل فارغًا.\n\n${JSON.stringify(payload)}`;
    const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", {
      prompt,
      temperature: 0.1,
      max_tokens: 700
    });

    const raw = clean(
      response?.response ||
      response?.result?.response ||
      response?.result ||
      response?.output_text ||
      ""
    );
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      title: cleanLocalizedText(parsed?.title, 180),
      summary: cleanLocalizedText(parsed?.summary, 650),
      experience: cleanLocalizedText(parsed?.experience, 300),
      qualification: cleanLocalizedText(parsed?.qualification, 400)
    };
  } catch {
    return null;
  }
}

async function localizeJob(env, source, job) {
  const companyMap = {
    "King Abdullah University of Science & Technology": "جامعة الملك عبدالله للعلوم والتقنية",
    "King Abdullah University of Science and Technology": "جامعة الملك عبدالله للعلوم والتقنية",
    "Saudi Telecom Company": "stc"
  };

  const localized = { ...job };
  localized.company = source.companyAr || companyMap[job.company] || job.company;
  localized.city = normalizeCity(job.city);

  if (job.sector === "عسكري") return localized;

  const exactTitle = professionalTitleArabic(job.title);
  const ai = await localizeFieldsWithAI(env, job);

  localized.title =
    exactTitle ||
    (usableArabic(ai?.title, "title") ? ai.title : null) ||
    await translateFallback(env, normalizedEnglishTitle(job.title), 180) ||
    job.title;

  localized.summary =
    (usableArabic(ai?.summary) ? ai.summary : null) ||
    await translateFallback(env, removeBoilerplate(job.summary), 650) ||
    job.summary;

  localized.experience =
    (usableArabic(ai?.experience) ? ai.experience : null) ||
    await translateFallback(env, sanitizeExperience(job.experience), 300) ||
    sanitizeExperience(job.experience);

  localized.qualification =
    (usableArabic(ai?.qualification) ? ai.qualification : null) ||
    await translateFallback(env, sanitizeQualification(job.qualification), 400) ||
    sanitizeQualification(job.qualification);

  return localized;
}

async function upsertSource(env, source, patch = {}, sourceType = "successfactors") {
  const timestamp = nowIso();

  await env.DB.prepare(
    `
      INSERT INTO sources (
        source_key, name, url, source_type, sector, enabled, supported,
        last_checked_at, last_success_at, jobs_seen, new_jobs,
        error_count, last_error, status
      )
      VALUES (?, ?, ?, ?, ?, 1, 1, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(source_key) DO UPDATE SET
        name = excluded.name,
        url = excluded.url,
        source_type = excluded.source_type,
        sector = excluded.sector,
        enabled = 1,
        supported = 1,
        last_checked_at = excluded.last_checked_at,
        last_success_at = CASE WHEN excluded.last_success_at IS NULL THEN sources.last_success_at ELSE excluded.last_success_at END,
        jobs_seen = excluded.jobs_seen,
        new_jobs = excluded.new_jobs,
        error_count = excluded.error_count,
        last_error = excluded.last_error,
        status = excluded.status
    `
  )
    .bind(
      source.key,
      source.name,
      source.listingUrls[0],
      sourceType,
      source.sector,
      timestamp,
      patch.success ? timestamp : null,
      patch.jobsSeen ?? 0,
      patch.newJobs ?? 0,
      patch.error ? 1 : 0,
      patch.error || null,
      patch.status || (patch.success ? "ok" : "error")
    )
    .run();
}

async function ensureCatalogSources(env) {
  for (const source of SOURCE_CATALOG) {
    await env.DB.prepare(
      `
        INSERT INTO sources (
          source_key, name, url, source_type, sector, enabled, supported,
          jobs_seen, new_jobs, error_count, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?)
        ON CONFLICT(source_key) DO UPDATE SET
          name = excluded.name,
          url = excluded.url,
          source_type = excluded.source_type,
          sector = excluded.sector,
          enabled = excluded.enabled,
          supported = excluded.supported,
          status = CASE WHEN sources.supported = 1 THEN sources.status ELSE excluded.status END
      `
    )
      .bind(
        source.key,
        source.name,
        source.url,
        source.source_type,
        source.sector,
        source.enabled,
        source.supported,
        source.status
      )
      .run();
  }
}

async function dedupeExistingJobs(env) {
  try {
    await env.DB.prepare(
      `
        DELETE FROM jobs
        WHERE id IN (
          SELECT id FROM (
            SELECT
              id,
              ROW_NUMBER() OVER (
                PARTITION BY source_key, external_id
                ORDER BY
                  CASE WHEN status = 'verified' THEN 0 ELSE 1 END,
                  COALESCE(updated_at, discovered_at) DESC
              ) AS rn
            FROM jobs
            WHERE external_id IS NOT NULL AND external_id <> ''
          )
          WHERE rn > 1
        )
      `
    ).run();
  } catch {
    // Older SQLite runtimes may not support the window expression; syncing still works.
  }
}

async function saveJob(env, source, rawJob) {
  if (!rawJob.title || !rawJob.apply_url) {
    return { added: false, updated: false };
  }

  const stableKey = rawJob.external_id || rawJob.apply_url;
  const fingerprint = await sha256(`${source.key}|${stableKey}`);
  const rawHash = await sha256(
    `${LOCALIZATION_VERSION}|${JSON.stringify({
      title: rawJob.title,
      company: rawJob.company,
      city: rawJob.city,
      work_mode: rawJob.work_mode,
      qualification: rawJob.qualification,
      experience: rawJob.experience,
      summary: rawJob.summary,
      published_at: rawJob.published_at,
      expires_at: rawJob.expires_at,
      apply_url: rawJob.apply_url
    })}`
  );

  let existing = null;
  if (rawJob.external_id) {
    existing = await env.DB.prepare(
      `
        SELECT id, raw_hash, fingerprint
        FROM jobs
        WHERE source_key = ? AND external_id = ?
        ORDER BY COALESCE(updated_at, discovered_at) DESC
        LIMIT 1
      `
    )
      .bind(source.key, rawJob.external_id)
      .first();
  }

  if (!existing) {
    existing = await env.DB.prepare(
      `SELECT id, raw_hash, fingerprint FROM jobs WHERE source_key = ? AND apply_url = ? LIMIT 1`
    )
      .bind(source.key, rawJob.apply_url)
      .first();
  }

  const timestamp = nowIso();

  if (existing && existing.raw_hash === rawHash) {
    await env.DB.prepare(
      `UPDATE jobs SET last_checked_at = ?, status = 'verified', fingerprint = ?, updated_at = ? WHERE id = ?`
    )
      .bind(timestamp, fingerprint, timestamp, existing.id)
      .run();

    return { added: false, updated: false };
  }

  const job = await localizeJob(env, source, rawJob);

  if (!existing) {
    const id = rawJob.external_id ? `${source.key}-${rawJob.external_id}` : crypto.randomUUID();

    await env.DB.prepare(
      `
        INSERT INTO jobs (
          id, source_key, external_id, fingerprint, title, company, sector,
          city, region, work_mode, qualification, specialization, experience,
          salary, published_at, expires_at, summary, source_url, apply_url,
          remote, fresh_graduate, no_experience, discovered_at,
          last_checked_at, status, raw_hash, updated_at
        )
        VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, 'verified', ?, ?
        )
      `
    )
      .bind(
        id,
        source.key,
        job.external_id,
        fingerprint,
        job.title,
        job.company,
        job.sector,
        job.city,
        job.region,
        job.work_mode,
        job.qualification,
        job.specialization,
        job.experience,
        job.salary,
        job.published_at,
        job.expires_at,
        job.summary,
        job.source_url,
        job.apply_url,
        job.remote,
        job.fresh_graduate,
        job.no_experience,
        timestamp,
        timestamp,
        rawHash,
        timestamp
      )
      .run();

    return { added: true, updated: false };
  }

  await env.DB.prepare(
    `
      UPDATE jobs SET
        external_id = ?,
        fingerprint = ?,
        title = ?,
        company = ?,
        sector = ?,
        city = ?,
        region = ?,
        work_mode = ?,
        qualification = ?,
        specialization = ?,
        experience = ?,
        salary = ?,
        published_at = ?,
        expires_at = ?,
        summary = ?,
        source_url = ?,
        apply_url = ?,
        remote = ?,
        fresh_graduate = ?,
        no_experience = ?,
        last_checked_at = ?,
        status = 'verified',
        raw_hash = ?,
        updated_at = ?
      WHERE id = ?
    `
  )
    .bind(
      job.external_id,
      fingerprint,
      job.title,
      job.company,
      job.sector,
      job.city,
      job.region,
      job.work_mode,
      job.qualification,
      job.specialization,
      job.experience,
      job.salary,
      job.published_at,
      job.expires_at,
      job.summary,
      job.source_url,
      job.apply_url,
      job.remote,
      job.fresh_graduate,
      job.no_experience,
      timestamp,
      rawHash,
      timestamp,
      existing.id
    )
    .run();

  return { added: false, updated: true };
}

async function archiveMissingJobs(env, sourceKey, seenExternalIds) {
  if (!seenExternalIds.length) {
    await env.DB.prepare(
      `UPDATE jobs SET status = 'expired', updated_at = ? WHERE source_key = ? AND status = 'verified'`
    )
      .bind(nowIso(), sourceKey)
      .run();
    return;
  }

  const placeholders = seenExternalIds.map(() => "?").join(",");
  await env.DB.prepare(
    `
      UPDATE jobs
      SET status = 'expired', updated_at = ?
      WHERE source_key = ?
        AND status = 'verified'
        AND external_id IS NOT NULL
        AND external_id NOT IN (${placeholders})
    `
  )
    .bind(nowIso(), sourceKey, ...seenExternalIds)
    .run();
}

async function syncSuccessFactorsSource(env, source) {
  const urls = new Set();
  let listingWorked = false;
  let explicitNoJobs = false;
  const errors = [];

  for (const listingUrl of source.listingUrls) {
    try {
      const html = await fetchText(listingUrl);
      listingWorked = true;

      if (pageExplicitlyHasNoJobs(html)) explicitNoJobs = true;
      for (const url of discoverJobUrls(html, source, listingUrl)) urls.add(url);
    } catch (error) {
      errors.push(clean(error?.message || error));
    }
  }

  if (!listingWorked) {
    const message = errors.join(" | ") || "Could not fetch any listing page";
    await upsertSource(env, source, { success: false, error: message, status: "error" });
    return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: 1, error: message };
  }

  if (urls.size === 0 && !explicitNoJobs) {
    const message = "Listing pages loaded but no job URLs were discovered; parser may need review.";
    await upsertSource(env, source, { success: false, error: message, status: "needs_review" });
    return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: 1, error: message };
  }

  let added = 0;
  let updated = 0;
  let detailErrors = 0;
  const seenExternalIds = [];

  for (const url of [...urls].slice(0, 100)) {
    try {
      const html = await fetchText(url);
      const job = extractDetail(html, source, url);
      if (job.external_id) seenExternalIds.push(job.external_id);
      const result = await saveJob(env, source, job);
      if (result.added) added += 1;
      if (result.updated) updated += 1;
    } catch {
      detailErrors += 1;
    }
  }

  if (detailErrors === 0) {
    await archiveMissingJobs(env, source.key, seenExternalIds);
  }

  await upsertSource(env, source, {
    success: detailErrors === 0,
    jobsSeen: urls.size,
    newJobs: added,
    error: detailErrors > 0 ? `${detailErrors} job detail page(s) failed` : null,
    status: detailErrors > 0 ? "partial" : "ok"
  });

  return { source: source.key, jobsSeen: urls.size, added, updated, errors: detailErrors };
}

async function syncMilitaryNewsSource(env, source) {
  const articleUrls = new Set();
  let listingWorked = false;
  const errors = [];

  for (const listingUrl of source.listingUrls) {
    try {
      const html = await fetchText(listingUrl);
      listingWorked = true;
      for (const url of discoverArticleUrls(html, source, listingUrl)) articleUrls.add(url);
    } catch (error) {
      errors.push(clean(error?.message || error));
    }
  }

  if (!listingWorked) {
    const message = errors.join(" | ") || "Could not fetch military announcements";
    await upsertSource(env, source, { success: false, error: message, status: "error" }, "official_news");
    return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: 1, error: message };
  }

  let added = 0;
  let updated = 0;
  let detailErrors = 0;
  const seenExternalIds = [];

  await env.DB.prepare(
    `UPDATE jobs SET status = 'expired', updated_at = ? WHERE source_key = ? AND status = 'verified'`
  )
    .bind(nowIso(), source.key)
    .run();

  for (const url of [...articleUrls].slice(0, 30)) {
    try {
      const html = await fetchText(url);
      const job = extractMilitaryAnnouncement(html, source, url);
      if (!job) continue;
      seenExternalIds.push(job.external_id);
      const result = await saveJob(env, source, job);
      if (result.added) added += 1;
      if (result.updated) updated += 1;
    } catch {
      detailErrors += 1;
    }
  }

  await upsertSource(env, source, {
    success: detailErrors === 0,
    jobsSeen: seenExternalIds.length,
    newJobs: added,
    error: detailErrors > 0 ? `${detailErrors} military announcement page(s) failed` : null,
    status: detailErrors > 0 ? "partial" : "ok"
  }, "official_news");

  return {
    source: source.key,
    jobsSeen: seenExternalIds.length,
    added,
    updated,
    errors: detailErrors
  };
}

async function runSync(env) {
  const startedAt = nowIso();
  await ensureCatalogSources(env);
  await dedupeExistingJobs(env);

  const insert = await env.DB.prepare(
    `
      INSERT INTO sync_runs (
        started_at, sources_checked, jobs_seen,
        jobs_added, jobs_updated, errors
      )
      VALUES (?, 0, 0, 0, 0, 0)
    `
  )
    .bind(startedAt)
    .run();

  const runId = insert.meta?.last_row_id;
  let sourcesChecked = 0;
  let jobsSeen = 0;
  let jobsAdded = 0;
  let jobsUpdated = 0;
  let errors = 0;
  const results = [];

  for (const source of SUCCESSFACTORS_SOURCES) {
    const result = await syncSuccessFactorsSource(env, source);
    sourcesChecked += 1;
    jobsSeen += result.jobsSeen || 0;
    jobsAdded += result.added || 0;
    jobsUpdated += result.updated || 0;
    errors += result.errors || 0;
    results.push(result);
  }

  for (const source of MILITARY_NEWS_SOURCES) {
    const result = await syncMilitaryNewsSource(env, source);
    sourcesChecked += 1;
    jobsSeen += result.jobsSeen || 0;
    jobsAdded += result.added || 0;
    jobsUpdated += result.updated || 0;
    errors += result.errors || 0;
    results.push(result);
  }

  await dedupeExistingJobs(env);
  const finishedAt = nowIso();

  if (runId) {
    await env.DB.prepare(
      `
        UPDATE sync_runs SET
          finished_at = ?,
          sources_checked = ?,
          jobs_seen = ?,
          jobs_added = ?,
          jobs_updated = ?,
          errors = ?
        WHERE id = ?
      `
    )
      .bind(finishedAt, sourcesChecked, jobsSeen, jobsAdded, jobsUpdated, errors, runId)
      .run();
  }

  return {
    ok: errors === 0,
    started_at: startedAt,
    finished_at: finishedAt,
    sources_checked: sourcesChecked,
    jobs_seen: jobsSeen,
    jobs_added: jobsAdded,
    jobs_updated: jobsUpdated,
    errors,
    results
  };
}

function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.CORS_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}

function json(data, env, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(env)
    }
  });
}

function parseBoolean(value) {
  if (value === null || value === undefined || value === "") return null;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

async function listJobs(request, env) {
  const url = new URL(request.url);
  const q = clean(url.searchParams.get("q"));
  const city = clean(url.searchParams.get("city"));
  const sector = clean(url.searchParams.get("sector"));
  const source = clean(url.searchParams.get("source"));
  const remote = parseBoolean(url.searchParams.get("remote"));
  const freshGraduate = parseBoolean(url.searchParams.get("fresh_graduate"));
  const noExperience = parseBoolean(url.searchParams.get("no_experience"));
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit")) || 50, 1), 100);
  const offset = Math.max(Number(url.searchParams.get("offset")) || 0, 0);

  const where = ["status = 'verified'"];
  const values = [];

  if (q) {
    where.push(`(title LIKE ? OR company LIKE ? OR summary LIKE ? OR city LIKE ?)`);
    const term = `%${q}%`;
    values.push(term, term, term, term);
  }

  if (city) {
    where.push("city LIKE ?");
    values.push(`%${city}%`);
  }

  if (sector) {
    where.push("sector = ?");
    values.push(sector);
  }

  if (source) {
    where.push("source_key = ?");
    values.push(source);
  }

  if (remote !== null) {
    where.push("remote = ?");
    values.push(remote ? 1 : 0);
  }

  if (freshGraduate !== null) {
    where.push("fresh_graduate = ?");
    values.push(freshGraduate ? 1 : 0);
  }

  if (noExperience !== null) {
    where.push("no_experience = ?");
    values.push(noExperience ? 1 : 0);
  }

  const sql = `
    SELECT
      id, source_key, external_id, title, company, sector,
      city, region, work_mode, qualification, specialization,
      experience, salary, published_at, expires_at, summary,
      source_url, apply_url, remote, fresh_graduate,
      no_experience, discovered_at, updated_at
    FROM jobs
    WHERE ${where.join(" AND ")}
    ORDER BY
      CASE WHEN published_at IS NULL THEN 1 ELSE 0 END,
      published_at DESC,
      discovered_at DESC
    LIMIT ? OFFSET ?
  `;

  const result = await env.DB.prepare(sql)
    .bind(...values, limit, offset)
    .all();

  return {
    ok: true,
    count: result.results?.length || 0,
    limit,
    offset,
    jobs: result.results || []
  };
}

async function listSources(env) {
  await ensureCatalogSources(env);
  const result = await env.DB.prepare(
    `
      SELECT
        source_key, name, url, source_type, sector,
        enabled, supported, last_checked_at, last_success_at,
        jobs_seen, new_jobs, error_count, last_error, status
      FROM sources
      ORDER BY supported DESC, sector ASC, name ASC
    `
  ).all();

  return { ok: true, sources: result.results || [] };
}

async function stats(env) {
  const jobs = await env.DB.prepare(
    `
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN remote = 1 THEN 1 ELSE 0 END) AS remote,
        SUM(CASE WHEN fresh_graduate = 1 THEN 1 ELSE 0 END) AS fresh_graduate,
        SUM(CASE WHEN no_experience = 1 THEN 1 ELSE 0 END) AS no_experience,
        SUM(CASE WHEN sector = 'حكومي' THEN 1 ELSE 0 END) AS government,
        SUM(CASE WHEN sector = 'عسكري' THEN 1 ELSE 0 END) AS military,
        SUM(CASE WHEN sector = 'خاص' THEN 1 ELSE 0 END) AS private
      FROM jobs
      WHERE status = 'verified'
    `
  ).first();

  const sources = await env.DB.prepare(
    `
      SELECT
        SUM(CASE WHEN supported = 1 THEN 1 ELSE 0 END) AS total,
        SUM(CASE WHEN supported = 1 AND status = 'ok' THEN 1 ELSE 0 END) AS healthy,
        SUM(CASE WHEN supported = 0 THEN 1 ELSE 0 END) AS portals
      FROM sources
    `
  ).first();

  const lastRun = await env.DB.prepare(
    `SELECT * FROM sync_runs ORDER BY id DESC LIMIT 1`
  ).first();

  return { ok: true, jobs: jobs || {}, sources: sources || {}, last_sync: lastRun || null };
}

async function handleRequest(request, env) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(env) });
  }

  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";

  if (request.method === "GET" && path === "/") {
    return json({
      ok: true,
      service: "Masaa Jobs API",
      version: VERSION,
      language: "ar",
      endpoints: ["GET /health", "GET /jobs", "GET /sources", "GET /stats", "POST /sync"]
    }, env);
  }

  if (request.method === "GET" && path === "/health") {
    return json({ ok: true, service: "Masaa Jobs API", version: VERSION, time: nowIso() }, env);
  }

  if (request.method === "GET" && path === "/jobs") {
    try {
      return json(await listJobs(request, env), env);
    } catch (error) {
      return json({ ok: false, error: clean(error?.message || error) }, env, 500);
    }
  }

  if (request.method === "GET" && path === "/sources") {
    try {
      return json(await listSources(env), env);
    } catch (error) {
      return json({ ok: false, error: clean(error?.message || error) }, env, 500);
    }
  }

  if (request.method === "GET" && path === "/stats") {
    try {
      return json(await stats(env), env);
    } catch (error) {
      return json({ ok: false, error: clean(error?.message || error) }, env, 500);
    }
  }

  if (request.method === "POST" && path === "/sync") {
    try {
      const result = await runSync(env);
      return json(result, env, result.ok ? 200 : 207);
    } catch (error) {
      return json({ ok: false, error: clean(error?.message || error) }, env, 500);
    }
  }

  return json({ ok: false, error: "Not found" }, env, 404);
}

export default {
  async fetch(request, env) {
    return handleRequest(request, env);
  },

  async scheduled(_controller, env, ctx) {
    ctx.waitUntil(runSync(env));
  }
};
