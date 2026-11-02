import { useLanguage } from '../context/LanguageContext.jsx'
import { useMedium } from '../context/MediumContext.jsx'
import { getBookPdf, hasHindiPdf } from '../data/books.js'
import MediumToggle from './MediumToggle.jsx'

const LANGUAGE_SUBJECTS = ['english', 'hindi', 'sanskrit']

export default function SubjectView({ classData, subject, onBack, onSelectBook }) {
  const { lang, t } = useLanguage()
  const { medium } = useMedium()

  const isLanguageSubject = LANGUAGE_SUBJECTS.includes(subject.id)
  const subjectHasHindi = subject.books.some(hasHindiPdf)
  const showSubjectFallback =
    medium === 'hi' && !isLanguageSubject && !subjectHasHindi

  // English-medium books first, Hindi-medium books below (stable order).
  const sortedBooks = [...subject.books].sort((a, b) => {
    const aHindi = hasHindiPdf(a)
    const bHindi = hasHindiPdf(b)
    if (aHindi === bHindi) return 0
    return aHindi ? 1 : -1
  })

  return (
    <section className="subject-view">
      <div className="view-topbar">
        <button className="back-btn" onClick={onBack}>
          ← {t('back')}
        </button>
        {!isLanguageSubject && <MediumToggle />}
      </div>

      <div className="page-heading">
        <h1 className="page-title">
          <span className="page-logo">📚</span> {t('appTitle')} — Class {classData.classNumber}
        </h1>
        <p className="page-subtitle">
          <span className="subject-chip">{subject.icon} {subject.name[lang]}</span>
        </p>
      </div>

      {showSubjectFallback && (
        <div className="medium-bar">
          <p className="medium-note">⚠️ {t('noHindiSubject')}</p>
        </div>
      )}

      <div className="book-list">
        {sortedBooks.map((b) => {
          const hindi = hasHindiPdf(b)
          const isHindiBook = subject.id === 'hindi'
          const isSanskritBook = subject.id === 'sanskrit'
          const showFallback =
            medium === 'hi' && !isLanguageSubject && !hindi
          const pdfUrl = getBookPdf(b, medium)

          return (
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
                <div className="book-mediums">
                  {isHindiBook ? (
                    <span className="medium-pill hi">हिन्दी</span>
                  ) : isSanskritBook ? (
                    <span className="medium-pill">संस्कृत</span>
                  ) : (
                    <>
                      <span className="medium-pill">EN</span>
                      {hindi && <span className="medium-pill hi">हिन्दी</span>}
                    </>
                  )}
                </div>
                {showFallback && (
                  <p className="medium-warning">⚠️ {t('hindiFallback')}</p>
                )}
              </div>
              <div className="book-actions">
                <span className="btn btn-open">
                  📖 {t('open')}
                </span>
                <a
                  className="btn btn-download"
                  href={pdfUrl}
                  download
                  onClick={(e) => e.stopPropagation()}
                >
                  ⬇ {t('download')}
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
