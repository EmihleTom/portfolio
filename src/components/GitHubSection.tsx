import React from 'react';
import { Github, ExternalLink, GitBranch, GitCommit, Star, Code2, Terminal } from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';
import { SectionReveal } from './SectionReveal';

export const GitHubSection: React.FC = () => {
  const { personalInfo } = usePortfolioData();
  return (
    <section id="github" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/60 scroll-mt-20">
      <SectionReveal className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl frosted-glass-card bento-item border border-white/80 p-8 sm:p-12 overflow-hidden shadow-xs">
          {/* Subtle frosted blue ambient blur */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-100/70 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-100/60 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full frosted-pill border border-white/90 text-xs font-semibold text-blue-700 bg-blue-50/80">
                <Terminal className="w-3.5 h-3.5 text-blue-600" />
                <span>Version Control & Open Source</span>
              </div>

              <h2 id="github-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
                Explore My GitHub
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Follow my code repositories, continuous learning commits, and technical explorations.
                As I develop new IT scripts and software projects, all source code and documentation will be published here.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  id="github-explore-btn"
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-blue-600 transition-all shadow-xs active:scale-95 group"
                >
                  <Github className="w-4 h-4 text-white" />
                  <span>Explore My GitHub</span>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <span className="font-mono text-xs text-blue-600 font-semibold frosted-pill px-3 py-1.5 rounded-full border border-white/80">
                  @EmihleTom
                </span>
              </div>
            </div>

            {/* Right Column: Frosted Terminal Card */}
            <div className="lg:col-span-4">
              <div className="frosted-glass-subtle rounded-2xl border border-white/90 p-5 font-mono text-xs text-slate-800 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 text-slate-500 mb-3">
                  <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <GitBranch className="w-3.5 h-3.5 text-blue-600" />
                    <span>main</span>
                  </span>
                  <span className="text-[11px] text-blue-600 font-medium">git: active</span>
                </div>

                <div className="space-y-2 text-[12px]">
                  <p className="text-slate-500">
                    $ <span className="text-slate-900 font-semibold">gh repo list EmihleTom</span>
                  </p>
                  <p className="text-emerald-600 font-semibold pl-2">
                    ✓ Connection verified
                  </p>
                  <p className="text-slate-600 pl-2 text-[11px]">
                    Repositories & code experiments tracked
                  </p>
                  <p className="text-slate-500">
                    $ <span className="text-blue-600">git log -1</span>
                  </p>
                  <p className="text-slate-600 pl-2 text-[11px]">
                    commit: <span className="text-slate-900 font-semibold">initial portfolio release</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>github.com/EmihleTom</span>
                  <span className="text-slate-400">active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};
