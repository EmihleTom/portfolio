import React, { useState } from 'react';
import { HelpCircle, X, Check, Copy, FileText, ChevronRight, Sparkles, RefreshCw } from 'lucide-react';
import { usePortfolioData } from '../utils/portfolioStore';

export const DataGuideModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const { resetToDefaults, isEditMode } = usePortfolioData();
  const [resetConfirm, setResetConfirm] = useState(false);

  if (!isEditMode) {
    return null;
  }

  const sampleSnippet = `// Live in-app editing or in src/data/portfolioData.ts:
// 1. Projects: Click "+ Add Project" or the edit button on any project card.
// 2. Skills: Click "+ Add Skill" on any category card.
// 3. Experience: Click "+ Add Experience" on the career timeline.
// 4. Certifications: Click "+ Add Certification" to record credentials.
// 5. Photo: Click "Add Your Picture" or "Change Picture" on the hero card.`;

  const copySnippet = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const handleReset = () => {
    if (resetConfirm) {
      resetToDefaults();
      setResetConfirm(false);
      setIsOpen(false);
    } else {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 4000);
    }
  };

  return (
    <>
      {/* Discreet floating helper pill at bottom-left */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          id="data-guide-toggle-btn"
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full frosted-pill border border-white/90 text-slate-700 text-xs font-semibold shadow-xs hover:text-blue-600 hover:bg-white transition-all cursor-pointer"
          title="Portfolio management guide"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Manage Portfolio</span>
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            id="data-guide-modal"
            className="frosted-glass-card rounded-3xl border border-white/90 shadow-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-white/80 transition-colors cursor-pointer"
              aria-label="Close guide modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  Interactive Portfolio Manager
                </h3>
                <p className="text-xs text-blue-600 font-mono">
                  Real-time updates for Emihle Tom
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              You can add and update your information directly across all sections in the portfolio:
            </p>

            {/* Steps / Overview */}
            <div className="space-y-3 mb-5 text-xs text-slate-700">
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl frosted-glass-subtle border border-white/80">
                <ChevronRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">1. Profile Picture</strong>
                  Click <strong className="text-blue-600">"Add Your Picture"</strong> in the hero section to upload any photo from your device, import from GitHub, or enter a web image link.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl frosted-glass-subtle border border-white/80">
                <ChevronRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">2. Technical Skills</strong>
                  Click <strong className="text-blue-600">+ Add Skill</strong> on any category card in the Skills section to add or remove specific competencies.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl frosted-glass-subtle border border-white/80">
                <ChevronRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">3. Projects & Work</strong>
                  Click <strong className="text-blue-600">+ Add Project</strong> or the edit pencil on any project card to record technologies, links, and descriptions.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl frosted-glass-subtle border border-white/80">
                <ChevronRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">4. Experience & Certifications</strong>
                  Use the dedicated <strong className="text-blue-600">+ Add</strong> buttons in the Experience, Certifications, and Education sections to record career achievements.
                </div>
              </div>
            </div>

            {/* Reset to defaults option */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
              <span className="text-[11px] text-slate-500 font-mono">
                Data saved securely in your browser's local storage.
              </span>
              <button
                type="button"
                onClick={handleReset}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1.5 ${
                  resetConfirm
                    ? 'bg-rose-50 border-rose-200 text-rose-700 font-semibold'
                    : 'text-slate-500 hover:text-slate-800 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <RefreshCw className="w-3 h-3" />
                <span>{resetConfirm ? 'Click again to confirm reset' : 'Reset to default data'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-full bg-slate-900 text-white font-semibold text-xs hover:bg-blue-600 transition-colors shadow-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
