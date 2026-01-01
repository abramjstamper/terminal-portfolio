import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import { Experience } from './Experience'
import { siteData } from '../../config/data/site-data'

describe('Experience', () => {
  it('renders the section heading', () => {
    render(<Experience />)
    expect(screen.getByRole('heading', { name: /experience/i, level: 2 })).toBeInTheDocument()
  })

  it('renders all company names', () => {
    render(<Experience />)
    siteData.experience.forEach((exp) => {
      // Companies may appear multiple times (timeline + detail card)
      const elements = screen.getAllByText(exp.company)
      expect(elements.length).toBeGreaterThan(0)
    })
  })

  it('renders scroll buttons for desktop timeline', () => {
    render(<Experience />)
    expect(screen.getByRole('button', { name: /scroll left/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /scroll right/i })).toBeInTheDocument()
  })

  it('has correct section id for navigation', () => {
    render(<Experience />)
    const section = document.getElementById('experience')
    expect(section).toBeInTheDocument()
  })

  it('renders experience entries as interactive elements', () => {
    render(<Experience />)
    // Each experience entry should be clickable on mobile
    const buttons = screen.getAllByRole('button')
    // Should have scroll buttons + mobile accordion buttons
    expect(buttons.length).toBeGreaterThan(2)
  })
})
