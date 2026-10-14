import React, { createContext, useContext, useState, useEffect } from 'react';

interface PictureData {
  src: string;
  title?: string;
  subtitle?: string;
}

interface MediaViewerContextType {
  isViewing: boolean;
  isViewingCertificate: boolean;
  isViewingPicture: boolean;
  pictureData: PictureData | null;
  openPictureViewer: (src: string, title?: string, subtitle?: string) => void;
  closePictureViewer: () => void;
  setIsViewingCertificate: (viewing: boolean) => void;
}

const MediaViewerContext = createContext<MediaViewerContextType | undefined>(undefined);

export const MediaViewerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isViewingCertificate, setIsViewingCertificate] = useState(false);
  const [pictureData, setPictureData] = useState<PictureData | null>(null);
  const savedScrollYRef = React.useRef<number>(0);

  const isViewingPicture = !!pictureData;
  const isViewing = isViewingCertificate || isViewingPicture;

  const openPictureViewer = (src: string, title?: string, subtitle?: string) => {
    // Record current scroll position right before viewing
    const currentY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    savedScrollYRef.current = currentY;
    setPictureData({ src, title, subtitle });
  };

  const closePictureViewer = () => {
    setPictureData(null);
  };

  const handleSetIsViewingCertificate = (viewing: boolean) => {
    if (viewing) {
      // Record current scroll position right before viewing certificate
      const currentY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      savedScrollYRef.current = currentY;
    }
    setIsViewingCertificate(viewing);
  };

  // Lock body scroll cleanly without resetting window.scrollY or collapsing html height
  useEffect(() => {
    if (isViewing) {
      // Re-verify saved scroll position if needed
      if (savedScrollYRef.current === 0) {
        const currentY =
          window.scrollY ||
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
        if (currentY > 0) {
          savedScrollYRef.current = currentY;
        }
      }

      // Calculate scrollbar width to prevent page shift
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.classList.add('media-viewing-active');
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';

      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }

      // Intercept wheel/touch events on background
      const handleTouchMove = (e: TouchEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        const scrollable = target.closest('[data-scrollable="true"], .overflow-y-auto');
        if (!scrollable) {
          e.preventDefault();
        }
      };

      const handleWheel = (e: WheelEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        const scrollable = target.closest('[data-scrollable="true"], .overflow-y-auto');
        if (!scrollable) {
          e.preventDefault();
        }
      };

      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('wheel', handleWheel);

        document.body.classList.remove('media-viewing-active');
        document.body.style.overflow = '';
        document.body.style.overscrollBehavior = '';
        document.body.style.paddingRight = '';

        // Restore scroll position strictly to the current screen
        const targetY = savedScrollYRef.current;
        if (typeof targetY === 'number' && targetY >= 0) {
          const htmlEl = document.documentElement;
          const prevBehavior = htmlEl.style.scrollBehavior;
          htmlEl.style.scrollBehavior = 'auto';

          window.scrollTo({
            top: targetY,
            left: 0,
            behavior: 'instant' as ScrollBehavior,
          });

          // Re-verify on subsequent microtasks to override any browser layout recalculation
          requestAnimationFrame(() => {
            window.scrollTo({
              top: targetY,
              left: 0,
              behavior: 'instant' as ScrollBehavior,
            });
            setTimeout(() => {
              htmlEl.style.scrollBehavior = prevBehavior;
            }, 50);
          });
        }
      };
    }
  }, [isViewing]);

  // Close picture viewer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isViewingPicture) {
        closePictureViewer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isViewingPicture]);

  return (
    <MediaViewerContext.Provider
      value={{
        isViewing,
        isViewingCertificate,
        isViewingPicture,
        pictureData,
        openPictureViewer,
        closePictureViewer,
        setIsViewingCertificate: handleSetIsViewingCertificate,
      }}
    >
      {children}
    </MediaViewerContext.Provider>
  );
};

export const useMediaViewer = (): MediaViewerContextType => {
  const context = useContext(MediaViewerContext);
  if (!context) {
    throw new Error('useMediaViewer must be used within a MediaViewerProvider');
  }
  return context;
};
