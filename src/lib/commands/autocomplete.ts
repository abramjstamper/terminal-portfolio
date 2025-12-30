import { commandNames } from './handlers'
import { themeIds } from '../../config/themes'

const SECTIONS = ['about', 'experience', 'skills', 'projects', 'contact', 'resume']

/**
 * Get autocomplete suggestions for the current input
 */
export function getAutocompleteSuggestions(input: string): string[] {
  const trimmed = input.trim()
  if (!trimmed) return []

  const tokens = trimmed.split(/\s+/)
  const lastToken = tokens[tokens.length - 1]
  const isFirstToken = tokens.length === 1

  // First token - complete commands
  if (isFirstToken) {
    return commandNames.filter((cmd) => cmd.startsWith(lastToken))
  }

  const command = tokens[0]

  // Command-specific completions
  switch (command) {
    case 'cat':
    case 'cd':
      return SECTIONS.filter((s) => s.startsWith(lastToken))

    case 'theme':
      // Complete theme names for 'theme' and 'theme -s'
      if (lastToken.startsWith('-')) {
        return ['-l', '-s', '-h', '--help'].filter((f) => f.startsWith(lastToken))
      }
      return themeIds.filter((id) => id.startsWith(lastToken))

    case 'help':
    case 'man':
      return commandNames.filter((cmd) => cmd.startsWith(lastToken))

    default:
      // For most commands, complete flags
      if (lastToken.startsWith('-')) {
        return ['-h', '--help'].filter((f) => f.startsWith(lastToken))
      }
      return []
  }
}

/**
 * Apply autocomplete to input
 * Returns the completed input string, or null if no completion
 */
export function autocomplete(input: string): string | null {
  const suggestions = getAutocompleteSuggestions(input)

  if (suggestions.length === 0) return null
  if (suggestions.length === 1) {
    const tokens = input.trim().split(/\s+/)
    tokens[tokens.length - 1] = suggestions[0]
    return tokens.join(' ') + ' '
  }

  // Multiple suggestions - find common prefix
  const commonPrefix = findCommonPrefix(suggestions)
  if (commonPrefix.length > input.split(/\s+/).pop()!.length) {
    const tokens = input.trim().split(/\s+/)
    tokens[tokens.length - 1] = commonPrefix
    return tokens.join(' ')
  }

  return null
}

/**
 * Find common prefix among strings
 */
function findCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return ''
  if (strings.length === 1) return strings[0]

  let prefix = strings[0]
  for (let i = 1; i < strings.length; i++) {
    while (!strings[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1)
      if (!prefix) return ''
    }
  }
  return prefix
}
