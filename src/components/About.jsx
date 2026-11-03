import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useMediaQuery } from '../hooks/useMediaQuery.js'

// Homepage footer "About" section — shown on the home page only.
// Content follows the site language (English / हिन्दी) automatically.
// On mobile it starts compact with a "Read more" toggle that reveals
// the rest (all points stay, nothing is removed).
const content = {
  en: {
    title: 'About NCERT Study Zone',
    intro:
      'NCERT Study Zone is a free study website made for students. It brings together NCERT textbooks for Classes 6 to 12 in English and Hindi medium — pick a class, open any chapter, or download the complete book with one click.',
    features: [
      '📖 Free NCERT textbooks for Classes 6–12',
      '🌐 English and Hindi editions side by side',
      '📄 Chapter-wise PDFs — open and study instantly',
      '⬇ Complete book download, straight from NCERT',
      '🔍 Quick search across classes, subjects and books',
    ],
    disclaimer:
      'All books and PDFs open and download directly from the official NCERT website (ncert.nic.in) — we do not host any files. This is an independent, non-commercial study portal and is not affiliated with NCERT.',
    more: 'Read more',
    less: 'Show less',
  },
  hi: {
    title: 'NCERT Study Zone के बारे में',
    intro:
      'NCERT Study Zone छात्रों के लिए बनी एक मुफ़्त स्टडी वेबसाइट है। यहाँ कक्षा 6 से 12 तक की NCERT की किताबें English और हिन्दी दोनों माध्यमों में हैं — कक्षा चुनें, कोई भी अध्याय खोलें, या एक क्लिक में पूरी किताब डाउनलोड करें।',
    features: [
      '📖 कक्षा 6–12 की मुफ़्त NCERT किताबें',
      '🌐 English और हिन्दी संस्करण साथ-साथ',
      '📄 अध्याय-वार PDF — तुरंत खोलकर पढ़ें',
      '⬇ पूरी किताब डाउनलोड, सीधे NCERT से',
      '🔍 कक्षा, विषय और किताबों की आसान खोज',
    ],
    disclaimer:
      'सभी किताबें और PDF सीधे official NCERT वेबसाइट (ncert.nic.in) से खुलती और डाउनलोड होती हैं — हम कोई फ़ाइल होस्ट नहीं करते। यह एक स्वतंत्र, ग़ैर-व्यावसायिक स्टडी साइट है और NCERT से कोई औपचारिक संबंध नहीं है।',
    more: 'और पढ़ें',
    less: 'कम दिखाएँ',
  },
}

export default function About() {
  const { lang } = useLanguage()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [expanded, setExpanded] = useState(false)
  const footerRef = useRef(null)
  const c = content[lang]
  const expandedView = !isMobile || expanded

  // On mobile, position the card so that a small part of it is visible as
  // soon as the website opens (the top peeks above the bottom of the
  // screen); the rest appears on scrolling. Computed once per mount so it
  // works on every phone screen height.
  useEffect(() => {
    if (!isMobile) return
    const el = footerRef.current
    if (!el) return
    const naturalTop = el.getBoundingClientRect().top
    const wantedTop = window.innerHeight - 150
    if (wantedTop > naturalTop) {
      const baseMargin = parseFloat(window.getComputedStyle(el).marginTop) || 0
      el.style.marginTop = `${Math.round(baseMargin + wantedTop - naturalTop)}px`
    }
  }, [isMobile])

  return (
    <footer className="about-footer" ref={footerRef}>
      <div className="about-card">
        <h2 className="about-title">{c.title}</h2>
        <p className={expandedView ? 'about-intro' : 'about-intro about-intro-clamped'}>
          {c.intro}
        </p>
        <ul className="about-features">
          {c.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        {expandedView && <p className="about-disclaimer">{c.disclaimer}</p>}
        {isMobile && (
          <button
            className="about-toggle"
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? c.less : c.more}
          </button>
        )}
      </div>
    </footer>
  )
}
