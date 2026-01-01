import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import { Skills } from './Skills'
import { siteData } from '../../config/data/site-data'

describe('Skills', () => {
  it('renders the section heading', () => {
    render(<Skills />)
    expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument()
  })

  it('renders all skill category names', () => {
    render(<Skills />)
    siteData.skills.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument()
    })
  })

  it('renders skills within each category', () => {
    render(<Skills />)
    siteData.skills.forEach((category) => {
      category.skills.forEach((skill) => {
        expect(screen.getByText(skill)).toBeInTheDocument()
      })
    })
  })

  it('has correct section id for navigation', () => {
    render(<Skills />)
    const section = document.getElementById('skills')
    expect(section).toBeInTheDocument()
  })

  it('renders correct number of skill categories', () => {
    render(<Skills />)
    const categoryHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(categoryHeadings).toHaveLength(siteData.skills.length)
  })
})
