type NumberedFeatureProps = {
  number: string
  title: string
  description: string
}

export function NumberedFeature({
  number,
  title,
  description,
}: NumberedFeatureProps) {
  return (
    <article className="numbered-feature">
      <p className="numbered-feature__number" aria-hidden="true">
        {number}
      </p>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  )
}
