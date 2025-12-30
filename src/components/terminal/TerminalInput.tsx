import { useState, useRef, useEffect, type KeyboardEvent, type ChangeEvent } from 'react'
import { autocomplete, getAutocompleteSuggestions } from '../../lib/commands/autocomplete'

interface TerminalInputProps {
  username: string
  hostname: string
  onSubmit: (command: string) => void
  getHistoryItem: (direction: 'up' | 'down', currentIndex: number) => { command: string; index: number }
  historyLength: number
  onClear: () => void
}

export function TerminalInput({
  username,
  hostname,
  onSubmit,
  getHistoryItem,
  historyLength,
  onClear,
}: TerminalInputProps) {
  const [input, setInput] = useState('')
  const [historyIndex, setHistoryIndex] = useState(historyLength)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset history index when history changes
  useEffect(() => {
    setHistoryIndex(historyLength)
  }, [historyLength])

  // Focus input on mount and click anywhere
  useEffect(() => {
    inputRef.current?.focus()

    const handleClick = () => {
      inputRef.current?.focus()
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Tab - autocomplete
    if (e.key === 'Tab') {
      e.preventDefault()
      const completed = autocomplete(input)
      if (completed) {
        setInput(completed)
        setShowSuggestions(false)
      } else {
        // Show suggestions if multiple matches
        const sug = getAutocompleteSuggestions(input)
        if (sug.length > 1) {
          setSuggestions(sug)
          setShowSuggestions(true)
        }
      }
      return
    }

    // Hide suggestions on any other key
    setShowSuggestions(false)

    // Enter - submit
    if (e.key === 'Enter') {
      onSubmit(input)
      setInput('')
      setHistoryIndex(historyLength + 1)
      return
    }

    // Up arrow - history
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const { command, index } = getHistoryItem('up', historyIndex)
      setInput(command)
      setHistoryIndex(index)
      return
    }

    // Down arrow - history
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const { command, index } = getHistoryItem('down', historyIndex)
      setInput(command)
      setHistoryIndex(index)
      return
    }

    // Ctrl+C or Ctrl+Z - clear input
    if ((e.ctrlKey && e.key === 'c') || (e.ctrlKey && e.key === 'z')) {
      e.preventDefault()
      setInput('')
      return
    }

    // Ctrl+L - clear screen
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault()
      onClear()
      return
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setShowSuggestions(false)
  }

  return (
    <div className="mt-2">
      {showSuggestions && suggestions.length > 0 && (
        <div className="text-terminal-muted mb-1">{suggestions.join('  ')}</div>
      )}
      <div className="flex items-center">
        <span className="text-terminal-success">{username}</span>
        <span className="text-terminal-muted">@</span>
        <span className="text-terminal-link">{hostname}</span>
        <span className="text-terminal-muted">:</span>
        <span className="text-terminal-prompt">~</span>
        <span className="text-terminal-muted">$ </span>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-terminal-text outline-none caret-transparent font-mono"
            aria-label="Terminal input"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          {/* Custom cursor */}
          <span
            className="cursor absolute top-0"
            style={{ left: `${input.length}ch` }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}
