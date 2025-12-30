import type { OutputLine } from '../../types/terminal'

interface TerminalOutputProps {
  lines: OutputLine[]
}

export function TerminalOutput({ lines }: TerminalOutputProps) {
  return (
    <div role="log" aria-live="polite" aria-label="Terminal output">
      {lines.map((line) => (
        <div key={line.id} className="mb-1">
          {line.type === 'command' && (
            <div className="flex">
              <span className="text-terminal-success">{line.prompt?.split('@')[0]}</span>
              <span className="text-terminal-muted">@</span>
              <span className="text-terminal-link">
                {line.prompt?.split('@')[1]?.split(':')[0]}
              </span>
              <span className="text-terminal-muted">:</span>
              <span className="text-terminal-prompt">~</span>
              <span className="text-terminal-muted">$ </span>
              <span className="text-terminal-text">{line.content}</span>
            </div>
          )}
          {line.type === 'output' && (
            <pre className="text-terminal-text whitespace-pre-wrap font-mono">
              {line.content}
            </pre>
          )}
          {line.type === 'error' && (
            <pre className="text-terminal-error whitespace-pre-wrap font-mono">
              {line.content}
            </pre>
          )}
          {line.type === 'system' && (
            <pre className="text-terminal-text whitespace-pre-wrap font-mono">
              {line.content}
            </pre>
          )}
        </div>
      ))}
    </div>
  )
}
