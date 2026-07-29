type DetailPageHeroProps = {
  eyebrow: string
  title: string
  description: string
  number: string
}

export function DetailPageHero({
  eyebrow,
  title,
  description,
  number,
}: DetailPageHeroProps) {
  return (
    <header className="detail-hero">
      <div className="container detail-hero__grid">
        <div className="detail-hero__content">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="detail-hero__description">{description}</p>
        </div>
        <p className="detail-hero__number" aria-hidden="true">
          {number}
        </p>
      </div>
    </header>
  )
}
