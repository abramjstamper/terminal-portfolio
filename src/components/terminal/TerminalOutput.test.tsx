import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TerminalOutput } from './TerminalOutput'
import type { OutputLine } from '../../types/terminal'

describe('TerminalOutput', () => {
  describe('rendering', () => {
    it('renders the output container with log role', () => {
      render(<TerminalOutput lines={[]} />)
      expect(screen.getByRole('log', { name: /terminal output/i })).toBeInTheDocument()
    })

    it('renders empty when no lines', () => {
      render(<TerminalOutput lines={[]} />)
      const log = screen.getByRole('log')
      expect(log.children).toHaveLength(0)
    })
  })

  describe('command lines', () => {
    it('renders command line with prompt parts', () => {
      const lines: OutputLine[] = [
        {
          id: '1',
          type: 'command',
          content: 'whoami',
          prompt: 'guest@localhost:~$ ',
        },
      ]

      render(<TerminalOutput lines={lines} />)

      expect(screen.getByText('guest')).toBeInTheDocument()
      expect(screen.getByText('@')).toBeInTheDocument()
      expect(screen.getByText('localhost')).toBeInTheDocument()
      expect(screen.getByText('whoami')).toBeInTheDocument()
    })

    it('renders command content', () => {
      const lines: OutputLine[] = [
        {
          id: '1',
          type: 'command',
          content: 'help --verbose',
          prompt: 'guest@localhost:~$ ',
        },
      ]

      render(<TerminalOutput lines={lines} />)
      expect(screen.getByText('help --verbose')).toBeInTheDocument()
    })
  })

  describe('output lines', () => {
    it('renders output line content', () => {
      const lines: OutputLine[] = [
        {
          id: '1',
          type: 'output',
          content: 'Hello, World!',
        },
      ]

      render(<TerminalOutput lines={lines} />)
      expect(screen.getByText('Hello, World!')).toBeInTheDocument()
    })

    it('renders multiline output', () => {
      const lines: OutputLine[] = [
        {
          id: '1',
          type: 'output',
          content: 'Line 1\nLine 2\nLine 3',
        },
      ]

      render(<TerminalOutput lines={lines} />)
      expect(screen.getByText(/Line 1/)).toBeInTheDocument()
      expect(screen.getByText(/Line 2/)).toBeInTheDocument()
      expect(screen.getByText(/Line 3/)).toBeInTheDocument()
    })

    it('preserves whitespace in output', () => {
      const lines: OutputLine[] = [
        {
          id: '1',
          type: 'output',
          content: '  indented text',
        },
      ]

      render(<TerminalOutput lines={lines} />)
      const pre = screen.getByText(/indented text/)
      expect(pre).toHaveClass('whitespace-pre-wrap')
    })
  })

  describe('error lines', () => {
    it('renders error line content', () => {
      const lines: OutputLine[] = [
        {
          id: '1',
          type: 'error',
          content: 'command not found: foo',
        },
      ]

      render(<TerminalOutput lines={lines} />)
      expect(screen.getByText('command not found: foo')).toBeInTheDocument()
    })

    it('applies error styling', () => {
      const lines: OutputLine[] = [
        {
          id: '1',
          type: 'error',
          content: 'Error message',
        },
      ]

      render(<TerminalOutput lines={lines} />)
      const errorElement = screen.getByText('Error message')
      expect(errorElement).toHaveClass('text-terminal-error')
    })
  })

  describe('system lines', () => {
    it('renders system line content', () => {
      const lines: OutputLine[] = [
        {
          id: '1',
          type: 'system',
          content: 'Welcome to the terminal!',
        },
      ]

      render(<TerminalOutput lines={lines} />)
      expect(screen.getByText('Welcome to the terminal!')).toBeInTheDocument()
    })
  })

  describe('multiple lines', () => {
    it('renders multiple lines in order', () => {
      const lines: OutputLine[] = [
        { id: '1', type: 'command', content: 'first', prompt: 'guest@localhost:~$ ' },
        { id: '2', type: 'output', content: 'second' },
        { id: '3', type: 'error', content: 'third' },
      ]

      render(<TerminalOutput lines={lines} />)

      const log = screen.getByRole('log')
      expect(log.children).toHaveLength(3)
    })

    it('uses unique keys for each line', () => {
      const lines: OutputLine[] = [
        { id: 'unique1', type: 'output', content: 'Line 1' },
        { id: 'unique2', type: 'output', content: 'Line 2' },
      ]

      render(<TerminalOutput lines={lines} />)

      // If keys are working, both lines should render
      expect(screen.getByText('Line 1')).toBeInTheDocument()
      expect(screen.getByText('Line 2')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('has aria-live polite for screen readers', () => {
      render(<TerminalOutput lines={[]} />)
      const log = screen.getByRole('log')
      expect(log).toHaveAttribute('aria-live', 'polite')
    })

    it('has aria-label for screen readers', () => {
      render(<TerminalOutput lines={[]} />)
      const log = screen.getByRole('log')
      expect(log).toHaveAttribute('aria-label', 'Terminal output')
    })
  })
})
