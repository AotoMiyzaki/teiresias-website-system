import { codeColumns } from '../data/siteContent'

export function CodeBackdrop() {
  return (
    <div className="code-backdrop" aria-hidden="true">
      {codeColumns.map((lines, index) => (
        <pre className={`code-stream code-stream--${index + 1}`} key={lines[0]}>
          {[...lines, ...lines, ...lines, ...lines].join('\n')}
        </pre>
      ))}
    </div>
  )
}
