import type { ParsedCommand, CommandResult } from '../../types/terminal'

export interface ParseResult {
  commands: ParsedCommand[]
  error?: string
}

/**
 * Parse a command string into individual commands
 * Supports && operator for chaining
 * Returns error for unsupported operators (|, &, ;)
 */
export function parseCommandString(input: string): ParseResult {
  const trimmed = input.trim()
  if (!trimmed) {
    return { commands: [] }
  }

  // Check for unsupported operators
  if (trimmed.includes('|') && !trimmed.includes('||')) {
    return {
      commands: [],
      error: 'Pipes are not supported in this terminal',
    }
  }

  if (/[^&]&[^&]/.test(trimmed) || trimmed.endsWith('&')) {
    return {
      commands: [],
      error: 'Background execution is not supported',
    }
  }

  // Split by && operator
  const commandStrings = trimmed.split(/\s*&&\s*/).filter(Boolean)

  const commands: ParsedCommand[] = commandStrings.map((cmdStr) => {
    const tokens = tokenize(cmdStr.trim())
    return {
      command: tokens[0] || '',
      args: tokens.slice(1),
    }
  })

  return { commands: commands.filter((c) => c.command) }
}

/**
 * Tokenize a single command string
 * Handles quoted strings and escapes
 */
export function tokenize(input: string): string[] {
  const tokens: string[] = []
  let current = ''
  let inQuote: string | null = null
  let escape = false

  for (let i = 0; i < input.length; i++) {
    const char = input[i]

    if (escape) {
      current += char
      escape = false
      continue
    }

    if (char === '\\') {
      escape = true
      continue
    }

    if ((char === '"' || char === "'") && !inQuote) {
      inQuote = char
      continue
    }

    if (char === inQuote) {
      inQuote = null
      continue
    }

    if (char === ' ' && !inQuote) {
      if (current) {
        tokens.push(current)
        current = ''
      }
      continue
    }

    current += char
  }

  if (current) {
    tokens.push(current)
  }

  return tokens
}

/**
 * Check if args contain help flag
 */
export function hasHelpFlag(args: string[]): boolean {
  return args.includes('-h') || args.includes('--help')
}

/**
 * Format help output for a command
 */
export function formatHelp(
  name: string,
  description: string,
  usage: string,
  options?: { flag: string; description: string }[]
): CommandResult {
  const lines: string[] = [
    `NAME`,
    `    ${name} - ${description}`,
    '',
    `SYNOPSIS`,
    `    ${usage}`,
  ]

  if (options && options.length > 0) {
    lines.push('', 'OPTIONS')
    options.forEach(({ flag, description }) => {
      lines.push(`    ${flag.padEnd(16)} ${description}`)
    })
  }

  return { output: lines.join('\n') }
}
