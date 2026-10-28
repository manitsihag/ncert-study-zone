import { useLanguage } from '../context/LanguageContext.jsx'
import { useIsMobile } from '../hooks/useMediaQuery.js'

export default function SubjectView({ classData, subject, onBack, onSelectBook }) {
  const { lang, t } = useLanguage()
  const isMobile = useIsMobile()

  return (
    <section className="subject-view">
      <button className="back-btn" onClick={onBack}>
        ← {t('back')}
      </button>

      <p className="page-subtitle subject-meta">
        <span className="subject-chip">{subject.icon} {subject.name[lang]}</span>
      </p>

      <div className="page-heading">
        <h1 className="page-title">{t('classLabel')(classData.classNumber)}</h1>
      </div>

      <div className="book-list">
        {subject.books.map((b) => (
          <div
            key={b.id}
            className="book-row"
            onClick={() => onSelectBook(classData.classNumber, subject.id, b.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectBook(classData.classNumber, subject.id, b.id)
              }
            }}
          >
            <div className="book-info">
              <h3 className="book-name">{b.name[lang]}</h3>
              <p className="book-meta">📄 {b.chapters.length} {t('chapters')}</p>
            </div>
            <div className={`book-actions ${isMobile ? 'mobile' : ''}`}>
              <span className="btn btn-open">
                📖 {t('open')}
              </span>
              <a
                className="btn btn-download"
                href={b.pdfUrl}
                download
                onClick={(e) => e.stopPropagation()}
              >
                ⬇ {t('download')}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}