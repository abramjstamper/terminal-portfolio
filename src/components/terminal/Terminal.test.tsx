import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../test/utils'
import { Terminal } from './Terminal'

// Mock scrollTop/scrollHeight for scroll behavior
Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
  configurable: true,
  get: function () {
    return this._scrollHeight || 0
  },
  set: function (val) {
    this._scrollHeight = val
  },
})

Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
  configurable: true,
  get: function () {
    return this._scrollTop || 0
  },
  set: function (val) {
    this._scrollTop = val
  },
})

describe('Terminal', () => {
  describe('rendering', () => {
    it('renders the terminal application', () => {
      render(<Terminal />)
      expect(screen.getByRole('application', { name: /terminal interface/i })).toBeInTheDocument()
    })

    it('renders the terminal input', () => {
      render(<Terminal />)
      expect(screen.getByRole('textbox', { name: /terminal input/i })).toBeInTheDocument()
    })

    it('renders the output area', () => {
      render(<Terminal />)
      expect(screen.getByRole('log', { name: /terminal output/i })).toBeInTheDocument()
    })

    it('renders the mode switch button', () => {
      render(<Terminal />)
      expect(screen.getByRole('button', { name: /switch to nav/i })).toBeInTheDocument()
    })

    it('renders skip link for accessibility', () => {
      render(<Terminal />)
      expect(screen.getByRole('link', { name: /skip to main content/i })).toBeInTheDocument()
    })

    it('shows motd banner on initial render', () => {
      render(<Terminal />)
      // The motd contains ASCII art with the name
      expect(screen.getByRole('log')).toHaveTextContent(/welcome/i)
    })
  })

  describe('command execution', () => {
    it('executes whoami command and shows output', async () => {
      const user = userEvent.setup()
      render(<Terminal />)

      const input = screen.getByRole('textbox', { name: /terminal input/i })
      await user.type(input, 'whoami')
      await user.keyboard('{Enter}')

      await waitFor(() => {
        expect(screen.getByRole('log')).toHaveTextContent('guest')
      })
    })

    it('executes help command and shows available commands', async () => {
      const user = userEvent.setup()
      render(<Terminal />)

      const input = screen.getByRole('textbox', { name: /terminal input/i })
      await user.type(input, 'help')
      await user.keyboard('{Enter}')

      await waitFor(() => {
        expect(screen.getByRole('log')).toHaveTextContent(/available commands/i)
      })
    })

    it('shows error for unknown command', async () => {
      const user = userEvent.setup()
      render(<Terminal />)

      const input = screen.getByRole('textbox', { name: /terminal input/i })
      await user.type(input, 'unknowncmd')
      await user.keyboard('{Enter}')

      await waitFor(() => {
        expect(screen.getByRole('log')).toHaveTextContent(/command not found/i)
      })
    })

    it('clears input after command execution', async () => {
      const user = userEvent.setup()
      render(<Terminal />)

      const input = screen.getByRole('textbox', { name: /terminal input/i })
      await user.type(input, 'whoami')
      await user.keyboard('{Enter}')

      await waitFor(() => {
        expect(input).toHaveValue('')
      })
    })

    it('displays command in output after execution', async () => {
      const user = userEvent.setup()
      render(<Terminal />)

      const input = screen.getByRole('textbox', { name: /terminal input/i })
      await user.type(input, 'pwd')
      await user.keyboard('{Enter}')

      await waitFor(() => {
        // The command should appear in the output
        expect(screen.getByRole('log')).toHaveTextContent('pwd')
      })
    })
  })

  describe('clear command', () => {
    it('clears terminal output when clear command is executed', async () => {
      const user = userEvent.setup()
      render(<Terminal />)

      // First run a command to add output
      const input = screen.getByRole('textbox', { name: /terminal input/i })
      await user.type(input, 'whoami')
      await user.keyboard('{Enter}')

      await waitFor(() => {
        expect(screen.getByRole('log')).toHaveTextContent('guest')
      })

      // Then clear
      await user.type(input, 'clear')
      await user.keyboard('{Enter}')

      await waitFor(() => {
        // Output should be empty (no text content besides whitespace)
        const log = screen.getByRole('log')
        expect(log.textContent?.trim()).toBe('')
      })
    })
  })

  describe('prompt display', () => {
    it('displays username in prompt', () => {
      render(<Terminal />)
      expect(screen.getByText('guest')).toBeInTheDocument()
    })

    it('displays hostname in prompt', () => {
      render(<Terminal />)
      // hostname is derived from window.location.hostname
      expect(screen.getByText('localhost')).toBeInTheDocument()
    })
  })
})
