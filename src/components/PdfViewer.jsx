import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

// Google Docs Viewer — kai NCERT PDFs isse block ho jaate hain,
// isliye "Naye Tab Me Kholo" fallback bhi diya hai (browser native PDF viewer with Back/Fullscreen)
const getEmbedUrl = (pdfUrl) =>
  `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`

export default function PdfViewer({ title, pdfUrl, onBack }) {
  const { t } = useLanguage()
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch {
      // Fullscreen unsupported — browser ka built-in option kaam karega
    }
  }

  const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement)

  useState(() => {
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  return (
    <section className="pdf-viewer">
      <div className="pdf-toolbar">
        <button className="back-btn" onClick={onBack}>
          ← {t('back')}
        </button>
        <h1 className="pdf-title">{title}</h1>
        <div className="pdf-toolbar-actions">
          <a className="btn btn-open-newtab" href={pdfUrl} target="_blank" rel="noreferrer">
            🗗 {t('openNewTab')}
          </a>
          <button className="btn btn-open" onClick={toggleFullscreen}>
            {isFullscreen ? '⊡ Exit Fullscreen' : '⊞ Fullscreen'}
          </button>
          <a className="btn btn-download" href={pdfUrl} download>
            ⬇ {t('download')}
          </a>
        </div>
      </div>
      <div className="pdf-frame-wrap">
        <iframe
          src={getEmbedUrl(pdfUrl)}
          title={title}
          className="pdf-frame"
          allowFullScreen
        />
      </div>
    </section>
  )
}
