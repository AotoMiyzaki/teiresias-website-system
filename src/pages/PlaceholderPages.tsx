import { PlaceholderPage } from '../components/PlaceholderPage'
import { placeholderPages } from '../data/siteContent'

export const ContactPage = () => (
  <PlaceholderPage content={placeholderPages['/contact']} />
)

export const PrivacyPage = () => (
  <PlaceholderPage content={placeholderPages['/privacy']} />
)
