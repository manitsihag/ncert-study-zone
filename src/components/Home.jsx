import { classes } from '../data/books.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Home({ onSelectClass }) {
  const { t } = useLanguage()
  const { theme } = useTheme()

  return (
    <section className="home">
      <h1 className="home-title">
        <span className="home-logo">📚</span> {t('appTitle')}
      </h1>
      <p className="home-subtitle">{t('selectClass')}</p>

      <div className="class-grid">
        {classes.map((c) => {
          // Class 9, 10, 11 ke alag-alag colors; Class 12 theme ke hisaab se black/white
          const isClass12 = c.classNumber === 12
          const numberColor = isClass12
            ? (theme === 'dark' ? '#ffffff' : '#000000')
            : c.color
          const badgeStyle = isClass12
            ? (theme === 'dark'
                ? { backgroundColor: '#ffffff', color: '#0f172a' }
                : { backgroundColor: '#000000', color: '#ffffff' })
            : { backgroundColor: c.color, color: '#ffffff' }

          return (
            <button
              key={c.classNumber}
              className="class-card"
              onClick={() => onSelectClass(c.classNumber)}
            >
              <span className="class-number" style={{ color: numberColor }}>
                {c.classNumber}
              </span>
              <span className="class-label">{t('classLabel')(c.classNumber)}</span>
              <span className="class-badge" style={badgeStyle}>
                {t('available')}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
