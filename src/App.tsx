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
import { MediaViewerProvider, useMediaViewer } from './utils/mediaViewerContext';
import { PictureViewerModal } from './components/PictureViewerModal';
import { TechBackground } from './components/TechBackground';

function PortfolioApp() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const { isViewing } = useMediaViewer();

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
      // Avoid recalculating or mutating active section while user is viewing a modal/media
      if (isViewing) return;
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
  }, [isViewing]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden transition-colors duration-300">
      {/* High-Precision Professional Tech Background (Network Topology & Laser Grid) */}
      <TechBackground />

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


