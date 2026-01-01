/* eslint-disable react-refresh/only-export-components */
import { ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { NavThemeProvider } from '../contexts/NavThemeContext'
import { ModeProvider } from '../contexts/ModeContext'
import { ThemeProvider } from '../contexts/ThemeContext'

function AllProviders({ children }: { children: ReactNode }) {
  return (
    <ModeProvider>
      <ThemeProvider>
        <NavThemeProvider>
          {children}
        </NavThemeProvider>
      </ThemeProvider>
    </ModeProvider>
  )
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options })
}

export * from '@testing-library/react'
export { renderWithProviders as render }
