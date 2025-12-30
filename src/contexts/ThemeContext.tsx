import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { themes, defaultThemeId, type Theme } from '../config/themes'
import { registerThemeCallback, unregisterThemeCallback } from '../lib/themeRegistry'

interface ThemeContextValue {
  theme: Theme
  themeId: string
  setThemeId: (id: string) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'terminal-theme'

function getInitialThemeId(): string {
  if (typeof window === 'undefined') return defaultThemeId
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && themes[saved]) return saved
  return defaultThemeId
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState(getInitialThemeId)

  const setThemeId = useCallback((id: string) => {
    if (themes[id]) {
      setThemeIdState(id)
      localStorage.setItem(STORAGE_KEY, id)
    }
  }, [])

  // Apply theme colors to CSS variables
  useEffect(() => {
    const theme = themes[themeId]
    if (!theme) return

    const root = document.documentElement
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })
  }, [themeId])

  // Register theme callback for non-React command handlers
  useEffect(() => {
    registerThemeCallback(setThemeId, themeId)
    return () => unregisterThemeCallback()
  }, [setThemeId, themeId])

  const theme = themes[themeId] || themes[defaultThemeId]

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
