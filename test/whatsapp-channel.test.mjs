import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeWhatsAppChannelName,
  whatsappSelectNewsletterId,
  whatsappChannelJobText
} from "../src/index.js";

test("normalizes Arabic channel names without diacritics", () => {
  assert.equal(
    normalizeWhatsAppChannelName("مَسعى | وظائف السعودية 🇸🇦"),
    normalizeWhatsAppChannelName("مسعى | وظائف السعودية 🇸🇦")
  );
});

test("selects the managed Masaa WhatsApp channel by name", () => {
  const id = "120363171744447809@newsletter";
  const payload = {
    newsletters: [
      { id: "120363111111111111@newsletter", name: "قناة أخرى", role: "creator" },
      { id, name: "مسعى | وظائف السعودية 🇸🇦", role: "admin" },
      { id: "120363222222222222@newsletter", name: "مَسعى | وظائف السعودية 🇸🇦", role: "member" }
    ]
  };

  assert.equal(whatsappSelectNewsletterId(payload), id);
});

test("does not select a channel where the connected account is only a member", () => {
  assert.equal(
    whatsappSelectNewsletterId({
      newsletters: [
        {
          id: "120363222222222222@newsletter",
          name: "مَسعى | وظائف السعودية 🇸🇦",
          role: "member"
        }
      ]
    }),
    ""
  );
});

test("formats a concise WhatsApp job post with official apply link and Masaa tracking", () => {
  const text = whatsappChannelJobText({
    title: "مهندس برمجيات",
    company: "شركة مثال",
    city: "الرياض",
    sector: "خاص",
    qualification: "بكالوريوس",
    experience: "سنتان خبرة",
    apply_url: "https://careers.example.sa/job/123",
    salary: "10,000 ريال",
    expires_at: "2026-10-31"
  });

  assert.match(text, /مهندس برمجيات/);
  assert.match(text, /شركة مثال/);
  assert.match(text, /الرياض/);
  assert.match(text, /https:\/\/careers\.example\.sa\/job\/123/);
  assert.match(text, /utm_source=whatsapp/);
  assert.match(text, /أرسلها لشخص يبحث عن وظيفة/);
  assert.match(text, /مَسعى \| وظائف السعودية/);
});
