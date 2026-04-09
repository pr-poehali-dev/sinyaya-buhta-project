import { useEffect, useRef, useState, FormEvent, useCallback } from "react";

const CONTACT_URL = "https://functions.poehali.dev/05e2f825-a9d7-46b4-990d-b9db281dcff5";

const HERO_IMG = "https://cdn.poehali.dev/projects/905f43c3-9796-484a-b6a4-5fdc230be13e/files/dbaa5c73-0240-4ea5-bea3-c62d4c731aa4.jpg";
const BANYA_IMG = "https://cdn.poehali.dev/projects/905f43c3-9796-484a-b6a4-5fdc230be13e/files/e6eabce6-5423-4098-b714-34056603ca09.jpg";
const TENT_IMG = "https://cdn.poehali.dev/projects/905f43c3-9796-484a-b6a4-5fdc230be13e/files/40b0f993-22f6-4a32-8478-f6356f984be4.jpg";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useParallax(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `scale(1.05) translateY(${window.scrollY * 0.25}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
}

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const REVIEWS = [
  ["Д", "Дмитрий Р.", "Хабаровск · Июль 2025", "Баня у моря в 23:00, звёздное небо, тишина — это не описать словами. Семья кайфовала всю неделю. Спасибо за незабываемые впечатления!"],
  ["К", "Семья Кузнецовых", "Владивосток · Август 2025", "Приезжаем третий год подряд. Место как будто живёт своей жизнью — здесь помнят тебя, помнят детей. Это дорогого стоит."],
  ["Е", "Елена М.", "Уссурийск · Сентябрь 2025", "Взяли глэмпинг-шатёр — это отдельное счастье. Засыпать под звук прибоя, просыпаться с видом на море. Мечта, которая сбылась."],
  ["С", "Сергей Т.", "Владивосток · Август 2025", "Ездили с женой без детей, первый раз за 4 года вдвоём. Взяли домик с видом на море — это было что-то. Утром кофе на веранде, вечером в баню, потом купаться в море. Вот так и надо отдыхать. Уже присматриваем даты на июль."],
  ["Н", "Наталья В.", "Находка · Июль 2025", "Приехали с тремя детьми и боялись, что будет хаос. Всё оказалось наоборот — дети носились по пляжу с утра до вечера, аниматоры на выходных, мелководье безопасное. Мы с мужем реально отдохнули, первый раз за долгое время. Спасибо огромное!"],
  ["А", "Алексей К.", "Хабаровск · Сентябрь 2025", "Бархатный сезон — огонь. Людей меньше, море тёплое, цены чуть ниже. Рыбачил каждое утро с местным гидом — такого краба я ещё нигде не ел. Вечером сами готовили на мангале. Вот это я понимаю — отдых."],
  ["И", "Ирина М.", "Уссурийск · Июнь 2025", "Глэмпинг-шатёр с прозрачной стенкой — это вообще отдельная история. Засыпаешь, а перед тобой море и звёзды. Проснулась в 5 утра от рассвета — не пожалела ни секунды. Подруге уже скинула ссылку, едем вместе в августе."],
  ["Р", "Роман Д.", "Артём · Август 2025", "Честно — не ожидал такого уровня за эти деньги. Всё чисто, персонал не навязывается но всегда рядом, еда свежая. Взял SUP первый раз в жизни — понравилось. На следующий день уже два часа катался сам. Вернусь точно, уже не вопрос."],
] as const;

function ReviewsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = REVIEWS.length;
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => setActive((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setActive((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { if (diff > 0) next(); else prev(); }
    touchStartX.current = null;
    setPaused(false);
  };

  const [letter, name, city, text] = REVIEWS[active];

  return (
    <section className="sb-section sb-reviews" id="reviews">
      <div className="sb-container">
        <span className="sb-section__eyebrow reveal">Отзывы</span>
        <h2 className="sb-section__title reveal reveal-d1">Нам доверяют</h2>
        <p className="sb-section__sub reveal reveal-d2">Реальные отзывы гостей сезона 2025. Каждый третий отдыхающий — наш повторный гость.</p>

        <div
          className="sb-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button className="sb-carousel__arrow sb-carousel__arrow--prev" onClick={prev} aria-label="Предыдущий отзыв">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>

          <article className="sb-review-card sb-review-card--carousel" key={active}>
            <div className="sb-review-card__stars">★★★★★</div>
            <p className="sb-review-card__text">«{text}»</p>
            <div className="sb-review-card__author">
              <div className="sb-review-card__avatar">{letter}</div>
              <div>
                <div className="sb-review-card__name">{name}</div>
                <div className="sb-review-card__city">{city}</div>
              </div>
            </div>
          </article>

          <button className="sb-carousel__arrow sb-carousel__arrow--next" onClick={next} aria-label="Следующий отзыв">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>

        <div className="sb-carousel__dots">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`sb-carousel__dot${i === active ? " sb-carousel__dot--active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Отзыв ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const heroBgRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: "", phone: "", dates: "", message: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Введите имя";
    if (!formData.phone.trim()) errors.phone = "Введите телефон";
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    setFormStatus("loading");
    try {
      const res = await fetch(CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const setField = (field: string, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (formErrors[field]) setFormErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  useReveal();
  useParallax(heroBgRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <a href="#main" className="skip-link">Перейти к содержанию</a>

      {/* NAV */}
      <nav className={`sb-nav${scrolled ? " scrolled" : ""}`}>
        <div className="sb-nav__inner">
          <a href="#" className="sb-nav__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 3 C8 3 3 8 3 14 C3 20 8 25 14 25 C20 25 25 20 25 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M14 3 C18 8 20 14 14 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M6 11 Q14 9 22 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="22" cy="7" r="3" fill="currentColor" opacity="0.8" />
            </svg>
            <span className="sb-nav__logo-text">Синяя Бухта</span>
          </a>
          <ul className="sb-nav__links">
            {[["#services", "Услуги"], ["#reviews", "Отзывы"], ["#trust", "О нас"], ["#cta", "Контакты"]].map(([href, label]) => (
              <li key={href}>
                <a href={href} onClick={(e) => { e.preventDefault(); scrollTo(href); }}>{label}</a>
              </li>
            ))}
          </ul>
          <div className="sb-nav__actions">
            <button className="sb-nav__toggle" onClick={() => setDark(!dark)} aria-label="Сменить тему">
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href="#cta" className="sb-nav__cta" onClick={(e) => { e.preventDefault(); scrollTo("#cta"); }}>Забронировать</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <main id="main">
        <section className="sb-hero">
          <div
            className="sb-hero__bg"
            ref={heroBgRef}
            style={{ backgroundImage: `url('${HERO_IMG}')`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
          <div className="sb-hero__overlay" />
          <div className="sb-hero__content">
            <div className="sb-hero__badge">
              <span className="sb-hero__badge-dot" />
              Открытие сезона · Июнь 2026
            </div>
            <h1 className="sb-hero__title">
              Ты уже слышишь,<br /><em>как шумят волны?</em>
            </h1>
            <p className="sb-hero__sub">База отдыха «Синяя Бухта» — твои лучшие дни у Японского моря. Приморский край, прямо на берегу.</p>
            <div className="sb-hero__meta">
              <span>Июнь — Октябрь</span>
              <span className="sb-hero__meta-sep" />
              <span>Приморский край</span>
              <span className="sb-hero__meta-sep" />
              <span>200 м от моря</span>
            </div>
            <div className="sb-hero__actions">
              <button className="sb-btn sb-btn--primary" onClick={() => scrollTo("#cta")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Проверить свободные даты
              </button>
              <button className="sb-btn sb-btn--ghost" onClick={() => scrollTo("#services")}>Посмотреть услуги</button>
            </div>
          </div>
          <div className="sb-hero__scroll">
            <span>Листай вниз</span>
            <div className="sb-hero__scroll-line" />
          </div>
        </section>

        {/* STATS */}
        <div className="sb-stats-bar">
          <div className="sb-stats-bar__inner">
            {[["4.9", "Рейтинг гостей"], ["70%", "Возвращаются снова"], ["8+", "Лет на рынке"], ["200м", "До пляжа"], ["5000+", "Довольных гостей"]].map(([num, label]) => (
              <div key={label} className="sb-stats-bar__item">
                <span className="sb-stats-bar__num">{num}</span>
                <span className="sb-stats-bar__label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PROBLEM */}
        <section className="sb-section sb-problem">
          <div className="sb-container">
            <div className="sb-problem__grid">
              <div>
                <span className="sb-section__eyebrow reveal">Узнаёшь себя?</span>
                <h2 className="sb-section__title reveal reveal-d1">Ты работаешь без остановки. Твоя семья ждёт.</h2>
                <p className="sb-section__sub reveal reveal-d2">Каждое лето одно и то же — хочется настоящего отдыха, а получается очередной «отпуск в телефоне».</p>
                <div className="sb-problem__pains">
                  {[
                    ["📱", "Бесконечные рабочие чаты", "Даже в отпуске ты не отключаешься — уведомления не дают покоя"],
                    ["🏨", "Дорогие отели без атмосферы", "Чувствуешь себя как в аэропорту — всё есть, но ничего не запоминается"],
                    ["🌊", "Дети у экранов вместо моря", "Приключения откладываются «до следующего лета» снова и снова"],
                  ].map(([icon, title, desc], i) => (
                    <div key={String(title)} className={`sb-pain-item reveal reveal-d${i + 1}`}>
                      <div className="sb-pain-item__icon">{icon}</div>
                      <div className="sb-pain-item__text">
                        <strong>{title}</strong>
                        {desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sb-problem__visual reveal reveal-d2">
                <img src={BANYA_IMG} alt="Баня у Японского моря" width="600" height="750" loading="lazy" />
                <div className="sb-problem__visual-badge">
                  <div className="sb-problem__visual-badge-title">«Приехали на 3 дня — остались на 10»</div>
                  <div className="sb-problem__visual-badge-sub">Андрей, Хабаровск · Гость 2025 года</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PLACE */}
        <section className="sb-section sb-place" id="place">
          <div className="sb-container--wide">
            <span className="sb-section__eyebrow reveal">Решение</span>
            <h2 className="sb-section__title reveal reveal-d1">Место, где время замедляется</h2>
            <p className="sb-place__lead reveal reveal-d2">
              <strong>«Синяя Бухта»</strong> — это не просто база отдыха.
              Это запах морского ветра с утра, костёр под звёздами, свежие морепродукты прямо с лодки
              и ощущение, что <strong>мир существует только для вас</strong>.
              Мы открываемся 1 июня — и каждый год наши гости возвращаются.
            </p>
            <div className="sb-place__bento">
              <div className="sb-bento-card sb-bento-card--tall reveal">
                <img className="sb-bento-card__img" src={HERO_IMG} alt="Панорамный вид на бухту Японского моря" width="500" height="800" loading="lazy" />
                <div className="sb-bento-card__overlay" />
                <div className="sb-bento-card__label">
                  <div>Собственная бухта</div>
                  <div className="sb-bento-card__sub">Закрытый пляж для гостей</div>
                </div>
              </div>
              {([
                [TENT_IMG, "Вечера у огня", "Костёр + море + звёзды"],
                [BANYA_IMG, "Баня у моря", "Купели + звёздное небо"],
                [HERO_IMG, "Водные активности", "SUP, каяки, снорклинг"],
                [TENT_IMG, "Гастрономия", "Морепродукты с лодки"],
              ] as const).map(([src, label, sub], i) => (
                <div key={label} className={`sb-bento-card reveal reveal-d${(i % 2) + 1}`}>
                  <img className="sb-bento-card__img" src={src} alt={label} width="500" height="300" loading="lazy" />
                  <div className="sb-bento-card__overlay" />
                  <div className="sb-bento-card__label">
                    <div>{label}</div>
                    <div className="sb-bento-card__sub">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="sb-section sb-services" id="services">
          <div className="sb-container">
            <span className="sb-section__eyebrow reveal">Всё включено</span>
            <h2 className="sb-section__title reveal reveal-d1">Всё, что нужно для идеального отдыха</h2>
            <div className="sb-services__grid">
              {([
                ["🏠", "Размещение", "Уютные домики и глэмпинг-шатры прямо у берега — с кондиционером, душем, мини-кухней и панорамными окнами на море.", "От 3500 ₽/ночь"],
                ["🌊", "Море и пляж", "Оборудованный пляж, лежаки, зонты, раздевалки. SUP-доски, каяки и снорклинг-маски — в аренду без доплат.", "Включено"],
                ["🦀", "Гастрономия", "Беседки для BBQ, свежая рыба и морепродукты от местных рыбаков. Мастер-класс «Готовим улов» — каждую субботу.", "Мастер-класс по сб"],
                ["🔥", "Баня и релакс", "Русская баня с купелью у моря, массаж, чаны под открытым небом. Места разбирают за неделю — записывайтесь заранее.", "Бронировать заранее"],
                ["🧒", "Детский клуб", "Анимация по выходным, детская площадка, безопасное мелководье. Дети счастливы — родители наконец отдыхают.", "С 3 лет"],
                ["🎣", "Активности", "Морская рыбалка на рассвете, экскурсии на катере, дайвинг для начинающих, пешие маршруты по бухтам.", "Гид включён"],
              ] as const).map(([emoji, title, desc, tag], i) => (
                <article key={title} className={`sb-service-card reveal reveal-d${(i % 3) + 1}`}>
                  <span className="sb-service-card__emoji">{emoji}</span>
                  <h3 className="sb-service-card__title">{title}</h3>
                  <p className="sb-service-card__desc">{desc}</p>
                  <span className="sb-service-card__tag">{tag}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DESIRE */}
        <section className="sb-section sb-desire">
          <div className="sb-desire__decor" />
          <div className="sb-container">
            <div className="sb-desire__inner">
              <div>
                <h2 className="sb-desire__title reveal">Представь: завтра утром…</h2>
                <div className="sb-desire__scene reveal reveal-d1">
                  <p>Ты просыпаешься от звука волн. Выходишь на веранду — <strong>стакан горячего кофе, туман над бухтой, тишина.</strong></p>
                  <p>Дети ещё спят. Впереди — весь день у моря.</p>
                  <p><strong>Никаких совещаний. Никаких дедлайнов. Только это.</strong></p>
                  <p style={{ marginTop: "1.5rem" }}>Именно за этим к нам возвращаются каждое лето. Именно за этим стоит забронировать прямо сейчас.</p>
                </div>
                <div style={{ marginTop: "2rem" }} className="reveal reveal-d2">
                  <button className="sb-btn sb-btn--primary" onClick={() => scrollTo("#cta")}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    Хочу туда
                  </button>
                </div>
              </div>
              <blockquote className="sb-desire__quote reveal reveal-d2">
                <div className="sb-desire__quote-stars">★★★★★</div>
                <p className="sb-desire__quote-text">«Лучший отдых за 5 лет. Дети не хотели уезжать, мы тоже. Уже забронировали на следующее лето.»</p>
                <footer className="sb-desire__quote-author">— Марина К., Владивосток · Август 2025</footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <ReviewsCarousel />

        {/* TRUST */}
        <section className="sb-section sb-trust" id="trust">
          <div className="sb-container">
            <span className="sb-section__eyebrow reveal">Цифры и факты</span>
            <h2 className="sb-section__title reveal reveal-d1">Почему выбирают нас</h2>
            <div className="sb-trust__grid">
              {([
                ["4.9/5.0", "Средняя оценка за сезон 2025"],
                ["70%", "Гостей возвращаются каждый год"],
                ["Май", "Бронирования на июль закрываются в мае"],
                ["8 лет", "На рынке туризма Приморья"],
              ] as const).map(([num, label], i) => (
                <div key={label} className={`sb-trust-item reveal reveal-d${i + 1}`}>
                  <div className="sb-trust-item__num">{num}</div>
                  <div className="sb-trust-item__label">{label}</div>
                </div>
              ))}
            </div>
            <div className="sb-trust__guarantees">
              {["Бесплатная отмена за 14 дней", "Фиксированная цена без доплат", "Трансфер от вокзала по запросу", "Ответ за 15 минут в Telegram"].map((g) => (
                <div key={g} className="sb-guarantee reveal">
                  <span className="sb-guarantee__icon">✓</span>
                  {g}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="sb-cta" id="cta">
          <div className="sb-cta__layout">
            {/* LEFT — контакты */}
            <div className="sb-cta__left">
              <span className="sb-cta__eyebrow">Лето начинается 1 июня</span>
              <h2 className="sb-cta__title reveal">Ваше место ещё свободно?</h2>
              <p className="sb-cta__sub reveal reveal-d1" style={{ marginInline: 0 }}>Июль и август уже на 80% забронированы. Лучшие домики у воды уходят первыми.</p>
              <div className="sb-cta__urgency reveal reveal-d2" style={{ justifyContent: "flex-start" }}>
                <span className="sb-cta__urgency-text">Занято:</span>
                <div className="sb-cta__urgency-bar">
                  <div className="sb-cta__urgency-fill" />
                </div>
                <span className="sb-cta__urgency-text">80% на август</span>
              </div>
              <div className="sb-cta__actions reveal reveal-d2" style={{ justifyContent: "flex-start" }}>
                <a href="tel:+79999999999" className="sb-btn sb-btn--white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Позвонить
                </a>
                <a href="https://t.me/sinyayabuhta" className="sb-btn sb-btn--outline-white" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 14.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                  </svg>
                  Telegram
                </a>
              </div>
              <div className="sb-cta__contacts reveal reveal-d3">
                <div className="sb-cta-contact">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Работаем 7 дней, 9:00 – 21:00</span>
                </div>
              </div>
            </div>

            {/* RIGHT — форма */}
            <div className="sb-cta__right reveal reveal-d2">
              {formStatus === "success" ? (
                <div className="sb-form__success">
                  <div className="sb-form__success-icon">🎉</div>
                  <div className="sb-form__success-title">Заявка принята!</div>
                  <div className="sb-form__success-sub">Мы свяжемся с вами в течение 15 минут и подберём лучший вариант.</div>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: "0.25rem", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.55)" }}>Оставить заявку</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "white", marginBottom: "0.25rem" }}>Напишите нам</h3>
                  <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.65)", marginBottom: "0.5rem" }}>Ответим за 15 минут и забронируем лучшие даты</p>
                  <form className="sb-form" onSubmit={handleSubmit} noValidate>
                    <div className="sb-form__row">
                      <div className="sb-form__group">
                        <label className="sb-form__label" htmlFor="f-name">Имя *</label>
                        <input
                          id="f-name"
                          className={`sb-form__input${formErrors.name ? " sb-error" : ""}`}
                          type="text"
                          placeholder="Иван"
                          value={formData.name}
                          onChange={(e) => setField("name", e.target.value)}
                        />
                        {formErrors.name && <span className="sb-form__err">{formErrors.name}</span>}
                      </div>
                      <div className="sb-form__group">
                        <label className="sb-form__label" htmlFor="f-phone">Телефон *</label>
                        <input
                          id="f-phone"
                          className={`sb-form__input${formErrors.phone ? " sb-error" : ""}`}
                          type="tel"
                          placeholder="+7 900 000-00-00"
                          value={formData.phone}
                          onChange={(e) => setField("phone", e.target.value)}
                        />
                        {formErrors.phone && <span className="sb-form__err">{formErrors.phone}</span>}
                      </div>
                    </div>
                    <div className="sb-form__group">
                      <label className="sb-form__label" htmlFor="f-dates">Желаемые даты</label>
                      <input
                        id="f-dates"
                        className="sb-form__input"
                        type="text"
                        placeholder="Например: 15–22 июля"
                        value={formData.dates}
                        onChange={(e) => setField("dates", e.target.value)}
                      />
                    </div>
                    {formStatus === "error" && (
                      <p className="sb-form__err">Не удалось отправить. Попробуйте ещё раз или позвоните нам.</p>
                    )}
                    <button type="submit" className="sb-btn sb-btn--primary sb-form__submit" disabled={formStatus === "loading"}>
                      {formStatus === "loading" ? "Отправляем…" : "Отправить заявку →"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="sb-footer">
        <div className="sb-container">
          <div className="sb-footer__logo">Синяя Бухта</div>
          <p>База отдыха у Японского моря · Приморский край<br />Сезон: Июнь — Октябрь · © 2026 Все права защищены</p>
        </div>
      </footer>
    </>
  );
}