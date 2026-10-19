import { useTheme } from '../context/ThemeContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Header({ onHome }) {
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, t } = useLanguage()

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <button className="brand" onClick={onHome}>
          <span className="brand-logo">📚</span>
          <span className="brand-name">{t('appTitle')}</span>
        </button>
        <div className="topbar-actions">
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
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? t('themeToDark') : t('themeToLight')}
            title={theme === 'light' ? t('themeToDark') : t('themeToLight')}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  )
}
