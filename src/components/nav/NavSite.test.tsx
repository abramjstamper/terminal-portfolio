import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import { NavSite } from './NavSite'

describe('NavSite', () => {
  it('renders the header', () => {
    render(<NavSite />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders the main content area', () => {
    render(<NavSite />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders all main sections', () => {
    render(<NavSite />)
    expect(document.getElementById('about')).toBeInTheDocument()
    expect(document.getElementById('experience')).toBeInTheDocument()
    expect(document.getElementById('skills')).toBeInTheDocument()
    expect(document.getElementById('certifications')).toBeInTheDocument()
    expect(document.getElementById('contact')).toBeInTheDocument()
  })

  it('renders the footer with switch to terminal button', () => {
    render(<NavSite />)
    expect(screen.getByRole('button', { name: /switch to terminal/i })).toBeInTheDocument()
  })
})
