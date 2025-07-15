export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  profilePicture: string | null;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Project {
  title: string;
  duration: string;
  description: string;
}

export interface Certification {
  certificateName: string;
  issuingOrganization: string;
  year: string;
}

export interface Resume {
  id: number | null;
  userId: number;
  title: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  skills: string;
  summary: string;
  template: string;
}