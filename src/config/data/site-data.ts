import type { SiteContent } from '../content'

export const siteData: SiteContent = {
  name: 'Abram Stamper',
  title: 'Software Engineer',
  hostname: 'abramstamper.com',
  username: 'guest',

  about: {
    bio: `Software engineer with a passion for building reliable, scalable systems.
I enjoy solving complex problems and creating tools that make developers' lives easier.
When I'm not coding, you can find me exploring new technologies and contributing to open source.`,
    highlights: [
      'Full-stack development expertise',
      'Cloud infrastructure and DevOps',
      'Open source contributor',
    ],
  },

  experience: [
    {
      company: 'Example Corp',
      title: 'Senior Software Engineer',
      period: '2022 - Present',
      description: 'Leading development of core platform services.',
      highlights: [
        'Architected microservices handling 10M+ requests/day',
        'Reduced API latency by 40% through optimization',
        'Mentored team of 5 junior developers',
      ],
      technologies: ['Go', 'Kubernetes', 'AWS', 'PostgreSQL'],
    },
    {
      company: 'Startup Inc',
      title: 'Software Engineer',
      period: '2020 - 2022',
      description: 'Built features for the core product.',
      highlights: [
        'Developed real-time collaboration features',
        'Implemented CI/CD pipeline',
        'Improved test coverage from 40% to 85%',
      ],
      technologies: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
    },
    {
      company: 'Tech Company',
      title: 'Junior Developer',
      period: '2018 - 2020',
      description: 'Started career building web applications.',
      highlights: [
        'Built internal tools used by 200+ employees',
        'Contributed to open source projects',
        'Learned agile methodologies',
      ],
      technologies: ['Python', 'Django', 'JavaScript', 'PostgreSQL'],
    },
  ],

  skills: [
    {
      name: 'Languages',
      skills: ['TypeScript', 'Python', 'Go', 'Rust', 'SQL'],
    },
    {
      name: 'Frontend',
      skills: ['React', 'Vue.js', 'Tailwind CSS', 'Next.js'],
    },
    {
      name: 'Backend',
      skills: ['Node.js', 'FastAPI', 'GraphQL', 'REST APIs'],
    },
    {
      name: 'Infrastructure',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    },
    {
      name: 'Tools',
      skills: ['Git', 'Linux', 'Vim', 'CI/CD'],
    },
  ],

  projects: [
    {
      name: 'Terminal Portfolio',
      description: 'This interactive terminal-based portfolio website',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      github: 'https://github.com/yourusername/terminal-portfolio',
    },
    {
      name: 'Coming Soon',
      description: 'More projects to be added',
      technologies: [],
    },
  ],

  contact: {
    email: 'hello@abramstamper.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    website: 'https://abramstamper.com',
  },

  resume: {
    url: '/assets/resume.pdf',
    lastUpdated: '2024-01-15',
  },
}
