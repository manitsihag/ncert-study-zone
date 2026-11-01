import { useMedium } from '../context/MediumContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function MediumToggle() {
  const { medium, setMedium } = useMedium()
  const { t } = useLanguage()

  return (
    <div className="medium-toggle" role="group" aria-label={t('bookMedium')}>
      <span className="medium-label">{t('bookMedium')}:</span>
      <button
        className={medium === 'en' ? 'medium-btn active' : 'medium-btn'}
        onClick={() => setMedium('en')}
        type="button"
      >
        {t('englishMedium')}
      </button>
      <button
        className={medium === 'hi' ? 'medium-btn active' : 'medium-btn'}
        onClick={() => setMedium('hi')}
        type="button"
      >
        {t('hindiMedium')}
      </button>
    </div>
  )
}
