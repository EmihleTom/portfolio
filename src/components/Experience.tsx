import React, { useState } from 'react';
import { motion } from 'motion/react';
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
        <div className="mb-10 p-5 rounded-2xl frosted-glass-card bento-item border border-white/80 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white logo-plate border border-slate-200/90 dark:border-white/20 flex items-center justify-center p-2 text-blue-600 shrink-0 shadow-2xs overflow-hidden">
              <img
                src="/logos/capaciti-symbol.webp"
                alt="CAPACITI logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Technical Roles & Experience Track
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[10px] font-mono font-medium text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
                  CAPACITI
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Hands-on Information Technology Support Technician experience at CAPACITI, driving hardware diagnostics, system maintenance, and user support.
              </p>
            </div>
          </div>
          <span className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50/90 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/40 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Status: Open to Opportunities</span>
          </span>
        </div>

        {/* Experience Timeline Items */}
        <div className="space-y-6">
          {experienceList.map((item, index) => (
            <motion.div
              key={`${item.id || 'exp'}-${index}`}
              id={`experience-item-${item.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1, margin: '0px 0px -35px 0px' }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group/card frosted-glass-card bento-item rounded-3xl border border-white/80 dark:border-white/10 p-6 sm:p-8 shadow-xs hover:shadow-md relative overflow-hidden transition-all hover:border-blue-200 dark:hover:border-blue-500/30"
            >
              {/* Header: Role, Organization & Official Logo */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 pb-6 border-b border-slate-100/80 dark:border-white/10">
                <div className="flex items-start gap-4 sm:gap-5">
                  {/* Organization Logo Badge */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white logo-plate border border-slate-200/90 dark:border-white/20 shadow-2xs flex items-center justify-center p-2.5 shrink-0 overflow-hidden group-hover/card:border-blue-300 transition-colors">
                    {item.logoUrl || item.organization.toLowerCase().includes('capaciti') ? (
                      <img
                        src={item.logoUrl || '/logos/capaciti-symbol.webp'}
                        alt={`${item.organization} logo`}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-3 py-0.5 rounded-full text-[11px] font-mono font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
                        Technical Experience
                      </span>
                      {item.location && (
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-400" />
                          <span>{item.location}</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mt-1">
                      <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200">{item.organization}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-600 dark:text-slate-300 frosted-pill px-3.5 py-1.5 rounded-full border border-white/80 dark:border-white/10 shadow-2xs">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{item.dates}</span>
                  </div>
                  {isEditMode && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Edit experience"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.role)}
                        className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
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
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Responsibilities</span>
                  </h4>
                  <ul className="space-y-2">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Skills Gained */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Skills Gained</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.skillsGained.map((skill, sIdx) => (
                      <motion.span
                        key={sIdx}
                        whileHover={{ scale: 1.05, y: -1 }}
                        className="px-3 py-1 rounded-full frosted-pill text-slate-700 dark:text-slate-200 text-xs font-mono border border-white/80 dark:border-white/10 shadow-2xs hover:bg-white dark:hover:bg-slate-800 transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* 3. Achievements */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Key Achievements</span>
                  </h4>
                  <ul className="space-y-2">
                    {item.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 mt-1.5 shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
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
