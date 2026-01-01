import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import { Hero } from './Hero'
import { siteData } from '../../config/data/site-data'

describe('Hero', () => {
  it('renders the name', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { name: siteData.name })).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(<Hero />)
    expect(screen.getByText(siteData.title)).toBeInTheDocument()
  })

  it('renders the resume link', () => {
    render(<Hero />)
    const resumeLink = screen.getByRole('link', { name: /view resume/i })
    expect(resumeLink).toHaveAttribute('href', siteData.resume.url)
    expect(resumeLink).toHaveAttribute('download')
  })

  it('renders the contact link', () => {
    render(<Hero />)
    const contactLink = screen.getByRole('link', { name: /contact me/i })
    expect(contactLink).toHaveAttribute('href', '#contact')
  })

  it('renders scroll indicator link to about section', () => {
    render(<Hero />)
    const scrollLink = screen.getByRole('link', { name: '' })
    // The bounce arrow links to #about
    const aboutLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('href') === '#about'
    )
    expect(aboutLinks.length).toBeGreaterThan(0)
  })
})
