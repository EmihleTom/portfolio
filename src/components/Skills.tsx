import React, { useState } from 'react';
import {
  Code,
  Globe,
  Database,
  Bot,
  Network,
  Wrench,
  Sparkles,
  Plus,
  X,
  Check,
} from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';
import { SectionReveal } from './SectionReveal';

export const Skills: React.FC = () => {
  const { skillCategories, addSkill, removeSkill, isEditMode } = usePortfolioData();
  const [activeInputCategory, setActiveInputCategory] = useState<string | null>(null);
  const [newSkillText, setNewSkillText] = useState('');

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'programming-languages':
        return <Code className="w-5 h-5 text-blue-600" />;
      case 'web-technologies':
        return <Globe className="w-5 h-5 text-blue-600" />;
      case 'databases':
        return <Database className="w-5 h-5 text-blue-600" />;
      case 'ai-technology':
        return <Bot className="w-5 h-5 text-blue-600" />;
      case 'it-support':
        return <Network className="w-5 h-5 text-blue-600" />;
      case 'software-tools':
        return <Wrench className="w-5 h-5 text-blue-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-600" />;
    }
  };

  const handleAddSubmit = (categoryId: string) => {
    if (!newSkillText.trim()) return;
    addSkill(categoryId, newSkillText.trim());
    setNewSkillText('');
    setActiveInputCategory(null);
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/60 scroll-mt-20">
      <SectionReveal className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Competencies & Toolset</span>
            </div>
            <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Technical Skills
            </h2>
            <p className="mt-2 text-slate-600 text-base sm:text-lg max-w-2xl">
              Practical technologies, frameworks, hardware diagnostics, and development tools.
            </p>
          </div>

          {isEditMode ? (
            <div className="text-xs font-mono text-slate-500 bg-white/70 px-3.5 py-1.5 rounded-full border border-white/80 shadow-2xs self-start sm:self-auto">
              <span>Click <strong>+ Add Skill</strong> on any card to update</span>
            </div>
          ) : (
            <div className="text-xs font-mono text-slate-500 bg-white/70 px-3.5 py-1.5 rounded-full border border-white/80 shadow-2xs self-start sm:self-auto">
              <span>Verified Technical Competencies</span>
            </div>
          )}
        </div>

        {/* Categories Grid - 6 Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              id={`skill-card-${category.id}`}
              className="group frosted-glass-card bento-item p-6 rounded-3xl border border-white/80 shadow-2xs hover:border-blue-200 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50/90 border border-blue-100 flex items-center justify-center group-hover:bg-blue-100/70 transition-colors shadow-2xs">
                    {getCategoryIcon(category.id)}
                  </div>
                  <span className="font-mono text-[11px] text-slate-500 bg-white/70 px-2.5 py-0.5 rounded-full border border-white/80">
                    {category.skills.length} skills
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-950 mb-1.5 tracking-tight">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Skills Area */}
              <div className="mt-2 pt-4 border-t border-slate-100/80">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="group/pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full frosted-pill text-slate-800 font-mono text-xs font-medium border border-white/90 shadow-2xs hover:bg-white transition-all"
                    >
                      <span>{skill}</span>
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => removeSkill(category.id, skill)}
                          title={`Remove ${skill}`}
                          className="opacity-40 group-hover/pill:opacity-100 hover:text-rose-600 transition-opacity p-0.5 rounded-full cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>

                {/* Add Skill Interactive Control (Owner Mode Only) */}
                {isEditMode && (
                  activeInputCategory === category.id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddSubmit(category.id);
                      }}
                      className="flex items-center gap-1.5 pt-1"
                    >
                      <input
                        type="text"
                        autoFocus
                        value={newSkillText}
                        onChange={(e) => setNewSkillText(e.target.value)}
                        placeholder="Type skill name..."
                        className="flex-1 px-3 py-1.5 text-xs font-mono rounded-xl bg-white border border-blue-300 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                      <button
                        type="submit"
                        disabled={!newSkillText.trim()}
                        className="p-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 transition-colors cursor-pointer"
                        title="Save skill"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveInputCategory(null);
                          setNewSkillText('');
                        }}
                        className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
                        title="Cancel"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveInputCategory(category.id);
                        setNewSkillText('');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/60 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Skill</span>
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Informative Note Footer */}
        <div className="mt-10 p-4.5 rounded-2xl frosted-glass-subtle border border-white/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>
              {isEditMode ? (
                <>
                  <strong className="text-slate-800">Dynamic Competency Record:</strong> You can add and customize any technical skill directly on the cards above.
                </>
              ) : (
                <>
                  <strong className="text-slate-800">Verified Technical Toolset:</strong> Core competencies demonstrated across enterprise networking, system support, and software development.
                </>
              )}
            </span>
          </div>
          <span className="font-mono text-blue-600 font-semibold text-[11px] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
            {isEditMode ? 'Owner Editing Active' : 'Verified Capabilities'}
          </span>
        </div>
      </SectionReveal>
    </section>
  );
};
