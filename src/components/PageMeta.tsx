import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type PageMetaProps = {
  title: string
  description: string
  noIndex?: boolean
}

function updateMetaContent(
  selector: string,
  content: string,
) {
  const element = document.head.querySelector<HTMLMetaElement>(selector)
  if (element) element.content = content
}

export function PageMeta({ title, description, noIndex = false }: PageMetaProps) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = title
    updateMetaContent('meta[name="description"]', description)
    updateMetaContent('meta[property="og:title"]', title)
    updateMetaContent('meta[property="og:description"]', description)
    updateMetaContent('meta[name="twitter:title"]', title)
    updateMetaContent('meta[name="twitter:description"]', description)
    updateMetaContent('meta[name="robots"]', noIndex ? 'noindex, follow' : 'index, follow')
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const url = new URL(pathname, 'https://teiresias-website-system.vercel.app').href
    if (canonical) {
      if (noIndex) canonical.removeAttribute('href')
      else canonical.href = url
    }
    updateMetaContent('meta[property="og:url"]', noIndex ? '' : url)
  }, [description, title, pathname, noIndex])

  return null
}
