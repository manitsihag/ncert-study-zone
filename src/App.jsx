import { useState } from 'react'
import { classes } from './data/books.js'
import Home from './components/Home.jsx'
import ClassView from './components/ClassView.jsx'
import SubjectView from './components/SubjectView.jsx'
import BookView from './components/BookView.jsx'
import SearchView from './components/SearchView.jsx'
import PdfViewer from './components/PdfViewer.jsx'
import Header from './components/Header.jsx'

export default function App() {
  const [view, setView] = useState({
    page: 'home', // home | class | subject | book | search | reader
    classId: null,
    subjectId: null,
    bookId: null,
    pdfTitle: '',
    pdfUrl: '',
  })

  const goHome = () =>
    setView({ page: 'home', classId: null, subjectId: null, bookId: null, pdfTitle: '', pdfUrl: '' })
  const goToClass = (classId) =>
    setView({ page: 'class', classId, subjectId: null, bookId: null, pdfTitle: '', pdfUrl: '' })
  const goToSubject = (classId, subjectId) =>
    setView({ page: 'subject', classId, subjectId, bookId: null, pdfTitle: '', pdfUrl: '' })
  const goToBook = (classId, subjectId, bookId) =>
    setView({ page: 'book', classId, subjectId, bookId, pdfTitle: '', pdfUrl: '' })
  const goToSearch = () =>
    setView((v) => ({ ...v, page: 'search' }))
  const goToPdf = (title, pdfUrl) =>
    setView((v) => ({ ...v, page: 'reader', pdfTitle: title, pdfUrl }))

  const classData = classes.find((c) => c.classNumber === view.classId)
  const subjectData = classData?.subjects.find((s) => s.id === view.subjectId)
  const bookData = subjectData?.books.find((b) => b.id === view.bookId)

  return (
    <div className="app">
      <Header onHome={goHome} onOpenSearch={goToSearch} />
      <main className="container">
        {view.page === 'home' && <Home onSelectClass={goToClass} />}
        {view.page === 'class' && classData && (
          <ClassView classData={classData} onBack={goHome} onSelectSubject={goToSubject} />
        )}
        {view.page === 'subject' && classData && subjectData && (
          <SubjectView
            classData={classData}
            subject={subjectData}
            onBack={() => goToClass(view.classId)}
            onSelectBook={goToBook}
          />
        )}
        {view.page === 'book' && classData && subjectData && bookData && (
          <BookView
            classData={classData}
            subject={subjectData}
            book={bookData}
            onBack={() => goToSubject(view.classId, view.subjectId)}
            onOpenPdf={goToPdf}
          />
        )}
        {view.page === 'search' && (
          <SearchView
            onOpenBook={(classId, subjectId, bookId) => goToBook(classId, subjectId, bookId)}
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
