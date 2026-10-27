import { useLanguage } from '../context/LanguageContext.jsx'
import { useIsMobile } from '../hooks/useMediaQuery.js'

export default function ClassView({ classData, onBack, onSelectSubject }) {
  const { lang, t } = useLanguage()
  const isMobile = useIsMobile()

  return (
    <section className="class-view">
      <button className="back-btn" onClick={onBack}>
        ← {t('back')}
      </button>

      {isMobile ? (
        <div className="mobile-class-title">
          <span>{t('classLabel')(classData.classNumber)}</span>
        </div>
      ) : (
        <div className="page-heading">
          <h1 className="page-title">{t('classLabel')(classData.classNumber)}</h1>
          <p className="page-subtitle">{t('chooseSubject')}</p>
        </div>
      )}

      <div className="subject-grid">
        {classData.subjects.map((s) => (
          <button
            key={s.id}
            className="subject-card"
            onClick={() => onSelectSubject(classData.classNumber, s.id)}
          >
            <span className="subject-icon">{s.icon}</span>
            <span className="subject-name">{s.name[lang]}</span>
            <span className="subject-count">{t('book')(s.books.length)}</span>
          </button>
        ))}
      </div>
    </section>
  )
}