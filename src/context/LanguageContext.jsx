import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext()

const strings = {
  en: {
    appTitle: 'NCERT Books',
    selectClass: 'Select your class to view books',
    chooseSubject: 'Choose a subject and open book PDFs',
    available: 'Available',
    back: 'Back',
    open: 'Open',
    openNewTab: 'Naye Tab Me Kholo',
    download: 'Download',
    downloadFull: 'Download Full Book',
    chapters: 'Chapters',
    book: (n) => `${n} books`,
    classLabel: (n) => `Class - ${n}`,
    homeClassLabel: (n) => `Class ${n}`,
    searchTitle: 'Search Books',
    searchBooks: 'Search Books',
    searchSubtitle: 'Find any book, subject or chapter',
    searchPlaceholder: 'Search class, subject, chapters...',
    allClasses: 'All Classes',
    allSubjects: 'All Subjects',
    clearFilters: 'Clear',
    booksFound: 'books found',
    noResults: 'No books found. Try a different search.',
    browseBooks: 'Search Books',
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    langName: 'English',
  },
  hi: {
    appTitle: 'NCERT किताबें',
    selectClass: 'किताबें देखने के लिए अपनी कक्षा चुनें',
    chooseSubject: 'विषय चुनें और किताब के PDF खोलें',
    available: 'उपलब्ध',
    back: 'वापस',
    open: 'खोलें',
    openNewTab: 'नए टैब में खोलें',
    download: 'डाउनलोड',
    downloadFull: 'पूरी किताब डाउनलोड करें',
    chapters: 'अध्याय',
    book: (n) => `${n} किताबें`,
    classLabel: (n) => `कक्षा ${n}`,
    homeClassLabel: (n) => `कक्षा ${n}`,
    searchTitle: 'किताबें खोजें',
    searchSubtitle: 'कोई भी किताब, विषय या अध्याय खोजें',
    searchPlaceholder: 'कक्षा, विषय, अध्याय खोजें...',
    allClasses: 'सभी कक्षाएँ',
    allSubjects: 'सभी विषय',
    clearFilters: 'साफ़ करें',
    booksFound: 'किताबें मिलीं',
    noResults: 'कोई किताब नहीं मिली। कुछ और खोजें।',
    browseBooks: 'किताबें खोजें',
    themeToLight: 'लाइट मोड पर जाएँ',
    themeToDark: 'डार्क मोड पर जाएँ',
    langName: 'हिन्दी',
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('ncert-lang') || 'en'
  })

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    localStorage.setItem('ncert-lang', lang)
  }, [lang])

  const t = (key) => strings[lang][key] ?? strings.en[key] ?? key

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
