# Masaa Taste — experimental visual redesign

STATUS: STAGING CODE ONLY. Not deployed or visually verified.

## Current architecture
The live website at https://mas3a.pages.dev is published as Cloudflare Pages static files separately from this repository. This repository is the API Worker, not the frontend source. Its README confirms the split.
The live home page currently loads styles.css?v=7.21, theme-exact.css?v=7.1, theme-reference.css?v=7.1, logo-lockup.css?v=7.1, and app-v7.20.js.

## Art direction
Saudi Editorial: limestone paper tones, deep green, bronze emphasis, quiet surfaces, tactile job cards, generous Arabic typographic hierarchy. A coherent redesign inspired by the Taste Skill approach; we did not run its CLI or browser inspection scripts.

## Integration — only with full original Pages source
1. Back up the COMPLETE original Cloudflare Pages deployment (all HTML, JS, CSS, images, feeds, manifests, routing files, SEO pages). Never deploy this folder alone.
2. Duplicate to an isolated preview environment. Do not modify production Pages or API.
3. Load masaa-taste.css AFTER all four current CSS links. Leave app-v7.20.js and every DOM hook unchanged.
4. Check that API CORS allows the preview only through an explicitly approved isolated approach; do not relax production API CORS for visual testing.
5. Rollback: remove the single new stylesheet reference; this file itself has no state changes.

## Required regression validation
- Screenshots at 390px, 768px, 1440px in dark and light.
- Search, city/category filters, chips, clearing filters, deep-linked query parameters, load-more, archives, job verification badges, original application links.
- Resume PDF matching stays entirely on the visitor device; application tracker remains local and persists after refresh.
- Mobile dock, hamburger menu, dark mode, keyboard/focus, no horizontal scroll, reduced-motion support.
- All SEO landing pages, contact, about, terms, privacy, sitemap, RSS and social cards.
- API jobs/health fetches; do not change backend D1, cron, WhatsApp/Telegram, ads, or data.
- Run actual Taste Skill Node 22+ Chromium visual audit after original complete frontend source is available.

No live site changes or claims of complete visual/functional testing.