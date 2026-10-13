import test from "node:test";
import assert from "node:assert/strict";
import { publicArabicJob, jobTitleOverrideFromUrl, sanitizeExperienceField, sanitizeQualificationField } from "../src/index.js";

test("corrects known official job titles without relying on machine translation", () => {
  assert.equal(jobTitleOverrideFromUrl("https://careers.saudia.com/job/Flight-Attendant/857305023/"), "مضيف أو مضيفة طيران");
  assert.equal(jobTitleOverrideFromUrl("https://careers.kaust.edu.sa/job/Events-Coordinator/1444286133/"), "منسق فعاليات");
  assert.equal(jobTitleOverrideFromUrl("https://example.com/job/Unrelated/12345/"), null);
});

test("derives city from official job slug only when stored location is country-wide", () => {
  const job = publicArabicJob({
    source_key: "alfanar", company: "الفنار", title: "مهندس مدني",
    city: "السعودية", status: "verified",
    source_url: "https://jobs.alfanar.com/alfanar/job/Riyadh-QAQC-Civil-Engineer-alfanar-Building-Systems/1435141833/"
  });
  assert.equal(job.city, "الرياض");
});

test("does not replace a precise stored city", () => {
  const job = publicArabicJob({
    source_key: "alfanar", company: "الفنار", title: "مهندس مدني",
    city: "جدة", status: "verified",
    source_url: "https://jobs.alfanar.com/alfanar/job/Riyadh-QAQC-Civil-Engineer/1435141833/"
  });
  assert.equal(job.city, "جدة");
});

test("rejects obvious field contamination", () => {
  assert.equal(sanitizeExperienceField("مستوى × / المهندسين المدنيين"), null);
  assert.equal(sanitizeQualificationField(": الحد الأدنى"), null);
});
