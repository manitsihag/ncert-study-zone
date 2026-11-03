import { useState } from 'react'
import { classes, hasHindiPdf } from '../data/books.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useMedium } from '../context/MediumContext.jsx'

export default function MobileBookPicker({ onOpenBook }) {
  const { lang, t, setLang } = useLanguage()
  const { setMedium } = useMedium()
  const [classValue, setClassValue] = useState('')
  const [subjectValue, setSubjectValue] = useState('')
  const [bookValue, setBookValue] = useState('')

  const selectedClass = classes.find(
    (c) => String(c.classNumber) === classValue,
  )
  const selectedSubject = selectedClass?.subjects.find(
    (s) => s.id === subjectValue,
  )

  const handleClassChange = (event) => {
    setClassValue(event.target.value)
    setSubjectValue('')
    setBookValue('')
  }

  const handleSubjectChange = (event) => {
    setSubjectValue(event.target.value)
    setBookValue('')
  }

  const bookOptions = []
  selectedSubject?.books.forEach((b) => {
    bookOptions.push({ value: b.id, label: b.name[lang], hindi: false })
    // Hindi editions as separate book entries.
    if (hasHindiPdf(b)) {
      bookOptions.push({ value: `${b.id}__hi`, label: `${b.name[lang]} (हिन्दी)`, hindi: true })
    }
  })
  const sortedBookOptions = bookOptions.sort((a, b) => {
    if (a.hindi === b.hindi) return 0
    return a.hindi ? 1 : -1
  })

  const handleBookChange = (event) => {
    const value = event.target.value
    // Reset so the picker shows the placeholder again for the next pick.
    setBookValue('')

    if (!value) return
    const isHindi = value.endsWith('__hi')
    const bookId = isHindi ? value.slice(0, -4) : value

    const book = selectedSubject?.books.find((b) => b.id === bookId)
    if (selectedClass && selectedSubject && book) {
      // The book opens in a new tab which starts in English. A Hindi
      // edition entry carries its medium through the URL so only that
      // tab shows the Hindi book with everything in Hindi.
      const medium = isHindi ? 'hi' : 'en'
      setMedium(medium)
      setLang(medium)
      onOpenBook(selectedClass.classNumber, selectedSubject.id, book.id, medium)
    }
  }

  return (
    <div className="quick-picker">
      <div className="quick-row">
        <span className="quick-icon">🎓</span>
        <div className="quick-field">
          <span className="quick-label">{t('classField')}</span>
          <div className="quick-select-wrap">
            <select
              className="quick-select"
              value={classValue}
              onChange={handleClassChange}
              aria-label={t('classField')}
            >
              <option value="">{t('selectClassOption')}</option>
              {classes.map((c) => (
                <option key={c.classNumber} value={c.classNumber}>
                  {t('classLabel')(c.classNumber)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="quick-row">
        <span className="quick-icon">📘</span>
        <div className="quick-field">
          <span className="quick-label">{t('subjectField')}</span>
          <div className="quick-select-wrap">
            <select
              className="quick-select"
              value={subjectValue}
              onChange={handleSubjectChange}
              disabled={!selectedClass}
              aria-label={t('subjectField')}
            >
              <option value="">
                {selectedClass ? t('selectSubjectOption') : t('selectClassFirst')}
              </option>
              {selectedClass?.subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name[lang]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="quick-row">
        <span className="quick-icon">📖</span>
        <div className="quick-field">
          <span className="quick-label">{t('bookField')}</span>
          <div className="quick-select-wrap">
            <select
              className="quick-select"
              value={bookValue}
              onChange={handleBookChange}
              disabled={!selectedSubject}
              aria-label={t('bookField')}
            >
              <option value="">
                {selectedSubject ? t('selectBookOption') : t('selectSubjectFirst')}
              </option>
              {sortedBookOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
