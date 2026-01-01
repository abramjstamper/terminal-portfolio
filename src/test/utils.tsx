import { ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { NavThemeProvider } from '../contexts/NavThemeContext'
import { ModeProvider } from '../contexts/ModeContext'

function AllProviders({ children }: { children: ReactNode }) {
  return (
    <ModeProvider>
      <NavThemeProvider>
        {children}
      </NavThemeProvider>
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
