import test from "node:test";
import assert from "node:assert/strict";
import { extractUquFundJobs } from "../src/index.js";

const source = {
  key: "uqu-scholarships-fund",
  url: "https://uqu.edu.sa/studaff/152230"
};

test("extracts only two current UQU charity-fund applications from official URLs", () => {
  const html = `
    <h3>للتقديم على وظائف الصندوق الخيري :</h3>
    <h4>وظيفة محاسب</h4><a href="/studaff/App/Forms/Show/145015">إضغط هنا</a>
    <h4>وظيفة مشرف برامج ومشاريع</h4><a href="/studaff/App/Forms/Show/145115">إضغط هنا</a>
  `;
  const result = extractUquFundJobs(html, source);
  assert.equal(result.parsed, true);
  assert.equal(result.jobs.length, 2);
  assert.equal(result.jobs[0].title, "محاسب");
  assert.equal(result.jobs[1].title, "مشرف برامج ومشاريع");
  assert.ok(result.jobs.every(x => x.sector === "حكومي"));
  assert.ok(result.jobs.every(x => x.apply_url.startsWith("https://uqu.edu.sa/")));
  assert.ok(result.jobs.every(x => x.expires_at === "2026-10-31"));
});

test("does not invent jobs when official application links disappear", () => {
  const result = extractUquFundJobs("<h3>للتقديم على وظائف الصندوق الخيري</h3>وظيفة محاسب", source);
  assert.equal(result.jobs.length, 0);
  assert.equal(result.explicitNoJobs, false);
});
