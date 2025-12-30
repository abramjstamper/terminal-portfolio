import type { SiteContent } from '../content'

export const siteData: SiteContent = {
  name: 'Abram Stamper',
  title: 'Principal Full Stack Engineer',
  hostname: 'abramstamper.dev',
  username: 'guest',

  about: {
    bio: `Entrepreneurial-minded full stack software engineer who employs inventive thinking to solve tomorrow's challenges today.

A generalist by nature with production experience in a variety of domains: Advertising, Automotive, Cybersecurity, & IoT. I exhibit a passion for the craft of software development utilizing technical skills in Cloud PaaS/IaaS Components, Single Page Applications (SPA), REST APIs, and Databases.

I operate as a force multiplier by elevating & assisting others to create a positive impact on overall team performance. Strong customer-centric problem-solving skills with over a decade of product development experience.`,
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
    {
      company: 'Vibenomics (Fuzic Media)',
      title: 'Software Engineering Intern',
      period: 'Summer 2017',
      description: 'Developed internal tools for managing IoT audio devices deployed in retail locations.',
      highlights: [
        'Built React dashboard for customer success team to manage field devices',
        'Developed device and song history tracking for auditing and royalty reporting',
        'Contributed to Android application for in-store audio management',
        'Implemented serverless backend with AWS Lambda and DynamoDB',
      ],
      technologies: ['React', 'AWS Lambda', 'DynamoDB', 'Android', 'JavaScript'],
    },
    {
      company: 'Taylor University',
      title: 'Pro Bono Software Developer',
      period: '2015 - 2016',
      description: 'Unpaid 20 hrs/week position developing web applications for non-profits as part of Software Engineering concentration curriculum.',
      highlights: [
        'Collaborated with senior developers on production applications',
        'Built full-stack web apps pro bono for NGOs and non-profits',
        'Gained hands-on experience that accelerated early career growth',
      ],
      technologies: ['AngularJS', 'Angular 2', 'Python', 'Django', 'Jasmine'],
    },
  ],

  skills: [
    {
      name: 'AI & Automation',
      skills: ['Claude Code', 'MCP Servers', 'Cursor', 'GitHub Copilot', 'Prompt Engineering'],
    },
    {
      name: 'Languages',
      skills: ['Python 3.10+', 'TypeScript', 'JavaScript/ES6+', 'Java', 'SQL', 'Ruby'],
    },
    {
      name: 'Backend',
      skills: ['FastAPI', 'Flask', 'NodeJS', 'HapiJS', 'Ruby on Rails', 'REST APIs'],
    },
    {
      name: 'Frontend',
      skills: ['React', 'Redux', 'HTML/CSS', 'Tailwind CSS', 'MUI', 'Bootstrap', 'Bulma'],
    },
    {
      name: 'Databases',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'DynamoDB', 'Elasticsearch', 'SQLite'],
    },
    {
      name: 'Cloud Platforms',
      skills: ['AWS', 'GCP', 'Azure', 'Digital Ocean', 'Firebase'],
    },
    {
      name: 'Infrastructure',
      skills: ['Kubernetes', 'Helm', 'Docker', 'CI/CD', 'systemd'],
    },
    {
      name: 'Tools',
      skills: ['Git/GitHub', 'VS Code', 'Bash', 'Linux/Ubuntu', 'Jira'],
    },
    {
      name: 'Design',
      skills: ['Figma', 'Sketch', 'Adobe Photoshop', 'Adobe Illustrator', 'Final Cut Pro'],
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

  certifications: [
    {
      name: 'Electronic Device Intrusion Detection',
      issuer: 'US Patent (US11341238B2)',
      description: 'Method for detecting hacking of electronic devices by monitoring software activity values against expected thresholds and initiating security actions when anomalies are detected.',
      year: '2021',
      url: 'https://patents.google.com/patent/US11341238B2',
    },
    {
      name: 'Azure Solutions Architect (AZ-305)',
      issuer: 'Microsoft',
      description: 'Designing infrastructure, data storage, security, and business continuity solutions on Microsoft Azure.',
      year: '2020',
      url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/',
    },
    {
      name: 'Azure Fundamentals (AZ-900)',
      issuer: 'Microsoft',
      description: 'Foundational knowledge of cloud concepts, Azure services, security, privacy, and pricing.',
      year: '2020',
      url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/',
    },
    {
      name: 'Introduction to Linux (LFS101)',
      issuer: 'The Linux Foundation',
      description: 'Linux system administration fundamentals including command line, file management, and shell scripting.',
      year: '2021',
      url: 'https://training.linuxfoundation.org/training/introduction-to-linux/',
    },
    {
      name: 'Design Thinking',
      issuer: 'SmallBox (Indianapolis, IN)',
      description: 'Human-centered design methodology for creative problem solving and innovation.',
      year: '2018',
    },
    {
      name: 'Certified Secure Developer',
      issuer: 'Security Journey (HackEDU)',
      description: 'Training and certification in secure software development practices and vulnerability prevention.',
      year: '2021',
      url: 'https://www.securityjourney.com/secure-development-training',
    },
  ],

  contact: {
    email: 'abram.j.stamper@me.com',
    github: 'https://github.com/abramjstamper',
    linkedin: 'https://linkedin.com/in/abramstamper',
    stackoverflow: 'https://stackexchange.com/users/2158482/abram-stamper',
    website: 'https://abramstamper.dev',
  },

  resume: {
    url: '/assets/resume.pdf',
    lastUpdated: '2026',
  },
}
