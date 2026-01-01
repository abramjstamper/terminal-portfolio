import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'

type ColorScheme = 'light' | 'dark'

interface NavThemeContextValue {
  colorScheme: ColorScheme
  toggleColorScheme: () => void
  setColorScheme: (scheme: ColorScheme) => void
}

const NavThemeContext = createContext<NavThemeContextValue | null>(null)

const STORAGE_KEY = 'nav-color-scheme'

function getSystemPreference(): ColorScheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialColorScheme(): ColorScheme {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return getSystemPreference()
}

export function NavThemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(getInitialColorScheme)

  const setColorScheme = useCallback((scheme: ColorScheme) => {
    setColorSchemeState(scheme)
    localStorage.setItem(STORAGE_KEY, scheme)
  }, [])

  const toggleColorScheme = useCallback(() => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
  }, [colorScheme, setColorScheme])

  // Apply dark class to document
  useEffect(() => {
    const root = document.documentElement
    if (colorScheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [colorScheme])

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) {
        setColorSchemeState(e.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <NavThemeContext.Provider value={{ colorScheme, toggleColorScheme, setColorScheme }}>
      {children}
    </NavThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNavTheme(): NavThemeContextValue {
  const context = useContext(NavThemeContext)
  if (!context) {
    throw new Error('useNavTheme must be used within a NavThemeProvider')
  }
  return context
}
