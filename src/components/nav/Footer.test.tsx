import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import { Footer } from './Footer'
import { siteData } from '../../config/data/site-data'

describe('Footer', () => {
  it('renders copyright with name', () => {
    render(<Footer />)
    expect(screen.getByText(new RegExp(siteData.name))).toBeInTheDocument()
  })

  it('renders switch to terminal button', () => {
    render(<Footer />)
    const switchButton = screen.getByRole('button', { name: /switch to terminal/i })
    expect(switchButton).toBeInTheDocument()
  })

  it('displays current year in copyright', () => {
    render(<Footer />)
    // Copyright should include 2026 based on the Footer component
    expect(screen.getByText(/© 2026/)).toBeInTheDocument()
  })
})
