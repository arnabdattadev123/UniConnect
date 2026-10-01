/**
 * UniConnect - Student & Alumni Career Network
 * Standalone Client-Side Application Script
 */

const STORAGE_KEYS = {
  USER: 'uniconnect_standalone_user_v1',
  STUDENTS: 'uniconnect_standalone_students_v1',
  ALUMNI: 'uniconnect_standalone_alumni_v1',
  JOBS: 'uniconnect_standalone_jobs_v1',
  APPS: 'uniconnect_standalone_apps_v1',
  CONVS: 'uniconnect_standalone_convs_v1',
  MSGS: 'uniconnect_standalone_msgs_v1'
};

const DEFAULT_STUDENTS = [
  {
    id: 'student-alex',
    role: 'student',
    email: 'alex.student@stanford.edu',
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
      resumeUrl: 'https://alexmorgan.dev/resume.pdf',
      github: 'https://github.com/alexmorgan-dev',
      linkedin: 'https://linkedin.com/in/alex-morgan-cs',
      portfolio: 'https://alexmorgan.dev'
    },
    skills: [
      { id: 'sk-1', name: 'React & TypeScript', level: 'Advanced', category: 'Frontend' },
      { id: 'sk-2', name: 'Python & PyTorch', level: 'Advanced', category: 'AI/ML' },
      { id: 'sk-3', name: 'Go / Distributed Systems', level: 'Intermediate', category: 'Backend' },
      { id: 'sk-4', name: 'PostgreSQL & Redis', level: 'Intermediate', category: 'Database' }
    ],
    achievements: [
      {
        id: 'ach-1',
        title: 'TreeHacks 2025 Grand Winner (AI Track)',
        category: 'Hackathon',
        date: 'Feb 2025',
        description: 'Built MediScan AI, low-latency medical report parser. Awarded 1st place among 1,200 hackers.',
        link: 'https://devpost.com'
      },
      {
        id: 'ach-2',
        title: 'Stanford AI Lab Research Fellow',
        category: 'Research',
        date: 'Sep 2024 - Present',
        description: 'Co-authored preprint on speculative decoding optimization under Prof. Percy Liang.',
        link: 'https://arxiv.org'
      }
    ]
  },
  {
    id: 'student-priya',
    role: 'student',
    email: 'priya.cs@mit.edu',
    name: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    university: 'MIT',
    major: 'Electrical Engineering & Computer Science',
    degreeLevel: 'M.S.',
    graduationYear: '2026',
    gpa: '3.98',
    headline: 'Graduate Researcher in Autonomous Systems | MIT EECS',
    bio: 'Focusing on computer vision and perception algorithms for robotics.',
    location: 'Cambridge, MA',
    links: { resumeUrl: 'https://example.com/resume.pdf' },
    skills: [{ id: 'sk-11', name: 'C++ 20 / ROS2', level: 'Expert', category: 'Robotics' }],
    achievements: [{ id: 'ach-11', title: 'MIT Robotics 1st Place', category: 'Award', date: 'Nov 2024', description: 'Autonomous stack navigation.' }]
  }
];

const DEFAULT_ALUMNI = [
  {
    id: 'alumni-sarah',
    role: 'alumni',
    email: 'sarah.chen@google.com',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    almaMater: 'Stanford University',
    graduationYear: '2020',
    currentCompany: 'Google',
    currentTitle: 'Senior Software Engineer, Google Cloud',
    industry: 'Cloud Computing & Infrastructure',
    experienceYears: '6 years',
    location: 'Sunnyvale, CA',
    bio: 'Proud Stanford alumna working on distributed databases and Spanner storage. Happy to mentor juniors and submit warm internal referrals.',
    links: { linkedin: 'https://linkedin.com/in/sarahchen' },
    mentorshipTopics: ['System Design Prep', 'Resume Polish', 'Google Internal Referrals'],
    isAvailableForReferrals: true,
    isAvailableForMentoring: true
  },
  {
    id: 'alumni-marcus',
    role: 'alumni',
    email: 'marcus.vance@microsoft.com',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    almaMater: 'MIT',
    graduationYear: '2019',
    currentCompany: 'Microsoft',
    currentTitle: 'Principal Product Manager, Azure AI',
    industry: 'Enterprise AI & Cloud Platforms',
    experienceYears: '7 years',
    location: 'Seattle, WA',
    bio: 'Leading developer platforms at Azure AI. Eager to conduct mock PM interviews and refer strong student candidates.',
    links: { linkedin: 'https://linkedin.com/in/marcusvance' },
    mentorshipTopics: ['Product Sense Interviews', 'Microsoft Referrals'],
    isAvailableForReferrals: true,
    isAvailableForMentoring: true
  }
];

const DEFAULT_JOBS = [
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
    department: 'Google Cloud Platform (Storage & Databases)',
    description: 'Work on production distributed storage engines, write robust Go/C++ code, and collaborate with world-class engineers.',
    requirements: ['Enrolled in BS/MS Computer Science', 'Strong data structures & algorithms', 'Experience in Go, C++, or Python'],
    referralSlotsTotal: 5,
    referralSlotsFilled: 2,
    deadline: 'April 30, 2026'
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
    department: 'Azure AI Platform',
    description: 'Rotate across engineering and product, define technical AI roadmaps, and ship to millions of enterprise users.',
    requirements: ['Graduating 2025-2026', 'Strong analytical skills & passion for tech'],
    referralSlotsTotal: 3,
    referralSlotsFilled: 1,
    deadline: 'May 15, 2026'
  }
];

const DEFAULT_APPLICATIONS = [
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
    studentNote: 'Hi Sarah! Stanford CS junior with Go & distributed systems experience. Would love to contribute to GCP.',
    resumeUrl: 'https://alexmorgan.dev/resume.pdf',
    alumniFeedback: 'Reviewed your repository. Excellent systems foundation! I submitted an official internal referral to the GCP recruiting team.'
  }
];

const DEFAULT_CONVERSATIONS = [
  {
    id: 'conv-1',
    studentId: 'student-alex',
    studentName: 'Alex Morgan',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    alumniId: 'alumni-sarah',
    alumniName: 'Sarah Chen',
    alumniAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    alumniCompany: 'Google',
    alumniTitle: 'Senior Software Engineer',
    lastMessage: 'I submitted your internal referral! Keep an eye on your email for the recruiter link.',
    lastMessageTimestamp: '2026-03-25T14:30:00Z'
  }
];

const DEFAULT_MESSAGES = {
  'conv-1': [
    { id: 'm1', senderId: 'student-alex', senderName: 'Alex Morgan', text: 'Hi Sarah! I noticed you are a Stanford alumna at Google. Would you have 10 mins for resume feedback?', timestamp: '2026-03-25T11:00:00Z' },
    { id: 'm2', senderId: 'alumni-sarah', senderName: 'Sarah Chen', text: 'Hi Alex! Always glad to support Stanford cardinals. Send over your resume link!', timestamp: '2026-03-25T11:15:00Z' },
    { id: 'm3', senderId: 'student-alex', senderName: 'Alex Morgan', text: 'Thank you! Resume: https://alexmorgan.dev/resume.pdf. Also submitted an application for your referral opening.', timestamp: '2026-03-25T11:22:00Z' },
    { id: 'm4', senderId: 'alumni-sarah', senderName: 'Sarah Chen', text: 'I submitted your internal referral! Keep an eye on your email for the recruiter link.', timestamp: '2026-03-25T14:30:00Z' }
  ]
};

// Global App State
let appState = {
  currentUser: DEFAULT_STUDENTS[0],
  students: DEFAULT_STUDENTS,
  alumni: DEFAULT_ALUMNI,
  jobs: DEFAULT_JOBS,
  applications: DEFAULT_APPLICATIONS,
  conversations: DEFAULT_CONVERSATIONS,
  messages: DEFAULT_MESSAGES,
  activeTab: 'profile',
  activeConvId: 'conv-1'
};

// Load LocalStorage
function initStorage() {
  try {
    const sUsers = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (sUsers) appState.students = JSON.parse(sUsers);
    const sAlumni = localStorage.getItem(STORAGE_KEYS.ALUMNI);
    if (sAlumni) appState.alumni = JSON.parse(sAlumni);
    const sJobs = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (sJobs) appState.jobs = JSON.parse(sJobs);
    const sApps = localStorage.getItem(STORAGE_KEYS.APPS);
    if (sApps) appState.applications = JSON.parse(sApps);
    const sConvs = localStorage.getItem(STORAGE_KEYS.CONVS);
    if (sConvs) appState.conversations = JSON.parse(sConvs);
    const sMsgs = localStorage.getItem(STORAGE_KEYS.MSGS);
    if (sMsgs) appState.messages = JSON.parse(sMsgs);
    const sCurr = localStorage.getItem(STORAGE_KEYS.USER);
    if (sCurr) appState.currentUser = JSON.parse(sCurr);
  } catch (e) {
    console.error('Storage parse error:', e);
  }
}

function saveStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(appState.students));
    localStorage.setItem(STORAGE_KEYS.ALUMNI, JSON.stringify(appState.alumni));
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(appState.jobs));
    localStorage.setItem(STORAGE_KEYS.APPS, JSON.stringify(appState.applications));
    localStorage.setItem(STORAGE_KEYS.CONVS, JSON.stringify(appState.conversations));
    localStorage.setItem(STORAGE_KEYS.MSGS, JSON.stringify(appState.messages));
    if (appState.currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(appState.currentUser));
    }
  } catch (e) {
    console.error('Storage save error:', e);
  }
}

// Navigation Tab Switcher
function switchTab(tab) {
  appState.activeTab = tab;
  ['profile', 'jobs', 'directory', 'messages'].forEach(t => {
    const el = document.getElementById(`tab-content-${t}`);
    const navBtn = document.getElementById(`nav-btn-${t}`);
    if (el) el.classList.toggle('hidden', t !== tab);
    if (navBtn) {
      if (t === tab) {
        navBtn.className = 'px-3.5 py-2 rounded-lg text-sm font-bold bg-indigo-50 text-indigo-700 transition flex items-center gap-1.5';
      } else {
        navBtn.className = 'px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition flex items-center gap-1.5';
      }
    }
  });

  if (tab === 'profile') renderProfileView();
  if (tab === 'jobs') renderJobsView();
  if (tab === 'directory') renderDirectoryView();
  if (tab === 'messages') renderMessagesView();
}

// Quick Role Switcher
function switchUser(role, id) {
  if (role === 'student') {
    appState.currentUser = appState.students.find(s => s.id === id) || appState.students[0];
  } else {
    appState.currentUser = appState.alumni.find(a => a.id === id) || appState.alumni[0];
  }
  saveStorage();
  updateNavbarUser();
  renderProfileView();
  if (appState.activeTab !== 'profile') switchTab(appState.activeTab);
  showToast(`Switched account to ${appState.currentUser.name} (${appState.currentUser.role.toUpperCase()})`);
}

function updateNavbarUser() {
  const u = appState.currentUser;
  const nameEl = document.getElementById('nav-user-name');
  const roleEl = document.getElementById('nav-user-role');
  const avatarEl = document.getElementById('nav-user-avatar');
  const roleTagEl = document.getElementById('nav-role-tag');

  if (u) {
    if (nameEl) nameEl.textContent = u.name;
    if (roleEl) roleEl.textContent = u.role === 'student' ? 'Student' : 'Alumni';
    if (avatarEl) avatarEl.src = u.avatar;
    if (roleTagEl) {
      roleTagEl.textContent = u.role.toUpperCase();
      roleTagEl.className = u.role === 'student'
        ? 'text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 border border-indigo-200'
        : 'text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-950 border border-emerald-300';
    }
  }
}

// 1. RENDER PROFILE VIEW
function renderProfileView() {
  const container = document.getElementById('tab-content-profile');
  if (!container) return;

  const u = appState.currentUser;
  if (!u) {
    container.innerHTML = '<div class="py-12 text-center text-slate-500">Please sign in to view profile.</div>';
    return;
  }

  if (u.role === 'student') {
    renderStudentProfile(container, u);
  } else {
    renderAlumniProfile(container, u);
  }
}

function renderStudentProfile(container, student) {
  const myApps = appState.applications.filter(a => a.studentId === student.id);

  container.innerHTML = `
    <div class="max-w-6xl mx-auto space-y-8">
      <!-- High Contrast Header Banner -->
      <div class="bg-white rounded-3xl border border-slate-300 shadow-sm overflow-hidden">
        <div class="h-36 sm:h-44 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 relative">
          <div class="absolute top-4 right-4">
            <span class="px-3.5 py-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30 shadow-sm">
              Student Profile
            </span>
          </div>
        </div>

        <div class="px-6 sm:px-8 pb-8 pt-0 relative bg-white">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
            <div class="flex flex-col sm:flex-row sm:items-end gap-5">
              <img src="${student.avatar}" class="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-xl bg-white" alt="Avatar">
              <div class="mt-2 sm:mt-0">
                <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">${student.name}</h1>
                <p class="text-sm sm:text-base font-bold text-indigo-900 mt-1">
                  ${student.major} · <span class="text-slate-800">${student.degreeLevel} candidate</span>
                </p>
                <div class="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs sm:text-sm text-slate-800 font-medium mt-2.5">
                  <span class="flex items-center gap-1.5 text-slate-900 font-semibold">
                    <i class="fa-solid fa-graduation-cap text-indigo-700"></i> ${student.university} (Class of ${student.graduationYear})
                  </span>
                  <span class="text-slate-400">·</span>
                  <span>GPA: <strong class="text-slate-950 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded font-extrabold">${student.gpa || '3.9'}</strong></span>
                  <span class="text-slate-400">·</span>
                  <span class="text-slate-700"><i class="fa-solid fa-location-dot text-slate-600 mr-1"></i> ${student.location}</span>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-2.5">
              <button onclick="openEditStudentModal()" class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-sm transition flex items-center gap-2">
                <i class="fa-solid fa-pen-to-square"></i> Edit Profile
              </button>
              <button onclick="switchTab('messages')" class="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs sm:text-sm font-bold shadow-sm transition flex items-center gap-2">
                <i class="fa-solid fa-comments"></i> Messages with Alumni
              </button>
            </div>
          </div>

          <!-- Headline & Bio -->
          <div class="border-t border-slate-200 pt-5 mt-6">
            <h3 class="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">Career Objective & Bio</h3>
            <div class="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5">
              <p class="text-sm sm:text-base text-slate-900 leading-relaxed font-normal">${student.bio}</p>
            </div>

            <div class="mt-4 flex flex-wrap gap-2.5 text-xs sm:text-sm">
              <a href="${student.links.resumeUrl || '#'}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-900 text-white font-bold hover:bg-indigo-950 transition shadow-xs">
                <i class="fa-solid fa-file-pdf text-indigo-300"></i> Resume / CV
              </a>
              <a href="${student.links.github || '#'}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition shadow-xs">
                <i class="fa-brands fa-github text-slate-300"></i> GitHub
              </a>
              <a href="${student.links.linkedin || '#'}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-800 text-white font-bold hover:bg-sky-900 transition shadow-xs">
                <i class="fa-brands fa-linkedin text-sky-200"></i> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- WHERE HE APPLIED: Application & Referral Tracker -->
      <div class="bg-white rounded-3xl border border-slate-300 shadow-sm p-6 sm:p-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-extrabold text-slate-950 flex items-center gap-2">
              <i class="fa-solid fa-briefcase text-indigo-700"></i> Where I Applied & Requested Referrals
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 mt-1">Track application statuses and feedback directly from alumni referrers.</p>
          </div>
          <button onclick="switchTab('jobs')" class="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-xs rounded-xl transition">
            Explore Open Referrals
          </button>
        </div>

        ${myApps.length === 0 ? `
          <div class="text-center py-10 border border-dashed border-slate-300 rounded-2xl bg-slate-50">
            <p class="text-sm font-semibold text-slate-700">No applications submitted yet.</p>
            <button onclick="switchTab('jobs')" class="mt-3 px-4 py-2 bg-indigo-700 text-white rounded-xl text-xs font-bold">Browse Job Vacancies</button>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${myApps.map(app => `
              <div class="rounded-2xl border border-slate-300 p-5 bg-slate-50/50 hover:bg-white transition flex flex-col justify-between space-y-4">
                <div>
                  <div class="flex items-start justify-between">
                    <span class="text-xs font-extrabold text-indigo-900 bg-indigo-100 px-2.5 py-1 rounded-md border border-indigo-200">${app.company}</span>
                    <span class="text-xs font-bold px-2.5 py-1 rounded-full ${app.status === 'Referral Submitted' ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'bg-slate-200 text-slate-900'}">${app.status}</span>
                  </div>
                  <h3 class="text-base font-bold text-slate-950 mt-2">${app.jobTitle}</h3>
                  <p class="text-xs text-slate-600 mt-1">Referrer: <strong>${app.alumniName}</strong> · Applied ${new Date(app.appliedAt).toLocaleDateString()}</p>
                  ${app.studentNote ? `<div class="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 italic">"${app.studentNote}"</div>` : ''}
                  ${app.alumniFeedback ? `
                    <div class="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950">
                      <strong>Feedback from ${app.alumniName}:</strong> ${app.alumniFeedback}
                    </div>
                  ` : ''}
                </div>
                <div class="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <a href="${app.resumeUrl}" target="_blank" class="text-xs text-slate-700 hover:text-indigo-700 font-semibold"><i class="fa-solid fa-file-pdf text-red-500 mr-1"></i> View Resume</a>
                  <button onclick="startChat('${app.alumniId}')" class="px-3 py-1.5 bg-indigo-700 text-white rounded-lg text-xs font-bold hover:bg-indigo-800 transition">
                    <i class="fa-solid fa-comment-dots mr-1"></i> Message Referrer
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <!-- SKILLS & ACHIEVEMENTS SECTION -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Technical Skills -->
        <div class="bg-white rounded-3xl border border-slate-300 shadow-sm p-6 sm:p-8 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-extrabold text-slate-950 flex items-center gap-2">
              <i class="fa-solid fa-code text-indigo-700"></i> Skills & Expertise
            </h2>
            <button onclick="openAddSkillModal()" class="px-3 py-1.5 bg-indigo-700 text-white rounded-xl text-xs font-bold hover:bg-indigo-800 transition">
              + Add Skill
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${student.skills.map(sk => `
              <div class="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 class="text-xs font-extrabold text-slate-950">${sk.name}</h4>
                  <p class="text-[11px] text-slate-600 font-medium">${sk.category} · <span class="text-indigo-800 font-bold">${sk.level}</span></p>
                </div>
                <button onclick="deleteSkill('${sk.id}')" class="text-slate-400 hover:text-rose-600 text-xs p-1"><i class="fa-solid fa-trash"></i></button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Notable Achievements -->
        <div class="bg-white rounded-3xl border border-slate-300 shadow-sm p-6 sm:p-8 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-extrabold text-slate-950 flex items-center gap-2">
              <i class="fa-solid fa-award text-indigo-700"></i> Achievements & Projects
            </h2>
            <button onclick="openAddAchievementModal()" class="px-3 py-1.5 bg-indigo-700 text-white rounded-xl text-xs font-bold hover:bg-indigo-800 transition">
              + Post Achievement
            </button>
          </div>
          <div class="space-y-3">
            ${student.achievements.map(ach => `
              <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 flex justify-between gap-3">
                <div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-900">${ach.category}</span>
                  <h4 class="text-xs font-extrabold text-slate-950 mt-1">${ach.title}</h4>
                  <p class="text-xs text-slate-700 mt-1 leading-relaxed">${ach.description}</p>
                </div>
                <button onclick="deleteAchievement('${ach.id}')" class="text-slate-400 hover:text-rose-600 text-xs self-start"><i class="fa-solid fa-trash"></i></button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAlumniProfile(container, alumni) {
  const myJobs = appState.jobs.filter(j => j.alumniId === alumni.id);
  const myApplicants = appState.applications.filter(a => a.alumniId === alumni.id);

  container.innerHTML = `
    <div class="max-w-6xl mx-auto space-y-8">
      <!-- High Contrast Header Banner -->
      <div class="bg-white rounded-3xl border border-slate-300 shadow-sm overflow-hidden">
        <div class="h-36 sm:h-44 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 relative">
          <div class="absolute top-4 right-4">
            <span class="px-3.5 py-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30 shadow-sm">
              Alumni Mentorship Profile
            </span>
          </div>
        </div>

        <div class="px-6 sm:px-8 pb-8 pt-0 relative bg-white">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
            <div class="flex flex-col sm:flex-row sm:items-end gap-5">
              <img src="${alumni.avatar}" class="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-xl bg-white" alt="Avatar">
              <div class="mt-2 sm:mt-0">
                <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">${alumni.name}</h1>
                <p class="text-sm sm:text-base font-bold text-indigo-900 mt-1">
                  ${alumni.currentTitle} @ <strong class="text-slate-950 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded font-extrabold">${alumni.currentCompany}</strong>
                </p>
                <div class="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs sm:text-sm text-slate-800 font-medium mt-2.5">
                  <span class="flex items-center gap-1.5 text-slate-900 font-semibold">
                    <i class="fa-solid fa-graduation-cap text-indigo-700"></i> Alma Mater: ${alumni.almaMater} ('${alumni.graduationYear.slice(-2)})
                  </span>
                  <span class="text-slate-400">·</span>
                  <span><i class="fa-solid fa-briefcase text-slate-600 mr-1"></i> ${alumni.experienceYears} Experience</span>
                  <span class="text-slate-400">·</span>
                  <span class="text-slate-700"><i class="fa-solid fa-location-dot text-slate-600 mr-1"></i> ${alumni.location}</span>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-2.5">
              <button onclick="openEditAlumniModal()" class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-sm transition flex items-center gap-2">
                <i class="fa-solid fa-pen-to-square"></i> Edit Personal Info
              </button>
              <button onclick="openPostJobModal()" class="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs sm:text-sm font-bold shadow-sm transition flex items-center gap-2">
                <i class="fa-solid fa-plus"></i> Post Vacancy / Referral
              </button>
            </div>
          </div>

          <!-- Mentorship & Bio -->
          <div class="border-t border-slate-200 pt-5 mt-6 space-y-4">
            <div>
              <h3 class="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">About Me & Mentorship Style</h3>
              <div class="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5">
                <p class="text-sm sm:text-base text-slate-900 leading-relaxed font-normal">${alumni.bio}</p>
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div class="flex items-center gap-3">
                <span class="text-xs text-emerald-950 font-bold bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-xl">
                  <i class="fa-solid fa-circle-check text-emerald-700 mr-1"></i> Accepting Referrals
                </span>
                <span class="text-xs text-indigo-950 font-bold bg-indigo-100 border border-indigo-300 px-3 py-1.5 rounded-xl">
                  <i class="fa-solid fa-comments text-indigo-700 mr-1"></i> Open to 1-on-1 Chats
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- POSTED OPPORTUNITIES & APPLICANTS HUB -->
      <div class="bg-white rounded-3xl border border-slate-300 shadow-sm p-6 sm:p-8 space-y-6">
        <div class="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 class="text-xl font-extrabold text-slate-950 flex items-center gap-2">
            <i class="fa-solid fa-briefcase text-indigo-700"></i> My Posted Referrals & Candidate Applicants
          </h2>
          <button onclick="openPostJobModal()" class="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl transition">
            + Post New Vacancy
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          ${myJobs.map(job => `
            <div class="rounded-2xl border border-slate-300 p-5 bg-slate-50 flex flex-col justify-between space-y-4">
              <div>
                <span class="text-xs font-extrabold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200">${job.company}</span>
                <h3 class="text-base font-bold text-slate-950 mt-2">${job.title}</h3>
                <p class="text-xs text-slate-600 mt-1">${job.department} · ${job.location}</p>
                <p class="text-xs text-slate-700 mt-2 leading-relaxed">${job.description}</p>
              </div>
              <div class="pt-3 border-t border-slate-200 flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Slots: ${job.referralSlotsFilled} / ${job.referralSlotsTotal}</span>
                <span class="text-indigo-800">Deadline: ${job.deadline}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Student Applicants Review -->
        <div class="mt-8 pt-6 border-t border-slate-200">
          <h3 class="text-base font-extrabold text-slate-950 mb-4">Student Applicants (${myApplicants.length})</h3>
          ${myApplicants.length === 0 ? '<p class="text-xs text-slate-500">No student applicants yet.</p>' : `
            <div class="space-y-4">
              ${myApplicants.map(app => `
                <div class="p-4 rounded-2xl border border-slate-300 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <img src="${app.studentAvatar}" class="w-12 h-12 rounded-xl object-cover" alt="Student">
                    <div>
                      <h4 class="text-sm font-extrabold text-slate-950">${app.studentName}</h4>
                      <p class="text-xs text-indigo-900 font-semibold">${app.studentMajor} (${app.studentUniversity})</p>
                      <p class="text-xs text-slate-600 mt-0.5">Applied for: <strong>${app.jobTitle}</strong></p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <select onchange="updateAppStatus('${app.id}', this.value)" class="text-xs font-bold border border-slate-300 rounded-lg p-2 bg-white text-slate-900">
                      <option ${app.status === 'Pending Review' ? 'selected' : ''}>Pending Review</option>
                      <option ${app.status === 'In Review' ? 'selected' : ''}>In Review</option>
                      <option ${app.status === 'Referral Submitted' ? 'selected' : ''}>Referral Submitted</option>
                      <option ${app.status === 'Interview Offered' ? 'selected' : ''}>Interview Offered</option>
                    </select>
                    <button onclick="startChat('${app.studentId}')" class="px-3 py-2 bg-indigo-700 text-white rounded-lg text-xs font-bold">
                      <i class="fa-solid fa-comments"></i> Chat
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

// 2. RENDER JOBS HUB
function renderJobsView() {
  const container = document.getElementById('tab-content-jobs');
  if (!container) return;

  container.innerHTML = `
    <div class="max-w-6xl mx-auto space-y-6">
      <div class="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white">
        <h1 class="text-3xl font-extrabold">Alumni Job & Referral Hub</h1>
        <p class="text-sm text-slate-200 mt-2 max-w-xl">Browse active vacancies posted directly by university alumni. Request internal referrals to stand out to hiring managers.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        ${appState.jobs.map(job => `
          <div class="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
            <div>
              <div class="flex justify-between items-start">
                <span class="px-2.5 py-1 bg-indigo-100 text-indigo-950 border border-indigo-200 text-xs font-bold rounded-lg">${job.company}</span>
                <span class="text-xs text-slate-700 font-semibold">${job.type} · ${job.workMode}</span>
              </div>
              <h3 class="text-lg font-extrabold text-slate-950 mt-2">${job.title}</h3>
              <p class="text-xs text-slate-600 mt-1">${job.department} · ${job.location}</p>
              <p class="text-xs text-slate-700 mt-3 leading-relaxed">${job.description}</p>
              
              <div class="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <img src="${job.alumniAvatar}" class="w-8 h-8 rounded-full object-cover">
                  <div>
                    <p class="text-xs font-bold text-slate-950">${job.alumniName}</p>
                    <p class="text-[11px] text-indigo-900 font-medium">${job.alumniTitle}</p>
                  </div>
                </div>
                <span class="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ${job.referralSlotsTotal - job.referralSlotsFilled} slots left
                </span>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-200 flex justify-between items-center">
              <span class="text-xs text-slate-600">Deadline: ${job.deadline}</span>
              <button onclick="openApplyModal('${job.id}')" class="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl transition">
                Apply & Request Referral
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 3. RENDER MESSAGES
function renderMessagesView() {
  const container = document.getElementById('tab-content-messages');
  if (!container) return;

  const conv = appState.conversations.find(c => c.id === appState.activeConvId) || appState.conversations[0];
  const msgs = conv ? appState.messages[conv.id] || [] : [];
  const isStudent = appState.currentUser?.role === 'student';

  container.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <div class="bg-white rounded-3xl border border-slate-300 shadow-sm overflow-hidden flex h-[680px]">
        <!-- Left Sidebar -->
        <div class="w-80 border-r border-slate-200 bg-slate-50 flex flex-col">
          <div class="p-4 border-b border-slate-200 bg-white">
            <h3 class="font-extrabold text-slate-950">Messages</h3>
            <p class="text-xs text-slate-500">Direct Mentor & Candidate Chat</p>
          </div>
          <div class="flex-grow overflow-y-auto divide-y divide-slate-100">
            ${appState.conversations.map(c => `
              <div onclick="selectConversation('${c.id}')" class="p-3.5 flex items-center gap-3 cursor-pointer transition ${c.id === appState.activeConvId ? 'bg-white border-l-4 border-indigo-700 shadow-xs' : 'hover:bg-slate-100'}">
                <img src="${isStudent ? c.alumniAvatar : c.studentAvatar}" class="w-10 h-10 rounded-full object-cover">
                <div class="flex-grow min-w-0">
                  <h4 class="text-xs font-bold text-slate-950 truncate">${isStudent ? c.alumniName : c.studentName}</h4>
                  <p class="text-[11px] text-indigo-900 truncate">${isStudent ? c.alumniCompany : 'Candidate'}</p>
                  <p class="text-xs text-slate-600 truncate mt-0.5">${c.lastMessage}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Chat Area -->
        <div class="flex-grow flex flex-col bg-white">
          ${conv ? `
            <div class="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div class="flex items-center gap-3">
                <img src="${isStudent ? conv.alumniAvatar : conv.studentAvatar}" class="w-10 h-10 rounded-full object-cover">
                <div>
                  <h4 class="text-sm font-extrabold text-slate-950">${isStudent ? conv.alumniName : conv.studentName}</h4>
                  <p class="text-xs text-slate-600">${isStudent ? `${conv.alumniTitle} @ ${conv.alumniCompany}` : 'Stanford CS'}</p>
                </div>
              </div>
            </div>

            <div id="messages-feed" class="flex-grow p-5 overflow-y-auto space-y-3 bg-slate-50/40 custom-scrollbar">
              ${msgs.map(m => {
                const isMe = m.senderId === appState.currentUser?.id;
                return `
                  <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'}">
                    <span class="text-[10px] text-slate-400 mb-0.5">${m.senderName}</span>
                    <div class="max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium ${isMe ? 'bg-indigo-700 text-white rounded-br-xs' : 'bg-white border border-slate-300 text-slate-900 rounded-bl-xs'}">
                      ${m.text}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Quick Suggestions -->
            <div class="px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-[11px]">
              <span class="font-bold text-slate-500">Quick Prompt:</span>
              <button onclick="sendQuickMessage('Could you review my resume for the summer internship?')" class="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold hover:bg-indigo-50">Resume review?</button>
              <button onclick="sendQuickMessage('I applied to your referral opening, looking forward to connecting!')" class="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold hover:bg-indigo-50">Referral follow-up</button>
            </div>

            <!-- Input Box -->
            <form onsubmit="handleSendMessage(event)" class="p-3 border-t border-slate-200 flex gap-2">
              <input type="text" id="chat-input" placeholder="Type a message..." class="flex-grow px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-700">
              <button type="submit" class="px-5 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl transition">Send</button>
            </form>
          ` : '<div class="m-auto text-slate-400">Select a chat</div>'}
        </div>
      </div>
    </div>
  `;
}

// 4. RENDER DIRECTORY
function renderDirectoryView() {
  const container = document.getElementById('tab-content-directory');
  if (!container) return;

  container.innerHTML = `
    <div class="max-w-6xl mx-auto space-y-6">
      <h1 class="text-2xl font-extrabold text-slate-950">Alumni & Student Network Directory</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        ${appState.alumni.map(a => `
          <div class="bg-white rounded-2xl border border-slate-300 p-5 shadow-sm flex flex-col justify-between space-y-3">
            <div>
              <div class="flex items-center gap-3">
                <img src="${a.avatar}" class="w-12 h-12 rounded-xl object-cover">
                <div>
                  <h3 class="font-extrabold text-slate-950 text-sm">${a.name}</h3>
                  <p class="text-xs font-semibold text-indigo-900">${a.currentCompany}</p>
                </div>
              </div>
              <p class="text-xs text-slate-700 mt-2">${a.currentTitle}</p>
              <p class="text-xs text-slate-600 mt-1"><i class="fa-solid fa-graduation-cap"></i> ${a.almaMater} ('${a.graduationYear.slice(-2)})</p>
            </div>
            <button onclick="startChat('${a.id}')" class="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl transition">
              <i class="fa-solid fa-paper-plane mr-1"></i> Send Direct Message
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Interactive Handlers
function startChat(userId) {
  switchTab('messages');
}

function selectConversation(convId) {
  appState.activeConvId = convId;
  renderMessagesView();
}

function handleSendMessage(e) {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  if (!input || !input.value.trim()) return;

  const text = input.value.trim();
  input.value = '';

  const conv = appState.conversations.find(c => c.id === appState.activeConvId);
  if (!conv) return;

  const msg = {
    id: 'm-' + Date.now(),
    senderId: appState.currentUser.id,
    senderName: appState.currentUser.name,
    text: text,
    timestamp: new Date().toISOString()
  };

  if (!appState.messages[conv.id]) appState.messages[conv.id] = [];
  appState.messages[conv.id].push(msg);
  conv.lastMessage = text;
  saveStorage();
  renderMessagesView();

  // Simulated auto-reply
  if (appState.currentUser.role === 'student') {
    setTimeout(() => {
      appState.messages[conv.id].push({
        id: 'reply-' + Date.now(),
        senderId: conv.alumniId,
        senderName: conv.alumniName,
        text: `Thanks for messaging! I'll review your inquiry and follow up shortly.`,
        timestamp: new Date().toISOString()
      });
      conv.lastMessage = `Thanks for messaging! I'll review your inquiry and follow up shortly.`;
      saveStorage();
      renderMessagesView();
    }, 1200);
  }
}

function sendQuickMessage(text) {
  const conv = appState.conversations.find(c => c.id === appState.activeConvId);
  if (!conv) return;
  appState.messages[conv.id].push({
    id: 'm-' + Date.now(),
    senderId: appState.currentUser.id,
    senderName: appState.currentUser.name,
    text: text,
    timestamp: new Date().toISOString()
  });
  conv.lastMessage = text;
  saveStorage();
  renderMessagesView();
}

function openApplyModal(jobId) {
  const job = appState.jobs.find(j => j.id === jobId);
  if (!job) return;
  const note = prompt(`Enter a note/pitch for ${job.alumniName} at ${job.company}:`, "Hi! I am excited to request a referral.");
  if (note === null) return;

  appState.applications.push({
    id: 'app-' + Date.now(),
    jobId: job.id,
    studentId: appState.currentUser.id,
    studentName: appState.currentUser.name,
    studentUniversity: appState.currentUser.university || 'Stanford',
    studentMajor: appState.currentUser.major || 'CS',
    studentGradYear: '2026',
    studentAvatar: appState.currentUser.avatar,
    jobTitle: job.title,
    company: job.company,
    alumniId: job.alumniId,
    alumniName: job.alumniName,
    appliedAt: new Date().toISOString(),
    status: 'Pending Review',
    studentNote: note,
    resumeUrl: appState.currentUser.links?.resumeUrl || 'https://alexmorgan.dev/resume.pdf',
    alumniFeedback: ''
  });

  saveStorage();
  showToast("Application & referral request successfully submitted!");
  switchTab('profile');
}

function openPostJobModal() {
  const title = prompt("Enter Job Title:", "Software Engineer - Summer 2026");
  if (!title) return;
  const comp = prompt("Enter Company:", appState.currentUser.currentCompany || "Google");

  appState.jobs.unshift({
    id: 'job-' + Date.now(),
    alumniId: appState.currentUser.id,
    alumniName: appState.currentUser.name,
    alumniTitle: appState.currentUser.currentTitle || "Senior SWE",
    alumniCompany: comp || "Google",
    alumniAvatar: appState.currentUser.avatar,
    title: title,
    company: comp,
    location: "Hybrid / Remote",
    workMode: "Hybrid",
    type: "Internship",
    department: "Engineering",
    description: "Exciting technical opportunity on our engineering team.",
    requirements: ["Enrolled in STEM program", "Strong algorithms foundation"],
    referralSlotsTotal: 3,
    referralSlotsFilled: 0,
    deadline: "June 2026"
  });

  saveStorage();
  showToast("New opportunity posted!");
  renderProfileView();
}

function openAddSkillModal() {
  const name = prompt("Enter Skill name (e.g. Docker, Go, PyTorch):");
  if (!name) return;
  if (!appState.currentUser.skills) appState.currentUser.skills = [];
  appState.currentUser.skills.push({ id: 'sk-' + Date.now(), name, level: 'Advanced', category: 'Engineering' });
  saveStorage();
  renderProfileView();
  showToast("Skill added!");
}

function deleteSkill(id) {
  appState.currentUser.skills = appState.currentUser.skills.filter(s => s.id !== id);
  saveStorage();
  renderProfileView();
}

function openAddAchievementModal() {
  const title = prompt("Enter Achievement / Project title:");
  if (!title) return;
  const desc = prompt("Enter brief description:");
  if (!appState.currentUser.achievements) appState.currentUser.achievements = [];
  appState.currentUser.achievements.push({
    id: 'ach-' + Date.now(),
    title,
    category: 'Project',
    date: '2025',
    description: desc || 'Built prototype solution.'
  });
  saveStorage();
  renderProfileView();
  showToast("Achievement posted!");
}

function deleteAchievement(id) {
  appState.currentUser.achievements = appState.currentUser.achievements.filter(a => a.id !== id);
  saveStorage();
  renderProfileView();
}

function updateAppStatus(appId, newStatus) {
  const app = appState.applications.find(a => a.id === appId);
  if (app) {
    app.status = newStatus;
    saveStorage();
    showToast(`Status updated to ${newStatus}`);
  }
}

function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'fixed bottom-5 right-5 z-50 bg-slate-950 text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-bold border border-slate-700 transition animate-fade-in flex items-center gap-2';
  t.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400"></i> <span>${msg}</span>`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  initStorage();
  updateNavbarUser();
  switchTab('profile');
});
