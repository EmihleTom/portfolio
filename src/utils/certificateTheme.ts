import { CertificationItem } from '../types';

export type CertificateTheme =
  | 'cisco'
  | 'stanford-dl'
  | 'aws-dl'
  | 'coursera-badge'
  | 'google-spec'
  | 'google'
  | 'google-cloud'
  | 'ibm'
  | 'capaciti'
  | 'matric-academic'
  | 'default';

export interface CertificateThemeConfig {
  theme: CertificateTheme;
  cardAccent: string;
  badgeLabel: string;
  badgeStyle: string;
  headerTitle: string;
  certSubtitle: string;
  primaryLogo: string;
  partnerLogo?: string;
  signatureTitle: string;
  sealColor: string;
  sealText: string;
}

export const getCertificateTheme = (cert: CertificationItem): CertificateTheme => {
  const p = (cert.provider || '').toLowerCase();
  const name = (cert.name || '').toLowerCase();
  const b = (cert.badgeType || '').toLowerCase();
  const cat = (cert.category || '').toLowerCase();

  // Cisco Networking & Cisco CCST/CCNA
  if (
    p.includes('cisco') ||
    b === 'cisco' ||
    name.includes('cisco') ||
    name.includes('ccna') ||
    name.includes('ccst')
  ) {
    return 'cisco';
  }

  // Artificial Intelligence Bootcamp Badge
  if (
    b === 'coursera' ||
    name.includes('bootcamp') ||
    cat.includes('badge') ||
    cert.id.includes('badge')
  ) {
    return 'coursera-badge';
  }

  // AWS & DeepLearning.AI
  if (
    (p.includes('aws') || cert.partner?.toLowerCase().includes('aws') || name.includes('large language models')) &&
    (p.includes('deeplearning') || b === 'deeplearning')
  ) {
    return 'aws-dl';
  }

  // Stanford Online & DeepLearning.AI
  if (
    p.includes('stanford') ||
    p.includes('deeplearning') ||
    b === 'deeplearning' ||
    b === 'stanford' ||
    cert.partner?.toLowerCase().includes('stanford')
  ) {
    return 'stanford-dl';
  }

  // IBM
  if (p.includes('ibm') || b === 'ibm' || name.includes('ibm')) {
    return 'ibm';
  }

  // CAPACITI
  if (p.includes('capaciti') || b === 'capaciti' || name.includes('capaciti')) {
    return 'capaciti';
  }

  // Formal Academic & Matric / Umalusi / CCT Diploma
  if (
    p.includes('matric') ||
    p.includes('basic education') ||
    p.includes('umalusi') ||
    b === 'matric' ||
    name.includes('matric') ||
    name.includes('national senior certificate') ||
    cat.includes('academic') ||
    (p.includes('college of cape town') && !p.includes('cisco'))
  ) {
    return 'matric-academic';
  }

  // Google Cloud
  if (p.includes('google cloud') || b === 'google-cloud' || name.includes('google cloud')) {
    return 'google-cloud';
  }

  // Google Specialization
  if (cat === 'specialization' || name.includes('specialization')) {
    return 'google-spec';
  }

  // Google general
  if (p.includes('google') || b === 'google') {
    return 'google';
  }

  return 'default';
};

export const getCertificateConfig = (cert: CertificationItem): CertificateThemeConfig => {
  const theme = getCertificateTheme(cert);

  switch (theme) {
    case 'cisco':
      return {
        theme: 'cisco',
        cardAccent: 'bg-gradient-to-r from-[#005073] via-[#00bceb] to-[#005073]',
        badgeLabel: 'Cisco Networking Academy',
        badgeStyle: 'bg-sky-50 text-sky-800 border border-sky-200',
        headerTitle: 'Cisco Networking Academy',
        certSubtitle: 'Certificate of Course Completion',
        primaryLogo: '/logos/cisco-logo.svg',
        signatureTitle: 'Cisco Academy Program Directorate',
        sealColor: 'bg-sky-700 text-white',
        sealText: 'CISCO',
      };

    case 'stanford-dl':
      return {
        theme: 'stanford-dl',
        cardAccent: 'bg-[#8C1515]',
        badgeLabel: 'Stanford & DeepLearning.AI',
        badgeStyle: 'bg-red-50 text-[#8C1515] border border-red-200',
        headerTitle: 'Stanford Online • DeepLearning.AI',
        certSubtitle: 'Statement of Accomplishment',
        primaryLogo: '/logos/deeplearning-trimmed.png',
        partnerLogo: '/logos/stanford-logo.svg',
        signatureTitle: 'Andrew Ng, Stanford University & DeepLearning.AI',
        sealColor: 'bg-[#8C1515] text-amber-300',
        sealText: 'STANFORD',
      };

    case 'aws-dl':
      return {
        theme: 'aws-dl',
        cardAccent: 'bg-gradient-to-r from-[#FF9900] via-[#232F3E] to-[#FF9900]',
        badgeLabel: 'DeepLearning.AI & AWS',
        badgeStyle: 'bg-amber-50 text-[#232F3E] border border-amber-300 font-semibold',
        headerTitle: 'DeepLearning.AI • Amazon Web Services',
        certSubtitle: 'Statement of Accomplishment',
        primaryLogo: '/logos/deeplearning-trimmed.png',
        partnerLogo: '/logos/aws-logo.svg',
        signatureTitle: 'Andrew Ng (DeepLearning.AI) & AWS Training Directorate',
        sealColor: 'bg-[#232F3E] text-[#FF9900]',
        sealText: 'AWS • DL',
      };

    case 'coursera-badge':
      return {
        theme: 'coursera-badge',
        cardAccent: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500',
        badgeLabel: 'Coursera Verified Badge',
        badgeStyle: 'bg-blue-50 text-blue-900 border border-blue-200 font-semibold',
        headerTitle: 'Artificial Intelligence Bootcamp',
        certSubtitle: 'Verified Digital Credential & Badge',
        primaryLogo: '/logos/ai-bootcamp-badge.png',
        partnerLogo: '/logos/coursera-logo.webp',
        signatureTitle: 'Coursera AI Credential Board & DeepLearning.AI',
        sealColor: 'bg-amber-600 text-white',
        sealText: 'AI BADGE',
      };

    case 'google-spec':
      return {
        theme: 'google-spec',
        cardAccent: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500',
        badgeLabel: 'Google Specialization',
        badgeStyle: 'bg-indigo-50 text-indigo-800 border border-indigo-200',
        headerTitle: 'Google Career Certificates',
        certSubtitle: 'Specialization Certificate',
        primaryLogo: '/logos/google-logo.svg',
        partnerLogo: '/logos/coursera-logo.webp',
        signatureTitle: 'Google Career Certificates Directorate',
        sealColor: 'bg-indigo-700 text-amber-300',
        sealText: 'HONORS',
      };

    case 'google-cloud':
      return {
        theme: 'google-cloud',
        cardAccent: 'bg-[#1a73e8]',
        badgeLabel: 'Google Cloud',
        badgeStyle: 'bg-blue-50 text-[#1a73e8] border border-blue-200',
        headerTitle: 'Google Cloud Training',
        certSubtitle: 'Course Completion Certificate',
        primaryLogo: '/logos/google_cloud-logo.svg',
        signatureTitle: 'Google Cloud Education Directorate',
        sealColor: 'bg-[#1a73e8] text-white',
        sealText: 'G-CLOUD',
      };

    case 'google':
      return {
        theme: 'google',
        cardAccent: 'bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]',
        badgeLabel: 'Google Authorized',
        badgeStyle: 'bg-blue-50 text-blue-800 border border-blue-200',
        headerTitle: 'Google Authorized Course',
        certSubtitle: 'Professional Certificate',
        primaryLogo: '/logos/google-logo.svg',
        partnerLogo: '/logos/coursera-logo.webp',
        signatureTitle: 'Google Training & Upskilling',
        sealColor: 'bg-[#4285F4] text-white',
        sealText: 'GOOGLE',
      };

    case 'ibm':
      return {
        theme: 'ibm',
        cardAccent: 'bg-[#0f62fe]',
        badgeLabel: 'IBM SkillsBuild',
        badgeStyle: 'bg-blue-50 text-[#0f62fe] border border-blue-200',
        headerTitle: 'IBM SkillsBuild',
        certSubtitle: 'Course Completion Certificate',
        primaryLogo: '/logos/ibm-logo.svg',
        signatureTitle: 'IBM Skills Network Directorate',
        sealColor: 'bg-[#0f62fe] text-white',
        sealText: 'IBM',
      };

    case 'capaciti':
      return {
        theme: 'capaciti',
        cardAccent: 'bg-gradient-to-r from-teal-600 via-cyan-600 to-amber-500',
        badgeLabel: 'CAPACITI Tech Talent',
        badgeStyle: 'bg-teal-50 text-teal-800 border border-teal-200',
        headerTitle: 'CAPACITI Tech Talent Accelerator',
        certSubtitle: 'IT Support Technician Qualification',
        primaryLogo: '/logos/capaciti-symbol.webp',
        signatureTitle: 'CAPACITI Technology Program Director',
        sealColor: 'bg-teal-700 text-amber-300',
        sealText: 'CAPACITI',
      };

    case 'matric-academic':
      return {
        theme: 'matric-academic',
        cardAccent: 'bg-gradient-to-r from-amber-700 via-yellow-500 to-emerald-700',
        badgeLabel: 'National Senior Certificate',
        badgeStyle: 'bg-amber-50 text-amber-900 border border-amber-200 font-serif',
        headerTitle: 'Republic of South Africa • Umalusi',
        certSubtitle: 'National Senior Certificate (NSC)',
        primaryLogo: '/logos/dbe-symbol.png',
        partnerLogo: '/logos/umalusi-logo.webp',
        signatureTitle: 'Chief Executive Officer, Umalusi Council',
        sealColor: 'bg-amber-800 text-yellow-200',
        sealText: 'UMALUSI',
      };

    default:
      return {
        theme: 'default',
        cardAccent: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400',
        badgeLabel: cert.category || 'Professional Certificate',
        badgeStyle: 'bg-slate-50 text-slate-700 border border-slate-200',
        headerTitle: cert.provider,
        certSubtitle: 'Certificate of Accomplishment',
        primaryLogo: cert.logoUrl || '/logos/coursera-logo.webp',
        partnerLogo: cert.partnerLogoUrl,
        signatureTitle: `${cert.provider} Faculty Board`,
        sealColor: 'bg-slate-800 text-white',
        sealText: 'VERIFIED',
      };
  }
};

/**
 * Calculates a numerical chronological score from a date string (e.g., 'Completed August 2026' -> 202608)
 */
export const parseCertDateScore = (dateStr: string): number => {
  if (!dateStr) return 0;
  const lower = dateStr.toLowerCase().trim();

  // Find 4-digit year (e.g., 2026, 2025, 2024)
  const yearMatch = lower.match(/\b(20\d{2})\b/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : 2020;

  // Month mapping
  const months: Record<string, number> = {
    january: 1, jan: 1,
    february: 2, feb: 2,
    march: 3, mar: 3,
    april: 4, apr: 4,
    may: 5,
    june: 6, jun: 6,
    july: 7, jul: 7,
    august: 8, aug: 8,
    september: 9, sep: 9,
    october: 10, oct: 10,
    november: 11, nov: 11,
    december: 12, dec: 12,
  };

  let month = 0;
  for (const [name, num] of Object.entries(months)) {
    if (lower.includes(name)) {
      month = num;
      break;
    }
  }

  // If ongoing or "present", place at latest point of that year (month 9)
  if (lower.includes('present') || lower.includes('current')) {
    if (month === 0) month = 9;
  }

  // If no month found, default to mid year (month 6)
  if (month === 0) {
    month = 6;
  }

  return year * 100 + month;
};

/**
 * Sorts certification items by completion date
 */
export const sortCertificatesByDate = (
  items: CertificationItem[],
  direction: 'desc' | 'asc' = 'desc'
): CertificationItem[] => {
  return [...items].sort((a, b) => {
    const scoreA = parseCertDateScore(a.date);
    const scoreB = parseCertDateScore(b.date);
    if (scoreA !== scoreB) {
      return direction === 'desc' ? scoreB - scoreA : scoreA - scoreB;
    }
    // Tie breaker: Specialization credentials first in same month
    if (a.category === 'Specialization' && b.category !== 'Specialization') {
      return direction === 'desc' ? -1 : 1;
    }
    if (b.category === 'Specialization' && a.category !== 'Specialization') {
      return direction === 'desc' ? 1 : -1;
    }
    return a.name.localeCompare(b.name);
  });
};


