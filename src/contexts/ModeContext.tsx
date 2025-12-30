import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'

type Mode = 'terminal' | 'nav'

interface ModeContextValue {
  mode: Mode
  setMode: (mode: Mode) => void
  toggleMode: () => void
}

const ModeContext = createContext<ModeContextValue | null>(null)

const STORAGE_KEY = 'preferred-mode'
const MOBILE_BREAKPOINT = 768

function getInitialMode(): Mode {
  if (typeof window === 'undefined') return 'terminal'

  // Check localStorage first
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'terminal' || saved === 'nav') return saved

  // Default: mobile → nav, desktop → terminal
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT
  return isMobile ? 'nav' : 'terminal'
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(getInitialMode)

  const setMode = useCallback((newMode: Mode) => {
    setModeState(newMode)
    localStorage.setItem(STORAGE_KEY, newMode)
  }, [])

  const toggleMode = useCallback(() => {
    setMode(mode === 'terminal' ? 'nav' : 'terminal')
  }, [mode, setMode])

  // Listen for resize to suggest mode change on mobile
  useEffect(() => {
    const handleResize = () => {
      // Only auto-switch if no saved preference
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return

      const isMobile = window.innerWidth < MOBILE_BREAKPOINT
      setModeState(isMobile ? 'nav' : 'terminal')
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode(): ModeContextValue {
  const context = useContext(ModeContext)
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider')
  }
  return context
}
