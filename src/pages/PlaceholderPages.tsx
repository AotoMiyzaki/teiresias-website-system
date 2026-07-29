import { PlaceholderPage } from '../components/PlaceholderPage'
import { placeholderPages } from '../data/siteContent'

export const CasesPage = () => (
  <PlaceholderPage content={placeholderPages['/cases']} />
)

export const CaseDetailPage = () => (
  <PlaceholderPage content={placeholderPages['/cases/order-management']} />
)

export const ProcessPage = () => (
  <PlaceholderPage content={placeholderPages['/process']} />
)

export const CompanyPage = () => (
  <PlaceholderPage content={placeholderPages['/company']} />
)

export const ContactPage = () => (
  <PlaceholderPage content={placeholderPages['/contact']} />
)

export const PrivacyPage = () => (
  <PlaceholderPage content={placeholderPages['/privacy']} />
)
