import type { SiteConfig } from '../content';

export const siteConfig: SiteConfig = {
  personal: {
    name: 'Abram Stamper',
    title: 'Sr Full Stack Software Engineer',
    tagline: 'Entrepreneurial-minded engineer solving tomorrow\'s challenges today',
    photo: {
      url: '/assets/professional-headshot.png',
      alt: 'Professional headshot of Abram Stamper',
    },
    location: 'Remote (Indiana)',
    bio: [
      'Entrepreneurial-minded full stack software engineer who employs inventive thinking to solve tomorrow\'s challenges today.',
      'A generalist by nature with production experience in a variety of domains: Advertising, Automotive, Cybersecurity, & IoT.',
      'Exhibits a passion for the craft of software development utilizing technical skills in Cloud PaaS/IaaS Components, Single Page Applications (SPA), REST APIs, and Databases.',
      'Operates as a force multiplier by elevating & assisting others to create a positive impact on overall team performance.',
      'Strong customer-centric problem-solving skills with seven years of product development experience.',
    ],
    interests: [
      'Developing people',
      'Creating innovative products',
      'Learning new things',
      'Entrepreneurship',
      'Design thinking',
    ],
  },

  experience: [
    {
      id: 'panw-principal',
      company: 'Palo Alto Networks',
      role: 'Principal Software Engineer',
      type: 'w2',
      period: {
        start: '2023-10',
        end: 'present',
      },
      displayPeriod: 'Oct 2023 - Present',
      location: 'Remote',
      description: [
        'Architected an internal data enrichment application',
        'Guided the development team through the project\'s milestones',
        'Wrote foundational components, performed code reviews, integrated customer feedback',
        'Aided project management breaking down epics into actionable tickets less experienced developers could execute with ease',
        'Continued ongoing development of new features and functionality',
      ],
      technologies: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Kubernetes', 'GCP'],
      accomplishments: [
        'Led architecture and development of internal data enrichment platform',
        'Mentored team members and improved development processes',
      ],
    },
    {
      id: 'panw-sr-staff',
      company: 'Palo Alto Networks',
      role: 'Sr Staff Software Engineer',
      type: 'w2',
      period: {
        start: '2022-05',
        end: '2023-10',
      },
      displayPeriod: 'May 2022 - Oct 2023',
      location: 'Remote',
      description: [
        'Contributed to a mature software application that provided a uniform query & dashboard tool used internally by Threat Researchers',
        'Crafted new features like universal data search to improve researcher productivity',
        'Upleveled the team\'s observability, alerting, and metrics tooling',
        'Supported core development on the team\'s tooling and libraries',
      ],
      technologies: ['Python', 'React', 'PostgreSQL', 'Redis', 'Kubernetes', 'GCP'],
      accomplishments: [
        'Built universal data search feature improving threat researcher productivity',
        'Enhanced observability and monitoring infrastructure',
      ],
    },
    {
      id: 'aptiv-architect',
      company: 'Aptiv Connected Services',
      role: 'Cloud Architect',
      type: 'w2',
      period: {
        start: '2021-04',
        end: '2022-05',
      },
      displayPeriod: 'Apr 2021 - May 2022',
      location: 'Remote',
      description: [
        'Responsible for architecting and engineering cloud abstraction layer between partner clouds and Aptiv\'s internal cloud platform',
        'Collaborated across 10 teams',
        'Completed numerous PoCs from initial design concept to production software release',
      ],
      technologies: ['Azure', 'AWS', 'NodeJS', 'PostgreSQL', 'Kubernetes'],
      accomplishments: [
        'Designed cloud abstraction layer enabling multi-cloud partner integrations',
        'Successfully delivered multiple proof-of-concepts to production',
      ],
    },
    {
      id: 'aptiv-advanced',
      company: 'Aptiv PLC',
      role: 'Advanced Software Engineer',
      type: 'w2',
      period: {
        start: '2018-05',
        end: '2021-03',
      },
      displayPeriod: 'May 2018 - Mar 2021',
      location: 'Kokomo, IN',
      description: [
        'Architected and designed the cloud components for a pre-production IoT software product',
        'Performed real-time ECU data acquisition and analysis from preproduction vehicles',
        'Worked in Active Safety and User Experience business lines',
        'Focused on product and concept development in advanced development/R&D',
      ],
      technologies: ['Azure', 'NodeJS', 'React', 'PostgreSQL', 'IoT'],
      accomplishments: [
        'Created architecture for cloud IoT software product',
        'Developed initial UX wireframes for internal tools',
      ],
      link: 'https://www.aptiv.com',
    },
    {
      id: 'vibenomics',
      company: 'Vibenomics',
      role: 'Full Stack Developer (Intern)',
      type: 'w2',
      period: {
        start: '2017-05',
        end: '2017-08',
      },
      displayPeriod: 'Summer 2017',
      location: 'Indianapolis, IN',
      description: [
        'Worked at a SaaS company providing music and voice-over advertisements for business airplay',
        'Designed and developed internal monitoring and diagnostic web applications from scratch',
        'Contributed to the product development team',
      ],
      technologies: ['AWS', 'DynamoDB', 'ReactJS', 'Serverless'],
      accomplishments: [
        'Built internal monitoring and diagnostic applications from the ground up',
      ],
    },
    {
      id: 'taylor-faraday',
      company: 'Taylor University',
      role: 'Back-End Developer',
      type: 'w2',
      period: {
        start: '2016-05',
        end: '2016-08',
      },
      displayPeriod: 'Summer 2016',
      location: 'Upland, IN',
      description: [
        'Worked on Faraday: Learning Management 2.0 project',
        'Collaborated with another student and two supervising professors',
        'Followed Agile software development methodology',
        'Goal: Bring learning management into modernity with ML/AI',
      ],
      technologies: ['PostgreSQL', 'NodeJS'],
      accomplishments: [
        'Contributed to next-generation learning management system prototype',
      ],
      link: 'https://github.com/faraday-effect/faraday',
    },
  ],

  timeline: [
    {
      id: 'panw-principal-start',
      date: '2023-10',
      displayDate: 'October 2023',
      title: 'Promoted to Principal Software Engineer',
      category: 'career',
      company: 'Palo Alto Networks',
      description: 'Took on architecture and team leadership responsibilities for internal data enrichment platform',
      icon: '🚀',
    },
    {
      id: 'panw-start',
      date: '2022-05',
      displayDate: 'May 2022',
      title: 'Joined Palo Alto Networks',
      category: 'career',
      company: 'Palo Alto Networks',
      description: 'Started as Sr Staff Software Engineer working on threat research tooling',
      icon: '🛡️',
    },
    {
      id: 'aptiv-architect',
      date: '2021-04',
      displayDate: 'April 2021',
      title: 'Promoted to Cloud Architect',
      category: 'career',
      company: 'Aptiv Connected Services',
      description: 'Led cloud abstraction layer architecture across multiple teams',
      icon: '☁️',
    },
    {
      id: 'aptiv-start',
      date: '2018-05',
      displayDate: 'May 2018',
      title: 'Started at Aptiv',
      category: 'career',
      company: 'Aptiv PLC',
      description: 'Began career as Advanced Software Engineer in automotive IoT',
      icon: '🚗',
    },
    {
      id: 'graduation',
      date: '2018-05',
      displayDate: 'May 2018',
      title: 'Graduated from Taylor University',
      category: 'education',
      company: 'Taylor University',
      description: 'BS in Computer Science with concentration in Software Engineering. Magna cum laude, GPA 3.8',
      icon: '🎓',
      link: 'https://cse.taylor.edu',
    },
  ],

  projects: [
    // TODO: Add personal projects
    // Example structure:
    // {
    //   id: 'project-1',
    //   name: 'Project Name',
    //   tagline: 'Short description',
    //   description: ['Detailed description paragraph 1', 'Paragraph 2'],
    //   tech: ['React', 'TypeScript', 'Node.js'],
    //   features: ['Feature 1', 'Feature 2'],
    //   github: 'https://github.com/abramjstamper/project',
    //   status: 'active',
    //   year: '2024',
    // },
  ],

  skills: {
    languages: {
      title: 'Languages',
      items: [
        { name: 'Python 3.10+', level: 'expert' },
        { name: 'TypeScript/JavaScript', level: 'expert' },
        { name: 'NodeJS/ES6+', level: 'expert' },
        { name: 'Java', level: 'proficient' },
        { name: 'SQL', level: 'expert' },
      ],
    },
    frameworks: {
      title: 'Frameworks',
      items: [
        { name: 'React/Redux', level: 'expert' },
        { name: 'FastAPI', level: 'expert' },
        { name: 'Flask', level: 'proficient' },
      ],
    },
    cloud: {
      title: 'Cloud & Infrastructure',
      items: [
        { name: 'Google Cloud Platform (GCP)', level: 'expert' },
        { name: 'Amazon Web Services (AWS)', level: 'proficient' },
        { name: 'Microsoft Azure', level: 'proficient' },
        { name: 'Kubernetes (K8s)', level: 'proficient' },
        { name: 'Distributed Systems', level: 'proficient' },
      ],
    },
    databases: {
      title: 'Databases',
      items: [
        { name: 'PostgreSQL', level: 'expert' },
        { name: 'MySQL', level: 'proficient' },
        { name: 'Redis', level: 'proficient' },
      ],
    },
    tools: {
      title: 'Tools & Practices',
      items: [
        { name: 'Git/GitHub', level: 'expert' },
        { name: 'Atlassian Tools (Jira, Confluence)', level: 'expert' },
        { name: 'Ubuntu/Linux', level: 'expert' },
        { name: 'Agile Software Development', level: 'expert' },
        { name: 'Technical Project Management', level: 'proficient' },
      ],
    },
    specialties: {
      title: 'Specialties',
      items: [
        { name: 'Cloud Architecture', level: 'expert' },
        { name: 'REST APIs', level: 'expert' },
        { name: 'Single Page Applications', level: 'expert' },
        { name: 'IoT Systems', level: 'proficient' },
        { name: 'Cybersecurity Tooling', level: 'proficient' },
      ],
    },
  },

  resume: {
    pdfUrl: '/assets/resume.pdf',
    lastUpdated: '2024-12',
    filename: 'Abram_Stamper_Resume.pdf',
  },

  social: {
    email: 'abram.j.stamper@me.com',
    github: 'https://github.com/abramjstamper',
    linkedin: 'https://www.linkedin.com/in/abramstamper/',
    stackOverflow: 'https://stackexchange.com/users/2158482/abram-stamper',
  },

  seo: {
    title: 'Abram Stamper - Sr Full Stack Software Engineer',
    description: 'Principal Software Engineer at Palo Alto Networks. Full stack developer with expertise in Python, React, cloud architecture, and distributed systems. Experience in Cybersecurity, Automotive, IoT, and Advertising domains.',
    keywords: [
      'Abram Stamper',
      'Software Engineer',
      'Full Stack Developer',
      'Principal Engineer',
      'Palo Alto Networks',
      'Python',
      'React',
      'Cloud Architecture',
      'Kubernetes',
      'GCP',
      'AWS',
      'Cybersecurity',
    ],
    ogImage: '/assets/og-image.jpg',
    canonicalUrl: 'https://abramstamper.com',
  },

  features: {
    showTimeline: true,
    showProjects: true,
    showBlog: false,
    showSMBLink: false,
    enableAnalytics: true,
  },
};
