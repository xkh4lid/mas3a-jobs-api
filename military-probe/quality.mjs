// Publication eligibility for public official military announcements.
// This module is intentionally conservative: discovery never equals "open".
const RECRUITMENT_INTENT = [
  /فتح\s+باب\s+(?:القبول|التسجيل|التقديم)/u,
  /بدء\s+(?:استقبال|التقديم|التسجيل)\s+(?:طلبات|على|لل)/u,
  /استقبال\s+طلبات\s+(?:القبول|التجنيد)/u,
  /التقديم\s+(?:متاح|مفتوح)/u,
  /التسجيل\s+(?:متاح|مفتوح)/u
];

const MILITARY_CONTEXT = /(?:عسكري|العسكرية|التجنيد|وزارة\s+الدفاع|وزارة\s+الداخلية|الحرس\s+الوطني|الأمن\s+العام|القوات\s+المسلحة|القبول\s+المركزي|رتبة\s+(?:جندي|عريف|رقيب|وكيل))/u;
const RESULTS_ONLY = /(?:نتائج\s+القبول|القبول\s+المبدئي|الترشيح\s+المبدئي|أسماء\s+المرشحين|مواعيد\s+المطابقة)/u;
const GREGORIAN_DATE = String.raw`(\d{1,2})\s*[/-]\s*(\d{1,2})\s*[/-]\s*(20\d{2})`;
const DATE_RANGE = new RegExp(
  String.raw`(?:\bمن\b|ابتداءً?\s+من|اعتبارًا\s+من)[\s\S]{0,180}?${GREGORIAN_DATE}[\s\S]{0,250}?(?:حتى|إلى|وينتهي|وتنتهي)[\s\S]{0,180}?${GREGORIAN_DATE}`,
  "u"
);
const CLOSING_DATE = new RegExp(
  String.raw`(?:آخر\s+موعد\s+(?:للتقديم|للتسجيل)|نهاية\s+(?:التقديم|التسجيل)|ينتهي\s+التقديم\s+(?:يوم|في)?|حتى\s+تاريخ)[\s\S]{0,90}?${GREGORIAN_DATE}`,
  "u"
);

function dateFromDmy(day, month, year) {
  const d = Number(day);
  const m = Number(month);
  const y = Number(year);
  if (y < 2020 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31) return null;
  const candidate = new Date(Date.UTC(y, m - 1, d, 12));
  if (candidate.getUTCDate() !== d || candidate.getUTCMonth() !== m - 1 || candidate.getUTCFullYear() !== y) return null;
  return `${year}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function extractGregorianApplicationWindow(text) {
  const source = String(text || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
  const match = source.match(DATE_RANGE);
  if (match) {
    const start = dateFromDmy(match[1], match[2], match[3]);
    const end = dateFromDmy(match[4], match[5], match[6]);
    if (start && end && start <= end && end >= "2020-01-01") {
      return { start, end, evidence: "explicit_gregorian_window" };
    }
  }
  // A closing date by itself is NOT enough to certify that applications have
  // actually opened. We retain it for expiry/review classification only.
  const closing = source.match(CLOSING_DATE);
  if (closing) {
    const end = dateFromDmy(closing[1], closing[2], closing[3]);
    if (end) return { start: null, end, evidence: "closing_date_only" };
  }
  return { start: null, end: null, evidence: "no_explicit_gregorian_window" };
}

export function assessMilitaryAnnouncement({
  title = "",
  text = "",
  sourceTrusted = false,
  responseStatus = null,
  closed = false,
  challenge = false,
  auth = false,
  applyLinks = [],
  now = new Date()
}) {
  const heading = String(title || "").replace(/\s+/g, " ");
  const body = String(text || "").replace(/\s+/g, " ");
  const focused = heading + " " + body.slice(0, 3500);
  const intent = RECRUITMENT_INTENT.some((pattern) => pattern.test(focused)) &&
    MILITARY_CONTEXT.test(focused) &&
    !RESULTS_ONLY.test(heading);

  const window = extractGregorianApplicationWindow(focused);
  const day = now.toISOString().slice(0, 10);
  const reasons = [];
  if (!sourceTrusted) reasons.push("untrusted_source");
  if (responseStatus !== null && (responseStatus < 200 || responseStatus >= 400)) reasons.push("bad_http_status");
  if (!intent) reasons.push("missing_recruitment_intent");
  if (closed) reasons.push("explicitly_closed");
  if (challenge) reasons.push("access_challenge");
  if (auth) reasons.push("authentication_required");
  if (!Array.isArray(applyLinks) || applyLinks.length === 0) reasons.push("missing_official_apply_link");
  if (!window.start || !window.end) reasons.push("application_window_unverified");
  if (window.start && window.start > day) reasons.push("not_open_yet");
  if (window.end && window.end < day) reasons.push("application_deadline_passed");

  const publishable = reasons.length === 0;
  const status = publishable
    ? "open_window_confirmed"
    : reasons.includes("application_deadline_passed") || reasons.includes("explicitly_closed")
      ? "closed_or_expired"
      : reasons.includes("not_open_yet")
        ? "upcoming"
        : "needs_review";

  return {
    publishable,
    status,
    reasons,
    window
  };
}
