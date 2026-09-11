/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { GitHubSection } from './components/GitHubSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ThemeProvider } from './utils/themeContext';
import { MediaViewerProvider } from './utils/mediaViewerContext';
import { PictureViewerModal } from './components/PictureViewerModal';

function PortfolioApp() {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const sections = [
      'home',
      'about',
      'education',
      'skills',
      'projects',
      'experience',
      'certifications',
      'github',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden transition-colors duration-300">
      {/* Ambient background light orbs for Frosted Glass diffusion (powered by CSS variables & living drift) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Subtle architectural blueprint dot matrix pattern with radial mask */}
        <div 
          className="absolute inset-0 blueprint-canvas-light opacity-80 dark:opacity-20 [mask-image:radial-gradient(ellipse_at_50%_35%,black_45%,transparent_90%)]"
        />

        {/* Daylight luminous ambient overhead glow (light mode warmth) */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl opacity-50 dark:opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 75%)' }}
        />

        {/* Top-Left Azure Orb */}
        <div
          className="absolute -top-32 -left-20 w-[580px] h-[580px] rounded-full blur-3xl transition-all duration-700 animate-ambient-1"
          style={{ backgroundColor: 'var(--ambient-orb-1)', opacity: 'var(--ambient-orb-opacity)' }}
        />

        {/* Top-Right Violet/Indigo Orb */}
        <div
          className="absolute top-[16%] -right-28 w-[520px] h-[520px] rounded-full blur-3xl transition-all duration-700 animate-ambient-2"
          style={{ backgroundColor: 'var(--ambient-orb-2)', opacity: 'var(--ambient-orb-opacity)' }}
        />

        {/* Mid-Left Mint/Teal Orb */}
        <div
          className="absolute top-[38%] left-[8%] w-[480px] h-[480px] rounded-full blur-3xl transition-all duration-700 animate-ambient-3"
          style={{ backgroundColor: 'var(--ambient-orb-3)', opacity: 'var(--ambient-orb-opacity)' }}
        />

        {/* Mid-Right Warm Sunset Amber Accent Orb */}
        <div
          className="absolute top-[52%] -right-16 w-[450px] h-[450px] rounded-full blur-3xl transition-all duration-700 animate-ambient-1"
          style={{ backgroundColor: 'var(--ambient-orb-4)', opacity: 'var(--ambient-orb-opacity)' }}
        />

        {/* Lower-Right Radiant Blue Orb */}
        <div
          className="absolute top-[72%] -right-24 w-[620px] h-[620px] rounded-full blur-3xl transition-all duration-700 animate-ambient-2"
          style={{ backgroundColor: 'var(--ambient-orb-1)', opacity: 'var(--ambient-orb-opacity)' }}
        />

        {/* Bottom Periwinkle Orb */}
        <div
          className="absolute bottom-0 left-[22%] w-[520px] h-[520px] rounded-full blur-3xl transition-all duration-700 animate-ambient-3"
          style={{ backgroundColor: 'var(--ambient-orb-2)', opacity: 'var(--ambient-orb-opacity)' }}
        />
      </div>

      {/* Sticky Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <GitHubSection />
        <Contact />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Media Viewer Lightbox */}
      <PictureViewerModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MediaViewerProvider>
        <PortfolioApp />
      </MediaViewerProvider>
    </ThemeProvider>
  );
}


