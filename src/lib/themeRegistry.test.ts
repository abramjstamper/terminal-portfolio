import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  registerThemeCallback,
  unregisterThemeCallback,
  setTheme,
  getCurrentThemeId,
} from './themeRegistry'
import { defaultThemeId } from '../config/themes'

describe('themeRegistry', () => {
  beforeEach(() => {
    // Reset state between tests
    unregisterThemeCallback()
    // Reset to default by registering with default and then unregistering
    registerThemeCallback(() => {}, defaultThemeId)
    unregisterThemeCallback()
  })

  describe('getCurrentThemeId', () => {
    it('returns the default theme id initially', () => {
      // After reset, should be at default
      registerThemeCallback(() => {}, defaultThemeId)
      expect(getCurrentThemeId()).toBe(defaultThemeId)
    })

    it('returns the theme id set during registration', () => {
      registerThemeCallback(() => {}, 'amber')
      expect(getCurrentThemeId()).toBe('amber')
    })
  })

  describe('registerThemeCallback', () => {
    it('stores the callback and initial theme id', () => {
      const callback = vi.fn()
      registerThemeCallback(callback, 'matrix')

      expect(getCurrentThemeId()).toBe('matrix')
    })

    it('replaces previous callback when called again', () => {
      const callback1 = vi.fn()
      const callback2 = vi.fn()

      registerThemeCallback(callback1, 'green')
      registerThemeCallback(callback2, 'blue')

      setTheme('amber')

      expect(callback1).not.toHaveBeenCalled()
      expect(callback2).toHaveBeenCalledWith('amber')
    })
  })

  describe('unregisterThemeCallback', () => {
    it('prevents callback from being called after unregister', () => {
      const callback = vi.fn()
      registerThemeCallback(callback, 'green')

      unregisterThemeCallback()
      setTheme('blue')

      expect(callback).not.toHaveBeenCalled()
    })

    it('does not throw when called without prior registration', () => {
      expect(() => unregisterThemeCallback()).not.toThrow()
    })
  })

  describe('setTheme', () => {
    it('calls the registered callback with the theme id', () => {
      const callback = vi.fn()
      registerThemeCallback(callback, 'green')

      setTheme('matrix')

      expect(callback).toHaveBeenCalledWith('matrix')
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('updates the current theme id', () => {
      registerThemeCallback(() => {}, 'green')

      setTheme('rainbow')

      expect(getCurrentThemeId()).toBe('rainbow')
    })

    it('updates theme id even without a callback registered', () => {
      unregisterThemeCallback()

      setTheme('light')

      expect(getCurrentThemeId()).toBe('light')
    })

    it('does not throw when no callback is registered', () => {
      unregisterThemeCallback()

      expect(() => setTheme('blue')).not.toThrow()
    })

    it('can be called multiple times', () => {
      const callback = vi.fn()
      registerThemeCallback(callback, 'green')

      setTheme('amber')
      setTheme('blue')
      setTheme('matrix')

      expect(callback).toHaveBeenCalledTimes(3)
      expect(callback).toHaveBeenNthCalledWith(1, 'amber')
      expect(callback).toHaveBeenNthCalledWith(2, 'blue')
      expect(callback).toHaveBeenNthCalledWith(3, 'matrix')
      expect(getCurrentThemeId()).toBe('matrix')
    })
  })
})
