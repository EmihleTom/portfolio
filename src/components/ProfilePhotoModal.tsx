import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Camera,
  Github,
  Link as LinkIcon,
  Trash2,
  Check,
  AlertCircle,
  Image as ImageIcon,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { useProfilePhoto, processAndOptimizeImage } from '../utils/photoStorage';
import { personalInfo } from '../data/portfolioData';

interface ProfilePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfilePhotoModal: React.FC<ProfilePhotoModalProps> = ({ isOpen, onClose }) => {
  const { photo, updatePhoto, removePhoto } = useProfilePhoto();
  const [activeTab, setActiveTab] = useState<'upload' | 'github' | 'url' | 'code'>('upload');

  // Input states
  const [urlInput, setUrlInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset messages when opening
  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Process a selected file
  const handleFileProcess = (file: File) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WebP, GIF, or SVG).');
      return;
    }

    // Validate size (max 4.5MB to fit cleanly in local storage)
    if (file.size > 4.5 * 1024 * 1024) {
      setErrorMessage('Image size is too large (max 4.5MB). Please choose a smaller image.');
      return;
    }

    setIsProcessing(true);
    processAndOptimizeImage(file)
      .then((optimizedDataUrl) => {
        updatePhoto(optimizedDataUrl);
        setSuccessMessage('Profile photo successfully updated and saved!');
        setIsProcessing(false);
      })
      .catch((err) => {
        console.error('Error processing image:', err);
        setErrorMessage('Failed to read image file. Please try another photo.');
        setIsProcessing(false);
      });
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  // Handle manual file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  // Handle GitHub Avatar
  const handleUseGithubAvatar = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const githubAvatarUrl = 'https://github.com/EmihleTom.png';

    // Test image loading
    const img = new Image();
    img.onload = () => {
      updatePhoto(githubAvatarUrl);
      setSuccessMessage('Connected your GitHub profile picture (@EmihleTom)!');
    };
    img.onerror = () => {
      setErrorMessage('Could not load profile photo from GitHub. Please try uploading directly.');
    };
    img.src = githubAvatarUrl;
  };

  // Handle Direct URL submission
  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmed = urlInput.trim();
    if (!trimmed) {
      setErrorMessage('Please enter a valid image URL.');
      return;
    }

    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('/')) {
      setErrorMessage('URL must begin with https:// or /');
      return;
    }

    setIsProcessing(true);
    const img = new Image();
    img.onload = () => {
      updatePhoto(trimmed);
      setSuccessMessage('Profile photo updated from URL!');
      setUrlInput('');
      setIsProcessing(false);
    };
    img.onerror = () => {
      setIsProcessing(false);
      setErrorMessage('Failed to load image from this URL. Please check the link or upload a file.');
    };
    img.src = trimmed;
  };

  const handleRemove = () => {
    removePhoto();
    setSuccessMessage('Profile photo removed. Initial monogram restored.');
    setErrorMessage(null);
  };

  return (
    <div
      id="profile-photo-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="profile-photo-modal"
        className="frosted-glass-card rounded-3xl border border-white/90 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="profile-photo-modal-close-btn"
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-white/80 transition-colors cursor-pointer"
          aria-label="Close photo modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-950">
              Profile Photo Manager
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Upload or link your personal portrait for Emihle's profile
            </p>
          </div>
        </div>

        {/* Live Preview Card */}
        <div className="mb-6 p-4 rounded-2xl frosted-glass-subtle border border-white/80 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            {/* Round Avatar Preview */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                {photo ? (
                  <img
                    src={photo}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-blue-600 font-mono">
                    <span className="text-lg font-bold">ET</span>
                    <span className="text-[9px] text-blue-400">Default</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">{personalInfo.name}</p>
              <p className="text-xs text-slate-500 font-mono">
                {photo ? 'Custom photo active' : 'No photo uploaded yet'}
              </p>
              <p className="text-[11px] text-blue-600 font-medium mt-0.5">
                Displays in hero card & profile sections
              </p>
            </div>
          </div>

          {photo && (
            <button
              id="profile-photo-remove-btn"
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200/60 hover:bg-rose-100 transition-colors cursor-pointer shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Photo</span>
            </button>
          )}
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-start gap-2 animate-in fade-in">
            <Check className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Tab Selection */}
        <div className="grid grid-cols-2 sm:flex rounded-2xl bg-slate-100/80 p-1.5 sm:p-1 mb-5 text-xs font-semibold gap-1.5 sm:gap-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab('upload');
              setErrorMessage(null);
            }}
            className={`min-h-[40px] py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            <span>Upload File</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('github');
              setErrorMessage(null);
            }}
            className={`min-h-[40px] py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'github'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Github className="w-3.5 h-3.5 text-blue-600" />
            <span>From GitHub</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('url');
              setErrorMessage(null);
            }}
            className={`min-h-[40px] py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'url'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Image URL</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('code');
              setErrorMessage(null);
            }}
            className={`min-h-[40px] py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-blue-600" />
            <span>Code File</span>
          </button>
        </div>

        {/* Tab 1: Upload from Device (Drag & Drop + Click) */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg+xml"
              className="hidden"
              id="profile-file-input"
            />

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-8 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-3 ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/70 scale-[1.01]'
                  : 'border-slate-300 hover:border-blue-400 bg-white/50 hover:bg-white/80'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  {isDragging ? 'Drop your photo here' : 'Click to browse or drag & drop'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Supports PNG, JPG, WebP, GIF, or SVG (up to 4.5MB)
                </p>
              </div>
              <button
                type="button"
                className="mt-1 px-4 py-2 rounded-full bg-slate-900 text-white font-semibold text-xs hover:bg-blue-600 transition-colors pointer-events-none shadow-2xs"
              >
                Select Photo from Computer
              </button>
            </div>

            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              Your photo is saved locally in your browser so you see it instantly every time you open your portfolio.
            </p>
          </div>
        )}

        {/* Tab 2: From GitHub */}
        {activeTab === 'github' && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl frosted-glass-subtle border border-white/80 space-y-3">
              <div className="flex items-center gap-2.5">
                <Github className="w-5 h-5 text-slate-800" />
                <h4 className="text-sm font-bold text-slate-900">
                  Import GitHub Avatar
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatically import the profile picture from your GitHub account (<strong>@EmihleTom</strong>):
              </p>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 font-mono text-xs text-slate-700 flex items-center justify-between">
                <span>https://github.com/EmihleTom.png</span>
                <span className="text-[10px] text-blue-600 font-semibold uppercase">Official CDN</span>
              </div>
              <button
                id="profile-use-github-avatar-btn"
                type="button"
                onClick={handleUseGithubAvatar}
                disabled={isProcessing}
                className="w-full py-2.5 px-4 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                <span>Import GitHub Profile Picture</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Direct URL */}
        {activeTab === 'url' && (
          <form onSubmit={handleApplyUrl} className="space-y-4">
            <div>
              <label htmlFor="photo-url-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Image Web Address (URL)
              </label>
              <input
                id="photo-url-input"
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/my-photo.jpg"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all font-mono"
              />
            </div>

            <button
              id="profile-apply-url-btn"
              type="submit"
              disabled={isProcessing || !urlInput.trim()}
              className="w-full py-2.5 px-4 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Apply Image URL</span>
            </button>
          </form>
        )}

        {/* Tab 4: Repository File Guide */}
        {activeTab === 'code' && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl frosted-glass-subtle border border-white/80 text-xs text-slate-700 space-y-2.5">
              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-blue-600" />
                <span>Permanent Repository Method</span>
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you want your photo permanently bundled into your project repository (e.g. for GitHub commits or static deployments):
              </p>
              <ol className="list-decimal list-inside space-y-1.5 font-mono text-[11px] text-slate-700 pl-1">
                <li>
                  Place your image in <strong className="text-blue-600">/public/profile.jpg</strong>
                </li>
                <li>
                  Open <strong className="text-blue-600">src/data/portfolioData.ts</strong>
                </li>
                <li>
                  Set <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">profileImageUrl: '/profile.jpg'</code>
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-colors shadow-2xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
