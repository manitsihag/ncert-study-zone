import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

export function useIsMobile() {
  const q = '(max-width: 767px)'
  const m = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(q).matches : false
  // fallback for test viewport
  const w = typeof window !== 'undefined' ? window.innerWidth : 1024
  return w <= 767 || m
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 768px)')
}