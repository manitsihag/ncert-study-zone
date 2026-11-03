import { useMedium } from '../context/MediumContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function MediumToggle() {
  const { medium, setMedium } = useMedium()
  const { t, setLang } = useLanguage()

  // Selecting the book medium also switches the whole interface to the
  // matching language, so Hindi medium shows everything in Hindi
  // (book names, chapter names and all UI text).
  const chooseMedium = (value) => {
    setMedium(value)
    setLang(value)
  }

  return (
    <div className="medium-toggle" role="group" aria-label={t('bookMedium')}>
      <span className="medium-label">{t('bookMedium')}:</span>
      <button
        className={medium === 'en' ? 'medium-btn active' : 'medium-btn'}
        onClick={() => chooseMedium('en')}
        type="button"
      >
        {t('englishMedium')}
      </button>
      <button
        className={medium === 'hi' ? 'medium-btn active' : 'medium-btn'}
        onClick={() => chooseMedium('hi')}
        type="button"
      >
        {t('hindiMedium')}
      </button>
    </div>
  )
}
