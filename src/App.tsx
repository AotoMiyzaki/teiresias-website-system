import { useEffect } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ApproachPage } from './pages/ApproachPage'
import { CasesPage } from './pages/CasesPage'
import { CompanyPage } from './pages/CompanyPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { OrderManagementCasePage } from './pages/OrderManagementCasePage'
import { ProcessPage } from './pages/ProcessPage'
import { ServicesPage } from './pages/ServicesPage'
import { ContactPage, PrivacyPage } from './pages/ContentPages'
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
      <a className="skip-link" href="#main-content">
        本文へ移動
      </a>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/approach" element={<ApproachPage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route
          path="/cases/order-management"
          element={<OrderManagementCasePage />}
        />
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
