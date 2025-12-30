import { ThemeProvider } from './contexts/ThemeContext'
import { ModeProvider, useMode } from './contexts/ModeContext'
import { NavThemeProvider } from './contexts/NavThemeContext'
import { Terminal } from './components/terminal'
import { NavSite } from './components/nav'

function AppContent() {
  const { mode } = useMode()

  if (mode === 'terminal') {
    return <Terminal />
  }

  return (
    <NavThemeProvider>
      <NavSite />
    </NavThemeProvider>
  )
}

function App() {
  return (
    <ModeProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ModeProvider>
  )
}

export default App
