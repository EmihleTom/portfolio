import { useState, useEffect, useCallback } from 'react';
import { personalInfo } from '../data/portfolioData';

const STORAGE_KEY = 'emihle_profile_photo_v13';
const LEGACY_STORAGE_KEYS = ['emihle_profile_photo_v12', 'emihle_profile_photo_v11', 'emihle_profile_photo_v10', 'emihle_profile_photo_v9', 'emihle_profile_photo_v8', 'emihle_profile_photo_v7', 'emihle_profile_photo_v6', 'emihle_profile_photo_v5', 'emihle_profile_photo_v4', 'emihle_profile_photo_v3', 'emihle_profile_photo_v2', 'emihle_profile_photo'];
const EVENT_NAME = 'emihle_profile_photo_updated';

export function getStoredProfilePhoto(): string {
  try {
    for (const legacy of LEGACY_STORAGE_KEYS) {
      try {
        localStorage.removeItem(legacy);
      } catch {
        // ignore
      }
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored.trim() !== '') {
      return stored;
    }
  } catch {
    // LocalStorage might be disabled in strict privacy modes
  }
  return personalInfo.profileImageUrl && personalInfo.profileImageUrl.trim() !== ''
    ? personalInfo.profileImageUrl
    : '/profile.jpg';
}

export function saveProfilePhoto(photoUrl: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, photoUrl);
  } catch (err) {
    console.warn('Could not save photo to localStorage', err);
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: photoUrl }));
  }
}

export function clearProfilePhoto(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Could not remove photo from localStorage', err);
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: null }));
  }
}

export async function processAndOptimizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (!src) {
        reject(new Error('Failed to read image file'));
        return;
      }
      const img = new Image();
      img.onload = () => {
        const MAX_SIZE = 900;
        let width = img.width;
        let height = img.height;

        if (width > MAX_SIZE || height > MAX_SIZE) {
          if (width > height) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          } else {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(src);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        try {
          const optimized = canvas.toDataURL('image/jpeg', 0.88);
          resolve(optimized);
        } catch {
          resolve(src);
        }
      };
      img.onerror = () => reject(new Error('Failed to parse image data'));
      img.src = src;
    };
    reader.onerror = () => reject(new Error('FileReader failed'));
    reader.readAsDataURL(file);
  });
}

export function useProfilePhoto(): {
  photo: string | null;
  updatePhoto: (url: string) => void;
  removePhoto: () => void;
} {
  const [photo, setPhoto] = useState<string | null>(getStoredProfilePhoto);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string | null>;
      setPhoto(customEvent.detail ?? null);
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setPhoto(e.newValue || (personalInfo.profileImageUrl || null));
      }
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const updatePhoto = useCallback((url: string) => {
    saveProfilePhoto(url);
    setPhoto(url);
  }, []);

  const removePhoto = useCallback(() => {
    clearProfilePhoto();
    setPhoto(personalInfo.profileImageUrl || null);
  }, []);

  return { photo, updatePhoto, removePhoto };
}
