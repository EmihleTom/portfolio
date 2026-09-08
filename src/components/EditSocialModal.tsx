import React, { useState, useEffect } from 'react';
import { X, Linkedin, Github, Globe, MapPin, Check, Sparkles, Phone, MessageCircle, Clock } from 'lucide-react';
import { PersonalInfo } from '../types';

interface EditSocialModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalInfo: PersonalInfo;
  onSave: (updates: Partial<PersonalInfo>) => void;
}

export const EditSocialModal: React.FC<EditSocialModalProps> = ({
  isOpen,
  onClose,
  personalInfo,
  onSave,
}) => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [timezoneOffsetMinutes, setTimezoneOffsetMinutes] = useState<number>(-10);

  useEffect(() => {
    setLinkedinUrl(personalInfo.linkedinUrl || '');
    setGithubUrl(personalInfo.githubUrl || 'https://github.com/EmihleTom');
    setWebsiteUrl(personalInfo.websiteUrl || '');
    setPhone(personalInfo.phone || '');
    setWhatsappNumber(personalInfo.whatsappNumber || '');
    setLocation(personalInfo.location || 'Western Cape, Cape Town');
    setStatus(personalInfo.status || 'Available for Opportunities');
    setTimezoneOffsetMinutes(
      typeof personalInfo.timezoneOffsetMinutes === 'number'
        ? personalInfo.timezoneOffsetMinutes
        : -10
    );
  }, [personalInfo, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      linkedinUrl: linkedinUrl.trim(),
      githubUrl: githubUrl.trim() || 'https://github.com/EmihleTom',
      websiteUrl: websiteUrl.trim() || undefined,
      phone: phone.trim() || undefined,
      whatsappNumber: whatsappNumber.trim() || undefined,
      location: location.trim(),
      status: status.trim(),
      timezoneOffsetMinutes: timezoneOffsetMinutes,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-white/95 rounded-3xl border border-white/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-2xs">
              <Linkedin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Profile & Social Information
              </h3>
              <p className="text-xs text-slate-500">
                Connect your active LinkedIn, GitHub, location, and professional status.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-blue-600" />
              <span>LinkedIn Profile URL</span>
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://www.linkedin.com/in/emihle-tom-9a4a003a1"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-slate-800" />
              <span>GitHub Profile URL</span>
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/EmihleTom"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Personal Website / Custom Link (Optional)</span>
            </label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://yourwebsite.com or Twitter / X profile"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +27 78 123 4567"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Number</span>
              </label>
              <input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="e.g. +27 78 123 4567"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Location</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Cape Town, South Africa"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Clock Calibration Offset (Minutes)</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500 lowercase">
                {timezoneOffsetMinutes < 0 ? `${timezoneOffsetMinutes} min` : `+${timezoneOffsetMinutes} min`}
              </span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={timezoneOffsetMinutes}
                onChange={(e) => setTimezoneOffsetMinutes(parseInt(e.target.value, 10) || 0)}
                placeholder="-10"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setTimezoneOffsetMinutes(-10)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-mono shrink-0 transition-colors cursor-pointer"
                title="Reset to recommended -10m offset"
              >
                -10m (Default)
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Adjusts the live Cape Town (SAST, UTC+2) clock. Set to -10 to correct for the 10-minute lead.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Status & Availability</span>
            </label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="e.g. Open to Junior IT & Developer Opportunities"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-all shadow-xs flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Save Details</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
