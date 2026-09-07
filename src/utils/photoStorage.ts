import { useState, useCallback } from 'react';

/**
 * Permanent Locked Profile Photo
 * Sourced directly from Gemini_Generated_Image_.jpg (GitHub @EmihleTom)
 * Locked in permanently per user instruction - never change.
 */
export const LOCKED_PROFILE_PHOTO = '/profile.jpg';

const ALL_LEGACY_STORAGE_KEYS = [
  'emihle_profile_photo_v13',
  'emihle_profile_photo_v12',
  'emihle_profile_photo_v11',
  'emihle_profile_photo_v10',
  'emihle_profile_photo_v9',
  'emihle_profile_photo_v8',
  'emihle_profile_photo_v7',
  'emihle_profile_photo_v6',
  'emihle_profile_photo_v5',
  'emihle_profile_photo_v4',
  'emihle_profile_photo_v3',
  'emihle_profile_photo_v2',
  'emihle_profile_photo',
];

export function getStoredProfilePhoto(): string {
  // Clear any old temporary overrides from localStorage
  if (typeof window !== 'undefined') {
    try {
      for (const legacy of ALL_LEGACY_STORAGE_KEYS) {
        localStorage.removeItem(legacy);
      }
    } catch {
      // ignore in strict privacy environments
    }
  }
  return LOCKED_PROFILE_PHOTO;
}

export function saveProfilePhoto(_photoUrl?: string): void {
  // Permanently locked - do not override
}

export function clearProfilePhoto(): void {
  // Permanently locked - do not remove
}

export async function processAndOptimizeImage(_file: File): Promise<string> {
  return LOCKED_PROFILE_PHOTO;
}

export function useProfilePhoto(): {
  photo: string;
  updatePhoto: (url: string) => void;
  removePhoto: () => void;
  isLocked: boolean;
} {
  const [photo] = useState<string>(LOCKED_PROFILE_PHOTO);

  const updatePhoto = useCallback((_url: string) => {
    // Locked permanently
  }, []);

  const removePhoto = useCallback(() => {
    // Locked permanently
  }, []);

  return { photo, updatePhoto, removePhoto, isLocked: true };
}

