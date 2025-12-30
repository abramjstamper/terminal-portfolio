import { useReducer, useCallback, useEffect, useRef } from 'react'
import type { TerminalState, TerminalAction, OutputLine, CommandResult } from '../types/terminal'
import { parseCommandString } from '../lib/commands/parser'
import { commands } from '../lib/commands/handlers'
import { siteData } from '../config/data/site-data'

const STORAGE_KEY = 'terminal-history'

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

function getInitialHistory(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveHistory(history: string[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-100)))
  } catch {
    // Ignore storage errors
  }
}

function terminalReducer(state: TerminalState, action: TerminalAction): TerminalState {
  switch (action.type) {
    case 'ADD_OUTPUT':
      return {
        ...state,
        output: [...state.output, action.payload],
      }
    case 'CLEAR_OUTPUT':
      return {
        ...state,
        output: [],
      }
    case 'SET_HISTORY':
      return {
        ...state,
        history: action.payload,
        historyIndex: action.payload.length,
      }
    case 'ADD_TO_HISTORY': {
      const newHistory = [...state.history, action.payload]
      saveHistory(newHistory)
      return {
        ...state,
        history: newHistory,
        historyIndex: newHistory.length,
      }
    }
    default:
      return state
  }
}

function getInitialState(): TerminalState {
  return {
    output: [],
    history: getInitialHistory(),
    historyIndex: 0,
  }
}

export function useTerminal() {
  const [state, dispatch] = useReducer(terminalReducer, undefined, getInitialState)
  const motdShown = useRef(false)

  // Show motd on mount (ref prevents double-render in StrictMode)
  useEffect(() => {
    if (motdShown.current) return
    motdShown.current = true

    const motdResult = commands.motd.handler([], [])
    if ('output' in motdResult && motdResult.output) {
      dispatch({
        type: 'ADD_OUTPUT',
        payload: {
          id: generateId(),
          type: 'system',
          content: motdResult.output,
        },
      })
    }
  }, [])

  const getPrompt = useCallback(() => {
    const hostname = typeof window !== 'undefined' ? window.location.hostname : siteData.hostname
    const shortHostname = hostname.split('.')[0] || 'portfolio'
    return { username: siteData.username, hostname: shortHostname }
  }, [])

  const addOutput = useCallback((line: Omit<OutputLine, 'id'>) => {
    dispatch({
      type: 'ADD_OUTPUT',
      payload: { ...line, id: generateId() },
    })
  }, [])

  const clearOutput = useCallback(() => {
    dispatch({ type: 'CLEAR_OUTPUT' })
  }, [])

  const executeCommand = useCallback(
    async (input: string) => {
      const { username, hostname } = getPrompt()
      const prompt = `${username}@${hostname}:~$ `

      // Add command to output
      addOutput({
        type: 'command',
        content: input,
        prompt,
      })

      // Add to history
      if (input.trim()) {
        dispatch({ type: 'ADD_TO_HISTORY', payload: input })
      }

      // Parse command
      const parseResult = parseCommandString(input)

      if (parseResult.error) {
        addOutput({
          type: 'error',
          content: parseResult.error,
        })
        return
      }

      if (parseResult.commands.length === 0) {
        return
      }

      // Execute commands in sequence (for && operator)
      for (const parsedCmd of parseResult.commands) {
        const handler = commands[parsedCmd.command]

        if (!handler) {
          addOutput({
            type: 'error',
            content: `${parsedCmd.command}: command not found`,
          })
          return // Stop on first error
        }

        try {
          const result: CommandResult = await Promise.resolve(
            handler.handler(parsedCmd.args, state.history)
          )

          if (result.clearScreen) {
            clearOutput()
            continue
          }

          if (result.error) {
            addOutput({
              type: 'error',
              content: result.error,
            })
            return // Stop on first error
          }

          if (result.output !== undefined) {
            addOutput({
              type: 'output',
              content: result.output,
            })
          }
        } catch (err) {
          addOutput({
            type: 'error',
            content: `${parsedCmd.command}: ${err instanceof Error ? err.message : 'Unknown error'}`,
          })
          return
        }
      }
    },
    [addOutput, clearOutput, getPrompt, state.history]
  )

  const getHistoryItem = useCallback(
    (direction: 'up' | 'down', currentIndex: number): { command: string; index: number } => {
      const { history } = state
      if (history.length === 0) return { command: '', index: currentIndex }

      let newIndex = currentIndex
      if (direction === 'up') {
        newIndex = Math.max(0, currentIndex - 1)
      } else {
        newIndex = Math.min(history.length, currentIndex + 1)
      }

      const command = newIndex < history.length ? history[newIndex] : ''
      return { command, index: newIndex }
    },
    [state]
  )

  const clearHistory = useCallback(() => {
    dispatch({ type: 'SET_HISTORY', payload: [] })
    saveHistory([])
  }, [])

  return {
    output: state.output,
    history: state.history,
    historyIndex: state.historyIndex,
    getPrompt,
    executeCommand,
    getHistoryItem,
    clearHistory,
    clearOutput,
  }
}
