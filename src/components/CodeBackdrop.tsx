import { codeColumns } from '../data/siteContent'

export function CodeBackdrop() {
  return (
    <div className="code-backdrop" aria-hidden="true">
      {codeColumns.map((lines, index) => (
        <pre className={`code-stream code-stream--${index + 1}`} key={lines[0]}>
          {[...lines, ...lines, ...lines, ...lines].join('\n')}
        </pre>
      ))}
      <div className="code-structure">
        <p>workflow.schema</p>
        <div className="code-structure__track">
          <span>INPUT</span>
          <span>RULES</span>
          <span>APPROVAL</span>
          <span>OUTPUT</span>
        </div>
        <small>data / decision / operation</small>
      </div>
    </div>
  )
}
