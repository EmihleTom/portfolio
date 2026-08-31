import React, { useState, useEffect } from 'react';
import { X, Briefcase, Check } from 'lucide-react';
import { ExperienceItem } from '../types';

interface AddExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exp: Omit<ExperienceItem, 'id'> & { id?: string }) => void;
  initialExperience?: ExperienceItem | null;
}

export const AddExperienceModal: React.FC<AddExperienceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialExperience,
}) => {
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [dates, setDates] = useState('');
  const [location, setLocation] = useState('Cape Town, South Africa');
  const [responsibilities, setResponsibilities] = useState('');
  const [skillsGained, setSkillsGained] = useState('');
  const [achievements, setAchievements] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialExperience) {
      setRole(initialExperience.role);
      setOrganization(initialExperience.organization);
      setDates(initialExperience.dates);
      setLocation(initialExperience.location || 'Cape Town, South Africa');
      setResponsibilities(initialExperience.responsibilities.join('\n'));
      setSkillsGained(initialExperience.skillsGained.join(', '));
      setAchievements(initialExperience.achievements.join('\n'));
    } else {
      setRole('');
      setOrganization('');
      setDates('2025 – Present');
      setLocation('Cape Town, South Africa');
      setResponsibilities('Assisted with network installations and workstation setup\nTroubleshot client hardware and software configurations\nDocumented standard operating procedures and technical resolutions');
      setSkillsGained('Hardware Troubleshooting, Cisco Networking, Technical Support');
      setAchievements('Recognized for swift technical troubleshooting and team collaboration');
    }
    setError(null);
  }, [initialExperience, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim()) {
      setError('Please provide a role or job title.');
      return;
    }
    if (!organization.trim()) {
      setError('Please provide an organization or company name.');
      return;
    }

    const respList = responsibilities
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const skillsList = skillsGained
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const achList = achievements
      .split('\n')
      .map((a) => a.trim())
      .filter(Boolean);

    onSave({
      id: initialExperience ? initialExperience.id : undefined,
      role: role.trim(),
      organization: organization.trim(),
      dates: dates.trim() || '2025',
      location: location.trim(),
      responsibilities: respList.length > 0 ? respList : ['Technical contributions and systems support'],
      skillsGained: skillsList.length > 0 ? skillsList : ['Technical Support', 'Troubleshooting'],
      achievements: achList.length > 0 ? achList : ['Successful project milestones completed'],
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
      <div className="relative w-full max-w-xl bg-white/95 rounded-3xl border border-white/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-2xs">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                {initialExperience ? 'Edit Experience Item' : 'Add Professional Experience'}
              </h3>
              <p className="text-xs text-slate-500">
                Record your work roles, technical internships, or freelance experience.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Role / Job Title *
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Junior IT Support Specialist"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Company / Organization *
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. College of Cape Town"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Dates / Time Period
              </label>
              <input
                type="text"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                placeholder="e.g. 2024 – 2025 or Jan 2025 – Present"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Cape Town, South Africa"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Key Responsibilities (one per line)
            </label>
            <textarea
              rows={3}
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder="Configured network devices and desktop software&#10;Diagnosed hardware failures and network connectivity issues"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all text-xs leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Skills Gained (comma-separated)
            </label>
            <input
              type="text"
              value={skillsGained}
              onChange={(e) => setSkillsGained(e.target.value)}
              placeholder="e.g. Cisco Networking, Hardware Assembly, Linux CLI, Active Directory"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Key Achievements (one per line)
            </label>
            <textarea
              rows={2}
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
              placeholder="Completed laboratory installations with 100% test pass rate"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all text-xs leading-relaxed"
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
              <span>{initialExperience ? 'Update Experience' : 'Save Experience'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
