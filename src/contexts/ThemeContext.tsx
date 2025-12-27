import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { themes, DEFAULT_THEME, type Theme } from '@/config/themes';

const STORAGE_KEY = 'terminal-theme';

interface ThemeContextValue {
  theme: Theme;
  themeId: string;
  setTheme: (id: string) => void;
  availableThemes: string[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeId, setThemeId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && themes[stored]) {
        return stored;
      }
    }
    return DEFAULT_THEME;
  });

  const theme = themes[themeId] || themes[DEFAULT_THEME];

  // Persist theme preference
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, themeId);
  }, [themeId]);

  // Apply theme CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-bg', theme.colors.bg);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-prompt', theme.colors.prompt);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-error', theme.colors.error);
    root.style.setProperty('--color-success', theme.colors.success);
    root.style.setProperty('--color-link', theme.colors.link);
    root.style.setProperty('--color-muted', theme.colors.muted);

    // Update body background
    document.body.style.backgroundColor = theme.colors.bg;
    document.body.style.color = theme.colors.text;
  }, [theme]);

  const setTheme = (id: string) => {
    if (themes[id]) {
      setThemeId(id);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeId,
        setTheme,
        availableThemes: Object.keys(themes),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
