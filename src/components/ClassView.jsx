import { useLanguage } from '../context/LanguageContext.jsx'

export default function ClassView({ classData, onBack, onSelectSubject }) {
  const { lang, t } = useLanguage()

  return (
    <section className="class-view">
      <button className="back-btn mobile-hide" onClick={onBack}>
        ← {t('back')}
      </button>

      <div className="page-heading">
        <h1 className="page-title">{t('classLabel')(classData.classNumber)}</h1>
        <p className="page-subtitle">{t('chooseSubject')}</p>
      </div>

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