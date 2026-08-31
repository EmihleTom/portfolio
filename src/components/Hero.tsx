import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Mail, Github, Check, Copy, Sparkles, Terminal, Code2, Network, Camera, Upload, SlidersHorizontal, Download, FileText, Loader2 } from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';
import { useProfilePhoto, processAndOptimizeImage } from '../utils/photoStorage';
import { ProfilePhotoModal } from './ProfilePhotoModal';
import { downloadResumePDF } from '../utils/generateResume';

export const Hero: React.FC = () => {
  const {
    personalInfo,
    educationList,
    skillCategories,
    projectsList,
    experienceList,
    certificationsList,
    isEditMode,
  } = usePortfolioData();
  const [copied, setCopied] = useState(false);
  const [isDownloadingCV, setIsDownloadingCV] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const { photo, updatePhoto } = useProfilePhoto();
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingOverAvatar, setIsDraggingOverAvatar] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handleDirectFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsUploadingPhoto(true);
    try {
      const optimized = await processAndOptimizeImage(file);
      updatePhoto(optimized);
    } catch (err) {
      console.error('Failed to process image:', err);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

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

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Hero Copy - Left Column (Frosted Bento Card) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-8 frosted-glass-card bento-item p-8 sm:p-10 relative overflow-hidden flex flex-col justify-center border border-white/70"
          >
            {/* Ambient soft blue blur light inside card */}
            <div className="absolute -right-12 -top-12 w-56 h-56 bg-blue-100/70 rounded-full blur-3xl opacity-70 pointer-events-none" />

            {/* Status / Availability Badge */}
            <div
              id="hero-status-pill"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full frosted-pill shadow-2xs text-xs font-semibold text-slate-700 mb-6 self-start"
            >
              <span className="font-mono text-xs text-slate-800">{personalInfo.status}</span>
            </div>

            {/* Sub-label */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Professional Tech Portfolio
              </span>
              <span className="h-px w-6 bg-slate-300"></span>
              <span className="text-xs text-slate-500 font-medium">{personalInfo.location}</span>
            </div>

            <h1
              id="hero-name-display"
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-950 mb-3"
            >
              {personalInfo.name}
            </h1>

            {/* Professional Tagline in Blue */}
            <p
              id="hero-tagline"
              className="text-base sm:text-xl text-blue-600 font-medium mb-4 flex flex-wrap items-center gap-2"
            >
              <span className="inline-flex items-center gap-1.5 bg-blue-50/90 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border border-blue-200/60">
                <Network className="w-3.5 h-3.5 text-blue-600" />
                Cisco IT Specialist
              </span>
              <span className="text-slate-300">|</span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50/90 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border border-blue-200/60">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                CAPACITI IT Support
              </span>
              <span className="text-slate-300">|</span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50/90 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border border-blue-200/60">
                <Code2 className="w-3.5 h-3.5 text-blue-600" />
                Software & Web Developer
              </span>
            </p>

            {/* Short Introduction */}
            <p
              id="hero-intro-text"
              className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-xl"
            >
              {personalInfo.summary || 'Cisco IT Specialist and aspiring software developer based in Cape Town. Combining hands-on network infrastructure and systems diagnostics with modern web development in Python, JavaScript, and React.'}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-6">
              <button
                id="hero-btn-download-cv"
                type="button"
                onClick={handleDownloadCV}
                disabled={isDownloadingCV}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all shadow-xs active:scale-95 cursor-pointer disabled:opacity-75"
                title="Download Emihle's Complete Professional Curriculum Vitae (PDF)"
              >
                {isDownloadingCV ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing CV...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Downloaded CV!</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Download CV</span>
                    <Download className="w-3.5 h-3.5 opacity-80" />
                  </>
                )}
              </button>

              <a
                id="hero-btn-view-work"
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-xs active:scale-95"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </a>

              <a
                id="hero-btn-contact-me"
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-slate-200/80 text-slate-800 font-semibold text-sm hover:bg-white hover:border-slate-300 transition-all active:scale-95 shadow-2xs backdrop-blur-sm"
              >
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Contact Me</span>
              </a>

              <a
                id="hero-btn-github"
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-3 rounded-full bg-white/80 border border-slate-200/80 text-slate-700 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-2xs"
                title="View GitHub Profile (@EmihleTom)"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>

            {/* Direct Email Quick Copy Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full frosted-pill text-xs text-slate-600 shadow-2xs self-start">
              <span className="font-mono text-slate-400 select-none">email:</span>
              <span className="font-mono text-slate-800 select-all font-medium">{personalInfo.email}</span>
              <button
                id="hero-copy-email-btn"
                onClick={copyEmail}
                type="button"
                className="flex items-center gap-1 pl-2 text-slate-500 hover:text-blue-600 border-l border-slate-200 transition-colors"
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
            </div>
          </motion.div>

          {/* Profile Image & Contact Card - Right Column (Frosted Bento Card) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-4 frosted-glass-card bento-item p-6 sm:p-8 flex flex-col items-center justify-center text-center border border-white/70"
          >
            {/* Hidden native file picker for instant 1-click photo update */}
            <input
              ref={heroFileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleDirectFileUpload(e.target.files[0]);
                  e.target.value = '';
                }
              }}
            />

            {/* Elegant Frosted Photo Container with Direct Dropzone and Upload Trigger */}
            <div
              className={`relative mb-3 group transition-all duration-200 rounded-3xl ${
                isDraggingOverAvatar ? 'ring-4 ring-blue-500 scale-105 shadow-xl' : ''
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingOverAvatar(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDraggingOverAvatar(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingOverAvatar(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleDirectFileUpload(e.dataTransfer.files[0]);
                }
              }}
            >
              <button
                id="hero-profile-photo-trigger"
                type="button"
                onClick={() => heroFileInputRef.current?.click()}
                className={`${
                  photo ? 'w-48 sm:w-56 aspect-[3/4]' : 'w-32 h-32 sm:w-36 sm:h-36'
                } rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-white shadow-md flex items-center justify-center relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] focus:outline-hidden focus:ring-2 focus:ring-blue-400 group`}
                title={photo ? "Click to change to your original photo or drag & drop" : "Click to select your photo from your device"}
                aria-label={photo ? "Change profile photo" : "Upload your profile photo"}
              >
                {isUploadingPhoto ? (
                  <div className="flex flex-col items-center justify-center p-2 text-blue-600 gap-1.5 animate-pulse">
                    <Upload className="w-6 h-6 animate-bounce" />
                    <span className="text-[10px] font-semibold">Updating...</span>
                  </div>
                ) : isDraggingOverAvatar ? (
                  <div className="flex flex-col items-center justify-center p-2 text-blue-600 gap-1 bg-blue-50/90 inset-0 absolute">
                    <Upload className="w-7 h-7 animate-bounce" />
                    <span className="text-[11px] font-bold">Drop photo!</span>
                  </div>
                ) : photo ? (
                  <>
                    <img
                      src={photo}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                    {/* Hover change overlay */}
                    <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold gap-1 backdrop-blur-xs">
                      <Camera className="w-5 h-5 text-white" />
                      <span className="text-[11px] font-medium">Upload Original Photo</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 border-2 border-blue-200 border-dashed rounded-2xl flex flex-col items-center justify-center text-blue-500 group-hover:border-blue-400 transition-colors">
                      <span className="font-mono text-xl font-bold text-blue-600">ET</span>
                      <span className="text-[9px] font-mono text-blue-400">Add Photo</span>
                    </div>
                    {/* Camera indicator badge */}
                    <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs border border-white group-hover:scale-110 transition-transform">
                      <Upload className="w-3.5 h-3.5" />
                    </div>
                  </>
                )}
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-1.5 mb-3">
              <button
                id="hero-upload-photo-btn"
                type="button"
                onClick={() => heroFileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-[11px] font-semibold hover:bg-blue-700 transition-all shadow-2xs cursor-pointer active:scale-95 min-h-[34px]"
                title="Select a photo from your computer or phone"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{photo ? 'Change Photo' : 'Upload Photo'}</span>
              </button>
              <button
                id="hero-photo-options-btn"
                type="button"
                onClick={() => setIsPhotoModalOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl frosted-pill border border-white/90 text-[11px] font-medium text-slate-700 hover:text-slate-900 hover:bg-white transition-all shadow-2xs cursor-pointer min-h-[34px]"
                title="More photo options (GitHub, URL, or remove)"
              >
                <SlidersHorizontal className="w-3 h-3 text-slate-500" />
                <span>Options</span>
              </button>
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
              <div className="flex items-center justify-center gap-2 bg-white/70 py-1.5 px-3 rounded-full border border-white/80">
                <span>Available for Opportunities</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/70 py-1.5 px-3 rounded-full border border-white/80">
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

      {/* Profile Photo Upload / Edit Modal */}
      {isEditMode && (
        <ProfilePhotoModal
          isOpen={isPhotoModalOpen}
          onClose={() => setIsPhotoModalOpen(false)}
        />
      )}
    </section>
  );
};
