import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  Building,
  CheckCircle2,
  Award,
  BookOpen,
  Plus,
  Trash2,
  Pencil,
} from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';
import { EducationItem } from '../types';
import { AddEducationModal } from './AddEducationModal';
import { SectionReveal } from './SectionReveal';

export const Education: React.FC = () => {
  const { educationList, addEducation, deleteEducation, isEditMode } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);

  // Real logos lookup for academic & training institutions
  const getEducationLogos = (item: EducationItem) => {
    const inst = item.institution.toLowerCase();
    const qual = item.qualification.toLowerCase();

    if (inst.includes('capaciti') || qual.includes('capaciti')) {
      return {
        logo: item.logoUrl || '/logos/capaciti-symbol.webp',
        alt: 'CAPACITI',
        badge: 'Skills Development Accelerator',
      };
    }
    if (inst.includes('college of cape town') || inst.includes('cct') || qual.includes('cisco')) {
      return {
        logo: '/logos/cct-logo.svg',
        alt: 'College of Cape Town',
        badge: 'Public TVET College',
        partnerLogo: '/logos/cisco-logo.svg',
        partnerName: 'Cisco Networking Academy',
      };
    }
    if (inst.includes('basic education') || qual.includes('matric') || inst.includes('umalusi')) {
      return {
        logo: item.logoUrl || '/logos/dbe-symbol.png',
        alt: 'Department of Basic Education',
        badge: 'National Senior Certificate',
        partnerLogo: '/logos/umalusi-logo.webp',
        partnerName: 'Umalusi Council',
      };
    }

    return {
      logo: item.logoUrl || '',
      alt: item.institution,
      badge: 'Academic Institution',
    };
  };

  const handleOpenAdd = () => {
    setEditingEdu(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: EducationItem) => {
    setEditingEdu(item);
    setIsModalOpen(true);
  };

  const handleSave = (data: Omit<EducationItem, 'id'> & { id?: string }) => {
    addEducation(data);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}"?`)) {
      deleteEducation(id);
    }
  };

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/60 scroll-mt-20">
      <SectionReveal className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>Academic & Technical Education</span>
            </div>
            <h2 id="education-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Education & Qualifications
            </h2>
            <p className="mt-2 text-slate-600 text-base sm:text-lg max-w-2xl">
              Formal technical training, networking qualifications, and continuous learning curriculum.
            </p>
          </div>

          {isEditMode && (
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Education</span>
            </button>
          )}
        </div>

        {/* Education Timeline */}
        <div className="space-y-6">
          {educationList.map((item, index) => {
            const eduLogos = getEducationLogos(item);
            return (
              <SectionReveal
                key={`${item.id || 'edu'}-${index}`}
                id={`education-card-${item.id}`}
                delay={index * 0.08}
                className="frosted-glass-card bento-item rounded-3xl border border-white/80 p-6 sm:p-8 shadow-xs relative overflow-hidden transition-all hover:border-blue-200 group"
              >
                {/* Card Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 pb-6 border-b border-slate-100/80">
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Real Institution Logo Badge */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white logo-plate border border-slate-200/90 dark:border-white/10 shadow-2xs flex items-center justify-center p-2 shrink-0 overflow-hidden group-hover:border-blue-300 transition-colors">
                      {eduLogos.logo ? (
                        <img
                          src={eduLogos.logo}
                          alt={`${eduLogos.alt} logo`}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Building className="w-6 h-6 text-blue-600" />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-0.5 rounded-full text-[11px] font-mono font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-500/30">
                          Formal Qualification
                        </span>
                        <span
                          className={`px-3 py-0.5 rounded-full text-[11px] font-mono font-medium flex items-center gap-1 border ${
                            item.status?.toLowerCase().includes('progress') || item.endDate?.toLowerCase() === 'present'
                              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-500/30'
                              : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-700/40'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3 text-current" />
                          <span>{item.status}</span>
                        </span>
                        {eduLogos.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-100/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hidden sm:inline-block">
                            {eduLogos.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                        {item.qualification}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-slate-700 dark:text-slate-300">
                        <div className="flex items-center gap-1.5 font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200">
                          <Building className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                          <span>{item.institution}</span>
                        </div>
                        {eduLogos.partnerLogo && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-xs font-mono">
                            <div className="bg-white logo-plate px-1 py-0.5 rounded">
                              <img
                                src={eduLogos.partnerLogo}
                                alt={eduLogos.partnerName || 'Partner'}
                                className="h-3.5 w-auto max-w-[48px] object-contain"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <span>{eduLogos.partnerName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <div className="flex items-center gap-2 font-mono text-xs text-slate-600 dark:text-slate-300 frosted-pill px-3.5 py-1.5 rounded-full border border-white/80 dark:border-white/10 shadow-2xs">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>
                        {item.qualification.toLowerCase().includes('matric') && (item.endDate === '2024' || item.startDate === '2024')
                          ? 'Completed in 2024'
                          : `${item.startDate} — ${item.endDate}`}
                      </span>
                    </div>

                    {isEditMode && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-2 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Edit education record"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        {educationList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.qualification)}
                            className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete education"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

              {/* Description */}
              <div className="pt-6">
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Core Focus Areas */}
              <div className="mt-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-3 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Key Competency Areas Covered</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.focusAreas.map((area, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full frosted-pill border border-white/90 dark:border-white/10 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium shadow-2xs"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          );
        })}

          {/* Interactive Card to Add Milestone (Owner Mode Only) */}
          {isEditMode && (
            <div
              id="education-add-slot"
              onClick={handleOpenAdd}
              className="cursor-pointer border-2 border-dashed border-slate-200/80 hover:border-blue-300 rounded-3xl p-6 frosted-glass-subtle text-center flex flex-col items-center justify-center transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-2 group-hover:scale-105 transition-transform shadow-2xs">
                <Plus className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                Add Educational Milestone
              </h4>
              <p className="text-xs text-slate-500 max-w-md mt-1 mb-2">
                Add subsequent degrees, diplomas, university qualifications, or specialized technical training programs.
              </p>
              <span className="font-mono text-[11px] text-blue-600 bg-white/70 px-3 py-1 rounded-full border border-slate-200/60 font-medium">
                + Click to record new qualification
              </span>
            </div>
          )}
        </div>
      </SectionReveal>

      {isEditMode && (
        <AddEducationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialEducation={editingEdu}
        />
      )}
    </section>
  );
};
