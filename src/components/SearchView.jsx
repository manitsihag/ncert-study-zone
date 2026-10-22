import { useMemo, useState } from 'react'
import { classes } from '../data/books.js'
import { useLanguage } from '../context/LanguageContext.jsx'

// Saare books ko ek flat list me nikalo (class + subject ke saath)
function buildAllBooks() {
  return classes.flatMap((c) =>
    c.subjects.flatMap((s) =>
      s.books.map((b) => ({
        classNumber: c.classNumber,
        subjectId: s.id,
        subjectName: s.name,
        subjectIcon: s.icon,
        bookId: b.id,
        bookName: b.name,
        pdfUrl: b.pdfUrl,
        chapterCount: b.chapters.length,
        chapters: b.chapters,
      })),
    ),
  )
}

export default function SearchView({ onOpenBook, onBack }) {
  const { lang, t } = useLanguage()
  const [query, setQuery] = useState('')
  const [classFilter, setClassFilter] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('')

  const allBooks = useMemo(buildAllBooks, [])

  // Unique subjects list (filters ke liye)
  const subjectOptions = useMemo(() => {
    const map = new Map()
    classes.forEach((c) =>
      c.subjects.forEach((s) => {
        if (!map.has(s.id)) map.set(s.id, s.name)
      }),
    )
    return Array.from(map, ([id, name]) => ({ id, name }))
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allBooks.filter((b) => {
      if (classFilter && String(b.classNumber) !== String(classFilter)) return false
      if (subjectFilter && b.subjectId !== subjectFilter) return false
      if (!q) return true
      const haystack = [
        b.bookName.en,
        b.bookName.hi,
        b.subjectName.en,
        b.subjectName.hi,
        ...b.chapters.map((c) => c.en),
        ...b.chapters.map((c) => c.hi),
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [allBooks, query, classFilter, subjectFilter])

  const clearAll = () => {
    setQuery('')
    setClassFilter('')
    setSubjectFilter('')
  }

  return (
    <section className="search-view">
      <button className="back-btn" onClick={onBack}>
        ← {t('back')}
      </button>

      <div className="search-header">
        <h1 className="search-title">🔍 {t('searchTitle')}</h1>
        <p className="search-subtitle">{t('searchSubtitle')}</p>
      </div>

      <div className="search-controls">
        <div className="search-input-wrap">
          <span className="search-icon">🔎</span>
          <input
            type="text"
            className="search-input"
            placeholder={t('searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear">
              ✕
            </button>
          )}
        </div>

        <div className="search-filters">
          <select
            className="filter-select"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
          >
            <option value="">{t('allClasses')}</option>
            {classes.map((c) => (
              <option key={c.classNumber} value={c.classNumber}>
                {t('classLabel')(c.classNumber)}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="">{t('allSubjects')}</option>
            {subjectOptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name[lang]}
              </option>
            ))}
          </select>

          {(query || classFilter || subjectFilter) && (
            <button className="filter-reset" onClick={clearAll}>
              {t('clearFilters')}
            </button>
          )}
        </div>
      </div>

      <p className="results-count">
        {results.length} {t('booksFound')}
      </p>

      {results.length === 0 ? (
        <div className="no-results">
          <span className="no-results-icon">📚</span>
          <p>{t('noResults')}</p>
        </div>
      ) : (
        <div className="search-grid">
          {results.map((b) => (
            <button
              key={`${b.classNumber}-${b.subjectId}-${b.bookId}`}
              className="search-card"
              onClick={() => onOpenBook(b.classNumber, b.subjectId, b.bookId)}
            >
              <div className="search-card-top">
                <span className="search-badge-class" style={{ backgroundColor: classes.find(c => c.classNumber === b.classNumber).color }}>
                  {t('classLabel')(b.classNumber)}
                </span>
                <span className="search-subject">{b.subjectIcon} {b.subjectName[lang]}</span>
              </div>
              <h3 className="search-book-name">{b.bookName[lang]}</h3>
              <p className="search-book-meta">📄 {b.chapterCount} {t('chapters')}</p>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
