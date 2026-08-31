export interface PersonalInfo {
  name: string;
  displayName: string;
  tagline: string;
  bio: string;
  summary?: string;
  email: string;
  githubUrl: string;
  linkedinPlaceholder?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  location: string;
  status: string;
  profileImageUrl?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  qualification: string;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
  focusAreas?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  isPlaceholder?: boolean;
  placeholderMessage?: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  role: string;
  technologies: string[];
  keyFeatures: string[];
  screenshotPlaceholder?: string;
  screenshotUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  isPlaceholder?: boolean;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  dates: string;
  responsibilities: string[];
  skillsGained: string[];
  achievements: string[];
  location?: string;
  isPlaceholder?: boolean;
}

export interface CertificationItem {
  id: string;
  name: string;
  provider: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  focus?: string;
  skillsVerified?: string[];
  badgeType?: 'capaciti' | 'cct' | 'cisco' | 'google' | 'comptia' | 'matric' | 'general';
  issuerLogoPlaceholder?: string;
  isPlaceholder?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
