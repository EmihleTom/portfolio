import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Mail, Terminal, ArrowUpRight } from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';
import { useProfilePhoto } from '../utils/photoStorage';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { personalInfo } = usePortfolioData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { photo } = useProfilePhoto();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navigation"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 py-3"
    >
      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? 'frosted shadow-sm'
            : 'bg-white/65 backdrop-blur-md border border-white/60 shadow-2xs'
        }`}
      >
        {/* Brand Display */}
        <a
          id="nav-brand"
          href="#home"
          className="group flex items-center gap-2.5 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-blue-100/90 text-blue-600 border border-blue-200/60 flex items-center justify-center font-mono text-xs font-black shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
            {photo ? (
              <img
                src={photo}
                alt={personalInfo.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span>ET</span>
            )}
          </div>
          <span className="text-2xl font-black tracking-tighter text-blue-600">
            {personalInfo.displayName}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-menu" aria-label="Main Navigation" className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                id={`nav-link-${item.name.toLowerCase()}`}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/90 font-bold shadow-2xs'
                    : 'text-slate-500 hover:text-blue-600 hover:bg-white/60'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            id="nav-github-btn"
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/80 text-slate-700 text-xs font-medium hover:text-blue-600 hover:border-blue-200 transition-colors shadow-2xs"
            title="Explore GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="font-mono text-xs">GH</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>

          <a
            id="nav-contact-cta"
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-all shadow-xs"
          >
            <Mail className="w-3 h-3" />
            <span>Contact</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-slate-700 rounded-full bg-white/80 border border-slate-200 hover:text-blue-600 hover:border-blue-200"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-700 hover:text-slate-950 hover:bg-white/80 rounded-full focus:outline-hidden focus:ring-2 focus:ring-blue-400"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden max-w-6xl mx-auto mt-2 frosted rounded-2xl border border-white/70 px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="py-2 space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  id={`mobile-nav-link-${item.name.toLowerCase()}`}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-700 hover:bg-blue-50/80 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
          <div className="pt-3 border-t border-slate-200/60 flex flex-col gap-2">
            <a
              id="mobile-contact-cta"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-xs hover:bg-blue-600 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Me</span>
            </a>
            <a
              id="mobile-github-cta"
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/80 border border-slate-200 text-slate-700 font-semibold text-xs hover:text-blue-600 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Explore GitHub (@EmihleTom)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
