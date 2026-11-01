import { useTheme } from '../context/ThemeContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Header({ onHome, onOpenSearch, hideSearchButton = false }) {
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, t } = useLanguage()

  return (
    <header className={`topbar${hideSearchButton ? ' topbar-no-search' : ''}`}>
      <div className="container topbar-inner">
        <button className="brand" onClick={onHome}>
          <span className="brand-logo">📚</span>
          <span className="brand-name">{t('appTitle')}</span>
        </button>
        <div className="topbar-actions">
          {!hideSearchButton && (
            <button className="search-toggle" onClick={onOpenSearch} title={t('searchTitle')}>
              🔍 <span className="search-toggle-text">{t('browseBooks')}</span>
            </button>
          )}
          <div className="lang-toggle" role="group" aria-label="Language">
            <button
              className={lang === 'en' ? 'lang-btn active' : 'lang-btn'}
              onClick={() => setLang('en')}
            >
              IN English
            </button>
            <button
              className={lang === 'hi' ? 'lang-btn active' : 'lang-btn'}
              onClick={() => setLang('hi')}
            >
              IN हिन्दी
            </button>
          </div>
        </div>
        <button
          className={`theme-toggle ${theme}`}
          onClick={toggleTheme}
          aria-label={theme === 'light' ? t('themeToDark') : t('themeToLight')}
          title={theme === 'light' ? t('themeToDark') : t('themeToLight')}
          role="switch"
          aria-checked={theme === 'dark'}
        >
          <span className="theme-toggle-track" aria-hidden="true">
            <span className="theme-icon theme-icon-sun">
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            </span>
            <span className="theme-icon theme-icon-moon">
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </span>
            <span className="theme-toggle-thumb" />
          </span>
        </button>
      </div>
    </header>
  )
}
