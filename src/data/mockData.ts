import { StudentProfile, AlumniProfile, JobVacancy, JobApplication, Conversation, ChatMessage } from '../types';

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'student-alex',
    role: 'student',
    email: 'alex.student@stanford.edu',
    password: 'password123',
    name: 'Alex Morgan',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    university: 'Stanford University',
    major: 'Computer Science',
    degreeLevel: 'B.S.',
    graduationYear: '2026',
    gpa: '3.92',
    headline: 'Aspiring Software Engineer & ML Enthusiast | Stanford CS \'26',
    bio: 'Passionate about building distributed systems and machine learning pipelines. Seeking summer 2026 SWE internships and full-time new grad roles. Active open-source contributor and hackathon builder.',
    location: 'Stanford, CA',
    links: {
      linkedin: 'https://linkedin.com/in/alex-morgan-cs',
      github: 'https://github.com/alexmorgan-dev',
      portfolio: 'https://alexmorgan.dev',
      resumeUrl: 'https://alexmorgan.dev/resume.pdf'
    },
    skills: [
      { id: 'sk-1', name: 'React & TypeScript', level: 'Advanced', category: 'Frontend' },
      { id: 'sk-2', name: 'Python & PyTorch', level: 'Advanced', category: 'AI/ML' },
      { id: 'sk-3', name: 'Go / Distributed Systems', level: 'Intermediate', category: 'Backend' },
      { id: 'sk-4', name: 'PostgreSQL & Redis', level: 'Intermediate', category: 'Database' },
      { id: 'sk-5', name: 'Docker & Kubernetes', level: 'Intermediate', category: 'DevOps' },
      { id: 'sk-6', name: 'Data Structures & Algorithms', level: 'Expert', category: 'Fundamentals' }
    ],
    achievements: [
      {
        id: 'ach-1',
        title: 'TreeHacks 2025 Grand Winner (AI Track)',
        category: 'Hackathon',
        date: 'Feb 2025',
        description: 'Built "MediScan AI", a low-latency medical report parser with 10k+ simulated patient records. Awarded 1st place among 1,200 hackers.',
        link: 'https://devpost.com/software/mediscan-ai'
      },
      {
        id: 'ach-2',
        title: 'Undergraduate Research Fellow - Stanford AI Lab',
        category: 'Research',
        date: 'Sep 2024 - Present',
        description: 'Co-authored a paper on speculative decoding optimization for edge inference models under Prof. Liang.',
        link: 'https://arxiv.org'
      },
      {
        id: 'ach-3',
        title: 'Open Source Maintainer: FastQuery ORM',
        category: 'Project',
        date: 'Jun 2024',
        description: 'Created a zero-allocation query generator for Go with over 850 GitHub stars and 20+ active community contributors.',
        link: 'https://github.com'
      }
    ]
  },
  {
    id: 'student-priya',
    role: 'student',
    email: 'priya.cs@mit.edu',
    password: 'password123',
    name: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    university: 'MIT',
    major: 'Electrical Engineering & Computer Science',
    degreeLevel: 'M.S.',
    graduationYear: '2026',
    gpa: '3.98',
    headline: 'Graduate Researcher in Autonomous Systems | MIT EECS',
    bio: 'Focusing on computer vision, perception algorithms, and high-reliability embedded software for autonomous navigation. Eager to connect with alumni in robotics and self-driving vehicles.',
    location: 'Cambridge, MA',
    links: {
      linkedin: 'https://linkedin.com/in/priya-patel-mit',
      github: 'https://github.com/priyapatel-tech'
    },
    skills: [
      { id: 'sk-11', name: 'C++ 20 / ROS2', level: 'Expert', category: 'Robotics' },
      { id: 'sk-12', name: 'Computer Vision / OpenCV', level: 'Advanced', category: 'AI/ML' },
      { id: 'sk-13', name: 'CUDA & GPU Programming', level: 'Intermediate', category: 'Systems' }
    ],
    achievements: [
      {
        id: 'ach-11',
        title: 'MIT Robotics Competition 1st Place',
        category: 'Award',
        date: 'Nov 2024',
        description: 'Designed a real-time obstacle avoidance stack navigating dynamic maze under 1.5 seconds.'
      }
    ]
  }
];

export const INITIAL_ALUMNI: AlumniProfile[] = [
  {
    id: 'alumni-sarah',
    role: 'alumni',
    email: 'sarah.chen@google.com',
    password: 'password123',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    almaMater: 'Stanford University',
    graduationYear: '2020',
    currentCompany: 'Google',
    currentTitle: 'Senior Software Engineer, Google Cloud',
    industry: 'Cloud Computing & Infrastructure',
    experienceYears: '6 years',
    location: 'Sunnyvale, CA',
    headline: 'Senior SWE at Google Cloud | Stanford \'20 Alumni | Mentoring 30+ Students',
    bio: 'Proud Stanford alumna. Working on large-scale distributed databases and Spanner storage engine at Google. Passionate about helping juniors navigate technical interview loops, system design preparation, and career transitions.',
    links: {
      linkedin: 'https://linkedin.com/in/sarahchen-swe',
      github: 'https://github.com/schen-cloud'
    },
    mentorshipTopics: ['System Design Prep', 'Resume Roast & Polish', 'Referrals for New Grad & Interns', 'Navigating Google Interview Loops'],
    isAvailableForReferrals: true,
    isAvailableForMentoring: true
  },
  {
    id: 'alumni-marcus',
    role: 'alumni',
    email: 'marcus.vance@microsoft.com',
    password: 'password123',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    almaMater: 'MIT',
    graduationYear: '2019',
    currentCompany: 'Microsoft',
    currentTitle: 'Principal Product Manager, Azure AI',
    industry: 'Enterprise AI & Product Management',
    experienceYears: '7 years',
    location: 'Seattle, WA',
    headline: 'Principal PM @ Microsoft Azure AI | MIT \'19 | Career Coach',
    bio: 'Transitioned from SWE to Product Management. Leading enterprise generative AI platform teams at Azure. Happy to review student product portfolios, conduct PM mock interviews, and refer promising talent.',
    links: {
      linkedin: 'https://linkedin.com/in/marcusvance'
    },
    mentorshipTopics: ['Transitioning from Engineering to PM', 'Product Sense Interviews', 'Enterprise SaaS Strategy', 'Microsoft PM Referrals'],
    isAvailableForReferrals: true,
    isAvailableForMentoring: true
  },
  {
    id: 'alumni-elena',
    role: 'alumni',
    email: 'elena.rostova@meta.com',
    password: 'password123',
    name: 'Dr. Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    almaMater: 'Harvard University',
    graduationYear: '2021',
    currentCompany: 'Meta',
    currentTitle: 'Research Scientist, FAIR (Meta AI)',
    industry: 'Artificial Intelligence & Large Models',
    experienceYears: '5 years',
    location: 'Menlo Park, CA',
    headline: 'AI Research Scientist @ FAIR (Meta) | Harvard PhD \'21',
    bio: 'Working on multimodal vision-language architectures and reasoning models. Keen to support undergrads and master students with graduate school applications and research internships at Meta AI.',
    links: {
      linkedin: 'https://linkedin.com/in/elenarostova',
      github: 'https://github.com/elena-ai'
    },
    mentorshipTopics: ['AI Research Career Paths', 'Graduate School (PhD/MS) Prep', 'Meta FAIR Internships', 'Writing High-Impact Papers'],
    isAvailableForReferrals: true,
    isAvailableForMentoring: true
  },
  {
    id: 'alumni-david',
    role: 'alumni',
    email: 'david.kim@stripe.com',
    password: 'password123',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    almaMater: 'Stanford University',
    graduationYear: '2022',
    currentCompany: 'Stripe',
    currentTitle: 'Staff Infrastructure Engineer',
    industry: 'Fintech & Developer Platforms',
    experienceYears: '4 years',
    location: 'San Francisco, CA',
    headline: 'Staff Infra Engineer @ Stripe | Stanford \'22 | Distributed Payments',
    bio: 'Passionate about bulletproof financial primitives, API design, and distributed consensus. Happy to connect with active students from all backgrounds.',
    links: {
      linkedin: 'https://linkedin.com/in/davidkim'
    },
    mentorshipTopics: ['Fintech Engineering', 'Distributed Consensus', 'Stripe Interview Prep'],
    isAvailableForReferrals: true,
    isAvailableForMentoring: true
  }
];

export const INITIAL_JOBS: JobVacancy[] = [
  {
    id: 'job-1',
    alumniId: 'alumni-sarah',
    alumniName: 'Sarah Chen',
    alumniTitle: 'Senior Software Engineer',
    alumniCompany: 'Google',
    alumniAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    title: 'Software Engineering Intern - Summer 2026',
    company: 'Google',
    location: 'Sunnyvale, CA & New York, NY',
    workMode: 'Hybrid',
    type: 'Internship',
    experienceLevel: 'Intern',
    department: 'Google Cloud Platform (Storage & Databases)',
    description: 'We are seeking passionate undergraduate or master students for a 12-week intensive software engineering internship. You will work on production distributed storage engines, write robust Go/C++ code, and collaborate with world-class engineers.',
    requirements: [
      'Currently enrolled in a BS or MS degree in Computer Science or related STEM field',
      'Solid command of Data Structures, Algorithms, and System Design basics',
      'Experience in one or more languages: C++, Go, Java, or Python',
      'Familiarity with distributed systems or database internals is a plus'
    ],
    referralSlotsTotal: 5,
    referralSlotsFilled: 2,
    deadline: 'April 30, 2026',
    createdAt: '2026-03-20T10:00:00Z'
  },
  {
    id: 'job-2',
    alumniId: 'alumni-marcus',
    alumniName: 'Marcus Vance',
    alumniTitle: 'Principal Product Manager',
    alumniCompany: 'Microsoft',
    alumniAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    title: 'Associate Product Manager (APM) - New Grad 2026',
    company: 'Microsoft',
    location: 'Redmond, WA',
    workMode: 'On-site',
    type: 'Full-time',
    experienceLevel: 'Entry Level',
    department: 'Azure AI Platform',
    description: 'Join Microsoft’s prestigious APM rotational program. You will rotate across two different product teams, define product vision, conduct user research, and ship AI-powered developer capabilities to millions of enterprises.',
    requirements: [
      'Graduating between December 2025 and June 2026 with a Bachelor’s or Master’s degree',
      'Demonstrated passion for technology, customer empathy, and analytical problem solving',
      'Experience leading student clubs, building software prototypes, or prior tech internships'
    ],
    referralSlotsTotal: 3,
    referralSlotsFilled: 1,
    deadline: 'May 15, 2026',
    createdAt: '2026-03-24T14:30:00Z'
  },
  {
    id: 'job-3',
    alumniId: 'alumni-elena',
    alumniName: 'Dr. Elena Rostova',
    alumniTitle: 'Research Scientist',
    alumniCompany: 'Meta',
    alumniAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    title: 'AI Research Scientist Intern - FAIR',
    company: 'Meta',
    location: 'Menlo Park, CA / Remote Option',
    workMode: 'Hybrid',
    type: 'Internship',
    experienceLevel: 'Intern',
    department: 'Fundamental AI Research (FAIR)',
    description: 'Work alongside world-leading researchers on frontier multimodal foundation models, efficient attention mechanisms, and safety alignment. High likelihood of published academic papers in NeurIPS/ICML/CVPR.',
    requirements: [
      'Enrolled in Master’s or PhD program in CS, AI, or Computational Statistics',
      'Strong research track record or strong preprint/publication history',
      'Proficiency in PyTorch, distributed training (FSDP/Megatron), and Python'
    ],
    referralSlotsTotal: 4,
    referralSlotsFilled: 1,
    deadline: 'April 20, 2026',
    createdAt: '2026-03-26T09:15:00Z'
  },
  {
    id: 'job-4',
    alumniId: 'alumni-david',
    alumniName: 'David Kim',
    alumniTitle: 'Staff Infrastructure Engineer',
    alumniCompany: 'Stripe',
    alumniAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    title: 'Software Engineer - Infrastructure & Core Payments',
    company: 'Stripe',
    location: 'San Francisco, CA / Seattle, WA',
    workMode: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Entry Level',
    department: 'Core Financial Platforms',
    description: 'Help build the financial backbone of the internet. Stripe engineers build fault-tolerant systems that process hundreds of billions of dollars each year with 99.999% availability.',
    requirements: [
      'Graduating 2026 with strong CS foundation',
      'Familiarity with distributed databases, concurrency, and high availability systems',
      'Strong coding skills in Ruby, Java, Go, or Rust'
    ],
    referralSlotsTotal: 3,
    referralSlotsFilled: 0,
    deadline: 'June 01, 2026',
    createdAt: '2026-03-28T16:00:00Z'
  }
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    studentId: 'student-alex',
    studentName: 'Alex Morgan',
    studentUniversity: 'Stanford University',
    studentMajor: 'Computer Science',
    studentGradYear: '2026',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    jobTitle: 'Software Engineering Intern - Summer 2026',
    company: 'Google',
    alumniId: 'alumni-sarah',
    alumniName: 'Sarah Chen',
    appliedAt: '2026-03-25T11:20:00Z',
    status: 'Referral Submitted',
    studentNote: 'Hi Sarah! I am a junior at Stanford with strong Go/distributed systems experience. I built FastQuery ORM (850 stars) and would love to contribute to Google Cloud storage.',
    resumeUrl: 'https://alexmorgan.dev/resume.pdf',
    alumniFeedback: 'Reviewed your FastQuery repository and coursework. Excellent systems foundation! I have submitted an official internal referral to the GCP recruiting team.'
  },
  {
    id: 'app-2',
    jobId: 'job-3',
    studentId: 'student-alex',
    studentName: 'Alex Morgan',
    studentUniversity: 'Stanford University',
    studentMajor: 'Computer Science',
    studentGradYear: '2026',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    jobTitle: 'AI Research Scientist Intern - FAIR',
    company: 'Meta',
    alumniId: 'alumni-elena',
    alumniName: 'Dr. Elena Rostova',
    appliedAt: '2026-03-27T15:45:00Z',
    status: 'In Review',
    studentNote: 'Dear Dr. Rostova, I have been conducting research at Stanford AI Lab on speculative decoding and inference optimization with Prof. Liang. Would love a chance to intern at FAIR.',
    resumeUrl: 'https://alexmorgan.dev/resume.pdf',
    alumniFeedback: 'Looking through your arxiv draft right now. Very promising methodology. Will update you this Friday!'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-alex-sarah',
    studentId: 'student-alex',
    studentName: 'Alex Morgan',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    studentMajor: 'Computer Science, Stanford',
    alumniId: 'alumni-sarah',
    alumniName: 'Sarah Chen',
    alumniAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    alumniCompany: 'Google',
    alumniTitle: 'Senior Software Engineer',
    lastMessage: 'I submitted your internal referral! Keep an eye on your email for the recruiter link.',
    lastMessageTimestamp: '2026-03-25T14:30:00Z',
    lastSenderId: 'alumni-sarah'
  },
  {
    id: 'conv-alex-elena',
    studentId: 'student-alex',
    studentName: 'Alex Morgan',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    studentMajor: 'Computer Science, Stanford',
    alumniId: 'alumni-elena',
    alumniName: 'Dr. Elena Rostova',
    alumniAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    alumniCompany: 'Meta',
    alumniTitle: 'Research Scientist, FAIR',
    lastMessage: 'Looking forward to reading your draft on speculative decoding!',
    lastMessageTimestamp: '2026-03-27T16:10:00Z',
    lastSenderId: 'alumni-elena'
  }
];

export const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-alex-sarah': [
    {
      id: 'msg-1',
      conversationId: 'conv-alex-sarah',
      senderId: 'student-alex',
      senderName: 'Alex Morgan',
      senderRole: 'student',
      text: 'Hi Sarah! I noticed you are a Stanford alumnus working on Google Cloud storage. Would you be open to giving quick feedback on my SWE resume?',
      timestamp: '2026-03-25T11:00:00Z'
    },
    {
      id: 'msg-2',
      conversationId: 'conv-alex-sarah',
      senderId: 'alumni-sarah',
      senderName: 'Sarah Chen',
      senderRole: 'alumni',
      text: 'Hi Alex! Always happy to help a fellow Stanford Cardinal. Send over your resume link and GitHub projects!',
      timestamp: '2026-03-25T11:15:00Z'
    },
    {
      id: 'msg-3',
      conversationId: 'conv-alex-sarah',
      senderId: 'student-alex',
      senderName: 'Alex Morgan',
      senderRole: 'student',
      text: 'Thank you so much! Here is my resume: https://alexmorgan.dev/resume.pdf. I also applied to your posted internship opening.',
      timestamp: '2026-03-25T11:22:00Z'
    },
    {
      id: 'msg-4',
      conversationId: 'conv-alex-sarah',
      senderId: 'alumni-sarah',
      senderName: 'Sarah Chen',
      senderRole: 'alumni',
      text: 'Your FastQuery ORM project is stellar! I submitted your internal referral! Keep an eye on your email for the recruiter link.',
      timestamp: '2026-03-25T14:30:00Z'
    }
  ],
  'conv-alex-elena': [
    {
      id: 'msg-11',
      conversationId: 'conv-alex-elena',
      senderId: 'student-alex',
      senderName: 'Alex Morgan',
      senderRole: 'student',
      text: 'Dr. Rostova, hello! I submitted a referral request for the FAIR internship. I do research under Prof. Percy Liang on speculative decoding.',
      timestamp: '2026-03-27T15:50:00Z'
    },
    {
      id: 'msg-12',
      conversationId: 'conv-alex-elena',
      senderId: 'alumni-elena',
      senderName: 'Dr. Elena Rostova',
      senderRole: 'alumni',
      text: 'Looking forward to reading your draft on speculative decoding!',
      timestamp: '2026-03-27T16:10:00Z'
    }
  ]
};

// LocalStorage Persistence Keys
const STORAGE_KEYS = {
  CURRENT_USER: 'uniconnect_current_user_v1',
  STUDENTS: 'uniconnect_students_v1',
  ALUMNI: 'uniconnect_alumni_v1',
  JOBS: 'uniconnect_jobs_v1',
  APPLICATIONS: 'uniconnect_applications_v1',
  CONVERSATIONS: 'uniconnect_conversations_v1',
  MESSAGES: 'uniconnect_messages_v1',
};

export function loadStoredData() {
  let students = INITIAL_STUDENTS;
  let alumni = INITIAL_ALUMNI;
  let jobs = INITIAL_JOBS;
  let applications = INITIAL_APPLICATIONS;
  let conversations = INITIAL_CONVERSATIONS;
  let messages = INITIAL_MESSAGES;
  let currentUser: StudentProfile | AlumniProfile = INITIAL_STUDENTS[0];

  try {
    const sUsers = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (sUsers) students = JSON.parse(sUsers);

    const sAlumni = localStorage.getItem(STORAGE_KEYS.ALUMNI);
    if (sAlumni) alumni = JSON.parse(sAlumni);

    const sJobs = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (sJobs) jobs = JSON.parse(sJobs);

    const sApps = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (sApps) applications = JSON.parse(sApps);

    const sConvs = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    if (sConvs) conversations = JSON.parse(sConvs);

    const sMsgs = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (sMsgs) messages = JSON.parse(sMsgs);

    const sCurr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (sCurr) {
      currentUser = JSON.parse(sCurr);
    }
  } catch (e) {
    console.error('Failed to parse localStorage data:', e);
  }

  return {
    students,
    alumni,
    jobs,
    applications,
    conversations,
    messages,
    currentUser,
  };
}

export function saveStoredData(data: {
  students?: StudentProfile[];
  alumni?: AlumniProfile[];
  jobs?: JobVacancy[];
  applications?: JobApplication[];
  conversations?: Conversation[];
  messages?: Record<string, ChatMessage[]>;
  currentUser?: StudentProfile | AlumniProfile | null;
}) {
  try {
    if (data.students) localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(data.students));
    if (data.alumni) localStorage.setItem(STORAGE_KEYS.ALUMNI, JSON.stringify(data.alumni));
    if (data.jobs) localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(data.jobs));
    if (data.applications) localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(data.applications));
    if (data.conversations) localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(data.conversations));
    if (data.messages) localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(data.messages));
    if (data.currentUser !== undefined) {
      if (data.currentUser === null) {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      } else {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(data.currentUser));
      }
    }
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}
