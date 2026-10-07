import test from "node:test";
import assert from "node:assert/strict";
import {
  hasMilitarySignal,
  isClosedText,
  isChallengeText,
  isAuthText,
  isAllowedHttpsUrl,
  hostnameMatches,
  looksLikeOfficialArticle
} from "../probe.mjs";

test("detects Arabic military recruitment signals", () => {
  assert.equal(hasMilitarySignal("تعلن الجهة فتح باب القبول والتسجيل على رتبة جندي"), true);
  assert.equal(hasMilitarySignal("خبر ثقافي عن معرض كتاب"), false);
});

test("detects closed announcements", () => {
  assert.equal(isClosedText("انتهت فترة التقديم يوم الخميس"), true);
  assert.equal(isClosedText("التقديم متاح الآن"), false);
});

test("detects challenge and auth pages without bypassing them", () => {
  assert.equal(isChallengeText("Verify you are human - CAPTCHA"), true);
  assert.equal(isAuthText("اسم المستخدم كلمة المرور تسجيل الدخول"), true);
});

test("accepts only configured HTTPS official hosts", () => {
  assert.equal(isAllowedHttpsUrl("https://jobs.sa/apply/123", ["jobs.sa"]), true);
  assert.equal(isAllowedHttpsUrl("http://jobs.sa/apply/123", ["jobs.sa"]), false);
  assert.equal(isAllowedHttpsUrl("https://jobs.sa.evil.example/apply/123", ["jobs.sa"]), false);
  assert.equal(hostnameMatches("sub.jobs.sa", ["jobs.sa"]), true);
});

test("recognizes current SANG and SPA article path shapes", () => {
  const sang = {
    key: "sang-news",
    officialHosts: ["www.sang.gov.sa", "sang.gov.sa"]
  };
  const spa = {
    key: "spa-military",
    officialHosts: ["www.spa.gov.sa", "spa.gov.sa"]
  };

  assert.equal(
    looksLikeOfficialArticle(
      "https://www.sang.gov.sa/MediaAffairs/MONGNews/2026/Pages/test.aspx",
      sang
    ),
    true
  );
  assert.equal(
    looksLikeOfficialArticle("https://www.spa.gov.sa/ar/N2585737", spa),
    true
  );
});
