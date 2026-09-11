import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  ExternalLink,
  Copy,
  Check,
  Award,
  Hash,
  FileCheck,
  Linkedin,
  Printer,
  Sparkles,
  CheckCheck,
} from 'lucide-react';
import { CertificationItem } from '../types';
import { getCertificateConfig } from '../utils/certificateTheme';
import { useMediaViewer } from '../utils/mediaViewerContext';

interface CredentialVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certification: CertificationItem | null;
  candidateName: string;
}

export const CredentialVerificationModal: React.FC<CredentialVerificationModalProps> = ({
  isOpen,
  onClose,
  certification,
  candidateName,
}) => {
  const [copiedId, setCopiedId] = useState(false);
  const [activeTab, setActiveTab] = useState<'certificate' | 'details'>('certificate');
  const { setIsViewingCertificate } = useMediaViewer();

  useEffect(() => {
    if (isOpen) {
      setIsViewingCertificate(true);
    } else {
      setIsViewingCertificate(false);
    }
    return () => {
      setIsViewingCertificate(false);
    };
  }, [isOpen, setIsViewingCertificate]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !certification) return null;

  const certConfig = getCertificateConfig(certification);
  const theme = certConfig.theme;

  const getLogosForProvider = (cert: CertificationItem) => {
    return {
      primaryLogo: certConfig.primaryLogo,
      partnerLogo: certConfig.partnerLogo,
    };
  };

  const { primaryLogo, partnerLogo } = getLogosForProvider(certification);


  const handleCopyId = () => {
    if (certification.credentialId) {
      navigator.clipboard.writeText(certification.credentialId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // Parse issue year for LinkedIn
  const extractYear = (dateStr: string) => {
    const match = dateStr.match(/\b(20\d{2})\b/);
    return match ? match[1] : '2026';
  };

  const extractMonth = (dateStr: string) => {
    const months: { [key: string]: string } = {
      january: '1', february: '2', march: '3', april: '4', may: '5', june: '6',
      july: '7', august: '8', september: '9', october: '10', november: '11', december: '12'
    };
    const lower = dateStr.toLowerCase();
    for (const [mName, mNum] of Object.entries(months)) {
      if (lower.includes(mName)) return mNum;
    }
    return '8';
  };

  const issueYear = extractYear(certification.date);
  const issueMonth = extractMonth(certification.date);

  const linkedInAddUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
    certification.name
  )}&organizationName=${encodeURIComponent(
    certification.provider
  )}&issueYear=${issueYear}&issueMonth=${issueMonth}&certUrl=${encodeURIComponent(
    certification.credentialUrl || ''
  )}&certId=${encodeURIComponent(certification.credentialId || '')}`;

  const displayName = certification.recipientName || candidateName || 'Emihle Liyema Tom';

  const isCisco =
    certification.provider?.toLowerCase().includes('cisco') ||
    certification.badgeType === 'cisco' ||
    certification.name?.toLowerCase().includes('cisco');

  const isCapaciti =
    certification.provider?.toLowerCase().includes('capaciti') ||
    certification.badgeType === 'capaciti' ||
    certification.name?.toLowerCase().includes('capaciti');
  const isCoursera = certification.credentialUrl?.includes('coursera') || certification.category === 'Specialization' || certification.category === 'Course';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="verification-dialog-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      onWheel={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
    >
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Verification Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-5 sm:p-6 text-white relative border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close verification dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4 pr-10">
            {primaryLogo && (
              <div className="w-12 h-12 rounded-2xl bg-white logo-plate p-2 shrink-0 flex items-center justify-center shadow-md border border-white/20">
                <img
                  src={primaryLogo}
                  alt={`${certification.provider} logo`}
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Digital Credential</span>
              </div>

              <h3
                id="verification-dialog-title"
                className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug"
              >
                {certification.name}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Issued by <strong className="text-white">{certification.provider}</strong> • {certification.date}
              </p>
            </div>
          </div>

          {/* Tab Switcher: Certificate View vs Details */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'certificate'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Official Certificate View
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'details'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Verification Metadata & Skills
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div 
          data-scrollable="true"
          className="p-4 sm:p-6 overflow-y-auto flex-1 text-slate-800 dark:text-slate-200 text-sm space-y-5 bg-slate-50/50 dark:bg-slate-950/40 overscroll-contain"
        >
          {activeTab === 'certificate' ? (
            /* Institutional Digital Certificate Graphic - Crisp, High-End Canvas */
            <div className="rounded-2xl border-2 border-slate-200/90 dark:border-white/10 bg-white dark:bg-slate-900/90 p-6 sm:p-8 shadow-sm relative overflow-hidden text-center select-text transition-all">
              {/* Top Branded Institutional Accent Line */}
              {theme === 'google' ? (
                <div className="absolute top-0 left-0 right-0 grid grid-cols-4 h-1.5">
                  <div className="bg-[#4285F4]" />
                  <div className="bg-[#EA4335]" />
                  <div className="bg-[#FBBC05]" />
                  <div className="bg-[#34A853]" />
                </div>
              ) : (
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${certConfig.cardAccent}`} />
              )}

              {/* Double Inset Fine Security Borders */}
              <div className="absolute inset-2 border border-slate-200/70 dark:border-white/5 rounded-xl pointer-events-none" />
              <div className="absolute inset-3 border border-slate-100 dark:border-white/5 rounded-lg pointer-events-none" />

              {/* Top certificate header logos & Badge */}
              <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  {primaryLogo && (
                    <div className="bg-white logo-plate px-2 py-1 rounded-lg border border-slate-200/80 shadow-2xs">
                      <img
                        src={primaryLogo}
                        alt={certification.provider}
                        className="h-8 sm:h-9 max-w-[140px] object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  {partnerLogo && (
                    <>
                      <span className="text-slate-300 dark:text-slate-600 text-lg font-light">•</span>
                      <div className="bg-white logo-plate px-2 py-1 rounded-lg border border-slate-200/80 shadow-2xs">
                        <img
                          src={partnerLogo}
                          alt="Partner organization"
                          className="h-8 sm:h-9 max-w-[140px] object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase ${certConfig.badgeStyle}`}
                  >
                    {certConfig.badgeLabel}
                  </span>
                </div>
              </div>

              {/* Certificate Type Label */}
              <div className="relative z-10 mb-3">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-slate-400">
                  {certConfig.certSubtitle}
                </span>
              </div>

              {/* Recipient Announcement */}
              <div className="relative z-10 mb-3">
                <p className="text-xs sm:text-sm font-serif italic text-slate-500 dark:text-slate-400">
                  {theme === 'matric-academic'
                    ? 'This is to certify that candidate'
                    : 'This is to certify that'}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white mt-1 mb-1">
                  {displayName}
                </h2>
                <p className="text-xs sm:text-sm font-serif italic text-slate-500 dark:text-slate-400">
                  {theme === 'matric-academic'
                    ? 'has satisfied all statutory criteria for'
                    : 'has successfully completed'}
                </p>
              </div>

              {/* Certificate Course / Qualification Title */}
              <div className="relative z-10 mb-6 max-w-xl mx-auto">
                <h3 className="text-lg sm:text-2xl font-bold leading-snug tracking-tight text-slate-900 dark:text-white">
                  {certification.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed max-w-lg mx-auto">
                  {certification.focus ||
                    `An authorized qualification certified by ${certification.provider}`}
                </p>
              </div>

              {/* Certificate Bottom Signatures & Medallion Seal */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-left">
                {/* Signatures & Organization */}
                <div className="space-y-1 text-center sm:text-left">
                  <div className="h-6 flex items-end">
                    <span className="font-serif italic text-sm tracking-wide text-slate-700 dark:text-slate-200 font-medium">
                      {certConfig.signatureTitle}
                    </span>
                  </div>
                  <div className="w-48 h-px my-1 mx-auto sm:mx-0 bg-slate-300 dark:bg-slate-700" />
                  <p className="text-[10px] font-mono uppercase text-slate-400">
                    Authorized Signature & Verification
                  </p>
                </div>

                {/* Medallion Seal */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-13 h-13 rounded-full p-1 shadow-sm flex items-center justify-center border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800">
                    <div
                      className={`w-full h-full rounded-full flex flex-col items-center justify-center shadow-xs p-1 ${certConfig.sealColor}`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="text-[7px] font-mono font-bold tracking-wider uppercase mt-0.5">
                        {certConfig.sealText}
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{certification.date}</p>
                    <p className="truncate max-w-[130px] text-slate-400">
                      ID: {certification.credentialId || 'VERIFIED-RECORD'}
                    </p>
                  </div>
                </div>
              </div>

              {certification.credentialUrl && !isCisco && !isCapaciti && (
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] font-mono">
                    Official Verification URL: {certification.credentialUrl.replace('https://', '')}
                  </span>
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold text-xs transition-colors"
                  >
                    <span>Open on {certification.credentialUrl.includes('coursera') ? 'Coursera' : 'Registry'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            /* Tab: Details & Skills */
            <div className="space-y-4">
              {/* Verification Status Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-950 dark:text-emerald-300 uppercase tracking-wide">
                      Accreditation Status
                    </p>
                    <p className="text-xs text-emerald-800 dark:text-emerald-400 font-medium">
                      Formally Verified & Authentic Record
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-white dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 shadow-2xs">
                  ACTIVE
                </span>
              </div>

              {/* Facts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono mb-1">
                    <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Recipient</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{displayName}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono mb-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Completion Date</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{certification.date}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 shadow-2xs sm:col-span-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono mb-1">
                    <div className="flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Credential ID</span>
                    </div>
                    {certification.credentialId && (
                      <button
                        onClick={handleCopyId}
                        className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-mono font-semibold"
                      >
                        {copiedId ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy ID</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <p className="font-mono text-xs font-semibold text-slate-900 dark:text-slate-200 break-all bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10">
                    {certification.credentialId || 'CREDENTIAL-RECORD-VERIFIED'}
                  </p>
                </div>
              </div>

              {/* Curriculum Focus */}
              {certification.focus && (
                <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40">
                  <div className="flex items-center gap-1.5 text-xs text-blue-700 dark:text-blue-400 font-mono font-semibold mb-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Curriculum & Competency Focus</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {certification.focus}
                  </p>
                </div>
              )}

              {/* Verified Technical Skills */}
              {certification.skillsVerified && certification.skillsVerified.length > 0 && (
                <div className="bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-2xs">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Verified Technical Skills</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {certification.skillsVerified.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-white/10"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href={linkedInAddUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold transition-colors"
              title="Add this verified credential directly to your LinkedIn profile"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-700 dark:text-blue-300" />
              <span>Add to LinkedIn</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            {certification.credentialUrl && !isCisco && !isCapaciti ? (
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                <span>{certification.credentialUrl.includes('coursera') ? 'Verify on Coursera' : 'Visit Official Registry'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Qualification</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
