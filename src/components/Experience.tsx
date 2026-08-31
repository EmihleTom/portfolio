import React, { useState } from 'react';
import {
  Briefcase,
  Calendar,
  Building2,
  CheckCircle2,
  TrendingUp,
  Award,
  Clock,
  Plus,
  Pencil,
  Trash2,
  MapPin,
} from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';
import { ExperienceItem } from '../types';
import { AddExperienceModal } from './AddExperienceModal';
import { SectionReveal } from './SectionReveal';

export const Experience: React.FC = () => {
  const { experienceList, addExperience, editExperience, deleteExperience, isEditMode } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ExperienceItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (data: Omit<ExperienceItem, 'id'> & { id?: string }) => {
    if (editingItem) {
      editExperience(editingItem.id, data);
    } else {
      addExperience(data);
    }
  };

  const handleDelete = (id: string, role: string) => {
    if (window.confirm(`Are you sure you want to remove "${role}"?`)) {
      deleteExperience(id);
    }
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/60 scroll-mt-20">
      <SectionReveal className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>Career & Development</span>
            </div>
            <h2 id="experience-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Professional Experience
            </h2>
            <p className="mt-2 text-slate-600 text-base sm:text-lg max-w-2xl">
              Industry training, internships, technical support positions, and academic systems projects.
            </p>
          </div>

          {isEditMode && (
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Experience</span>
            </button>
          )}
        </div>

        {/* Status Callout */}
        <div className="mb-10 p-5 rounded-2xl frosted-glass-card bento-item border border-white/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-50/90 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-2xs">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Technical Roles & Experience Track
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Hands-on Information Technology Support Technician experience at CAPACITI, driving hardware diagnostics, system maintenance, and user support.
              </p>
            </div>
          </div>
          <span className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50/90 text-blue-700 border border-blue-200/80 flex items-center gap-1.5">
            <span>Status: Open to Opportunities</span>
          </span>
        </div>

        {/* Experience Timeline Items */}
        <div className="space-y-6">
          {experienceList.map((item) => (
            <div
              key={item.id}
              id={`experience-item-${item.id}`}
              className="group/card frosted-glass-card bento-item rounded-3xl border border-white/80 p-6 sm:p-8 shadow-xs relative overflow-hidden transition-all hover:border-blue-200"
            >
              {/* Header: Role & Organization */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-100/80">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-3 py-0.5 rounded-full text-[11px] font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                      Technical Experience
                    </span>
                    {item.location && (
                      <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{item.location}</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-700 mt-1">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-sm sm:text-base text-slate-800">{item.organization}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-600 frosted-pill px-3.5 py-1.5 rounded-full border border-white/80 shadow-2xs">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{item.dates}</span>
                  </div>
                  {isEditMode && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Edit experience"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.role)}
                        className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete experience"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Core Breakdown: 3 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                {/* 1. Responsibilities */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Responsibilities</span>
                  </h4>
                  <ul className="space-y-2">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="text-xs text-slate-600 leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Skills Gained */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                    <span>Skills Gained</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.skillsGained.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-full frosted-pill text-slate-700 text-xs font-mono border border-white/80 shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Achievements */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    <span>Key Achievements</span>
                  </h4>
                  <ul className="space-y-2">
                    {item.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="text-xs text-slate-600 leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* Quick Add Slot Card (Owner Mode Only) */}
          {isEditMode && (
            <div
              onClick={handleOpenAdd}
              className="cursor-pointer border-2 border-dashed border-blue-200 hover:border-blue-400 rounded-3xl p-6 frosted-glass-subtle text-center flex flex-col items-center justify-center transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-2 group-hover:scale-105 transition-transform shadow-2xs">
                <Plus className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Add New Experience Item
              </h4>
              <p className="text-xs text-slate-500 max-w-md mt-1">
                Click here to log a work role, internship, or collaborative technical engagement.
              </p>
            </div>
          )}
        </div>
      </SectionReveal>

      {isEditMode && (
        <AddExperienceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialExperience={editingItem}
        />
      )}
    </section>
  );
};
