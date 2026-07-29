import { useEffect } from 'react'

type PageMetaProps = {
  title: string
  description: string
}

function updateMetaContent(
  selector: string,
  content: string,
) {
  const element = document.head.querySelector<HTMLMetaElement>(selector)
  if (element) element.content = content
}

export function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    document.title = title
    updateMetaContent('meta[name="description"]', description)
    updateMetaContent('meta[property="og:title"]', title)
    updateMetaContent('meta[property="og:description"]', description)
    updateMetaContent('meta[name="twitter:title"]', title)
    updateMetaContent('meta[name="twitter:description"]', description)
  }, [description, title])

  return null
}
