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
import { DataGuideModal } from './components/DataGuideModal';

export default function App() {
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Ambient background light orbs for Frosted Glass diffusion */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-20 w-[550px] h-[550px] rounded-full bg-blue-100/60 blur-3xl opacity-70" />
        <div className="absolute top-[18%] -right-28 w-[500px] h-[500px] rounded-full bg-indigo-100/50 blur-3xl opacity-60" />
        <div className="absolute top-[42%] left-[10%] w-[450px] h-[450px] rounded-full bg-sky-100/40 blur-3xl opacity-50" />
        <div className="absolute top-[68%] -right-20 w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-[20%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-3xl opacity-50" />
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

      {/* Subtle Portfolio Growth & Update Guide Modal */}
      <DataGuideModal />
    </div>
  );
}

