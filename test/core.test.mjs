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
  TELEGRAM_CHANNEL_IDENTITY_PREVIEW_KEY
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


test("discovers only strong official SPA military recruitment announcements", () => {
  const source = {
    key: "spa-military",
    host: "www.spa.gov.sa",
    company: "الجهات العسكرية السعودية",
    sector: "عسكري",
    articlePath: /^\/N\d+$/i,
    applyHosts: ["jobs.sa", "tajnid.mod.gov.sa", "jobs.sang.gov.sa"],
    listingKeywords: ["فتح باب", "القبول والتسجيل"],
    excludeKeywords: ["نتائج", "المرشحين"],
    keywords: ["فتح باب", "القبول والتسجيل"]
  };
  const html = [
    '<a href="/N300001">فتح باب القبول والتسجيل الموحد على رتبة جندي</a>',
    '<a href="/N300002">نتائج المرشحين للقبول والتسجيل</a>',
    '<a href="https://evil.example/N300003">فتح باب القبول والتسجيل</a>'
  ].join("");
  assert.deepEqual(
    discoverArticleUrls(html, source, "https://www.spa.gov.sa/news/latest-news?page=1"),
    ["https://www.spa.gov.sa/N300001"]
  );
});

test("accepts a SPA recruitment announcement only with an official apply link", () => {
  const source = {
    key: "spa-military",
    host: "www.spa.gov.sa",
    company: "الجهات العسكرية السعودية",
    sector: "عسكري",
    listingUrls: ["https://www.spa.gov.sa/news/latest-news?page=1"],
    articlePath: /^\/N\d+$/i,
    applyHosts: ["jobs.sa", "tajnid.mod.gov.sa", "jobs.sang.gov.sa"],
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
  assert.equal(url.searchParams.get("v"), "3.33.0-channel-company-logo-cards");
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
