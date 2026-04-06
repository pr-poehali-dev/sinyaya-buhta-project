import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/905f43c3-9796-484a-b6a4-5fdc230be13e/files/dbaa5c73-0240-4ea5-bea3-c62d4c731aa4.jpg";
const BANYA_IMG = "https://cdn.poehali.dev/projects/905f43c3-9796-484a-b6a4-5fdc230be13e/files/e6eabce6-5423-4098-b714-34056603ca09.jpg";
const TENT_IMG = "https://cdn.poehali.dev/projects/905f43c3-9796-484a-b6a4-5fdc230be13e/files/40b0f993-22f6-4a32-8478-f6356f984be4.jpg";

const navLinks = [
  { label: "О месте", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Номера", href: "#rooms" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const services = [
  {
    icon: "Flame",
    title: "Баня у моря",
    desc: "Дровяная баня прямо у кромки воды. Прыгайте в море с горяча — это незабываемо.",
    tag: "Хит сезона",
  },
  {
    icon: "Anchor",
    title: "Собственная бухта",
    desc: "Закрытая бухта с прозрачной водой только для гостей. Никакой толпы, только вы и море.",
    tag: "Эксклюзив",
  },
  {
    icon: "Waves",
    title: "Японское море",
    desc: "Панорамный вид на морские просторы — рассвет над водой запомнится навсегда.",
    tag: "Природа",
  },
  {
    icon: "Star",
    title: "Шатры-премиум",
    desc: "Глэмпинг-шатры с полным комфортом: кровати, отопление, терраса с видом на море.",
    tag: "Комфорт",
  },
  {
    icon: "Fish",
    title: "Рыбалка",
    desc: "Морская рыбалка с берега или лодки. Инструктор, снасти — всё включено.",
    tag: "Активный отдых",
  },
  {
    icon: "UtensilsCrossed",
    title: "Морские ужины",
    desc: "Свежие морепродукты на барбекю с закатом. Краб, гребешок, устрицы прямо с воды.",
    tag: "Гастро",
  },
];

const rooms = [
  {
    title: "Шатёр «Бухта»",
    price: "от 12 000 ₽",
    night: "/ ночь",
    img: TENT_IMG,
    features: ["Вид на море", "Двуспальная кровать", "Терраса", "Завтрак включён"],
    badge: "Бестселлер",
  },
  {
    title: "Шатёр «Утёс»",
    price: "от 9 500 ₽",
    night: "/ ночь",
    img: HERO_IMG,
    features: ["Панорамные окна", "До 4 гостей", "Мангал", "Парковка"],
    badge: null,
  },
  {
    title: "Пакет «Баня + Шатёр»",
    price: "от 16 000 ₽",
    night: "/ ночь",
    img: BANYA_IMG,
    features: ["Баня на 3 часа", "Шатёр «Бухта»", "Морепродукты", "Трансфер"],
    badge: "Топ выбор",
  },
];

const reviews = [
  {
    name: "Анастасия М.",
    city: "Владивосток",
    text: "Были в июле — это просто космос. Баня с видом на закат, потом прыжок в море. Уже бронируем на август снова!",
    stars: 5,
    date: "Июль 2025",
  },
  {
    name: "Дмитрий К.",
    city: "Хабаровск",
    text: "Приехали с семьёй на 4 дня. Дети в восторге — своя бухта, ни одного постороннего. Шатёр тёплый даже ночью.",
    stars: 5,
    date: "Июнь 2025",
  },
  {
    name: "Елена В.",
    city: "Москва",
    text: "Летела специально сюда из Москвы — не пожалела. Вид на Японское море с террасы шатра — это моё лучшее фото за год.",
    stars: 5,
    date: "Август 2025",
  },
];

const stats = [
  { num: "3", label: "км от трассы" },
  { num: "8", label: "шатров" },
  { num: "47", label: "м до моря" },
  { num: "★ 4.9", label: "рейтинг" },
];

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", date: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="grain min-h-screen" style={{ backgroundColor: "#08090f", color: "#ede8dc" }}>
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-glass" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-display text-2xl font-light tracking-wider" style={{ color: "#2dd4bf" }}>
            БУХТА
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleScroll(l.href)}
                className="font-body text-sm tracking-wide transition-colors duration-300"
                style={{ color: "#9ba3af" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2dd4bf")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ba3af")}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleScroll("#contacts")}
            className="hidden md:block btn-primary px-6 py-2.5 rounded-full text-sm font-semibold"
            style={{ fontFamily: "'Golos Text', sans-serif" }}
          >
            <span>Забронировать</span>
          </button>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: "#2dd4bf" }}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden nav-glass px-6 pb-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <button key={l.href} onClick={() => handleScroll(l.href)} className="text-left py-2 border-b" style={{ borderColor: "rgba(45,212,191,0.1)", color: "#ede8dc" }}>
                {l.label}
              </button>
            ))}
            <button onClick={() => handleScroll("#contacts")} className="btn-primary px-6 py-3 rounded-full text-sm font-semibold mt-2">
              <span>Забронировать</span>
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="hero-bg relative min-h-screen flex items-end pb-20">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Глэмпинг у Японского моря" className="w-full h-full object-cover" />
        </div>
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <p className="vertical-text section-label" style={{ color: "rgba(45,212,191,0.5)" }}>Японское море</p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <div className="section-label animate-slide-up mb-6">Приморский край · Японское море</div>
            <h1 className="font-display animate-slide-up-delay-1 mb-6 leading-none" style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)", fontWeight: 300, color: "#ede8dc" }}>
              Дикая природа<br />
              <em className="shimmer-text" style={{ fontStyle: "italic" }}>с комфортом</em>
            </h1>
            <p className="animate-slide-up-delay-2 font-body text-lg mb-10 max-w-xl leading-relaxed" style={{ color: "rgba(237,232,220,0.7)" }}>
              Глэмпинг-шатры на берегу. Баня у воды. Собственная бухта. Вид на Японское море, от которого захватывает дух.
            </p>
            <div className="animate-slide-up-delay-3 flex flex-wrap gap-4">
              <button onClick={() => handleScroll("#contacts")} className="btn-primary relative pulse-ring px-8 py-4 rounded-full text-base" style={{ fontFamily: "'Golos Text', sans-serif" }}>
                <span>Забронировать шатёр</span>
              </button>
              <button onClick={() => handleScroll("#rooms")} className="px-8 py-4 rounded-full text-base border transition-all duration-300" style={{ borderColor: "rgba(45,212,191,0.3)", color: "#ede8dc", fontFamily: "'Golos Text', sans-serif" }}>
                Посмотреть номера
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 scroll-indicator" style={{ color: "rgba(45,212,191,0.5)" }}>
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* STATS */}
      <section style={{ backgroundColor: "#0d1525", borderTop: "1px solid rgba(45,212,191,0.15)", borderBottom: "1px solid rgba(45,212,191,0.15)" }}>
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-light mb-1" style={{ color: "#2dd4bf" }}>{s.num}</div>
              <div className="font-body text-sm" style={{ color: "rgba(237,232,220,0.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-4">О месте</div>
            <div className="divider-line mb-8"></div>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-8" style={{ color: "#ede8dc" }}>
              Место, куда<br />
              <span style={{ color: "#f59e0b" }}>хочется вернуться</span>
            </h2>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: "rgba(237,232,220,0.65)" }}>
              Мы создали место, где нетронутая природа Приморья встречает люкс-комфорт. Скалы, сосны, Японское море — и ни одного лишнего звука, кроме волн.
            </p>
            <p className="font-body text-base leading-relaxed mb-10" style={{ color: "rgba(237,232,220,0.65)" }}>
              Наша закрытая бухта — только для гостей. Никаких случайных людей. Только вы, море и небо.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Экологичный отдых", "Без толпы", "Круглый год", "Pet-friendly"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full text-sm font-body" style={{ border: "1px solid rgba(45,212,191,0.2)", color: "#2dd4bf", backgroundColor: "rgba(45,212,191,0.05)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="img-hover-zoom rounded-2xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <img src={BANYA_IMG} alt="Баня у моря" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl p-6 shadow-2xl" style={{ backgroundColor: "#0d1525", border: "1px solid rgba(45,212,191,0.2)" }}>
              <div className="font-display text-3xl font-light mb-1" style={{ color: "#f59e0b" }}>№1</div>
              <div className="font-body text-sm" style={{ color: "rgba(237,232,220,0.6)" }}>Глэмпинг Приморья</div>
              <div className="font-body text-xs mt-1" style={{ color: "rgba(237,232,220,0.4)" }}>по отзывам гостей</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24" style={{ backgroundColor: "#0a0e1a" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-label mb-4">Что вас ждёт</div>
            <div className="divider-line mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, #2dd4bf, transparent)" }}></div>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#ede8dc" }}>
              Наши <em style={{ color: "#2dd4bf", fontStyle: "italic" }}>услуги</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="card-hover rounded-2xl p-8 relative group" style={{ backgroundColor: "#111827", border: "1px solid rgba(45,212,191,0.08)" }}>
                <div className="number-accent absolute top-4 right-6">0{i + 1}</div>
                <div className="mb-6 w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(45,212,191,0.1)" }}>
                  <Icon name={s.icon} size={22} style={{ color: "#2dd4bf" }} />
                </div>
                <div className="mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-light mb-3" style={{ color: "#ede8dc" }}>{s.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(237,232,220,0.55)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section id="rooms" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-label mb-4">Размещение</div>
          <div className="divider-line mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, #2dd4bf, transparent)" }}></div>
          <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#ede8dc" }}>
            Наши <em style={{ color: "#f59e0b", fontStyle: "italic" }}>шатры</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((r, i) => (
            <div key={i} className="card-hover rounded-2xl overflow-hidden" style={{ backgroundColor: "#111827", border: "1px solid rgba(45,212,191,0.08)" }}>
              <div className="img-hover-zoom relative" style={{ aspectRatio: "4/3" }}>
                <img src={r.img} alt={r.title} className="w-full h-full object-cover" />
                {r.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold font-body" style={{ backgroundColor: "#f59e0b", color: "#08090f" }}>
                    {r.badge}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-light mb-4" style={{ color: "#ede8dc" }}>{r.title}</h3>
                <ul className="mb-6 space-y-2">
                  {r.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-body text-sm" style={{ color: "rgba(237,232,220,0.6)" }}>
                      <Icon name="Check" size={14} style={{ color: "#2dd4bf", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-display text-3xl font-light" style={{ color: "#2dd4bf" }}>{r.price}</div>
                    <div className="font-body text-xs mt-0.5" style={{ color: "rgba(237,232,220,0.4)" }}>{r.night}</div>
                  </div>
                  <button
                    onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
                    className="btn-primary px-5 py-2.5 rounded-full text-sm"
                  >
                    <span>Забронировать</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24" style={{ backgroundColor: "#0a0e1a" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-label mb-4">Отзывы гостей</div>
            <div className="divider-line mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, #2dd4bf, transparent)" }}></div>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#ede8dc" }}>
              Что говорят<br />
              <em style={{ color: "#2dd4bf", fontStyle: "italic" }}>наши гости</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <div key={i} className="rounded-2xl p-8 flex flex-col" style={{ backgroundColor: "#111827", border: "1px solid rgba(45,212,191,0.08)" }}>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Icon key={j} name="Star" size={16} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                  ))}
                </div>
                <p className="font-body text-base leading-relaxed flex-1 mb-6" style={{ color: "rgba(237,232,220,0.7)", fontStyle: "italic" }}>
                  «{r.text}»
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-body font-semibold text-sm" style={{ color: "#ede8dc" }}>{r.name}</div>
                    <div className="font-body text-xs mt-0.5" style={{ color: "rgba(237,232,220,0.4)" }}>{r.city}</div>
                  </div>
                  <div className="font-body text-xs" style={{ color: "rgba(237,232,220,0.3)" }}>{r.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,9,15,0.9), rgba(13,21,37,0.85))" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="section-label mb-6">Ограниченное количество мест</div>
          <h2 className="font-display text-5xl md:text-7xl font-light leading-tight mb-6" style={{ color: "#ede8dc" }}>
            Лето бронируют<br />
            <span className="shimmer-text">прямо сейчас</span>
          </h2>
          <p className="font-body text-lg mb-10" style={{ color: "rgba(237,232,220,0.6)" }}>
            Успейте забронировать шатёр на лучшие даты — мест всего 8.
          </p>
          <button
            onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary relative pulse-ring px-10 py-5 rounded-full text-lg font-semibold"
          >
            <span>Узнать свободные даты</span>
          </button>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24" style={{ backgroundColor: "#0d1525" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="section-label mb-4">Контакты</div>
              <div className="divider-line mb-8"></div>
              <h2 className="font-display text-5xl md:text-6xl font-light mb-8 leading-tight" style={{ color: "#ede8dc" }}>
                Свяжитесь<br />
                <em style={{ color: "#2dd4bf", fontStyle: "italic" }}>с нами</em>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (XXX) XXX-XX-XX" },
                  { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "@glamping_buchta" },
                  { icon: "MapPin", label: "Адрес", value: "Приморский край, Японское море" },
                  { icon: "Clock", label: "Заезд / Выезд", value: "Заезд 14:00 · Выезд 12:00" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "rgba(45,212,191,0.1)" }}>
                      <Icon name={c.icon} size={18} style={{ color: "#2dd4bf" }} />
                    </div>
                    <div>
                      <div className="font-body text-xs mb-1" style={{ color: "rgba(237,232,220,0.4)" }}>{c.label}</div>
                      <div className="font-body text-base" style={{ color: "#ede8dc" }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-8" style={{ backgroundColor: "#111827", border: "1px solid rgba(45,212,191,0.12)" }}>
              <h3 className="font-display text-3xl font-light mb-2" style={{ color: "#ede8dc" }}>Оставить заявку</h3>
              <p className="font-body text-sm mb-8" style={{ color: "rgba(237,232,220,0.45)" }}>Мы перезвоним в течение часа</p>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-body text-xs mb-2 block" style={{ color: "rgba(237,232,220,0.45)" }}>Ваше имя</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Как вас зовут?"
                    className="w-full px-4 py-3.5 rounded-xl font-body text-sm outline-none transition-all duration-300"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(45,212,191,0.15)", color: "#ede8dc" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(45,212,191,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(45,212,191,0.15)")}
                  />
                </div>
                <div>
                  <label className="font-body text-xs mb-2 block" style={{ color: "rgba(237,232,220,0.45)" }}>Телефон</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3.5 rounded-xl font-body text-sm outline-none transition-all duration-300"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(45,212,191,0.15)", color: "#ede8dc" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(45,212,191,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(45,212,191,0.15)")}
                  />
                </div>
                <div>
                  <label className="font-body text-xs mb-2 block" style={{ color: "rgba(237,232,220,0.45)" }}>Желаемые даты</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="Например: 15–18 июля"
                    className="w-full px-4 py-3.5 rounded-xl font-body text-sm outline-none transition-all duration-300"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(45,212,191,0.15)", color: "#ede8dc" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(45,212,191,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(45,212,191,0.15)")}
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4 rounded-xl font-semibold font-body text-base mt-2">
                  <span>Отправить заявку</span>
                </button>
                <p className="text-center font-body text-xs" style={{ color: "rgba(237,232,220,0.3)" }}>
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10" style={{ backgroundColor: "#08090f", borderTop: "1px solid rgba(45,212,191,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-2xl font-light" style={{ color: "#2dd4bf" }}>БУХТА</div>
          <p className="font-body text-xs text-center" style={{ color: "rgba(237,232,220,0.3)" }}>
            © 2025 Глэмпинг «Бухта» · Приморский край · Японское море
          </p>
          <div className="flex gap-6">
            {navLinks.slice(0, 3).map((l) => (
              <button
                key={l.href}
                onClick={() => handleScroll(l.href)}
                className="font-body text-xs transition-colors"
                style={{ color: "rgba(237,232,220,0.35)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2dd4bf")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(237,232,220,0.35)")}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
