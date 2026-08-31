import jsPDF from 'jspdf';
import {
  PersonalInfo,
  EducationItem,
  SkillCategory,
  ProjectItem,
  ExperienceItem,
  CertificationItem,
} from '../types';

interface ResumeData {
  personalInfo: PersonalInfo;
  educationList: EducationItem[];
  skillCategories: SkillCategory[];
  projectsList: ProjectItem[];
  experienceList: ExperienceItem[];
  certificationsList: CertificationItem[];
}

export function downloadResumePDF(data: ResumeData): void {
  const { personalInfo, educationList, skillCategories, projectsList, experienceList, certificationsList } = data;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      y = 18;
    }
  };

  // --- HEADER SECTION ---
  doc.setFillColor(30, 41, 59); // Slate 800
  doc.rect(margin, y, contentWidth, 26, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(personalInfo.name.toUpperCase(), margin + 6, y + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(147, 197, 253); // Light blue
  const title = personalInfo.tagline || 'Cisco IT Specialist | IT Support Technician | Web Developer';
  doc.text(title, margin + 6, y + 16);

  doc.setFontSize(8.5);
  doc.setTextColor(226, 232, 240);
  const contactLine = `${personalInfo.email}  |  ${personalInfo.location}  |  github.com/EmihleTom  |  linkedin.com/in/emihle-tom`;
  doc.text(contactLine, margin + 6, y + 22);

  y += 32;

  // --- SECTION BUILDER HELPER ---
  const addSectionTitle = (titleText: string) => {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(29, 78, 216); // Blue 700
    doc.text(titleText.toUpperCase(), margin, y);

    // Underline
    doc.setDrawColor(203, 213, 225); // Slate 300
    doc.setLineWidth(0.5);
    doc.line(margin, y + 2, pageWidth - margin, y + 2);
    y += 7;
  };

  // --- 1. PROFESSIONAL SUMMARY ---
  addSectionTitle('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85); // Slate 700
  const summaryText = personalInfo.bio || personalInfo.summary;
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  checkPageBreak(splitSummary.length * 4.2 + 4);
  doc.text(splitSummary, margin, y);
  y += splitSummary.length * 4.2 + 5;

  // --- 2. CORE SKILLS ---
  addSectionTitle('Technical Skills & Competencies');
  doc.setFontSize(8.5);
  skillCategories.forEach((cat) => {
    checkPageBreak(6);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`${cat.name}: `, margin, y);
    const catNameWidth = doc.getTextWidth(`${cat.name}: `);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const skillsString = cat.skills.join('  •  ');
    const splitSkills = doc.splitTextToSize(skillsString, contentWidth - catNameWidth);
    doc.text(splitSkills, margin + catNameWidth, y);
    y += Math.max(splitSkills.length * 4.2, 4.8);
  });
  y += 3;

  // --- 3. PROFESSIONAL EXPERIENCE ---
  addSectionTitle('Work Experience');
  experienceList.forEach((exp) => {
    checkPageBreak(18);
    // Role & Dates
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42); // Slate 900
    doc.text(exp.role, margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(37, 99, 235); // Blue 600
    const datesWidth = doc.getTextWidth(exp.dates);
    doc.text(exp.dates, pageWidth - margin - datesWidth, y);
    y += 4.5;

    // Organization & Location
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`${exp.organization} — ${exp.location}`, margin, y);
    y += 5;

    // Responsibilities
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    exp.responsibilities.forEach((resp) => {
      checkPageBreak(5);
      const bullet = '•  ';
      const bulletWidth = doc.getTextWidth(bullet);
      const splitResp = doc.splitTextToSize(resp, contentWidth - bulletWidth);
      doc.text(bullet, margin + 2, y);
      doc.text(splitResp, margin + 2 + bulletWidth, y);
      y += splitResp.length * 4.1;
    });
    y += 3;
  });

  // --- 4. EDUCATION & QUALIFICATIONS ---
  addSectionTitle('Education & Training');
  educationList.forEach((edu) => {
    checkPageBreak(14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(edu.qualification, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const dateRange = edu.startDate === edu.endDate ? edu.startDate : `${edu.startDate} – ${edu.endDate}`;
    const dateWidth = doc.getTextWidth(dateRange);
    doc.text(dateRange, pageWidth - margin - dateWidth, y);
    y += 4.2;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(37, 99, 235);
    doc.text(edu.institution, margin, y);
    y += 4.5;

    if (edu.description) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      const splitDesc = doc.splitTextToSize(edu.description, contentWidth);
      doc.text(splitDesc, margin, y);
      y += splitDesc.length * 3.8 + 2;
    }
  });

  // --- 5. CERTIFICATIONS ---
  addSectionTitle('Certifications & Credentials');
  certificationsList.forEach((cert) => {
    checkPageBreak(10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`•  ${cert.name}`, margin + 2, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const providerDate = `${cert.provider} (${cert.date})`;
    const providerWidth = doc.getTextWidth(providerDate);
    doc.text(providerDate, pageWidth - margin - providerWidth, y);
    y += 4.2;
  });
  y += 3;

  // --- 6. FEATURED PROJECTS ---
  if (projectsList.length > 0) {
    addSectionTitle('Featured Projects');
    projectsList.forEach((proj) => {
      checkPageBreak(16);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(proj.name, margin, y);

      if (proj.role) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(37, 99, 235);
        const roleWidth = doc.getTextWidth(proj.role);
        doc.text(proj.role, pageWidth - margin - roleWidth, y);
      }
      y += 4.2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      const splitProjDesc = doc.splitTextToSize(proj.description, contentWidth);
      doc.text(splitProjDesc, margin, y);
      y += splitProjDesc.length * 3.8 + 1.5;

      // Tech stack
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      const stackText = `Technologies: ${proj.technologies.join(', ')}`;
      doc.text(stackText, margin, y);
      y += 5;
    });
  }

  // --- FOOTER ON ALL PAGES ---
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184); // Slate 400
    doc.text(
      `Emihle Tom — Professional Curriculum Vitae (Cape Town, Western Cape) — Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  // Save the generated PDF
  doc.save('Emihle_Tom_Resume.pdf');
}
