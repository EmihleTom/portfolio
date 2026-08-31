import {
  PersonalInfo,
  EducationItem,
  SkillCategory,
  ProjectItem,
  ExperienceItem,
  CertificationItem,
} from '../types';

/**
 * =========================================================================
 * EMIHLE TOM - PORTFOLIO DATA CONFIGURATION
 * =========================================================================
 * This file is designed for seamless future updates as you acquire new
 * skills, build projects, gain work experience, and earn certifications.
 */

export const personalInfo: PersonalInfo = {
  name: 'Emihle Liyema Tom',
  displayName: 'Emihle Tom',
  tagline: 'Cisco IT Specialist | Hardware & Systems | Web Development',
  summary:
    'Cisco IT Specialist, CAPACITI IT Support Technician candidate, and College of Cape Town graduate based in Western Cape, Cape Town. Specializing in hardware diagnostics, network troubleshooting, helpdesk support, and modern web development.',
  bio: `I am a Cisco IT Specialist, CAPACITI IT Support Technician candidate, and College of Cape Town graduate based in Western Cape, Cape Town, South Africa. My technical foundation was built through rigorous education at the College of Cape Town, intensive professional IT support development with CAPACITI, and ongoing systems engineering projects.

My expertise covers end-user desktop support, Active Directory user management, hardware diagnostics, network infrastructure fundamentals, and systematic troubleshooting. Alongside infrastructure and support, I actively build software and modern web applications using JavaScript, Python, React, and database systems.

I bring a proactive problem-solving mindset, disciplined technical communication, and a strong work ethic. I am dedicated to maintaining high system uptime, delivering reliable IT operations, and continuously expanding my developer and systems engineering capabilities.`,
  email: 'emihletom07@gmail.com',
  githubUrl: 'https://github.com/EmihleTom',
  linkedinUrl: 'https://linkedin.com/in/emihle-tom',
  location: 'Western Cape, Cape Town',
  status: 'Available for Opportunities',
  profileImageUrl: '',
};

export const educationList: EducationItem[] = [
  {
    id: 'capaciti-it-support-2026',
    institution: 'CAPACITI',
    qualification: 'IT Support Technician Certification',
    startDate: '2026',
    endDate: 'Present',
    status: 'In Progress',
    description:
      'Specialized IT support immersion covering technical support, system maintenance, hardware repair, enterprise troubleshooting, and professional IT work readiness.',
    focusAreas: [
      'Technical Support & Helpdesk Operations',
      'System Maintenance & Hardware Diagnostics',
      'Active Directory & User Access Management',
      'Troubleshooting & Issue Resolution',
    ],
  },
  {
    id: 'cct-cisco-it-specialist-2025',
    institution: 'College of Cape Town',
    qualification: 'Cisco IT Specialist (CCNA)',
    startDate: '2025',
    endDate: '2025',
    status: 'Completed',
    description:
      'Specialized enterprise networking and systems qualification focused on Cisco Certified Network Associate (CCNA) curricula — routing, switching, IPv4/IPv6 subnetting, Packet Tracer topologies, network security, and infrastructure diagnostics.',
    focusAreas: [
      'CCNA Routing & Switching Architecture',
      'IP Addressing, IPv4/IPv6 Subnetting & VLSM',
      'Cisco Packet Tracer Network Simulations',
      'VLANs, Trunks, STP & Router Configuration',
      'Network Security, Firewalls & Troubleshooting',
      'Hardware Diagnostics & System Infrastructure',
    ],
  },
  {
    id: 'matric-nsc-2024',
    institution: 'Department of Basic Education',
    qualification: 'Matric (National Senior Certificate)',
    startDate: '2024',
    endDate: '2024',
    status: 'Completed',
    description:
      'Completed National Senior Certificate (Grade 12 Matric) in 2024 with foundational excellence in mathematics, analytical thinking, English communication, and computer literacy.',
    focusAreas: [
      'Mathematical Foundations',
      'Analytical Thinking & Problem Solving',
      'English Communication',
      'Computer Applications & Digital Literacy',
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming-languages',
    name: 'Programming Languages',
    description: 'Core syntax, object-oriented principles, and algorithmic problem solving.',
    skills: ['Python', 'JavaScript', 'Bash / Shell Scripting'],
  },
  {
    id: 'web-technologies',
    name: 'Web Technologies',
    description: 'Frontend frameworks, responsive interfaces, and modern web protocols.',
    skills: ['HTML5', 'CSS3', 'React', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    id: 'databases',
    name: 'Databases',
    description: 'Relational data modeling, querying, and persistent cloud storage.',
    skills: ['SQL Basics', 'Relational Databases', 'Data Modeling'],
  },
  {
    id: 'ai-technology',
    name: 'AI & Technology',
    description: 'Applied machine learning, AI model tooling, and emerging innovations.',
    skills: ['Prompt Engineering', 'AI Coding Assistants', 'Modern Tech Tooling'],
  },
  {
    id: 'it-support',
    name: 'IT & Technical Support',
    description: 'Infrastructure diagnostics, hardware repair, system maintenance, and active directory.',
    skills: [
      'Technical Support',
      'System Maintenance',
      'Troubleshooting',
      'Active Directory',
      'Hardware Repair',
      'Helpdesk Support',
      'Cisco Networking',
      'TCP/IP & Subnetting',
    ],
  },
  {
    id: 'software-tools',
    name: 'Software & Tools',
    description: 'Version control, terminal environments, IDEs, and developer workflows.',
    skills: ['Git', 'GitHub', 'VS Code', 'Cisco Packet Tracer', 'Terminal / CLI'],
  },
];

export const projectsList: ProjectItem[] = [
  {
    id: 'ai-productivity-assistant',
    name: 'AI Workplace Productivity Assistant',
    role: 'Full-Stack Developer & AI Integrator',
    description:
      'A modern, responsive web application designed to help professionals automate repetitive workplace tasks using Artificial Intelligence. Provides AI-powered tools for intelligent multi-tone email drafting, meeting notes summarization with action-item extraction, Eisenhower Matrix task scheduling, and an interactive context-aware assistant.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Vite', 'TanStack Router', 'Radix UI'],
    keyFeatures: [
      'Smart Email Generator supporting multiple professional tones (Formal, Friendly, Persuasive, Professional)',
      'Meeting Notes Summarizer with executive takeaways, action items, and decision tracking',
      'AI Task Planner with Eisenhower Matrix categorization, priority scheduling, and time optimization',
      'AI Research Assistant transforming long-form technical reports into concise, actionable insights',
      'Interactive AI Chatbot with context-aware responses, suggested prompts, and productivity templates',
    ],
    githubUrl: 'https://github.com/EmihleTom/AI-Productivity-Assistant',
    isPlaceholder: false,
  },
];

export const experienceList: ExperienceItem[] = [
  {
    id: 'capaciti-it-support-technician',
    organization: 'CAPACITI',
    role: 'Information Technology Support Technician',
    dates: '2025 – Present',
    location: 'Western Cape, Cape Town',
    responsibilities: [
      'Provide hands-on technical support and system maintenance for workstations, laptops, and peripheral hardware',
      'Diagnose and troubleshoot hardware faults, operating system errors, and local network connectivity issues',
      'Manage user accounts, group policies, and identity access using Active Directory and modern IT tools',
      'Log, escalate, and resolve technical support tickets systematically to maintain high operational uptime',
    ],
    skillsGained: [
      'Technical Support',
      'System Maintenance',
      'Hardware Diagnostics',
      'Active Directory',
      'Network Troubleshooting',
      'Helpdesk Operations',
    ],
    achievements: [
      'Appointed as Information Technology Support Technician at CAPACITI',
      'Maintained consistent issue resolution rates across hardware, software, and network support inquiries',
    ],
  },
];

export const certificationsList: CertificationItem[] = [
  {
    id: 'cert-capaciti-it-support',
    name: 'IT Support Technician Certification',
    provider: 'CAPACITI',
    focus: 'Technical Support, System Maintenance, Troubleshooting & Helpdesk Operations',
    date: '2026 – Present',
    credentialId: 'CAP-IT-2026-884',
    credentialUrl: 'https://capaciti.org.za/verify/CAP-IT-2026-884',
    badgeType: 'capaciti',
    issuerLogoPlaceholder: 'CAPACITI',
    skillsVerified: [
      'Technical Support',
      'System Maintenance',
      'Troubleshooting',
      'Active Directory',
      'Hardware Repair',
      'Helpdesk Support',
    ],
  },
  {
    id: 'cert-cct-cisco-specialist',
    name: 'Cisco IT Specialist (CCNA)',
    provider: 'College of Cape Town / Cisco Networking Academy',
    focus: 'Cisco Certified Network Associate (CCNA) — Routing, Switching, Subnetting & Network Security',
    date: '2025 – 2025',
    credentialId: 'CCT-CISCO-CCNA-2025',
    credentialUrl: 'https://www.cct.edu.za/verify/CCT-CISCO-CCNA-2025',
    badgeType: 'cisco',
    issuerLogoPlaceholder: 'College of Cape Town',
    skillsVerified: [
      'CCNA Routing & Switching',
      'IPv4 & IPv6 Subnetting',
      'Cisco Packet Tracer',
      'VLANs & Trunks',
      'Network Security Protocols',
      'Hardware & Systems Diagnostics',
    ],
  },
  {
    id: 'cert-matric-certificate',
    name: 'Matric Certificate (National Senior Certificate)',
    provider: 'Department of Basic Education / Umalusi',
    focus: 'National Senior Certificate (Grade 12 Matric Qualification - Completed 2024)',
    date: '2024',
    credentialId: 'DBE-NSC-MATRIC-2024',
    badgeType: 'matric',
    issuerLogoPlaceholder: 'DBE / Umalusi',
    skillsVerified: [
      'Mathematical Foundations',
      'Analytical Thinking',
      'English Communication',
      'Computer Applications & Literacy',
    ],
  },
  {
    id: 'cert-cisco-ccst-net',
    name: 'Cisco Certified Support Technician (CCST) - Networking',
    provider: 'Cisco Networking Academy',
    focus: 'Network Protocols, IP Addressing, Packet Tracer & Troubleshooting',
    date: '2025',
    credentialId: 'CSCO-ID-914285',
    credentialUrl: 'https://www.credly.com/org/cisco/badge/ccst-networking',
    badgeType: 'cisco',
    issuerLogoPlaceholder: 'Cisco',
    skillsVerified: [
      'Networking Fundamentals',
      'Cisco Packet Tracer',
      'IPv4 & IPv6 Subnetting',
      'Switch Configuration',
      'TCP/IP & OSI Model',
    ],
  },
  {
    id: 'cert-google-it-support',
    name: 'Google IT Support Professional Certificate',
    provider: 'Google / Coursera',
    focus: 'Operating Systems, System Administration, Security & Troubleshooting',
    date: '2025',
    credentialId: 'GOOG-IT-642109',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/GOOG-IT-642109',
    badgeType: 'google',
    issuerLogoPlaceholder: 'Google',
    skillsVerified: [
      'Helpdesk Support',
      'Active Directory',
      'Linux & Windows CLI',
      'Hardware Diagnostics',
      'Customer Service',
    ],
  },
];
