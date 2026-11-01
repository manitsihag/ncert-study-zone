import { useState } from 'react'
import { classes } from '../data/books.js'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function MobileBookPicker({ onOpenBook }) {
  const { lang, t } = useLanguage()
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

  const handleBookChange = (event) => {
    const value = event.target.value
    setBookValue(value)

    const book = selectedSubject?.books.find((b) => b.id === value)
    if (selectedClass && selectedSubject && book) {
      onOpenBook(selectedClass.classNumber, selectedSubject.id, book.id)
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
              {selectedSubject?.books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name[lang]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
