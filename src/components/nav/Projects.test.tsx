import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import { Projects } from './Projects'
import { siteData } from '../../config/data/site-data'

describe('Projects', () => {
  it('renders the section heading', () => {
    render(<Projects />)
    expect(screen.getByRole('heading', { name: /projects/i, level: 2 })).toBeInTheDocument()
  })

  it('renders all project names', () => {
    render(<Projects />)
    siteData.projects.forEach((project) => {
      expect(screen.getByText(project.name)).toBeInTheDocument()
    })
  })

  it('renders project descriptions', () => {
    render(<Projects />)
    siteData.projects.forEach((project) => {
      expect(screen.getByText(project.description)).toBeInTheDocument()
    })
  })

  it('renders GitHub links for projects with github URLs', () => {
    render(<Projects />)
    const projectsWithGithub = siteData.projects.filter((p) => p.github)
    if (projectsWithGithub.length > 0) {
      const githubLinks = screen.getAllByRole('link', { name: /github/i })
      expect(githubLinks.length).toBe(projectsWithGithub.length)
    }
  })

  it('renders technologies for each project', () => {
    render(<Projects />)
    siteData.projects.forEach((project) => {
      project.technologies.forEach((tech) => {
        expect(screen.getByText(tech)).toBeInTheDocument()
      })
    })
  })

  it('has correct section id for navigation', () => {
    render(<Projects />)
    const section = document.getElementById('projects')
    expect(section).toBeInTheDocument()
  })
})
