import test from "node:test";
import assert from "node:assert/strict";
import { jobCardSvg, lines } from "../src/card.mjs";

test("wraps Arabic title into at most two lines", () => {
  const result = lines("مدير مالية شركات أول في المملكة العربية السعودية", 18, 2);
  assert.ok(result.length >= 1 && result.length <= 2);
});

test("renders approved Masaa palette and verified label", () => {
  const svg = jobCardSvg({
    id: "x",
    title: "محاسب مالي",
    company: "شركة تجريبية",
    city: "الرياض",
    sector: "خاص"
  });
  assert.match(svg, /#F6B744/);
  assert.match(svg, /متحقق من المصدر الرسمي/);
  assert.match(svg, /مَسعى — التقديم يتم لدى الجهة المعلنة/);
});

test("escapes untrusted job text", () => {
  const svg = jobCardSvg({ title: "<script>x</script>", company: "A&B" });
  assert.doesNotMatch(svg, /<script>/);
  assert.match(svg, /A&amp;B/);
});
