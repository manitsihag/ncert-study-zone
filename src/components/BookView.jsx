import { useLanguage } from '../context/LanguageContext.jsx'

// Generate chapter-wise PDF URL from book PDF URL
// e.g., jeff1ps.pdf -> jeff101.pdf (chapter 1), jeff102.pdf (chapter 2)
function getChapterPdfUrl(bookPdfUrl, chapterNum) {
  const match = bookPdfUrl.match(/\/([a-z]+)(\d+)ps\.pdf$/)
  if (!match) return bookPdfUrl
  const code = match[1]
  const part = match[2]
  const chapter = String(chapterNum + 1).padStart(2, '0')
  return `https://ncert.nic.in/textbook/pdf/${code}${part}${chapter}.pdf`
}

export default function BookView({ classData, subject, book, onBack, onOpenPdf }) {
  const { lang, t } = useLanguage()

  return (
    <section className="book-view">
      <div className="book-header">
        <button className="back-btn" onClick={onBack}>
          ← {t('back')}
        </button>
        <h1 className="book-title">{book.name[lang]}</h1>
        <a className="btn btn-download-full" onClick={() => onOpenPdf(book.name[lang], book.pdfUrl)}>
          ⬇ {t('downloadFull')}
        </a>
      </div>

      <div className="book-meta-row">
        <span className="meta-badge">📄 {book.chapters.length} {t('chapters')}</span>
        <span className="meta-badge">PDF</span>
      </div>

      <div className="chapters-card">
        <h2 className="chapters-title">{t('chapters')}</h2>
        <ol className="chapter-list">
          {book.chapters.map((ch, i) => (
            <li
              key={i}
              className="chapter-item"
              onClick={() => window.open(getChapterPdfUrl(book.pdfUrl, i), '_blank')}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  window.open(getChapterPdfUrl(book.pdfUrl, i), '_blank')
                }
              }}
            >
              <span className="chapter-number">{i + 1}</span>
              <span className="chapter-name">{ch[lang]}</span>
              <a
                className="chapter-open-btn"
                href={getChapterPdfUrl(book.pdfUrl, i)}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
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
