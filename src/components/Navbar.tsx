import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Github, Mail, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';
import { useProfilePhoto } from '../utils/photoStorage';
import { useTheme } from '../utils/themeContext';
import { useMediaViewer } from '../utils/mediaViewerContext';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { personalInfo } = usePortfolioData();
  const { isDark, toggleTheme } = useTheme();
  const { isViewing } = useMediaViewer();
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-3 sm:px-6 py-3 ${
        isViewing ? '-translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? 'frosted shadow-sm'
            : 'frosted-glass-subtle shadow-2xs'
        }`}
      >
        {/* Brand Display & Avatar */}
        <div className="flex items-center gap-2.5">
          <a
            href="#home"
            title={personalInfo.name}
            className="w-8 h-8 rounded-full bg-blue-100/90 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/40 flex items-center justify-center font-mono text-xs font-black shadow-2xs overflow-hidden select-none"
          >
            {photo ? (
              <img
                src={photo}
                alt={personalInfo.name}
                className="w-full h-full object-cover object-top select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span>ET</span>
            )}
          </a>
          <a
            id="nav-brand"
            href="#home"
            className="text-2xl font-black tracking-tighter text-blue-600 dark:text-blue-400 hover:opacity-90 transition-opacity"
          >
            {personalInfo.displayName}
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-menu" aria-label="Main Navigation" className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                id={`nav-link-${item.name.toLowerCase()}`}
                href={item.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktop-active-nav-pill"
                    className="absolute inset-0 rounded-full bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-500/30 shadow-2xs -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Light / Dark Mode Theme Switcher */}
          <button
            id="desktop-theme-switcher-btn"
            type="button"
            onClick={toggleTheme}
            className="relative flex items-center justify-center p-2 rounded-full frosted-pill text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 active:scale-95 transition-all shadow-2xs cursor-pointer group"
            title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
            aria-label={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform group-hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600 group-hover:text-blue-600 transition-transform group-hover:-rotate-12" />
            )}
          </button>

          <a
            id="nav-github-btn"
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full frosted-pill text-slate-700 dark:text-slate-200 text-xs font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500/40 transition-colors shadow-2xs"
            title="Explore GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="font-mono text-xs">GH</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>

          <a
            id="nav-contact-cta"
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900 dark:bg-blue-600 text-white text-xs font-semibold hover:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-xs"
          >
            <Mail className="w-3 h-3" />
            <span>Contact</span>
          </a>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Theme Switcher */}
          <button
            id="mobile-theme-switcher-btn"
            type="button"
            onClick={toggleTheme}
            className="p-1.5 rounded-full frosted-pill text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-all cursor-pointer"
            title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
            aria-label={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-slate-700 dark:text-slate-200 rounded-full frosted-pill hover:text-blue-600 hover:border-blue-200"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white rounded-full focus:outline-hidden focus:ring-2 focus:ring-blue-400"
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
          className="md:hidden max-w-6xl mx-auto mt-2 frosted rounded-2xl px-4 pt-3 pb-5 space-y-3 shadow-lg animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Mobile Theme Switcher Bar */}
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl frosted-pill">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
              {isDark ? (
                <Moon className="w-4 h-4 text-blue-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
              <span>Theme: {isDark ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-2xs cursor-pointer"
            >
              Switch to {isDark ? 'Light' : 'Dark'}
            </button>
          </div>

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
                      : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
          <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 flex flex-col gap-2">
            <a
              id="mobile-contact-cta"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 dark:bg-blue-600 text-white font-semibold text-xs hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Me</span>
            </a>
            <a
              id="mobile-github-cta"
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full frosted-pill text-slate-700 dark:text-slate-200 font-semibold text-xs hover:text-blue-600 transition-colors"
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

