import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  GraduationCap,
  Briefcase,
  X,
  Mail,
  Lock,
  User,
  Building2,
  BookOpen,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  FileText,
  Linkedin,
  Github
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
  defaultRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'signin',
  defaultRole = 'student',
}) => {
  const { login, signupStudent, signupAlumni, quickLoginAs, setActiveTab } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [error, setError] = useState<string | null>(null);

  // Sign In inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Student Sign Up inputs
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    password: '',
    university: 'Stanford University',
    major: 'Computer Science',
    degreeLevel: 'B.S.',
    graduationYear: '2026',
    gpa: '3.85',
    headline: 'Computer Science Student passionate about Software Engineering',
    bio: 'Dedicated student looking for internship and entry-level engineering roles. Enthusiastic about systems and collaborative problem solving.',
    location: 'San Francisco Bay Area, CA',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    linkedin: '',
    github: '',
    portfolio: '',
    resumeUrl: 'https://example.com/resume.pdf',
  });

  // Alumni Sign Up inputs
  const [alumniForm, setAlumniForm] = useState({
    name: '',
    email: '',
    password: '',
    almaMater: 'Stanford University',
    graduationYear: '2021',
    currentCompany: 'Google',
    currentTitle: 'Software Engineer II',
    industry: 'Technology & Cloud',
    experienceYears: '4 years',
    headline: 'SWE at Google | Passionate Mentor & Referrer',
    bio: 'Experienced engineer passionate about guiding students through technical interview loops and offering warm referrals to high-caliber opportunities.',
    location: 'Mountain View, CA',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    linkedin: '',
    github: '',
    portfolio: '',
    mentorshipTopics: 'System Design, Resume Polish, Referral Assistance',
    isAvailableForReferrals: true,
    isAvailableForMentoring: true,
  });

  if (!isOpen) return null;

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!loginEmail.trim()) {
      setError('Please provide your email address.');
      return;
    }

    const result = login(loginEmail, role);
    if (result.success) {
      setActiveTab('profile');
      onClose();
    } else {
      setError(result.message || 'Authentication failed. Please verify credentials or try demo login.');
    }
  };

  const handleStudentSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!studentForm.name.trim() || !studentForm.email.trim() || !studentForm.university.trim()) {
      setError('Please fill in required fields: Name, Email, University.');
      return;
    }

    const res = signupStudent({
      name: studentForm.name,
      email: studentForm.email,
      password: studentForm.password || 'password123',
      university: studentForm.university,
      major: studentForm.major,
      degreeLevel: studentForm.degreeLevel,
      graduationYear: studentForm.graduationYear,
      gpa: studentForm.gpa,
      headline: studentForm.headline || `${studentForm.major} @ ${studentForm.university}`,
      bio: studentForm.bio,
      location: studentForm.location,
      avatar: studentForm.avatar,
      links: {
        linkedin: studentForm.linkedin,
        github: studentForm.github,
        portfolio: studentForm.portfolio,
        resumeUrl: studentForm.resumeUrl,
      },
    });

    if (res.success) {
      setActiveTab('profile');
      onClose();
    } else {
      setError(res.message || 'Registration failed.');
    }
  };

  const handleAlumniSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!alumniForm.name.trim() || !alumniForm.email.trim() || !alumniForm.currentCompany.trim()) {
      setError('Please fill in required fields: Name, Email, Current Company.');
      return;
    }

    const topics = alumniForm.mentorshipTopics
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const res = signupAlumni({
      name: alumniForm.name,
      email: alumniForm.email,
      password: alumniForm.password || 'password123',
      almaMater: alumniForm.almaMater,
      graduationYear: alumniForm.graduationYear,
      currentCompany: alumniForm.currentCompany,
      currentTitle: alumniForm.currentTitle,
      industry: alumniForm.industry,
      experienceYears: alumniForm.experienceYears,
      headline: alumniForm.headline || `${alumniForm.currentTitle} at ${alumniForm.currentCompany}`,
      bio: alumniForm.bio,
      location: alumniForm.location,
      avatar: alumniForm.avatar,
      links: {
        linkedin: alumniForm.linkedin,
        github: alumniForm.github,
        portfolio: alumniForm.portfolio,
      },
      mentorshipTopics: topics.length > 0 ? topics : ['Career Mentorship', 'Referrals'],
      isAvailableForReferrals: alumniForm.isAvailableForReferrals,
      isAvailableForMentoring: alumniForm.isAvailableForMentoring,
    });

    if (res.success) {
      setActiveTab('profile');
      onClose();
    } else {
      setError(res.message || 'Registration failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 p-6 sm:p-8 text-white">
          <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>UniConnect Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {mode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-indigo-100 text-xs sm:text-sm mt-1 max-w-lg">
            {mode === 'signin'
              ? 'Sign in to access your customized student or alumni profile, messages, and job referrals.'
              : 'Join as a student to land dream referrals or as alumni to mentor and post vacancies.'}
          </p>

          {/* Mode Switch Tabs */}
          <div className="mt-5 flex items-center bg-black/20 p-1 rounded-xl w-fit">
            <button
              onClick={() => {
                setMode('signin');
                setError(null);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                mode === 'signin'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-indigo-100 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError(null);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                mode === 'signup'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-indigo-100 hover:text-white'
              }`}
            >
              New Registration (Sign Up)
            </button>
          </div>
        </div>

        {/* Role Selector Bar */}
        <div className="p-6 sm:p-8 pt-6">
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setRole('student');
                  setError(null);
                }}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition ${
                  role === 'student'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    role === 'student' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Student</p>
                  <p className="text-[11px] text-slate-500">Showcase skills & seek referrals</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole('alumni');
                  setError(null);
                }}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition ${
                  role === 'alumni'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    role === 'alumni' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Alumni</p>
                  <p className="text-[11px] text-slate-500">Post vacancies & mentor students</p>
                </div>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* SIGN IN FORM */}
          {mode === 'signin' && (
            <div>
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {role === 'student' ? 'Student University / Personal Email' : 'Alumni Company / Personal Email'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder={role === 'student' ? 'alex.student@stanford.edu' : 'sarah.chen@google.com'}
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 mt-2"
                >
                  <span>Sign In as {role === 'student' ? 'Student' : 'Alumni'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Instant 1-Click Demo Logins */}
              <div className="mt-6 pt-5 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center mb-3">
                  Or Test Instantly with Demo Accounts
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      quickLoginAs('student', 'student-alex');
                      setActiveTab('profile');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/70 text-left transition flex items-center gap-2.5"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80"
                      className="w-7 h-7 rounded-full object-cover"
                      alt="Alex"
                    />
                    <div>
                      <p className="text-xs font-bold text-indigo-950">Student: Alex Morgan</p>
                      <p className="text-[10px] text-indigo-700">Stanford CS '26 · Has applications</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      quickLoginAs('alumni', 'alumni-sarah');
                      setActiveTab('profile');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 text-left transition flex items-center gap-2.5"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                      className="w-7 h-7 rounded-full object-cover"
                      alt="Sarah"
                    />
                    <div>
                      <p className="text-xs font-bold text-emerald-950">Alumni: Sarah Chen</p>
                      <p className="text-[10px] text-emerald-700">Senior SWE @ Google · Has job posts</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SIGN UP: STUDENT FORM */}
          {mode === 'signup' && role === 'student' && (
            <form onSubmit={handleStudentSignUpSubmit} className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="maya@stanford.edu"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">University / College *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stanford University"
                    value={studentForm.university}
                    onChange={(e) => setStudentForm({ ...studentForm, university: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Major / Discipline *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Computer Science"
                    value={studentForm.major}
                    onChange={(e) => setStudentForm({ ...studentForm, major: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Degree</label>
                  <select
                    value={studentForm.degreeLevel}
                    onChange={(e) => setStudentForm({ ...studentForm, degreeLevel: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="B.S.">B.S.</option>
                    <option value="B.A.">B.A.</option>
                    <option value="M.S.">M.S.</option>
                    <option value="Ph.D.">Ph.D.</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Grad Year</label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={studentForm.graduationYear}
                    onChange={(e) => setStudentForm({ ...studentForm, graduationYear: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GPA (Opt)</label>
                  <input
                    type="text"
                    placeholder="3.9"
                    value={studentForm.gpa}
                    onChange={(e) => setStudentForm({ ...studentForm, gpa: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Headline / Target Roles</label>
                <input
                  type="text"
                  placeholder="e.g. Aspiring Full-Stack SWE & Distributed Systems Enthusiast"
                  value={studentForm.headline}
                  onChange={(e) => setStudentForm({ ...studentForm, headline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Bio</label>
                <textarea
                  rows={2}
                  placeholder="Tell alumni about your career ambitions, projects, and what mentorship you seek..."
                  value={studentForm.bio}
                  onChange={(e) => setStudentForm({ ...studentForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Resume Link (Google Drive/PDF)</label>
                  <input
                    type="text"
                    placeholder="https://drive.google.com/..."
                    value={studentForm.resumeUrl}
                    onChange={(e) => setStudentForm({ ...studentForm, resumeUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub or Portfolio URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={studentForm.github}
                    onChange={(e) => setStudentForm({ ...studentForm, github: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 mt-4"
              >
                <span>Register & Open Student Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* SIGN UP: ALUMNI FORM */}
          {mode === 'signup' && role === 'alumni' && (
            <form onSubmit={handleAlumniSignUpSubmit} className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jason Thorne"
                    value={alumniForm.name}
                    onChange={(e) => setAlumniForm({ ...alumniForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="jason@microsoft.com"
                    value={alumniForm.email}
                    onChange={(e) => setAlumniForm({ ...alumniForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Alma Mater / University *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stanford University"
                    value={alumniForm.almaMater}
                    onChange={(e) => setAlumniForm({ ...alumniForm, almaMater: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Year</label>
                  <input
                    type="text"
                    placeholder="2020"
                    value={alumniForm.graduationYear}
                    onChange={(e) => setAlumniForm({ ...alumniForm, graduationYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Company *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google, Microsoft, Meta, Stripe"
                    value={alumniForm.currentCompany}
                    onChange={(e) => setAlumniForm({ ...alumniForm, currentCompany: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Position / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Software Engineer"
                    value={alumniForm.currentTitle}
                    onChange={(e) => setAlumniForm({ ...alumniForm, currentTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Industry / Domain</label>
                  <input
                    type="text"
                    placeholder="e.g. Cloud Infrastructure / AI"
                    value={alumniForm.industry}
                    onChange={(e) => setAlumniForm({ ...alumniForm, industry: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Years of Experience</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 years"
                    value={alumniForm.experienceYears}
                    onChange={(e) => setAlumniForm({ ...alumniForm, experienceYears: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mentorship Topics (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="System Design, Resume Polish, Job Referrals, Interview Loops"
                  value={alumniForm.mentorshipTopics}
                  onChange={(e) => setAlumniForm({ ...alumniForm, mentorshipTopics: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">About Your Mentorship & Bio</label>
                <textarea
                  rows={2}
                  placeholder="Describe your background and how you can assist students..."
                  value={alumniForm.bio}
                  onChange={(e) => setAlumniForm({ ...alumniForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={alumniForm.isAvailableForReferrals}
                    onChange={(e) => setAlumniForm({ ...alumniForm, isAvailableForReferrals: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Available to provide job referrals</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={alumniForm.isAvailableForMentoring}
                    onChange={(e) => setAlumniForm({ ...alumniForm, isAvailableForMentoring: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Available for 1-on-1 chats</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 mt-4"
              >
                <span>Register & Open Alumni Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
