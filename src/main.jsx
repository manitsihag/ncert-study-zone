import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { MediumProvider } from './context/MediumContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <MediumProvider>
          <App />
        </MediumProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
