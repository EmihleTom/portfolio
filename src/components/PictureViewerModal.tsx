import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ShieldCheck, Sparkles } from 'lucide-react';
import { useMediaViewer } from '../utils/mediaViewerContext';

export const PictureViewerModal: React.FC = () => {
  const { isViewingPicture, pictureData, closePictureViewer } = useMediaViewer();

  if (!isViewingPicture || !pictureData) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Full-screen image viewer"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200 overscroll-contain"
        onClick={closePictureViewer}
        onWheel={(e) => {
          e.preventDefault();
        }}
      >
        {/* Floating Top Close & Info Bar */}
        <div className="absolute top-4 sm:top-6 left-4 right-4 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-auto z-10">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/20 text-white backdrop-blur-md shadow-lg">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold tracking-wide">
              {pictureData.title || 'Official Portrait'}
            </span>
          </div>

          <button
            id="close-picture-viewer-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closePictureViewer();
            }}
            className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
            aria-label="Close picture viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-2xl max-h-[85vh] flex flex-col items-center justify-center p-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Photo Surface */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 bg-slate-900 flex items-center justify-center group">
            <img
              src={pictureData.src}
              alt={pictureData.title || 'Enlarged portrait'}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-3xl"
              referrerPolicy="no-referrer"
            />

            {/* Subtle bottom gradient plate */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-4 sm:p-5 text-white flex items-end justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-blue-400 text-xs font-mono mb-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>High-Resolution Photo</span>
                </div>
                <p className="text-sm font-semibold tracking-tight text-white">
                  {pictureData.title || 'Official Portrait'}
                </p>
                {pictureData.subtitle && (
                  <p className="text-xs text-slate-300">{pictureData.subtitle}</p>
                )}
              </div>

              <div className="text-[11px] font-mono text-slate-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/10 hidden sm:block">
                Press Esc or click outside to close
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
