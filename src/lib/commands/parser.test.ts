import { describe, it, expect } from 'vitest'
import { parseCommandString, tokenize, hasHelpFlag, formatHelp } from './parser'

describe('tokenize', () => {
  it('splits simple command', () => {
    expect(tokenize('ls -l')).toEqual(['ls', '-l'])
  })

  it('handles multiple arguments', () => {
    expect(tokenize('cat about experience')).toEqual(['cat', 'about', 'experience'])
  })

  it('handles quoted strings', () => {
    expect(tokenize('echo "hello world"')).toEqual(['echo', 'hello world'])
  })

  it('handles single quoted strings', () => {
    expect(tokenize("echo 'hello world'")).toEqual(['echo', 'hello world'])
  })

  it('handles escaped characters', () => {
    expect(tokenize('echo hello\\ world')).toEqual(['echo', 'hello world'])
  })

  it('handles empty input', () => {
    expect(tokenize('')).toEqual([])
  })

  it('handles multiple spaces', () => {
    expect(tokenize('ls   -l   -a')).toEqual(['ls', '-l', '-a'])
  })
})

describe('parseCommandString', () => {
  it('parses simple command', () => {
    const result = parseCommandString('ls')
    expect(result.commands).toEqual([{ command: 'ls', args: [] }])
    expect(result.error).toBeUndefined()
  })

  it('parses command with args', () => {
    const result = parseCommandString('ls -l')
    expect(result.commands).toEqual([{ command: 'ls', args: ['-l'] }])
  })

  it('parses chained commands with &&', () => {
    const result = parseCommandString('echo hello && clear')
    expect(result.commands).toEqual([
      { command: 'echo', args: ['hello'] },
      { command: 'clear', args: [] },
    ])
  })

  it('handles multiple chained commands', () => {
    const result = parseCommandString('pwd && whoami && date')
    expect(result.commands).toHaveLength(3)
  })

  it('returns error for pipe operator', () => {
    const result = parseCommandString('ls | grep test')
    expect(result.error).toBe('Pipes are not supported in this terminal')
    expect(result.commands).toEqual([])
  })

  it('returns error for background operator', () => {
    const result = parseCommandString('sleep 10 &')
    expect(result.error).toBe('Background execution is not supported')
    expect(result.commands).toEqual([])
  })

  it('handles empty input', () => {
    const result = parseCommandString('')
    expect(result.commands).toEqual([])
    expect(result.error).toBeUndefined()
  })

  it('handles whitespace only', () => {
    const result = parseCommandString('   ')
    expect(result.commands).toEqual([])
  })

  it('allows || in command (not treated as pipe)', () => {
    const result = parseCommandString('echo hello || world')
    expect(result.error).toBeUndefined()
  })
})

describe('hasHelpFlag', () => {
  it('detects -h flag', () => {
    expect(hasHelpFlag(['-h'])).toBe(true)
    expect(hasHelpFlag(['arg', '-h'])).toBe(true)
  })

  it('detects --help flag', () => {
    expect(hasHelpFlag(['--help'])).toBe(true)
    expect(hasHelpFlag(['arg', '--help'])).toBe(true)
  })

  it('returns false when no help flag', () => {
    expect(hasHelpFlag([])).toBe(false)
    expect(hasHelpFlag(['-l', '-a'])).toBe(false)
  })
})

describe('formatHelp', () => {
  it('formats basic help', () => {
    const result = formatHelp('ls', 'List files', 'ls [options]')
    expect(result.output).toContain('NAME')
    expect(result.output).toContain('ls - List files')
    expect(result.output).toContain('SYNOPSIS')
    expect(result.output).toContain('ls [options]')
  })

  it('includes options when provided', () => {
    const result = formatHelp('ls', 'List files', 'ls [options]', [
      { flag: '-l', description: 'Long format' },
      { flag: '-a', description: 'Show hidden' },
    ])
    expect(result.output).toContain('OPTIONS')
    expect(result.output).toContain('-l')
    expect(result.output).toContain('Long format')
    expect(result.output).toContain('-a')
    expect(result.output).toContain('Show hidden')
  })
})
