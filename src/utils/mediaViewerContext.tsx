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

  // Lock body scroll and update document attributes when viewing media
  useEffect(() => {
    if (isViewing) {
      document.body.classList.add('media-viewing-active');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('media-viewing-active');
      document.body.style.overflow = '';
    }

    return () => {
      document.body.classList.remove('media-viewing-active');
      document.body.style.overflow = '';
    };
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
