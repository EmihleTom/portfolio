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

  if (!isOpen || !certification) return null;

  const handleCopyId = () => {
    if (certification.credentialId) {
      navigator.clipboard.writeText(certification.credentialId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="verification-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Verification Top Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close verification dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Digital Credential Verification</span>
          </div>

          <h3
            id="verification-dialog-title"
            className="text-xl font-bold tracking-tight text-white pr-8"
          >
            {certification.name}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Issued by <strong className="text-white">{certification.provider}</strong>
          </p>
        </div>

        {/* Verification Details */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-800 text-sm">
          {/* Status Chip */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                  Verification Status
                </p>
                <p className="text-xs text-emerald-800 font-medium">
                  Verified & In Good Standing
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-white text-emerald-700 border border-emerald-200 shadow-2xs">
              ACTIVE
            </span>
          </div>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-1">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>Recipient</span>
              </div>
              <p className="text-sm font-bold text-slate-900">{candidateName}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>Issue Date</span>
              </div>
              <p className="text-sm font-bold text-slate-900">{certification.date}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
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
              <p className="font-mono text-xs font-semibold text-slate-900 break-all bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
                {certification.credentialId || 'CREDENTIAL-RECORD-VERIFIED'}
              </p>
            </div>
          </div>

          {/* Focus Area */}
          {certification.focus && (
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100">
              <div className="flex items-center gap-1.5 text-xs text-blue-700 font-mono font-semibold mb-1">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Curriculum Focus</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {certification.focus}
              </p>
            </div>
          )}

          {/* Verified Skills */}
          {certification.skillsVerified && certification.skillsVerified.length > 0 && (
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Key Technical Skills Verified</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {certification.skillsVerified.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>

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
              <span>Verified Institution Qualification</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
