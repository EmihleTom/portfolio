import { useState, useEffect } from 'react';
import {
  personalInfo as defaultPersonalInfo,
  educationList as defaultEducationList,
  skillCategories as defaultSkillCategories,
  projectsList as defaultProjectsList,
  experienceList as defaultExperienceList,
  certificationsList as defaultCertificationsList,
} from '../data/portfolioData';
import {
  PersonalInfo,
  EducationItem,
  SkillCategory,
  ProjectItem,
  ExperienceItem,
  CertificationItem,
} from '../types';
import { sortCertificatesByDate } from './certificateTheme';

export interface PortfolioState {
  personalInfo: PersonalInfo;
  educationList: EducationItem[];
  skillCategories: SkillCategory[];
  projectsList: ProjectItem[];
  experienceList: ExperienceItem[];
  certificationsList: CertificationItem[];
}

const STORAGE_KEY = 'emihle_portfolio_state_v14';
const LEGACY_STORAGE_KEYS = [
  'emihle_portfolio_state_v13',
  'emihle_portfolio_state_v12',
  'emihle_portfolio_state_v11',
  'emihle_portfolio_state_v10',
  'emihle_portfolio_state_v9',
  'emihle_portfolio_state_v8',
  'emihle_portfolio_state_v7',
  'emihle_portfolio_state_v6',
  'emihle_portfolio_state_v5',
  'emihle_portfolio_state_v4',
  'emihle_portfolio_state_v3',
  'emihle_portfolio_state_v2',
  'emihle_portfolio_state_v1',
];


const EVENT_NAME = 'emihle_portfolio_updated';
export const OWNER_MODE_KEY = 'emihle_portfolio_owner_mode';
export const OWNER_MODE_EVENT = 'emihle_portfolio_owner_mode_changed';

/**
 * Determines whether Owner Edit Mode is currently active.
 * When published (e.g. shared preview ais-pre-*, production domains, external visitors):
 * Default is FALSE (Read-Only Mode) so visitors cannot change anything!
 * Only enabled if:
 * 1. URL parameter has ?edit=true or ?edit=1 or ?owner=true
 * 2. Stored 'true' in localStorage for this browser (via owner passcode)
 * 3. In AI Studio dev editor or local dev (localhost/ais-dev), defaults to true but can be toggled
 */
export function isOwnerModeActive(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const params = new URLSearchParams(window.location.search);
    if (
      params.get('edit') === 'true' ||
      params.get('edit') === '1' ||
      params.get('owner') === 'true' ||
      params.get('admin') === 'true'
    ) {
      localStorage.setItem(OWNER_MODE_KEY, 'true');
      return true;
    }
    if (
      params.get('edit') === 'false' ||
      params.get('view') === 'true' ||
      params.get('readonly') === 'true'
    ) {
      localStorage.setItem(OWNER_MODE_KEY, 'false');
      return false;
    }
  } catch {
    // ignore
  }

  try {
    const stored = localStorage.getItem(OWNER_MODE_KEY);
    if (stored === 'true') return true;
    if (stored === 'false') return false;
  } catch {
    // ignore
  }

  // Development environment check (AI Studio dev or localhost)
  try {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host.includes('ais-dev')) {
      return true;
    }
  } catch {
    // ignore
  }

  // Default for all other viewers / published links is strictly Read-Only
  return false;
}

export function setOwnerMode(enabled: boolean) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(OWNER_MODE_KEY, enabled ? 'true' : 'false');
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(OWNER_MODE_EVENT, { detail: enabled }));
}

const LEGACY_DEFAULT_BIOS = [
  'A passionate technology professional with foundational expertise in IT infrastructure and an active interest in software engineering, modern web development, and emerging technologies. Dedicated to continuous learning, disciplined problem-solving, and building practical digital solutions.',
];

function getInitialState(): PortfolioState {
  if (typeof window === 'undefined') {
    return {
      personalInfo: defaultPersonalInfo,
      educationList: defaultEducationList,
      skillCategories: defaultSkillCategories,
      projectsList: defaultProjectsList,
      experienceList: defaultExperienceList,
      certificationsList: defaultCertificationsList,
    };
  }

  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      for (const legacyKey of LEGACY_STORAGE_KEYS) {
        const legacyRaw = localStorage.getItem(legacyKey);
        if (legacyRaw) {
          raw = legacyRaw;
          break;
        }
      }
    }

    if (raw) {
      const parsed = JSON.parse(raw);
      const loadedPersonalInfo = { ...defaultPersonalInfo, ...parsed.personalInfo };

      // Migrate candidate profile to updated values if from previous version
      if (
        loadedPersonalInfo.name === 'Emihle Tom' ||
        loadedPersonalInfo.name === 'Emihle (Liyema) Tom' ||
        loadedPersonalInfo.name.includes('(Liyema)')
      ) {
        loadedPersonalInfo.name = defaultPersonalInfo.name;
      }
      if (
        !loadedPersonalInfo.location ||
        loadedPersonalInfo.location.toLowerCase().includes('eerste') ||
        loadedPersonalInfo.location === 'Cape Town, South Africa'
      ) {
        loadedPersonalInfo.location = 'Western Cape, Cape Town';
      }
      if (
        !loadedPersonalInfo.tagline ||
        loadedPersonalInfo.tagline.toLowerCase().includes('capaciti') ||
        loadedPersonalInfo.tagline === 'IT Specialist | Technology Enthusiast | Future Developer'
      ) {
        loadedPersonalInfo.tagline = defaultPersonalInfo.tagline;
      }
      if (
        !loadedPersonalInfo.status ||
        loadedPersonalInfo.status.toLowerCase().includes('capaciti') ||
        loadedPersonalInfo.status.includes('Open to Junior IT & Developer')
      ) {
        loadedPersonalInfo.status = defaultPersonalInfo.status;
      }
      // Permanently lock profile image to official portrait
      loadedPersonalInfo.profileImageUrl = defaultPersonalInfo.profileImageUrl;

      // Migrate outdated single-sentence boilerplate bio or capaciti bio if present
      if (
        !loadedPersonalInfo.bio ||
        LEGACY_DEFAULT_BIOS.includes(loadedPersonalInfo.bio.trim()) ||
        loadedPersonalInfo.bio.includes('Information Technology Support Technician at CAPACITI')
      ) {
        loadedPersonalInfo.bio = defaultPersonalInfo.bio;
      } else if (loadedPersonalInfo.bio.toLowerCase().includes('eerste')) {
        loadedPersonalInfo.bio = loadedPersonalInfo.bio
          .replace(/Eerste River,\s*/gi, '')
          .replace(/Eerste River/gi, 'Western Cape, Cape Town');
      }

      if (
        !loadedPersonalInfo.summary ||
        loadedPersonalInfo.summary.toLowerCase().includes('capaciti')
      ) {
        loadedPersonalInfo.summary = defaultPersonalInfo.summary;
      } else if (loadedPersonalInfo.summary.toLowerCase().includes('eerste')) {
        loadedPersonalInfo.summary = loadedPersonalInfo.summary
          .replace(/Eerste River,\s*/gi, '')
          .replace(/Eerste River/gi, 'Western Cape, Cape Town');
      }

      // Migrate LinkedIn URL to user's official profile if absent or legacy
      if (
        !loadedPersonalInfo.linkedinUrl ||
        loadedPersonalInfo.linkedinUrl === 'https://linkedin.com/in/emihle-tom' ||
        loadedPersonalInfo.linkedinUrl === 'https://www.linkedin.com/in/emihle-tom' ||
        !loadedPersonalInfo.linkedinUrl.includes('9a4a003a1')
      ) {
        loadedPersonalInfo.linkedinUrl = 'https://www.linkedin.com/in/emihle-tom-9a4a003a1';
      }

      // Filter out Cisco IT specialist from experienceList per user request and update CAPACITI current activities
      let loadedExperience = parsed.experienceList;
      if (loadedExperience && Array.isArray(loadedExperience)) {
        loadedExperience = loadedExperience
          .filter(
            (e: ExperienceItem) =>
              !e.role.toLowerCase().includes('cisco') &&
              !e.id.includes('cct-it-specialist')
          )
          .map((e: ExperienceItem) => {
            if (e.location && e.location.toLowerCase().includes('eerste')) {
              return { ...e, location: 'Western Cape, Cape Town' };
            }
            // Update CAPACITI current responsibilities and achievements
            if (
              e.organization.toLowerCase().includes('capaciti') ||
              e.id.includes('capaciti')
            ) {
              const defaultCapaciti = defaultExperienceList.find((d) =>
                d.organization.toLowerCase().includes('capaciti')
              );
              if (defaultCapaciti) {
                return {
                  ...e,
                  role: 'Information Technology Support Technician',
                  organization: 'CAPACITI',
                  dates: '2025 – Present',
                  location: 'Western Cape, Cape Town',
                  logoUrl: '/logos/capaciti-symbol.webp',
                  responsibilities: defaultCapaciti.responsibilities,
                  skillsGained: defaultCapaciti.skillsGained,
                  achievements: defaultCapaciti.achievements,
                };
              }
            }
            return e;
          });
      }
      if (!loadedExperience || loadedExperience.length === 0 || !loadedExperience.some((e: ExperienceItem) => e.organization.toLowerCase().includes('capaciti'))) {
        loadedExperience = defaultExperienceList;
      }

      // Update education records:
      // - Remove "IT Support Technician Certification" as requested by user
      // - "Cisco IT Specialist (CCNA)" -> uses official CCT logo /logos/cct-logo.svg
      // - Ensure Matric in 2024 is in the education section with strictly unique keys
      let loadedEducation = parsed.educationList;
      if (loadedEducation && Array.isArray(loadedEducation)) {
        loadedEducation = loadedEducation
          .filter((edu: EducationItem) => {
            const inst = (edu.institution || '').toLowerCase();
            const qual = (edu.qualification || '').toLowerCase();
            if (qual.includes('it support technician') || edu.id.includes('capaciti-it-support')) {
              return false;
            }
            if (inst.includes('capaciti') && qual.includes('it support')) {
              return false;
            }
            return true;
          })
          .map((edu: EducationItem) => {
            let logoUrl = edu.logoUrl;
            if (!logoUrl) {
              const match = defaultEducationList.find(
                (d) => d.id === edu.id || d.institution.toLowerCase() === edu.institution.toLowerCase()
              );
              logoUrl = match?.logoUrl;
            }
            if (
              edu.institution.toLowerCase().includes('college of cape town') ||
              edu.qualification.toLowerCase().includes('cisco') ||
              edu.qualification.toLowerCase().includes('information technology qualification')
            ) {
              return {
                ...edu,
                id: 'cct-cisco-it-specialist-2025',
                qualification: 'Cisco IT Specialist (CCNA)',
                institution: 'College of Cape Town',
                startDate: '2025',
                endDate: '2025',
                status: 'Completed',
                logoUrl: '/logos/cct-logo.svg',
                description:
                  'Specialized enterprise networking and systems qualification focused on Cisco Certified Network Associate (CCNA) curricula — routing, switching, IPv4/IPv6 subnetting, Packet Tracer topologies, network security, and infrastructure diagnostics.',
                focusAreas: [
                  'CCNA Routing & Switching Architecture',
                  'IP Addressing, IPv4/IPv6 Subnetting & VLSM',
                  'Cisco Packet Tracer Network Simulations',
                  'VLANs, Trunks, STP & Router Configuration',
                  'Network Security, Firewalls & Troubleshooting',
                  'Hardware Diagnostics & System Infrastructure',
                ],
              };
            }
            if (edu.qualification.toLowerCase().includes('matric')) {
              return {
                ...edu,
                id: 'matric-nsc-2024',
                startDate: '2024',
                endDate: '2024',
                status: 'Completed',
                logoUrl: '/logos/dbe-symbol.png',
              };
            }
            return { ...edu, logoUrl };
          });

        // Ensure College of Cape Town Cisco IT is present
        if (!loadedEducation.some((e: EducationItem) => e.qualification.toLowerCase().includes('cisco'))) {
          const defaultCisco = defaultEducationList.find((e) => e.qualification.toLowerCase().includes('cisco'));
          if (defaultCisco) {
            loadedEducation.unshift(defaultCisco);
          }
        }

        // Ensure Matric is included in education
        if (!loadedEducation.some((e: EducationItem) => e.qualification.toLowerCase().includes('matric'))) {
          const defaultMatric = defaultEducationList.find((e) => e.qualification.toLowerCase().includes('matric'));
          if (defaultMatric) {
            loadedEducation.push(defaultMatric);
          }
        }

        // Strictly deduplicate loadedEducation by id and qualification so duplicate keys are impossible
        const seenEduIds = new Set<string>();
        const seenEduQuals = new Set<string>();
        loadedEducation = loadedEducation.filter((edu: EducationItem) => {
          const qualKey = (edu.qualification || '').toLowerCase();
          const isMatric = qualKey.includes('matric') || (edu.id && edu.id.includes('matric'));
          const isCisco = qualKey.includes('cisco') || (edu.id && edu.id.includes('cisco'));

          if (isMatric) {
            if (seenEduQuals.has('matric') || (edu.id && seenEduIds.has(edu.id))) return false;
            seenEduQuals.add('matric');
            if (edu.id) seenEduIds.add(edu.id);
            return true;
          }
          if (isCisco) {
            if (seenEduQuals.has('cisco') || (edu.id && seenEduIds.has(edu.id))) return false;
            seenEduQuals.add('cisco');
            if (edu.id) seenEduIds.add(edu.id);
            return true;
          }
          if (edu.id && seenEduIds.has(edu.id)) {
            return false;
          }
          if (edu.id) seenEduIds.add(edu.id);
          return true;
        });
      }
      if (!loadedEducation || loadedEducation.length === 0) {
        loadedEducation = defaultEducationList;
      }

      // Update certifications list:
      // Ensure all credentials from defaultCertificationsList are merged in
      let loadedCertifications = parsed.certificationsList;
      if (loadedCertifications && Array.isArray(loadedCertifications)) {
        // Map existing with latest info and ensure all default fields are up-to-date
        loadedCertifications = loadedCertifications.map((cert: CertificationItem) => {
          const match = defaultCertificationsList.find(
            (d) => d.id === cert.id || d.name.toLowerCase() === cert.name.toLowerCase()
          );
          if (match) {
            return {
              ...cert,
              ...match,
              recipientName: 'Emihle Liyema Tom',
            };
          }
          let logoUrl = cert.logoUrl;
          if (!logoUrl) {
            const fallbackMatch = defaultCertificationsList.find(
              (d) => d.provider.toLowerCase() === cert.provider.toLowerCase() || d.badgeType === cert.badgeType
            );
            logoUrl = fallbackMatch?.logoUrl;
          }
          return { ...cert, logoUrl };
        });

        // Add any missing certifications from defaultCertificationsList (preserves existing, adds missing)
        for (const defaultCert of defaultCertificationsList) {
          const exists = loadedCertifications.some(
            (c: CertificationItem) => c.id === defaultCert.id || c.name.toLowerCase() === defaultCert.name.toLowerCase()
          );
          if (!exists) {
            loadedCertifications.push(defaultCert);
          }
        }
      } else {
        loadedCertifications = defaultCertificationsList;
      }

      // Ensure certifications are in order according to dates completed (reverse chronological)
      loadedCertifications = sortCertificatesByDate(loadedCertifications, 'desc');


      // Ensure it-support skills and ai-technology skills are up to date
      let loadedSkillCategories = parsed.skillCategories;
      if (loadedSkillCategories && Array.isArray(loadedSkillCategories)) {
        loadedSkillCategories = loadedSkillCategories.map((cat: SkillCategory) => {
          if (cat.id === 'it-support') {
            const currentSkills = new Set(cat.skills);
            ['Technical Support', 'System Maintenance', 'Troubleshooting', 'Active Directory', 'Hardware Repair', 'Helpdesk Support'].forEach((s) => currentSkills.add(s));
            return { ...cat, skills: Array.from(currentSkills) };
          }
          if (cat.id === 'ai-technology') {
            return {
              ...cat,
              name: 'AI & Machine Learning',
              description: 'Generative AI, supervised & unsupervised machine learning, prompt engineering, and ethical AI systems.',
              skills: [
                'Generative AI',
                'Prompt Engineering',
                'Supervised & Unsupervised ML',
                'Large Language Models (LLMs)',
                'Responsible AI & Ethics',
                'AI Productivity Tools',
              ],
            };
          }
          return cat;
        });
      } else {
        loadedSkillCategories = defaultSkillCategories;
      }

      // Remove dummy project (portfolio-v1) if present and ensure authentic GitHub project is included
      let loadedProjects = parsed.projectsList;
      if (loadedProjects && Array.isArray(loadedProjects) && loadedProjects.length > 0) {
        loadedProjects = loadedProjects.filter((p: ProjectItem) => p.id !== 'portfolio-v1');
        const hasGithubProject = loadedProjects.some(
          (p: ProjectItem) =>
            p.id === 'ai-productivity-assistant' ||
            p.githubUrl?.toLowerCase().includes('ai-productivity-assistant')
        );
        if (!hasGithubProject && defaultProjectsList.length > 0) {
          loadedProjects = [...defaultProjectsList, ...loadedProjects];
        }
      } else {
        loadedProjects = defaultProjectsList;
      }

      const mergedState: PortfolioState = {
        personalInfo: loadedPersonalInfo,
        educationList: loadedEducation && loadedEducation.length > 0 ? loadedEducation : defaultEducationList,
        skillCategories: loadedSkillCategories && loadedSkillCategories.length > 0 ? loadedSkillCategories : defaultSkillCategories,
        projectsList: loadedProjects || [],
        experienceList: loadedExperience && loadedExperience.length > 0 ? loadedExperience : defaultExperienceList,
        certificationsList: loadedCertifications && loadedCertifications.length > 0 ? loadedCertifications : defaultCertificationsList,
      };

      // Persist to the v4 key
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedState));
      } catch {
        // ignore
      }

      return mergedState;
    }
  } catch (err) {
    console.warn('Failed to load portfolio state from storage:', err);
  }

  return {
    personalInfo: defaultPersonalInfo,
    educationList: defaultEducationList,
    skillCategories: defaultSkillCategories,
    projectsList: defaultProjectsList,
    experienceList: defaultExperienceList,
    certificationsList: defaultCertificationsList,
  };
}

let currentState: PortfolioState = getInitialState();

function saveState(nextState: PortfolioState) {
  currentState = nextState;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  } catch (err) {
    console.warn('Failed to persist portfolio state:', err);
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: nextState }));
  }
}

export function usePortfolioData() {
  const [state, setState] = useState<PortfolioState>(currentState);
  const [isEditMode, setIsEditMode] = useState<boolean>(isOwnerModeActive);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<PortfolioState>;
      if (customEvent.detail) {
        setState(customEvent.detail);
      } else {
        setState(getInitialState());
      }
    };

    const handleModeUpdate = (e: Event) => {
      const ce = e as CustomEvent<boolean>;
      if (typeof ce?.detail === 'boolean') {
        setIsEditMode(ce.detail);
      } else {
        setIsEditMode(isOwnerModeActive());
      }
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener(OWNER_MODE_EVENT, handleModeUpdate);
    // Also listen to storage events from other tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setState(getInitialState());
      }
      if (e.key === OWNER_MODE_KEY) {
        setIsEditMode(isOwnerModeActive());
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener(OWNER_MODE_EVENT, handleModeUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const toggleEditMode = (force?: boolean) => {
    const next = force !== undefined ? force : !isEditMode;
    setOwnerMode(next);
    setIsEditMode(next);
  };

  const unlockOwnerMode = (passcode: string): boolean => {
    const clean = passcode.trim().toLowerCase();
    if (clean === '2026' || clean === 'emihle' || clean === 'admin' || clean === 'owner') {
      toggleEditMode(true);
      return true;
    }
    return false;
  };

  const lockOwnerMode = () => {
    toggleEditMode(false);
  };

  // Actions
  const updatePersonalInfo = (updates: Partial<PersonalInfo>) => {
    if (!isOwnerModeActive()) return;
    const updated = {
      ...state,
      personalInfo: { ...state.personalInfo, ...updates },
    };
    saveState(updated);
  };

  const addSkill = (categoryId: string, skill: string) => {
    const cleanSkill = skill.trim();
    if (!cleanSkill) return;

    const updatedCategories = state.skillCategories.map((cat) => {
      if (cat.id === categoryId) {
        if (cat.skills.includes(cleanSkill)) return cat;
        return {
          ...cat,
          skills: [...cat.skills, cleanSkill],
        };
      }
      return cat;
    });

    saveState({ ...state, skillCategories: updatedCategories });
  };

  const removeSkill = (categoryId: string, skillToRemove: string) => {
    const updatedCategories = state.skillCategories.map((cat) => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          skills: cat.skills.filter((s) => s !== skillToRemove),
        };
      }
      return cat;
    });

    saveState({ ...state, skillCategories: updatedCategories });
  };

  const addProject = (project: Omit<ProjectItem, 'id'> & { id?: string }) => {
    const newProject: ProjectItem = {
      ...project,
      id: project.id || `project-${Date.now()}`,
    };
    saveState({
      ...state,
      projectsList: [newProject, ...state.projectsList],
    });
  };

  const editProject = (id: string, updates: Partial<ProjectItem>) => {
    const updatedProjects = state.projectsList.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    saveState({ ...state, projectsList: updatedProjects });
  };

  const deleteProject = (id: string) => {
    saveState({
      ...state,
      projectsList: state.projectsList.filter((p) => p.id !== id),
    });
  };

  const addExperience = (exp: Omit<ExperienceItem, 'id'> & { id?: string }) => {
    const newExp: ExperienceItem = {
      ...exp,
      id: exp.id || `experience-${Date.now()}`,
    };
    saveState({
      ...state,
      experienceList: [newExp, ...state.experienceList],
    });
  };

  const editExperience = (id: string, updates: Partial<ExperienceItem>) => {
    const updatedExp = state.experienceList.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    saveState({ ...state, experienceList: updatedExp });
  };

  const deleteExperience = (id: string) => {
    saveState({
      ...state,
      experienceList: state.experienceList.filter((item) => item.id !== id),
    });
  };

  const addCertification = (cert: Omit<CertificationItem, 'id'> & { id?: string }) => {
    const newCert: CertificationItem = {
      ...cert,
      id: cert.id || `cert-${Date.now()}`,
    };
    const updated = sortCertificatesByDate([newCert, ...state.certificationsList], 'desc');
    saveState({
      ...state,
      certificationsList: updated,
    });
  };

  const editCertification = (id: string, updates: Partial<CertificationItem>) => {
    const updatedCerts = state.certificationsList.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    const sorted = sortCertificatesByDate(updatedCerts, 'desc');
    saveState({ ...state, certificationsList: sorted });
  };

  const deleteCertification = (id: string) => {
    saveState({
      ...state,
      certificationsList: state.certificationsList.filter((c) => c.id !== id),
    });
  };

  const addEducation = (edu: Omit<EducationItem, 'id'> & { id?: string }) => {
    const newEdu: EducationItem = {
      ...edu,
      id: edu.id || `edu-${Date.now()}`,
    };
    saveState({
      ...state,
      educationList: [...state.educationList, newEdu],
    });
  };

  const deleteEducation = (id: string) => {
    saveState({
      ...state,
      educationList: state.educationList.filter((e) => e.id !== id),
    });
  };

  const resetToDefaults = () => {
    saveState({
      personalInfo: defaultPersonalInfo,
      educationList: defaultEducationList,
      skillCategories: defaultSkillCategories,
      projectsList: defaultProjectsList,
      experienceList: defaultExperienceList,
      certificationsList: defaultCertificationsList,
    });
  };

  return {
    ...state,
    isEditMode,
    toggleEditMode,
    unlockOwnerMode,
    lockOwnerMode,
    updatePersonalInfo,
    addSkill,
    removeSkill,
    addProject,
    editProject,
    deleteProject,
    addExperience,
    editExperience,
    deleteExperience,
    addCertification,
    editCertification,
    deleteCertification,
    addEducation,
    deleteEducation,
    resetToDefaults,
  };
}
