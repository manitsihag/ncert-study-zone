import { useLanguage } from '../context/LanguageContext.jsx'
import { useIsMobile } from '../hooks/useMediaQuery.js'

export default function BookView({ classData, subject, book, onBack, onOpenPdf }) {
  const { lang, t } = useLanguage()
  const isMobile = useIsMobile()

  return (
    <section className="book-view">
      <div className="book-header">
        <button className="back-btn" onClick={onBack}>
          ← {t('back')}
        </button>
        <h1 className="book-title">{book.name[lang]}</h1>
      </div>

      <div className="book-meta-row">
        <span className="meta-badge">📄 {book.chapters.length} {t('chapters')}</span>
        <span className="meta-badge">PDF</span>
      </div>

      <div className="chapters-card">
        <h2 className="chapters-title">{t('chapters')}</h2>
        <ol className="chapter-list">
          {book.chapters.map((ch, i) => (
            <li key={i} className="chapter-item">
              <span className="chapter-number">{i + 1}</span>
              <span className="chapter-name">{ch[lang]}</span>
              <a
                className="chapter-open-btn"
                href={book.pdfUrl}
                target="_blank"
                rel="noreferrer"
              >
                📄 {t('open')}
              </a>
              <span className="chapter-arrow">→</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}