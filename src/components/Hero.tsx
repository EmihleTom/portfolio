import React, { useState } from 'react';
import { motion, Variants } from 'motion/react';
import {
  ArrowDown,
  Mail,
  Github,
  Check,
  Copy,
  Sparkles,
  Code2,
  Network,
  ShieldCheck,
  Download,
  FileText,
  Loader2,
} from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';
import { useProfilePhoto } from '../utils/photoStorage';
import { downloadResumePDF } from '../utils/generateResume';

export const Hero: React.FC = () => {
  const {
    personalInfo,
    educationList,
    skillCategories,
    projectsList,
    experienceList,
    certificationsList,
  } = usePortfolioData();
  const [copied, setCopied] = useState(false);
  const [isDownloadingCV, setIsDownloadingCV] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const { photo } = useProfilePhoto();

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCV = () => {
    setIsDownloadingCV(true);
    try {
      downloadResumePDF({
        personalInfo,
        educationList,
        skillCategories,
        projectsList,
        experienceList,
        certificationsList,
      });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to generate resume PDF:', err);
    } finally {
      setIsDownloadingCV(false);
    }
  };

  // Staggered motion variants for clean, fluid entry without visual noise
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient background micro-elements for subtle depth */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Subtle tech micro-grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />

        {/* Animated Network Constellation Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="180"
            cy="140"
            r="3"
            fill="#3b82f6"
            animate={{ opacity: [0.3, 0.9, 0.3], r: [2.5, 4, 2.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="420"
            cy="110"
            r="3"
            fill="#2563eb"
            animate={{ opacity: [0.4, 1, 0.4], r: [2.5, 4.5, 2.5] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />
          <motion.circle
            cx="750"
            cy="210"
            r="3"
            fill="#6366f1"
            animate={{ opacity: [0.3, 0.85, 0.3], r: [3, 4.5, 3] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.circle
            cx="860"
            cy="410"
            r="3"
            fill="#3b82f6"
            animate={{ opacity: [0.4, 0.9, 0.4], r: [2.5, 4, 2.5] }}
            transition={{ duration: 3.9, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          />
          <motion.path
            d="M 180 140 L 420 110 L 750 210 L 860 410"
            stroke="#93c5fd"
            strokeWidth="1"
            strokeDasharray="4 4"
            fill="none"
            animate={{ strokeDashoffset: [0, -32] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </svg>

        {/* Gentle floating ambient glow 1 (Top Left) */}
        <motion.div
          animate={{
            x: [0, 16, 0],
            y: [0, -18, 0],
            opacity: [0.28, 0.45, 0.28],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl"
        />

        {/* Gentle floating ambient glow 2 (Bottom Right) */}
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 22, 0],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/5 right-1/12 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Hero Copy - Left Column (Frosted Bento Card) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 frosted-glass-card bento-item p-8 sm:p-10 relative overflow-hidden flex flex-col justify-center border border-white/70 shadow-sm"
          >
            {/* Ambient soft blue blur light inside card */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.55, 0.75, 0.55],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -right-12 -top-12 w-64 h-64 bg-blue-100/70 rounded-full blur-3xl pointer-events-none"
            />

            {/* Status / Availability Badge */}
            <motion.div variants={itemVariants} className="self-start mb-6">
              <div
                id="hero-status-pill"
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full frosted-pill shadow-2xs text-xs font-semibold text-slate-700 hover:border-blue-200 transition-colors"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-xs text-slate-800">{personalInfo.status}</span>
              </div>
            </motion.div>

            {/* Sub-label */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Professional Tech Portfolio
              </span>
              <span className="h-px w-6 bg-slate-300"></span>
              <span className="text-xs text-slate-500 font-medium">{personalInfo.location}</span>
            </motion.div>

            {/* Main Display Name */}
            <motion.h1
              variants={itemVariants}
              id="hero-name-display"
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-950 mb-3"
            >
              {personalInfo.name}
            </motion.h1>

            {/* Professional Tagline in Blue */}
            <motion.p
              variants={itemVariants}
              id="hero-tagline"
              className="text-base sm:text-xl text-blue-600 font-medium mb-4 flex flex-wrap items-center gap-2"
            >
              <motion.span
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-1.5 bg-blue-50/90 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border border-blue-200/60 shadow-2xs cursor-default transition-colors hover:bg-blue-100/90"
              >
                <Network className="w-3.5 h-3.5 text-blue-600" />
                Cisco IT Specialist
              </motion.span>
              <span className="text-slate-300">|</span>
              <motion.span
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-1.5 bg-blue-50/90 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border border-blue-200/60 shadow-2xs cursor-default transition-colors hover:bg-blue-100/90"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                CAPACITI IT Support
              </motion.span>
              <span className="text-slate-300">|</span>
              <motion.span
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-1.5 bg-blue-50/90 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border border-blue-200/60 shadow-2xs cursor-default transition-colors hover:bg-blue-100/90"
              >
                <Code2 className="w-3.5 h-3.5 text-blue-600" />
                Software & Web Developer
              </motion.span>
            </motion.p>

            {/* Short Introduction */}
            <motion.p
              variants={itemVariants}
              id="hero-intro-text"
              className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-xl"
            >
              {personalInfo.summary || 'Cisco IT Specialist and aspiring software developer based in Cape Town. Combining hands-on network infrastructure and systems diagnostics with modern web development in Python, JavaScript, and React.'}
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-6">
              {/* Primary Download CV Button with periodic light sheen */}
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                id="hero-btn-download-cv"
                type="button"
                onClick={handleDownloadCV}
                disabled={isDownloadingCV}
                className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all shadow-xs active:scale-95 cursor-pointer disabled:opacity-75"
                title="Download Emihle's Complete Professional Curriculum Vitae (PDF)"
              >
                {/* Subtle light sweep animation */}
                <motion.span
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 2.5, ease: 'easeInOut' }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
                />

                {isDownloadingCV ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing CV...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Downloaded CV!</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Download CV</span>
                    <Download className="w-3.5 h-3.5 opacity-80" />
                  </>
                )}
              </motion.button>

              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                id="hero-btn-view-work"
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-xs active:scale-95"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </motion.a>

              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                id="hero-btn-contact-me"
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-slate-200/80 text-slate-800 font-semibold text-sm hover:bg-white hover:border-slate-300 transition-all active:scale-95 shadow-2xs backdrop-blur-sm"
              >
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Contact Me</span>
              </motion.a>

              <motion.a
                whileHover={{ y: -2, rotate: 6, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                id="hero-btn-github"
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-3 rounded-full bg-white/80 border border-slate-200/80 text-slate-700 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-2xs"
                title="View GitHub Profile (@EmihleTom)"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Direct Email Quick Copy Pill */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full frosted-pill text-xs text-slate-600 shadow-2xs self-start hover:border-slate-300 transition-colors">
              <span className="font-mono text-slate-400 select-none">email:</span>
              <span className="font-mono text-slate-800 select-all font-medium">{personalInfo.email}</span>
              <button
                id="hero-copy-email-btn"
                onClick={copyEmail}
                type="button"
                className="flex items-center gap-1 pl-2 text-slate-500 hover:text-blue-600 border-l border-slate-200 transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>

          {/* Profile Image & Contact Card - Right Column (Frosted Bento Card) */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 frosted-glass-card bento-item p-6 sm:p-8 flex flex-col items-center justify-center text-center border border-white/70 shadow-sm relative"
          >
            {/* Locked-in Official Portrait Container */}
            <div
              id="hero-locked-profile-card"
              className="relative mb-4 w-48 sm:w-56 aspect-[3/4] rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-white shadow-md flex items-center justify-center overflow-hidden"
            >
              <img
                id="hero-profile-image"
                src={photo}
                alt={personalInfo.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              {/* Official Verified Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5 shadow-xs pointer-events-none">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] font-semibold tracking-wide uppercase">Verified</span>
              </div>
            </div>

            {/* Locked Profile Status Pill */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/60 shadow-2xs">
                <Sparkles className="w-3 h-3 text-blue-600" />
                Official Portrait
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-950 mb-1">
              {personalInfo.name}
            </h3>
            <p className="text-xs font-mono text-blue-600 font-semibold mb-2">
              Cisco IT Specialist
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium mb-4 hover:underline"
            >
              {personalInfo.email}
            </a>

            {/* Quick Status Badges */}
            <div className="w-full pt-4 border-t border-slate-200/60 text-xs text-slate-500 flex flex-col gap-2">
              <div className="flex items-center justify-center gap-2 bg-white/70 py-1.5 px-3 rounded-full border border-white/80 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Available for Opportunities</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/70 py-1.5 px-3 rounded-full border border-white/80 shadow-2xs">
                <span>{personalInfo.location}</span>
              </div>
            </div>

            {/* Tag */}
            <div className="mt-4 pt-3 border-t border-slate-200/50 w-full flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>College of Cape Town</span>
              <span className="text-blue-600 font-semibold">2025</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
