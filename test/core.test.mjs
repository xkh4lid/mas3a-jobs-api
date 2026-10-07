import test from "node:test";
import assert from "node:assert/strict";
import {
  discoverJobUrls,
  discoverArticleUrls,
  extractMilitaryAnnouncement,
  extractListingCandidates,
  pageExplicitlyHasNoJobs,
  externalIdFromUrl,
  normalizeDigits,
  parseDate,
  isAllowedOfficialUrl,
  stableTextId,
  successFactorsSearchUrls,
  scheduledSourceKeyForMinute,
  isIncompleteArabicJobTitle,
  jobTitleOverrideFromUrl,
  telegramJobCardSvg,
  telegramCompanyDomain,
  telegramCompanyLogoCandidateUrls,
  telegramJobCardUrl,
  telegramShareUrl,
  telegramChannelJobText,
  telegramSafeJobDetail,
  telegramPhotoFormData,
  TELEGRAM_CHANNEL_IDENTITY_PREVIEW_KEY,
  TELEGRAM_CHANNEL_GROWTH_WELCOME_KEY
} from "../src/index.js";

const sf = { host: "careers.example.sa", listingUrls: ["https://careers.example.sa/viewalljobs/"] };

test("discovers only official SuccessFactors job detail URLs", () => {
  const html = '<a href="/job/Riyadh-Engineer/12345/">ok</a><a href="https://evil.example/job/Fake/99999/">bad</a>';
  assert.deepEqual(discoverJobUrls(html, sf, sf.listingUrls[0]), ["https://careers.example.sa/job/Riyadh-Engineer/12345/"]);
});

test("recognizes explicit empty official listing", () => {
  assert.equal(pageExplicitlyHasNoJobs("<p>There are currently no open positions</p>"), true);
  assert.equal(pageExplicitlyHasNoJobs("<p>Careers</p>"), false);
});

test("normalizes Arabic and Persian digits and parses DMY dates", () => {
  assert.equal(normalizeDigits("١٢۳"), "123");
  assert.equal(parseDate("١٢/٠٩/٢٠٢٦"), "2026-09-12");
});

test("extracts stable external IDs from official job URLs", () => {
  assert.equal(externalIdFromUrl("https://careers.example.sa/job/X/1368425923/"), "1368425923");
});

test("rejects non-HTTPS and non-official application URLs", () => {
  assert.equal(isAllowedOfficialUrl("https://careers.example.sa/job/X/12345/", sf), true);
  assert.equal(isAllowedOfficialUrl("http://careers.example.sa/job/X/12345/", sf), false);
  assert.equal(isAllowedOfficialUrl("https://evil.example/job/X/12345/", sf), false);
});

test("creates stable IDs for title-based official listings", () => {
  assert.equal(stableTextId("moh-current", "إعلان طبي ١"), stableTextId("moh-current", "إعلان طبي ١"));
  assert.notEqual(stableTextId("moh-current", "إعلان طبي ١"), stableTextId("moh-current", "إعلان طبي ٢"));
});


test("keeps explicitly scoped official search URLs without broadening globally", () => {
  const source = {
    host: "careers.example.sa",
    listingUrls: ["https://careers.example.sa/viewalljobs/"],
    searchUrls: ["https://careers.example.sa/search/?q=&locationsearch=SA"]
  };

  assert.deepEqual(
    successFactorsSearchUrls(source),
    ["https://careers.example.sa/search/?q=&locationsearch=SA"]
  );
});


test("shards scheduled source syncs across five-minute slots", () => {
  assert.equal(scheduledSourceKeyForMinute(35), "alfanar");
  assert.equal(scheduledSourceKeyForMinute(40), "acwa-power");
  assert.equal(scheduledSourceKeyForMinute(45), "tasnee");
});


test("extracts official listing candidates without fetching every detail page", () => {
  const source = {
    key: "example",
    host: "careers.example.sa",
    company: "Example",
    sector: "خاص",
    listingUrls: ["https://careers.example.sa/search/?q=&locationsearch=SA"]
  };
  const html = `
    <tr class="data-row">
      <td><a href="/job/Riyadh-Data-Engineer/123456/">Data Engineer</a></td>
      <td>Riyadh, Saudi Arabia</td>
      <td>Oct 6, 2026</td>
    </tr>
  `;
  const jobs = extractListingCandidates(html, source, source.listingUrls[0]);
  assert.equal(jobs.length, 1);
  assert.equal(jobs[0].external_id, "123456");
  assert.equal(jobs[0].title, "Data Engineer");
  assert.equal(jobs[0].city, "الرياض");
  assert.equal(jobs[0].published_at, "2026-10-06");
});


test("discovers legacy and modern official SPA military recruitment announcements", () => {
  const source = {
    key: "spa-military",
    host: "www.spa.gov.sa",
    company: "الجهات العسكرية السعودية",
    sector: "عسكري",
    articlePath: /^\/(?:ar\/)?N\d+$/i,
    applyHosts: ["jobs.sa", "tajnid.mod.gov.sa", "jobs.sang.gov.sa", "afca.mod.gov.sa"],
    listingKeywords: ["فتح باب", "القبول والتسجيل"],
    excludeKeywords: ["نتائج", "المرشحين"],
    keywords: ["فتح باب", "القبول والتسجيل"]
  };
  const html = [
    '<a href="/N300001">فتح باب القبول والتسجيل الموحد على رتبة جندي</a>',
    '<a href="/ar/N300004">فتح باب القبول والتسجيل في القوات المسلحة</a>',
    '<a href="/ar/N300002">نتائج المرشحين للقبول والتسجيل</a>',
    '<a href="https://evil.example/ar/N300003">فتح باب القبول والتسجيل</a>'
  ].join("");
  assert.deepEqual(
    discoverArticleUrls(html, source, "https://www.spa.gov.sa/news/latest-news?page=1"),
    ["https://www.spa.gov.sa/N300001", "https://www.spa.gov.sa/ar/N300004"]
  );
});

test("accepts a SPA recruitment announcement only with an official apply link", () => {
  const source = {
    key: "spa-military",
    host: "www.spa.gov.sa",
    company: "الجهات العسكرية السعودية",
    sector: "عسكري",
    listingUrls: ["https://www.spa.gov.sa/news/latest-news?page=1"],
    articlePath: /^\/(?:ar\/)?N\d+$/i,
    applyHosts: ["jobs.sa", "tajnid.mod.gov.sa", "jobs.sang.gov.sa", "afca.mod.gov.sa"],
    keywords: ["فتح باب", "القبول والتسجيل"],
    excludeKeywords: ["نتائج", "المرشحين"]
  };
  const html = '<h1>فتح باب القبول والتسجيل الموحد بقطاعات وزارة الداخلية</h1><p>أعلنت وزارة الداخلية فتح باب القبول والتسجيل.</p><a href="https://jobs.sa/">التقديم</a>';
  const job = extractMilitaryAnnouncement(html, source, "https://www.spa.gov.sa/N300001");
  assert.ok(job);
  assert.equal(job.external_id, "N300001");
  assert.equal(job.company, "وزارة الداخلية");
  assert.equal(job.apply_url, "https://jobs.sa/");
});


test("accepts a modern SPA article with an official MOD admissions link", () => {
  const source = {
    key: "spa-military",
    host: "www.spa.gov.sa",
    company: "الجهات العسكرية السعودية",
    sector: "عسكري",
    listingUrls: ["https://www.spa.gov.sa/news/latest-news?page=1"],
    articlePath: /^\/(?:ar\/)?N\d+$/i,
    applyHosts: ["jobs.sa", "tajnid.mod.gov.sa", "jobs.sang.gov.sa", "afca.mod.gov.sa"],
    keywords: ["فتح باب", "القبول والتسجيل"],
    excludeKeywords: ["نتائج", "المرشحين"]
  };
  const html = '<h1>فتح باب القبول والتسجيل في القوات المسلحة</h1><p>أعلنت وزارة الدفاع فتح باب القبول والتسجيل.</p><a href="https://afca.mod.gov.sa/">التقديم</a>';
  const job = extractMilitaryAnnouncement(html, source, "https://www.spa.gov.sa/ar/N300004");
  assert.ok(job);
  assert.equal(job.external_id, "N300004");
  assert.equal(job.company, "وزارة الدفاع");
  assert.equal(job.apply_url, "https://afca.mod.gov.sa/");
});


test("rejects incomplete Arabic job titles that end with dangling connectors", () => {
  assert.equal(isIncompleteArabicJobTitle("متخصصة في أمن المرضى و"), true);
  assert.equal(isIncompleteArabicJobTitle("مدير تطوير الأعمال في"), true);
  assert.equal(isIncompleteArabicJobTitle("أخصائي إدارة المخاطر وسلامة المرضى"), false);
});

test("repairs known JHAH patient safety titles from the official job URL", () => {
  assert.equal(
    jobTitleOverrideFromUrl("https://careers.jhah.com/job/Dhahran-ERM-&-PATIENT-SAFETY-SPECIALIST_/1368463323/"),
    "أخصائي إدارة المخاطر وسلامة المرضى"
  );
  assert.equal(
    jobTitleOverrideFromUrl("https://careers.jhah.com/job/Dhahran-ASSOCIATE-ERM-&-PATIENT-SAFETY-PROFESSIONAL_/857146123/"),
    "أخصائي مشارك في إدارة المخاطر وسلامة المرضى"
  );
});


test("renders a safe dynamic Telegram SVG job card", () => {
  const svg = telegramJobCardSvg({
    id: "job-1",
    title: "مهندس <اختبار>",
    company: "شركة & موثوقة",
    city: "الرياض",
    sector: "خاص",
    expires_at: "2026-10-31"
  });
  assert.match(svg, /^<svg /);
  assert.match(svg, /مهندس &lt;اختبار&gt;/);
  assert.match(svg, /شركة &amp; موثوقة/);
  assert.doesNotMatch(svg, /<اختبار>/);
  assert.match(svg, /التقديم من المصدر الرسمي/);
  assert.match(svg, /متحقق من المصدر الرسمي/);
  assert.match(svg, /id="masaaMint"/);
  assert.match(svg, /id="masaaGold"/);
  assert.match(svg, /fill="url\(#masaaBg\)"/);
  assert.match(svg, /translate\(250\.00,18\.00\)/);
});


test("resolves company domains for Telegram card logos", () => {
  assert.equal(telegramCompanyDomain({ source_key: "acwa-power", company: "ACWA Power" }), "acwapower.com");
  assert.equal(telegramCompanyDomain({ company: "وزارة الدفاع", apply_url: "https://tajnid.mod.gov.sa/" }), "mod.gov.sa");
  assert.equal(telegramCompanyDomain({ company: "شركة مثال", apply_url: "https://careers.example.sa/job/1" }), "example.sa");
});

test("embeds a safe company mark in the Telegram SVG when provided", () => {
  const svg = telegramJobCardSvg(
    { title: "مهندس", company: "شركة مثال", city: "الرياض", sector: "خاص" },
    "data:image/png;base64,AAAA"
  );
  assert.match(svg, /<image /);
  assert.match(svg, /data:image\/png;base64,AAAA/);
  assert.match(svg, /Noto Kufi Arabic/);
});


test("wraps long Telegram job titles without overflowing the card", () => {
  const svg = telegramJobCardSvg({
    title: "أخصائي أول في إدارة المخاطر وسلامة المرضى وتطوير جودة الخدمات الصحية",
    company: "شركة مثال",
    city: "الرياض",
    sector: "خاص",
    expires_at: "2026-10-31"
  });
  const titleLines = [...svg.matchAll(/font-size="44"[^>]*>([^<]+)<\/text>/g)].map((match) => match[1]);
  assert.ok(titleLines.length >= 1 && titleLines.length <= 2);
  assert.ok(titleLines.every((line) => line.length <= 36));
});


test("versions Telegram job-card URLs to bypass stale Telegram and edge caches", () => {
  const url = new URL(telegramJobCardUrl({}, { id: "job-123" }));
  assert.equal(url.searchParams.get("job"), "job-123");
  assert.equal(url.searchParams.get("v"), "3.34.2-direct-telegram-photo-upload");
});


test("uses a fixed one-time Telegram channel preview marker", () => {
  assert.equal(
    TELEGRAM_CHANNEL_IDENTITY_PREVIEW_KEY,
    "channel_identity_preview_2026_10_07_v1"
  );
});


test("builds high-quality official logo candidates before Google favicon fallback", () => {
  assert.deepEqual(
    telegramCompanyLogoCandidateUrls("example.sa"),
    [
      "https://example.sa/apple-touch-icon.png",
      "https://example.sa/favicon-192x192.png",
      "https://example.sa/favicon.png",
      "https://www.google.com/s2/favicons?domain_url=https%3A%2F%2Fexample.sa&sz=256"
    ]
  );
});

test("does not treat recruitment platforms as company logo domains", () => {
  assert.equal(
    telegramCompanyDomain({
      company: "شركة مثال",
      apply_url: "https://example.wd3.myworkdayjobs.com/job/123"
    }),
    ""
  );
});


test("builds Telegram share URLs only for real Telegram channel links", () => {
  const share = new URL(telegramShareUrl("https://t.me/masaa_jobs", "وظيفة جديدة"));
  assert.equal(share.hostname, "t.me");
  assert.equal(share.pathname, "/share/url");
  assert.equal(share.searchParams.get("url"), "https://t.me/masaa_jobs");
  assert.equal(share.searchParams.get("text"), "وظيفة جديدة");
  assert.equal(telegramShareUrl("https://example.com/channel", "x"), "");
});

test("uses a fixed one-time growth welcome marker", () => {
  assert.equal(
    TELEGRAM_CHANNEL_GROWTH_WELCOME_KEY,
    "channel_growth_welcome_2026_10_v1"
  );
});


test("hides malformed qualification and experience values from Telegram captions", () => {
  assert.equal(telegramSafeJobDetail("&", "qualification"), "");
  assert.equal(
    telegramSafeJobDetail("ما يجعلنا أكثر ابتكارًا وتقوية لكل عضو في الفريق لتعلم وتطور وتأثير.", "experience"),
    ""
  );
  assert.equal(
    telegramSafeJobDetail("درجة البكالوريوس في المحاسبة", "qualification"),
    "درجة البكالوريوس في المحاسبة"
  );
  assert.equal(
    telegramSafeJobDetail("3 سنوات من الخبرة في الخزينة", "experience"),
    "3 سنوات من الخبرة في الخزينة"
  );
});

test("SPIMACO-style malformed fields do not leak into Telegram job text", () => {
  const text = telegramChannelJobText({
    title: "مدير مالية شركات",
    company: "سبيماكو الدوائية",
    sector: "خاص",
    qualification: "&",
    experience: "ما يجعلنا أكثر ابتكارًا وتقوية لكل عضو في الفريق لتعلم وتطور وتأثير."
  });
  assert.doesNotMatch(text, /المؤهل:/);
  assert.doesNotMatch(text, /الخبرة:/);
  assert.match(text, /مدير مالية شركات/);
  assert.match(text, /سبيماكو الدوائية/);
});


test("builds multipart Telegram photo uploads with PNG bytes and caption", async () => {
  const form = telegramPhotoFormData(
    "-100123",
    new Uint8Array([137, 80, 78, 71, 1, 2, 3]),
    "وظيفة موثقة",
    [[{ text: "التقديم", url: "https://example.sa/job" }]]
  );
  assert.equal(form.get("chat_id"), "-100123");
  assert.equal(form.get("caption"), "وظيفة موثقة");
  assert.match(String(form.get("reply_markup")), /inline_keyboard/);
  const photo = form.get("photo");
  assert.ok(photo instanceof Blob);
  assert.equal(photo.type, "image/png");
  assert.equal(photo.name, "masaa-job.png");
});
