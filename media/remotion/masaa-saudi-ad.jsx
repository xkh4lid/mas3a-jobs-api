import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig
} from "remotion";
import {
  MASAA_IDENTITY_MINT_PATH,
  MASAA_IDENTITY_GOLD_PATH
} from "../src/brand.mjs";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };

const Logo = ({ width = 650, glow = true }) => (
  <svg
    width={width}
    viewBox="257 290 938 490"
    style={{
      overflow: "visible",
      filter: glow ? "drop-shadow(0 18px 44px rgba(0,0,0,.28))" : "none"
    }}
  >
    <defs>
      <linearGradient id="mintLogo" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#68E8BC" />
        <stop offset="100%" stopColor="#43DFAF" />
      </linearGradient>
      <linearGradient id="goldLogo" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFD056" />
        <stop offset="100%" stopColor="#F6B744" />
      </linearGradient>
    </defs>
    <path d={MASAA_IDENTITY_MINT_PATH} fill="url(#mintLogo)" fillRule="evenodd" />
    <path d={MASAA_IDENTITY_GOLD_PATH} fill="url(#goldLogo)" fillRule="evenodd" />
  </svg>
);

const Card = ({ label, icon, x, y, delay, accent = "#68E8BC" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 130, mass: 0.7 }
  });
  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], clamp);
  const scale = interpolate(p, [0, 1], [0.72, 1], clamp);
  const rise = interpolate(p, [0, 1], [70, 0], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 330,
        height: 150,
        borderRadius: 34,
        background: "linear-gradient(155deg,rgba(250,252,250,.98),rgba(235,247,241,.94))",
        border: "2px solid rgba(104,232,188,.25)",
        boxShadow: "0 24px 70px rgba(0,0,0,.24), inset 0 1px 0 rgba(255,255,255,.8)",
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "0 28px",
        direction: "rtl",
        opacity,
        transform: `translateY(${rise}px) scale(${scale})`
      }}
    >
      <div
        style={{
          width: 74,
          height: 74,
          borderRadius: 24,
          background: "#07342C",
          display: "grid",
          placeItems: "center",
          fontSize: 40,
          color: accent,
          flex: "0 0 auto",
          boxShadow: "0 12px 30px rgba(3,28,24,.18)"
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ color: "#0A5B45", fontWeight: 900, fontSize: 34, lineHeight: 1.15 }}>{label}</div>
        <div style={{ marginTop: 10, width: 150, height: 10, borderRadius: 10, background: "#BDD9CD" }} />
        <div style={{ marginTop: 9, width: 105, height: 8, borderRadius: 10, background: "#D5E8DF" }} />
      </div>
    </div>
  );
};

const SaudiHost = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 100 } });
  const y = interpolate(enter, [0, 1], [160, 0], clamp);
  const breathing = Math.sin(frame / 19) * 5;
  const speaking = frame < 390;
  const mouth = speaking ? 6 + Math.abs(Math.sin(frame * 0.43)) * 18 : 5;
  const blinkPhase = frame % 118;
  const eyeH = blinkPhase > 5 && blinkPhase < 112 ? 9 : 2;
  const handWave = interpolate(frame, [0, 18, 42, 72], [16, -12, 8, 0], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: 110,
        bottom: 230,
        width: 560,
        height: 910,
        transform: `translateY(${y + breathing}px)`,
        filter: "drop-shadow(0 40px 60px rgba(0,0,0,.28))"
      }}
    >
      <svg width="560" height="910" viewBox="0 0 560 910">
        <defs>
          <linearGradient id="thobe" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E7ECE9" />
          </linearGradient>
          <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DFA873" />
            <stop offset="100%" stopColor="#B87849" />
          </linearGradient>
          <pattern id="shemagh" width="32" height="32" patternUnits="userSpaceOnUse">
            <rect width="32" height="32" fill="#F8F6F2" />
            <path d="M0 0L32 32M32 0L0 32" stroke="#B62D2D" strokeWidth="4" opacity=".9" />
            <path d="M16 0V32M0 16H32" stroke="#C84545" strokeWidth="2" opacity=".65" />
          </pattern>
        </defs>

        <ellipse cx="282" cy="847" rx="210" ry="42" fill="rgba(0,0,0,.18)" />

        {/* body / thobe */}
        <path d="M160 470 Q282 410 400 475 L470 850 L96 850 Z" fill="url(#thobe)" />
        <path d="M279 472 L279 840" stroke="#CCD6D1" strokeWidth="5" />
        <rect x="260" y="544" width="38" height="16" rx="8" fill="#D8E1DD" />
        <path d="M170 510 Q115 555 95 655 Q105 690 137 674 Q170 590 220 554" fill="url(#thobe)" />
        <path
          d="M391 520 Q472 560 486 646 Q470 682 438 662 Q421 594 360 558"
          fill="url(#thobe)"
          transform={`rotate(${handWave} 407 552)`}
          style={{ transformOrigin: "407px 552px" }}
        />
        <circle cx="487" cy="646" r="35" fill="url(#skin)" />

        {/* neck */}
        <rect x="236" y="382" width="92" height="110" rx="38" fill="url(#skin)" />

        {/* head */}
        <ellipse cx="282" cy="300" rx="128" ry="155" fill="url(#skin)" />

        {/* shemagh */}
        <path d="M145 270 Q148 122 280 114 Q419 120 425 270 L392 342 Q378 220 282 205 Q183 215 171 344 Z" fill="url(#shemagh)" />
        <ellipse cx="282" cy="159" rx="128" ry="26" fill="none" stroke="#171918" strokeWidth="19" />

        {/* ears */}
        <ellipse cx="153" cy="316" rx="25" ry="38" fill="#C68A58" />
        <ellipse cx="411" cy="316" rx="25" ry="38" fill="#C68A58" />

        {/* brows */}
        <path d="M204 282 Q238 265 262 281" stroke="#38241A" strokeWidth="10" strokeLinecap="round" />
        <path d="M302 281 Q333 264 361 280" stroke="#38241A" strokeWidth="10" strokeLinecap="round" />

        {/* eyes */}
        <ellipse cx="235" cy="304" rx="12" ry={eyeH} fill="#171918" />
        <ellipse cx="329" cy="304" rx="12" ry={eyeH} fill="#171918" />

        {/* nose */}
        <path d="M283 314 Q270 345 286 351" stroke="#9B613D" strokeWidth="6" strokeLinecap="round" fill="none" />

        {/* beard */}
        <path d="M191 360 Q205 447 281 458 Q359 450 374 358 Q340 414 282 418 Q223 414 191 360Z" fill="#3A251C" />
        <path d="M242 360 Q282 378 322 360 Q309 396 282 399 Q254 395 242 360Z" fill="#C17F50" />

        {/* mouth */}
        <rect x="258" y="366" width="48" height={mouth} rx={mouth / 2} fill="#6E2C2C" />
        <rect x="265" y="368" width="34" height={Math.max(2, mouth * 0.28)} rx="4" fill="#F5D6C8" opacity={mouth > 12 ? 0.8 : 0} />

        {/* mic */}
        <circle cx="370" cy="536" r="13" fill="#0A5B45" />
        <rect x="378" y="530" width="42" height="12" rx="6" fill="#0A5B45" />
      </svg>
    </div>
  );
};

const Subtitle = ({ from, to, children, accentWord }) => {
  const frame = useCurrentFrame();
  const active = frame >= from && frame < to;
  if (!active) return null;
  const opacity = interpolate(frame, [from, from + 8, to - 8, to], [0, 1, 1, 0], clamp);
  const y = interpolate(frame, [from, from + 10], [38, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: 72,
        right: 72,
        bottom: 82,
        padding: "28px 38px 34px",
        borderRadius: 30,
        background: "rgba(2,27,23,.82)",
        border: "1px solid rgba(104,232,188,.22)",
        backdropFilter: "blur(12px)",
        color: "#F9FBFA",
        textAlign: "center",
        fontSize: 44,
        fontWeight: 800,
        lineHeight: 1.55,
        direction: "rtl",
        opacity,
        transform: `translateY(${y}px)`,
        boxShadow: "0 18px 50px rgba(0,0,0,.24)"
      }}
    >
      {children}
      {accentWord ? <span style={{ color: "#F6B744" }}> {accentWord}</span> : null}
    </div>
  );
};

const EndCard = () => {
  const frame = useCurrentFrame();
  const local = frame - 352;
  const { fps } = useVideoConfig();
  const p = spring({ frame: local, fps, config: { damping: 18 } });
  const scale = interpolate(p, [0, 1], [0.84, 1], clamp);
  const sweep = interpolate(local, [20, 80], [-500, 1200], clamp);

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 34%,#0D5A48 0%,#07342C 38%,#031C18 100%)",
        alignItems: "center",
        justifyContent: "center",
        opacity: interpolate(local, [0, 12], [0, 1], clamp)
      }}
    >
      <div style={{ transform: `scale(${scale})`, display: "grid", placeItems: "center" }}>
        <Logo width={770} />
        <div style={{ marginTop: -30, color: "#F6B744", fontSize: 62, fontWeight: 900, direction: "rtl" }}>ابدأ مسعاك اليوم</div>
        <div style={{ marginTop: 28, color: "#D3E8DF", fontSize: 30, fontWeight: 700, direction: "rtl" }}>وظائف السعودية من مصادرها الرسمية</div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 180,
          left: sweep,
          transform: "skewX(-18deg)",
          background: "linear-gradient(90deg,transparent,rgba(255,208,86,.38),transparent)",
          filter: "blur(10px)"
        }}
      />
    </AbsoluteFill>
  );
};

export const MasaaSaudiAd = () => {
  const frame = useCurrentFrame();
  const introOpacity = interpolate(frame, [0, 14, 338, 352], [0, 1, 1, 0], clamp);
  const lightX = interpolate(frame, [0, 352], [-200, 1180], clamp);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(155deg,#031C18 0%,#07342C 46%,#0A5B45 130%)",
        fontFamily: '"Noto Kufi Arabic","Noto Sans Arabic","DejaVu Sans",Arial,sans-serif',
        overflow: "hidden"
      }}
    >
      <Audio src={staticFile("masaa-voice.mp3")} />

      <div style={{ position: "absolute", inset: 0, opacity: introOpacity }}>
        <div style={{ position: "absolute", width: 760, height: 760, borderRadius: "50%", right: -290, top: -230, background: "rgba(104,232,188,.08)", filter: "blur(1px)" }} />
        <div style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", left: -250, top: 460, background: "rgba(246,183,68,.07)", filter: "blur(1px)" }} />
        <div
          style={{
            position: "absolute",
            width: 150,
            height: 2100,
            left: lightX,
            top: -90,
            transform: "rotate(22deg)",
            background: "linear-gradient(90deg,transparent,rgba(104,232,188,.12),transparent)",
            filter: "blur(14px)"
          }}
        />

        <div style={{ position: "absolute", top: 82, left: 78, right: 78, display: "flex", alignItems: "center", justifyContent: "space-between", direction: "rtl" }}>
          <Logo width={355} glow={false} />
          <div style={{ color: "#F6B744", fontSize: 26, fontWeight: 900, padding: "14px 24px", borderRadius: 999, border: "1px solid rgba(246,183,68,.45)", background: "rgba(246,183,68,.08)" }}>فرص موثقة</div>
        </div>

        <SaudiHost />

        <Sequence from={58}>
          <Card label="حكومي" icon="🏛️" x={655} y={360} delay={0} />
          <Card label="عسكري" icon="🛡️" x={705} y={545} delay={10} accent="#F6B744" />
          <Card label="شركات" icon="🏢" x={680} y={730} delay={20} />
          <Card label="عن بُعد" icon="💻" x={630} y={915} delay={30} accent="#F6B744" />
        </Sequence>

        <div
          style={{
            position: "absolute",
            top: 260,
            left: 85,
            width: 535,
            color: "#FFFFFF",
            direction: "rtl",
            textAlign: "right",
            opacity: interpolate(frame, [12, 28], [0, 1], clamp)
          }}
        >
          <div style={{ fontSize: 55, lineHeight: 1.45, fontWeight: 900 }}>تدور وظيفة؟</div>
          <div style={{ marginTop: 18, color: "#68E8BC", fontSize: 30, fontWeight: 800 }}>خلّ مَسعى يساعدك تلقى الفرصة المناسبة</div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 1140,
            right: 95,
            width: 590,
            padding: "30px 36px",
            borderRadius: 32,
            direction: "rtl",
            background: "rgba(255,255,255,.94)",
            color: "#0A5B45",
            boxShadow: "0 24px 65px rgba(0,0,0,.24)",
            opacity: interpolate(frame, [180, 200], [0, 1], clamp),
            transform: `translateY(${interpolate(frame,[180,205],[45,0],clamp)}px)`
          }}
        >
          <div style={{ fontSize: 23, fontWeight: 800, color: "#657A71" }}>بحث سريع</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 10 }}>ابحث عن فرصتك القادمة...</div>
          <div style={{ marginTop: 22, height: 6, borderRadius: 999, background: "linear-gradient(90deg,#F6B744,#68E8BC)" }} />
        </div>

        <Subtitle from={0} to={83}>يا هلا بك! تدور وظيفة؟</Subtitle>
        <Subtitle from={83} to={184}>أو محتاج أحد يساعدك تلقى الفرصة المناسبة؟</Subtitle>
        <Subtitle from={184} to={324}>مَسعى يجمع لك الوظائف من مصادرها الرسمية، ويرتبها لك بكل وضوح.</Subtitle>
        <Subtitle from={324} to={352} accentWord="اليوم">خلّ بحثك أسهل... وابدأ مسعاك</Subtitle>
      </div>

      <Sequence from={352}>
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
