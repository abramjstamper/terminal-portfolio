import { describe, it, expect } from 'vitest'
import { themes, themeIds, defaultThemeId, Theme, ThemeColors } from './themes'

describe('themes', () => {
  describe('theme structure', () => {
    it('exports a non-empty themes object', () => {
      expect(Object.keys(themes).length).toBeGreaterThan(0)
    })

    it('has all expected themes', () => {
      const expectedThemes = ['green', 'amber', 'blue', 'matrix', 'high-contrast', 'light', 'rainbow']
      expectedThemes.forEach((themeId) => {
        expect(themes[themeId]).toBeDefined()
      })
    })

    it('each theme has required properties', () => {
      Object.values(themes).forEach((theme: Theme) => {
        expect(theme.id).toBeDefined()
        expect(typeof theme.id).toBe('string')
        expect(theme.name).toBeDefined()
        expect(typeof theme.name).toBe('string')
        expect(theme.description).toBeDefined()
        expect(typeof theme.description).toBe('string')
        expect(theme.colors).toBeDefined()
        expect(theme.effects).toBeDefined()
      })
    })

    it('theme id matches object key', () => {
      Object.entries(themes).forEach(([key, theme]) => {
        expect(theme.id).toBe(key)
      })
    })
  })

  describe('theme colors', () => {
    const requiredColors: (keyof ThemeColors)[] = [
      'bg',
      'text',
      'prompt',
      'accent',
      'error',
      'success',
      'link',
      'muted',
    ]

    it('each theme has all required color properties', () => {
      Object.values(themes).forEach((theme: Theme) => {
        requiredColors.forEach((colorKey) => {
          expect(theme.colors[colorKey]).toBeDefined()
          expect(typeof theme.colors[colorKey]).toBe('string')
        })
      })
    })

    it('all colors are valid hex codes', () => {
      const hexColorRegex = /^#[0-9a-fA-F]{6}$/
      Object.values(themes).forEach((theme: Theme) => {
        Object.values(theme.colors).forEach((colorValue) => {
          expect(colorValue).toMatch(hexColorRegex)
        })
      })
    })

    it('each theme has distinct text and background colors', () => {
      Object.values(themes).forEach((theme: Theme) => {
        expect(theme.colors.text).not.toBe(theme.colors.bg)
      })
    })

    it('error color is reddish in all themes', () => {
      Object.values(themes).forEach((theme: Theme) => {
        // Error colors should have high red component
        const errorColor = theme.colors.error.toLowerCase()
        const red = parseInt(errorColor.slice(1, 3), 16)
        expect(red).toBeGreaterThanOrEqual(128)
      })
    })
  })

  describe('theme effects', () => {
    it('each theme has boolean scanlines and glow properties', () => {
      Object.values(themes).forEach((theme: Theme) => {
        expect(typeof theme.effects.scanlines).toBe('boolean')
        expect(typeof theme.effects.glow).toBe('boolean')
      })
    })

    it('high-contrast theme has no visual effects', () => {
      expect(themes['high-contrast'].effects.scanlines).toBe(false)
      expect(themes['high-contrast'].effects.glow).toBe(false)
    })

    it('light theme has no visual effects', () => {
      expect(themes.light.effects.scanlines).toBe(false)
      expect(themes.light.effects.glow).toBe(false)
    })
  })

  describe('themeIds', () => {
    it('contains all theme keys', () => {
      const keys = Object.keys(themes)
      expect(themeIds.length).toBe(keys.length)
      keys.forEach((key) => {
        expect(themeIds).toContain(key)
      })
    })

    it('is an array of strings', () => {
      expect(Array.isArray(themeIds)).toBe(true)
      themeIds.forEach((id) => {
        expect(typeof id).toBe('string')
      })
    })
  })

  describe('defaultThemeId', () => {
    it('is a valid theme id', () => {
      expect(themes[defaultThemeId]).toBeDefined()
    })

    it('is green', () => {
      expect(defaultThemeId).toBe('green')
    })

    it('exists in themeIds array', () => {
      expect(themeIds).toContain(defaultThemeId)
    })
  })
})
