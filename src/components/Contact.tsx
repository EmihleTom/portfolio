import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Linkedin,
  Globe,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  Github,
  Pencil,
  Plus,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  FileDown,
  Loader2,
  RotateCcw,
} from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';
import { ContactFormData } from '../types';
import { EditSocialModal } from './EditSocialModal';
import { SectionReveal } from './SectionReveal';
import { downloadResumePDF } from '../utils/generateResume';

const CATEGORY_OPTIONS = [
  'Job / Junior IT Role',
  'IT Support & Diagnostics',
  'Web Development Project',
  'Mentorship & Networking',
  'General Inquiry',
];

export const Contact: React.FC = () => {
  const {
    personalInfo,
    updatePersonalInfo,
    educationList,
    skillCategories,
    projectsList,
    experienceList,
    certificationsList,
    isEditMode,
  } = usePortfolioData();

  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0]);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: CATEGORY_OPTIONS[0],
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedState, setCopiedState] = useState<Record<string, boolean>>({});
  const [isDownloadingCV, setIsDownloadingCV] = useState(false);
  const [cvDownloaded, setCvDownloaded] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Live South Africa / Cape Town Time (SAST, UTC+2)
  // Calibrated with -10 minute offset so the clock accurately reflects local South African Standard Time
  useEffect(() => {
    const updateTime = () => {
      try {
        const offsetMinutes =
          typeof personalInfo.timezoneOffsetMinutes === 'number'
            ? personalInfo.timezoneOffsetMinutes
            : -10;
        const now = new Date(Date.now() + offsetMinutes * 60 * 1000);
        const timeString = new Intl.DateTimeFormat('en-ZA', {
          timeZone: 'Africa/Johannesburg',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(now);
        setCurrentTime(timeString.toUpperCase());
      } catch {
        setCurrentTime('SAST (UTC+2)');
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, [personalInfo.timezoneOffsetMinutes]);

  const copyToClipboard = async (text: string, id: string) => {
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch {
      // Fallback below
    }

    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        success = true;
      } catch (err) {
        console.error('Fallback clipboard copy failed:', err);
      }
    }

    if (success) {
      setCopiedState((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedState((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please write a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const emailSubject = `[Portfolio Contact] ${selectedCategory} from ${formData.name.trim()}`;
    const destinationEmail = personalInfo.email || 'emihletom07@gmail.com';

    // Real API Dispatch via FormSubmit AJAX service with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(destinationEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          _subject: emailSubject,
          category: selectedCategory,
          message: formData.message.trim(),
          _template: 'table',
          _captcha: 'false',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        // Save to sent log locally so sender has records
        try {
          const sentLog = JSON.parse(localStorage.getItem('emihle_sent_messages') || '[]');
          sentLog.unshift({
            name: formData.name,
            email: formData.email,
            subject: emailSubject,
            message: formData.message,
            timestamp: new Date().toISOString(),
          });
          localStorage.setItem('emihle_sent_messages', JSON.stringify(sentLog.slice(0, 20)));
        } catch {
          // ignore storage error
        }

        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      console.warn('Direct webmail API dispatch could not complete, providing instant email client actions:', err);
      // If browser security or adblocker blocks cross-origin fetch, provide seamless 1-click mail links
      setIsSubmitting(false);
      setSubmitError(
        'Direct web dispatch was intercepted by browser protection. Please click one of the quick buttons below to send your pre-filled note with 1 click!'
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: selectedCategory,
      message: '',
    });
    setIsSubmitted(false);
    setSubmitError(null);
    setErrors({});
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
      setCvDownloaded(true);
      setTimeout(() => setCvDownloaded(false), 3000);
    } catch (err) {
      console.error('Failed to download CV PDF:', err);
    } finally {
      setIsDownloadingCV(false);
    }
  };

  // Helper URLs for direct webmail
  const subjectText = formData.subject || `Inquiry from ${formData.name || 'Portfolio Visitor'}`;
  const bodyText = formData.message
    ? `${formData.message}\n\n---\nSent from: ${formData.name || 'Anonymous'} (${formData.email || 'No email provided'})`
    : `Hi Emihle,\n\nI would like to get in touch regarding a potential opportunity.\n\nBest regards,\n${formData.name || ''}`;

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    personalInfo.email
  )}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

  const outlookComposeUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
    personalInfo.email
  )}&subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

  const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    subjectText
  )}&body=${encodeURIComponent(bodyText)}`;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    personalInfo.location || 'Cape Town, Western Cape, South Africa'
  )}`;

  const cleanWhatsappNumber = (personalInfo.whatsappNumber || '').replace(/[^0-9]/g, '');
  const whatsappUrl = cleanWhatsappNumber
    ? `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
        `Hi Emihle, I saw your portfolio and would like to connect!`
      )}`
    : null;

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/60 scroll-mt-20">
      <SectionReveal className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span>Get In Touch</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Contact Me
            </h2>
            {isEditMode && (
              <button
                type="button"
                onClick={() => setIsSocialModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit Contact Details</span>
              </button>
            )}
          </div>
          <p className="mt-2 text-slate-600 text-base sm:text-lg max-w-2xl">
            Whether you have an inquiry, junior role opportunity, mentorship suggestion, or just want to connect, every channel below is fully functional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info, Social & Fast Communication */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Direct Email Card */}
            <div
              id="contact-email-card"
              className="p-6 rounded-3xl frosted-glass-card bento-item border border-white/80 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Direct Email</span>
                </span>
                <button
                  id="contact-copy-email-btn"
                  onClick={() => copyToClipboard(personalInfo.email, 'email')}
                  type="button"
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 frosted-pill px-3 py-1 rounded-full border border-white/80 hover:bg-white transition-colors cursor-pointer"
                  title="Copy email address"
                >
                  {copiedState['email'] ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <a
                  id="contact-email-link"
                  href={`mailto:${personalInfo.email}`}
                  className="text-lg sm:text-xl font-bold text-slate-950 font-mono break-all hover:text-blue-600 transition-colors inline-block"
                >
                  {personalInfo.email}
                </a>
                <p className="mt-1.5 text-xs text-slate-500">
                  Open in your favorite email client with one click:
                </p>
              </div>

              {/* Fast Webmail Launchers */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/80 hover:border-red-200 transition-all text-center group shadow-2xs"
                  title="Compose in Gmail Web"
                >
                  <span className="text-xs font-bold text-slate-800 group-hover:text-red-600">Gmail</span>
                  <span className="text-[10px] text-slate-400 font-mono">Webmail</span>
                </a>
                <a
                  href={outlookComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/80 hover:border-blue-200 transition-all text-center group shadow-2xs"
                  title="Compose in Outlook / Live Web"
                >
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600">Outlook</span>
                  <span className="text-[10px] text-slate-400 font-mono">Webmail</span>
                </a>
                <a
                  href={mailtoUrl}
                  className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/80 hover:border-slate-300 transition-all text-center group shadow-2xs"
                  title="Open in System Default Mail Client"
                >
                  <span className="text-xs font-bold text-slate-800 group-hover:text-slate-950">Default</span>
                  <span className="text-[10px] text-slate-400 font-mono">Mail App</span>
                </a>
              </div>

              {/* Download CV Action */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleDownloadCV}
                  disabled={isDownloadingCV}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {isDownloadingCV ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating PDF CV...</span>
                    </>
                  ) : cvDownloaded ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">CV Downloaded Successfully!</span>
                    </>
                  ) : (
                    <>
                      <FileDown className="w-3.5 h-3.5" />
                      <span>Download Emihle&apos;s CV (PDF)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social & Professional Profiles */}
            <div className="p-6 rounded-3xl frosted-glass-card bento-item border border-white/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-0.5">
                    Professional Networks
                  </h3>
                  <p className="text-xs text-slate-500">
                    Active profiles with direct messaging and portfolio repositories.
                  </p>
                </div>
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => setIsSocialModalOpen(true)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                    title="Edit links"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="space-y-2.5 pt-1">
                {/* LinkedIn Link */}
                <div
                  id="contact-profile-linkedin"
                  className="flex items-center justify-between p-3 rounded-2xl frosted-glass-subtle border border-white/80 text-xs text-slate-700"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">LinkedIn</p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {(personalInfo.linkedinUrl || 'https://www.linkedin.com/in/emihle-tom-9a4a003a1')
                          .replace(/^https?:\/\//i, '')
                          .replace(/^www\./i, '')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          personalInfo.linkedinUrl || 'https://www.linkedin.com/in/emihle-tom-9a4a003a1',
                          'linkedin'
                        )
                      }
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-white transition-colors cursor-pointer"
                      title="Copy LinkedIn URL"
                    >
                      {copiedState['linkedin'] ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={personalInfo.linkedinUrl || 'https://www.linkedin.com/in/emihle-tom-9a4a003a1'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-blue-600 text-[11px] font-mono text-white font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <span>Connect</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* GitHub Link */}
                <div
                  id="contact-profile-github"
                  className="flex items-center justify-between p-3 rounded-2xl frosted-glass-subtle border border-white/80 text-xs text-slate-700"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">GitHub</p>
                      <p className="text-[11px] text-slate-500 font-mono">github.com/EmihleTom</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(personalInfo.githubUrl || 'https://github.com/EmihleTom', 'github')
                      }
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-white transition-colors"
                      title="Copy GitHub URL"
                    >
                      {copiedState['github'] ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={personalInfo.githubUrl || 'https://github.com/EmihleTom'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-slate-900 text-[11px] font-mono text-white font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* WhatsApp (if configured or enabled) */}
                {whatsappUrl ? (
                  <div
                    id="contact-profile-whatsapp"
                    className="flex items-center justify-between p-3 rounded-2xl frosted-glass-subtle border border-white/80 text-xs text-slate-700"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">WhatsApp</p>
                        <p className="text-[11px] text-slate-500 font-mono">{personalInfo.whatsappNumber}</p>
                      </div>
                    </div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-emerald-600 text-[11px] font-mono text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <span>Chat</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ) : null}

                {/* Phone Call (if configured) */}
                {personalInfo.phone ? (
                  <div
                    id="contact-profile-phone"
                    className="flex items-center justify-between p-3 rounded-2xl frosted-glass-subtle border border-white/80 text-xs text-slate-700"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">Phone</p>
                        <p className="text-[11px] text-slate-500 font-mono">{personalInfo.phone}</p>
                      </div>
                    </div>
                    <a
                      href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                      className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-mono text-blue-700 font-semibold hover:bg-blue-100 transition-colors flex items-center gap-1"
                    >
                      <span>Call</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ) : null}

                {/* Website (if provided) */}
                {personalInfo.websiteUrl ? (
                  <div
                    id="contact-profile-website"
                    className="flex items-center justify-between p-3 rounded-2xl frosted-glass-subtle border border-white/80 text-xs text-slate-700"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">Website</p>
                        <p className="text-[11px] text-slate-500 font-mono truncate max-w-[150px]">
                          {personalInfo.websiteUrl}
                        </p>
                      </div>
                    </div>
                    <a
                      href={personalInfo.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-mono text-blue-700 font-semibold hover:bg-blue-100 transition-colors flex items-center gap-1"
                    >
                      <span>Open</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ) : isEditMode ? (
                  <button
                    type="button"
                    onClick={() => setIsSocialModalOpen(true)}
                    className="w-full py-2 px-3 rounded-2xl border border-dashed border-slate-300 hover:border-blue-300 text-[11px] font-mono text-slate-500 hover:text-blue-600 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Phone, WhatsApp or Custom Link</span>
                  </button>
                ) : null}
              </div>
            </div>

            {/* Location & Real-Time Availability Card */}
            <div className="p-6 rounded-3xl frosted-glass-card bento-item border border-white/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Location & Timezone</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Active & Ready</span>
                </span>
              </div>

              <div>
                <p className="text-base font-bold text-slate-900">
                  {personalInfo.location || 'Western Cape, Cape Town'}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Cape Town Time: {currentTime} (SAST, UTC+2)</span>
                  </div>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => setIsSocialModalOpen(true)}
                      className="text-[11px] font-mono font-medium text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      title="Adjust location and clock calibration"
                    >
                      <span>Adjust Time / Location</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span>View Cape Town on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Real Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="frosted-glass-card bento-item rounded-3xl border border-white/80 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100/80">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-950 tracking-tight">
                    Send a Direct Message
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-mono text-slate-500">Live Delivery</span>
                </div>
              </div>

              {isSubmitted ? (
                /* Success Confirmation State */
                <div id="contact-form-success" className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-950">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out, <strong>{formData.name}</strong>. Your note regarding{' '}
                    <strong className="text-blue-600">{selectedCategory}</strong> has been transmitted directly to Emihle at{' '}
                    <span className="font-mono text-slate-800 font-semibold">{personalInfo.email}</span>.
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 max-w-md mx-auto text-left text-xs text-slate-600 space-y-1.5 font-mono">
                    <p>
                      <span className="text-slate-400">Recipient:</span> {personalInfo.email}
                    </p>
                    <p>
                      <span className="text-slate-400">Sender:</span> {formData.name} ({formData.email})
                    </p>
                    <p>
                      <span className="text-slate-400">Category:</span> {selectedCategory}
                    </p>
                    <p className="line-clamp-2">
                      <span className="text-slate-400">Preview:</span> &quot;{formData.message}&quot;
                    </p>
                  </div>

                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Send Another Message</span>
                    </button>
                    <a
                      href={gmailComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full frosted-pill border border-white/90 text-slate-800 text-xs font-semibold hover:bg-white transition-colors"
                    >
                      <span>Open Copy in Gmail</span>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                    </a>
                  </div>
                </div>
              ) : (
                /* Active Form */
                <form id="contact-form" onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Category / Topic Selector Chips */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Topic / What is this regarding?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORY_OPTIONS.map((cat) => {
                        const isSelected = selectedCategory === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(cat);
                              setFormData({ ...formData, subject: cat });
                            }}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-2xs'
                                : 'bg-white/80 text-slate-700 border border-slate-200/80 hover:bg-white hover:border-blue-300'
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5"
                    >
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Sipho Dlamini / Sarah Jenkins"
                      className={`w-full px-4 py-3 rounded-2xl bg-white/70 border text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-hidden focus:bg-white focus:ring-2 ${
                        errors.name
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-white/90 focus:border-blue-300 focus:ring-blue-100'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5"
                    >
                      Your Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="e.g. yourname@company.com"
                      className={`w-full px-4 py-3 rounded-2xl bg-white/70 border text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-hidden focus:bg-white focus:ring-2 ${
                        errors.email
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-white/90 focus:border-blue-300 focus:ring-blue-100'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-500"
                      >
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-slate-400">
                        {formData.message.length} characters
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Please write your note, job opportunity details, or questions here..."
                      className={`w-full px-4 py-3 rounded-2xl bg-white/70 border text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-hidden focus:bg-white focus:ring-2 ${
                        errors.message
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-white/90 focus:border-blue-300 focus:ring-blue-100'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Fallback Warning / Actions if direct web fetch was blocked */}
                  {submitError && (
                    <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-start gap-2.5 text-xs text-amber-900">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">{submitError}</p>
                          <p className="mt-1 text-[11px] text-amber-700">
                            Your message is preserved. Choose your preferred service to complete delivery:
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <a
                          href={gmailComposeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-full bg-white border border-amber-300 text-xs font-semibold text-slate-800 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs"
                        >
                          <span>Deliver via Gmail Web</span>
                          <ExternalLink className="w-3 h-3 text-blue-600" />
                        </a>
                        <a
                          href={outlookComposeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-full bg-white border border-amber-300 text-xs font-semibold text-slate-800 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs"
                        >
                          <span>Deliver via Outlook Web</span>
                          <ExternalLink className="w-3 h-3 text-blue-600" />
                        </a>
                        <a
                          href={mailtoUrl}
                          className="px-3.5 py-1.5 rounded-full bg-white border border-amber-300 text-xs font-semibold text-slate-800 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs"
                        >
                          <span>Open in Default Mail Client</span>
                          <ExternalLink className="w-3 h-3 text-slate-600" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Submit Button & Alternative Actions */}
                  <div className="pt-2 space-y-3">
                    <button
                      id="contact-form-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-blue-600 transition-all shadow-xs active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Sending directly to {personalInfo.email}...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-white" />
                          <span>Send Message Now</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span>Prefer sending directly from your webmail?</span>
                      <div className="flex items-center gap-3">
                        <a
                          href={gmailComposeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Pre-fill Gmail
                        </a>
                        <span>•</span>
                        <a
                          href={outlookComposeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Pre-fill Outlook
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </SectionReveal>

      {isEditMode && (
        <EditSocialModal
          isOpen={isSocialModalOpen}
          onClose={() => setIsSocialModalOpen(false)}
          personalInfo={personalInfo}
          onSave={(updates) => updatePersonalInfo(updates)}
        />
      )}
    </section>
  );
};
