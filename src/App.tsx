import { useEffect } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import {
  ApproachPage,
  CaseDetailPage,
  CasesPage,
  CompanyPage,
  ContactPage,
  PrivacyPage,
  ProcessPage,
  ServicesPage,
} from './pages/PlaceholderPages'
import './App.css'

function RouteEffects() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [pathname])

  return null
}

function SiteRoutes() {
  return (
    <>
      <RouteEffects />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/approach" element={<ApproachPage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/cases/order-management" element={<CaseDetailPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SiteRoutes />
    </BrowserRouter>
  )
}

export default App
