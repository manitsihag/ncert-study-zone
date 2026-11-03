import { useEffect, useState } from 'react'
import { classes } from './data/books.js'
import Home from './components/Home.jsx'
import ClassView from './components/ClassView.jsx'
import SubjectView from './components/SubjectView.jsx'
import BookView from './components/BookView.jsx'
import SearchView from './components/SearchView.jsx'
import PdfViewer from './components/PdfViewer.jsx'
import About from './components/About.jsx'
import Header from './components/Header.jsx'
import { useMediaQuery } from './hooks/useMediaQuery.js'

const emptyView = {
  page: 'home', // home | class | subject | book | search | reader
  classId: null,
  subjectId: null,
  bookId: null,
  bookOrigin: null,
  pdfTitle: '',
  pdfUrl: '',
}

function getInitialView(isMobile) {
  const empty = {
    page: 'home', // home | class | subject | book | search | reader
    classId: null,
    subjectId: null,
    bookId: null,
    bookOrigin: null,
    pdfTitle: '',
    pdfUrl: '',
  }

  if (!isMobile) return empty

  const params = new URLSearchParams(window.location.search)
  const classParam = params.get('class')
  const subjectId = params.get('subject')
  const bookId = params.get('book')
  const classNumber = classParam ? Number(classParam) : null

  if (Number.isInteger(classNumber) && subjectId && bookId) {
    const classData = classes.find((c) => c.classNumber === classNumber)
    const subject = classData?.subjects.find((s) => s.id === subjectId)
    const book = subject?.books.find((b) => b.id === bookId)

    if (book) {
      return {
        ...empty,
        page: 'book',
        classId: classNumber,
        subjectId,
        bookId,
        bookOrigin: 'home',
      }
    }
  }

  return empty
}

function getBookUrl(classId, subjectId, bookId, medium) {
  const url = new URL(window.location.href)
  url.search = ''
  url.hash = ''
  url.searchParams.set('class', classId)
  url.searchParams.set('subject', subjectId)
  url.searchParams.set('book', bookId)
  // Hindi books opened in a new tab carry their medium and display
  // language in the URL. English is the default everywhere else.
  if (medium === 'hi') {
    url.searchParams.set('medium', 'hi')
    url.searchParams.set('lang', 'hi')
  }
  return url.toString()
}

export default function App() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [view, setView] = useState(() => getInitialView(isMobile))

  useEffect(() => {
    if (!isMobile) return

    const url = new URL(window.location.href)
    if (view.page === 'book' && view.classId && view.subjectId && view.bookId) {
      url.searchParams.set('class', view.classId)
      url.searchParams.set('subject', view.subjectId)
      url.searchParams.set('book', view.bookId)
    } else {
      url.searchParams.delete('class')
      url.searchParams.delete('subject')
      url.searchParams.delete('book')
    }

    const nextUrl = `${url.pathname}${url.search}${url.hash}`
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`
    if (nextUrl !== currentUrl) {
      window.history.replaceState(null, '', nextUrl)
    }
  }, [view.page, view.classId, view.subjectId, view.bookId, isMobile])

  const goHome = () =>
    setView({ ...emptyView, page: 'home' })
  const goToClass = (classId) =>
    setView({ ...emptyView, page: 'class', classId })
  const goToSubject = (classId, subjectId) =>
    setView({ ...emptyView, page: 'subject', classId, subjectId })
  const goToBook = (classId, subjectId, bookId, origin = null) =>
    setView({ page: 'book', classId, subjectId, bookId, bookOrigin: origin, pdfTitle: '', pdfUrl: '' })
  const goToBookFromMobileSearch = (classId, subjectId, bookId) =>
    goToBook(classId, subjectId, bookId, 'home')
  const openBookInNewTab = (classId, subjectId, bookId, medium) => {
    window.open(getBookUrl(classId, subjectId, bookId, medium), '_blank', 'noopener')
  }
  const goToSearch = () =>
    setView((v) => ({ ...v, page: 'search', bookOrigin: null }))
  const goToPdf = (title, pdfUrl) =>
    setView((v) => ({ ...v, page: 'reader', pdfTitle: title, pdfUrl }))

  const classData = classes.find((c) => c.classNumber === view.classId)
  const subjectData = classData?.subjects.find((s) => s.id === view.subjectId)
  const bookData = subjectData?.books.find((b) => b.id === view.bookId)

  return (
    <div className="app">
      <Header
        onHome={goHome}
        onOpenSearch={goToSearch}
        hideSearchButton={
          isMobile &&
          (view.page === 'home' || view.page === 'search' || view.page === 'book')
        }
      />
      <main className="container">
        {view.page === 'home' &&
          (isMobile ? (
            <SearchView mobileHome onOpenBook={openBookInNewTab} />
          ) : (
            <Home onSelectClass={goToClass} />
          ))}
        {view.page === 'home' && <About />}
        {view.page === 'class' && classData && (
          <ClassView classData={classData} onBack={goHome} onSelectSubject={goToSubject} />
        )}
        {view.page === 'subject' && classData && subjectData && (
          <SubjectView
            classData={classData}
            subject={subjectData}
            onBack={() => goToClass(view.classId)}
            onSelectBook={isMobile ? openBookInNewTab : goToBook}
          />
        )}
        {view.page === 'book' && classData && subjectData && bookData && (
          <BookView
            classData={classData}
            subject={subjectData}
            book={bookData}
            onBack={() => {
              if (view.bookOrigin === 'home') {
                goHome()
              } else {
                goToSubject(view.classId, view.subjectId)
              }
            }}
            onOpenPdf={goToPdf}
          />
        )}
        {view.page === 'search' && (
          <SearchView
            onOpenBook={isMobile ? openBookInNewTab : goToBook}
            onBack={goHome}
          />
        )}
        {view.page === 'reader' && (
          <PdfViewer
            title={view.pdfTitle}
            pdfUrl={view.pdfUrl}
            onBack={() => {
              if (view.bookId) {
                setView((v) => ({ ...v, page: 'book', pdfTitle: '', pdfUrl: '' }))
              } else if (view.subjectId) {
                setView((v) => ({ ...v, page: 'subject', pdfTitle: '', pdfUrl: '' }))
              } else {
                goHome()
              }
            }}
          />
        )}
      </main>
    </div>
  )
}
