import { describe, it, expect } from 'vitest'
import { siteData } from './site-data'

describe('siteData', () => {
  describe('required fields', () => {
    it('has a name', () => {
      expect(siteData.name).toBeDefined()
      expect(siteData.name.length).toBeGreaterThan(0)
    })

    it('has a title', () => {
      expect(siteData.title).toBeDefined()
      expect(siteData.title.length).toBeGreaterThan(0)
    })

    it('has a hostname', () => {
      expect(siteData.hostname).toBeDefined()
      expect(siteData.hostname).toMatch(/^[a-z0-9.-]+$/)
    })

    it('has a username', () => {
      expect(siteData.username).toBeDefined()
    })
  })

  describe('about section', () => {
    it('has a bio', () => {
      expect(siteData.about.bio).toBeDefined()
      expect(siteData.about.bio.length).toBeGreaterThan(50)
    })

    it('has highlights array', () => {
      expect(Array.isArray(siteData.about.highlights)).toBe(true)
      expect(siteData.about.highlights.length).toBeGreaterThan(0)
    })

    it('highlights are non-empty strings', () => {
      siteData.about.highlights.forEach((highlight) => {
        expect(typeof highlight).toBe('string')
        expect(highlight.length).toBeGreaterThan(0)
      })
    })
  })

  describe('experience section', () => {
    it('has at least one experience entry', () => {
      expect(siteData.experience.length).toBeGreaterThan(0)
    })

    it('each experience has required fields', () => {
      siteData.experience.forEach((exp, index) => {
        expect(exp.company, `experience[${index}].company`).toBeDefined()
        expect(exp.title, `experience[${index}].title`).toBeDefined()
        expect(exp.period, `experience[${index}].period`).toBeDefined()
        expect(exp.description, `experience[${index}].description`).toBeDefined()
      })
    })

    it('each experience has highlights array', () => {
      siteData.experience.forEach((exp, index) => {
        expect(Array.isArray(exp.highlights), `experience[${index}].highlights`).toBe(true)
      })
    })

    it('each experience has technologies array', () => {
      siteData.experience.forEach((exp, index) => {
        expect(Array.isArray(exp.technologies), `experience[${index}].technologies`).toBe(true)
        expect(exp.technologies.length, `experience[${index}].technologies`).toBeGreaterThan(0)
      })
    })
  })

  describe('skills section', () => {
    it('has skill categories', () => {
      expect(siteData.skills.length).toBeGreaterThan(0)
    })

    it('each category has a name and skills', () => {
      siteData.skills.forEach((category, index) => {
        expect(category.name, `skills[${index}].name`).toBeDefined()
        expect(Array.isArray(category.skills), `skills[${index}].skills`).toBe(true)
        expect(category.skills.length, `skills[${index}].skills`).toBeGreaterThan(0)
      })
    })

    it('skills are unique within each category', () => {
      siteData.skills.forEach((category) => {
        const uniqueSkills = new Set(category.skills)
        expect(uniqueSkills.size).toBe(category.skills.length)
      })
    })
  })

  describe('projects section', () => {
    it('each project has required fields', () => {
      siteData.projects.forEach((project, index) => {
        expect(project.name, `projects[${index}].name`).toBeDefined()
        expect(project.description, `projects[${index}].description`).toBeDefined()
        expect(Array.isArray(project.technologies), `projects[${index}].technologies`).toBe(true)
      })
    })

    it('github URLs are valid when present', () => {
      siteData.projects.forEach((project) => {
        if (project.github) {
          expect(project.github).toMatch(/^https:\/\/github\.com\//)
        }
      })
    })
  })

  describe('certifications section', () => {
    it('each certification has required fields', () => {
      siteData.certifications.forEach((cert, index) => {
        expect(cert.name, `certifications[${index}].name`).toBeDefined()
        expect(cert.issuer, `certifications[${index}].issuer`).toBeDefined()
      })
    })

    it('certification URLs are valid when present', () => {
      siteData.certifications.forEach((cert) => {
        if (cert.url) {
          expect(cert.url).toMatch(/^https?:\/\//)
        }
      })
    })
  })

  describe('contact section', () => {
    it('has a valid email', () => {
      expect(siteData.contact.email).toBeDefined()
      expect(siteData.contact.email).toMatch(/@/)
    })

    it('has github URL', () => {
      expect(siteData.contact.github).toMatch(/^https:\/\/github\.com\//)
    })

    it('has linkedin URL', () => {
      expect(siteData.contact.linkedin).toMatch(/^https:\/\/linkedin\.com\//)
    })

    it('URLs are valid when present', () => {
      const { github, linkedin, stackoverflow, website } = siteData.contact
      if (github) expect(github).toMatch(/^https?:\/\//)
      if (linkedin) expect(linkedin).toMatch(/^https?:\/\//)
      if (stackoverflow) expect(stackoverflow).toMatch(/^https?:\/\//)
      if (website) expect(website).toMatch(/^https?:\/\//)
    })
  })

  describe('resume section', () => {
    it('has a URL', () => {
      expect(siteData.resume.url).toBeDefined()
      expect(siteData.resume.url.length).toBeGreaterThan(0)
    })

    it('has lastUpdated', () => {
      expect(siteData.resume.lastUpdated).toBeDefined()
    })
  })

  describe('heroTypingPhrases', () => {
    it('has phrases', () => {
      expect(siteData.heroTypingPhrases.length).toBeGreaterThan(0)
    })

    it('phrases are non-empty strings', () => {
      siteData.heroTypingPhrases.forEach((phrase) => {
        expect(typeof phrase).toBe('string')
        expect(phrase.length).toBeGreaterThan(0)
      })
    })
  })
})
