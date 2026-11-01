import { createContext, useContext, useEffect, useState } from 'react'

const MediumContext = createContext()

// Book medium is separate from the UI language: a student can keep the
// interface in English but read Hindi-medium books (or the other way round).
export function MediumProvider({ children }) {
  const [medium, setMedium] = useState(() => {
    return (
      localStorage.getItem('ncert-medium') ||
      localStorage.getItem('ncert-lang') ||
      'en'
    )
  })

  useEffect(() => {
    localStorage.setItem('ncert-medium', medium)
  }, [medium])

  return (
    <MediumContext.Provider value={{ medium, setMedium }}>
      {children}
    </MediumContext.Provider>
  )
}

export function useMedium() {
  return useContext(MediumContext)
}
