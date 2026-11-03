import { createContext, useContext, useState } from 'react'

const MediumContext = createContext()

// Book medium is separate from the UI language, but every fresh opening of
// the website always starts in English. A Hindi book opened from the search
// picker in a new tab carries its medium via the URL (?medium=hi), so only
// that specific tab starts in Hindi medium.
export function MediumProvider({ children }) {
  const [medium, setMedium] = useState(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('medium')
    return fromUrl === 'hi' ? 'hi' : 'en'
  })

  return (
    <MediumContext.Provider value={{ medium, setMedium }}>
      {children}
    </MediumContext.Provider>
  )
}

export function useMedium() {
  return useContext(MediumContext)
}
