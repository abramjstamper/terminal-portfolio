import { useRef, useEffect } from 'react'
import { useTerminal } from '../../hooks/useTerminal'
import { useTheme } from '../../contexts/ThemeContext'
import { useMode } from '../../contexts/ModeContext'
import { TerminalOutput } from './TerminalOutput'
import { TerminalInput } from './TerminalInput'

export function Terminal() {
  const {
    output,
    history,
    getPrompt,
    executeCommand,
    getHistoryItem,
    clearOutput,
  } = useTerminal()
  const { theme } = useTheme()
  const { toggleMode } = useMode()
  const containerRef = useRef<HTMLDivElement>(null)

  const { username, hostname } = getPrompt()

  // Scroll to bottom on new output
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [output])

  const containerClasses = [
    'terminal-container',
    'min-h-screen',
    'p-4',
    'overflow-auto',
    'font-mono',
    'text-sm',
    'md:text-base',
    theme.effects.scanlines ? 'scanlines' : '',
    theme.effects.glow ? 'glow' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      role="application"
      aria-label="Terminal interface"
      className={containerClasses}
      ref={containerRef}
    >
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      {/* Mode switch link */}
      <div className="fixed top-4 right-4 z-50">
        <button
          className="text-terminal-muted hover:text-terminal-link text-xs opacity-50 hover:opacity-100 transition-opacity"
          onClick={toggleMode}
        >
          Switch to Nav ↗
        </button>
      </div>

      <div id="main-content">
        <TerminalOutput lines={output} />
        <TerminalInput
          username={username}
          hostname={hostname}
          onSubmit={executeCommand}
          getHistoryItem={getHistoryItem}
          historyLength={history.length}
          onClear={clearOutput}
        />
      </div>
    </div>
  )
}
