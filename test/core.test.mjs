import test from "node:test";
import assert from "node:assert/strict";
import {
  discoverJobUrls,
  extractListingCandidates,
  pageExplicitlyHasNoJobs,
  externalIdFromUrl,
  normalizeDigits,
  parseDate,
  isAllowedOfficialUrl,
  stableTextId,
  successFactorsSearchUrls,
  scheduledSourceKeyForMinute
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
