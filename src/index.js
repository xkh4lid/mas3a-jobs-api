const SUCCESSFACTORS_SOURCES = [
  {
    key: "stc",
    name: "وظائف إس تي سي",
    company: "stc",
    companyAr: "إس تي سي",
    sector: "خاص",
    host: "careers.stc.com.sa",
    listingUrls: [
      "https://careers.stc.com.sa/viewalljobs/?q=&sortColumn=referencedate&sortDirection=desc",
      "https://careers.stc.com.sa/go/All-Jobs-Except-JAP/7754423/?q=&sortColumn=referencedate&sortDirection=desc"
    ]
  },
  {
    key: "kaust",
    name: "وظائف جامعة الملك عبدالله للعلوم والتقنية",
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
    name: "وظائف مجموعة السعودية",
    company: "Saudia Group",
    companyAr: "مجموعة السعودية",
    sector: "خاص",
    host: "careers.saudia.com",
    listingUrls: [
      "https://careers.saudia.com/search/?q=&locationsearch=SA"
    ],
    searchUrls: [
      "https://careers.saudia.com/search/?q=&locationsearch=SA"
    ]
  },
  {
    key: "aramco",
    name: "وظائف أرامكو السعودية",
    company: "Saudi Aramco",
    companyAr: "أرامكو السعودية",
    sector: "خاص",
    host: "careers.aramco.com",
    listingUrls: [
      "https://careers.aramco.com/saudi/search/?q=&locationsearch="
    ],
    searchUrls: [
      "https://careers.aramco.com/saudi/search/?q=&locationsearch="
    ]
  },
  {
    key: "acwa-power",
    name: "وظائف أكوا باور",
    company: "ACWA Power",
    companyAr: "أكوا باور",
    sector: "خاص",
    host: "careers.acwapower.com",
    listingUrls: [
      "https://careers.acwapower.com/search/?q=&locationsearch=SA&sortColumn=referencedate&sortDirection=desc"
    ],
    searchUrls: [
      "https://careers.acwapower.com/search/?q=&locationsearch=SA&sortColumn=referencedate&sortDirection=desc"
    ]
  },
  {
    key: "spimaco",
    name: "وظائف سبيماكو الدوائية",
    company: "SPIMACO",
    companyAr: "سبيماكو الدوائية",
    sector: "خاص",
    host: "careers.spimaco.com.sa",
    listingUrls: [
      "https://careers.spimaco.com.sa/search/?q=&locationsearch="
    ],
    searchUrls: [
      "https://careers.spimaco.com.sa/search/?q=&locationsearch="
    ]
  },
  {
    key: "sab",
    name: "وظائف البنك السعودي الأول",
    company: "Saudi Awwal Bank",
    companyAr: "البنك السعودي الأول",
    sector: "خاص",
    host: "careers.sab.com",
    listingUrls: [
      "https://careers.sab.com/search/?q=&locationsearch="
    ],
    searchUrls: [
      "https://careers.sab.com/search/?q=&locationsearch="
    ]
  },
  {
    key: "jhah",
    name: "وظائف جونز هوبكنز أرامكو للرعاية الصحية",
    company: "Johns Hopkins Aramco Healthcare",
    companyAr: "جونز هوبكنز أرامكو للرعاية الصحية",
    sector: "خاص",
    host: "careers.jhah.com",
    listingUrls: [
      "https://careers.jhah.com/search/?q=&locationsearch="
    ],
    searchUrls: [
      "https://careers.jhah.com/search/?q=&locationsearch="
    ]
  },
  {
    key: "sipchem",
    name: "وظائف سبكيم",
    company: "SIPCHEM",
    companyAr: "سبكيم",
    sector: "خاص",
    host: "career.sipchem.com",
    listingUrls: [
      "https://career.sipchem.com/viewalljobs/?q=&sortColumn=referencedate&sortDirection=desc"
    ]
  },
  {
    key: "alfanar",
    name: "وظائف الفنار",
    company: "alfanar",
    companyAr: "الفنار",
    sector: "خاص",
    host: "jobs.alfanar.com",
    listingUrls: [
      "https://jobs.alfanar.com/alfanar/search/?q=&locationsearch=SAUDI"
    ],
    searchUrls: [
      "https://jobs.alfanar.com/alfanar/search/?q=&locationsearch=SAUDI"
    ]
  },
  {
    key: "sasref",
    name: "وظائف ساسرف",
    company: "Saudi Aramco Jubail Refinery Company (SASREF)",
    companyAr: "ساسرف",
    sector: "خاص",
    host: "careers.sasref.com.sa",
    listingUrls: [
      "https://careers.sasref.com.sa/viewalljobs/",
      "https://careers.sasref.com.sa/go/All-Jobs-at-SASREF/2896901/"
    ]
  },
  {
    key: "tasnee",
    name: "وظائف التصنيع",
    company: "National Industrialization Company (Tasnee)",
    companyAr: "التصنيع",
    sector: "خاص",
    host: "jobs.tasnee.com",
    listingUrls: [
      "https://jobs.tasnee.com/search/?q=&locationsearch=SA"
    ],
    searchUrls: [
      "https://jobs.tasnee.com/search/?q=&locationsearch=SA"
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
    applyHosts: ["jobs.sang.gov.sa", "jobs.sa"],
    keywords: ["القبول والتسجيل", "الخدمة العسكرية", "تجنيد", "وظائف عسكرية", "رتبة", "الالتحاق بالخدمة العسكرية"]
  },
  {
    key: "spa-military",
    name: "واس - إعلانات القبول العسكري",
    company: "الجهات العسكرية السعودية",
    sector: "عسكري",
    host: "www.spa.gov.sa",
    listingUrls: [
      "https://www.spa.gov.sa/news/latest-news?page=1"
    ],
    articlePath: /^\/N\d+$/i,
    applyHosts: ["jobs.sa", "tajnid.mod.gov.sa", "jobs.sang.gov.sa"],
    listingKeywords: [
      "فتح باب", "القبول والتسجيل", "القبول الموحد", "التجنيد الموحد",
      "استقبال طلبات", "بدء التقديم", "رتبة جندي", "رتبة جندي أول",
      "رتبة وكيل رقيب", "دورة تأهيل الضباط"
    ],
    excludeKeywords: [
      "نتائج", "المرشحين", "المرشحات", "القبول المبدئي",
      "المقبولين", "المقبولات", "المقابلة", "المطابقة"
    ],
    keywords: [
      "فتح باب", "القبول والتسجيل", "القبول الموحد", "التجنيد الموحد",
      "استقبال طلبات", "بدء التقديم", "الالتحاق"
    ],
    allowEmptyListing: true,
    rapid: true,
    maxArticles: 4
  }
];

const EWDIFH_SOURCE = {
  key: "ewdifh",
  name: "أي وظيفة — مصدر اكتشاف",
  company: "أي وظيفة",
  sector: "متعدد",
  host: "www.ewdifh.com",
  url: "https://www.ewdifh.com/category/all-jobs",
  listingUrls: ["https://www.ewdifh.com/category/all-jobs"],
  sourceType: "discovery_feed",
  allowExternalApply: true
};

const ADDITIONAL_DISCOVERY_SOURCES = [
  {
    key: "wadhefa-com",
    name: "وظيفة.كوم — مصدر اكتشاف",
    company: "وظيفة.كوم",
    sector: "متعدد",
    host: "www.wadhefa.com",
    url: "https://www.wadhefa.com/",
    listingUrls: ["https://www.wadhefa.com/"],
    sourceType: "discovery_feed",
    articlePath: /^\/news\/\d+\/?$/i,
    mode: "listing_only",
    maxArticles: 10,
    allowExternalApply: true
  },
  {
    key: "wdeftksa",
    name: "وظيفتك علينا — مصدر اكتشاف",
    company: "وظيفتك علينا",
    sector: "متعدد",
    host: "www.wdeftksa.com",
    url: "https://www.wdeftksa.com/sa/jobs",
    listingUrls: ["https://www.wdeftksa.com/sa/jobs"],
    sourceType: "discovery_feed",
    articlePath: /^\/sa\/jobs\/\d+\/?$/i,
    mode: "detail",
    maxArticles: 5,
    allowExternalApply: true
  },
  {
    key: "isaudinews",
    name: "سعودي نيوز — مصدر اكتشاف",
    company: "سعودي نيوز",
    sector: "متعدد",
    host: "isaudinews.com",
    url: "https://isaudinews.com/",
    listingUrls: ["https://isaudinews.com/"],
    sourceType: "discovery_feed",
    articlePath: /^\/\d+\/?$/i,
    mode: "detail",
    maxArticles: 5,
    allowExternalApply: true
  }
];

const SOURCE_CATALOG = [
  ...SUCCESSFACTORS_SOURCES.map((source) => ({
    key: source.key,
    name: source.name,
    url: source.listingUrls?.[0] || `https://${source.host}/`,
    source_type: "successfactors",
    sector: source.sector,
    enabled: 1,
    supported: 1,
    status: "pending"
  })),
  ...MILITARY_NEWS_SOURCES.map((source) => ({
    key: source.key,
    name: source.name,
    url: source.listingUrls?.[0] || `https://${source.host}/`,
    source_type: "official_news",
    sector: source.sector,
    enabled: 1,
    supported: 1,
    status: "pending"
  })),
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
  },
  {
    key: EWDIFH_SOURCE.key,
    name: EWDIFH_SOURCE.name,
    url: EWDIFH_SOURCE.url,
    source_type: EWDIFH_SOURCE.sourceType,
    sector: EWDIFH_SOURCE.sector,
    enabled: 1,
    supported: 1,
    status: "pending"
  },
  ...ADDITIONAL_DISCOVERY_SOURCES.map((source) => ({
    key: source.key,
    name: source.name,
    url: source.url,
    source_type: source.sourceType,
    sector: source.sector,
    enabled: 1,
    supported: 1,
    status: "pending"
  }))

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

const SCHEDULED_SOURCE_ORDER = [
  "stc",
  "kaust",
  "saudia",
  "aramco",
  "spimaco",
  "sab",
  "jhah",
  "alfanar",
  "acwa-power",
  "tasnee",
  "sipchem",
  "sasref"
];

function scheduledSourceKeyForMinute(minute) {
  const safeMinute = Math.max(0, Math.min(59, Number(minute) || 0));
  const slot = Math.floor(safeMinute / 5) % SCHEDULED_SOURCE_ORDER.length;
  return SCHEDULED_SOURCE_ORDER[slot];
}

function successFactorsSourceByKey(key) {
  return SUCCESSFACTORS_SOURCES.find((source) => source.key === key) || null;
}

const CATCHUP_TARGET_JOBS = 60;
const CATCHUP_SOURCE_ORDER = [...SCHEDULED_SOURCE_ORDER];

async function verifiedJobCount(env) {
  const row = await env.DB.prepare(
    "SELECT COUNT(*) AS count FROM jobs WHERE status IN ('verified','discovered')"
  ).first();
  return Number(row?.count || 0);
}

function catchupSourceKeyForMinute(minute) {
  const safeMinute = Math.max(0, Math.min(59, Number(minute) || 0));
  const slot = Math.floor(safeMinute / 5);
  return CATCHUP_SOURCE_ORDER[slot % CATCHUP_SOURCE_ORDER.length];
}

const VERSION = "3.14.0";
const LOCALIZATION_VERSION = "ar-v6";
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
  const match = String(url).match(/\/(\d{4,})\/?(?:[?#]|$)/);
  return match?.[1] || null;
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
      if (parsed.hostname !== source.host) return;
      if (!/\/job\//i.test(parsed.pathname)) return;
      if (!/\/\d{4,}\/?$/i.test(parsed.pathname)) return;
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
    /((?:https?:\/\/[^\/"'<>\\\s]+)?\/(?:[^\/"'<>\\\s?#]+\/)*job\/[^"'<>\\\s?#]+\/\d{4,}\/?)/gi;

  while ((match = rawJobRegex.exec(normalized))) {
    add(match[1]);
  }

  return [...found];
}


function titleFromJobUrl(url) {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    const jobIndex = parts.findIndex((part) => part.toLowerCase() === "job");
    if (jobIndex < 0 || !parts[jobIndex + 1]) return "";
    return clean(decodeURIComponent(parts[jobIndex + 1]).replace(/[-_]+/g, " "));
  } catch {
    return "";
  }
}

function listingCityFromText(value) {
  const text = clean(value);
  const cities = [
    ["Riyadh", "الرياض"], ["Jeddah", "جدة"], ["Jubail", "الجبيل"],
    ["Yanbu", "ينبع"], ["Dammam", "الدمام"], ["Dhahran", "الظهران"],
    ["Khobar", "الخبر"], ["Al Khobar", "الخبر"], ["Makkah", "مكة المكرمة"],
    ["Mecca", "مكة المكرمة"], ["Madinah", "المدينة المنورة"],
    ["Medina", "المدينة المنورة"], ["Tabuk", "تبوك"], ["Jazan", "جازان"],
    ["Abha", "أبها"], ["Najran", "نجران"], ["Rabigh", "رابغ"]
  ];

  for (const [english, arabic] of cities) {
    const pattern = english.replace(/ /g, "\\s+");
    if (new RegExp(`\\b${pattern}\\b`, "i").test(text)) return arabic;
  }

  if (/\b(?:SA|KSA)\b|Saudi Arabia|Kingdom of Saudi Arabia/i.test(text)) return "السعودية";
  return null;
}

function listingDateFromText(value) {
  const text = clean(value);
  const english = text.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\s+\d{1,2},\s+20\d{2}\b/i);
  if (english?.[0]) return parseDate(english[0]);
  const dmy = text.match(/\b\d{1,2}[\/-]\d{1,2}[\/-]20\d{2}\b/);
  return dmy?.[0] ? parseDate(dmy[0]) : null;
}

function extractListingCandidates(html, source, baseUrl) {
  const normalized = normalizeListingHtml(html);
  const found = new Map();
  const anchorRegex = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = anchorRegex.exec(normalized))) {
    const url = absoluteUrl(match[1], baseUrl);
    let parsed;
    try { parsed = new URL(url); } catch { continue; }

    if (parsed.hostname !== source.host) continue;
    if (!/\/job\//i.test(parsed.pathname)) continue;
    if (!/\/\d{4,}\/?$/i.test(parsed.pathname)) continue;

    let title = stripHtml(match[2]);
    if (!title || title.length < 3 || /^(?:apply|view|details|learn more)$/i.test(title)) {
      title = titleFromJobUrl(parsed.href);
    }
    if (!title || title.length < 3) continue;

    const rowStart = normalized.lastIndexOf("<tr", match.index);
    const rowEnd = normalized.indexOf("</tr>", match.index);
    const rowHtml = rowStart >= 0 && rowEnd > rowStart
      ? normalized.slice(rowStart, rowEnd + 5)
      : normalized.slice(Math.max(0, match.index - 500), Math.min(normalized.length, anchorRegex.lastIndex + 900));
    const rowText = stripHtml(rowHtml);
    const entry = inferEntryLevel({ title, description: rowText, experience: "" });

    const candidate = {
      external_id: externalIdFromUrl(parsed.href),
      title,
      company: source.company,
      sector: source.sector,
      city: listingCityFromText(rowText),
      region: null,
      work_mode: null,
      qualification: null,
      specialization: null,
      experience: null,
      salary: null,
      published_at: listingDateFromText(rowText),
      expires_at: null,
      summary: null,
      source_url: parsed.href,
      apply_url: parsed.href,
      remote: 0,
      fresh_graduate: entry.freshGraduate ? 1 : 0,
      no_experience: entry.noExperience ? 1 : 0
    };

    const previous = found.get(parsed.href);
    if (!previous || candidate.title.length > previous.title.length) found.set(parsed.href, candidate);
  }

  return [...found.values()];
}


function discoverCategoryUrls(html, source, baseUrl) {
  const normalized = normalizeListingHtml(html);
  const found = new Set();
  const hrefRegex = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = hrefRegex.exec(normalized))) {
    const url = absoluteUrl(match[1], baseUrl);
    try {
      const parsed = new URL(url);
      if (parsed.hostname !== source.host) continue;
      if (!/\/go\//i.test(parsed.pathname)) continue;
      if (!/\/\d{4,}\/?$/i.test(parsed.pathname)) continue;
      found.add(parsed.href);
    } catch {
      // Ignore malformed category URLs.
    }
  }

  return [...found];
}


function discoverPaginationUrls(html, source, baseUrl) {
  const normalized = normalizeListingHtml(html);
  const found = new Set();
  const hrefRegex = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = hrefRegex.exec(normalized))) {
    const url = absoluteUrl(match[1], baseUrl);
    try {
      const parsed = new URL(url);
      if (parsed.hostname !== source.host) continue;
      if (!/(?:\/search\/?$|\/go\/[^?#]+\/?$|\/viewalljobs\/?$)/i.test(parsed.pathname)) continue;
      const startrow = Number(parsed.searchParams.get("startrow"));
      if (!Number.isFinite(startrow) || startrow <= 0) continue;
      parsed.hash = "";
      found.add(parsed.href);
    } catch {
      // Ignore malformed pagination URLs.
    }
  }

  return [...found];
}

function successFactorsSearchUrls(source) {
  const urls = new Set();

  // When a source provides explicit official search URLs, never broaden the
  // crawl beyond them. This is especially important for global companies where
  // Masaa must ingest Saudi vacancies only.
  if (Array.isArray(source.searchUrls) && source.searchUrls.length > 0) {
    for (const candidate of source.searchUrls) {
      try {
        const parsed = new URL(candidate);
        if (parsed.protocol === "https:" && parsed.hostname === source.host) {
          parsed.hash = "";
          urls.add(parsed.href);
        }
      } catch {
        // Ignore malformed configured search URLs.
      }
    }
    return [...urls];
  }

  try {
    const origin = `https://${source.host}`;
    urls.add(`${origin}/search/?q=&locationsearch=`);

    for (const listingUrl of source.listingUrls || []) {
      const parsed = new URL(listingUrl);
      const tenantPrefix = parsed.pathname.match(/^\/(?:([^/]+)\/)?(?:go|viewalljobs|search)(?:\/|$)/i)?.[1];
      if (tenantPrefix) {
        urls.add(`${origin}/${tenantPrefix}/search/?q=&locationsearch=`);
      }
    }
  } catch {
    // Ignore malformed source configuration.
  }
  return [...urls];
}

function listingTotalJobs(html) {
  const text = stripHtml(html);
  const totals = [];

  for (const match of text.matchAll(/\bof\s+(\d+)\b/gi)) {
    totals.push(Number(match[1]));
  }

  for (const match of text.matchAll(/\b1\s*[–—-]\s*\d+\s+(?:of|من)\s+(\d+)\b/gi)) {
    totals.push(Number(match[1]));
  }

  for (const match of String(html ?? "").matchAll(/"(?:totalJobs|totalResults|resultsCount|jobCount)"\s*:\s*(\d+)/gi)) {
    totals.push(Number(match[1]));
  }

  const valid = totals.filter((value) => Number.isFinite(value) && value >= 0);
  return valid.length ? Math.max(...valid) : null;
}

function listingClaimsJobs(html) {
  const total = listingTotalJobs(html);
  return total !== null && total > 0;
}

function pageExplicitlyClosed(status, html) {
  if (status === 404 || status === 410) return true;
  const text = stripHtml(html).toLowerCase();
  return [
    "job is no longer available",
    "this job is no longer available",
    "position is no longer available",
    "position has been filled",
    "no longer accepting applications",
    "job posting has expired",
    "posting has expired",
    "application period has ended",
    "applications are closed",
    "انتهى التقديم",
    "انتهت فترة التقديم",
    "التقديم مغلق",
    "أُغلق التقديم",
    "اغلق التقديم",
    "لم يعد الإعلان متاح",
    "لم تعد الوظيفة متاحة",
    "الوظيفة غير متاحة",
    "تم شغل الوظيفة"
  ].some((phrase) => text.includes(phrase));
}


function pageShowsApplySignal(html) {
  const text = stripHtml(html).toLowerCase();
  return [
    "apply now",
    "apply for this job",
    "apply for job",
    "submit application",
    "تقدم الآن",
    "قدّم الآن",
    "قدم الآن",
    "التقديم على الوظيفة",
    "رابط التقديم",
    "التقديم متاح"
  ].some((phrase) => text.includes(phrase));
}

function configuredSourceHosts(source) {
  const sourceHosts = new Set();
  const applyHosts = new Set(source.applyHosts || []);

  if (source.host) sourceHosts.add(source.host.toLowerCase());

  for (const candidate of [source.url, ...(source.listingUrls || [])]) {
    if (!candidate) continue;
    try {
      sourceHosts.add(new URL(candidate).hostname.toLowerCase());
    } catch {
      // Ignore malformed configured URLs.
    }
  }

  return { sourceHosts, applyHosts: new Set([...applyHosts].map((host) => host.toLowerCase())) };
}

function isTrustedDiscoveryApplyUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    const host = url.hostname.toLowerCase();
    const blocked = [
      "ewdifh.com", "www.ewdifh.com",
      "facebook.com", "www.facebook.com",
      "instagram.com", "www.instagram.com",
      "twitter.com", "www.twitter.com", "x.com", "www.x.com",
      "t.me", "telegram.me", "www.telegram.me",
      "whatsapp.com", "www.whatsapp.com", "api.whatsapp.com",
      "apps.apple.com", "play.google.com",
      "tiktok.com", "www.tiktok.com",
      "googleadservices.com", "doubleclick.net",
      "bit.ly", "tinyurl.com"
    ];
    return !blocked.some((blockedHost) => host === blockedHost || host.endsWith("." + blockedHost));
  } catch {
    return false;
  }
}

function isAllowedOfficialUrl(value, source) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    const host = url.hostname.toLowerCase();
    const { sourceHosts, applyHosts } = configuredSourceHosts(source || {});
    const allowedHosts = new Set([...sourceHosts, ...applyHosts]);
    return [...allowedHosts].some((allowed) => host === allowed || host.endsWith("." + allowed));
  } catch {
    return false;
  }
}

function validateJobCandidate(source, job) {
  const title = clean(job?.title);
  if (title.length < 3 || title.length > 220) return { ok: false, reason: "invalid_title" };

  if (/^(?:view all jobs|search jobs|careers?|jobs?|home|فرص وظيفية|الوظائف|بحث الوظائف)$/i.test(title)) {
    return { ok: false, reason: "generic_title" };
  }

  const { sourceHosts, applyHosts } = configuredSourceHosts(source);

  let sourceHost = "";
  let applyHost = "";
  try {
    const parsed = new URL(job.source_url);
    if (parsed.protocol !== "https:") return { ok: false, reason: "non_https_source" };
    sourceHost = parsed.hostname.toLowerCase();
  } catch {
    return { ok: false, reason: "invalid_source_url" };
  }

  try {
    const parsed = new URL(job.apply_url);
    if (parsed.protocol !== "https:") return { ok: false, reason: "non_https_apply" };
    applyHost = parsed.hostname.toLowerCase();
  } catch {
    return { ok: false, reason: "invalid_apply_url" };
  }

  if (!sourceHosts.has(sourceHost)) return { ok: false, reason: "untrusted_source_host" };
  if (source?.allowExternalApply === true) {
    if (!isTrustedDiscoveryApplyUrl(job.apply_url)) {
      return { ok: false, reason: "untrusted_apply_host" };
    }
  } else if (!sourceHosts.has(applyHost) && !applyHosts.has(applyHost)) {
    return { ok: false, reason: "untrusted_apply_host" };
  }

  // Military announcements are published as open only when they contain a real
  // link to a configured official application portal. The news article itself
  // is not treated as an application link.
  if (job.sector === "عسكري" && applyHosts.size > 0 && !applyHosts.has(applyHost)) {
    return { ok: false, reason: "military_apply_link_missing" };
  }

  if (job.expires_at) {
    const deadline = new Date(`${job.expires_at}T23:59:59Z`);
    if (!Number.isNaN(deadline.getTime()) && deadline.getTime() < Date.now()) {
      return { ok: false, reason: "expired" };
    }
  }

  return { ok: true };
}

function discoverArticleUrls(html, source, baseUrl) {
  const normalized = normalizeListingHtml(html);
  const found = new Set();
  const hrefRegex = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = hrefRegex.exec(normalized))) {
    const url = absoluteUrl(match[1], baseUrl);
    const anchorText = stripHtml(match[2] || "");

    if (Array.isArray(source.listingKeywords) && source.listingKeywords.length > 0) {
      const hasListingSignal = source.listingKeywords.some((keyword) => anchorText.includes(keyword));
      if (!hasListingSignal) continue;
    }

    if (Array.isArray(source.excludeKeywords) && source.excludeKeywords.some((keyword) => anchorText.includes(keyword))) {
      continue;
    }

    try {
      const parsed = new URL(url);
      if (parsed.hostname !== source.host) continue;
      source.articlePath.lastIndex = 0;
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
      .replace(/Show More Options/gi, " ")
      .replace(/Loading\.{0,3}/gi, " ")
      .replace(/Select how often \(in days\) to receive an alert:?/gi, " ")
      .replace(/(?:how often \(in days\) to )?receive an alert:?/gi, " ")
      .replace(/Create Alert/gi, " ")
      .replace(/Search by Keyword/gi, " ")
      .replace(/Search by Location/gi, " ")
      .replace(/Search Jobs/gi, " ")
      .replace(/View All Jobs/gi, " ")
      .replace(/Apply now\s*»?/gi, " ")
      .replace(/Find similar jobs/gi, " ")
      .replace(/View Profile/gi, " ")
      .replace(/\bCategory\b/gi, " ")
      .replace(/\bClear\b/gi, " ")
      .replace(/\bAll\b/gi, " ")
      .replace(/When you visit any website[\s\S]{0,1800}?(?:cookies?|privacy)/gi, " ")
      .replace(/Your cookie preferences[\s\S]{0,1600}?(?:cookies?|privacy)/gi, " ")
      .replace(/This website uses cookies[\s\S]{0,1600}?(?:Accept|Reject|Settings)/gi, " ")
      .replace(/Cookie Preferences[\s\S]{0,1200}?(?:Accept|Reject|Settings)/gi, " ")
      .replace(/Manage Preferences[\s\S]{0,1200}?(?:Accept|Reject|Settings)/gi, " ")
  );
}

function containsEnglishUiNoise(value) {
  return /(?:show more options|loading\.{0,3}|select how often|receive an alert|create alert|search by keyword|search by location|find similar jobs|view profile)/i
    .test(String(value ?? ""));
}

function containsCookieNoise(value) {
  return /(?:cookies?|cookie preferences|privacy preferences|local storage|browser storage|manage preferences|accept cookies|reject cookies|الكوكيز|ملفات تعريف الارتباط|تفضيلات الخصوصية|التخزين المحلي|قبول الكوكيز|إلغاء الكوكيز)/i
    .test(String(value ?? ""));
}

function hasLatinWords(value) {
  return /[A-Za-z]{2,}/.test(String(value ?? ""));
}

function stripResidualLatin(value) {
  return clean(
    String(value ?? "")
      .replace(/[A-Za-z][A-Za-z0-9+.#/&\'’\-]*/g, " ")
      .replace(/\(\s*\)/g, " ")
      .replace(/\s+([،؛:,.!?])/g, "$1")
  );
}

function arabicPublicText(value, fallback = null, maxLength = 900) {
  const cleaned = removeBoilerplate(value).slice(0, maxLength);
  if (!cleaned) return fallback;
  if (!hasLatinWords(cleaned)) return cleaned;

  const stripped = stripResidualLatin(cleaned).slice(0, maxLength);
  if (isArabic(stripped) && stripped.length >= 3) return stripped;
  return fallback;
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

  if (summary.length >= 35 && !containsCookieNoise(summary)) return summary;

  const fallback = removeBoilerplate(text)
    .replace(/^.*?(?:Company\s*:?\s*[^.]{1,120})/i, "")
    .slice(0, 700);

  if (fallback.length < 35 || containsEnglishUiNoise(fallback) || containsCookieNoise(fallback)) return null;
  return fallback;
}

function normalizeCity(value) {
  const city = clean(value)
    .replace(/^[-:–—]+|[-:–—]+$/g, "")
    .replace(/^=\s*self\.location\s*;?$/i, "")
    .replace(/^self\.location\s*;?$/i, "");

  if (!city) return null;
  if (containsEnglishUiNoise(city) || city.length > 120) return null;

  const compactCode = city.replace(/\s+/g, "").toUpperCase();
  if (/^SA(?:[,;:/_-]?\d+)*$/.test(compactCode)) return "السعودية";

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

  if (map.has(city)) return map.get(city);

  for (const [english, arabic] of map.entries()) {
    if (english === "SA") continue;
    const escaped = english.replace(/[.*+?^$()|[\]\\]/g, "\\$&");
    if (new RegExp("(?:^|[,\\s-])" + escaped + "(?:$|[,\\s-])", "i").test(city)) return arabic;
  }

  return city;
}

function isArabic(value) {
  return /[\u0600-\u06FF]/.test(String(value ?? ""));
}

function normalizeWorkMode(value, remote = false) {
  if (remote) return "عن بُعد";
  const mode = clean(value);
  if (!mode) return null;
  if (/عن بُعد|عن بعد|العمل من المنزل/.test(mode) || /\b(?:remote|work from home)\b/i.test(mode)) return "عن بُعد";
  if (/هجين/.test(mode) || /\bhybrid\b/i.test(mode)) return "هجين";
  if (/حضوري|من مقر العمل/.test(mode) || /\b(?:on[- ]?site|onsite|office)\b/i.test(mode)) return "حضوري";
  return arabicPublicText(mode, null, 80);
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
    qualification: containsCookieNoise(qualification) ? null : (clean(qualification) || null),
    specialization: null,
    experience: containsCookieNoise(experience) ? null : (clean(experience) || null),
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

  const hosts = (source.applyHosts || [])
    .map((host) => host.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");

  if (hosts) {
    const rawRegex = new RegExp("https:\\/\\/(?:" + hosts + ")[^\\s\"'<>]*", "i");
    const raw = String(html ?? "").match(rawRegex)?.[0];
    if (raw) return raw;
  }

  return source.applyHosts?.length ? null : fallback;
}

function extractMilitaryAnnouncement(html, source, url) {
  const text = stripHtml(html);

  const title =
    stripHtml((String(html).match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || ["", ""])[1]) ||
    clean(decodeBasicEntities((String(html).match(/<title[^>]*>([\s\S]*?)<\/title>/i) || ["", ""])[1]));

  const focused = clean(title + " " + text.slice(0, 4500));

  if (Array.isArray(source.excludeKeywords) && source.excludeKeywords.some((keyword) => focused.includes(keyword))) {
    return null;
  }

  const hasRecruitmentSignal = /(?:فتح\s+باب|القبول\s+والتسجيل|القبول\s+الموحد|بدء\s+(?:استقبال|التقديم|التسجيل)|استقبال\s+طلبات|التقديم\s+(?:متاح|على)|التسجيل\s+(?:متاح|للخدمة)|التجنيد\s+الموحد|الالتحاق\s+بالخدمة\s+العسكرية|وظائف\s+عسكرية)/i.test(focused);
  if (!hasRecruitmentSignal || !source.keywords.some((keyword) => focused.includes(keyword))) return null;

  const applyUrl = findApplyUrl(html, source, url);
  if (!applyUrl || !isAllowedOfficialUrl(applyUrl, source)) return null;

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
  const spaMatch = parsedUrl.pathname.match(/^\/N(\d+)$/i);
  const slug = pathMatch
    ? pathMatch[1] + "-" + pathMatch[2]
    : spaMatch
      ? "N" + spaMatch[1]
      : stableTextId(source.key, parsedUrl.href);

  const company = /وزارة\s+الدفاع|القوات\s+المسلحة/i.test(focused)
    ? "وزارة الدفاع"
    : /وزارة\s+الداخلية|الإدارة\s+العامة\s+للقبول\s+المركزي|أبشر\s*-?\s*توظيف/i.test(focused)
      ? "وزارة الداخلية"
      : /الحرس\s+الوطني/i.test(focused)
        ? "وزارة الحرس الوطني"
        : source.company;

  return {
    external_id: slug,
    title: clean(title) || "فتح باب القبول والتسجيل للخدمة العسكرية",
    company,
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
    apply_url: applyUrl,
    remote: 0,
    fresh_graduate: 0,
    no_experience: 0
  };
}

function discoverEwdifhArticleUrls(html, baseUrl) {
  const found = new Set();
  const normalized = normalizeListingHtml(html);
  const hrefRegex = /<a\b[^>]*href\s*=\s*["\']([^"\']+)["\'][^>]*>/gi;
  let match;
  while ((match = hrefRegex.exec(normalized))) {
    const url = absoluteUrl(match[1], baseUrl);
    try {
      const parsed = new URL(url);
      if (!/(?:^|\.)ewdifh\.com$/i.test(parsed.hostname)) continue;
      if (!/^\/jobs\/\d+\/?$/i.test(parsed.pathname)) continue;
      parsed.hash = "";
      found.add(parsed.href);
    } catch {
      // تجاهل الروابط غير الصالحة.
    }
  }
  return [...found];
}

function ewdifhCompanyFromHtml(html, title) {
  const org = String(html ?? "").match(/<a\b[^>]*href\s*=\s*["\'][^"\']*\/job\/org\/\d+[^"\']*["\'][^>]*>([\s\S]*?)<\/a>/i);
  const fromOrg = clean(stripHtml(org?.[1] || ""));
  if (fromOrg && fromOrg.length >= 2 && fromOrg.length <= 160) return fromOrg;
  const fromTitle = clean(String(title || "").match(/^(.{2,120}?)\s+(?:تعلن|يعلن)\b/i)?.[1] || "");
  return fromTitle || "الجهة المعلنة";
}

function ewdifhSector(company, title) {
  const text = clean(company + " " + title);
  if (/(?:الحرس\s+الملكي|الحرس\s+الوطني|وزارة\s+الدفاع|قوات\s+الدفاع|القوات\s+المسلحة|عسكري|التجنيد|جندي|جندي\s+أول)/i.test(text)) return "عسكري";
  if (/^(?:وزارة|هيئة|جامعة|أمانة|رئاسة|صندوق|مركز\s+وطني|المؤسسة\s+العامة|ديوان)|مستشفى\s+الملك\s+فيصل/i.test(text)) return "حكومي";
  return "خاص";
}

function ewdifhCity(text) {
  const value = clean(text);
  if (/جميع\s+مناطق\s+المملكة|عدة\s+مناطق\s+بالمملكة|مختلف\s+مناطق\s+المملكة/i.test(value)) return "مختلف مناطق المملكة";
  const cities = ["الرياض","جدة","مكة المكرمة","مكة","المدينة المنورة","المدينة","الدمام","الخبر","الظهران","الجبيل","ينبع","الطائف","تبوك","أبها","خميس مشيط","جازان","نجران","حائل","بريدة","عنيزة","الباحة","سكاكا","عرعر","رأس الخير","بيشة","حقل","رابغ"];
  return cities.find((city) => value.includes(city)) || null;
}

function ewdifhApplyUrl(html, baseUrl) {
  const raw = String(html ?? "");
  const positions = [raw.indexOf("طريقة التقديم"), raw.indexOf("رابط التقديم"), raw.indexOf("التقديم:")].filter((value) => value >= 0);
  const start = positions.length ? Math.min(...positions) : -1;
  const scopes = start >= 0 ? [raw.slice(start, Math.min(raw.length, start + 7000)), raw] : [raw];
  for (const scope of scopes) {
    const hrefRegex = /<a\b[^>]*href\s*=\s*["\']([^"\']+)["\'][^>]*>/gi;
    let match;
    while ((match = hrefRegex.exec(scope))) {
      const url = absoluteUrl(match[1], baseUrl);
      if (isTrustedDiscoveryApplyUrl(url)) return url;
    }
  }
  return null;
}

function extractEwdifhJob(html, articleUrl) {
  const visible = withoutScripts(html);
  const text = stripHtml(visible);
  const title = stripHtml((visible.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || ["", ""])[1]);
  if (!title || title.length < 5) return null;

  const employmentSignal = /(?:وظائف?|توظيف|فرص\s+وظيفية|شاغر|القبول\s+والتسجيل|منتهي(?:ة)?\s+بالتوظيف|مبتدئ(?:ة)?\s+بالتوظيف|تطوير\s+الخريجين|طاقم\s+الضيافة)/i.test(title);
  const nonJobSignal = /(?:نتائج\s+القبول|دورة|دورات|ندوة|ورشة|ماجستير|دبلوم\s+تعليمي)/i.test(title) && !/(?:توظيف|منتهي(?:ة)?\s+بالتوظيف|مبتدئ(?:ة)?\s+بالتوظيف|تطوير\s+الخريجين)/i.test(title);
  if (!employmentSignal || nonJobSignal) return null;

  const applyUrl = ewdifhApplyUrl(visible, articleUrl);
  if (!applyUrl) return null;
  const articleId = String(new URL(articleUrl).pathname.match(/\/jobs\/(\d+)/i)?.[1] || "");
  if (!articleId) return null;

  const company = ewdifhCompanyFromHtml(visible, title);
  const sector = ewdifhSector(company, title);
  const city = ewdifhCity(text);
  const dateMatch = text.match(/\b\d{1,2}-\d{1,2}-20\d{2}\b/);
  const publishedAt = dateMatch ? parseDate(dateMatch[0]) : null;
  if (publishedAt && daysSince(publishedAt) > 30) return null;

  const remote = /عن\s*بُ?عد|عن\s+بعد/i.test(title + " " + text.slice(0, 2500));
  const entry = inferEntryLevel({ title, description: text.slice(0, 2500), experience: "" });
  const summary = "فرصة منشورة عبر «أي وظيفة» لدى " + company + ". ربط مَسعى زر التقديم بالرابط الخارجي المعلن للجهة، ويُنصح بمراجعة الشروط والمواعيد في صفحة الإعلان قبل التقديم.";

  return {
    external_id: articleId,
    title: clean(title),
    company,
    sector,
    city,
    region: null,
    work_mode: remote ? "عن بُعد" : null,
    qualification: null,
    specialization: null,
    experience: null,
    salary: null,
    published_at: publishedAt,
    expires_at: null,
    summary,
    source_url: articleUrl,
    apply_url: applyUrl,
    remote: remote ? 1 : 0,
    fresh_graduate: entry.freshGraduate ? 1 : 0,
    no_experience: entry.noExperience ? 1 : 0
  };
}

async function syncEwdifhDiscoverySource(env, source = EWDIFH_SOURCE, maxArticles = 10) {
  let listing;
  try {
    listing = await fetchPage(source.url, { attempts: 2 });
  } catch (error) {
    const message = clean(error?.message || error);
    await upsertSource(env, source, { success: false, jobsSeen: 0, newJobs: 0, error: message, status: "error" }, source.sourceType);
    return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: 1, error: message };
  }
  if (!listing.ok) {
    const message = "تعذر الوصول إلى صفحة الاكتشاف برمز " + listing.status;
    await upsertSource(env, source, { success: false, jobsSeen: 0, newJobs: 0, error: message, status: "error" }, source.sourceType);
    return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: 1, error: message };
  }

  const articleUrls = discoverEwdifhArticleUrls(listing.text, listing.url || source.url);
  const selected = articleUrls.slice(0, Math.max(1, Math.min(Number(maxArticles) || 10, 15)));
  let added = 0;
  let updated = 0;
  let errors = 0;
  let rejected = 0;

  for (const articleUrl of selected) {
    try {
      const page = await fetchPage(articleUrl, { attempts: 1 });
      if (!page.ok) { errors += 1; continue; }
      const job = extractEwdifhJob(page.text, page.url || articleUrl);
      if (!job) { rejected += 1; continue; }

      const duplicateOfficial = await env.DB.prepare("SELECT id FROM jobs WHERE apply_url = ? AND source_key <> ? AND status = \'verified\' LIMIT 1")
        .bind(job.apply_url, source.key).first();
      if (duplicateOfficial) {
        await setExistingJobStatus(env, source, job, "review");
        continue;
      }

      const result = await saveJob(env, source, job, { skipLocalization: true, status: "discovered" });
      if (result.added) added += 1;
      if (result.updated) updated += 1;
      if (result.rejected) rejected += 1;
    } catch {
      errors += 1;
    }
  }

  await env.DB.prepare("UPDATE jobs SET status = \'review\', updated_at = ? WHERE source_key = ? AND status = \'discovered\' AND datetime(COALESCE(published_at, discovered_at)) < datetime(\'now\', \'-30 days\')")
    .bind(nowIso(), source.key).run();

  await upsertSource(env, source, {
    success: errors === 0,
    jobsSeen: articleUrls.length,
    newJobs: added,
    error: errors > 0 ? "تعذر فحص بعض إعلانات الاكتشاف." : null,
    status: errors > 0 ? "partial" : "ok"
  }, source.sourceType);

  return { source: source.key, jobsSeen: articleUrls.length, checked: selected.length, added, updated, rejected, errors };
}

async function quarantineDiscoveryDuplicates(env) {
  const sql = [
    "UPDATE jobs",
    "SET status = \'review\', updated_at = ?",
    "WHERE source_key = \'ewdifh\'",
    "AND status = \'discovered\'",
    "AND EXISTS (",
    "  SELECT 1 FROM jobs AS official",
    "  WHERE official.apply_url = jobs.apply_url",
    "    AND official.source_key <> \'ewdifh\'",
    "    AND official.status = \'verified\'",
    ")"
  ].join(" ");
  const result = await env.DB.prepare(sql).bind(nowIso()).run();
  return Number(result.meta?.changes || 0);
}

function portalResponseStatus(status) {
  if (status >= 200 && status < 400) return "monitor_only";
  if (status === 401 || status === 403) return "restricted";
  return "error";
}

async function syncPortalMonitorSource(env, source) {
  try {
    const page = await fetchPage(source.url, { attempts: 1 });
    const status = portalResponseStatus(page.status);
    const reachable = status !== "error";

    await upsertSource(env, { ...source, listingUrls: [source.url] }, {
      success: reachable,
      jobsSeen: 0,
      newJobs: 0,
      error: reachable ? null : `HTTP ${page.status}`,
      status
    }, "official_portal_monitor");

    return {
      source: source.key,
      jobsSeen: 0,
      added: 0,
      updated: 0,
      errors: reachable ? 0 : 1,
      status
    };
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

function stableTextId(prefixOrValue, maybeValue) {
  const hasPrefix = maybeValue !== undefined;
  const value = hasPrefix ? maybeValue : prefixOrValue;
  const normalized = clean(value).toLowerCase().normalize("NFKC");
  let hash = 2166136261;
  for (let i = 0; i < normalized.length; i += 1) {
    hash ^= normalized.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const id = (hash >>> 0).toString(36);
  return hasPrefix ? `${clean(prefixOrValue)}-${id}` : id;
}

function extractMohCurrentJobs(html, source) {
  const text = stripHtml(html);
  const currentIndex = text.indexOf("الوظائف الحالية");
  if (currentIndex < 0) return { parsed: false, jobs: [] };
  const previousIndex = text.indexOf("الوظائف السابقة", currentIndex + 1);
  const section = text.slice(currentIndex, previousIndex > currentIndex ? previousIndex : Math.min(text.length, currentIndex + 5000));
  const active = /(?:قائم|متاح|مفتوح)/.test(section);
  if (!active) return { parsed: true, explicitNoJobs: true, jobs: [] };

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
      external_id: `moh-${stableTextId(title)}`,
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
    // Fail-safe: an empty extraction must never close every existing job unless
    // the official page explicitly indicates there are no current openings.
    if (seen.length > 0 || extracted.explicitNoJobs === true) {
      await archiveMissingJobs(env, source.key, seen);
    }
    await upsertSource(env, source, { success: true, jobsSeen: extracted.jobs.length, newJobs: added, status: "ok" }, source.sourceType || "official_listing");
    return { source: source.key, jobsSeen: extracted.jobs.length, added, updated, errors: 0 };
  } catch (error) {
    const message = clean(error?.message || error);
    await upsertSource(env, source, { success: false, jobsSeen: 0, newJobs: 0, error: message, status: "error" }, source.sourceType || "official_listing");
    return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: 1, error: message };
  }
}

const FETCH_TIMEOUTS_MS = [12000, 18000, 24000];
const RETRYABLE_HTTP = new Set([408, 425, 429, 500, 502, 503, 504]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchPage(url, options = {}) {
  const attempts = Math.max(1, Math.min(Number(options.attempts) || 3, 3));
  const accept = options.accept || "text/html,application/xhtml+xml";
  let lastError = null;
  let lastResult = null;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const timeout = FETCH_TIMEOUTS_MS[Math.min(attempt, FETCH_TIMEOUTS_MS.length - 1)];
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; MasaaJobsBot/3.2; +https://mas3a.pages.dev)",
          Accept: accept,
          "Accept-Language": "ar-SA,ar;q=0.9,en;q=0.8"
        },
        redirect: "follow",
        signal: AbortSignal.timeout(timeout)
      });

      const text = await response.text();
      const result = {
        ok: response.ok,
        status: response.status,
        url: response.url || url,
        text
      };

      if (response.ok || !RETRYABLE_HTTP.has(response.status)) return result;
      lastResult = result;
      lastError = new Error(`HTTP ${response.status} for ${url}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < attempts - 1) {
      await sleep(attempt === 0 ? 350 : 900);
    }
  }

  if (lastResult) return lastResult;
  throw lastError || new Error(`Could not fetch ${url}`);
}

async function fetchText(url, options = {}) {
  const page = await fetchPage(url, options);
  if (!page.ok) throw new Error(`HTTP ${page.status} for ${url}`);
  return page.text;
}

async function translateToArabic(env, value, maxLength = 900) {
  const text = removeBoilerplate(value).slice(0, maxLength);
  if (!text) return null;
  if (!hasLatinWords(text)) return text;

  if (!env.AI) {
    const stripped = stripResidualLatin(text);
    return isArabic(stripped) ? stripped : null;
  }

  try {
    const response = await env.AI.run("@cf/meta/m2m100-1.2b", {
      text,
      source_lang: "english",
      target_lang: "arabic"
    });

    const translated = removeBoilerplate(
      response?.translated_text ||
      response?.translation ||
      response?.result?.translated_text ||
      response?.translations?.[0]?.translated_text ||
      response?.translations?.[0]?.text ||
      ""
    );

    if (!translated) return null;
    if (!hasLatinWords(translated)) return translated;
    const stripped = stripResidualLatin(translated);
    return isArabic(stripped) ? stripped : null;
  } catch {
    const stripped = stripResidualLatin(text);
    return isArabic(stripped) ? stripped : null;
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

  const companyArabic = arabicPublicText(localized.company, "الجهة المعلنة", 180);
  localized.company = companyArabic;
  localized.title = arabicPublicText(title || job.title, "فرصة وظيفية لدى " + companyArabic, 220);
  localized.summary = arabicPublicText(
    summary || job.summary,
    "فرصة وظيفية لدى " + companyArabic + ". راجع المصدر الرسمي للاطلاع على الوصف الكامل والمتطلبات وطريقة التقديم.",
    700
  );
  localized.experience = arabicPublicText(experience || job.experience, null, 350);
  localized.qualification = arabicPublicText(qualification || job.qualification, null, 450);
  localized.specialization = arabicPublicText(job.specialization, isArabic(job.specialization) ? job.specialization : null, 180);
  localized.city = arabicPublicText(normalizeCity(job.city), "غير محددة", 120);
  localized.work_mode = normalizeWorkMode(job.work_mode, Boolean(job.remote));
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


async function setExistingJobStatus(env, source, rawJob, status) {
  const timestamp = nowIso();
  if (rawJob?.external_id) {
    await env.DB.prepare(
      `UPDATE jobs SET status = ?, last_checked_at = ?, updated_at = ? WHERE source_key = ? AND external_id = ?`
    ).bind(status, timestamp, timestamp, source.key, rawJob.external_id).run();
    return;
  }

  if (rawJob?.apply_url) {
    await env.DB.prepare(
      `UPDATE jobs SET status = ?, last_checked_at = ?, updated_at = ? WHERE source_key = ? AND apply_url = ?`
    ).bind(status, timestamp, timestamp, source.key, rawJob.apply_url).run();
  }
}

async function quarantineStaleUnverifiedJobs(env) {
  const timestamp = nowIso();
  const result = await env.DB.prepare(
    `
      UPDATE jobs
      SET status = 'review', updated_at = ?
      WHERE status = 'verified'
        AND datetime(last_checked_at) < datetime('now', '-48 hours')
        AND source_key IN (
          SELECT source_key
          FROM sources
          WHERE status IN ('error', 'needs_review')
        )
    `
  ).bind(timestamp).run();

  return Number(result.meta?.changes || 0);
}

async function saveJob(env, source, rawJob, options = {}) {
  const targetStatus = options.status === "discovered" ? "discovered" : "verified";
  if (!rawJob.title || !rawJob.apply_url) {
    return { added: false, updated: false, rejected: "missing_required_fields" };
  }

  const validation = validateJobCandidate(source, rawJob);
  if (!validation.ok) {
    await setExistingJobStatus(env, source, rawJob, validation.reason === "expired" ? "expired" : "review");
    return { added: false, updated: false, rejected: validation.reason };
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
      `UPDATE jobs SET last_checked_at = ?, status = ?, fingerprint = ?, updated_at = ? WHERE id = ?`
    )
      .bind(timestamp, targetStatus, fingerprint, timestamp, existing.id)
      .run();

    return { added: false, updated: false };
  }

  const job = options.skipLocalization
    ? { ...rawJob, company: source.companyAr || rawJob.company }
    : await localizeJob(env, source, rawJob);

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
          ?, ?, ?, ?, ?, ?, ?, ?
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
        targetStatus,
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
        status = ?,
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
      targetStatus,
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


async function recheckUnseenSuccessFactorsJobs(env, source, seenExternalIds, limit = 30) {
  const values = [source.key];
  let exclusion = "";

  if (seenExternalIds.length) {
    const ids = seenExternalIds.slice(0, 100);
    exclusion = `AND external_id NOT IN (${ids.map(() => "?").join(",")})`;
    values.push(...ids);
  }

  values.push(Math.max(1, Math.min(Number(limit) || 30, 60)));

  const result = await env.DB.prepare(
    `
      SELECT id, external_id, source_url, apply_url
      FROM jobs
      WHERE source_key = ?
        AND status = 'verified'
        AND datetime(last_checked_at) < datetime('now', '-6 hours')
        ${exclusion}
      ORDER BY datetime(last_checked_at) ASC
      LIMIT ?
    `
  ).bind(...values).all();

  let checked = 0;
  let closed = 0;
  let errors = 0;

  for (const row of result.results || []) {
    try {
      const page = await fetchPage(row.source_url || row.apply_url, { attempts: 2 });

      if (pageExplicitlyClosed(page.status, page.text)) {
        await setExistingJobStatus(env, source, {
          external_id: row.external_id,
          apply_url: row.apply_url
        }, "expired");
        checked += 1;
        closed += 1;
        continue;
      }

      if (!page.ok) {
        errors += 1;
        continue;
      }

      // This job was not present in the latest discovered listing. If its detail
      // page no longer exposes an application action, hide it as review instead
      // of assuming it is still open.
      if (!pageShowsApplySignal(page.text)) {
        await setExistingJobStatus(env, source, {
          external_id: row.external_id,
          apply_url: row.apply_url
        }, "review");
        checked += 1;
        continue;
      }

      const job = extractDetail(page.text, source, page.url || row.source_url || row.apply_url);
      const validation = validateJobCandidate(source, job);

      if (!validation.ok) {
        await setExistingJobStatus(env, source, {
          external_id: row.external_id,
          apply_url: row.apply_url
        }, validation.reason === "expired" ? "expired" : "review");
        checked += 1;
        if (validation.reason === "expired") closed += 1;
        continue;
      }

      await saveJob(env, source, job);
      checked += 1;
    } catch {
      errors += 1;
    }
  }

  return { checked, closed, errors };
}

async function syncSuccessFactorsSource(env, source, options = {}) {
  const detailFetchBudget = Math.max(1, Math.min(Number(options.detailFetchBudget) || 18, 24));
  const detailAttempts = Math.max(1, Math.min(Number(options.detailAttempts) || 2, 2));
  const urls = new Set();
  const categoryUrls = new Set();
  const listingPaginationUrls = new Set();
  let listingWorked = false;
  let explicitNoJobs = false;
  let positiveListing = false;
  let claimedTotal = 0;
  const errors = [];

  for (const listingUrl of source.listingUrls) {
    try {
      const html = await fetchText(listingUrl);
      listingWorked = true;

      const directJobs = discoverJobUrls(html, source, listingUrl);
      for (const url of directJobs) urls.add(url);
      for (const url of discoverCategoryUrls(html, source, listingUrl)) categoryUrls.add(url);
      for (const url of discoverPaginationUrls(html, source, listingUrl)) listingPaginationUrls.add(url);

      if (directJobs.length > 0) {
        positiveListing = true;
        const total = listingTotalJobs(html);
        if (total !== null) claimedTotal = Math.max(claimedTotal, total);
      }

      if (pageExplicitlyHasNoJobs(html)) explicitNoJobs = true;
    } catch (error) {
      errors.push(clean(error?.message || error));
    }
  }

  if (!listingWorked) {
    const message = errors.join(" | ") || "Could not fetch any listing page";
    await upsertSource(env, source, { success: false, error: message, status: "error" });
    return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: 1, error: message };
  }

  // If a configured official listing/search page already exposed jobs, follow
  // its same-host pagination too. This preserves location filters such as SA or
  // SAUDI while allowing Masaa to see every page instead of only the first one.
  if (urls.size > 0 && listingPaginationUrls.size > 0) {
    const queue = [...listingPaginationUrls];
    const visited = new Set(source.listingUrls || []);

    while (queue.length && visited.size < 16) {
      const pageUrl = queue.shift();
      if (!pageUrl || visited.has(pageUrl)) continue;
      visited.add(pageUrl);

      try {
        const html = await fetchText(pageUrl, { attempts: 2 });
        const pageJobs = discoverJobUrls(html, source, pageUrl);
        for (const url of pageJobs) urls.add(url);
        for (const categoryUrl of discoverCategoryUrls(html, source, pageUrl)) {
          if (categoryUrls.size < 30) categoryUrls.add(categoryUrl);
        }

        const total = listingTotalJobs(html);
        if (total !== null) claimedTotal = Math.max(claimedTotal, total);

        for (const nextUrl of discoverPaginationUrls(html, source, pageUrl)) {
          if (!visited.has(nextUrl) && !queue.includes(nextUrl) && queue.length < 24) {
            queue.push(nextUrl);
          }
        }
      } catch (error) {
        errors.push(clean(error?.message || error));
      }
    }
  }

  // SuccessFactors viewalljobs pages often lazy-load actual rows. Search pages
  // are server-rendered more consistently, so crawl the official search pages
  // and their pagination before falling back to categories.
  if (urls.size === 0) {
    const queue = [...successFactorsSearchUrls(source)];
    const visited = new Set();
    let searchWorked = false;
    let searchSaysEmpty = false;
    let searchSaysPositive = false;

    while (queue.length && visited.size < 12) {
      const searchUrl = queue.shift();
      if (!searchUrl || visited.has(searchUrl)) continue;
      visited.add(searchUrl);

      try {
        const html = await fetchText(searchUrl, { attempts: 2 });
        searchWorked = true;

        const pageJobs = discoverJobUrls(html, source, searchUrl);
        for (const url of pageJobs) urls.add(url);

        if (pageJobs.length > 0) {
          searchSaysPositive = true;
          positiveListing = true;
        }

        const total = listingTotalJobs(html);
        if (total !== null) {
          if (total > 0) {
            claimedTotal = Math.max(claimedTotal, total);
            searchSaysPositive = true;
            positiveListing = true;
          } else {
            searchSaysEmpty = true;
          }
        }

        if (pageExplicitlyHasNoJobs(html)) searchSaysEmpty = true;

        for (const pageUrl of discoverPaginationUrls(html, source, searchUrl)) {
          if (!visited.has(pageUrl) && !queue.includes(pageUrl) && queue.length < 20) {
            queue.push(pageUrl);
          }
        }

        for (const categoryUrl of discoverCategoryUrls(html, source, searchUrl)) {
          if (categoryUrls.size < 30) categoryUrls.add(categoryUrl);
        }
      } catch (error) {
        errors.push(clean(error?.message || error));
      }
    }

    if (searchWorked && searchSaysEmpty && !searchSaysPositive && urls.size === 0) {
      explicitNoJobs = true;
    }

    // If search pages were unavailable/ambiguous, inspect the official category
    // pages discovered from the source. A category page is never used as proof
    // that the whole site is empty unless every checked category explicitly says so.
    if (urls.size === 0 && !(searchWorked && searchSaysEmpty && !searchSaysPositive)) {
      let categoriesWorked = 0;
      let categoriesEmpty = 0;

      for (const categoryUrl of [...categoryUrls].slice(0, 30)) {
        try {
          const html = await fetchText(categoryUrl, { attempts: 2 });
          categoriesWorked += 1;

          const pageJobs = discoverJobUrls(html, source, categoryUrl);
          for (const url of pageJobs) urls.add(url);

          if (pageJobs.length > 0) {
            positiveListing = true;
            const total = listingTotalJobs(html);
            if (total !== null) claimedTotal = Math.max(claimedTotal, total);
          }

          if (pageExplicitlyHasNoJobs(html)) categoriesEmpty += 1;
        } catch (error) {
          errors.push(clean(error?.message || error));
        }
      }

      if (categoriesWorked > 0 && categoriesEmpty === categoriesWorked && urls.size === 0) {
        explicitNoJobs = true;
      }
    }
  }

  if (urls.size === 0) {
    // Close all only when the official search/listing clearly proves that there
    // are no open jobs. Ambiguous pages never cause mass closure.
    if (explicitNoJobs && !positiveListing) {
      await archiveMissingJobs(env, source.key, []);
      await upsertSource(env, source, {
        success: true,
        jobsSeen: 0,
        newJobs: 0,
        error: null,
        status: "ok"
      });
      return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: 0, closedAll: true };
    }

    const message = "Official listing loaded but job links could not be verified after search/category fallbacks; existing jobs were left unchanged.";
    await upsertSource(env, source, {
      success: false,
      jobsSeen: 0,
      newJobs: 0,
      error: message,
      status: "needs_review"
    });
    return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: 1, error: message };
  }

  let added = 0;
  let updated = 0;
  let skippedFresh = 0;
  let detailErrors = 0;
  let rejected = 0;
  let closed = 0;
  let detailFetches = 0;
  let deferred = 0;
  const seenExternalIds = [];
  const allUrls = [...urls];
  const processedUrls = allUrls.slice(0, 100);

  for (const url of processedUrls) {
    const externalId = externalIdFromUrl(url);

    try {
      if (externalId && await wasCheckedRecently(env, source.key, externalId, 6)) {
        seenExternalIds.push(externalId);
        skippedFresh += 1;
        continue;
      }

      if (detailFetches >= detailFetchBudget) {
        deferred += 1;
        continue;
      }

      detailFetches += 1;
      const page = await fetchPage(url, { attempts: detailAttempts });
      if (pageExplicitlyClosed(page.status, page.text)) {
        await setExistingJobStatus(env, source, { external_id: externalId, apply_url: url }, "expired");
        closed += 1;
        continue;
      }

      if (!page.ok) {
        detailErrors += 1;
        continue;
      }

      const job = extractDetail(page.text, source, page.url || url);
      const validation = validateJobCandidate(source, job);
      if (!validation.ok) {
        await setExistingJobStatus(env, source, job, validation.reason === "expired" ? "expired" : "review");
        rejected += 1;
        continue;
      }

      if (job.external_id && !seenExternalIds.includes(job.external_id)) {
        seenExternalIds.push(job.external_id);
      }

      const result = await saveJob(env, source, job);
      if (result.added) added += 1;
      if (result.updated) updated += 1;
      if (result.rejected) rejected += 1;
    } catch {
      detailErrors += 1;
    }
  }

  // Archive by absence only when a job-search page gave a total and we verified
  // at least that many unique official job URLs. Otherwise recheck old jobs one
  // by one rather than assuming disappearance means closure.
  const completeListing =
    claimedTotal > 0 &&
    urls.size >= claimedTotal &&
    detailErrors === 0 &&
    rejected === 0 &&
    deferred === 0 &&
    processedUrls.length === allUrls.length;

  if (completeListing) {
    await archiveMissingJobs(env, source.key, seenExternalIds);
  }

  const recheckLimit = detailFetches < detailFetchBudget ? Math.min(3, detailFetchBudget - detailFetches) : 0;
  const recheck = recheckLimit > 0
    ? await recheckUnseenSuccessFactorsJobs(env, source, seenExternalIds, recheckLimit)
    : { checked: 0, closed: 0, errors: 0 };
  closed += recheck.closed;
  detailErrors += recheck.errors;

  const hasWarnings = detailErrors > 0 || rejected > 0;
  const warningParts = [];
  if (detailErrors > 0) warningParts.push(`${detailErrors} job detail page(s) failed`);
  if (rejected > 0) warningParts.push(`${rejected} candidate(s) failed trust validation`);

  await upsertSource(env, source, {
    success: !hasWarnings,
    jobsSeen: urls.size,
    newJobs: added,
    error: warningParts.length ? warningParts.join(" | ") : null,
    status: hasWarnings ? "partial" : "ok"
  });

  return {
    source: source.key,
    jobsSeen: urls.size,
    added,
    updated,
    skippedFresh,
    closed,
    rejected,
    claimed_total: claimedTotal || null,
    detail_fetches: detailFetches,
    deferred,
    rechecked_existing: recheck.checked,
    errors: detailErrors + rejected
  };
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
    if (source.allowEmptyListing) {
      await reviewMissingMilitaryJobs(env, source.key, []);
      await upsertSource(env, source, { success: true, jobsSeen: 0, newJobs: 0, error: null, status: "ok" }, "official_news");
      return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: 0 };
    }

    const message = "Official military listing loaded but no announcement URLs were discovered; existing jobs were left unchanged.";
    await upsertSource(env, source, { success: false, jobsSeen: 0, newJobs: 0, error: message, status: "needs_review" }, "official_news");
    return { source: source.key, jobsSeen: 0, added: 0, updated: 0, errors: 1, error: message };
  }

  let added = 0;
  let updated = 0;
  let detailErrors = 0;
  const seenExternalIds = [];

  const allArticleUrls = [...articleUrls];
  const processedArticleUrls = allArticleUrls.slice(0, Math.max(1, Math.min(Number(source.maxArticles) || 12, 12)));

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

async function quarantineInvalidMilitaryJobs(env) {
  const timestamp = nowIso();
  const result = await env.DB.prepare(
    `UPDATE jobs
     SET status = 'review', updated_at = ?
     WHERE status = 'verified'
       AND source_key IN ('sang-military', 'spa-military')
       AND (
         apply_url IS NULL
         OR (
           apply_url NOT LIKE 'https://jobs.sang.gov.sa/%'
           AND apply_url NOT LIKE 'https://jobs.sa/%'
           AND apply_url NOT LIKE 'https://tajnid.mod.gov.sa/%'
         )
       )`
  ).bind(timestamp).run();
  return Number(result.meta?.changes || 0);
}

async function expirePastDeadlineJobs(env) {
  await env.DB.prepare(
    `UPDATE jobs SET status = 'expired', updated_at = ? WHERE status = 'verified' AND expires_at IS NOT NULL AND date(expires_at) < date('now')`
  ).bind(nowIso()).run();
}

async function activeSyncRun(env) {
  return env.DB.prepare(
    `SELECT id, started_at
     FROM sync_runs
     WHERE finished_at IS NULL
       AND datetime(started_at) >= datetime('now', '-30 minutes')
     ORDER BY id DESC
     LIMIT 1`
  ).first();
}

async function syncListingSnapshotSource(env, source, maxNewJobs = 60) {
  const queue = [...(source.listingUrls || [])];
  const visited = new Set();
  const candidates = new Map();
  let fetchErrors = 0;

  while (queue.length && visited.size < 12) {
    const listingUrl = queue.shift();
    if (!listingUrl || visited.has(listingUrl)) continue;
    visited.add(listingUrl);

    try {
      const html = await fetchText(listingUrl, { attempts: 2 });
      for (const job of extractListingCandidates(html, source, listingUrl)) {
        if (job.external_id) candidates.set(job.external_id, job);
      }

      for (const pageUrl of discoverPaginationUrls(html, source, listingUrl)) {
        if (!visited.has(pageUrl) && !queue.includes(pageUrl) && queue.length < 20) queue.push(pageUrl);
      }
    } catch {
      fetchErrors += 1;
    }
  }

  let added = 0;
  let updated = 0;
  let rejected = 0;
  const cap = Math.max(0, Number(maxNewJobs) || 0);

  for (const job of candidates.values()) {
    if (added >= cap) break;
    const result = await saveJob(env, source, job, { skipLocalization: true });
    if (result.added) added += 1;
    if (result.updated) updated += 1;
    if (result.rejected) rejected += 1;
  }

  const errors = fetchErrors + rejected;
  await upsertSource(env, source, {
    success: errors === 0,
    jobsSeen: candidates.size,
    newJobs: added,
    error: errors ? `${fetchErrors} listing page(s) failed | ${rejected} candidate(s) rejected` : null,
    status: errors ? "partial" : "ok"
  });

  return {
    source: source.key,
    jobsSeen: candidates.size,
    added,
    updated,
    rejected,
    listing_pages: visited.size,
    errors
  };
}

async function runCatchupListingSourceBatch(env, sourceKey, target = CATCHUP_TARGET_JOBS) {
  const activeRun = await activeSyncRun(env);
  if (activeRun) {
    return {
      ok: true,
      skipped: true,
      reason: "sync_already_running",
      active_run_id: activeRun.id,
      active_started_at: activeRun.started_at
    };
  }

  await ensureCatalogSources(env);
  await expirePastDeadlineJobs(env);
  await quarantineInvalidMilitaryJobs(env);

  const currentTotal = await verifiedJobCount(env);
  if (currentTotal >= target) {
    return { ok: true, skipped: true, reason: "catchup_target_reached", total: currentTotal };
  }

  const source = successFactorsSourceByKey(sourceKey);
  if (!source) {
    return { ok: false, skipped: true, reason: "unknown_source", source: sourceKey };
  }

  const { startedAt, runId } = await beginSyncRun(env);
  const needed = Math.max(1, target - currentTotal);
  const result = await syncListingSnapshotSource(env, source, Math.min(needed, 20));
  const summary = {
    sourcesChecked: 1,
    jobsSeen: result.jobsSeen || 0,
    jobsAdded: result.added || 0,
    jobsUpdated: result.updated || 0,
    errors: result.errors || 0
  };
  const finishedAt = await finishSyncRun(env, runId, summary);
  const total = await verifiedJobCount(env);

  return {
    ok: (result.errors || 0) === 0,
    mode: "listing_catchup_single",
    target,
    total,
    source: source.key,
    started_at: startedAt,
    finished_at: finishedAt,
    jobs_seen: result.jobsSeen || 0,
    jobs_added: result.added || 0,
    jobs_updated: result.updated || 0,
    errors: result.errors || 0,
    result
  };
}

async function runCatchupListingBatch(env, target = CATCHUP_TARGET_JOBS) {
  const activeRun = await activeSyncRun(env);
  if (activeRun) {
    return {
      ok: true,
      skipped: true,
      reason: "sync_already_running",
      active_run_id: activeRun.id,
      active_started_at: activeRun.started_at
    };
  }

  await ensureCatalogSources(env);
  await expirePastDeadlineJobs(env);

  const currentTotal = await verifiedJobCount(env);
  if (currentTotal >= target) {
    return { ok: true, skipped: true, reason: "catchup_target_reached", total: currentTotal };
  }

  const { startedAt, runId } = await beginSyncRun(env);
  let needed = target - currentTotal;
  let jobsSeen = 0;
  let jobsAdded = 0;
  let jobsUpdated = 0;
  let errors = 0;
  let sourcesChecked = 0;
  const results = [];

  for (const key of CATCHUP_SOURCE_ORDER) {
    if (needed <= 0) break;
    const source = successFactorsSourceByKey(key);
    if (!source) continue;

    const result = await syncListingSnapshotSource(env, source, needed);
    sourcesChecked += 1;
    jobsSeen += result.jobsSeen || 0;
    jobsAdded += result.added || 0;
    jobsUpdated += result.updated || 0;
    errors += result.errors || 0;
    needed -= result.added || 0;
    results.push(result);
  }

  if (needed > 0) {
    const discoveryResult = await syncEwdifhDiscoverySource(env, EWDIFH_SOURCE, Math.min(needed, 10));
    sourcesChecked += 1;
    jobsSeen += discoveryResult.jobsSeen || 0;
    jobsAdded += discoveryResult.added || 0;
    jobsUpdated += discoveryResult.updated || 0;
    errors += discoveryResult.errors || 0;
    needed -= discoveryResult.added || 0;
    results.push(discoveryResult);
  }

  await quarantineDiscoveryDuplicates(env);
  const summary = { sourcesChecked, jobsSeen, jobsAdded, jobsUpdated, errors };
  const finishedAt = await finishSyncRun(env, runId, summary);
  const total = await verifiedJobCount(env);

  return {
    ok: total >= target || errors === 0,
    mode: "listing_catchup",
    target,
    total,
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

async function beginSyncRun(env) {
  const startedAt = nowIso();
  const insert = await env.DB.prepare(
    `
      INSERT INTO sync_runs (
        started_at, sources_checked, jobs_seen,
        jobs_added, jobs_updated, errors
      )
      VALUES (?, 0, 0, 0, 0, 0)
    `
  ).bind(startedAt).run();

  return { startedAt, runId: insert.meta?.last_row_id };
}

async function finishSyncRun(env, runId, summary) {
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
    ).bind(
      finishedAt,
      summary.sourcesChecked,
      summary.jobsSeen,
      summary.jobsAdded,
      summary.jobsUpdated,
      summary.errors,
      runId
    ).run();
  }
  return finishedAt;
}

async function runSourceBatch(env, sourceKey) {
  const activeRun = await activeSyncRun(env);
  if (activeRun) {
    return {
      ok: true,
      skipped: true,
      reason: "sync_already_running",
      active_run_id: activeRun.id,
      active_started_at: activeRun.started_at
    };
  }

  const source = successFactorsSourceByKey(sourceKey);
  if (!source) return { ok: false, error: "unknown_source", source: sourceKey };

  await ensureCatalogSources(env);
  await expirePastDeadlineJobs(env);
  await quarantineInvalidMilitaryJobs(env);
  const { startedAt, runId } = await beginSyncRun(env);

  const result = await syncSuccessFactorsSource(env, source, {
    detailFetchBudget: 8,
    detailAttempts: 2
  });

  const rapidResults = [];
  for (const militarySource of MILITARY_NEWS_SOURCES.filter((item) => item.rapid)) {
    rapidResults.push(await syncMilitaryNewsSource(env, militarySource));
  }

  const summary = {
    sourcesChecked: 1 + rapidResults.length,
    jobsSeen: (result.jobsSeen || 0) + rapidResults.reduce((sum, item) => sum + (item.jobsSeen || 0), 0),
    jobsAdded: (result.added || 0) + rapidResults.reduce((sum, item) => sum + (item.added || 0), 0),
    jobsUpdated: (result.updated || 0) + rapidResults.reduce((sum, item) => sum + (item.updated || 0), 0),
    errors: (result.errors || 0) + rapidResults.reduce((sum, item) => sum + (item.errors || 0), 0)
  };

  const finishedAt = await finishSyncRun(env, runId, summary);

  return {
    ok: summary.errors === 0,
    mode: "source_batch",
    source: sourceKey,
    started_at: startedAt,
    finished_at: finishedAt,
    sources_checked: summary.sourcesChecked,
    jobs_seen: summary.jobsSeen,
    jobs_added: summary.jobsAdded,
    jobs_updated: summary.jobsUpdated,
    errors: summary.errors,
    result,
    rapid_military_results: rapidResults
  };
}

async function runSupportBatch(env) {
  const activeRun = await activeSyncRun(env);
  if (activeRun) {
    return {
      ok: true,
      skipped: true,
      reason: "sync_already_running",
      active_run_id: activeRun.id,
      active_started_at: activeRun.started_at
    };
  }

  await ensureCatalogSources(env);
  await expirePastDeadlineJobs(env);
  await quarantineInvalidMilitaryJobs(env);
  const { startedAt, runId } = await beginSyncRun(env);

  let sourcesChecked = 0;
  let jobsSeen = 0;
  let jobsAdded = 0;
  let jobsUpdated = 0;
  let errors = 0;
  let monitorWarnings = 0;
  const results = [];

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

  for (const source of MILITARY_NEWS_SOURCES.filter((item) => !item.rapid)) {
    const result = await syncMilitaryNewsSource(env, source);
    sourcesChecked += 1;
    jobsSeen += result.jobsSeen || 0;
    jobsAdded += result.added || 0;
    jobsUpdated += result.updated || 0;
    errors += result.errors || 0;
    results.push(result);
  }

  const discoveryResult = await syncEwdifhDiscoverySource(env, EWDIFH_SOURCE, 10);
  sourcesChecked += 1;
  jobsSeen += discoveryResult.jobsSeen || 0;
  jobsAdded += discoveryResult.added || 0;
  jobsUpdated += discoveryResult.updated || 0;
  errors += discoveryResult.errors || 0;
  results.push(discoveryResult);

  const discoveryDuplicates = await quarantineDiscoveryDuplicates(env);
  const quarantinedStaleJobs = await quarantineStaleUnverifiedJobs(env);
  await dedupeExistingJobs(env);

  const summary = { sourcesChecked, jobsSeen, jobsAdded, jobsUpdated, errors };
  const finishedAt = await finishSyncRun(env, runId, summary);

  return {
    ok: errors === 0,
    mode: "support_batch",
    started_at: startedAt,
    finished_at: finishedAt,
    sources_checked: sourcesChecked,
    jobs_seen: jobsSeen,
    jobs_added: jobsAdded,
    jobs_updated: jobsUpdated,
    errors,
    monitor_warnings: monitorWarnings,
    discovery_duplicates_hidden: discoveryDuplicates,
    quarantined_stale_jobs: quarantinedStaleJobs,
    results
  };
}

async function runSync(env, options = {}) {
  const sourceKey = clean(options.sourceKey || "");
  if (sourceKey === "ewdifh") {
    const result = await syncEwdifhDiscoverySource(env, EWDIFH_SOURCE, 10);
    await quarantineDiscoveryDuplicates(env);
    return { ok: (result.errors || 0) === 0, mode: "discovery_source", result };
  }
  if (sourceKey) return runSourceBatch(env, sourceKey);
  return runSourceBatch(env, scheduledSourceKeyForMinute(new Date().getUTCMinutes()));
}


const MAX_CONTACT_BODY_BYTES = 16 * 1024;

function securityHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains"
  };
}

function corsHeaders(env) {
  const configuredOrigin = clean(env.CORS_ORIGIN || "");
  const headers = {
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Masaa-Sync-Key",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };

  // Secure default: if CORS_ORIGIN is missing, do not allow cross-origin browser access.
  if (configuredOrigin) headers["Access-Control-Allow-Origin"] = configuredOrigin;
  return headers;
}

function json(data, env, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...securityHeaders(),
      ...corsHeaders(env),
      ...extraHeaders
    }
  });
}

function internalError(error, env) {
  const requestId = crypto.randomUUID();
  console.error("mas3a_request_error", {
    requestId,
    message: clean(error?.message || error)
  });
  return json(
    { ok: false, error: "Internal server error", request_id: requestId },
    env,
    500
  );
}

function requestRateKey(request, scope) {
  const ip = clean(request.headers.get("CF-Connecting-IP"));
  return ip ? `${scope}:${ip}` : null;
}

async function rateLimitAllowed(binding, key) {
  if (!binding || !key) return true;
  try {
    const result = await binding.limit({ key });
    return result?.success !== false;
  } catch (error) {
    // Fail open to avoid an availability outage if the rate limiter itself has an incident.
    console.error("mas3a_rate_limit_error", clean(error?.message || error));
    return true;
  }
}

async function readJsonBodyLimited(request, maxBytes) {
  const declaredLength = Number(request.headers.get("Content-Length") || 0);
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return { ok: false, status: 413, error: "Request body too large" };
  }

  if (!request.body) {
    return { ok: false, status: 400, error: "Invalid JSON" };
  }

  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        return { ok: false, status: 413, error: "Request body too large" };
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return { ok: true, data: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch {
    return { ok: false, status: 400, error: "Invalid JSON" };
  }
}

function parseBoolean(value) {
  if (value === null || value === undefined || value === "") return null;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

function sourceArabicCompany(sourceKey, currentCompany) {
  const source = SUCCESSFACTORS_SOURCES.find((item) => item.key === sourceKey)
    || MILITARY_NEWS_SOURCES.find((item) => item.key === sourceKey)
    || OFFICIAL_LISTING_SOURCES.find((item) => item.key === sourceKey);
  return arabicPublicText(source?.companyAr || source?.company || currentCompany, "الجهة المعلنة", 180);
}

function publicArabicJob(row) {
  const company = sourceArabicCompany(row.source_key, row.company);
  const normalizedCity = normalizeCity(row.city);
  return {
    ...row,
    title: arabicPublicText(row.title, "فرصة وظيفية لدى " + company, 220),
    company,
    city: arabicPublicText(normalizedCity, "غير محددة", 120),
    region: arabicPublicText(row.region, null, 120),
    work_mode: normalizeWorkMode(row.work_mode, Boolean(row.remote)),
    qualification: containsCookieNoise(row.qualification) ? null : arabicPublicText(row.qualification, null, 450),
    specialization: arabicPublicText(row.specialization, null, 180),
    experience: containsCookieNoise(row.experience) ? null : arabicPublicText(row.experience, null, 350),
    summary: arabicPublicText(
      containsCookieNoise(row.summary) ? null : row.summary,
      "فرصة وظيفية لدى " + company + ". راجع رابط التقديم للاطلاع على التفاصيل والمتطلبات.",
      700
    ),
    verification_level: row.source_key === "ewdifh" || row.status === "discovered" ? "discovery" : "official",
    verification_label: row.source_key === "ewdifh" || row.status === "discovered"
      ? "اكتشاف عبر أي وظيفة — رابط التقديم لدى الجهة"
      : "متحقق من المصدر الرسمي"
  };
}

async function listJobs(request, env) {
  const url = new URL(request.url);
  const q = clean(url.searchParams.get("q")).slice(0, 120);
  const city = clean(url.searchParams.get("city")).slice(0, 80);
  const sector = clean(url.searchParams.get("sector")).slice(0, 40);
  const source = clean(url.searchParams.get("source")).slice(0, 80);
  const remote = parseBoolean(url.searchParams.get("remote"));
  const freshGraduate = parseBoolean(url.searchParams.get("fresh_graduate"));
  const noExperience = parseBoolean(url.searchParams.get("no_experience"));
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit")) || 50, 1), 100);
  const offset = Math.min(Math.max(Number(url.searchParams.get("offset")) || 0, 0), 5000);
  const includeExpiredDays = Math.min(Math.max(Number(url.searchParams.get("include_expired_days")) || 0, 0), 90);

  const where = [];
  const values = [];
  where.push(`NOT (
    source_key = 'sang-military'
    AND (
      apply_url IS NULL
      OR (apply_url NOT LIKE 'https://jobs.sang.gov.sa/%' AND apply_url NOT LIKE 'https://jobs.sa/%')
    )
  )`);
  if (includeExpiredDays > 0) {
    where.push(`(status IN ('verified','discovered') OR (status = 'expired' AND date(COALESCE(expires_at, updated_at)) >= date('now', ?)))`);
    values.push(`-${includeExpiredDays} days`);
  } else {
    where.push("status IN ('verified','discovered')");
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
    jobs: (result.results || []).map(publicArabicJob)
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

  const publicStatus = (status) => {
    if (status === "ok") {
      return { status: "ok", label: "يعمل بشكل طبيعي" };
    }

    if (status === "pending") {
      return { status: "pending", label: "بانتظار أول فحص" };
    }

    if (status === "monitor_only" || status === "restricted" || status === "error") {
      return { status: "monitor_only", label: "متابعة رسمية" };
    }

    if (status === "needs_review" || status === "partial") {
      return { status: "pending", label: "تحت التحقق" };
    }

    return { status: "monitor_only", label: "متابعة رسمية" };
  };

  const typeLabels = {
    successfactors: "بوابة توظيف رسمية",
    official_news: "إعلانات رسمية",
    official_portal_monitor: "بوابة رسمية تحت المراقبة",
    official_listing: "قائمة وظائف رسمية",
    discovery_feed: "مصدر اكتشاف للوظائف"
  };

  return {
    ok: true,
    sources: (result.results || []).map((source) => {
      const publicState = publicStatus(source.status);

      return {
        source_key: source.source_key,
        name: arabicPublicText(source.name, "مصدر رسمي", 180),
        url: source.url,
        source_type: source.source_type,
        sector: source.sector,
        enabled: source.enabled,
        supported: source.supported,
        last_checked_at: source.last_checked_at,
        last_success_at: source.last_success_at,
        jobs_seen: source.jobs_seen,
        new_jobs: source.new_jobs,
        error_count: 0,
        last_error: null,
        status: publicState.status,
        status_label: publicState.label,
        source_type_label: typeLabels[source.source_type] || "مصدر رسمي",
        last_error_ar: null
      };
    })
  };
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
        SUM(CASE WHEN status = 'verified' AND date(updated_at) = date('now') THEN 1 ELSE 0 END) AS verified_today,
        SUM(CASE WHEN status = 'discovered' THEN 1 ELSE 0 END) AS discovered,
        COUNT(DISTINCT company) AS active_companies
      FROM jobs
      WHERE status IN ('verified','discovered')
        AND NOT (
          source_key = 'sang-military'
          AND (
            apply_url IS NULL
            OR (apply_url NOT LIKE 'https://jobs.sang.gov.sa/%' AND apply_url NOT LIKE 'https://jobs.sa/%')
          )
        )
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
    `SELECT id, source_key, external_id, title, company, sector, city, region, work_mode, qualification, specialization, experience, salary, published_at, expires_at, summary, source_url, apply_url, remote, fresh_graduate, no_experience, discovered_at, last_checked_at, updated_at FROM jobs WHERE id = ? AND status IN ('verified','discovered') LIMIT 1`
  ).bind(id).first();
  if (!job) return { ok: false, error: "غير موجود" };
  if (job.source_key === "sang-military") {
    const allowed = /^https:\/\/(?:jobs\.sang\.gov\.sa|jobs\.sa)\//i.test(String(job.apply_url || ""));
    if (!allowed) return { ok: false, error: "غير موجود" };
  }
  return { ok: true, job: publicArabicJob(job) };
}

async function sitemapJobs(env) {
  const result = await env.DB.prepare(
    `SELECT id, updated_at
     FROM jobs
     WHERE status IN ('verified','discovered')
       AND NOT (
         source_key = 'sang-military'
         AND (
           apply_url IS NULL
           OR (apply_url NOT LIKE 'https://jobs.sang.gov.sa/%' AND apply_url NOT LIKE 'https://jobs.sa/%')
         )
       )
     ORDER BY COALESCE(updated_at, discovered_at) DESC
     LIMIT 5000`
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

async function verifyTurnstile(request, env, token) {
  if (!env.TURNSTILE_SECRET_KEY) return { ok: true, skipped: true };
  if (!token) return { ok: false, reason: "missing_token" };

  const body = new FormData();
  body.append("secret", env.TURNSTILE_SECRET_KEY);
  body.append("response", token);

  const remoteIp = clean(request.headers.get("CF-Connecting-IP"));
  if (remoteIp) body.append("remoteip", remoteIp);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body
    });

    if (!response.ok) return { ok: false, reason: "verification_unavailable" };
    const result = await response.json();
    return {
      ok: result?.success === true,
      reason: result?.success === true ? null : "challenge_failed"
    };
  } catch (error) {
    console.error("mas3a_turnstile_error", clean(error?.message || error));
    return { ok: false, reason: "verification_unavailable" };
  }
}

async function createContactSubmission(request, env) {
  const contentType = clean(request.headers.get("Content-Type")).toLowerCase();
  if (!contentType.includes("application/json")) {
    return { status: 415, body: { ok: false, error: "Content-Type must be application/json" } };
  }

  const configuredOrigin = env.CORS_ORIGIN || "";
  const origin = request.headers.get("Origin") || "";
  if (configuredOrigin && configuredOrigin !== "*" && origin !== configuredOrigin) {
    return { status: 403, body: { ok: false, error: "Origin not allowed" } };
  }

  const parsedBody = await readJsonBodyLimited(request, MAX_CONTACT_BODY_BYTES);
  if (!parsedBody.ok) {
    return { status: parsedBody.status, body: { ok: false, error: parsedBody.error } };
  }
  const data = parsedBody.data;
  if (clean(data.website)) return { status: 200, body: { ok: true } }; // honeypot

  const turnstileToken = clean(data.turnstile_token || data["cf-turnstile-response"]);
  const turnstile = await verifyTurnstile(request, env, turnstileToken);
  if (!turnstile.ok) {
    return { status: 403, body: { ok: false, error: "Human verification failed" } };
  }

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

  if (!["GET", "POST"].includes(request.method)) {
    return json(
      { ok: false, error: "Method not allowed" },
      env,
      405,
      { "Allow": "GET, POST, OPTIONS" }
    );
  }

  const isPublicApiRead =
    request.method === "GET" &&
    (path === "/jobs" ||
      path.startsWith("/jobs/") ||
      path === "/sources" ||
      path === "/stats");

  if (isPublicApiRead) {
    const allowed = await rateLimitAllowed(
      env.API_RATE_LIMITER,
      requestRateKey(request, "api")
    );
    if (!allowed) {
      return json(
        { ok: false, error: "Too many requests" },
        env,
        429,
        { "Retry-After": "60" }
      );
    }
  }

  if (request.method === "POST" && (path === "/contact" || path === "/sync")) {
    const allowed = await rateLimitAllowed(
      env.WRITE_RATE_LIMITER,
      requestRateKey(request, path === "/contact" ? "contact" : "sync")
    );
    if (!allowed) {
      return json(
        { ok: false, error: "Too many requests" },
        env,
        429,
        { "Retry-After": "60" }
      );
    }
  }

  if (request.method === "GET" && path === "/") {
    return json({ ok: true, service: "Masaa Jobs API" }, env);
  }

  if (request.method === "GET" && path === "/health") {
    return json({ ok: true }, env, 200, { "Cache-Control": "no-store" });
  }

  if (request.method === "GET" && path.startsWith("/jobs/") && path.length > 6) {
    try {
      const id = decodeURIComponent(path.slice(6));
      const result = await getJobById(id, env);
      return json(result, env, result.ok ? 200 : 404);
    } catch (error) {
      return internalError(error, env);
    }
  }

  if (request.method === "GET" && path === "/sitemap") {
    try { return json(await sitemapJobs(env), env); }
    catch (error) { return internalError(error, env); }
  }

  if (request.method === "POST" && path === "/contact") {
    try {
      const result = await createContactSubmission(request, env);
      return json(result.body, env, result.status);
    } catch (error) {
      return internalError(error, env);
    }
  }

  if (request.method === "GET" && path === "/jobs") {
    try {
      return json(await listJobs(request, env), env);
    } catch (error) {
      return internalError(error, env);
    }
  }

  if (request.method === "GET" && path === "/sources") {
    try {
      return json(await listSources(env), env);
    } catch (error) {
      return internalError(error, env);
    }
  }

  if (request.method === "GET" && path === "/stats") {
    try {
      return json(await stats(env), env);
    } catch (error) {
      return internalError(error, env);
    }
  }

  if (request.method === "POST" && path === "/sync") {
    if (!env.SYNC_SECRET) return json({ ok: false, error: "SYNC_SECRET is not configured" }, env, 503);
    if (!isSyncAuthorized(request, env)) return json({ ok: false, error: "Unauthorized" }, env, 401);
    try {
      const sourceKey = clean(url.searchParams.get("source"));
      const catchup = url.searchParams.get("catchup") === "1";
      const result = catchup
        ? await runCatchupListingBatch(env, CATCHUP_TARGET_JOBS)
        : await runSync(env, { sourceKey });
      return json(result, env, result.ok ? 200 : 207);
    } catch (error) {
      return internalError(error, env);
    }
  }

  return json({ ok: false, error: "Not found" }, env, 404);
}

export { discoverJobUrls, discoverArticleUrls, extractMilitaryAnnouncement, extractListingCandidates, pageExplicitlyHasNoJobs, externalIdFromUrl, normalizeDigits, parseDate, isAllowedOfficialUrl, stableTextId, successFactorsSearchUrls, scheduledSourceKeyForMinute, catchupSourceKeyForMinute };

export default {
  async fetch(request, env) {
    return handleRequest(request, env);
  },

  async scheduled(controller, env, ctx) {
    ctx.waitUntil((async () => {
      const totalJobs = await verifiedJobCount(env);

      if (totalJobs < CATCHUP_TARGET_JOBS) {
        const minute = new Date(controller.scheduledTime).getUTCMinutes();
        return runCatchupListingSourceBatch(
          env,
          catchupSourceKeyForMinute(minute),
          CATCHUP_TARGET_JOBS
        );
      }

      if (controller.cron === "17 * * * *") {
        return runSupportBatch(env);
      }

      const minute = new Date(controller.scheduledTime).getUTCMinutes();
      return runSourceBatch(env, scheduledSourceKeyForMinute(minute));
    })());
  }};
