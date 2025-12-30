import type { SiteContent } from '../content'

export const siteData: SiteContent = {
  name: 'Abram Stamper',
  title: 'Sr Full Stack Software Engineer',
  hostname: 'abramstamper.com',
  username: 'guest',

  about: {
    bio: `Entrepreneurial-minded full stack software engineer who employs inventive thinking to solve tomorrow's challenges today.

A generalist by nature with production experience in a variety of domains: Advertising, Automotive, Cybersecurity, & IoT. I exhibit a passion for the craft of software development utilizing technical skills in Cloud PaaS/IaaS Components, Single Page Applications (SPA), REST APIs, and Databases.

I operate as a force multiplier by elevating & assisting others to create a positive impact on overall team performance. Strong customer-centric problem-solving skills with seven years of product development experience.`,
    highlights: [
      'Full-stack development across cloud, backend, and frontend',
      'Patent holder: Electronic Device Intrusion Detection (US11341238B2)',
      'Experience across Cybersecurity, Automotive, Advertising & IoT',
    ],
  },

  experience: [
    {
      company: 'Palo Alto Networks',
      title: 'Principal Software Engineer',
      period: 'Oct 2023 - Present',
      description: 'Leading development of internal data enrichment applications for cybersecurity threat research.',
      highlights: [
        'Architected an internal data enrichment application from the ground up',
        'Guided the development team through project milestones and code reviews',
        'Broke down epics into actionable tickets for less experienced developers',
        'Integrated customer feedback to continuously improve the product',
      ],
      technologies: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Kubernetes', 'GCP'],
    },
    {
      company: 'Palo Alto Networks',
      title: 'Sr Staff Software Engineer',
      period: 'May 2022 - Oct 2023',
      description: 'Contributed to threat research tooling used internally by security researchers.',
      highlights: [
        'Built uniform query & dashboard tool for Threat Researchers',
        'Crafted universal data search to improve researcher productivity',
        'Upleveled team observability, alerting, and metrics tooling',
        'Supported core development on internal tooling and libraries',
      ],
      technologies: ['Python', 'React', 'Redis', 'PostgreSQL', 'Kubernetes'],
    },
    {
      company: 'Aptiv Connected Services',
      title: 'Cloud Architect',
      period: 'Apr 2021 - May 2022',
      description: 'Designed cloud abstraction layers for automotive IoT platform.',
      highlights: [
        'Architected cloud abstraction layer between partner clouds and internal platform',
        'Collaborated across 10 teams to deliver integrated solutions',
        'Completed numerous PoCs from design concept to production release',
      ],
      technologies: ['Azure', 'AWS', 'Kubernetes', 'Python', 'NodeJS'],
    },
    {
      company: 'Aptiv PLC',
      title: 'Advanced Software Engineer',
      period: 'May 2018 - Mar 2021',
      description: 'Built cloud IoT products for automotive data acquisition and analysis.',
      highlights: [
        'Architected cloud components for pre-production IoT software product',
        'Designed real-time ECU data acquisition and analysis systems',
        'Developed initial UX wireframes and product architecture',
        'Awarded patent for Electronic Device Intrusion Detection',
      ],
      technologies: ['Azure', 'PostgreSQL', 'NodeJS', 'React', 'Python'],
    },
  ],

  skills: [
    {
      name: 'Languages',
      skills: ['Python 3.10+', 'TypeScript', 'JavaScript/ES6+', 'Java', 'SQL'],
    },
    {
      name: 'Backend',
      skills: ['FastAPI', 'Flask', 'NodeJS', 'REST APIs', 'Redis'],
    },
    {
      name: 'Frontend',
      skills: ['React', 'Redux', 'HTML/CSS', 'Tailwind CSS'],
    },
    {
      name: 'Databases',
      skills: ['PostgreSQL', 'MySQL', 'Redis', 'DynamoDB'],
    },
    {
      name: 'Cloud & Infrastructure',
      skills: ['AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker'],
    },
    {
      name: 'Tools & Practices',
      skills: ['Git/GitHub', 'Agile/Scrum', 'Jira', 'Linux', 'CI/CD'],
    },
  ],

  projects: [
    {
      name: 'Terminal Portfolio',
      description: 'This interactive terminal-based portfolio website with dual terminal/nav modes',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      github: 'https://github.com/abramjstamper/personal-site-v2',
    },
    {
      name: 'Electronic Device Intrusion Detection',
      description: 'Patented system for detecting intrusions in electronic devices (US11341238B2)',
      technologies: ['IoT', 'Security', 'Embedded Systems'],
    },
  ],

  contact: {
    email: 'abram.j.stamper@me.com',
    github: 'https://github.com/abramjstamper',
    linkedin: 'https://linkedin.com/in/abramstamper',
    website: 'https://abramstamper.com',
  },

  resume: {
    url: '/assets/resume.pdf',
    lastUpdated: '2024',
  },
}
