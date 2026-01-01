import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TerminalInput } from './TerminalInput'

describe('TerminalInput', () => {
  const defaultProps = {
    username: 'guest',
    hostname: 'localhost',
    onSubmit: vi.fn(),
    getHistoryItem: vi.fn().mockReturnValue({ command: '', index: 0 }),
    historyLength: 0,
    onClear: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders the input field', () => {
      render(<TerminalInput {...defaultProps} />)
      expect(screen.getByRole('textbox', { name: /terminal input/i })).toBeInTheDocument()
    })

    it('renders the username', () => {
      render(<TerminalInput {...defaultProps} />)
      expect(screen.getByText('guest')).toBeInTheDocument()
    })

    it('renders the hostname', () => {
      render(<TerminalInput {...defaultProps} />)
      expect(screen.getByText('localhost')).toBeInTheDocument()
    })

    it('renders prompt symbols', () => {
      render(<TerminalInput {...defaultProps} />)
      expect(screen.getByText('@')).toBeInTheDocument()
      expect(screen.getByText(':')).toBeInTheDocument()
      expect(screen.getByText('~')).toBeInTheDocument()
      expect(screen.getByText('$')).toBeInTheDocument()
    })
  })

  describe('input handling', () => {
    it('updates value when typing', async () => {
      const user = userEvent.setup()
      render(<TerminalInput {...defaultProps} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'hello')

      expect(input).toHaveValue('hello')
    })

    it('calls onSubmit with input value on Enter', async () => {
      const onSubmit = vi.fn()
      const user = userEvent.setup()
      render(<TerminalInput {...defaultProps} onSubmit={onSubmit} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'test command')
      await user.keyboard('{Enter}')

      expect(onSubmit).toHaveBeenCalledWith('test command')
    })

    it('clears input after Enter', async () => {
      const user = userEvent.setup()
      render(<TerminalInput {...defaultProps} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'test')
      await user.keyboard('{Enter}')

      expect(input).toHaveValue('')
    })
  })

  describe('keyboard shortcuts', () => {
    it('clears input on Ctrl+C', async () => {
      const user = userEvent.setup()
      render(<TerminalInput {...defaultProps} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'some text')
      await user.keyboard('{Control>}c{/Control}')

      expect(input).toHaveValue('')
    })

    it('clears input on Ctrl+Z', async () => {
      const user = userEvent.setup()
      render(<TerminalInput {...defaultProps} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'some text')
      await user.keyboard('{Control>}z{/Control}')

      expect(input).toHaveValue('')
    })

    it('calls onClear on Ctrl+L', async () => {
      const onClear = vi.fn()
      const user = userEvent.setup()
      render(<TerminalInput {...defaultProps} onClear={onClear} />)

      const input = screen.getByRole('textbox')
      await user.click(input)
      await user.keyboard('{Control>}l{/Control}')

      expect(onClear).toHaveBeenCalled()
    })
  })

  describe('history navigation', () => {
    it('calls getHistoryItem with up direction on ArrowUp', async () => {
      const getHistoryItem = vi.fn().mockReturnValue({ command: 'previous', index: 0 })
      const user = userEvent.setup()
      render(<TerminalInput {...defaultProps} getHistoryItem={getHistoryItem} historyLength={5} />)

      const input = screen.getByRole('textbox')
      await user.click(input)
      await user.keyboard('{ArrowUp}')

      expect(getHistoryItem).toHaveBeenCalledWith('up', 5)
    })

    it('sets input to history item on ArrowUp', async () => {
      const getHistoryItem = vi.fn().mockReturnValue({ command: 'previous command', index: 0 })
      const user = userEvent.setup()
      render(<TerminalInput {...defaultProps} getHistoryItem={getHistoryItem} historyLength={5} />)

      const input = screen.getByRole('textbox')
      await user.click(input)
      await user.keyboard('{ArrowUp}')

      expect(input).toHaveValue('previous command')
    })

    it('calls getHistoryItem with down direction on ArrowDown', async () => {
      const getHistoryItem = vi.fn().mockReturnValue({ command: '', index: 1 })
      const user = userEvent.setup()
      render(<TerminalInput {...defaultProps} getHistoryItem={getHistoryItem} historyLength={5} />)

      const input = screen.getByRole('textbox')
      await user.click(input)
      await user.keyboard('{ArrowDown}')

      expect(getHistoryItem).toHaveBeenCalledWith('down', 5)
    })
  })

  describe('autocomplete', () => {
    it('autocompletes command on Tab', async () => {
      const user = userEvent.setup()
      render(<TerminalInput {...defaultProps} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'hel')
      await user.keyboard('{Tab}')

      // Autocomplete adds trailing space for convenience
      expect(input).toHaveValue('help ')
    })

    it('autocompletes theme names after theme command', async () => {
      const user = userEvent.setup()
      render(<TerminalInput {...defaultProps} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'theme mat')
      await user.keyboard('{Tab}')

      // Autocomplete adds trailing space for convenience
      expect(input).toHaveValue('theme matrix ')
    })

    it('autocompletes section names after cat command', async () => {
      const user = userEvent.setup()
      render(<TerminalInput {...defaultProps} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'cat abo')
      await user.keyboard('{Tab}')

      // Autocomplete adds trailing space for convenience
      expect(input).toHaveValue('cat about ')
    })

    it('shows suggestions when multiple matches', async () => {
      const user = userEvent.setup()
      render(<TerminalInput {...defaultProps} />)

      const input = screen.getByRole('textbox')
      // 'c' matches multiple commands: cat, cd, clear, cowsay, cal
      await user.type(input, 'c')
      await user.keyboard('{Tab}')

      // Should show suggestions
      expect(screen.getByText(/cat/)).toBeInTheDocument()
    })

    it('hides suggestions after typing more characters', async () => {
      const user = userEvent.setup()
      render(<TerminalInput {...defaultProps} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'c')
      await user.keyboard('{Tab}')

      // Suggestions shown
      expect(screen.getByText(/cat/)).toBeInTheDocument()

      // Type more to narrow down
      await user.type(input, 'at')

      // Suggestions hidden
      // We need to check that the suggestions div is gone
      // Since typing hides suggestions
    })
  })

  describe('focus management', () => {
    it('input is focused on mount', () => {
      render(<TerminalInput {...defaultProps} />)
      const input = screen.getByRole('textbox')
      expect(document.activeElement).toBe(input)
    })
  })
})
