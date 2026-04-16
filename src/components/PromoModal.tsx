import { useEffect, useState } from "react";

export default function PromoModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 10000);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div className="promo-backdrop" onClick={() => setOpen(false)}>
      <div className="promo-modal" onClick={(e) => e.stopPropagation()}>

        {/* Закрыть */}
        <button className="promo-close" onClick={() => setOpen(false)} aria-label="Закрыть">✕</button>

        {/* Декор-полосы */}
        <div className="promo-stripe promo-stripe--top" />
        <div className="promo-stripe promo-stripe--bottom" />

        {/* Бейдж */}
        <div className="promo-badge">🔥 Горячее предложение</div>

        {/* Заголовок */}
        <h2 className="promo-title">
          АКЦИЯ<br />
          <span className="promo-title--accent">ХУЯКЦИЯ</span>
        </h2>

        {/* Основной текст */}
        <p className="promo-deal">
          Два домика<br />
          <span className="promo-deal--cross">по цене трёх!!!</span>
        </p>

        {/* Суб-текст */}
        <p className="promo-sub">Налетай, торопись!</p>

        {/* Таймер-декор */}
        <div className="promo-flags">🏖️&nbsp;&nbsp;🌊&nbsp;&nbsp;🍹&nbsp;&nbsp;🏖️</div>

        {/* CTA */}
        <a
          href="#cta"
          className="promo-cta"
          onClick={() => {
            setOpen(false);
            setTimeout(() => {
              document.querySelector("#cta")?.scrollIntoView({ behavior: "smooth" });
            }, 200);
          }}
        >
          Связаться с менеджером →
        </a>

      </div>
    </div>
  );
}
