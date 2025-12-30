export interface Experience {
  company: string
  title: string
  period: string
  description: string
  highlights: string[]
  technologies: string[]
}

export interface Project {
  name: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
}

export interface SkillCategory {
  name: string
  skills: string[]
}

export interface ContactInfo {
  email: string
  github?: string
  linkedin?: string
  stackoverflow?: string
  website?: string
}

export interface Certification {
  name: string
  issuer: string
  description?: string
  year?: string
  url?: string
}

export interface SiteContent {
  name: string
  title: string
  hostname: string
  username: string
  about: {
    bio: string
    highlights: string[]
  }
  experience: Experience[]
  skills: SkillCategory[]
  projects: Project[]
  certifications: Certification[]
  contact: ContactInfo
  resume: {
    url: string
    lastUpdated: string
  }
}
