import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Terminal, Globe } from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';

export const Footer: React.FC = () => {
  const { personalInfo } = usePortfolioData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="frosted border-t border-white/60 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/60">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a
              id="footer-brand"
              href="#home"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-950 hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs shadow-2xs">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="font-mono">{personalInfo.displayName}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            </a>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Social & Contact Links */}
          <div className="flex items-center gap-3">
            {/* GitHub */}
            <a
              id="footer-github-link"
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full frosted-pill border border-white/90 text-slate-700 hover:text-blue-600 hover:bg-white transition-all shadow-2xs"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* LinkedIn */}
            {personalInfo.linkedinUrl && (
              <a
                id="footer-linkedin-link"
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full frosted-pill border border-white/90 text-slate-700 hover:text-blue-600 hover:bg-white transition-all shadow-2xs"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            {/* Website if exists */}
            {personalInfo.websiteUrl && (
              <a
                id="footer-website-link"
                href={personalInfo.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full frosted-pill border border-white/90 text-slate-700 hover:text-blue-600 hover:bg-white transition-all shadow-2xs"
                title="Personal Website"
                aria-label="Personal Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}

            {/* Email */}
            <a
              id="footer-email-link"
              href={`mailto:${personalInfo.email}`}
              className="p-2.5 rounded-full frosted-pill border border-white/90 text-slate-700 hover:text-blue-600 hover:bg-white transition-all shadow-2xs"
              title={`Send email to ${personalInfo.email}`}
              aria-label="Email Contact"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to top button */}
            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              type="button"
              className="p-2.5 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-colors shadow-2xs ml-2 cursor-pointer"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p id="footer-copyright">
            © {currentYear} <span className="font-semibold text-slate-800">{personalInfo.displayName}</span> ({personalInfo.name}). All rights reserved.
          </p>
          <p className="text-slate-500 font-mono text-[11px]">
            College of Cape Town Cisco IT Specialist • South Africa
          </p>
        </div>
      </div>
    </footer>
  );
};
