import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  ExternalLink,
  Calendar,
  Plus,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  CheckCheck,
  Pencil,
  Eye,
  Linkedin,
  Sparkles,
  BookOpen,
  ArrowDownUp,
} from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';
import { CertificationItem } from '../types';
import { getCertificateConfig, CertificateThemeConfig, sortCertificatesByDate } from '../utils/certificateTheme';
import { AddCertificationModal } from './AddCertificationModal';
import { CredentialVerificationModal } from './CredentialVerificationModal';
import { SectionReveal } from './SectionReveal';

interface CertificateThumbnailProps {
  cert: CertificationItem;
  recipientName: string;
  onClick: () => void;
}

const CertificateThumbnail: React.FC<CertificateThumbnailProps> = ({
  cert,
  recipientName,
  onClick,
}) => {
  const config = getCertificateConfig(cert);
  const displayName = cert.recipientName || recipientName || 'Emihle Liyema Tom';
  const theme = config.theme;

  return (
    <div
      onClick={onClick}
      className="w-full aspect-[16/10] rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-all p-3 sm:p-3.5 flex flex-col justify-between relative overflow-hidden group/thumb cursor-pointer select-none hover:border-slate-300 dark:hover:border-white/20"
      title="Click to view full credential certificate"
    >
      {/* Top institutional accent strip */}
      {theme === 'google' ? (
        <div className="absolute top-0 left-0 right-0 grid grid-cols-4 h-1">
          <div className="bg-[#4285F4]" />
          <div className="bg-[#EA4335]" />
          <div className="bg-[#FBBC05]" />
          <div className="bg-[#34A853]" />
        </div>
      ) : (
        <div className={`absolute top-0 left-0 right-0 h-1 ${config.cardAccent}`} />
      )}

      {/* Delicate inner security frame */}
      <div className="absolute inset-1.5 border border-slate-100 dark:border-white/5 rounded-xl pointer-events-none" />

      {/* Top row: Official Issuer Logos & Category Badge */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          {config.primaryLogo && (
            <div className="bg-white logo-plate px-1.5 py-0.5 rounded border border-slate-200/80 shadow-2xs">
              <img
                src={config.primaryLogo}
                alt=""
                className="h-3.5 sm:h-4 max-w-[85px] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          {config.partnerLogo && (
            <>
              <span className="text-slate-300 dark:text-slate-600 text-xs">•</span>
              <div className="bg-white logo-plate px-1.5 py-0.5 rounded border border-slate-200/80 shadow-2xs">
                <img
                  src={config.partnerLogo}
                  alt=""
                  className="h-3.5 sm:h-4 max-w-[75px] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </>
          )}
        </div>

        {/* Customized Institutional Pill Tag */}
        <span
          className={`text-[8px] sm:text-[9px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.badgeStyle}`}
        >
          {config.badgeLabel}
        </span>
      </div>

      {/* Center content: Clear, dignified typography */}
      <div className="text-center my-auto py-1 relative z-10">
        <p className="text-[8px] sm:text-[9px] text-slate-400 font-mono uppercase tracking-wider font-semibold">
          {config.certSubtitle}
        </p>
        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
          {displayName}
        </p>
        <p className="text-[8px] text-slate-400 font-serif italic mt-0.5">
          {theme === 'matric-academic'
            ? 'has fulfilled statutory requirements for'
            : 'has successfully completed'}
        </p>
        <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug mt-0.5 max-w-[92%] mx-auto">
          {cert.name}
        </p>
        <p className="text-[8px] text-slate-400 mt-0.5 truncate max-w-[90%] mx-auto">
          {config.headerTitle}
        </p>
      </div>

      {/* Bottom row: Credential ID & Institutional Seal */}
      <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-white/10 relative z-10 text-[9px]">
        <div className="flex items-center gap-1.5 font-mono text-slate-400 text-[8px] sm:text-[9px] truncate max-w-[170px]">
          <span>{cert.date}</span>
          <span>•</span>
          <span className="truncate">{cert.credentialId || 'VERIFIED'}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div
            className={`px-1.5 py-0.5 rounded-md flex items-center gap-1 text-[8px] font-mono font-bold uppercase shadow-2xs ${config.sealColor}`}
          >
            <ShieldCheck className="w-2.5 h-2.5" />
            <span>{config.sealText}</span>
          </div>
        </div>
      </div>

      {/* Hover overlay hint */}
      <div className="absolute inset-0 bg-slate-900/0 group-hover/thumb:bg-slate-900/10 transition-colors flex items-center justify-center">
        <span className="opacity-0 group-hover/thumb:opacity-100 transition-opacity px-2.5 py-1 rounded-lg bg-slate-900/90 text-white text-[10px] font-medium shadow-sm flex items-center gap-1 backdrop-blur-xs">
          <Eye className="w-3 h-3" />
          <span>View Certificate</span>
        </span>
      </div>
    </div>
  );
};



export const Certifications: React.FC = () => {
  const {
    certificationsList,
    digitalBadgesList,
    personalInfo,
    addCertification,
    editCertification,
    deleteCertification,
    isEditMode,
  } = usePortfolioData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [verifyingCert, setVerifyingCert] = useState<CertificationItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'ai-ml' | 'it-support' | 'networking' | 'qualifications'
  >('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const handleOpenAdd = () => {
    setEditingCert(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (cert: CertificationItem) => {
    setEditingCert(cert);
    setIsAddModalOpen(true);
  };

  const handleSaveCertification = (data: Omit<CertificationItem, 'id'> & { id?: string }) => {
    if (editingCert) {
      editCertification(editingCert.id, data);
    } else {
      addCertification(data);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}"?`)) {
      deleteCertification(id);
    }
  };

  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to render official issuer logo
  const renderIssuerLogo = (
    provider: string,
    badgeType?: string,
    logoUrl?: string,
    partnerLogoUrl?: string
  ) => {
    let finalLogo = logoUrl;
    const p = provider.toLowerCase();
    const b = (badgeType || '').toLowerCase();

    if (logoUrl && (logoUrl.includes('ai-bootcamp-badge') || logoUrl.includes('badge') || logoUrl.includes('aws'))) {
      finalLogo = logoUrl;
    } else if (p.includes('cisco') || b === 'cisco') {
      finalLogo = '/logos/cisco-logo.svg';
    } else if (p.includes('deeplearning') || b === 'deeplearning') {
      finalLogo = '/logos/deeplearning-trimmed.png';
    } else if (p.includes('stanford') || b === 'stanford') {
      finalLogo = '/logos/stanford-logo.svg';
    } else if (p.includes('ibm') || b === 'ibm') {
      finalLogo = '/logos/ibm-logo.svg';
    } else if (p.includes('google cloud') || b === 'google-cloud') {
      finalLogo = '/logos/google_cloud-logo.svg';
    } else if (p.includes('capaciti') || b === 'capaciti') {
      finalLogo = '/logos/capaciti-symbol.webp';
    } else if (p.includes('college of cape town') || p.includes('cct') || b === 'cct') {
      finalLogo = '/logos/cct-logo.svg';
    } else if (p.includes('google') || b === 'google') {
      finalLogo = '/logos/google-logo.svg';
    } else if (p.includes('coursera') || b === 'coursera') {
      finalLogo = logoUrl || '/logos/coursera-logo.webp';
    } else if (
      p.includes('matric') ||
      p.includes('basic education') ||
      p.includes('umalusi') ||
      b === 'matric'
    ) {
      finalLogo = '/logos/dbe-symbol.png';
    }

    if (partnerLogoUrl) {
      return (
        <div className="flex items-center -space-x-2 shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-white logo-plate border border-slate-200/90 dark:border-white/10 shadow-2xs flex items-center justify-center p-1.5 overflow-hidden z-10">
            <img
              src={finalLogo || '/logos/deeplearning-trimmed.png'}
              alt="Provider"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="w-11 h-11 rounded-2xl bg-white logo-plate border border-slate-200/90 dark:border-white/10 shadow-2xs flex items-center justify-center p-1.5 overflow-hidden z-0">
            <img src={partnerLogoUrl} alt="Partner" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
      );
    }

    if (finalLogo) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-white logo-plate border border-slate-200/90 dark:border-white/10 shadow-2xs flex items-center justify-center p-2 shrink-0 overflow-hidden group-hover/card:border-blue-300 transition-colors">
          <img
            src={finalLogo}
            alt={`${provider} logo`}
            className="max-w-full max-h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }

    const initials = provider
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();

    return (
      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md shrink-0 border border-slate-700">
        <span className="font-mono text-xs font-bold tracking-wider">{initials || 'CERT'}</span>
      </div>
    );
  };

  const isMatricCertificate = (cert: CertificationItem): boolean => {
    const name = (cert.name || '').toLowerCase();
    const provider = (cert.provider || '').toLowerCase();
    const badge = (cert.badgeType || '').toLowerCase();
    const focus = (cert.focus || '').toLowerCase();
    return (
      name.includes('matric') ||
      name.includes('national senior certificate') ||
      name.includes('nsc') ||
      provider.includes('matric') ||
      provider.includes('basic education') ||
      provider.includes('umalusi') ||
      badge === 'matric' ||
      focus.includes('grade 12')
    );
  };

  const isCiscoCertificate = (cert: CertificationItem): boolean => {
    const id = (cert.id || '').toLowerCase();
    const name = (cert.name || '').toLowerCase();
    const provider = (cert.provider || '').toLowerCase();
    const badge = (cert.badgeType || '').toLowerCase();
    return (
      id.includes('cisco') ||
      name.includes('cisco') ||
      provider.includes('cisco') ||
      badge === 'cisco'
    );
  };

  const isCapacitiCertificate = (cert: CertificationItem): boolean => {
    const id = (cert.id || '').toLowerCase();
    const name = (cert.name || '').toLowerCase();
    const provider = (cert.provider || '').toLowerCase();
    const badge = (cert.badgeType || '').toLowerCase();
    return (
      id.includes('capaciti') ||
      name.includes('capaciti') ||
      provider.includes('capaciti') ||
      badge === 'capaciti'
    );
  };

  // Filter certifications based on category
  const filteredList = certificationsList.filter((cert) => {
    if (selectedFilter === 'all') return true;
    const text = (
      cert.name +
      ' ' +
      cert.provider +
      ' ' +
      (cert.focus || '') +
      ' ' +
      (cert.category || '') +
      ' ' +
      (cert.badgeType || '')
    ).toLowerCase();

    if (selectedFilter === 'ai-ml') {
      return (
        text.includes('ai') ||
        text.includes('learning') ||
        text.includes('prompt') ||
        text.includes('deeplearning') ||
        text.includes('generative') ||
        text.includes('stanford') ||
        text.includes('ibm') ||
        cert.badgeType === 'deeplearning' ||
        cert.badgeType === 'google-cloud' ||
        cert.badgeType === 'ibm' ||
        cert.id.includes('goog-ai') ||
        cert.id.includes('dl-')
      );
    }
    if (selectedFilter === 'it-support') {
      return (
        text.includes('support') ||
        text.includes('technician') ||
        text.includes('maintenance') ||
        text.includes('helpdesk') ||
        text.includes('capaciti')
      );
    }
    if (selectedFilter === 'networking') {
      return (
        text.includes('network') ||
        text.includes('cisco') ||
        text.includes('ccna') ||
        text.includes('ccst') ||
        text.includes('routing')
      );
    }
    if (selectedFilter === 'qualifications') {
      return (
        text.includes('diploma') ||
        text.includes('qualification') ||
        text.includes('college') ||
        text.includes('matric') ||
        text.includes('nsc') ||
        text.includes('senior certificate') ||
        cert.category === 'Academic Diploma' ||
        cert.category === 'National Qualification'
      );
    }
    return true;
  });

  // Rearrange / sort certifications strictly in order according to dates completed
  const sortedAndFilteredList = useMemo(() => {
    return sortCertificatesByDate(filteredList, sortOrder);
  }, [filteredList, sortOrder]);

  // Calculate counts for filters
  const aiCount = certificationsList.filter((c) => {
    const t = (c.name + ' ' + c.provider + ' ' + (c.focus || '')).toLowerCase();
    return (
      t.includes('ai') ||
      t.includes('learning') ||
      t.includes('prompt') ||
      t.includes('deeplearning') ||
      t.includes('generative') ||
      t.includes('stanford') ||
      t.includes('ibm')
    );
  }).length;

  const itSupportCount = certificationsList.filter((c) => {
    const t = (c.name + ' ' + c.provider + ' ' + (c.focus || '')).toLowerCase();
    return t.includes('support') || t.includes('technician') || t.includes('helpdesk');
  }).length;

  const networkingCount = certificationsList.filter((c) => {
    const t = (c.name + ' ' + c.provider + ' ' + (c.focus || '')).toLowerCase();
    return t.includes('network') || t.includes('cisco');
  }).length;

  const qualificationsCount = certificationsList.filter((c) => {
    const t = (c.name + ' ' + c.provider + ' ' + (c.focus || '')).toLowerCase();
    return (
      t.includes('diploma') ||
      t.includes('matric') ||
      t.includes('nsc') ||
      c.category === 'Academic Diploma' ||
      c.category === 'National Qualification'
    );
  }).length;

  // Extract year & month for LinkedIn helper
  const getLinkedInUrl = (cert: CertificationItem) => {
    const yearMatch = cert.date.match(/\b(20\d{2})\b/);
    const issueYear = yearMatch ? yearMatch[1] : '2026';
    const months: { [key: string]: string } = {
      january: '1', february: '2', march: '3', april: '4', may: '5', june: '6',
      july: '7', august: '8', september: '9', october: '10', november: '11', december: '12'
    };
    let issueMonth = '8';
    const lowerDate = cert.date.toLowerCase();
    for (const [mName, mNum] of Object.entries(months)) {
      if (lowerDate.includes(mName)) {
        issueMonth = mNum;
        break;
      }
    }

    return `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
      cert.name
    )}&organizationName=${encodeURIComponent(
      cert.provider
    )}&issueYear=${issueYear}&issueMonth=${issueMonth}&certUrl=${encodeURIComponent(
      cert.credentialUrl || ''
    )}&certId=${encodeURIComponent(cert.credentialId || '')}`;
  };

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/60 scroll-mt-20 relative"
    >
      <SectionReveal className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-blue-700 bg-blue-50/80 px-3 py-1 rounded-full border border-blue-200/60 w-fit mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Verified Accreditations & Credentials</span>
            </div>
            <h2
              id="certifications-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950"
            >
              Certifications & Qualifications
            </h2>
            <p className="mt-2 text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
              Formally verified professional credentials across <strong>AI & Machine Learning</strong>, <strong>Generative AI</strong>, <strong>Prompt Engineering</strong>, <strong>IT Support</strong>, <strong>Cisco Networking</strong>, and accredited education diplomas.
            </p>
          </div>

          {isEditMode && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certification</span>
              </button>
            </div>
          )}
        </div>

        {/* Verified Digital Badges Showcase */}
        {digitalBadgesList && digitalBadgesList.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-800">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                </span>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                  Verified Digital Badges
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Official Digital Credentials
              </span>
            </div>

            {digitalBadgesList.map((badge) => (
              <div
                key={badge.id}
                className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl border border-blue-800/40 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 relative z-10">
                  <div className="relative group shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 backdrop-blur-md p-2 flex items-center justify-center border border-white/20 shadow-md">
                      <img
                        src={badge.logoUrl || '/logos/ai-bootcamp-badge.png'}
                        alt={badge.name}
                        className="w-full h-full object-contain drop-shadow-md"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-mono font-bold shadow-xs">
                      BADGE
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                        Official Digital Badge
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Verified on Coursera</span>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      {badge.name}
                    </h3>

                    <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                      Issued by <strong>{badge.provider}</strong> • {badge.date}. {badge.focus}
                    </p>

                    {badge.skillsVerified && badge.skillsVerified.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                        {badge.skillsVerified.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/10 text-slate-200 border border-white/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-2.5 flex items-center justify-center sm:justify-start gap-3 text-xs font-mono text-slate-400">
                      <span>
                        Credential ID:{' '}
                        <span className="text-slate-200 font-semibold">{badge.credentialId}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-2.5 shrink-0 relative z-10 w-full sm:w-auto lg:w-48 justify-center">
                  {badge.credentialUrl && (
                    <a
                      href={badge.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-xs tracking-wide shadow-md transition-all cursor-pointer group"
                      title="Verify official Artificial Intelligence Bootcamp badge directly on Coursera"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-300 group-hover:text-white transition-colors shrink-0" />
                      <span>Verify on Coursera</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setVerifyingCert(badge)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-300" />
                    <span>View Badge</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-2 rounded-2xl frosted-glass-subtle border border-white/80 dark:border-white/10 shadow-2xs">
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/10'
              }`}
            >
              All Credentials ({certificationsList.length})
            </button>
            <button
              onClick={() => setSelectedFilter('ai-ml')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === 'ai-ml'
                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>AI & Machine Learning ({aiCount})</span>
            </button>
            <button
              onClick={() => setSelectedFilter('it-support')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                selectedFilter === 'it-support'
                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/10'
              }`}
            >
              IT Support & Systems ({itSupportCount})
            </button>
            <button
              onClick={() => setSelectedFilter('networking')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                selectedFilter === 'networking'
                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/10'
              }`}
            >
              Networking & Infrastructure ({networkingCount})
            </button>
            <button
              onClick={() => setSelectedFilter('qualifications')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                selectedFilter === 'qualifications'
                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/10'
              }`}
            >
              Diplomas & NSC ({qualificationsCount})
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Interactive Order by Date Completed Toggle */}
            <button
              type="button"
              onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-medium border border-slate-200/90 dark:border-white/10 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-2xs hover:border-blue-300 transition-all cursor-pointer select-none"
              title={
                sortOrder === 'desc'
                  ? 'Currently sorted by date completed: Most Recent First. Click for Oldest First'
                  : 'Currently sorted by date completed: Oldest First. Click for Most Recent First'
              }
              aria-label="Toggle certificate completion date ordering"
            >
              <ArrowDownUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>
                Date Order:{' '}
                <strong className="text-slate-900 dark:text-white font-semibold">
                  {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
                </strong>
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 pr-2">
              <CheckCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Registry Status: Active & Fully Verified</span>
            </div>
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAndFilteredList.map((cert, index) => {
            const isSpecialization = cert.category === 'Specialization';
            const certConfig = getCertificateConfig(cert);
            const linkedInUrl = getLinkedInUrl(cert);

            return (
              <motion.div
                key={`${cert.id || 'cert'}-${index}`}
                id={`cert-card-${cert.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08, margin: '0px 0px -30px 0px' }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`group/card bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl border p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 relative overflow-hidden ${
                  isSpecialization
                    ? 'border-blue-300 dark:border-blue-500/30 ring-1 ring-blue-100 dark:ring-blue-900/30 hover:border-blue-400'
                    : 'border-white/90 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-500/30'
                }`}
              >
                {/* Subtle top accent bar customized to institution */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 ${certConfig.cardAccent} opacity-90`}
                />

                <div className="space-y-4">
                  {/* Top Certificate Preview Thumbnail */}
                  <CertificateThumbnail
                    cert={cert}
                    recipientName={personalInfo.name}
                    onClick={() => setVerifyingCert(cert)}
                  />

                  {/* Coursera-style Direct Action Links (Add to LinkedIn | View Certificate) */}
                  <div className="flex items-center justify-between px-1 py-0.5 text-xs border-b border-slate-100 dark:border-white/10 pb-2.5">
                    <a
                      href={linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 font-semibold text-xs transition-colors hover:underline"
                      title="Add certificate to your LinkedIn profile"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400 shrink-0" />
                      <span>Add to LinkedIn</span>
                    </a>

                    {cert.credentialUrl && !isCiscoCertificate(cert) && !isCapacitiCertificate(cert) ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-xs transition-colors hover:underline cursor-pointer"
                        title="Open external verified certificate link"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>{cert.credentialUrl.includes('coursera') ? 'Verify on Coursera' : 'View certificate'}</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setVerifyingCert(cert)}
                        className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-xs transition-colors hover:underline cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>View certificate</span>
                      </button>
                    )}
                  </div>

                  {/* Header: Logo, Issuer Name, Verified badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {renderIssuerLogo(
                        cert.provider,
                        cert.badgeType,
                        cert.logoUrl,
                        cert.partnerLogoUrl
                      )}
                      <div>
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400 block">
                          {cert.provider}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-700/40">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                            <span>Verified</span>
                          </span>
                          {isSpecialization && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-700/40">
                              SPECIALIZATION
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions (Owner Mode Only) */}
                    {isEditMode && (
                      <div className="flex items-center gap-1 opacity-80 group-hover/card:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(cert)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Edit Certification Details"
                          aria-label={`Edit ${cert.name}`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(cert.id, cert.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Certification"
                          aria-label={`Delete ${cert.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Certificate Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors">
                    {cert.name}
                  </h3>

                  {/* Curriculum Focus */}
                  {cert.focus && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-white/10">
                      <strong className="text-slate-700 dark:text-slate-200 font-medium">Focus:</strong> {cert.focus}
                    </p>
                  )}

                  {/* Key Technical Skills Verified */}
                  {cert.skillsVerified && cert.skillsVerified.length > 0 && (
                    <div>
                      <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1.5">
                        Key Technical Skills Verified
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skillsVerified.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-mono bg-white/95 dark:bg-slate-800 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 shadow-2xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer: Metadata & Verify Credential Action */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex flex-col gap-3 mt-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                    {/* Date Earned */}
                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>{cert.date}</span>
                    </div>

                    {/* Credential ID with Copy Button */}
                    {cert.credentialId ? (
                      <button
                        type="button"
                        onClick={(e) => handleCopyId(e, cert.credentialId!)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-mono transition-colors cursor-pointer"
                        title="Click to copy Credential ID"
                      >
                        <span>ID: {cert.credentialId.length > 20 ? cert.credentialId.slice(0, 18) + '…' : cert.credentialId}</span>
                        {copiedId === cert.credentialId ? (
                          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400" />
                        )}
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono">ID: Verified</span>
                    )}
                  </div>

                  {/* Primary Action Button */}
                  {isMatricCertificate(cert) ? (
                    <div className="flex items-center justify-between w-full py-2 px-3 rounded-xl bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-medium">
                      <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="font-semibold">National Senior Certificate (Endorsed)</span>
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-white/10">
                        DBE / Umalusi
                      </span>
                    </div>
                  ) : isCiscoCertificate(cert) || isCapacitiCertificate(cert) ? (
                    <button
                      type="button"
                      onClick={() => setVerifyingCert(cert)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-300 border border-slate-200/80 dark:border-white/10 text-xs font-semibold tracking-wide transition-all shadow-2xs cursor-pointer group/btn"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover/btn:text-blue-600 dark:group-hover/btn:text-blue-400 transition-colors shrink-0" />
                      <span>View Certificate</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      {cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer group/btn"
                          title={`Verify officially on ${cert.credentialUrl.includes('coursera') ? 'Coursera' : cert.provider}`}
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 group-hover/btn:text-white transition-colors shrink-0" />
                          <span>Verify on {cert.credentialUrl.includes('coursera') ? 'Coursera' : 'Official Registry'}</span>
                          <ExternalLink className="w-3 h-3 text-white/80 group-hover/btn:text-white transition-colors shrink-0 ml-0.5" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setVerifyingCert(cert)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer group/btn"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:text-white transition-colors shrink-0" />
                          <span>Verify Credential</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setVerifyingCert(cert)}
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0 cursor-pointer"
                        title="Quick View Certificate Details"
                        aria-label={`View certificate details for ${cert.name}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Quick Add / Replace Certificate Slot (Owner Mode Only) */}
          {isEditMode && (
            <div
              id="cert-card-add-slot"
              onClick={handleOpenAdd}
              className="cursor-pointer border-2 border-dashed border-blue-200 hover:border-blue-500 rounded-3xl p-6 bg-white/40 hover:bg-white/80 backdrop-blur-md flex flex-col justify-between transition-all duration-300 group shadow-2xs min-h-[300px]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-105 transition-transform shadow-2xs">
                  <Plus className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-600">
                    Custom Credential
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight mb-2">
                  Add New Certificate
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Add additional certifications from <strong>Coursera</strong>, <strong>Cisco CCNA</strong>, <strong>CompTIA</strong>, or institutional qualifications to keep your portfolio up to date.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5 text-blue-600 font-semibold group-hover:underline">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Credential</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                  Interactive
                </span>
              </div>
            </div>
          )}
        </div>
      </SectionReveal>

      {/* Add / Edit Certification Modal (Owner Mode Only) */}
      {isEditMode && (
        <AddCertificationModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingCert(null);
          }}
          onSave={handleSaveCertification}
          initialCertification={editingCert}
        />
      )}

      {/* Credential Verification Modal */}
      <CredentialVerificationModal
        isOpen={!!verifyingCert}
        onClose={() => setVerifyingCert(null)}
        certification={verifyingCert}
        candidateName={personalInfo.name}
      />
    </section>
  );
};
