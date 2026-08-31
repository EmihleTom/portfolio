import React, { useState } from 'react';
import { User, BookOpen, Wrench, ShieldCheck, ArrowRight, Pencil, Check, X, RotateCcw, Sparkles } from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';
import { personalInfo as defaultPersonalInfo } from '../data/portfolioData';
import { SectionReveal } from './SectionReveal';

export const About: React.FC = () => {
  const { personalInfo, updatePersonalInfo, isEditMode } = usePortfolioData();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(personalInfo.bio);
  const [summaryText, setSummaryText] = useState(personalInfo.summary || '');

  const handleStartEdit = () => {
    setBioText(personalInfo.bio);
    setSummaryText(personalInfo.summary || defaultPersonalInfo.summary || '');
    setIsEditingBio(true);
  };

  const handleSaveBio = () => {
    updatePersonalInfo({
      bio: bioText.trim(),
      summary: summaryText.trim() || undefined,
    });
    setIsEditingBio(false);
  };

  const handleResetToDefault = () => {
    setBioText(defaultPersonalInfo.bio);
    setSummaryText(defaultPersonalInfo.summary || '');
  };

  // Helper to render markdown bold syntax **text** within paragraphs
  const renderParagraph = (text: string, key: number) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={key} className="leading-relaxed">
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={i} className="font-semibold text-slate-900">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </p>
    );
  };

  const bioParagraphs = personalInfo.bio
    ? personalInfo.bio.split('\n\n').filter((p) => p.trim().length > 0)
    : [];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/60 scroll-mt-20">
      <SectionReveal className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            <User className="w-3.5 h-3.5 text-blue-600" />
            <span>Overview & Background</span>
          </div>
          <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            About Me
          </h2>
          <p className="mt-2 text-slate-600 text-base sm:text-lg max-w-2xl">
            Cisco IT Specialist, <strong>CAPACITI</strong> IT Support Technician candidate, and graduate of the <strong>College of Cape Town</strong>, combining hands-on systems support, hardware diagnostics, and network troubleshooting with modern software development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Narrative - 7 Columns (Frosted Bento Item) */}
          <div className="lg:col-span-7 frosted-glass-card bento-item p-8 sm:p-10 border border-white/75 shadow-xs flex flex-col justify-between space-y-6 text-slate-700 leading-relaxed text-base">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span>Profile Narrative</span>
                </span>
                {isEditMode && (
                  !isEditingBio ? (
                    <button
                      type="button"
                      onClick={handleStartEdit}
                      className="text-xs font-mono text-slate-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-white/60"
                      title="Edit full biography"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Edit Bio</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSaveBio}
                        className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 flex items-center gap-1 shadow-2xs cursor-pointer"
                      >
                        <Check className="w-3 h-3" />
                        <span>Save</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingBio(false)}
                        className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs hover:bg-slate-200 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )
                )}
              </div>

              {isEditingBio ? (
                <div className="pt-2 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Biography Narrative
                    </label>
                    <textarea
                      rows={9}
                      value={bioText}
                      onChange={(e) => setBioText(e.target.value)}
                      className="w-full p-3.5 text-sm leading-relaxed rounded-2xl border border-blue-300 focus:outline-hidden focus:ring-2 focus:ring-blue-200 bg-white font-sans text-slate-800 shadow-inner"
                      placeholder="Write your professional story here. Separate paragraphs with an empty line..."
                    />
                    <p className="mt-1 text-[11px] text-slate-400 font-mono">
                      Tip: Separate paragraphs with a blank line (press Enter twice). You can use **bold** text.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Short Hero Summary / Elevator Pitch
                    </label>
                    <input
                      type="text"
                      value={summaryText}
                      onChange={(e) => setSummaryText(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-200 bg-white text-slate-800"
                      placeholder="Concise 1-2 sentence overview shown in the Hero introduction..."
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleResetToDefault}
                      className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset to recommended bio</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingBio(false)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveBio}
                        className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-slate-700 leading-relaxed text-base">
                  {bioParagraphs.length > 0 ? (
                    bioParagraphs.map((paragraph, idx) => renderParagraph(paragraph, idx))
                  ) : (
                    <p className="text-slate-500 italic">No biography provided yet.</p>
                  )}
                </div>
              )}
            </div>

            {/* Quick Action Link */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <a
                id="about-education-link"
                href="#education"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
              >
                <span>Explore my education details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="text-xs font-mono text-slate-400">emihle.profile</span>
            </div>
          </div>

          {/* Core Focus Pillars - 5 Columns */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div
              id="about-card-foundation"
              className="p-5 rounded-2xl frosted bento-item border border-white/80 shadow-2xs hover:border-blue-200 transition-all"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-blue-50/90 border border-blue-100 text-blue-600 shadow-2xs shrink-0">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    Formal IT Foundation & Support (CAPACITI & CCT)
                  </h3>
                  <p className="text-xs text-slate-600 leading-normal">
                    CAPACITI IT Support Technician candidate and College of Cape Town graduate, Cisco certified, specializing in technical support, system maintenance, troubleshooting, and enterprise networking.
                  </p>
                </div>
              </div>
            </div>

            <div
              id="about-card-learning"
              className="p-5 rounded-2xl frosted bento-item border border-white/80 shadow-2xs hover:border-blue-200 transition-all"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-blue-50/90 border border-blue-100 text-blue-600 shadow-2xs shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    Continuous Learning
                  </h3>
                  <p className="text-xs text-slate-600 leading-normal">
                    Proactively expanding into programming (Python, JavaScript), modern frontend frameworks (React), and database design.
                  </p>
                </div>
              </div>
            </div>

            <div
              id="about-card-problem-solving"
              className="p-5 rounded-2xl frosted bento-item border border-white/80 shadow-2xs hover:border-blue-200 transition-all"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-blue-50/90 border border-blue-100 text-blue-600 shadow-2xs shrink-0">
                  <Wrench className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    Practical Problem-Solving
                  </h3>
                  <p className="text-xs text-slate-600 leading-normal">
                    Committed to systematic troubleshooting, clear technical documentation, and delivering dependable outcomes.
                  </p>
                </div>
              </div>
            </div>

            {/* Availability Status Badge */}
            <div className="px-4 py-3 rounded-2xl frosted-pill border border-white/80 text-xs text-slate-600 font-mono flex items-center justify-between shadow-2xs">
              <span className="flex items-center gap-2">
                <span>Available for Opportunities</span>
              </span>
              <span className="text-blue-600 text-[11px] font-semibold font-mono">Cape Town</span>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};
