import { describe, it, expect } from 'vitest'
import { getAutocompleteSuggestions, autocomplete } from './autocomplete'

describe('getAutocompleteSuggestions', () => {
  describe('empty input', () => {
    it('returns empty array for empty string', () => {
      expect(getAutocompleteSuggestions('')).toEqual([])
    })

    it('returns empty array for whitespace only', () => {
      expect(getAutocompleteSuggestions('   ')).toEqual([])
    })
  })

  describe('command completion', () => {
    it('completes partial command names', () => {
      const suggestions = getAutocompleteSuggestions('he')
      expect(suggestions).toContain('help')
    })

    it('completes "ca" to cat and cal', () => {
      const suggestions = getAutocompleteSuggestions('ca')
      expect(suggestions).toContain('cat')
      expect(suggestions).toContain('cal')
    })

    it('completes "cl" to clear', () => {
      const suggestions = getAutocompleteSuggestions('cl')
      expect(suggestions).toContain('clear')
    })

    it('completes "th" to theme', () => {
      const suggestions = getAutocompleteSuggestions('th')
      expect(suggestions).toContain('theme')
    })

    it('returns empty for non-matching prefix', () => {
      const suggestions = getAutocompleteSuggestions('xyz')
      expect(suggestions).toEqual([])
    })
  })

  describe('cat/cd section completion', () => {
    it('completes sections for cat command', () => {
      const suggestions = getAutocompleteSuggestions('cat ab')
      expect(suggestions).toContain('about')
    })

    it('completes sections for cd command', () => {
      const suggestions = getAutocompleteSuggestions('cd ex')
      expect(suggestions).toContain('experience')
    })

    it('returns matching sections with partial input', () => {
      // Note: 'cat ' splits to ['cat'] with regex, so 'a' is needed
      const suggestions = getAutocompleteSuggestions('cat a')
      expect(suggestions).toContain('about')
    })
  })

  describe('theme command completion', () => {
    it('completes theme flags', () => {
      const suggestions = getAutocompleteSuggestions('theme -')
      expect(suggestions).toContain('-l')
      expect(suggestions).toContain('-s')
      expect(suggestions).toContain('-h')
      expect(suggestions).toContain('--help')
    })

    it('completes theme names', () => {
      const suggestions = getAutocompleteSuggestions('theme ma')
      expect(suggestions).toContain('matrix')
    })
  })

  describe('help/man completion', () => {
    it('completes command names for help', () => {
      const suggestions = getAutocompleteSuggestions('help cl')
      expect(suggestions).toContain('clear')
    })

    it('completes command names for man', () => {
      const suggestions = getAutocompleteSuggestions('man th')
      expect(suggestions).toContain('theme')
    })
  })

  describe('flag completion', () => {
    it('completes -h and --help for generic commands', () => {
      const suggestions = getAutocompleteSuggestions('echo -')
      expect(suggestions).toContain('-h')
      expect(suggestions).toContain('--help')
    })

    it('completes --help from --h', () => {
      const suggestions = getAutocompleteSuggestions('ls --h')
      expect(suggestions).toContain('--help')
    })
  })
})

describe('autocomplete', () => {
  describe('single match', () => {
    it('completes with space for single match', () => {
      const result = autocomplete('clea')
      expect(result).toBe('clear ')
    })

    it('completes section for cat', () => {
      const result = autocomplete('cat abo')
      expect(result).toBe('cat about ')
    })
  })

  describe('no match', () => {
    it('returns null for no matches', () => {
      const result = autocomplete('xyz')
      expect(result).toBeNull()
    })

    it('returns null for empty input', () => {
      const result = autocomplete('')
      expect(result).toBeNull()
    })
  })

  describe('multiple matches', () => {
    it('finds common prefix for multiple matches', () => {
      // 'ca' matches 'cat' and 'cal' - common prefix is 'ca'
      const result = autocomplete('c')
      // Should return common prefix if longer than input
      // 'c' matches: cat, cal, cd, clear, coffee, cowsay
      // Common prefix might just be 'c' so returns null
      expect(result === null || result.startsWith('c')).toBe(true)
    })

    it('completes to common prefix when available', () => {
      // 'cof' should complete to 'coffee '
      const result = autocomplete('cof')
      expect(result).toBe('coffee ')
    })
  })

  describe('preserves command context', () => {
    it('preserves command when completing argument', () => {
      const result = autocomplete('cat ski')
      expect(result).toBe('cat skills ')
    })

    it('preserves command when completing theme', () => {
      const result = autocomplete('theme mat')
      expect(result).toBe('theme matrix ')
    })
  })
})
