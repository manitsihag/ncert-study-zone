import { useLanguage } from '../context/LanguageContext.jsx'
import { useMedium } from '../context/MediumContext.jsx'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import { getBookPdf } from '../data/books.js'

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

export default function BookView({ classData, book, onBack, onOpenPdf }) {
  const { lang, t } = useLanguage()
  const { medium } = useMedium()
  const isMobile = useMediaQuery('(max-width: 767px)')

  const pdfUrl = getBookPdf(book, medium)

  return (
    <section className="book-view">
      <div className="book-header">
        {!isMobile && (
          <button className="back-btn" onClick={onBack}>
            ← {t('back')}
          </button>
        )}
        <h1 className="book-title">{book.name[lang]}</h1>
        {/* Direct link — exactly like NCERT's official "Download complete book" */}
        <a className="btn btn-download" href={pdfUrl}>
          ⬇ {t('download')}
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
              onClick={() => window.open(getChapterPdfUrl(pdfUrl, i), '_blank')}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  window.open(getChapterPdfUrl(pdfUrl, i), '_blank')
                }
              }}
            >
              <span className="chapter-number">{i + 1}</span>
              <span className="chapter-name">{ch[lang]}</span>
              <a
                className="chapter-open-btn"
                href={getChapterPdfUrl(pdfUrl, i)}
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
