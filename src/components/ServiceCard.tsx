import { Link } from 'react-router-dom'
import type { Service } from '../data/siteContent'

type ServiceCardProps = {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link className="service-card" to="/services">
      <span className="service-card__number">{service.number}</span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <span className="service-card__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  )
}
