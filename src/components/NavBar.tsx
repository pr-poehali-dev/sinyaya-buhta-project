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

interface NavBarProps {
  scrolled: boolean;
  dark: boolean;
  onToggleDark: () => void;
  onScrollTo: (id: string) => void;
}

export default function NavBar({ scrolled, dark, onToggleDark, onScrollTo }: NavBarProps) {
  return (
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
              <a href={href} onClick={(e) => { e.preventDefault(); onScrollTo(href); }}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="sb-nav__actions">
          <button className="sb-nav__toggle" onClick={onToggleDark} aria-label="Сменить тему">
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <a href="#cta" className="sb-nav__cta" onClick={(e) => { e.preventDefault(); onScrollTo("#cta"); }}>Забронировать</a>
        </div>
      </div>
    </nav>
  );
}
