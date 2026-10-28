import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Header({ onHome, onOpenSearch }) {
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, t } = useLanguage()
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 767)
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth <= 767)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const isMobile = mobile

  const setLight = () => {
    if (theme !== 'light') toggleTheme()
  }
  const setDark = () => {
    if (theme !== 'dark') toggleTheme()
  }

  return (
    <>
      <header className="topbar">
        <div className="container topbar-inner">
          <button className="brand" onClick={onHome}>
            <span className="brand-logo">📚</span>
          </button>
          {!isMobile && (
            <button className="search-toggle" onClick={onOpenSearch} title={t('searchTitle')}>
              🔍 <span className="search-toggle-text">{t('searchBooks')}</span>
            </button>
          )}
          <div className="topbar-actions">
            <div className="lang-toggle" role="group" aria-label="Language">
              <button
                className={lang === 'en' ? 'lang-btn active' : 'lang-btn'}
                onClick={() => setLang('en')}
              >
                <span className="lang-globe">🌐</span>
                <span className="lang-stack">
                  <span className="lang-top">IN</span>
                  <span className="lang-bottom">English</span>
                </span>
              </button>
              <button
                className={lang === 'hi' ? 'lang-btn active' : 'lang-btn'}
                onClick={() => setLang('hi')}
              >
                <span className="lang-stack">
                  <span className="lang-top">IN</span>
                  <span className="lang-bottom">हिन्दी</span>
                </span>
              </button>
            </div>
            {isMobile ? (
              <div className="theme-segment">
                <button
                  className={`theme-seg-btn ${theme === 'light' ? 'active' : ''}`}
                  onClick={setLight}
                  aria-label={t('themeToLight')}
                  title={t('themeToLight')}
                >
                  ☀️
                </button>
                <button
                  className={`theme-seg-btn ${theme === 'dark' ? 'active' : ''}`}
                  onClick={setDark}
                  aria-label={t('themeToDark')}
                  title={t('themeToDark')}
                >
                  🌙
                </button>
              </div>
            ) : (
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={theme === 'light' ? t('themeToDark') : t('themeToLight')}
                title={theme === 'light' ? t('themeToDark') : t('themeToLight')}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            )}
          </div>
        </div>
      </header>
      {isMobile && (
        <div className="mobile-search-wrap">
          <button className="mobile-search-bar" onClick={onOpenSearch}>
            <span className="mobile-search-icon">🔍</span>
            <span className="mobile-search-text">{t('searchBooks')}</span>
          </button>
        </div>
      )}
    </>
  )
}