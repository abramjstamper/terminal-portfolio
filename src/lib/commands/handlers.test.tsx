import { describe, it, expect, beforeEach, vi } from 'vitest'
import { commands, commandNames } from './handlers'

// Mock window.location
const mockLocation = {
  hostname: 'localhost',
  href: '',
}

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
})

describe('commands', () => {
  beforeEach(() => {
    mockLocation.href = ''
  })

  describe('help', () => {
    it('lists all commands', () => {
      const result = commands.help.handler([], [])
      expect(result.output).toContain('Available commands')
      expect(result.output).toContain('help')
      expect(result.output).toContain('ls')
      expect(result.output).toContain('cat')
    })

    it('shows help for specific command', () => {
      const result = commands.help.handler(['ls'], [])
      expect(result.output).toContain('ls')
      expect(result.output).toContain('SYNOPSIS')
    })

    it('shows error for unknown command', () => {
      const result = commands.help.handler(['unknown'], [])
      expect(result.error).toContain('no help topics match')
    })

    it('shows help with -h flag', () => {
      const result = commands.help.handler(['-h'], [])
      expect(result.output).toContain('NAME')
    })
  })

  describe('man', () => {
    it('shows manual for command', () => {
      const result = commands.man.handler(['ls'], [])
      expect(result.output).toContain('NAME')
      expect(result.output).toContain('SYNOPSIS')
    })

    it('shows error when no command given', () => {
      const result = commands.man.handler([], [])
      expect(result.error).toBe('What manual page do you want?')
    })

    it('shows error for unknown command', () => {
      const result = commands.man.handler(['unknown'], [])
      expect(result.error).toContain('No manual entry')
    })
  })

  describe('ls', () => {
    it('lists sections', () => {
      const result = commands.ls.handler([], [])
      expect(result.output).toContain('about')
      expect(result.output).toContain('experience')
      expect(result.output).toContain('skills')
    })

    it('lists sections in long format with -l', () => {
      const result = commands.ls.handler(['-l'], [])
      expect(result.output).toContain('-rw-r--r--')
      expect(result.output).toContain('staff')
    })

    it('shows hidden with -a', () => {
      const result = commands.ls.handler(['-a'], [])
      expect(result.output).toContain('.secrets')
    })

    it('shows error for invalid section', () => {
      const result = commands.ls.handler(['invalid'], [])
      expect(result.error).toContain('Not a directory')
    })
  })

  describe('cat', () => {
    it('shows section content', () => {
      const result = commands.cat.handler(['about'], [])
      expect(result.output).toBeDefined()
      expect(result.error).toBeUndefined()
    })

    it('shows multiple sections', () => {
      const result = commands.cat.handler(['about', 'skills'], [])
      expect(result.output).toBeDefined()
    })

    it('shows error for missing operand', () => {
      const result = commands.cat.handler([], [])
      expect(result.error).toBe('cat: missing operand')
    })

    it('shows error for invalid section', () => {
      const result = commands.cat.handler(['invalid'], [])
      expect(result.error).toContain('No such file or directory')
    })

    it('supports -n for line numbers', () => {
      const result = commands.cat.handler(['-n', 'about'], [])
      expect(result.output).toMatch(/^\s+\d+\s+/)
    })
  })

  describe('cd', () => {
    it('shows hint', () => {
      const result = commands.cd.handler([], [])
      expect(result.output).toContain('cat')
    })

    it('shows hint with argument', () => {
      const result = commands.cd.handler(['about'], [])
      expect(result.output).toContain('cat')
    })
  })

  describe('pwd', () => {
    it('shows current directory', () => {
      const result = commands.pwd.handler([], [])
      expect(result.output).toContain('/home/')
    })
  })

  describe('clear', () => {
    it('returns clearScreen flag', () => {
      const result = commands.clear.handler([], [])
      expect(result.clearScreen).toBe(true)
    })
  })

  describe('history', () => {
    it('shows command history', () => {
      const history = ['ls', 'cat about', 'help']
      const result = commands.history.handler([], history)
      expect(result.output).toContain('ls')
      expect(result.output).toContain('cat about')
      expect(result.output).toContain('help')
    })

    it('limits history with number argument', () => {
      const history = ['ls', 'cat about', 'help', 'pwd', 'whoami']
      const result = commands.history.handler(['2'], history)
      expect(result.output).toContain('pwd')
      expect(result.output).toContain('whoami')
      expect(result.output).not.toContain('ls')
    })

    it('clears history with -c', () => {
      const result = commands.history.handler(['-c'], ['ls', 'pwd'])
      expect(result.output).toBe('History cleared')
    })

    it('shows message for empty history', () => {
      const result = commands.history.handler([], [])
      expect(result.output).toBe('No commands in history')
    })
  })

  describe('echo', () => {
    it('echoes message', () => {
      const result = commands.echo.handler(['hello', 'world'], [])
      expect(result.output).toBe('hello world')
    })

    it('handles empty echo', () => {
      const result = commands.echo.handler([], [])
      expect(result.output).toBe('')
    })

    it('handles -n flag', () => {
      const result = commands.echo.handler(['-n', 'hello'], [])
      expect(result.output).toBe('hello')
    })
  })

  describe('whoami', () => {
    it('returns username', () => {
      const result = commands.whoami.handler([], [])
      expect(result.output).toBe('guest')
    })
  })

  describe('hostname', () => {
    it('returns hostname', () => {
      const result = commands.hostname.handler([], [])
      expect(result.output).toBe('localhost')
    })
  })

  describe('id', () => {
    it('returns user id info', () => {
      const result = commands.id.handler([], [])
      expect(result.output).toContain('uid=1000')
      expect(result.output).toContain('guest')
    })
  })

  describe('exit', () => {
    it('redirects to rick roll', () => {
      commands.exit.handler([], [])
      expect(mockLocation.href).toContain('youtu.be')
    })
  })

  describe('date', () => {
    it('shows current date', () => {
      const result = commands.date.handler([], [])
      expect(result.output).toBeDefined()
      expect(result.output!.toString().length).toBeGreaterThan(0)
    })

    it('shows UTC date with -u', () => {
      const result = commands.date.handler(['-u'], [])
      expect(result.output).toContain('GMT')
    })
  })

  describe('uname', () => {
    it('shows system name', () => {
      const result = commands.uname.handler([], [])
      expect(result.output).toBe('TerminalPortfolio')
    })

    it('shows all info with -a', () => {
      const result = commands.uname.handler(['-a'], [])
      expect(result.output).toContain('TerminalPortfolio')
      expect(result.output).toContain('1.0.0')
    })

    it('shows release with -r', () => {
      const result = commands.uname.handler(['-r'], [])
      expect(result.output).toBe('1.0.0')
    })

    it('shows machine with -m', () => {
      const result = commands.uname.handler(['-m'], [])
      expect(result.output).toBe('browser')
    })
  })

  describe('uptime', () => {
    it('shows uptime', () => {
      const result = commands.uptime.handler([], [])
      expect(result.output).toContain('up')
      expect(result.output).toContain('built')
    })

    it('shows pretty format with -p', () => {
      const result = commands.uptime.handler(['-p'], [])
      expect(result.output).toContain('up')
      expect(result.output).not.toContain('built')
    })

    it('shows build timestamp with -s', () => {
      const result = commands.uptime.handler(['-s'], [])
      expect(result.output).toMatch(/\d{4}-\d{2}-\d{2}/)
    })
  })

  describe('theme', () => {
    it('shows current theme', () => {
      const result = commands.theme.handler([], [])
      expect(result.output).toContain('Current theme')
    })

    it('lists themes with -l', () => {
      const result = commands.theme.handler(['-l'], [])
      expect(result.output).toContain('Available themes')
      expect(result.output).toContain('green')
      expect(result.output).toContain('amber')
      expect(result.output).toContain('matrix')
    })

    it('shows error for invalid theme', () => {
      const result = commands.theme.handler(['invalid'], [])
      expect(result.error).toContain('not found')
    })
  })

  describe('motd', () => {
    it('shows ASCII banner', () => {
      const result = commands.motd.handler([], [])
      expect(result.output).toContain('█')
      expect(result.output).toContain('Welcome')
    })
  })

  describe('export', () => {
    it('triggers download', () => {
      const clickMock = vi.fn()
      vi.spyOn(document, 'createElement').mockReturnValue({
        href: '',
        download: '',
        click: clickMock,
      } as unknown as HTMLAnchorElement)

      const result = commands.export.handler([], [])
      expect(result.output).toContain('Downloading')
      expect(clickMock).toHaveBeenCalled()
    })
  })
})

describe('commandNames', () => {
  it('includes all expected commands', () => {
    const expected = [
      'help', 'man', 'ls', 'cat', 'cd', 'pwd', 'clear', 'history',
      'echo', 'whoami', 'hostname', 'id', 'exit', 'logout', 'date',
      'uname', 'ifconfig', 'uptime', 'theme', 'motd', 'export'
    ]
    expected.forEach(cmd => {
      expect(commandNames).toContain(cmd)
    })
  })
})
