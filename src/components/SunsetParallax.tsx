export default function SunsetBg() {
  return (
    <div className="sb-sunset-bg" aria-hidden="true">
      <svg
        className="sb-sunset-bg__svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ssSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#060e24" />
            <stop offset="30%"  stopColor="#0e2050" />
            <stop offset="58%"  stopColor="#7a2a10" />
            <stop offset="75%"  stopColor="#d4601a" />
            <stop offset="88%"  stopColor="#f0902a" />
            <stop offset="100%" stopColor="#f5b04a" />
          </linearGradient>

          <linearGradient id="ssSea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1a4a7a" />
            <stop offset="50%"  stopColor="#0a2540" />
            <stop offset="100%" stopColor="#040f1e" />
          </linearGradient>

          <radialGradient id="ssSunCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#fff9c4" />
            <stop offset="45%"  stopColor="#ffe066" />
            <stop offset="100%" stopColor="#ffb030" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="ssSunHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ff9020" stopOpacity="0.45" />
            <stop offset="60%"  stopColor="#ff6010" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ff4000" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="ssGlare" cx="50%" cy="0%" r="80%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="#ffe880" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffa030" stopOpacity="0" />
          </radialGradient>

          <filter id="ssBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id="ssBlurSm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* ── НЕБО ── */}
        <rect width="1440" height="900" fill="url(#ssSky)" />

        {/* ── ЗВЁЗДЫ (вверху, едва заметные) ── */}
        {[
          [120,40],[300,25],[480,55],[650,18],[820,44],[1010,28],[1180,50],[1320,20],[80,70],[420,35],[780,15],[1100,65],[200,85],[560,75],[950,88],[1380,42]
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.2 : 0.8} fill="white" opacity={0.25 + (i % 4) * 0.1} className="ss-star" style={{ animationDelay: `${i * 0.4}s` }} />
        ))}

        {/* ── ОБЛАКА закатные ── */}
        <g className="ss-clouds-slow">
          <ellipse cx="200"  cy="200" rx="190" ry="28" fill="#b04020" opacity="0.18" filter="url(#ssBlur)" />
          <ellipse cx="580"  cy="175" rx="240" ry="32" fill="#c05525" opacity="0.16" filter="url(#ssBlur)" />
          <ellipse cx="1050" cy="190" rx="200" ry="26" fill="#b83d18" opacity="0.17" filter="url(#ssBlur)" />
          <ellipse cx="1340" cy="215" rx="160" ry="22" fill="#d06030" opacity="0.13" filter="url(#ssBlur)" />
        </g>
        <g className="ss-clouds-fast">
          <ellipse cx="380"  cy="140" rx="140" ry="18" fill="#e07840" opacity="0.12" filter="url(#ssBlur)" />
          <ellipse cx="860"  cy="155" rx="180" ry="22" fill="#d46535" opacity="0.14" filter="url(#ssBlur)" />
          <ellipse cx="1230" cy="130" rx="120" ry="16" fill="#c85528" opacity="0.11" filter="url(#ssBlur)" />
        </g>

        {/* ── БОЛЬШОЙ ОРЕОЛ СОЛНЦА ── */}
        <ellipse cx="720" cy="520" rx="340" ry="160" fill="url(#ssSunHalo)" filter="url(#ssBlur)" />
        <ellipse cx="720" cy="520" rx="180" ry="90"  fill="#ff7020" opacity="0.18" filter="url(#ssBlurSm)" />

        {/* ── СОЛНЦЕ ── */}
        <g className="ss-sun">
          {/* Мягкое свечение */}
          <circle cx="720" cy="520" r="90"  fill="url(#ssSunCore)" opacity="0.25" filter="url(#ssBlurSm)" />
          {/* Диск */}
          <circle cx="720" cy="520" r="48"  fill="#ffe566" opacity="0.92" />
          <circle cx="720" cy="520" r="36"  fill="#fff8b0" opacity="0.95" />
          {/* Лучи */}
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const main = deg % 90 === 0;
            return (
              <line
                key={deg}
                x1={720 + Math.cos(rad) * 52}
                y1={520 + Math.sin(rad) * 52}
                x2={720 + Math.cos(rad) * (main ? 76 : 68)}
                y2={520 + Math.sin(rad) * (main ? 76 : 68)}
                stroke="#ffe899"
                strokeWidth={main ? 2.5 : 1.5}
                strokeLinecap="round"
                opacity={0.6}
                className="ss-rays"
                style={{ animationDelay: `${deg / 360}s` }}
              />
            );
          })}
        </g>

        {/* ── ГОРИЗОНТ — переход небо/море ── */}
        <rect x="0" y="500" width="1440" height="40" fill="url(#ssSea)" opacity="0.5" filter="url(#ssBlurSm)" />

        {/* ── МОРЕ ── */}
        <rect x="0" y="520" width="1440" height="380" fill="url(#ssSea)" />

        {/* Волнистая граница */}
        <path
          d="M0,520 Q180,510 360,520 Q540,530 720,520 Q900,510 1080,520 Q1260,530 1440,520 L1440,528 Q1260,538 1080,528 Q900,518 720,528 Q540,538 360,528 Q180,518 0,528 Z"
          fill="#2060a0"
          opacity="0.4"
        />

        {/* ── БЛИК СОЛНЦА НА ВОДЕ ── */}
        <g className="ss-glare">
          <ellipse cx="720" cy="600" rx="60"  ry="200" fill="url(#ssGlare)" />
          <ellipse cx="720" cy="560" rx="30"  ry="120" fill="#ffd070" opacity="0.22" />
          {[-52,-36,-22,-10,0,10,22,36,52].map((dx, i) => (
            <ellipse
              key={i}
              cx={720 + dx * (1 + Math.abs(dx) * 0.02)}
              cy={542 + Math.abs(dx) * 1.4}
              rx={Math.max(0.5, 3.5 - Math.abs(dx) * 0.055)}
              ry={1.2}
              fill="#fff0a0"
              opacity={0.65 - Math.abs(dx) * 0.011}
            />
          ))}
        </g>

        {/* ── ВОЛНЫ (3 слоя) ── */}
        <g className="ss-wave ss-wave--1">
          <path d="M0,560 Q90,553 180,560 Q270,567 360,560 Q450,553 540,560 Q630,567 720,560 Q810,553 900,560 Q990,567 1080,560 Q1170,553 1260,560 Q1350,567 1440,560" stroke="#3a7ab5" strokeWidth="1.8" fill="none" opacity="0.4" />
        </g>
        <g className="ss-wave ss-wave--2">
          <path d="M0,576 Q80,570 160,576 Q240,582 320,576 Q400,570 480,576 Q560,582 640,576 Q720,570 800,576 Q880,582 960,576 Q1040,570 1120,576 Q1200,582 1280,576 Q1360,570 1440,576" stroke="#4a8ec8" strokeWidth="1.2" fill="none" opacity="0.28" />
        </g>
        <g className="ss-wave ss-wave--3">
          <path d="M0,594 Q100,588 200,594 Q300,600 400,594 Q500,588 600,594 Q700,600 800,594 Q900,588 1000,594 Q1100,600 1200,594 Q1300,588 1400,594 L1440,594" stroke="#5aa2d8" strokeWidth="0.9" fill="none" opacity="0.2" />
        </g>

        {/* ── БЕРЕГ (силуэт) ── */}
        <path
          d="M0,900 L0,780 Q40,772 90,765 Q160,755 230,768 Q280,778 340,762 Q420,744 510,752 Q580,758 650,746 Q730,733 820,740 Q890,746 970,735 Q1060,722 1150,730 Q1220,736 1290,724 Q1360,712 1440,718 L1440,900 Z"
          fill="#040e1c"
          opacity="0.85"
        />
        {/* Тёмные деревья/скалы на берегу */}
        <path
          d="M0,900 L0,800 Q50,798 80,788 L95,760 L110,788 Q150,780 190,785 L200,900 Z"
          fill="#030c18"
          opacity="0.6"
        />
        <path
          d="M1280,900 L1280,798 Q1320,790 1350,778 L1368,750 L1386,778 Q1410,772 1440,776 L1440,900 Z"
          fill="#030c18"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}
