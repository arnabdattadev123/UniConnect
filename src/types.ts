export type UserRole = 'student' | 'alumni';

export interface StudentSkill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
}

export interface StudentAchievement {
  id: string;
  title: string;
  category: 'Project' | 'Award' | 'Hackathon' | 'Certification' | 'Research' | 'Club / Leadership';
  date: string;
  description: string;
  link?: string;
}

export interface StudentProfile {
  id: string;
  role: 'student';
  email: string;
  password?: string;
  name: string;
  avatar: string;
  university: string;
  major: string;
  degreeLevel: string; // e.g. "B.S.", "M.S.", "Ph.D."
  graduationYear: string;
  gpa?: string;
  headline: string;
  bio: string;
  location: string;
  links: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    resumeUrl?: string;
  };
  skills: StudentSkill[];
  achievements: StudentAchievement[];
}

export interface AlumniProfile {
  id: string;
  role: 'alumni';
  email: string;
  password?: string;
  name: string;
  avatar: string;
  almaMater: string;
  graduationYear: string;
  currentCompany: string;
  currentTitle: string;
  industry: string;
  experienceYears: string;
  location: string;
  headline: string;
  bio: string;
  links: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  mentorshipTopics: string[];
  isAvailableForReferrals: boolean;
  isAvailableForMentoring: boolean;
}

export type UserProfile = StudentProfile | AlumniProfile;

export interface JobVacancy {
  id: string;
  alumniId: string;
  alumniName: string;
  alumniTitle: string;
  alumniCompany: string;
  alumniAvatar: string;
  title: string;
  company: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  type: 'Full-time' | 'Internship' | 'Co-op' | 'Contract';
  experienceLevel: 'Intern' | 'Entry Level' | 'Mid Level' | 'Senior';
  department: string;
  description: string;
  requirements: string[];
  referralSlotsTotal: number;
  referralSlotsFilled: number;
  deadline: string;
  externalLink?: string;
  createdAt: string;
}

export type ApplicationStatus = 
  | 'Pending Review' 
  | 'In Review' 
  | 'Referral Submitted' 
  | 'Interview Offered' 
  | 'Not Selected';

export interface JobApplication {
  id: string;
  jobId: string;
  studentId: string;
  studentName: string;
  studentUniversity: string;
  studentMajor: string;
  studentGradYear: string;
  studentAvatar: string;
  jobTitle: string;
  company: string;
  alumniId: string;
  alumniName: string;
  appliedAt: string;
  status: ApplicationStatus;
  studentNote: string;
  resumeUrl: string;
  alumniFeedback?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentMajor?: string;
  alumniId: string;
  alumniName: string;
  alumniAvatar: string;
  alumniCompany: string;
  alumniTitle: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  lastSenderId: string;
}
