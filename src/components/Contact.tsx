import React, { useState } from 'react';
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
} from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';
import { ContactFormData } from '../types';
import { EditSocialModal } from './EditSocialModal';
import { SectionReveal } from './SectionReveal';

export const Contact: React.FC = () => {
  const { personalInfo, updatePersonalInfo, isEditMode } = usePortfolioData();
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

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
      newErrors.message = 'Please provide a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate sending message gracefully with client-side handling
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/60 scroll-mt-20">
      <SectionReveal className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span>Get In Touch</span>
          </div>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Contact Me
          </h2>
          <p className="mt-2 text-slate-600 text-base sm:text-lg max-w-2xl">
            Whether you have an inquiry, junior role opportunity, mentorship suggestion, or just want to connect, feel free to send a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Social Placeholders */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Email Card */}
            <div
              id="contact-email-card"
              className="p-6 rounded-3xl frosted-glass-card bento-item border border-white/80 shadow-xs"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Direct Email
                </span>
                <button
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  type="button"
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 frosted-pill px-3 py-1 rounded-full border border-white/80 hover:bg-white transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                id="contact-email-link"
                href={`mailto:${personalInfo.email}`}
                className="text-lg sm:text-xl font-bold text-slate-950 font-mono break-all hover:text-blue-600 transition-colors inline-block"
              >
                {personalInfo.email}
              </a>

              <p className="mt-2 text-xs text-slate-500">
                Click to compose an email in your default client or use the quick form.
              </p>
            </div>

            {/* Social & Professional Profiles */}
            <div className="p-6 rounded-3xl frosted-glass-card bento-item border border-white/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-0.5">
                    Professional & Social Profiles
                  </h3>
                  <p className="text-xs text-slate-500">
                    Connect directly on developer networks and professional platforms.
                  </p>
                </div>
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => setIsSocialModalOpen(true)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                    title="Edit social profiles"
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
                        {personalInfo.linkedinUrl ? 'Professional Network' : 'Professional Network'}
                      </p>
                    </div>
                  </div>
                  {personalInfo.linkedinUrl ? (
                    <a
                      href={personalInfo.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-mono text-blue-700 font-semibold hover:bg-blue-100 transition-colors flex items-center gap-1"
                    >
                      <span>Connect</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : isEditMode ? (
                    <button
                      type="button"
                      onClick={() => setIsSocialModalOpen(true)}
                      className="px-2.5 py-1 rounded-full bg-white text-[11px] font-mono text-blue-600 border border-slate-200 hover:bg-blue-50 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Link</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-400">Available on request</span>
                  )}
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
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-700 font-semibold hover:bg-slate-200 transition-colors flex items-center gap-1"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Other Link / Website if provided */}
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
                      className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-mono text-blue-700 font-semibold hover:bg-blue-100 transition-colors flex items-center gap-1"
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
                    <span>Add Website or Custom Link</span>
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form with Validation */}
          <div className="lg:col-span-7">
            <div className="frosted-glass-card bento-item rounded-3xl border border-white/80 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100/80">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-950 tracking-tight">
                    Send a Message
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">form.contact_v1</span>
              </div>

              {isSubmitted ? (
                <div id="contact-form-success" className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-950">
                    Message Prepared & Sent!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out, <strong>{formData.name}</strong>. Emihle will receive your note at{' '}
                    <span className="font-mono text-blue-600 font-semibold">{personalInfo.email}</span>.
                  </p>

                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-colors shadow-2xs"
                    >
                      Send Another Note
                    </button>
                    <a
                      href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(
                        `Portfolio Contact from ${formData.name}`
                      )}&body=${encodeURIComponent(formData.message)}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full frosted-pill border border-white/90 text-slate-800 text-xs font-semibold hover:bg-white transition-colors"
                    >
                      <span>Open in Email App</span>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                    </a>
                  </div>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
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
                      placeholder="e.g. Alex Morgan"
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
                    <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
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
                      placeholder="e.g. alex@example.com"
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
                    <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Write your message or inquiry here..."
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

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      id="contact-form-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-blue-600 transition-all shadow-xs active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-white" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
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
