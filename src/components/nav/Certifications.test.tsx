import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import { Certifications } from './Certifications'
import { siteData } from '../../config/data/site-data'

describe('Certifications', () => {
  it('renders the section heading', () => {
    render(<Certifications />)
    expect(screen.getByRole('heading', { name: /certifications & patents/i })).toBeInTheDocument()
  })

  it('renders all certification names', () => {
    render(<Certifications />)
    siteData.certifications.forEach((cert) => {
      expect(screen.getByText(cert.name)).toBeInTheDocument()
    })
  })

  it('renders certification issuers', () => {
    render(<Certifications />)
    // Use getAllByText since some issuers (e.g., Microsoft) appear multiple times
    const uniqueIssuers = [...new Set(siteData.certifications.map((cert) => cert.issuer))]
    uniqueIssuers.forEach((issuer) => {
      const elements = screen.getAllByText(issuer)
      expect(elements.length).toBeGreaterThan(0)
    })
  })

  it('renders view links for certifications with URLs', () => {
    render(<Certifications />)
    const certsWithUrls = siteData.certifications.filter((cert) => cert.url)
    const viewLinks = screen.getAllByRole('link', { name: /view/i })
    expect(viewLinks.length).toBe(certsWithUrls.length)
  })

  it('has correct section id for navigation', () => {
    render(<Certifications />)
    const section = document.getElementById('certifications')
    expect(section).toBeInTheDocument()
  })
})
