import React, { useState, useEffect } from 'react';
import { X, FolderGit2, Plus, Sparkles, Check, Trash2, ExternalLink, Github } from 'lucide-react';
import { ProjectItem } from '../types';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Omit<ProjectItem, 'id'> & { id?: string }) => void;
  initialProject?: ProjectItem | null;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProject,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Lead Developer');
  const [description, setDescription] = useState('');
  const [techInput, setTechInput] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProject) {
      setName(initialProject.name);
      setRole(initialProject.role || 'Lead Developer');
      setDescription(initialProject.description);
      setTechInput(initialProject.technologies.join(', '));
      setFeaturesInput(initialProject.keyFeatures.join('\n'));
      setGithubUrl(initialProject.githubUrl || '');
      setLiveUrl(initialProject.liveUrl || '');
      setScreenshotUrl(initialProject.screenshotUrl || '');
    } else {
      setName('');
      setRole('IT Specialist & Developer');
      setDescription('');
      setTechInput('');
      setFeaturesInput('');
      setGithubUrl('https://github.com/EmihleTom');
      setLiveUrl('');
      setScreenshotUrl('');
    }
    setError(null);
  }, [initialProject, isOpen]);

  const handleApplyPreset = (preset: {
    name: string;
    role: string;
    description: string;
    tech: string;
    features: string;
    githubUrl?: string;
    liveUrl?: string;
  }) => {
    setName(preset.name);
    setRole(preset.role);
    setDescription(preset.description);
    setTechInput(preset.tech);
    setFeaturesInput(preset.features);
    if (preset.githubUrl) setGithubUrl(preset.githubUrl);
    if (preset.liveUrl) setLiveUrl(preset.liveUrl);
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a project name.');
      return;
    }
    if (!description.trim()) {
      setError('Please enter a brief project description.');
      return;
    }

    const technologies = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const keyFeatures = featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    onSave({
      id: initialProject ? initialProject.id : undefined,
      name: name.trim(),
      role: role.trim() || 'Contributor',
      description: description.trim(),
      technologies: technologies.length > 0 ? technologies : ['Software Development', 'Web'],
      keyFeatures: keyFeatures.length > 0 ? keyFeatures : ['Responsive Design', 'Modular Architecture'],
      githubUrl: githubUrl.trim() || undefined,
      liveUrl: liveUrl.trim() || undefined,
      screenshotUrl: screenshotUrl.trim() || undefined,
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
      <div className="relative w-full max-w-2xl bg-white/95 rounded-3xl border border-white/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-2xs">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                {initialProject ? 'Edit Project Details' : 'Add New Project'}
              </h3>
              <p className="text-xs text-slate-500">
                Showcase your software build, repository, and technical achievements.
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
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {!initialProject && (
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-900 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Quick-Start Templates (Click to pre-fill or customize)</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset({
                      name: 'AI Workplace Productivity Assistant',
                      role: 'Full-Stack Developer & AI Integrator',
                      description:
                        'A modern, responsive web application designed to help professionals automate repetitive workplace tasks using Artificial Intelligence. Provides AI-powered tools for intelligent multi-tone email drafting, meeting notes summarization with action-item extraction, Eisenhower Matrix task scheduling, and an interactive assistant.',
                      tech: 'React, TypeScript, Tailwind CSS, OpenAI API, Vite, TanStack Router, Radix UI',
                      features:
                        'Smart Email Generator supporting multiple professional tones\nMeeting Notes Summarizer with action items and decision tracking\nAI Task Planner with Eisenhower Matrix categorization\nAI Research Assistant transforming reports into actionable insights\nInteractive AI Chatbot with context-aware productivity templates',
                      githubUrl: 'https://github.com/EmihleTom/AI-Productivity-Assistant',
                    })
                  }
                  className="px-3 py-1.5 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold transition-colors cursor-pointer shadow-2xs active:scale-95"
                >
                  AI Productivity Assistant (GitHub)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset({
                      name: 'IT Helpdesk & Ticket Management System',
                      role: 'IT Support Technician',
                      description:
                        'Internal IT support ticketing web application to log, triage, and resolve hardware faults, workstation issues, and user requests with priority status tracking.',
                      tech: 'React, TypeScript, Tailwind CSS, Local Storage',
                      features:
                        'User ticket logging & status workflow\nHardware asset categorization\nResolution time tracking & priority filtering',
                      githubUrl: 'https://github.com/EmihleTom',
                    })
                  }
                  className="px-2.5 py-1 text-xs rounded-lg bg-white text-blue-700 hover:bg-blue-100 border border-blue-200/60 font-medium transition-colors cursor-pointer"
                >
                  IT Helpdesk System
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset({
                      name: 'Cisco Enterprise Multi-VLAN Network Simulation',
                      role: 'Network Systems Specialist',
                      description:
                        'Comprehensive campus network simulation built in Cisco Packet Tracer with inter-VLAN routing, OSPF dynamic routing, and redundant access switching.',
                      tech: 'Cisco Packet Tracer, CCNA Routing & Switching, IPv4/IPv6, ACLs, VLANs',
                      features:
                        'Dual-switch VLAN trunking and VTP domains\nOSPF multi-area dynamic routing\nFirewall access-lists (ACLs) & NAT security',
                      githubUrl: 'https://github.com/EmihleTom',
                    })
                  }
                  className="px-2.5 py-1 text-xs rounded-lg bg-white text-indigo-700 hover:bg-indigo-100 border border-indigo-200/60 font-medium transition-colors cursor-pointer"
                >
                  Cisco Network Topology
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset({
                      name: 'PC Hardware Diagnostics & Asset Audit Tool',
                      role: 'Hardware & Systems Specialist',
                      description:
                        'Automated workstation hardware inventory, component health check, and system diagnostics utility.',
                      tech: 'PowerShell, Windows CLI, Active Directory, Hardware Diagnostics',
                      features:
                        'Automated CPU, RAM, and Disk SMART diagnostics\nWorkstation hardware asset logging\nSystem health export and error reporting',
                      githubUrl: 'https://github.com/EmihleTom',
                    })
                  }
                  className="px-2.5 py-1 text-xs rounded-lg bg-white text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60 font-medium transition-colors cursor-pointer"
                >
                  Hardware Diagnostics Tool
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset({
                      name: 'Modern Web Application & Dashboard',
                      role: 'Frontend & Web Developer',
                      description:
                        'High-performance interactive web application built with responsive UI, real-time client state persistence, and modular component architecture.',
                      tech: 'React, TypeScript, Tailwind CSS, Vite, Git',
                      features:
                        'Responsive layout across mobile and desktop\nAccessible UI design with modern aesthetics\nState persistence and clean modular code',
                      githubUrl: 'https://github.com/EmihleTom',
                    })
                  }
                  className="px-2.5 py-1 text-xs rounded-lg bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 font-medium transition-colors cursor-pointer"
                >
                  Web App / Dashboard
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Project Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Network Monitoring Tool"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Your Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Lead Developer, Systems Builder"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Description *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain what the project does, the problem it solves, and how it was implemented..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all leading-relaxed"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Technologies Used (comma-separated)
            </label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="e.g. React, TypeScript, Python, Cisco Packet Tracer, SQLite"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Key Features & Architectural Highlights (one per line)
            </label>
            <textarea
              rows={3}
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
              placeholder="Responsive user interface&#10;Integrated REST API and persistent storage&#10;Automated tests and deployment"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                GitHub Repository Link
              </label>
              <div className="relative">
                <Github className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/EmihleTom/my-project"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Live Preview / Demo URL (optional)
              </label>
              <div className="relative">
                <ExternalLink className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://my-app.vercel.app"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono text-xs"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Project Screenshot Image URL (optional)
            </label>
            <input
              type="text"
              value={screenshotUrl}
              onChange={(e) => setScreenshotUrl(e.target.value)}
              placeholder="e.g. /assets/my-project.png or https://i.imgur.com/..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono text-xs"
            />
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-all shadow-xs flex items-center justify-center gap-2 active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>{initialProject ? 'Update Project' : 'Save Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
