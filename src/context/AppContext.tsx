import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  AlumniProfile,
  UserProfile,
  JobVacancy,
  JobApplication,
  Conversation,
  ChatMessage,
  StudentSkill,
  StudentAchievement,
  ApplicationStatus,
  UserRole,
} from '../types';
import { loadStoredData, saveStoredData, INITIAL_STUDENTS, INITIAL_ALUMNI } from '../data/mockData';

interface AppContextType {
  currentUser: UserProfile | null;
  students: StudentProfile[];
  alumni: AlumniProfile[];
  jobs: JobVacancy[];
  applications: JobApplication[];
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  activeTab: 'profile' | 'jobs' | 'messages' | 'directory';
  selectedConversationId: string | null;
  setActiveTab: (tab: 'profile' | 'jobs' | 'messages' | 'directory') => void;
  setSelectedConversationId: (id: string | null) => void;
  
  // Auth methods
  login: (email: string, role: UserRole) => { success: boolean; message?: string };
  quickLoginAs: (role: UserRole, id?: string) => void;
  signupStudent: (data: Omit<StudentProfile, 'id' | 'role' | 'skills' | 'achievements'>) => { success: boolean; message?: string };
  signupAlumni: (data: Omit<AlumniProfile, 'id' | 'role'>) => { success: boolean; message?: string };
  logout: () => void;
  
  // Profile update methods
  updateStudentProfile: (updated: Partial<StudentProfile>) => void;
  updateAlumniProfile: (updated: Partial<AlumniProfile>) => void;
  addStudentSkill: (skill: Omit<StudentSkill, 'id'>) => void;
  removeStudentSkill: (skillId: string) => void;
  addStudentAchievement: (achievement: Omit<StudentAchievement, 'id'>) => void;
  removeStudentAchievement: (achievementId: string) => void;
  
  // Job / Referral methods
  postJobVacancy: (jobData: Omit<JobVacancy, 'id' | 'alumniId' | 'alumniName' | 'alumniTitle' | 'alumniCompany' | 'alumniAvatar' | 'referralSlotsFilled' | 'createdAt'>) => void;
  applyForJob: (jobId: string, studentNote: string, resumeUrl: string) => { success: boolean; message?: string };
  updateApplicationStatus: (applicationId: string, newStatus: ApplicationStatus, feedbackNote?: string) => void;
  
  // Messaging methods
  sendMessage: (conversationId: string, text: string) => void;
  startOrOpenConversation: (participant: StudentProfile | AlumniProfile) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialData = loadStoredData();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(initialData.currentUser);
  const [students, setStudents] = useState<StudentProfile[]>(initialData.students);
  const [alumni, setAlumni] = useState<AlumniProfile[]>(initialData.alumni);
  const [jobs, setJobs] = useState<JobVacancy[]>(initialData.jobs);
  const [applications, setApplications] = useState<JobApplication[]>(initialData.applications);
  const [conversations, setConversations] = useState<Conversation[]>(initialData.conversations);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(initialData.messages);
  const [activeTab, setActiveTab] = useState<'profile' | 'jobs' | 'messages' | 'directory'>('profile');
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
    initialData.conversations.length > 0 ? initialData.conversations[0].id : null
  );

  // Sync state to LocalStorage
  useEffect(() => {
    saveStoredData({
      students,
      alumni,
      jobs,
      applications,
      conversations,
      messages,
      currentUser,
    });
  }, [students, alumni, jobs, applications, conversations, messages, currentUser]);

  // Auth: Login
  const login = (email: string, role: UserRole) => {
    const cleanEmail = email.trim().toLowerCase();
    if (role === 'student') {
      const match = students.find((s) => s.email.toLowerCase() === cleanEmail);
      if (match) {
        setCurrentUser(match);
        return { success: true };
      }
      return { success: false, message: 'No student found with this email. Try quick demo login or sign up.' };
    } else {
      const match = alumni.find((a) => a.email.toLowerCase() === cleanEmail);
      if (match) {
        setCurrentUser(match);
        return { success: true };
      }
      return { success: false, message: 'No alumni found with this email. Try quick demo login or sign up.' };
    }
  };

  // Auth: Quick login for testing
  const quickLoginAs = (role: UserRole, id?: string) => {
    if (role === 'student') {
      const s = id ? students.find(u => u.id === id) || students[0] : students[0];
      setCurrentUser(s);
    } else {
      const a = id ? alumni.find(u => u.id === id) || alumni[0] : alumni[0];
      setCurrentUser(a);
    }
  };

  // Auth: Signup Student
  const signupStudent = (data: Omit<StudentProfile, 'id' | 'role' | 'skills' | 'achievements'>) => {
    const exists = students.some((s) => s.email.toLowerCase() === data.email.toLowerCase());
    if (exists) {
      return { success: false, message: 'A student account with this email already exists.' };
    }
    const newStudent: StudentProfile = {
      ...data,
      id: `student-${Date.now()}`,
      role: 'student',
      skills: [
        { id: `sk-${Date.now()}-1`, name: 'Problem Solving', level: 'Advanced', category: 'Core' },
        { id: `sk-${Date.now()}-2`, name: 'Communication', level: 'Intermediate', category: 'Soft Skills' }
      ],
      achievements: [
        {
          id: `ach-${Date.now()}-1`,
          title: 'Dean\'s Honor Roll',
          category: 'Award',
          date: 'Fall 2025',
          description: 'Recognized for top 5% academic performance in Computer Science & Engineering department.'
        }
      ]
    };
    setStudents((prev) => [newStudent, ...prev]);
    setCurrentUser(newStudent);
    return { success: true };
  };

  // Auth: Signup Alumni
  const signupAlumni = (data: Omit<AlumniProfile, 'id' | 'role'>) => {
    const exists = alumni.some((a) => a.email.toLowerCase() === data.email.toLowerCase());
    if (exists) {
      return { success: false, message: 'An alumni account with this email already exists.' };
    }
    const newAlumni: AlumniProfile = {
      ...data,
      id: `alumni-${Date.now()}`,
      role: 'alumni'
    };
    setAlumni((prev) => [newAlumni, ...prev]);
    setCurrentUser(newAlumni);
    return { success: true };
  };

  // Auth: Logout
  const logout = () => {
    setCurrentUser(null);
  };

  // Update Student Profile
  const updateStudentProfile = (updated: Partial<StudentProfile>) => {
    if (!currentUser || currentUser.role !== 'student') return;
    const updatedUser = { ...currentUser, ...updated } as StudentProfile;
    setCurrentUser(updatedUser);
    setStudents((prev) => prev.map((s) => (s.id === currentUser.id ? updatedUser : s)));
  };

  // Update Alumni Profile
  const updateAlumniProfile = (updated: Partial<AlumniProfile>) => {
    if (!currentUser || currentUser.role !== 'alumni') return;
    const updatedUser = { ...currentUser, ...updated } as AlumniProfile;
    setCurrentUser(updatedUser);
    setAlumni((prev) => prev.map((a) => (a.id === currentUser.id ? updatedUser : a)));
  };

  // Add Skill
  const addStudentSkill = (skill: Omit<StudentSkill, 'id'>) => {
    if (!currentUser || currentUser.role !== 'student') return;
    const newSkill: StudentSkill = {
      ...skill,
      id: `sk-${Date.now()}`,
    };
    const updatedSkills = [...currentUser.skills, newSkill];
    updateStudentProfile({ skills: updatedSkills });
  };

  // Remove Skill
  const removeStudentSkill = (skillId: string) => {
    if (!currentUser || currentUser.role !== 'student') return;
    const updatedSkills = currentUser.skills.filter((s) => s.id !== skillId);
    updateStudentProfile({ skills: updatedSkills });
  };

  // Add Achievement
  const addStudentAchievement = (achievement: Omit<StudentAchievement, 'id'>) => {
    if (!currentUser || currentUser.role !== 'student') return;
    const newAch: StudentAchievement = {
      ...achievement,
      id: `ach-${Date.now()}`,
    };
    const updatedAchievements = [newAch, ...currentUser.achievements];
    updateStudentProfile({ achievements: updatedAchievements });
  };

  // Remove Achievement
  const removeStudentAchievement = (achievementId: string) => {
    if (!currentUser || currentUser.role !== 'student') return;
    const updatedAchievements = currentUser.achievements.filter((a) => a.id !== achievementId);
    updateStudentProfile({ achievements: updatedAchievements });
  };

  // Post Job Vacancy (Alumni action)
  const postJobVacancy = (jobData: Omit<JobVacancy, 'id' | 'alumniId' | 'alumniName' | 'alumniTitle' | 'alumniCompany' | 'alumniAvatar' | 'referralSlotsFilled' | 'createdAt'>) => {
    if (!currentUser || currentUser.role !== 'alumni') return;
    const newJob: JobVacancy = {
      ...jobData,
      id: `job-${Date.now()}`,
      alumniId: currentUser.id,
      alumniName: currentUser.name,
      alumniTitle: currentUser.currentTitle,
      alumniCompany: currentUser.currentCompany,
      alumniAvatar: currentUser.avatar,
      referralSlotsFilled: 0,
      createdAt: new Date().toISOString(),
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  // Apply For Job (Student action)
  const applyForJob = (jobId: string, studentNote: string, resumeUrl: string) => {
    if (!currentUser || currentUser.role !== 'student') {
      return { success: false, message: 'You must be signed in as a student to apply.' };
    }
    const targetJob = jobs.find((j) => j.id === jobId);
    if (!targetJob) {
      return { success: false, message: 'Job not found.' };
    }
    const alreadyApplied = applications.some((app) => app.jobId === jobId && app.studentId === currentUser.id);
    if (alreadyApplied) {
      return { success: false, message: 'You have already applied or requested a referral for this opportunity.' };
    }

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentUniversity: currentUser.university,
      studentMajor: currentUser.major,
      studentGradYear: currentUser.graduationYear,
      studentAvatar: currentUser.avatar,
      jobTitle: targetJob.title,
      company: targetJob.company,
      alumniId: targetJob.alumniId,
      alumniName: targetJob.alumniName,
      appliedAt: new Date().toISOString(),
      status: 'Pending Review',
      studentNote,
      resumeUrl: resumeUrl || currentUser.links.resumeUrl || 'https://example.com/resume.pdf',
    };

    setApplications((prev) => [newApp, ...prev]);

    // Also update slots filled
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, referralSlotsFilled: j.referralSlotsFilled + 1 } : j
      )
    );

    // Auto-create/send introductory message into conversation with the alumni!
    const targetAlumni = alumni.find((a) => a.id === targetJob.alumniId);
    if (targetAlumni) {
      const convId = startOrOpenConversation(targetAlumni);
      sendMessage(
        convId,
        `Hi ${targetAlumni.name}, I just applied for your referral opening: "${targetJob.title}" at ${targetJob.company}. Note: "${studentNote}". Here is my resume: ${newApp.resumeUrl}`
      );
    }

    return { success: true };
  };

  // Update Application Status (Alumni action)
  const updateApplicationStatus = (applicationId: string, newStatus: ApplicationStatus, feedbackNote?: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === applicationId) {
          return {
            ...app,
            status: newStatus,
            alumniFeedback: feedbackNote !== undefined ? feedbackNote : app.alumniFeedback,
          };
        }
        return app;
      })
    );
  };

  // Messaging: Start or Open Conversation
  const startOrOpenConversation = (participant: StudentProfile | AlumniProfile): string => {
    if (!currentUser) return '';
    let studentId = '';
    let studentName = '';
    let studentAvatar = '';
    let studentMajor = '';
    let alumniId = '';
    let alumniName = '';
    let alumniAvatar = '';
    let alumniCompany = '';
    let alumniTitle = '';

    if (currentUser.role === 'student' && participant.role === 'alumni') {
      studentId = currentUser.id;
      studentName = currentUser.name;
      studentAvatar = currentUser.avatar;
      studentMajor = `${currentUser.major}, ${currentUser.university}`;
      alumniId = participant.id;
      alumniName = participant.name;
      alumniAvatar = participant.avatar;
      alumniCompany = participant.currentCompany;
      alumniTitle = participant.currentTitle;
    } else if (currentUser.role === 'alumni' && participant.role === 'student') {
      studentId = participant.id;
      studentName = participant.name;
      studentAvatar = participant.avatar;
      studentMajor = `${participant.major}, ${participant.university}`;
      alumniId = currentUser.id;
      alumniName = currentUser.name;
      alumniAvatar = currentUser.avatar;
      alumniCompany = currentUser.currentCompany;
      alumniTitle = currentUser.currentTitle;
    } else {
      // If same role or unknown
      return '';
    }

    const existingConv = conversations.find(
      (c) => c.studentId === studentId && c.alumniId === alumniId
    );

    if (existingConv) {
      setSelectedConversationId(existingConv.id);
      setActiveTab('messages');
      return existingConv.id;
    }

    const newConvId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      studentId,
      studentName,
      studentAvatar,
      studentMajor,
      alumniId,
      alumniName,
      alumniAvatar,
      alumniCompany,
      alumniTitle,
      lastMessage: 'Started conversation',
      lastMessageTimestamp: new Date().toISOString(),
      lastSenderId: currentUser.id,
    };

    setConversations((prev) => [newConv, ...prev]);
    setMessages((prev) => ({
      ...prev,
      [newConvId]: [],
    }));
    setSelectedConversationId(newConvId);
    setActiveTab('messages');
    return newConvId;
  };

  // Messaging: Send Message
  const sendMessage = (conversationId: string, text: string) => {
    if (!currentUser || !text.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: text.trim(),
              lastMessageTimestamp: new Date().toISOString(),
              lastSenderId: currentUser.id,
            }
          : c
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        students,
        alumni,
        jobs,
        applications,
        conversations,
        messages,
        activeTab,
        selectedConversationId,
        setActiveTab,
        setSelectedConversationId,
        login,
        quickLoginAs,
        signupStudent,
        signupAlumni,
        logout,
        updateStudentProfile,
        updateAlumniProfile,
        addStudentSkill,
        removeStudentSkill,
        addStudentAchievement,
        removeStudentAchievement,
        postJobVacancy,
        applyForJob,
        updateApplicationStatus,
        sendMessage,
        startOrOpenConversation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
