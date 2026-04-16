import { useEffect, useRef } from "react";

export default function SunsetParallax() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skyRef     = useRef<SVGGElement>(null);
  const sunRef     = useRef<SVGGElement>(null);
  const glowRef    = useRef<SVGRadialGradientElement>(null);
  const cloudsRef  = useRef<SVGGElement>(null);
  const seaRef     = useRef<SVGGElement>(null);
  const wavesRef   = useRef<SVGGElement>(null);
  const glareRef   = useRef<SVGGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    let lastScroll = -1;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = section.getBoundingClientRect();
        const vh   = window.innerHeight;
        // progress: 0 когда секция входит снизу, 1 когда уходит вверх
        const progress = Math.max(0, Math.min(1, 1 - (rect.bottom / (vh + rect.height))));
        if (Math.abs(progress - lastScroll) < 0.001) return;
        lastScroll = progress;

        const p = progress; // 0..1

        // Небо — двигается медленно вверх
        if (skyRef.current)
          skyRef.current.style.transform = `translateY(${p * 18}px)`;

        // Солнце — опускается к горизонту быстрее
        if (sunRef.current)
          sunRef.current.style.transform = `translateY(${p * 42}px)`;

        // Ореол солнца — меняет размер
        if (glowRef.current) {
          const r = 18 + p * 14;
          glowRef.current.setAttribute("r", String(r));
        }

        // Облака — плывут немного в сторону
        if (cloudsRef.current)
          cloudsRef.current.style.transform = `translate(${p * -28}px, ${p * 10}px)`;

        // Море — чуть медленнее неба
        if (seaRef.current)
          seaRef.current.style.transform = `translateY(${p * 8}px)`;

        // Волны — лёгкое смещение
        if (wavesRef.current)
          wavesRef.current.style.transform = `translateY(${p * -5}px)`;

        // Блик на воде — меняет прозрачность
        if (glareRef.current) {
          glareRef.current.style.opacity = String(0.25 + p * 0.45);
          glareRef.current.style.transform = `translateY(${p * -8}px) scaleY(${0.8 + p * 0.4})`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={sectionRef} className="sb-sunset" aria-hidden="true">
      <svg
        className="sb-sunset__svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Градиент неба — закатный */}
          <linearGradient id="sbSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0d1b3e" />
            <stop offset="35%"  stopColor="#1a3a6b" />
            <stop offset="62%"  stopColor="#c75b2a" />
            <stop offset="80%"  stopColor="#e8843a" />
            <stop offset="100%" stopColor="#f5a84e" />
          </linearGradient>

          {/* Градиент моря */}
          <linearGradient id="sbSeaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1a4a7a" />
            <stop offset="40%"  stopColor="#0d2d55" />
            <stop offset="100%" stopColor="#071829" />
          </linearGradient>

          {/* Ореол солнца */}
          <radialGradient id="sbSunGlow" cx="50%" cy="50%" r="18%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="#ffe066" stopOpacity="1" />
            <stop offset="40%"  stopColor="#ffb347" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ff6b2b" stopOpacity="0" />
          </radialGradient>

          {/* Блик солнца на воде */}
          <linearGradient id="sbGlareGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffcc66" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff8833" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="sbGlareShape" cx="50%" cy="0%" r="50%">
            <stop offset="0%"   stopColor="#ffd580" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffd580" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── НЕБО ── */}
        <g ref={skyRef}>
          <rect width="1440" height="320" fill="url(#sbSkyGrad)" />
        </g>

        {/* ── ОБЛАКА ── */}
        <g ref={cloudsRef} className="sb-sunset__clouds">
          <ellipse cx="180"  cy="62"  rx="110" ry="18" fill="white" opacity="0.06" />
          <ellipse cx="340"  cy="48"  rx="75"  ry="14" fill="white" opacity="0.05" />
          <ellipse cx="900"  cy="55"  rx="140" ry="20" fill="white" opacity="0.05" />
          <ellipse cx="1150" cy="40"  rx="90"  ry="15" fill="white" opacity="0.04" />
          <ellipse cx="1330" cy="70"  rx="80"  ry="13" fill="white" opacity="0.06" />

          {/* Розово-оранжевые закатные облака */}
          <ellipse cx="260"  cy="95"  rx="160" ry="24" fill="#e07040" opacity="0.18" />
          <ellipse cx="520"  cy="80"  rx="120" ry="18" fill="#d06030" opacity="0.13" />
          <ellipse cx="820"  cy="88"  rx="200" ry="28" fill="#c85528" opacity="0.15" />
          <ellipse cx="1180" cy="76"  rx="150" ry="22" fill="#d96535" opacity="0.12" />
        </g>

        {/* ── СОЛНЦЕ ── */}
        <g ref={sunRef}>
          {/* Большой ореол */}
          <ellipse cx="720" cy="168" rx="120" ry="60" fill="#ff8c30" opacity="0.12" />
          <ellipse cx="720" cy="168" rx="72"  ry="36" fill="#ffaa44" opacity="0.18" />
          {/* Диск */}
          <circle  cx="720" cy="168" r="28" fill="#ffe066" opacity="0.95" />
          <circle  cx="720" cy="168" r="22" fill="#fff4b0" opacity="0.9" />
          {/* Лучи */}
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={720 + Math.cos(rad) * 30}
                y1={168 + Math.sin(rad) * 30}
                x2={720 + Math.cos(rad) * 46}
                y2={168 + Math.sin(rad) * 46}
                stroke="#ffe899"
                strokeWidth={deg % 90 === 0 ? 2.5 : 1.5}
                strokeLinecap="round"
                opacity={0.55}
              />
            );
          })}
        </g>

        {/* ── ЛИНИЯ ГОРИЗОНТА — размытый переход ── */}
        <rect x="0" y="152" width="1440" height="32" fill="url(#sbSeaGrad)" opacity="0.45" />

        {/* ── МОРЕ ── */}
        <g ref={seaRef}>
          <rect x="0" y="170" width="1440" height="150" fill="url(#sbSeaGrad)" />
          {/* Плавная волнистая граница моря */}
          <path
            d="M0,170 Q120,162 240,170 Q360,178 480,170 Q600,162 720,170 Q840,178 960,170 Q1080,162 1200,170 Q1320,178 1440,170 L1440,175 Q1320,183 1200,175 Q1080,167 960,175 Q840,183 720,175 Q600,167 480,175 Q360,183 240,175 Q120,167 0,175 Z"
            fill="#1a4a7a"
            opacity="0.6"
          />
        </g>

        {/* ── БЛИК СОЛНЦА НА ВОДЕ ── */}
        <g ref={glareRef} style={{ opacity: 0.25 }}>
          <ellipse cx="720" cy="210" rx="44" ry="100" fill="url(#sbGlareShape)" />
          <ellipse cx="720" cy="230" rx="28" ry="70"  fill="#ffd580" opacity="0.3" />
          {/* Мелкие блики-черточки */}
          {[-36,-24,-14,-6,0,6,14,24,36].map((dx, i) => (
            <ellipse
              key={i}
              cx={720 + dx * (1 + Math.abs(dx) * 0.04)}
              cy={195 + Math.abs(dx) * 1.2}
              rx={3 - Math.abs(dx) * 0.04}
              ry={1}
              fill="#fff8c0"
              opacity={0.55 - Math.abs(dx) * 0.012}
            />
          ))}
        </g>

        {/* ── ВОЛНЫ ── */}
        <g ref={wavesRef}>
          <path d="M0,200 Q90,194 180,200 Q270,206 360,200 Q450,194 540,200 Q630,206 720,200 Q810,194 900,200 Q990,206 1080,200 Q1170,194 1260,200 Q1350,206 1440,200" stroke="#4a8ab5" strokeWidth="1.5" fill="none" opacity="0.35" />
          <path d="M0,212 Q80,207 160,212 Q240,217 320,212 Q400,207 480,212 Q560,217 640,212 Q720,207 800,212 Q880,217 960,212 Q1040,207 1120,212 Q1200,217 1280,212 Q1360,207 1440,212" stroke="#5a9ac8" strokeWidth="1" fill="none" opacity="0.25" />
          <path d="M0,226 Q100,221 200,226 Q300,231 400,226 Q500,221 600,226 Q700,231 800,226 Q900,221 1000,226 Q1100,231 1200,226 Q1300,221 1400,226 L1440,226" stroke="#6aaad8" strokeWidth="1" fill="none" opacity="0.2" />
        </g>

        {/* ── СИЛУЭТ БЕРЕГА ── */}
        <path
          d="M0,310 L0,275 Q60,270 100,265 Q160,258 220,270 Q260,278 300,268 Q360,255 440,262 Q500,268 560,260 Q620,252 700,258 Q760,263 820,255 Q900,245 980,252 Q1040,258 1100,250 Q1160,242 1240,248 Q1300,253 1360,245 Q1400,240 1440,244 L1440,310 Z"
          fill="#071422"
          opacity="0.7"
        />
      </svg>

      {/* Анимированные волны CSS поверх */}
      <div className="sb-sunset__wave-anim">
        <div className="sb-sunset__wave sb-sunset__wave--1" />
        <div className="sb-sunset__wave sb-sunset__wave--2" />
        <div className="sb-sunset__wave sb-sunset__wave--3" />
      </div>
    </div>
  );
}
