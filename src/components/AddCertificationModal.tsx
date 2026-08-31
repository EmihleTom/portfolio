import React, { useState, useEffect } from 'react';
import { X, Award, Check, ExternalLink } from 'lucide-react';
import { CertificationItem } from '../types';

interface AddCertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cert: Omit<CertificationItem, 'id'> & { id?: string }) => void;
  initialCertification?: CertificationItem | null;
}

export const AddCertificationModal: React.FC<AddCertificationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialCertification,
}) => {
  const [name, setName] = useState('');
  const [provider, setProvider] = useState('');
  const [focus, setFocus] = useState('');
  const [date, setDate] = useState('2025');
  const [credentialId, setCredentialId] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [skillsVerified, setSkillsVerified] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialCertification) {
      setName(initialCertification.name);
      setProvider(initialCertification.provider);
      setFocus(initialCertification.focus || '');
      setDate(initialCertification.date);
      setCredentialId(initialCertification.credentialId || '');
      setCredentialUrl(initialCertification.credentialUrl || '');
      setSkillsVerified(initialCertification.skillsVerified ? initialCertification.skillsVerified.join(', ') : '');
    } else {
      setName('');
      setProvider('');
      setFocus('');
      setDate('2025');
      setCredentialId('');
      setCredentialUrl('');
      setSkillsVerified('Active Directory, Hardware Repair, Networking, Helpdesk Support');
    }
    setError(null);
  }, [initialCertification, isOpen]);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: {
    name: string;
    provider: string;
    focus: string;
    skills: string;
    idPrefix: string;
    date?: string;
  }) => {
    setName(preset.name);
    setProvider(preset.provider);
    setFocus(preset.focus);
    setSkillsVerified(preset.skills);
    setCredentialId(preset.idPrefix);
    if (preset.date) {
      setDate(preset.date);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a certification title.');
      return;
    }
    if (!provider.trim()) {
      setError('Please enter the issuing provider (e.g. CAPACITI, College of Cape Town, Cisco).');
      return;
    }

    const skillsList = skillsVerified
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      id: initialCertification ? initialCertification.id : undefined,
      name: name.trim(),
      provider: provider.trim(),
      focus: focus.trim() || undefined,
      date: date.trim() || '2025',
      credentialId: credentialId.trim() || undefined,
      credentialUrl: credentialUrl.trim() || undefined,
      skillsVerified: skillsList.length > 0 ? skillsList : undefined,
      isPlaceholder: false,
    });

    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-white/95 rounded-3xl border border-white/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-2xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                {initialCertification ? 'Edit Certification' : 'Add Certification'}
              </h3>
              <p className="text-xs text-slate-500">
                Showcase your accredited badges, exams passed, and technical qualifications.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Quick presets */}
          {!initialCertification && (
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Quick Template Presets
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset({
                      name: 'IT Support Technician Certification',
                      provider: 'CAPACITI',
                      focus: 'Technical Support, System Maintenance, Troubleshooting',
                      skills: 'Active Directory, Hardware Repair, Networking, Helpdesk Support, System Maintenance, Troubleshooting',
                      idPrefix: 'CAP-IT-2026-884',
                      date: '2026 – Present',
                    })
                  }
                  className="px-2.5 py-1 text-xs rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60 font-medium transition-colors"
                >
                  CAPACITI IT Support (2026-Present)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset({
                      name: 'Cisco IT Specialist (CCNA)',
                      provider: 'College of Cape Town / Cisco Networking Academy',
                      focus: 'Cisco Certified Network Associate (CCNA) — Routing, Switching, Subnetting & Network Security',
                      skills: 'CCNA Routing & Switching, IPv4 & IPv6 Subnetting, Cisco Packet Tracer, VLANs & Trunks, Network Security, Hardware Diagnostics',
                      idPrefix: 'CCT-CISCO-CCNA-2025',
                      date: '2025 – 2025',
                    })
                  }
                  className="px-2.5 py-1 text-xs rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/60 font-medium transition-colors"
                >
                  Cisco IT Specialist (2025-2025)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset({
                      name: 'Matric Certificate (National Senior Certificate)',
                      provider: 'Department of Basic Education / Umalusi',
                      focus: 'National Senior Certificate (Grade 12 Matric Qualification - Completed 2024)',
                      skills: 'Mathematical Foundations, Analytical Thinking, English Communication, Computer Applications & Literacy',
                      idPrefix: 'DBE-NSC-MATRIC-2024',
                      date: '2024',
                    })
                  }
                  className="px-2.5 py-1 text-xs rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60 font-medium transition-colors"
                >
                  Matric Certificate (Completed 2024)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset({
                      name: 'Cisco Certified Support Technician (CCST) - Networking',
                      provider: 'Cisco Networking Academy',
                      focus: 'Network Protocols, IP Addressing, Packet Tracer & Troubleshooting',
                      skills: 'Networking, Cisco Packet Tracer, IPv4 & IPv6 Subnetting, Switch Configuration, TCP/IP',
                      idPrefix: 'CSCO-ID-914285',
                    })
                  }
                  className="px-2.5 py-1 text-xs rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200/60 font-medium transition-colors"
                >
                  Cisco CCST
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset({
                      name: 'Google IT Support Professional Certificate',
                      provider: 'Google / Coursera',
                      focus: 'Operating Systems, System Administration, Security & Troubleshooting',
                      skills: 'Helpdesk Support, Active Directory, Linux & Windows CLI, Hardware Diagnostics, Customer Service',
                      idPrefix: 'GOOG-IT-642109',
                    })
                  }
                  className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60 font-medium transition-colors"
                >
                  Google IT Support
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Certification Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. IT Support Technician Certification"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Issuing Provider / Organization *
              </label>
              <input
                type="text"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                placeholder="e.g. CAPACITI or College of Cape Town"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Issue Date / Year
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. 2025"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Focus / Specialization Area
            </label>
            <input
              type="text"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              placeholder="e.g. Technical Support, System Maintenance, Troubleshooting"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Credential ID (optional)
              </label>
              <input
                type="text"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                placeholder="e.g. CAP-IT-2025-884"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Verification Link URL (optional)
              </label>
              <div className="relative">
                <ExternalLink className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="url"
                  value={credentialUrl}
                  onChange={(e) => setCredentialUrl(e.target.value)}
                  placeholder="https://capaciti.org.za/verify/..."
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono text-xs"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Key Technical Skills Verified (comma-separated)
            </label>
            <input
              type="text"
              value={skillsVerified}
              onChange={(e) => setSkillsVerified(e.target.value)}
              placeholder="e.g. Active Directory, Hardware Repair, Networking, Helpdesk Support"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono text-xs"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-all shadow-xs flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{initialCertification ? 'Update' : 'Save'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
