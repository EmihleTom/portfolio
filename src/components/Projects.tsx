import React, { useState } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  Code,
  PlusCircle,
  Eye,
  Plus,
  Pencil,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';
import { ProjectItem } from '../types';
import { AddProjectModal } from './AddProjectModal';
import { SectionReveal } from './SectionReveal';

export const Projects: React.FC = () => {
  const { projectsList, personalInfo, addProject, editProject, deleteProject, isEditMode } = usePortfolioData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  const handleOpenAdd = (presetProject?: Partial<ProjectItem>) => {
    if (presetProject) {
      setEditingProject({
        id: '',
        name: presetProject.name || '',
        role: presetProject.role || 'IT Specialist & Developer',
        description: presetProject.description || '',
        technologies: presetProject.technologies || [],
        keyFeatures: presetProject.keyFeatures || [],
        githubUrl: presetProject.githubUrl || personalInfo.githubUrl,
        liveUrl: presetProject.liveUrl,
        screenshotUrl: presetProject.screenshotUrl,
      });
    } else {
      setEditingProject(null);
    }
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setIsAddModalOpen(true);
  };

  const handleSaveProject = (projectData: Omit<ProjectItem, 'id'> & { id?: string }) => {
    if (editingProject && editingProject.id) {
      editProject(editingProject.id, projectData);
    } else {
      addProject(projectData);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}"?`)) {
      deleteProject(id);
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/60 scroll-mt-20">
      <SectionReveal className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Showcase & Work</span>
            </div>
            <h2 id="projects-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Projects
            </h2>
            <p className="mt-2 text-slate-600 text-base sm:text-lg max-w-2xl">
              Practical implementations, technical solutions, and software developments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
            {isEditMode && (
              <button
                id="projects-add-button-top"
                type="button"
                onClick={() => handleOpenAdd()}
                className="inline-flex items-center justify-center min-h-[44px] gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            )}

            <a
              id="projects-github-cta-top"
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[44px] gap-2 px-4 py-2 rounded-full frosted-pill border border-white/90 text-slate-700 hover:text-blue-600 font-semibold text-xs transition-colors shadow-2xs"
            >
              <Github className="w-4 h-4 text-slate-700" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Projects Body: Empty State with Option to Add Projects */}
        {projectsList.length === 0 ? (
          isEditMode ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Main Interactive Callout */}
            <div
              id="projects-add-banner"
              className="lg:col-span-7 frosted-glass-card bento-item rounded-3xl border border-white/80 p-8 sm:p-10 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50/90 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs">
                    <FolderGit2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Project Showcase</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight mb-3">
                  Add Your Projects
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  Ready to showcase your practical work? Add your software applications, IT support solutions, network topologies (such as Cisco Packet Tracer simulations), or diagnostic tools with live links and GitHub repositories.
                </p>

                {/* Quick-start options */}
                <div className="mb-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                    Or choose a starter template:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenAdd({
                          name: 'IT Helpdesk & Ticket Management System',
                          role: 'IT Support Technician',
                          description:
                            'Internal IT support ticketing web application to log, triage, and resolve hardware faults, workstation issues, and user requests with priority status tracking.',
                          technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Local Storage'],
                          keyFeatures: [
                            'User ticket logging & status workflow',
                            'Hardware asset categorization',
                            'Resolution time tracking & priority filtering',
                          ],
                          githubUrl: personalInfo.githubUrl,
                        })
                      }
                      className="px-3 py-1.5 text-xs rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 font-medium transition-all shadow-2xs cursor-pointer"
                    >
                      IT Helpdesk System
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenAdd({
                          name: 'Cisco Enterprise Multi-VLAN Network Simulation',
                          role: 'Network Systems Specialist',
                          description:
                            'Comprehensive campus network simulation built in Cisco Packet Tracer with inter-VLAN routing, OSPF dynamic routing, and redundant access switching.',
                          technologies: ['Cisco Packet Tracer', 'CCNA Routing & Switching', 'IPv4/IPv6', 'ACLs'],
                          keyFeatures: [
                            'Dual-switch VLAN trunking and VTP domains',
                            'OSPF multi-area dynamic routing',
                            'Firewall access-lists (ACLs) & NAT security',
                          ],
                          githubUrl: personalInfo.githubUrl,
                        })
                      }
                      className="px-3 py-1.5 text-xs rounded-xl bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 font-medium transition-all shadow-2xs cursor-pointer"
                    >
                      Cisco Network Topology
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenAdd({
                          name: 'PC Hardware Diagnostics & Asset Audit Tool',
                          role: 'Hardware & Systems Specialist',
                          description:
                            'Automated workstation hardware inventory, component health check, and system diagnostics utility.',
                          technologies: ['PowerShell', 'Windows CLI', 'Active Directory', 'Diagnostics'],
                          keyFeatures: [
                            'Automated CPU, RAM, and Disk SMART diagnostics',
                            'Workstation hardware asset logging',
                            'System health export and error reporting',
                          ],
                          githubUrl: personalInfo.githubUrl,
                        })
                      }
                      className="px-3 py-1.5 text-xs rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 font-medium transition-all shadow-2xs cursor-pointer"
                    >
                      Hardware Diagnostics
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenAdd({
                          name: 'Modern Web Application & Dashboard',
                          role: 'Frontend & Web Developer',
                          description:
                            'High-performance interactive web application built with responsive UI, real-time client state persistence, and modular component architecture.',
                          technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
                          keyFeatures: [
                            'Responsive layout across mobile and desktop',
                            'Accessible UI design with modern aesthetics',
                            'State persistence and clean modular code',
                          ],
                          githubUrl: personalInfo.githubUrl,
                        })
                      }
                      className="px-3 py-1.5 text-xs rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium transition-all shadow-2xs cursor-pointer"
                    >
                      Web App / Dashboard
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100/90 flex flex-wrap items-center gap-3">
                <button
                  id="projects-add-button-main"
                  type="button"
                  onClick={() => handleOpenAdd()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Your Project</span>
                </button>

                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full frosted-pill border border-white/90 text-slate-700 hover:text-blue-600 font-semibold text-xs transition-colors shadow-2xs"
                >
                  <Github className="w-4 h-4 text-slate-700" />
                  <span>Browse GitHub Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Right Column: Blueprint Preview */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div
                id="projects-blueprint-card"
                className="frosted-glass-card bento-item rounded-3xl border border-dashed border-blue-200/90 p-6 flex flex-col justify-between h-full bg-blue-50/20"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-blue-100/70 mb-4">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700">
                      // Project Card Blueprint
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Preview</span>
                  </div>

                  {/* Mock Preview Card */}
                  <div className="rounded-2xl bg-white/90 border border-slate-200/80 p-4 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                        Role: Technical Specialist
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Live
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Your Project Title</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        Summary of problem solved, systems configured, and architecture implemented.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono">React</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono">Cisco Packet Tracer</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono">TypeScript</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-blue-600 font-semibold flex items-center gap-1">
                        <Github className="w-3 h-3" /> Source Code
                      </span>
                      <span className="text-slate-600 font-medium flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> Live Preview
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                    Adding projects automatically creates clean interactive cards with direct links to your GitHub code, architecture lists, and demo previews.
                  </p>
                </div>

                <div className="pt-4 border-t border-blue-100/80">
                  <button
                    type="button"
                    onClick={() => handleOpenAdd()}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
            <div className="frosted-glass-card bento-item rounded-3xl border border-white/80 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-4 shadow-2xs">
                <FolderGit2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2">Technical Projects & Repositories</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Active software developments, technical labs, and system builds are available directly on GitHub.
              </p>
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-blue-600 font-semibold text-xs transition-colors shadow-xs"
              >
                <Github className="w-4 h-4" />
                <span>Explore GitHub Repositories</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          )
        ) : (
          /* Projects Grid: When User Has Added Projects */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {projectsList.map((project) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="lg:col-span-8 frosted-glass-card bento-item rounded-3xl border border-white/80 overflow-hidden shadow-xs hover:border-blue-200 transition-all flex flex-col justify-between"
              >
                {/* Project Preview Canvas */}
                <div className="relative aspect-video min-h-[220px] sm:min-h-[260px] w-full bg-slate-950 overflow-hidden group">
                  {project.screenshotUrl ? (
                    <img
                      src={project.screenshotUrl}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-950 p-4 sm:p-6 flex flex-col justify-between font-mono text-[11px] sm:text-xs overflow-x-auto">
                      {/* Fake window top */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 sm:pb-3 text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                          <span className="ml-2 text-slate-400 font-sans text-xs truncate max-w-[160px] sm:max-w-xs">{project.name.toLowerCase().replace(/\s+/g, '-')}.tsx</span>
                        </div>
                        <span className="text-slate-500 text-[10px] sm:text-[11px]">System Preview</span>
                      </div>

                      {/* Mock code snippet */}
                      <div className="space-y-1 sm:space-y-1.5 text-slate-300 py-2 sm:py-4 opacity-90 leading-relaxed">
                        <p className="text-slate-500">// Technical application architecture</p>
                        <p>
                          <span className="text-blue-400">export const</span>{' '}
                          <span className="text-amber-300">{project.name.replace(/[^a-zA-Z0-9]/g, '')}</span> = {'{'}
                        </p>
                        <p className="pl-3 sm:pl-4">
                          <span className="text-slate-400">role:</span>{' '}
                          <span className="text-emerald-400">"{project.role}"</span>,
                        </p>
                        <p className="pl-3 sm:pl-4">
                          <span className="text-slate-400">status:</span>{' '}
                          <span className="text-blue-300">"Production Build"</span>,
                        </p>
                        <p className="pl-3 sm:pl-4">
                          <span className="text-slate-400">technologies:</span> [
                          {project.technologies.slice(0, 3).map((t, idx) => (
                            <span key={idx} className="text-amber-200">
                              {idx > 0 ? ', ' : ''}"{t}"
                            </span>
                          ))}
                          ]
                        </p>
                        <p>{'}'};</p>
                      </div>

                      {/* Bottom bar inside screenshot */}
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 border-t border-slate-800/80 pt-2">
                        <span className="flex items-center gap-1 text-slate-400">
                          <Code className="w-3 h-3 text-blue-400" />
                          <span>Source Verified</span>
                        </span>
                        <span className="font-mono text-slate-400">Architecture v1.0</span>
                      </div>
                    </div>
                  )}

                  {/* Edit & Delete Floating Controls (Owner Mode Only) */}
                  {isEditMode && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center gap-1.5 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(project)}
                        className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-slate-900/85 hover:bg-slate-900 text-slate-200 hover:text-white border border-slate-700 backdrop-blur-md transition-all shadow-xs active:scale-95 cursor-pointer"
                        title="Edit project"
                        aria-label="Edit project"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(project.id, project.name)}
                        className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-slate-900/85 hover:bg-rose-900/95 text-slate-200 hover:text-rose-200 border border-slate-700 backdrop-blur-md transition-all shadow-xs active:scale-95 cursor-pointer"
                        title="Delete project"
                        aria-label="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Project Card Body */}
                <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta line: Role and Category */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                        Role: {project.role}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight mb-3">
                      {project.name}
                    </h3>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Key Features List */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-600" />
                        <span>Key Features & Architecture</span>
                      </h4>
                      <ul className="space-y-2">
                        {project.keyFeatures.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies Used */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-full frosted-pill text-slate-800 text-xs font-mono font-medium border border-white/90 shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Links / Action Buttons */}
                  <div className="pt-5 border-t border-slate-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                      {project.githubUrl ? (
                        <a
                          id={`project-github-link-${project.id}`}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-all shadow-xs active:scale-95"
                        >
                          <Github className="w-4 h-4" />
                          <span>Source Code</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </a>
                      ) : (
                        isEditMode ? (
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(project)}
                            className="inline-flex items-center justify-center min-h-[44px] gap-2 px-4 py-2.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/80 hover:bg-blue-100 transition-colors cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add GitHub Link</span>
                          </button>
                        ) : null
                      )}

                      {project.liveUrl ? (
                        <a
                          id={`project-live-link-${project.id}`}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center min-h-[44px] gap-2 px-4 py-2.5 rounded-full bg-white/80 border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-white transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-blue-600" />
                          <span>Live Preview</span>
                        </a>
                      ) : (
                        isEditMode ? (
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(project)}
                            className="inline-flex items-center justify-center min-h-[44px] gap-2 px-4 py-2.5 rounded-full bg-white/60 text-slate-600 text-xs font-mono border border-slate-200/80 hover:bg-white transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span>Add Live Demo Link</span>
                          </button>
                        ) : null
                      )}
                    </div>

                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(project)}
                        className="font-mono text-xs text-blue-600 hover:underline flex items-center justify-center sm:justify-start gap-1 py-1 cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit details</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Right Column: Project Slot & Add Action */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              <div
                id="projects-future-card"
                className="frosted-glass-card bento-item rounded-3xl border border-white/80 p-6 flex flex-col justify-between h-full shadow-2xs"
              >
                {isEditMode ? (
                  <>
                    <div>
                      <div className="w-10 h-10 rounded-2xl bg-blue-50/90 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-2xs">
                        <PlusCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950 tracking-tight mb-1">
                        Add Your Project
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        Add another personal, academic, or open-source software application to your portfolio with live links.
                      </p>

                      <div className="p-4 rounded-2xl frosted-glass-subtle border border-white/80 text-xs text-slate-700 space-y-2 mb-4 font-mono">
                        <p className="font-semibold text-slate-900">// Each project includes:</p>
                        <ul className="space-y-1.5 text-[11px] text-slate-600 list-disc list-inside">
                          <li>Project name & description</li>
                          <li>Specific role definition</li>
                          <li>Technologies & stack badges</li>
                          <li>Key architectural features</li>
                          <li>Direct GitHub repository link</li>
                          <li>Live deployment link</li>
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100/80 space-y-2">
                      <button
                        type="button"
                        onClick={() => handleOpenAdd()}
                        className="w-full inline-flex items-center justify-center min-h-[44px] gap-2 px-4 py-2.5 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Project Now</span>
                      </button>
                      <a
                        href={personalInfo.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center min-h-[44px] gap-2 px-4 py-2 rounded-full frosted-pill border border-white/90 text-slate-700 text-xs font-semibold hover:bg-white transition-all shadow-2xs"
                      >
                        <Github className="w-4 h-4 text-slate-600" />
                        <span>View GitHub Repos</span>
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="w-10 h-10 rounded-2xl bg-blue-50/90 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-2xs">
                        <Github className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950 tracking-tight mb-1">
                        Source Repositories
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        Explore open-source technical repositories, automation scripts, and full-stack software applications on GitHub.
                      </p>

                      <div className="p-4 rounded-2xl frosted-glass-subtle border border-white/80 text-xs text-slate-700 space-y-2 mb-4 font-mono">
                        <p className="font-semibold text-slate-900">// Technical Competencies:</p>
                        <ul className="space-y-1.5 text-[11px] text-slate-600 list-disc list-inside">
                          <li>Cisco Packet Tracer topologies</li>
                          <li>Full-stack React & TypeScript apps</li>
                          <li>PowerShell system audit tools</li>
                          <li>Modular database schemas</li>
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100/80">
                      <a
                        href={personalInfo.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center min-h-[44px] gap-2 px-4 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-all shadow-xs"
                      >
                        <Github className="w-4 h-4" />
                        <span>Explore GitHub Profile</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </SectionReveal>

      {/* Modal */}
      {isEditMode && (
        <AddProjectModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveProject}
          initialProject={editingProject}
        />
      )}
    </section>
  );
};
