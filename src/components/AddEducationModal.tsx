import React, { useState, useEffect } from 'react';
import { X, GraduationCap, Check } from 'lucide-react';
import { EducationItem } from '../types';

interface AddEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (edu: Omit<EducationItem, 'id'> & { id?: string }) => void;
  initialEducation?: EducationItem | null;
}

export const AddEducationModal: React.FC<AddEducationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialEducation,
}) => {
  const [qualification, setQualification] = useState('');
  const [institution, setInstitution] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Completed');
  const [description, setDescription] = useState('');
  const [focusAreas, setFocusAreas] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialEducation) {
      setQualification(initialEducation.qualification);
      setInstitution(initialEducation.institution);
      setStartDate(initialEducation.startDate);
      setEndDate(initialEducation.endDate);
      setStatus(initialEducation.status || 'Completed');
      setDescription(initialEducation.description);
      setFocusAreas(initialEducation.focusAreas.join(', '));
    } else {
      setQualification('');
      setInstitution('College of Cape Town');
      setStartDate('2025');
      setEndDate('2025');
      setStatus('Completed');
      setDescription('Comprehensive technical program focused on systems architecture, IT infrastructure, and modern software fundamentals.');
      setFocusAreas('Network Engineering, Systems Administration, Hardware Diagnostics, Software Foundations');
    }
    setError(null);
  }, [initialEducation, isOpen]);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: {
    qualification: string;
    institution: string;
    startDate: string;
    endDate: string;
    status: string;
    description: string;
    focusAreas: string;
  }) => {
    setQualification(preset.qualification);
    setInstitution(preset.institution);
    setStartDate(preset.startDate);
    setEndDate(preset.endDate);
    setStatus(preset.status);
    setDescription(preset.description);
    setFocusAreas(preset.focusAreas);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qualification.trim()) {
      setError('Please provide a qualification or program title.');
      return;
    }
    if (!institution.trim()) {
      setError('Please provide an institution or college.');
      return;
    }

    const areasList = focusAreas
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    onSave({
      id: initialEducation ? initialEducation.id : undefined,
      qualification: qualification.trim(),
      institution: institution.trim(),
      startDate: startDate.trim() || '2025',
      endDate: endDate.trim() || '2025',
      status: status.trim() || 'Completed',
      description: description.trim() || 'Technical educational milestone.',
      focusAreas: areasList.length > 0 ? areasList : ['Core Technical Competencies'],
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
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                {initialEducation ? 'Edit Education Record' : 'Add Education & Qualifications'}
              </h3>
              <p className="text-xs text-slate-500">
                Record your formal qualifications, diplomas, or degrees.
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

          {/* Quick Presets */}
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Quick Presets
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() =>
                  handleApplyPreset({
                    qualification: 'IT Support Technician Certification',
                    institution: 'CAPACITI',
                    startDate: '2026',
                    endDate: 'Present',
                    status: 'In Progress',
                    description:
                      'Specialized IT support immersion covering technical support, system maintenance, hardware repair, enterprise troubleshooting, and professional IT work readiness.',
                    focusAreas:
                      'Technical Support, System Maintenance, Active Directory, Troubleshooting',
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
                    qualification: 'Cisco IT Specialist (CCNA)',
                    institution: 'College of Cape Town',
                    startDate: '2025',
                    endDate: '2025',
                    status: 'Completed',
                    description:
                      'Specialized enterprise networking and systems qualification focused on Cisco Certified Network Associate (CCNA) curricula — routing, switching, IPv4/IPv6 subnetting, Packet Tracer topologies, network security, and infrastructure diagnostics.',
                    focusAreas:
                      'CCNA Routing & Switching, IPv4/IPv6 Subnetting, Cisco Packet Tracer, Network Security',
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
                    qualification: 'Matric (National Senior Certificate)',
                    institution: 'Department of Basic Education',
                    startDate: '2024',
                    endDate: '2024',
                    status: 'Completed',
                    description:
                      'Completed the National Senior Certificate (Grade 12 Matric) in 2024, focusing on mathematical principles, analytical reasoning, English communication, and computer literacy.',
                    focusAreas:
                      'Mathematical Foundations, Analytical Thinking, English Communication, Computer Literacy',
                  })
                }
                className="px-2.5 py-1 text-xs rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60 font-medium transition-colors"
              >
                Matric (Completed 2024)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Qualification / Program Title *
            </label>
            <input
              type="text"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              placeholder="e.g. Cisco IT Specialist or Diploma in IT"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Institution / College *
            </label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="e.g. College of Cape Town"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Start Date
              </label>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="e.g. Feb 2025"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                End Date
              </label>
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="e.g. Nov 2025"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Candidate">Candidate</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Program Summary
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of coursework and technical focus..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Key Competency Areas Covered (comma-separated)
            </label>
            <input
              type="text"
              value={focusAreas}
              onChange={(e) => setFocusAreas(e.target.value)}
              placeholder="e.g. Network Topologies, Router Configuration, Hardware Repair"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono"
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
              <span>{initialEducation ? 'Update' : 'Save'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
