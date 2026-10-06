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
  },
  {
    key: "saudia",
    name: "Saudia Group Careers",
    company: "Saudia Group",
    companyAr: "مجموعة السعودية",
    sector: "خاص",
    host: "careers.saudia.com",
    listingUrls: [
      "https://careers.saudia.com/viewalljobs/?locale=ar_SA",
      "https://careers.saudia.com/viewalljobs/?locale=en_US"
    ]
  },
  {
    key: "aramco",
    name: "Saudi Aramco Careers",
    company: "Saudi Aramco",
    companyAr: "أرامكو السعودية",
    sector: "خاص",
    host: "careers.aramco.com",
    listingUrls: [
      "https://careers.aramco.com/saudi/go/For-Saudi-Applicants/7717723/?q=&sortColumn=referencedate&sortDirection=desc"
    ]
  },
  {
    key: "acwa-power",
    name: "ACWA Power Careers",
    company: "ACWA Power",
    companyAr: "أكوا باور",
    sector: "خاص",
    host: "careers.acwapower.com",
    listingUrls: [
      "https://careers.acwapower.com/viewalljobs/",
      "https://careers.acwapower.com/viewalljobs/?q=&sortColumn=referencedate&sortDirection=desc",
      "https://careers.acwapower.com/viewalljobs/?locale=en_US"
    ]
  },
  {
    key: "spimaco",
    name: "SPIMACO Careers",
    company: "SPIMACO",
    companyAr: "سبيماكو الدوائية",
    sector: "خاص",
    host: "careers.spimaco.com.sa",
    listingUrls: [
      "https://careers.spimaco.com.sa/viewalljobs/",
      "https://careers.spimaco.com.sa/go/Operationes/7741123/",
      "https://careers.spimaco.com.sa/viewalljobs/?q=&sortColumn=referencedate&sortDirection=desc",
      "https://careers.spimaco.com.sa/viewalljobs/?locale=en_US"
    ]
  },
  {
    key: "sab",
    name: "Saudi Awwal Bank Careers",
    company: "Saudi Awwal Bank",
    companyAr: "البنك السعودي الأول",
    sector: "خاص",
    host: "careers.sab.com",
    listingUrls: [
      "https://careers.sab.com/viewalljobs/",
      "https://careers.sab.com/go/Search-Jobs/3641501/",
      "https://careers.sab.com/viewalljobs/?q=&sortColumn=referencedate&sortDirection=desc",
      "https://careers.sab.com/viewalljobs/?locale=en_US"
    ]
  },
  {
    key: "jhah",
    name: "Johns Hopkins Aramco Healthcare Careers",
    company: "Johns Hopkins Aramco Healthcare",
    companyAr: "جونز هوبكنز أرامكو للرعاية الصحية",
    sector: "خاص",
    host: "careers.jhah.com",
    listingUrls: [
      "https://careers.jhah.com/viewalljobs/",
      "https://careers.jhah.com/go/Nursing-Jobs/4382823/",
      "https://careers.jhah.com/go/Physician-Jobs/4382923/",
      "https://careers.jhah.com/go/Corporate-Jobs/4383023/",
      "https://careers.jhah.com/go/Hot-Jobs/4383223/",
      "https://careers.jhah.com/viewalljobs/?q=&sortColumn=referencedate&sortDirection=desc"
    ]
  },
  {
    key: "sipchem",
    name: "SIPCHEM Careers",
    company: "SIPCHEM",
    companyAr: "سبكيم",
    sector: "خاص",
    host: "career.sipchem.com",
    listingUrls: [
      "https://career.sipchem.com/viewalljobs/?q=&sortColumn=referencedate&sortDirection=desc"
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
    keywords: ["القبول والتسجيل", "الخدمة العسكرية", "تجنيد", "وظائف عسكرية", "رتبة", "الالتحاق بالخدمة العسكرية"]
  }
];

const SOURCE_CATALOG = [
  {
    key: "jadarat",
    name: "جدارات",
    url: "https://jadarat.sa/",
    source_type: "official_portal_monitor",
    sector: "حكومي",
    enabled: 1,
    supported: 1,
    status: "monitor_only"
  },
  {
    key: "absher-military",
    name: "أبشر توظيف",
    url: "https://jobs.sa/",
    source_type: "official_portal_monitor",
    sector: "عسكري",
    enabled: 1,
    supported: 1,
    status: "monitor_only"
  },
  {
    key: "mod-tajnid",
    name: "التجنيد الموحد - وزارة الدفاع",
    url: "https://tajnid.mod.gov.sa/",
    source_type: "official_portal_monitor",
    sector: "عسكري",
    enabled: 1,
    supported: 1,
    status: "monitor_only"
  },
  {
    key: "sang-jobs",
    name: "بوابة توظيف الحرس الوطني",
    url: "https://jobs.sang.gov.sa/",
    source_type: "official_portal_monitor",
    sector: "عسكري",
    enabled: 1,
    supported: 1,
    status: "monitor_only"
  },
  {
    key: "moh-jobs",
    name: "وزارة الصحة - التوظيف",
    url: "https://www.moh.gov.sa/ministry/about/pages/work-for-us.aspx",
    source_type: "official_listing",
    sector: "حكومي",
    enabled: 1,
    supported: 1,
    status: "monitor_only"
  }

];

// البوابات التالية قد تكون تطبيقات مغلقة/تفاعلية أو محمية، لذلك يراقبها
// مَسعى تلقائيًا بدون اختلاق وظائف غير قابلة للتحقق. عند توفر إعلان علني
// قابل للاستخراج يضاف له Adapter مستقل بدل الاعتماد على التخمين.
const PORTAL_MONITOR_SOURCES = SOURCE_CATALOG.filter((source) =>
  ["jadarat", "absher-military", "mod-tajnid", "sang-jobs"].includes(source.key)
);

const OFFICIAL_LISTING_SOURCES = [
  {
    key: "moh-jobs",
    name: "وزارة الصحة - اعمل معنا",
    company: "وزارة الصحة",
    companyAr: "وزارة الصحة",
    sector: "حكومي",
    url: "https://www.moh.gov.sa/ministry/about/pages/work-for-us.aspx",
    listingUrls: ["https://www.moh.gov.sa/ministry/about/pages/work-for-us.aspx"],
    parser: "moh-current",
    sourceType: "official_listing"
  }
];

const VERSION = "3.2.1";
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

function officialHostsForSource(source) {
  const hosts = new Set([source.host, ...(source.applyHosts || [])].filter(Boolean).map((h) => String(h).toLowerCase()));
  for (const candidate of [...(source.listingUrls || []), source.url].filter(Boolean)) {
    try { hosts.add(new URL(candidate).hostname.toLowerCase()); } catch {}
  }
  return hosts;
}

function isAllowedOfficialUrl(value, source) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    const host = url.hostname.toLowerCase();
    return [...officialHostsForSource(source)].some((allowed) => host === allowed || host.endsWith("." + allowed));
  } catch {
    return false;
  }
}

function stableTextId(prefix, value) {
  const normalized = normalizeDigits(clean(value)).toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
  return normalized ? `${prefix}-${normalized}` : null;
}

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
  const text = String(url ?? "");
  const pathMatch = text.match(/\/(\d{4,})\/?(?:[?#]|$)/);
  if (pathMatch?.[1]) return pathMatch[1];
  try {
    const parsed = new URL(text);
    for (const key of ["jobId", "jobid", "job", "id", "reqId", "requisitionId"]) {
      const value = parsed.searchParams.get(key);
      if (/^\d{4,}$/.test(value || "")) return value;
    }
  } catch {}
  return null;
}

function normalizeDigits(value) {
  const arabic = "٠١٢٣٤٥٦٧٨٩";
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  return String(value ?? "")
    .replace(/[٠-٩]/g, (d) => String(arabic.indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String(persian.indexOf(d)));
}

function parseDate(value) {
  const text = clean(normalizeDigits(value)).replace(/[\u200e\u200f\u202a-\u202e]/g, "");
  if (!text) return null;

  const dmy = text.match(/\b(\d{1,2})[\/-](\d{1,2})[\/-](20\d{2})\b/);
  if (dmy) {
    const iso = `${dmy[3]}-${String(dmy[2]).padStart(2, "0")}-${String(dmy[1]).padStart(2, "0")}`;
    const date = new Date(`${iso}T12:00:00Z`);
    if (!Number.isNaN(date.getTime())) return iso;
  }

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
      if (!isAllowedOfficialUrl(parsed.href, source)) return;
      const looksLikeJob = /\/job(?:\/|s\/)/i.test(parsed.pathname) ||
        /(?:jobId|jobid|reqId|requisitionId)=\d{4,}/i.test(parsed.search);
      if (!looksLikeJob || !externalIdFromUrl(parsed.href)) return;
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
    /((?:https?:\/\/[^"'<>\\\s]+)?\/job\/[^"'<>\\\s?#]+\/\d{4,}\/?)/gi;

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
    "no job categories currently exist",
    "0 jobs search results",
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
  );
}

function extractSection(text, startMarkers, stopMarkers, maxLength = 900) {
  const source = String(text ?? "");
  const lower = source.toLowerCase();
  let start = -1;
  let markerLength = 0;

  for (const marker of startMarkers) {
    const idx = lower.indexOf(marker.toLowerCase());
    if (idx >= 0 && (start < 0 || idx < start)) {
      start = idx;
      markerLength = marker.length;
    }
  }

  if (start < 0) return "";
  let end = source.length;
  const from = start + markerLength;
  for (const marker of stopMarkers) {
    const idx = lower.indexOf(marker.toLowerCase(), from);
    if (idx >= 0 && idx < end) end = idx;
  }

  return removeBoilerplate(source.slice(from, end)).slice(0, maxLength);
}

function extractDescription(html) {
  const text = stripHtml(html);
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
  const fullText = stripHtml(visibleHtml);

  const title =
    stripHtml((visibleHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || ["", ""])[1]) ||
    visibleFieldFromHtml(visibleHtml, ["Job Title", "Title"]) ||
    clean(decodeBasicEntities((visibleHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || ["", ""])[1]))
      .replace(/\s*[-|]\s*(?:stc|kaust|saudia|aramco|acwa\s*power|spimaco|saudi\s*awwal\s*bank|jhah|johns\s*hopkins|sipchem).*$/i, "");

  const cityRaw =
    visibleFieldFromHtml(visibleHtml, ["Location", "Primary Location", "مدينة الوظيفة", "الموقع"]) ||
    textAfterLabel(fullText, ["Location", "Primary Location", "مدينة الوظيفة", "الموقع"], 100);

  const qualification =
    visibleFieldFromHtml(visibleHtml, ["Education", "Qualifications", "Minimum Qualifications", "المؤهل", "المؤهلات"], 500) ||
    extractSection(fullText, ["Qualifications", "Education", "Minimum Qualifications"], ["Experience", "Required Skills", "Preferred Skills", "Apply now"], 500);

  const experience =
    visibleFieldFromHtml(visibleHtml, ["Years of Experience", "Experience", "Minimum Experience", "الخبرة"], 450) ||
    extractSection(fullText, ["Years of Experience", "Minimum Experience", "Experience"], ["Nature of Experience", "Job Band", "Skills", "Education", "Apply now"], 450);

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
    qualification: clean(qualification) || null,
    specialization: null,
    experience: clean(experience) || null,
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
  const text = stripHtml(html);
  const lower = text.toLowerCase();
  if (!source.keywords.some((keyword) => lower.includes(keyword.toLowerCase()))) return null;

  const title =
    stripHtml((String(html).match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || ["", ""])[1]) ||
    clean(decodeBasicEntities((String(html).match(/<title[^>]*>([\s\S]*?)<\/title>/i) || ["", ""])[1]));

  // Some official military announcements publish Hijri dates only.
  // We only inspect links currently surfaced by the official news listing, so when
  // no Gregorian date is present we use first discovery time instead of guessing a
  // Hijri conversion. This prevents old archive pages from being presented as live.
  const parsedPublishedAt = parseDmyDate(text);
  if (parsedPublishedAt && daysSince(parsedPublishedAt) > 35) return null;
  // لا نخمن تاريخ نشر ميلادي عندما يحتوي الإعلان على هجري فقط.
  // discovered_at في قاعدة البيانات يبقى المرجع الثابت لأول اكتشاف.
  const publishedAt = parsedPublishedAt || null;

  let expiresAt = null;
  const gregorianDeadline = text.match(/حتى\s+يوم[^\d]{0,80}(\d{1,2})\s*[\/-]\s*(\d{1,2})\s*[\/-]\s*(20\d{2})\s*م?/i);
  if (gregorianDeadline) {
    expiresAt = `${gregorianDeadline[3]}-${String(gregorianDeadline[2]).padStart(2, "0")}-${String(gregorianDeadline[1]).padStart(2, "0")}`;
  }

  if (expiresAt && new Date(`${expiresAt}T23:59:59Z`).getTime() < Date.now()) return null;

  const summaryMatch = text.match(/(?:تعلن|أعلنت)([\s\S]{40,1000}?)(?:رابط التقديم|للتقديم|جميع الحقوق|هل كانت هذه الصفحة مفيدة|$)/i);
  const summary = removeBoilerplate(summaryMatch?.[0] || text).slice(0, 650);
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
    apply_url: findApplyUrl(html, source, url),
    remote: 0,
    fresh_graduate: 0,
    no_experience: 0
  };
}

function portalResponseStatus(status) {
  if (status >= 200 && status < 400) return "monitor_only";
  if (status === 401 || status === 403) return "restricted";
  return "error";
}

async function syncPortalMonitorSource(env, source) {
  try {
    const response = await fetch(source.url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MasaaJobsBot/3.2; +https://mas3a.pages.dev)",
        Accept: "text/html,application/xhtml+xml"
      },
      redirect: "follow",
      signal: AbortSignal.timeout(20000)
    });
    const status = portalResponseStatus(response.status);
    const reachable = status !== "error";
    await upsertSource(env, { ...source, listingUrls: [source.url] }, {
      success: reachable,
      jobsSeen: 0,
      newJobs: 0,
      error: reachable ? null : `HTTP ${response.status}`,
      status
    }, "official_portal_monitor");
    try { await response.body?.cancel(); } catch {}
    return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: reachable ? 0 : 1, status };
  } catch (error) {
    const message = clean(error?.message || error);
    await upsertSource(env, { ...source, listingUrls: [source.url] }, {
      success: false,
      jobsSeen: 0,
      newJobs: 0,
      error: message,
      status: "error"
    }, "official_portal_monitor");
    return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: 1, error: message };
  }
}

function extractMohCurrentJobs(html, source) {
  const text = stripHtml(html);
  const currentIndex = text.indexOf("الوظائف الحالية");
  if (currentIndex < 0) return { parsed: false, jobs: [] };
  const previousIndex = text.indexOf("الوظائف السابقة", currentIndex + 1);
  const section = text.slice(currentIndex, previousIndex > currentIndex ? previousIndex : Math.min(text.length, currentIndex + 5000));
  const active = /(?:قائم|متاح|مفتوح)/.test(section);
  if (!active) return { parsed: true, jobs: [] };

  const titles = [];
  const rx = /(إعلان\s+[^|•]{3,100}?)(?=\s+(?:من\s+بداية|إلى\s+نهاية|قائم|متاح|مفتوح|بداية\s+الإعلان|نهاية\s+الإعلان))/g;
  let match;
  while ((match = rx.exec(section))) {
    const title = clean(match[1]).replace(/\s{2,}/g, " ");
    if (title && !titles.includes(title)) titles.push(title);
  }
  if (!titles.length) {
    const fallback = section.match(/(إعلان\s+[\u0600-\u06FF\s]+?)(?=\s+(?:من|إلى|قائم|متاح|مفتوح))/);
    if (fallback?.[1]) titles.push(clean(fallback[1]));
  }

  return {
    parsed: true,
    jobs: titles.slice(0, 20).map((title, index) => ({
      external_id: stableTextId("moh-current", title) || `moh-current-${index + 1}`,
      title,
      company: source.company,
      sector: "حكومي",
      city: "مختلف مناطق المملكة",
      region: null,
      work_mode: "حضوري",
      qualification: null,
      specialization: "صحة",
      experience: null,
      salary: null,
      published_at: null,
      expires_at: null,
      summary: "إعلان توظيف قائم وفق صفحة «اعمل معنا» الرسمية لوزارة الصحة. راجع المصدر الأصلي للتخصصات والشروط وطريقة التقديم.",
      source_url: source.url,
      apply_url: source.url,
      remote: 0,
      fresh_graduate: 0,
      no_experience: 0
    }))
  };
}

async function syncOfficialListingSource(env, source) {
  try {
    const html = await fetchText(source.url);
    const extracted = source.parser === "moh-current" ? extractMohCurrentJobs(html, source) : { parsed: false, jobs: [] };
    if (!extracted.parsed) {
      const message = "Official listing loaded but its expected structure was not found; no jobs were changed.";
      await upsertSource(env, source, { success: false, jobsSeen: 0, newJobs: 0, error: message, status: "needs_review" }, source.sourceType || "official_listing");
      return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: 1, error: message };
    }

    let added = 0;
    let updated = 0;
    const seen = [];
    for (const job of extracted.jobs) {
      seen.push(job.external_id);
      const result = await saveJob(env, source, job);
      if (result.added) added += 1;
      if (result.updated) updated += 1;
    }
    await archiveMissingJobs(env, source.key, seen, extracted.jobs.length === 0 && pageExplicitlyHasNoJobs(html));
    await upsertSource(env, source, { success: true, jobsSeen: extracted.jobs.length, newJobs: added, status: "ok" }, source.sourceType || "official_listing");
    return { source: source.key, jobsSeen: extracted.jobs.length, added, updated, errors: 0 };
  } catch (error) {
    const message = clean(error?.message || error);
    await upsertSource(env, source, { success: false, jobsSeen: 0, newJobs: 0, error: message, status: "error" }, source.sourceType || "official_listing");
    return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: 1, error: message };
  }
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; MasaaJobsBot/3.2; +https://mas3a.pages.dev)",
      Accept: "text/html,application/xhtml+xml"
    },
    redirect: "follow",
    signal: AbortSignal.timeout(25000)
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  return response.text();
}

async function translateToArabic(env, value, maxLength = 900) {
  const text = clean(value).slice(0, maxLength);
  if (!text || isArabic(text) || !env.AI) return text || null;

  try {
    const response = await env.AI.run("@cf/meta/m2m100-1.2b", {
      text,
      source_lang: "english",
      target_lang: "arabic"
    });

    const translated = clean(
      response?.translated_text ||
      response?.translation ||
      response?.result?.translated_text ||
      response?.translations?.[0]?.translated_text ||
      response?.translations?.[0]?.text ||
      ""
    );

    return translated || text;
  } catch {
    return text;
  }
}

async function localizeJob(env, source, job) {
  const companyMap = {
    "King Abdullah University of Science & Technology": "جامعة الملك عبدالله للعلوم والتقنية",
    "King Abdullah University of Science and Technology": "جامعة الملك عبدالله للعلوم والتقنية",
    "Saudi Telecom Company": "stc",
    "Saudia Group": "مجموعة السعودية",
    "Saudi Aramco": "أرامكو السعودية",
    "ACWA Power": "أكوا باور",
    "SPIMACO": "سبيماكو الدوائية",
    "Saudi Awwal Bank": "البنك السعودي الأول",
    "Johns Hopkins Aramco Healthcare": "جونز هوبكنز أرامكو للرعاية الصحية",
    "SIPCHEM": "سبكيم"
  };

  const localized = { ...job };
  localized.company = source.companyAr || companyMap[job.company] || job.company;
  localized.city = normalizeCity(job.city);

  if (job.sector === "عسكري") return localized;

  const [title, summary, experience, qualification] = await Promise.all([
    translateToArabic(env, job.title, 220),
    translateToArabic(env, job.summary, 700),
    translateToArabic(env, job.experience, 350),
    translateToArabic(env, job.qualification, 450)
  ]);

  localized.title = title || job.title;
  localized.summary = summary || job.summary;
  localized.experience = experience || job.experience;
  localized.qualification = qualification || job.qualification;
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
      (source.listingUrls?.[0] || source.url),
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
  if (!rawJob.title || !rawJob.apply_url || !rawJob.source_url) {
    return { added: false, updated: false, rejected: "missing_required_fields" };
  }

  // Never publish a URL that is not HTTPS and owned by the configured official source.
  // Redirect/cross-domain application hosts must be explicitly allow-listed on the source.
  if (!isAllowedOfficialUrl(rawJob.source_url, source) || !isAllowedOfficialUrl(rawJob.apply_url, source)) {
    return { added: false, updated: false, rejected: "untrusted_source_url" };
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

async function archiveMissingJobs(env, sourceKey, seenExternalIds, confirmedEmpty = false) {
  // An empty parser result is not proof that every vacancy closed. Only archive all
  // when the official page explicitly states there are no open jobs.
  if (!seenExternalIds.length) {
    if (!confirmedEmpty) return;
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

async function reviewMissingMilitaryJobs(env, sourceKey, seenExternalIds) {
  const timestamp = nowIso();
  const graceDays = 7;
  const placeholders = seenExternalIds.length ? seenExternalIds.map(() => "?").join(",") : "";
  const sql = seenExternalIds.length
    ? `
      UPDATE jobs
      SET status = CASE
        WHEN expires_at IS NOT NULL AND date(expires_at) < date('now') THEN 'expired'
        WHEN expires_at IS NULL AND julianday(COALESCE(published_at, discovered_at)) < julianday('now', '-${graceDays} days') THEN 'review'
        ELSE status
      END,
      updated_at = CASE
        WHEN (expires_at IS NOT NULL AND date(expires_at) < date('now'))
          OR (expires_at IS NULL AND julianday(COALESCE(published_at, discovered_at)) < julianday('now', '-${graceDays} days'))
        THEN ? ELSE updated_at END
      WHERE source_key = ?
        AND status = 'verified'
        AND external_id IS NOT NULL
        AND external_id NOT IN (${placeholders})
    `
    : `
      UPDATE jobs
      SET status = CASE
        WHEN expires_at IS NOT NULL AND date(expires_at) < date('now') THEN 'expired'
        WHEN expires_at IS NULL AND julianday(COALESCE(published_at, discovered_at)) < julianday('now', '-${graceDays} days') THEN 'review'
        ELSE status
      END,
      updated_at = CASE
        WHEN (expires_at IS NOT NULL AND date(expires_at) < date('now'))
          OR (expires_at IS NULL AND julianday(COALESCE(published_at, discovered_at)) < julianday('now', '-${graceDays} days'))
        THEN ? ELSE updated_at END
      WHERE source_key = ? AND status = 'verified'
    `;
  const args = seenExternalIds.length ? [timestamp, sourceKey, ...seenExternalIds] : [timestamp, sourceKey];
  await env.DB.prepare(sql).bind(...args).run();
}

async function wasCheckedRecently(env, sourceKey, externalId, hours = 6) {
  if (!externalId) return false;
  const row = await env.DB.prepare(
    `SELECT last_checked_at, status FROM jobs WHERE source_key = ? AND external_id = ? LIMIT 1`
  ).bind(sourceKey, externalId).first();
  if (!row?.last_checked_at || row.status !== "verified") return false;
  const checked = new Date(row.last_checked_at);
  if (Number.isNaN(checked.getTime())) return false;
  return Date.now() - checked.getTime() < hours * 3600000;
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
  let skippedFresh = 0;
  let detailErrors = 0;
  const seenExternalIds = [];
  const allUrls = [...urls];
  const processedUrls = allUrls.slice(0, 100);

  for (const url of processedUrls) {
    const externalId = externalIdFromUrl(url);
    if (externalId) seenExternalIds.push(externalId);
    try {
      // صفحات القوائم تُفحص كل ساعة لاكتشاف الجديد فورًا، بينما تفاصيل الوظيفة
      // المعروفة يعاد فحصها كل 6 ساعات لتقليل الحمل بدون التضحية باكتشاف الجديد.
      if (externalId && await wasCheckedRecently(env, source.key, externalId, 6)) {
        skippedFresh += 1;
        continue;
      }
      const html = await fetchText(url);
      const job = extractDetail(html, source, url);
      if (job.external_id && !seenExternalIds.includes(job.external_id)) seenExternalIds.push(job.external_id);
      const result = await saveJob(env, source, job);
      if (result.added) added += 1;
      if (result.updated) updated += 1;
    } catch {
      detailErrors += 1;
    }
  }

  // لا نؤرشف وظائف لمجرد أننا وصلنا إلى حد المعالجة في مصدر كبير.
  if (detailErrors === 0 && processedUrls.length === allUrls.length) {
    await archiveMissingJobs(env, source.key, seenExternalIds, urls.size === 0 && explicitNoJobs);
  }

  await upsertSource(env, source, {
    success: detailErrors === 0,
    jobsSeen: urls.size,
    newJobs: added,
    error: detailErrors > 0 ? `${detailErrors} job detail page(s) failed` : null,
    status: detailErrors > 0 ? "partial" : "ok"
  });

  return { source: source.key, jobsSeen: urls.size, added, updated, skippedFresh, errors: detailErrors };
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

  // صفحة أخبار رسمية ناجحة بلا أي روابط أخبار غالبًا تعني أن بنية الصفحة تغيّرت
  // أو أن الاستخراج تعطل. لا نغيّر حالات الوظائف الموجودة في هذه الحالة.
  if (articleUrls.size === 0) {
    const message = "Official military listing loaded but no announcement URLs were discovered; existing jobs were left unchanged.";
    await upsertSource(env, source, { success: false, jobsSeen: 0, newJobs: 0, error: message, status: "needs_review" }, "official_news");
    return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: 1, error: message };
  }

  let added = 0;
  let updated = 0;
  let detailErrors = 0;
  const seenExternalIds = [];

  const allArticleUrls = [...articleUrls];
  const processedArticleUrls = allArticleUrls.slice(0, 60);

  for (const url of processedArticleUrls) {
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

  // لا نغلق إعلانًا عسكريًا قبل اكتمال الفحص. إذا اختفى إعلان بدون
  // موعد ميلادي صريح يتحول إلى review بدل اعتباره منتهيًا بالتخمين.
  if (detailErrors === 0 && processedArticleUrls.length === allArticleUrls.length) {
    await reviewMissingMilitaryJobs(env, source.key, seenExternalIds);
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

async function expirePastDeadlineJobs(env) {
  await env.DB.prepare(
    `UPDATE jobs SET status = 'expired', updated_at = ? WHERE status = 'verified' AND expires_at IS NOT NULL AND date(expires_at) < date('now')`
  ).bind(nowIso()).run();
}

async function runSync(env) {
  const startedAt = nowIso();
  await ensureCatalogSources(env);
  await dedupeExistingJobs(env);
  await expirePastDeadlineJobs(env);

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
  let monitorWarnings = 0;
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

  for (const source of OFFICIAL_LISTING_SOURCES) {
    const result = await syncOfficialListingSource(env, source);
    sourcesChecked += 1;
    jobsSeen += result.jobsSeen || 0;
    jobsAdded += result.added || 0;
    jobsUpdated += result.updated || 0;
    errors += result.errors || 0;
    results.push(result);
  }

  for (const source of PORTAL_MONITOR_SOURCES) {
    const result = await syncPortalMonitorSource(env, source);
    sourcesChecked += 1;
    monitorWarnings += result.errors || 0;
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
    monitor_warnings: monitorWarnings,
    results
  };
}

function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.CORS_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Masaa-Sync-Key",
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
  const includeExpiredDays = Math.min(Math.max(Number(url.searchParams.get("include_expired_days")) || 0, 0), 90);

  const where = [];
  const values = [];
  if (includeExpiredDays > 0) {
    where.push(`(status = 'verified' OR (status = 'expired' AND date(COALESCE(expires_at, updated_at)) >= date('now', ?)))`);
    values.push(`-${includeExpiredDays} days`);
  } else {
    where.push("status = 'verified'");
  }

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

  const countSql = `SELECT COUNT(*) AS total FROM jobs WHERE ${where.join(" AND ")}`;
  const countRow = await env.DB.prepare(countSql).bind(...values).first();
  const total = Number(countRow?.total || 0);

  const sql = `
    SELECT
      id, source_key, external_id, title, company, sector,
      city, region, work_mode, qualification, specialization,
      experience, salary, published_at, expires_at, summary,
      source_url, apply_url, remote, fresh_graduate,
      no_experience, discovered_at, updated_at, status
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
    total,
    has_more: offset + (result.results?.length || 0) < total,
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
        SUM(CASE WHEN sector = 'خاص' THEN 1 ELSE 0 END) AS private,
        SUM(CASE WHEN date(updated_at) = date('now') THEN 1 ELSE 0 END) AS verified_today,
        COUNT(DISTINCT company) AS active_companies
      FROM jobs
      WHERE status = 'verified'
    `
  ).first();

  const sources = await env.DB.prepare(
    `
      SELECT
        SUM(CASE WHEN supported = 1 THEN 1 ELSE 0 END) AS total,
        SUM(CASE WHEN supported = 1 AND source_type <> 'official_portal_monitor' AND status = 'ok' THEN 1 ELSE 0 END) AS healthy,
        SUM(CASE WHEN source_type = 'official_portal_monitor' THEN 1 ELSE 0 END) AS portals,
        SUM(CASE WHEN source_type = 'official_portal_monitor' AND status IN ('monitor_only','restricted') THEN 1 ELSE 0 END) AS portals_reachable,
        SUM(CASE WHEN supported = 1 AND source_type <> 'official_portal_monitor' THEN 1 ELSE 0 END) AS ingestion
      FROM sources
    `
  ).first();

  const lastRun = await env.DB.prepare(
    `SELECT * FROM sync_runs ORDER BY id DESC LIMIT 1`
  ).first();

  return { ok: true, jobs: jobs || {}, sources: sources || {}, last_sync: lastRun || null };
}

async function getJobById(id, env) {
  const job = await env.DB.prepare(
    `SELECT id, source_key, external_id, title, company, sector, city, region, work_mode, qualification, specialization, experience, salary, published_at, expires_at, summary, source_url, apply_url, remote, fresh_graduate, no_experience, discovered_at, last_checked_at, updated_at FROM jobs WHERE id = ? AND status = 'verified' LIMIT 1`
  ).bind(id).first();
  return job ? { ok: true, job } : { ok: false, error: "Not found" };
}

async function sitemapJobs(env) {
  const result = await env.DB.prepare(
    `SELECT id, updated_at FROM jobs WHERE status = 'verified' ORDER BY COALESCE(updated_at, discovered_at) DESC LIMIT 5000`
  ).all();
  return { ok: true, jobs: result.results || [] };
}

function secureEqual(a, b) {
  const aa = new TextEncoder().encode(String(a || ""));
  const bb = new TextEncoder().encode(String(b || ""));
  if (aa.length !== bb.length || aa.length === 0) return false;
  let diff = 0;
  for (let i = 0; i < aa.length; i += 1) diff |= aa[i] ^ bb[i];
  return diff === 0;
}

function isSyncAuthorized(request, env) {
  if (!env.SYNC_SECRET) return false;
  const auth = request.headers.get("Authorization") || "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  const headerKey = request.headers.get("X-Masaa-Sync-Key") || "";
  return secureEqual(bearer, env.SYNC_SECRET) || secureEqual(headerKey, env.SYNC_SECRET);
}

function validEmail(value) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validHttpsUrl(value) {
  if (!value) return true;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}

async function createContactSubmission(request, env) {
  const configuredOrigin = env.CORS_ORIGIN || "";
  const origin = request.headers.get("Origin") || "";
  if (configuredOrigin && configuredOrigin !== "*" && origin !== configuredOrigin) {
    return { status: 403, body: { ok: false, error: "Origin not allowed" } };
  }

  let data;
  try { data = await request.json(); } catch { return { status: 400, body: { ok: false, error: "Invalid JSON" } }; }
  if (clean(data.website)) return { status: 200, body: { ok: true } }; // honeypot

  const type = clean(data.type).slice(0, 40);
  const organization = clean(data.organization).slice(0, 160);
  const jobTitle = clean(data.job_title).slice(0, 200);
  const sourceUrl = clean(data.source_url).slice(0, 700);
  const email = clean(data.contact_email).slice(0, 200);
  const details = clean(data.details).slice(0, 3000);
  const allowedTypes = new Set(["job", "entity", "correction", "closed", "other"]);

  if (!allowedTypes.has(type) || details.length < 10) {
    return { status: 400, body: { ok: false, error: "أكمل نوع الطلب والتفاصيل المطلوبة." } };
  }
  if (!validEmail(email)) return { status: 400, body: { ok: false, error: "صيغة البريد غير صحيحة." } };
  if (!validHttpsUrl(sourceUrl)) return { status: 400, body: { ok: false, error: "رابط المصدر يجب أن يكون HTTPS صالحًا." } };
  if (type === "job" && (!organization || !jobTitle || !sourceUrl)) {
    return { status: 400, body: { ok: false, error: "إضافة وظيفة تتطلب اسم الجهة والمسمى ورابط المصدر الرسمي." } };
  }

  const submissionHash = await sha256(`${type}|${organization}|${jobTitle}|${sourceUrl}|${email}|${details}`.toLowerCase());
  const duplicate = await env.DB.prepare(
    `SELECT id FROM contact_submissions WHERE submission_hash = ? AND julianday(submitted_at) >= julianday('now', '-10 minutes') LIMIT 1`
  ).bind(submissionHash).first();
  if (duplicate) return { status: 200, body: { ok: true, ticket: duplicate.id, duplicate: true } };

  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO contact_submissions (id, type, organization, job_title, source_url, contact_email, details, submission_hash, submitted_at, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`
  ).bind(id, type, organization || null, jobTitle || null, sourceUrl || null, email || null, details, submissionHash, nowIso()).run();
  return { status: 201, body: { ok: true, ticket: id } };
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
      endpoints: ["GET /health", "GET /jobs", "GET /jobs/:id", "GET /sources", "GET /stats", "GET /sitemap", "POST /contact", "POST /sync (protected)"],
      ingestion_sources: SUCCESSFACTORS_SOURCES.length + OFFICIAL_LISTING_SOURCES.length + MILITARY_NEWS_SOURCES.length,
      monitored_portals: PORTAL_MONITOR_SOURCES.length
    }, env);
  }

  if (request.method === "GET" && path === "/health") {
    return json({ ok: true, service: "Masaa Jobs API", version: VERSION, time: nowIso() }, env);
  }

  if (request.method === "GET" && path.startsWith("/jobs/") && path.length > 6) {
    try {
      const id = decodeURIComponent(path.slice(6));
      const result = await getJobById(id, env);
      return json(result, env, result.ok ? 200 : 404);
    } catch (error) {
      return json({ ok: false, error: clean(error?.message || error) }, env, 500);
    }
  }

  if (request.method === "GET" && path === "/sitemap") {
    try { return json(await sitemapJobs(env), env); }
    catch (error) { return json({ ok: false, error: clean(error?.message || error) }, env, 500); }
  }

  if (request.method === "POST" && path === "/contact") {
    try {
      const result = await createContactSubmission(request, env);
      return json(result.body, env, result.status);
    } catch (error) {
      return json({ ok: false, error: clean(error?.message || error) }, env, 500);
    }
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
    if (!env.SYNC_SECRET) return json({ ok: false, error: "SYNC_SECRET is not configured" }, env, 503);
    if (!isSyncAuthorized(request, env)) return json({ ok: false, error: "Unauthorized" }, env, 401);
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

export { discoverJobUrls, pageExplicitlyHasNoJobs, externalIdFromUrl, normalizeDigits, parseDate, isAllowedOfficialUrl, stableTextId };
