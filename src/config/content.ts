// Type definitions for site configuration

export interface SiteConfig {
  personal: PersonalInfo;
  experience: Experience[];
  timeline: TimelineNode[];
  projects: Project[];
  skills: SkillsConfig;
  resume: ResumeConfig;
  social: SocialLinks;
  seo: SEOConfig;
  features: FeatureFlags;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  photo: {
    url: string;
    alt: string;
  };
  location?: string;
  bio: string[];
  interests: string[];
  pronouns?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: 'w2' | 'contract' | 'smb';
  period: {
    start: string; // YYYY-MM format
    end: string | 'present';
  };
  displayPeriod: string;
  location?: string;
  description: string[];
  technologies: string[];
  accomplishments: string[];
  link?: string;
  hidden?: boolean;
}

export interface TimelineNode {
  id: string;
  date: string; // YYYY-MM format
  displayDate: string;
  title: string;
  category: 'career' | 'education' | 'achievement' | 'certification';
  company?: string;
  description: string;
  icon?: string;
  link?: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string[];
  tech: string[];
  features?: string[];
  link?: string;
  github?: string;
  image?: string;
  status: 'active' | 'archived' | 'in-progress';
  year: string;
  hidden?: boolean;
}

export interface SkillsConfig {
  languages: SkillCategory;
  frameworks: SkillCategory;
  cloud: SkillCategory;
  databases: SkillCategory;
  tools: SkillCategory;
  specialties: SkillCategory;
}

export interface SkillCategory {
  title: string;
  items: Skill[];
}

export interface Skill {
  name: string;
  level?: 'expert' | 'proficient' | 'familiar';
  years?: number;
  icon?: string;
}

export interface ResumeConfig {
  pdfUrl: string;
  lastUpdated: string;
  filename: string;
  versions?: {
    [key: string]: string;
  };
}

export interface SocialLinks {
  email: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  stackOverflow?: string;
  portfolio?: string;
  other?: {
    name: string;
    url: string;
    icon?: string;
  }[];
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  twitterHandle?: string;
  canonicalUrl: string;
}

export interface FeatureFlags {
  showTimeline: boolean;
  showProjects: boolean;
  showBlog: boolean;
  showSMBLink: boolean;
  enableAnalytics: boolean;
}
