import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import { Contact } from './Contact'
import { siteData } from '../../config/data/site-data'

describe('Contact', () => {
  it('renders the section heading', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { name: /get in touch/i })).toBeInTheDocument()
  })

  it('renders email link with correct href', () => {
    render(<Contact />)
    const emailLink = screen.getByRole('link', { name: /email me/i })
    expect(emailLink).toHaveAttribute('href', `mailto:${siteData.contact.email}`)
  })

  it('renders GitHub link when provided', () => {
    render(<Contact />)
    if (siteData.contact.github) {
      const githubLink = screen.getByRole('link', { name: /github/i })
      expect(githubLink).toHaveAttribute('href', siteData.contact.github)
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('renders LinkedIn link when provided', () => {
    render(<Contact />)
    if (siteData.contact.linkedin) {
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
      expect(linkedinLink).toHaveAttribute('href', siteData.contact.linkedin)
      expect(linkedinLink).toHaveAttribute('target', '_blank')
    }
  })

  it('renders Stack Overflow link when provided', () => {
    render(<Contact />)
    if (siteData.contact.stackoverflow) {
      const stackLink = screen.getByRole('link', { name: /stack overflow/i })
      expect(stackLink).toHaveAttribute('href', siteData.contact.stackoverflow)
      expect(stackLink).toHaveAttribute('target', '_blank')
    }
  })

  it('has correct section id for navigation', () => {
    render(<Contact />)
    const section = document.getElementById('contact')
    expect(section).toBeInTheDocument()
  })
})
