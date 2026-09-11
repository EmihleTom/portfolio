import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  BookOpen,
  Wrench,
  ShieldCheck,
  ArrowRight,
  Pencil,
  Check,
  X,
  RotateCcw,
  Sparkles,
  Layers,
  FileText,
  Network,
  Cpu,
  Terminal,
  MapPin,
} from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';
import { personalInfo as defaultPersonalInfo } from '../data/portfolioData';
import { SectionReveal } from './SectionReveal';

export const About: React.FC = () => {
  const { personalInfo, updatePersonalInfo, isEditMode } = usePortfolioData();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(personalInfo.bio);
  const [summaryText, setSummaryText] = useState(personalInfo.summary || '');
  const [activeTab, setActiveTab] = useState<'story' | 'highlights'>('story');
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null);

  useEffect(() => {
    setBioText(personalInfo.bio);
    setSummaryText(personalInfo.summary || '');
  }, [personalInfo.bio, personalInfo.summary]);

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
      <p key={key} className="leading-relaxed text-slate-700 dark:text-slate-300">
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={i} className="font-semibold text-slate-900 dark:text-white">
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

  const quickHighlights = [
    {
      icon: ShieldCheck,
      label: 'Accreditations & Training',
      value: 'Cisco Networking Academy (CCNA), CAPACITI IT Support Trainee, College of Cape Town Graduate',
    },
    {
      icon: Network,
      label: 'Network Infrastructure',
      value: 'VLANs, Subnetting (IPv4/IPv6), Routing protocols, Cisco Packet Tracer, Switch configuration',
    },
    {
      icon: Cpu,
      label: 'Hardware & Diagnostics',
      value: 'PC build & teardown, component replacement, cable termination (RJ45), systematic fault finding',
    },
    {
      icon: Terminal,
      label: 'Systems & Development',
      value: 'Active Directory, Windows/Linux OS, Command Line, Python, TypeScript, React, Git workflows',
    },
  ];

  const focusPillars = [
    {
      id: 'about-card-foundation',
      title: 'Formal IT Foundation & Support (CAPACITI & CCT)',
      description:
        'CAPACITI IT Support Technician candidate and College of Cape Town graduate, Cisco certified, specializing in technical support, system maintenance, troubleshooting, and enterprise networking.',
      icon: ShieldCheck,
      tags: ['Cisco CCNA', 'CAPACITI', 'College of Cape Town'],
    },
    {
      id: 'about-card-learning',
      title: 'Continuous Learning & Software Development',
      description:
        'Proactively expanding into programming (Python, JavaScript), modern frontend frameworks (React, Tailwind CSS), and database design.',
      icon: BookOpen,
      tags: ['Python', 'TypeScript', 'React', 'Databases'],
    },
    {
      id: 'about-card-problem-solving',
      title: 'Practical Problem-Solving & Field Triage',
      description:
        'Committed to systematic troubleshooting, clear technical documentation, hardware diagnostics, and delivering dependable outcomes.',
      icon: Wrench,
      tags: ['Root-Cause Analysis', 'Hardware Repair', 'Helpdesk'],
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/60 scroll-mt-20">
      <SectionReveal className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-2">
            <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Overview & Background</span>
          </div>
          <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
            About Me
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl">
            Cisco-certified IT Specialist &amp; Full-Stack Developer bridging IT operations with modern software engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Narrative - 7 Columns (Frosted Bento Item) */}
          <div className="lg:col-span-7 frosted-glass-card bento-item p-8 sm:p-10 border border-white/75 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-base">
            <div className="space-y-4">
              {/* Header with Interactive Mode Toggle (Story vs At a Glance) */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/10">
                {/* View Switcher Pill */}
                <div className="inline-flex items-center p-1 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/60 dark:border-white/10 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setActiveTab('story')}
                    className={`relative px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'story' ? 'text-blue-700 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {activeTab === 'story' && (
                      <motion.div
                        layoutId="about-tab-indicator"
                        className="absolute inset-0 rounded-full bg-white dark:bg-slate-700 shadow-2xs border border-slate-200/60 dark:border-white/10 -z-10"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                    <FileText className="w-3.5 h-3.5" />
                    <span>Narrative</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('highlights')}
                    className={`relative px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'highlights' ? 'text-blue-700 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {activeTab === 'highlights' && (
                      <motion.div
                        layoutId="about-tab-indicator"
                        className="absolute inset-0 rounded-full bg-white dark:bg-slate-700 shadow-2xs border border-slate-200/60 dark:border-white/10 -z-10"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                    <Layers className="w-3.5 h-3.5" />
                    <span>Quick Highlights</span>
                  </button>
                </div>

                {isEditMode && (
                  !isEditingBio ? (
                    <button
                      type="button"
                      onClick={handleStartEdit}
                      className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-white/60 dark:hover:bg-slate-800"
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
                        className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )
                )}
              </div>

              {/* Editing Bio Form */}
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
                <AnimatePresence mode="wait">
                  {activeTab === 'story' ? (
                    <motion.div
                      key="tab-story"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-base"
                    >
                      {bioParagraphs.length > 0 ? (
                        bioParagraphs.map((paragraph, idx) => renderParagraph(paragraph, idx))
                      ) : (
                        <p className="text-slate-500 italic">No biography provided yet.</p>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="tab-highlights"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-3 pt-1"
                    >
                      <p className="text-xs text-slate-500 font-mono mb-2">
                        Summary of foundational domains, credentials, and competencies:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {quickHighlights.map((item, idx) => {
                          const ItemIcon = item.icon;
                          return (
                            <motion.div
                              key={idx}
                              whileHover={{ y: -2 }}
                              className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/80 border border-slate-200/70 dark:border-white/10 shadow-2xs flex flex-col justify-between space-y-1.5"
                            >
                              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-500/30 flex items-center justify-center shrink-0">
                                  <ItemIcon className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">{item.value}</p>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Quick Action Link */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <a
                id="about-education-link"
                href="#education"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
              >
                <span>Explore my education details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="text-xs font-mono text-slate-400 dark:text-slate-400">emihle.profile</span>
            </div>
          </div>

          {/* Core Focus Pillars - 5 Columns */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {focusPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              const isSelected = selectedPillar === idx;
              return (
                <motion.div
                  key={pillar.id}
                  id={pillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1, margin: '0px 0px -30px 0px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedPillar(isSelected ? null : idx)}
                  className={`group p-5 rounded-2xl frosted bento-item border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-300 dark:border-blue-500 bg-blue-50/40 dark:bg-blue-950/40 shadow-xs'
                      : 'border-white/80 dark:border-white/10 shadow-2xs hover:border-blue-200 dark:hover:border-blue-500/30'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-2xl bg-blue-50/90 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 shadow-2xs shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <PillarIcon className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                        {pillar.description}
                      </p>
                      {/* Interactive Pillar Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {pillar.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-800 border border-slate-200/60 dark:border-white/10 text-[10px] font-mono text-slate-700 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Availability Status Badge with Gentle Live Pulse */}
            <div className="px-4 py-3 rounded-2xl frosted-pill border border-white/80 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 font-mono flex items-center justify-between shadow-2xs">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Available for Opportunities</span>
              </span>
              <span className="text-blue-600 dark:text-blue-400 text-[11px] font-semibold font-mono flex items-center gap-1">
                <MapPin className="w-3 h-3 text-blue-500 dark:text-blue-400" />
                <span>Cape Town</span>
              </span>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};

