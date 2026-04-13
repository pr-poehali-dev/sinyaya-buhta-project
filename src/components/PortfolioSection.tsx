import { useState } from "react";

const CDN = "https://cdn.poehali.dev/projects/905f43c3-9796-484a-b6a4-5fdc230be13e/files";

const ALL_ITEMS = [
  { tab: "all", tag: "Главное",       title: "Наша закрытая бухта",      desc: "Только для гостей базы — никакой толпы.",                             img: "https://cdn.poehali.dev/projects/905f43c3-9796-484a-b6a4-5fdc230be13e/bucket/70f16428-6053-4f03-a507-264e39e97fe7.jpeg", tall: true },
  { tab: "all", tag: "Размещение",    title: "Глэмпинг-шатёр",           desc: "Прозрачная стена — море прямо из постели.",                           img: `${CDN}/2913f81d-03da-4493-8039-45a5091c13cf.jpg`, chips: ["от 5 500 ₽", "2 места"] },
  { tab: "all", tag: "Гастрономия",   title: "Краб прямо с лодки",       desc: "Рыбаки привозят улов к нашему пирсу каждое утро.",                    img: `${CDN}/61980d80-7310-4cf6-afee-dfb11e1053d8.jpg` },
  { tab: "all", tag: "Релакс",        title: "Баня с купелью",           desc: "Берёзовый пар + ледяная купель + звёздное небо.",                     img: `${CDN}/ce49564e-1703-4a36-84d7-aa8c6279e80d.jpg` },
  { tab: "all", tag: "Активности",    title: "SUP и каяки",              desc: "Прокат без доплат для всех гостей.",                                  img: `${CDN}/17e4d7c3-8d82-40cd-9f3d-3fa297180654.jpg` },
  { tab: "all", tag: "Атмосфера",     title: "Закаты здесь особенные",   desc: "Японское море красит небо в цвета, которые не забудешь.",             img: `${CDN}/4df72aa8-f9e2-465f-a86a-ece4eb0e8f9b.jpg` },
];

const ACCOMMODATION = [
  { tag: "Глэмпинг",  title: "Купол «Рассвет»",      desc: "Прозрачная стена, двуспальная кровать, вид на море.", img: `${CDN}/18dd566d-922f-412d-b54b-c9d9812bb360.jpg`, chips: ["от 5 500 ₽", "2 гостя"] },
  { tag: "Домик",     title: "Домик «Бухта»",         desc: "Веранда с видом на море, кухня, кондиционер.",        img: `${CDN}/291493a2-7624-40c3-9a63-4eee25a5c723.jpg`, chips: ["от 3 500 ₽", "4 гостя"] },
  { tag: "Семейный",  title: "Семейный «Берег»",      desc: "Два этажа, детские кровати, качели, песочница.",      img: `${CDN}/8233bb49-f941-4dfa-b206-8b0663bbb4a3.jpg`, chips: ["от 6 000 ₽", "6 гостей"] },
];

const BEACH = [
  { tag: "Пляж",      title: "Раннее утро у воды",          desc: "6 утра — пляж только твой. Тишина и первые лучи солнца.",                           img: `${CDN}/2d7764b0-0e72-4ccc-8319-f49c0b7ae667.jpg` },
  { tag: "Мелководье",title: "Безопасная зона для детей",   desc: "Песчаное дно, спокойный заход — дети плещутся, родители отдыхают рядом.",           img: `${CDN}/b7f4bb36-4994-476c-87a8-8068587a829f.jpg` },
  { tag: "Прокат",    title: "SUP и каяки",                 desc: "Всё включено в стоимость проживания.",                                              img: `${CDN}/17e4d7c3-8d82-40cd-9f3d-3fa297180654.jpg`, chips: ["включено", "инструктаж"] },
];

const FOOD = [
  { tag: "Морепродукты", title: "Краб прямо с лодки",   desc: "Краб, гребешок, кальмар — каждое утро.",                              img: `${CDN}/61980d80-7310-4cf6-afee-dfb11e1053d8.jpg` },
  { tag: "BBQ",          title: "Мангальная зона",       desc: "Беседки с мангалом — беседка включена в проживание.",                 img: `${CDN}/f469bb77-b394-4d91-a741-42741e430269.jpg` },
  { tag: "Мастер-класс", title: "«Готовим улов»",        desc: "Каждую субботу в 14:00 — шеф учит готовить рыбу.",                   img: `${CDN}/b9dbd5bf-3214-4d63-8e04-370fab429d12.jpg`, chips: ["по субботам"] },
  { tag: "Спецформат",   title: "Ужин на закате",        desc: "Романтический ужин на берегу — по предзаказу.",                      img: `${CDN}/53a2916e-1e8e-41cd-93ee-3dd7fb2fe9ec.jpg`, chips: ["предзаказ", "от 2 500 ₽/чел"] },
];

const RELAX = [
  { tag: "Баня",  title: "Русская баня у моря",    desc: "Берёзовый пар, купель, нырнуть в море в 23:00.",             img: `${CDN}/ce49564e-1703-4a36-84d7-aa8c6279e80d.jpg`, chips: ["3 часа", "до 6 чел"] },
  { tag: "Чаны",  title: "Чаны под звёздами",      desc: "Горячая вода с травами под открытым небом.",                 img: `${CDN}/bfb0ecb5-a62b-440f-a3da-e054fa0e4ee5.jpg` },
  { tag: "Йога",  title: "Утренняя йога у воды",   desc: "Ежедневно в 7:30 у берега — для всех уровней.",             img: `${CDN}/37cc8cc1-5e28-4701-acbb-899eec7fda56.jpg`, chips: ["бесплатно"] },
];

const ACTIVITIES = [
  { tag: "Рыбалка",   title: "Морская рыбалка",           desc: "Выход на рассвете, гид включён — поймали, приготовили.",             img: `${CDN}/febad2df-9624-4499-89a0-1f62cbf7b0ad.jpg`, chips: ["5:30 утра"] },
  { tag: "Катер",     title: "Экскурсия по бухтам",       desc: "Скалы, гроты, морские птицы — вдоль берега.",                        img: `${CDN}/acf6229e-9170-4637-9a67-09f019c4b9ea.jpg`, chips: ["1–3 часа", "до 8 чел"] },
  { tag: "Дайвинг",   title: "Дайвинг для начинающих",    desc: "Инструктор, снаряжение, первое погружение в Японском море.",         img: `${CDN}/75a6aa10-7b54-4eef-9d8d-e2866f993f59.jpg`, chips: ["с 12 лет"] },
  { tag: "Треккинг",  title: "Маршруты по бухтам",        desc: "Пешие прогулки по скалам и тайным бухтам — с картой или гидом.",    img: `${CDN}/26103a78-7766-4791-968b-d52e83da5781.jpg`, chips: ["3–8 км", "карта бесплатно"] },
];

const TABS = [
  { key: "all",           label: "🏝️ Все" },
  { key: "accommodation", label: "🏠 Домики" },
  { key: "beach",         label: "🌊 Пляж" },
  { key: "food",          label: "🦀 Гастрономия" },
  { key: "relax",         label: "🔥 Баня" },
  { key: "activities",    label: "🎣 Активности" },
];

const PANELS: Record<string, typeof ACCOMMODATION> = {
  all: ALL_ITEMS as typeof ACCOMMODATION,
  accommodation: ACCOMMODATION,
  beach: BEACH,
  food: FOOD,
  relax: RELAX,
  activities: ACTIVITIES,
};

interface PCardProps {
  item: { tag: string; title: string; desc: string; img: string; chips?: string[]; tall?: boolean };
  masonry?: boolean;
}

function PCard({ item, masonry }: PCardProps) {
  return (
    <article className={`sb-pcard reveal${masonry && item.tall ? " sb-pcard--tall" : ""}`}>
      <img className="sb-pcard__img" src={item.img} alt={item.title} width="500" height="320" loading="lazy" />
      <div className="sb-pcard__overlay" />
      <div className="sb-pcard__body">
        <div className="sb-pcard__tag">{item.tag}</div>
        <h3 className="sb-pcard__title">{item.title}</h3>
        <p className="sb-pcard__desc">{item.desc}</p>
        {item.chips && item.chips.length > 0 && (
          <div className="sb-pcard__meta">
            {item.chips.map((c) => <span key={c} className="sb-pcard__chip">{c}</span>)}
          </div>
        )}
      </div>
    </article>
  );
}

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("all");
  const items = PANELS[activeTab];

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="sb-section sb-portfolio" id="portfolio">
      <div className="sb-container--wide">
        <span className="sb-section__eyebrow reveal">Галерея</span>
        <h2 className="sb-section__title reveal reveal-d1">Посмотри — и захочешь сюда</h2>
        <p className="sb-section__sub reveal reveal-d2">Реальные фото базы, пляжа и мероприятий. Выбирай категорию — смотри что цепляет.</p>

        <div className="sb-portfolio__tabs reveal reveal-d2" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={activeTab === t.key}
              className={`sb-ptab${activeTab === t.key ? " sb-ptab--active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "all" ? (
          <div className="sb-portfolio__masonry">
            {items.map((item) => <PCard key={item.title} item={item} masonry />)}
          </div>
        ) : (
          <div className="sb-portfolio__grid">
            {items.map((item) => <PCard key={item.title} item={item} />)}
          </div>
        )}

        <div className="sb-portfolio__cta">
          <button className="sb-btn sb-btn--primary" onClick={() => scrollTo("#cta")}>
            📅 Забронировать место сейчас
          </button>
        </div>
      </div>
    </section>
  );
}