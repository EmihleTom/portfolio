import React, { useState } from 'react';
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

  if (!isOpen || !certification) return null;

  const getLogosForProvider = (cert: CertificationItem) => {
    const p = cert.provider.toLowerCase();
    const b = (cert.badgeType || '').toLowerCase();

    let primaryLogo = cert.logoUrl;
    let partnerLogo = cert.partnerLogoUrl;

    if (p.includes('deeplearning') || b === 'deeplearning') {
      primaryLogo = '/logos/deeplearning-trimmed.png';
      if (p.includes('stanford') || cert.partner?.toLowerCase().includes('stanford')) {
        partnerLogo = '/logos/stanford-logo.svg';
      }
    } else if (p.includes('stanford') || b === 'stanford') {
      primaryLogo = '/logos/stanford-logo.svg';
    } else if (p.includes('ibm') || b === 'ibm') {
      primaryLogo = '/logos/ibm-logo.svg';
    } else if (p.includes('google cloud') || b === 'google-cloud') {
      primaryLogo = '/logos/google_cloud-logo.svg';
    } else if (p.includes('cisco') || b === 'cisco') {
      primaryLogo = '/logos/cisco-logo.svg';
    } else if (p.includes('capaciti') || b === 'capaciti') {
      primaryLogo = '/logos/capaciti-symbol.webp';
    } else if (p.includes('college of cape town') || p.includes('cct') || b === 'cct') {
      primaryLogo = '/logos/cct-logo.svg';
    } else if (p.includes('google') || b === 'google') {
      primaryLogo = '/logos/google-logo.svg';
    } else if (p.includes('coursera') || b === 'coursera') {
      primaryLogo = '/logos/coursera-logo.webp';
    } else if (p.includes('matric') || p.includes('basic education') || p.includes('umalusi') || b === 'matric') {
      primaryLogo = '/logos/dbe-symbol.png';
      partnerLogo = '/logos/umalusi-logo.webp';
    }

    return { primaryLogo, partnerLogo };
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
  const isCoursera = certification.credentialUrl?.includes('coursera') || certification.category === 'Specialization' || certification.category === 'Course';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="verification-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
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
              <div className="w-12 h-12 rounded-2xl bg-white p-2 shrink-0 flex items-center justify-center shadow-md border border-white/20">
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
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-slate-800 text-sm space-y-5 bg-slate-50/50">
          {activeTab === 'certificate' ? (
            /* Authentic Coursera / Institutional Digital Certificate Graphic */
            <div className="bg-white rounded-2xl border-2 border-slate-300/80 p-6 sm:p-8 shadow-md relative overflow-hidden text-center select-text">
              {/* Outer double border certificate styling */}
              <div className="absolute inset-2 border border-slate-200 pointer-events-none rounded-xl" />
              
              {/* Top certificate header logos */}
              <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  {primaryLogo && (
                    <img
                      src={primaryLogo}
                      alt={certification.provider}
                      className="h-9 max-w-[140px] object-contain"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {partnerLogo && (
                    <>
                      <span className="text-slate-300 text-lg font-light">•</span>
                      <img
                        src={partnerLogo}
                        alt="Partner organization"
                        className="h-9 max-w-[140px] object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </>
                  )}
                </div>

                {isCoursera && (
                  <div className="flex items-center gap-1.5 opacity-90">
                    <img
                      src="/logos/coursera-logo.webp"
                      alt="Coursera"
                      className="h-6 object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Certificate Type Label */}
              <div className="relative z-10 mb-4">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                  {certification.category ? `${certification.category.toUpperCase()} CERTIFICATE` : 'COURSE CERTIFICATE'}
                </span>
              </div>

              {/* Recipient Announcement */}
              <div className="relative z-10 mb-2">
                <p className="text-xs sm:text-sm text-slate-500 font-serif italic">This is to certify that</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mt-1 mb-2">
                  {displayName}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-serif italic">
                  has successfully completed
                </p>
              </div>

              {/* Certificate Course / Qualification Title */}
              <div className="relative z-10 mb-6 max-w-xl mx-auto">
                <h3 className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight font-sans">
                  {certification.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  an online authorized course or specialization offered through {certification.provider}
                </p>
              </div>

              {/* Certificate Bottom Signatures & Seal */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-left">
                {/* Signatures & Organization */}
                <div className="space-y-1 text-center sm:text-left">
                  <div className="h-6 flex items-end">
                    <span className="font-serif italic text-sm text-slate-700 tracking-wide">
                      {certification.provider} Faculty & Program Board
                    </span>
                  </div>
                  <div className="w-48 h-px bg-slate-300 my-1 mx-auto sm:mx-0" />
                  <p className="text-[10px] font-mono text-slate-500 uppercase">Authorized Signature & Verification</p>
                </div>

                {/* Medallion Seal */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 p-0.5 shadow-md flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center text-white p-1">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span className="text-[8px] font-mono font-bold tracking-wider text-amber-300 uppercase">
                        VERIFIED
                      </span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    <p className="font-semibold text-slate-700">{certification.date}</p>
                    <p className="truncate max-w-[130px]">ID: {certification.credentialId || 'VERIFIED-RECORD'}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Tab: Details & Skills */
            <div className="space-y-4">
              {/* Verification Status Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                      Accreditation Status
                    </p>
                    <p className="text-xs text-emerald-800 font-medium">
                      Formally Verified & Authentic Record
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-white text-emerald-700 border border-emerald-200 shadow-2xs">
                  ACTIVE
                </span>
              </div>

              {/* Facts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-1">
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    <span>Recipient</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{displayName}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Completion Date</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{certification.date}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs sm:col-span-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1">
                    <div className="flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-blue-600" />
                      <span>Credential ID</span>
                    </div>
                    {certification.credentialId && (
                      <button
                        onClick={handleCopyId}
                        className="flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-700 font-mono font-semibold"
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
                  <p className="font-mono text-xs font-semibold text-slate-900 break-all bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                    {certification.credentialId || 'CREDENTIAL-RECORD-VERIFIED'}
                  </p>
                </div>
              </div>

              {/* Curriculum Focus */}
              {certification.focus && (
                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100">
                  <div className="flex items-center gap-1.5 text-xs text-blue-700 font-mono font-semibold mb-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Curriculum & Competency Focus</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {certification.focus}
                  </p>
                </div>
              )}

              {/* Verified Technical Skills */}
              {certification.skillsVerified && certification.skillsVerified.length > 0 && (
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Verified Technical Skills</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {certification.skillsVerified.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 text-slate-800 border border-slate-200/80"
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
        <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <a
              href={linkedInAddUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors"
              title="Add this verified credential directly to your LinkedIn profile"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-700" />
              <span>Add to LinkedIn</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            {certification.credentialUrl ? (
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                <span>Visit Official Registry</span>
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
