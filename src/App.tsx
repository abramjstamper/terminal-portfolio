import { useEffect } from 'react';
import { Terminal } from '@/components/terminal';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { registerThemeCallback, unregisterThemeCallback } from '@/lib/themeRegistry';

function AppContent() {
  const { theme, themeId, setTheme } = useTheme();

  // Register theme callback for command handlers
  useEffect(() => {
    registerThemeCallback(setTheme, themeId);
    return () => unregisterThemeCallback();
  }, [setTheme, themeId]);

  return (
    <div className="min-h-screen font-mono flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Skip link for accessibility */}
      <a href="#terminal" className="skip-link">
        Skip to terminal
      </a>

      {/* Header */}
      <header className="p-4 border-b" style={{ borderColor: 'var(--color-muted)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div style={{ color: 'var(--color-text)' }} className="text-glow-sm">
            <span style={{ color: 'var(--color-prompt)' }}>~</span> terminal-portfolio
          </div>
          <nav className="text-sm" style={{ color: 'var(--color-muted)' }}>
            <button className="hover:opacity-80 transition-opacity">
              [nav mode]
            </button>
          </nav>
        </div>
      </header>

      {/* Main terminal area */}
      <main id="terminal" className="flex-1 max-w-6xl w-full mx-auto">
        <Terminal showWelcome={true} />
      </main>

      {/* Scanlines effect - only show if theme has scanlines enabled */}
      {theme.effects.scanlines && (
        <div className="scanlines" aria-hidden="true"></div>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
