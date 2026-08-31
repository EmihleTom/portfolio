import React, { useState } from 'react';
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
  Pencil,
  Terminal,
  Server,
  Network,
  Cpu,
  Layers,
  Wrench,
  Search,
  Filter,
  Eye,
  GraduationCap,
} from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';
import { CertificationItem } from '../types';
import { AddCertificationModal } from './AddCertificationModal';
import { CredentialVerificationModal } from './CredentialVerificationModal';
import { SectionReveal } from './SectionReveal';

export const Certifications: React.FC = () => {
  const { certificationsList, personalInfo, addCertification, editCertification, deleteCertification, isEditMode } =
    usePortfolioData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [verifyingCert, setVerifyingCert] = useState<CertificationItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'it-support' | 'networking' | 'qualifications'>('all');

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

  // Helper to render issuer logo placeholder with modern IT/tech styling
  const renderIssuerLogo = (provider: string, badgeType?: string) => {
    const p = provider.toLowerCase();

    if (p.includes('capaciti') || badgeType === 'capaciti') {
      return (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white flex flex-col items-center justify-center shadow-md shrink-0 border border-blue-400/30">
          <span className="font-mono text-[9px] font-black tracking-tighter uppercase leading-none text-blue-200">
            CAPACITI
          </span>
          <Wrench className="w-4 h-4 text-white mt-0.5" />
        </div>
      );
    }

    if (p.includes('college of cape town') || p.includes('cct') || badgeType === 'cct') {
      return (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white flex flex-col items-center justify-center shadow-md shrink-0 border border-slate-700">
          <span className="font-mono text-[10px] font-black tracking-wider text-amber-300">
            CCT
          </span>
          <Server className="w-3.5 h-3.5 text-blue-300 mt-0.5" />
        </div>
      );
    }

    if (p.includes('cisco') || badgeType === 'cisco') {
      return (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-600 via-blue-700 to-slate-900 text-white flex flex-col items-center justify-center shadow-md shrink-0 border border-sky-400/30">
          <span className="font-mono text-[9px] font-black tracking-widest text-sky-200 uppercase">
            CISCO
          </span>
          <Network className="w-4 h-4 text-white mt-0.5" />
        </div>
      );
    }

    if (p.includes('google') || badgeType === 'google') {
      return (
        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center shadow-md shrink-0 text-slate-800">
          <span className="font-mono text-[10px] font-black tracking-wider text-blue-600">
            G
          </span>
          <Cpu className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />
        </div>
      );
    }

    if (
      p.includes('matric') ||
      p.includes('basic education') ||
      p.includes('umalusi') ||
      badgeType === 'matric'
    ) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 text-white flex flex-col items-center justify-center shadow-md shrink-0 border border-amber-400/30">
          <span className="font-mono text-[9px] font-black tracking-wider text-amber-200 uppercase">
            NSC
          </span>
          <GraduationCap className="w-4 h-4 text-white mt-0.5" />
        </div>
      );
    }

    // Default monogram logo placeholder
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

  // Helper to determine if a credential is a Matric / Secondary school certificate
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

  // Filter certifications based on category
  const filteredList = certificationsList.filter((cert) => {
    if (selectedFilter === 'all') return true;
    const text = (cert.name + ' ' + cert.provider + ' ' + (cert.focus || '')).toLowerCase();
    if (selectedFilter === 'it-support') {
      return text.includes('support') || text.includes('technician') || text.includes('maintenance') || text.includes('helpdesk');
    }
    if (selectedFilter === 'networking') {
      return text.includes('network') || text.includes('cisco') || text.includes('routing') || text.includes('protocols');
    }
    if (selectedFilter === 'qualifications') {
      return text.includes('diploma') || text.includes('qualification') || text.includes('college') || text.includes('matric') || text.includes('nsc');
    }
    return true;
  });

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/60 scroll-mt-20 relative"
    >
      <SectionReveal className="max-w-6xl mx-auto">
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
            <p className="mt-2 text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              Formally verified technical certifications, IT support credentials, and academic diplomas earned through <strong>CAPACITI</strong>, the <strong>College of Cape Town</strong>, and leading industry bodies.
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

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-2 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-2xs">
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              All Credentials ({certificationsList.length})
            </button>
            <button
              onClick={() => setSelectedFilter('it-support')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                selectedFilter === 'it-support'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              IT Support & Systems
            </button>
            <button
              onClick={() => setSelectedFilter('networking')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                selectedFilter === 'networking'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Networking & Infrastructure
            </button>
            <button
              onClick={() => setSelectedFilter('qualifications')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                selectedFilter === 'qualifications'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Formal Diplomas
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500 pr-2">
            <span>Registry Status: Active & Authentic</span>
          </div>
        </div>

        {/* Responsive Grid Layout: 1 col on mobile, 2-3 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredList.map((cert) => (
            <div
              key={cert.id}
              id={`cert-card-${cert.id}`}
              className="group/card bg-white/85 backdrop-blur-md rounded-3xl border border-white/90 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400 opacity-80" />

              <div>
                {/* Header: Logo placeholder, Badge, and Action Buttons */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  {/* Issuing Organization Logo Placeholder */}
                  <div className="flex items-center gap-3">
                    {renderIssuerLogo(cert.provider, cert.badgeType)}
                    <div>
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-700 block">
                        {cert.provider}
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                          <span>Verified</span>
                        </span>
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
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug mb-2 group-hover/card:text-blue-600 transition-colors">
                  {cert.name}
                </h3>

                {/* Curriculum Focus Tag if applicable */}
                {cert.focus && (
                  <p className="text-xs text-slate-600 mb-3.5 leading-relaxed bg-slate-50/80 p-2 rounded-xl border border-slate-100">
                    <strong className="text-slate-700 font-medium">Focus:</strong> {cert.focus}
                  </p>
                )}

                {/* Key Technical Skills Verified */}
                {cert.skillsVerified && cert.skillsVerified.length > 0 && (
                  <div className="mb-4">
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Key Technical Skills Verified
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsVerified.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-white/90 border border-slate-200/80 text-slate-700 shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Metadata & Verify Credential Action */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  {/* Date Earned */}
                  <div className="flex items-center gap-1 text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{cert.date}</span>
                  </div>

                  {/* Credential ID with Copy Button */}
                  {cert.credentialId ? (
                    <button
                      type="button"
                      onClick={(e) => handleCopyId(e, cert.credentialId!)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-mono transition-colors cursor-pointer"
                      title="Click to copy Credential ID"
                    >
                      <span>ID: {cert.credentialId}</span>
                      {copiedId === cert.credentialId ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-400" />
                      )}
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-mono">ID: Record Verified</span>
                  )}
                </div>

                {/* Primary Action: Verify Credential Button (Excluded for Matric Certificate) */}
                {isMatricCertificate(cert) ? (
                  <div className="flex items-center justify-between w-full py-2 px-3 rounded-xl bg-slate-50/90 border border-slate-200/80 text-slate-700 text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-semibold">National Senior Certificate (Endorsed)</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      DBE / Umalusi
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setVerifyingCert(cert)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer group/btn"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:text-white transition-colors" />
                      <span>Verify Credential</span>
                    </button>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors shrink-0"
                        title="Open external registry link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

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
                  Add / Replace Certificate
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Add additional certifications such as <strong>Cisco CCNA</strong>, <strong>CompTIA A+ / Security+</strong>, <strong>Microsoft Azure</strong>, or custom institutional badges to keep your portfolio credentials up to date.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5 text-blue-600 font-semibold group-hover:underline">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Certificate 3 or 4</span>
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
