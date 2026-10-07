import { MASAA, masaaIdentitySvg } from "./brand.mjs";

export function clean(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

export function xmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function clampText(value, max = 48) {
  const text = clean(value);
  return text.length > max ? text.slice(0, Math.max(1, max - 1)) + "…" : text;
}

export function lines(value, maxChars = 28, maxLines = 2) {
  const words = clean(value).split(/\s+/).filter(Boolean);
  if (!words.length) return ["فرصة وظيفية"];
  const result = [];
  let current = "";
  for (let i = 0; i < words.length; i += 1) {
    const candidate = current ? `${current} ${words[i]}` : words[i];
    if (candidate.length <= maxChars || !current) {
      current = candidate;
      continue;
    }
    result.push(current);
    current = words[i];
    if (result.length === maxLines - 1) {
      current = clampText([current, ...words.slice(i + 1)].join(" "), maxChars + 5);
      break;
    }
  }
  if (current && result.length < maxLines) result.push(current);
  return result.slice(0, maxLines);
}

function metadataCard({x, y, w, label, value, scale}) {
  const rx = 24 * scale;
  return `<rect x="${x}" y="${y}" width="${w}" height="${112 * scale}" rx="${rx}" fill="${MASAA.soft}"/>
  <text x="${x + w/2}" y="${y + 36*scale}" text-anchor="middle" font-size="${20*scale}" font-weight="700" font-family="${MASAA.font}" fill="${MASAA.green}" direction="rtl">${xmlEscape(label)}</text>
  <text x="${x + w/2}" y="${y + 80*scale}" text-anchor="middle" font-size="${23*scale}" font-family="${MASAA.font}" fill="#364B43" direction="rtl">${xmlEscape(clampText(value, 25))}</text>`;
}

export function jobCardSvg(job, {width = 1200, height = 1200} = {}) {
  const sx = width / 1200;
  const sy = height / 1200;
  const scale = Math.min(sx, sy);
  const tx = (width - 1200 * scale) / 2;
  const ty = (height - 1200 * scale) / 2;

  const titleLines = lines(job?.title || "فرصة وظيفية", 31, 2).map(xmlEscape);
  const company = xmlEscape(clampText(job?.company || "جهة موثوقة", 44));
  const city = clampText(job?.city || job?.region || (job?.remote ? "عن بُعد" : "السعودية"), 28);
  const sector = clampText(job?.sector || "وظائف", 20);
  const expiry = clampText(job?.expires_at || "راجع المصدر الرسمي", 24);
  const initial = xmlEscape((clean(job?.company) || "م").slice(0, 1));
  const titleStartY = titleLines.length > 1 ? 744 : 782;
  const titleMarkup = titleLines.map((line, index) =>
    `<text x="600" y="${titleStartY + index * 56}" text-anchor="middle" font-size="44" font-weight="700" font-family="${MASAA.font}" fill="${MASAA.green}" direction="rtl">${line}</text>`
  ).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="masaaBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${MASAA.deep}"/><stop offset="100%" stop-color="${MASAA.deep2}"/>
      </linearGradient>
      <linearGradient id="masaaMint" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${MASAA.mint}"/><stop offset="100%" stop-color="${MASAA.mint2}"/>
      </linearGradient>
      <linearGradient id="masaaGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${MASAA.gold2}"/><stop offset="100%" stop-color="${MASAA.gold}"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#masaaBg)"/>
    <g transform="translate(${tx},${ty}) scale(${scale})">
      <circle cx="1080" cy="105" r="145" fill="#0A463A" opacity="0.32"/>
      <circle cx="120" cy="250" r="115" fill="#0B3D34" opacity="0.28"/>
      ${masaaIdentitySvg(250, 18, 700)}
      <rect x="70" y="306" width="360" height="62" rx="31" fill="#0B3E34" stroke="#1D5C4D" stroke-width="2"/>
      <text x="250" y="347" text-anchor="middle" font-size="23" font-weight="700" font-family="${MASAA.font}" fill="${MASAA.mint}" direction="rtl">✓ متحقق من المصدر الرسمي</text>
      <rect x="50" y="396" width="1100" height="754" rx="46" fill="${MASAA.paper}" stroke="#DCE6E1" stroke-width="3"/>
      <rect x="515" y="428" width="170" height="170" rx="38" fill="#F4F8F6" stroke="#D8E4DE" stroke-width="3"/>
      <circle cx="600" cy="513" r="52" fill="#E7F4EE"/>
      <text x="600" y="534" text-anchor="middle" font-size="52" font-weight="700" font-family="${MASAA.font}" fill="#0D6B50">${initial}</text>
      <text x="600" y="642" text-anchor="middle" font-size="37" font-weight="700" font-family="${MASAA.font}" fill="${MASAA.ink}" direction="rtl">${company}</text>
      <rect x="475" y="668" width="250" height="50" rx="25" fill="#EAF5F0"/>
      <text x="600" y="702" text-anchor="middle" font-size="22" font-weight="700" font-family="${MASAA.font}" fill="#0D6B50" direction="rtl">${xmlEscape(sector)}</text>
      ${titleMarkup}
      ${metadataCard({x:105,y:865,w:300,label:"الموقع",value:city,scale:1})}
      ${metadataCard({x:450,y:865,w:300,label:"القطاع",value:sector,scale:1})}
      ${metadataCard({x:795,y:865,w:300,label:"آخر موعد",value:expiry,scale:1})}
      <rect x="260" y="1012" width="680" height="82" rx="41" fill="${MASAA.green}" stroke="${MASAA.gold}" stroke-width="3"/>
      <text x="600" y="1064" text-anchor="middle" font-size="29" font-weight="700" font-family="${MASAA.font}" fill="#FFFFFF" direction="rtl">التقديم من المصدر الرسمي ←</text>
      <text x="600" y="1124" text-anchor="middle" font-size="19" font-family="${MASAA.font}" fill="${MASAA.muted}" direction="rtl">مَسعى — التقديم يتم لدى الجهة المعلنة</text>
    </g>
  </svg>`;
}
