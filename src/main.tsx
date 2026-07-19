import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { NotesPage } from './pages/NotesPage.tsx'
import { ArticlePage } from './pages/ArticlePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:slug" element={<ArticlePage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
