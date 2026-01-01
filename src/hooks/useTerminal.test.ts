import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTerminal } from './useTerminal'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('useTerminal', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  describe('initial state', () => {
    it('returns output array', () => {
      const { result } = renderHook(() => useTerminal())
      expect(Array.isArray(result.current.output)).toBe(true)
    })

    it('returns history array', () => {
      const { result } = renderHook(() => useTerminal())
      expect(Array.isArray(result.current.history)).toBe(true)
    })

    it('returns historyIndex', () => {
      const { result } = renderHook(() => useTerminal())
      expect(typeof result.current.historyIndex).toBe('number')
    })

    it('shows motd on initial render', () => {
      const { result } = renderHook(() => useTerminal())
      // Output should contain at least the motd
      expect(result.current.output.length).toBeGreaterThan(0)
      expect(result.current.output[0].type).toBe('system')
    })
  })

  describe('getPrompt', () => {
    it('returns username and hostname', () => {
      const { result } = renderHook(() => useTerminal())
      const prompt = result.current.getPrompt()

      expect(prompt.username).toBeDefined()
      expect(typeof prompt.username).toBe('string')
      expect(prompt.hostname).toBeDefined()
      expect(typeof prompt.hostname).toBe('string')
    })

    it('returns consistent values on multiple calls', () => {
      const { result } = renderHook(() => useTerminal())
      const prompt1 = result.current.getPrompt()
      const prompt2 = result.current.getPrompt()

      expect(prompt1.username).toBe(prompt2.username)
      expect(prompt1.hostname).toBe(prompt2.hostname)
    })
  })

  describe('executeCommand', () => {
    it('adds command to output', async () => {
      const { result } = renderHook(() => useTerminal())
      const initialLength = result.current.output.length

      await act(async () => {
        await result.current.executeCommand('help')
      })

      expect(result.current.output.length).toBeGreaterThan(initialLength)
    })

    it('adds valid commands to history', async () => {
      const { result } = renderHook(() => useTerminal())

      await act(async () => {
        await result.current.executeCommand('whoami')
      })

      expect(result.current.history).toContain('whoami')
    })

    it('does not add empty commands to history', async () => {
      const { result } = renderHook(() => useTerminal())
      const initialHistoryLength = result.current.history.length

      await act(async () => {
        await result.current.executeCommand('')
      })

      expect(result.current.history.length).toBe(initialHistoryLength)
    })

    it('does not add whitespace-only commands to history', async () => {
      const { result } = renderHook(() => useTerminal())
      const initialHistoryLength = result.current.history.length

      await act(async () => {
        await result.current.executeCommand('   ')
      })

      expect(result.current.history.length).toBe(initialHistoryLength)
    })

    it('shows error for unknown commands', async () => {
      const { result } = renderHook(() => useTerminal())

      await act(async () => {
        await result.current.executeCommand('unknowncommand')
      })

      const lastOutput = result.current.output[result.current.output.length - 1]
      expect(lastOutput.type).toBe('error')
      expect(lastOutput.content).toContain('command not found')
    })

    it('executes valid commands', async () => {
      const { result } = renderHook(() => useTerminal())

      await act(async () => {
        await result.current.executeCommand('whoami')
      })

      // Should have command line + output
      const outputs = result.current.output
      const commandOutput = outputs.find((o) => o.type === 'command' && o.content === 'whoami')
      expect(commandOutput).toBeDefined()
    })
  })

  describe('clearOutput', () => {
    it('clears all output', async () => {
      const { result } = renderHook(() => useTerminal())

      // Add some commands first
      await act(async () => {
        await result.current.executeCommand('help')
      })

      expect(result.current.output.length).toBeGreaterThan(0)

      act(() => {
        result.current.clearOutput()
      })

      expect(result.current.output.length).toBe(0)
    })
  })

  describe('getHistoryItem', () => {
    it('returns empty string when history is empty', () => {
      const { result } = renderHook(() => useTerminal())

      // Clear any existing history
      act(() => {
        result.current.clearHistory()
      })

      const item = result.current.getHistoryItem('up', 0)
      expect(item.command).toBe('')
    })

    it('navigates up through history', async () => {
      const { result } = renderHook(() => useTerminal())

      // Clear and add some commands
      act(() => {
        result.current.clearHistory()
      })

      await act(async () => {
        await result.current.executeCommand('first')
        await result.current.executeCommand('second')
        await result.current.executeCommand('third')
      })

      // Navigate up from the end
      const historyLength = result.current.history.length
      const item = result.current.getHistoryItem('up', historyLength)

      expect(item.command).toBe('third')
      expect(item.index).toBe(historyLength - 1)
    })

    it('navigates down through history', async () => {
      const { result } = renderHook(() => useTerminal())

      act(() => {
        result.current.clearHistory()
      })

      await act(async () => {
        await result.current.executeCommand('first')
        await result.current.executeCommand('second')
      })

      // Start at index 0, go down
      const item = result.current.getHistoryItem('down', 0)
      expect(item.index).toBe(1)
    })

    it('does not go below 0', async () => {
      const { result } = renderHook(() => useTerminal())

      act(() => {
        result.current.clearHistory()
      })

      await act(async () => {
        await result.current.executeCommand('test')
      })

      // Try to go up from 0
      const item = result.current.getHistoryItem('up', 0)
      expect(item.index).toBe(0)
    })

    it('returns empty string when navigating past end of history', async () => {
      const { result } = renderHook(() => useTerminal())

      act(() => {
        result.current.clearHistory()
      })

      await act(async () => {
        await result.current.executeCommand('test')
      })

      // Navigate down past the end
      const historyLength = result.current.history.length
      const item = result.current.getHistoryItem('down', historyLength)

      expect(item.command).toBe('')
      expect(item.index).toBe(historyLength)
    })
  })

  describe('clearHistory', () => {
    it('clears command history', async () => {
      const { result } = renderHook(() => useTerminal())

      await act(async () => {
        await result.current.executeCommand('test')
      })

      expect(result.current.history.length).toBeGreaterThan(0)

      act(() => {
        result.current.clearHistory()
      })

      expect(result.current.history.length).toBe(0)
    })

    it('persists cleared history to localStorage', async () => {
      const { result } = renderHook(() => useTerminal())

      await act(async () => {
        await result.current.executeCommand('test')
      })

      act(() => {
        result.current.clearHistory()
      })

      expect(localStorageMock.setItem).toHaveBeenCalledWith('terminal-history', '[]')
    })
  })

  describe('history persistence', () => {
    it('saves history to localStorage', async () => {
      const { result } = renderHook(() => useTerminal())

      await act(async () => {
        await result.current.executeCommand('testcmd')
      })

      expect(localStorageMock.setItem).toHaveBeenCalled()
      const lastCall = localStorageMock.setItem.mock.calls[
        localStorageMock.setItem.mock.calls.length - 1
      ]
      expect(lastCall[0]).toBe('terminal-history')
      expect(lastCall[1]).toContain('testcmd')
    })
  })

  describe('chained commands', () => {
    it('executes chained commands with &&', async () => {
      const { result } = renderHook(() => useTerminal())

      await act(async () => {
        await result.current.executeCommand('whoami && hostname')
      })

      // Should have both command outputs
      const outputs = result.current.output
      const outputContents = outputs.map((o) => o.content).join(' ')
      expect(outputContents).toContain('guest')
    })

    it('stops on first error with &&', async () => {
      const { result } = renderHook(() => useTerminal())
      const initialOutputLength = result.current.output.length

      await act(async () => {
        await result.current.executeCommand('invalidcmd && whoami')
      })

      // Should show error for invalidcmd
      const outputs = result.current.output.slice(initialOutputLength)
      const errorOutput = outputs.find((o) => o.type === 'error')
      expect(errorOutput).toBeDefined()
      expect(errorOutput?.content).toContain('command not found')
    })
  })
})
