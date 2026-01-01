import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import { About } from './About'
import { siteData } from '../../config/data/site-data'

describe('About', () => {
  it('renders the section heading', () => {
    render(<About />)
    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
  })

  it('renders the bio text', () => {
    render(<About />)
    // Check first paragraph of bio is rendered
    const firstParagraph = siteData.about.bio.split('\n')[0]
    expect(screen.getByText(firstParagraph)).toBeInTheDocument()
  })

  it('renders all highlights', () => {
    render(<About />)
    siteData.about.highlights.forEach((highlight) => {
      expect(screen.getByText(highlight)).toBeInTheDocument()
    })
  })

  it('has correct section id for navigation', () => {
    render(<About />)
    const section = document.getElementById('about')
    expect(section).toBeInTheDocument()
  })
})
