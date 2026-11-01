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
    chapters: 'Chapters',
    book: (n) => `${n} books`,
    classLabel: (n) => `Class - ${n}`,
    searchTitle: 'Search Books',
    searchSubtitle: 'Find any book, subject or chapter',
    searchPlaceholder: 'Search class, subject, chapters...',
    classField: 'Class',
    subjectField: 'Subject',
    bookField: 'Book',
    selectClassOption: 'Select class',
    selectSubjectOption: 'Select subject',
    selectBookOption: 'Select book',
    selectClassFirst: 'Select class first',
    selectSubjectFirst: 'Select subject first',
    allClasses: 'All Classes',
    allSubjects: 'All Subjects',
    clearFilters: 'Clear',
    booksFound: 'books found',
    noResults: 'No books found. Try a different search.',
    browseBooks: 'Search Books',
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    langName: 'English',
    bookMedium: 'Book medium',
    englishMedium: 'English',
    hindiMedium: 'हिन्दी',
    hindiEdition: 'Hindi edition',
    englishOnly: 'English only',
    hindiFallback: 'Hindi edition is not available for this book yet — showing the English PDF.',
    noHindiSubject: 'Hindi editions are not available for these books yet — showing English PDFs.',
    downloadFull: 'Download full book',
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
    chapters: 'अध्याय',
    book: (n) => `${n} किताबें`,
    classLabel: (n) => `कक्षा ${n}`,
    searchTitle: 'किताबें खोजें',
    searchSubtitle: 'कोई भी किताब, विषय या अध्याय खोजें',
    searchPlaceholder: 'कक्षा, विषय, अध्याय खोजें...',
    classField: 'कक्षा',
    subjectField: 'विषय',
    bookField: 'किताब',
    selectClassOption: 'कक्षा चुनें',
    selectSubjectOption: 'विषय चुनें',
    selectBookOption: 'किताब चुनें',
    selectClassFirst: 'पहले कक्षा चुनें',
    selectSubjectFirst: 'पहले विषय चुनें',
    allClasses: 'सभी कक्षाएँ',
    allSubjects: 'सभी विषय',
    clearFilters: 'साफ़ करें',
    booksFound: 'किताबें मिलीं',
    noResults: 'कोई किताब नहीं मिली। कुछ और खोजें।',
    browseBooks: 'किताबें खोजें',
    themeToLight: 'लाइट मोड पर जाएँ',
    themeToDark: 'डार्क मोड पर जाएँ',
    langName: 'हिन्दी',
    bookMedium: 'किताब का माध्यम',
    englishMedium: 'English',
    hindiMedium: 'हिन्दी',
    hindiEdition: 'हिन्दी संस्करण',
    englishOnly: 'सिर्फ़ English',
    hindiFallback: 'इस किताब का हिन्दी संस्करण अभी उपलब्ध नहीं है — English PDF दिखाई जा रही है।',
    noHindiSubject: 'इन किताबों के हिन्दी संस्करण अभी उपलब्ध नहीं हैं — English PDF दिखाई जा रही हैं।',
    downloadFull: 'पूरी किताब डाउनलोड करें',
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
