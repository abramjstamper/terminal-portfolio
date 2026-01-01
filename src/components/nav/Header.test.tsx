import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import { Header } from './Header'
import { siteData } from '../../config/data/site-data'

describe('Header', () => {
  it('renders the site name', () => {
    render(<Header />)
    expect(screen.getByText(siteData.name)).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /experience/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /skills/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders dark mode toggle button', () => {
    render(<Header />)
    const toggleButtons = screen.getAllByRole('button', { name: /switch to (light|dark) mode/i })
    expect(toggleButtons.length).toBeGreaterThan(0)
  })

  it('renders terminal mode button', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: /terminal/i })).toBeInTheDocument()
  })

  it('renders mobile menu toggle', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument()
  })
})
