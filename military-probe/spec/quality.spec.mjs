import test from "node:test";
import assert from "node:assert/strict";
import { assessMilitaryAnnouncement, extractGregorianApplicationWindow } from "../quality.mjs";

const posted = "أعلنت وزارة الداخلية عن فتح باب القبول والتسجيل للوظائف العسكرية على رتبة جندي ";
const windowText = "وسيتم استقبال طلبات القبول خلال الفترة من يوم الاثنين الموافق 05/10/2026 م حتى يوم الاثنين الموافق 12/10/2026 م عبر منصة أبشر توظيف.";
const now = new Date("2026-10-08T09:00:00Z");
const valid = {
  title: "فتح باب القبول والتسجيل للخدمة العسكرية",
  text: posted + windowText,
  sourceTrusted: true,
  responseStatus: 200,
  applyLinks: [{url:"https://jobs.sa/"}],
  now
};

test("extracts Gregorian application start and end dates explicitly", () => {
  assert.deepEqual(
    extractGregorianApplicationWindow(windowText),
    { start:"2026-10-05", end:"2026-10-12", evidence:"explicit_gregorian_window" }
  );
});

test("accepts only an explicitly current official application period", () => {
  const result = assessMilitaryAnnouncement(valid);
  assert.equal(result.status, "open_window_confirmed");
  assert.equal(result.publishable, true);
  assert.deepEqual(result.reasons, []);
});

test("does not treat expired military recruitment as open", () => {
  const result = assessMilitaryAnnouncement({
    ...valid,
    text: posted + "سيتم استقبال طلبات القبول من 02/08/2025 حتى 07/08/2025 عن طريق أبشر توظيف."
  });
  assert.equal(result.publishable, false);
  assert.equal(result.status, "closed_or_expired");
  assert.ok(result.reasons.includes("application_deadline_passed"));
});

test("does not treat future recruitment periods as open", () => {
  const result = assessMilitaryAnnouncement({
    ...valid,
    text: posted + "سيتم استقبال طلبات القبول من 15/10/2026 حتى 20/10/2026."
  });
  assert.equal(result.publishable, false);
  assert.equal(result.status, "upcoming");
});

test("rejects Hijri-only announcements until date conversion is verified", () => {
  const result = assessMilitaryAnnouncement({
    ...valid,
    text: "تعلن وزارة الحرس الوطني فتح باب القبول والتسجيل للالتحاق بالخدمة العسكرية من 09/11/1447هـ حتى 13/11/1447هـ."
  });
  assert.equal(result.publishable, false);
  assert.equal(result.status, "needs_review");
  assert.ok(result.reasons.includes("application_window_unverified"));
});

test("does not promote a closing date without evidence of an opening", () => {
  const result = assessMilitaryAnnouncement({
    ...valid,
    text: posted + "آخر موعد للتقديم 12/10/2026 م."
  });
  assert.equal(result.publishable, false);
  assert.ok(result.reasons.includes("application_window_unverified"));
});

test("does not promote unrelated military news or preliminary acceptance results", () => {
  for (const title of [
    "وزير الحرس الوطني يزور الوحدات العسكرية",
    "نتائج القبول المبدئي للوظائف العسكرية"
  ]) {
    const result = assessMilitaryAnnouncement({...valid,title,
      text: title === "نتائج القبول المبدئي للوظائف العسكرية"
        ? posted + windowText
        : "يعلن الحرس الوطني تفاصيل زيارة الوزير للوحدات العسكرية."});
    assert.equal(result.publishable,false);
  }
});

test("never publishes if official link, source or HTTP eligibility fails", () => {
  assert.equal(assessMilitaryAnnouncement({...valid,applyLinks:[]}).publishable,false);
  assert.equal(assessMilitaryAnnouncement({...valid,sourceTrusted:false}).publishable,false);
  assert.equal(assessMilitaryAnnouncement({...valid,responseStatus:403}).publishable,false);
  assert.equal(assessMilitaryAnnouncement({...valid,closed:true}).publishable,false);
  assert.equal(assessMilitaryAnnouncement({...valid,challenge:true}).publishable,false);
  assert.equal(assessMilitaryAnnouncement({...valid,auth:true}).publishable,false);
});

test("rejects invalid calendar date fields", () => {
  const result = assessMilitaryAnnouncement({
    ...valid,
    text: posted + "التقديم من 31/02/2026 حتى 35/10/2026."
  });
  assert.equal(result.publishable,false);
});
