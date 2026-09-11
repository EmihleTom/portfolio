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

  const isViewingPicture = !!pictureData;
  const isViewing = isViewingCertificate || isViewingPicture;

  const openPictureViewer = (src: string, title?: string, subtitle?: string) => {
    setPictureData({ src, title, subtitle });
  };

  const closePictureViewer = () => {
    setPictureData(null);
  };

  // Lock body and html scroll completely when viewing media (certificates or pictures)
  useEffect(() => {
    if (isViewing) {
      // Calculate scrollbar width to prevent page shift
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.documentElement.classList.add('media-viewing-active');
      document.body.classList.add('media-viewing-active');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overscrollBehavior = 'none';
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

      window.addEventListener('touchmove', handleTouchMove, { passive: false });

      return () => {
        document.documentElement.classList.remove('media-viewing-active');
        document.body.classList.remove('media-viewing-active');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.documentElement.style.overscrollBehavior = '';
        document.body.style.overscrollBehavior = '';
        document.body.style.paddingRight = '';
        window.removeEventListener('touchmove', handleTouchMove);
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
        setIsViewingCertificate,
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
