import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StudentProfile, StudentSkill, StudentAchievement } from '../types';
import {
  GraduationCap,
  BookOpen,
  MapPin,
  Calendar,
  Award,
  Code,
  Briefcase,
  MessageSquare,
  ExternalLink,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  Clock,
  Sparkles,
  FileText,
  Linkedin,
  Github,
  Globe,
  X,
  AlertCircle
} from 'lucide-react';

export const StudentProfileView: React.FC = () => {
  const {
    currentUser,
    updateStudentProfile,
    addStudentSkill,
    removeStudentSkill,
    addStudentAchievement,
    removeStudentAchievement,
    applications,
    alumni,
    startOrOpenConversation,
    setActiveTab,
  } = useApp();

  // If user is not a student (e.g. viewing while alumni), handle gracefully
  if (!currentUser || currentUser.role !== 'student') {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p className="text-slate-600">Please sign in as a student to view this profile.</p>
      </div>
    );
  }

  const student = currentUser;

  // Modals state
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isAddingAchievement, setIsAddingAchievement] = useState(false);

  // Form states for Personal Info Edit
  const [editForm, setEditForm] = useState({
    name: student.name,
    headline: student.headline,
    university: student.university,
    major: student.major,
    degreeLevel: student.degreeLevel,
    graduationYear: student.graduationYear,
    gpa: student.gpa || '',
    location: student.location,
    bio: student.bio,
    avatar: student.avatar,
    resumeUrl: student.links.resumeUrl || '',
    linkedin: student.links.linkedin || '',
    github: student.links.github || '',
    portfolio: student.links.portfolio || '',
  });

  // Form state for New Skill
  const [newSkill, setNewSkill] = useState<{
    name: string;
    level: StudentSkill['level'];
    category: string;
  }>({
    name: '',
    level: 'Intermediate',
    category: 'Engineering',
  });

  // Form state for New Achievement
  const [newAch, setNewAch] = useState<{
    title: string;
    category: StudentAchievement['category'];
    date: string;
    description: string;
    link: string;
  }>({
    title: '',
    category: 'Project',
    date: '',
    description: '',
    link: '',
  });

  // Student's applications
  const myApplications = applications.filter((app) => app.studentId === student.id);

  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      name: editForm.name,
      headline: editForm.headline,
      university: editForm.university,
      major: editForm.major,
      degreeLevel: editForm.degreeLevel,
      graduationYear: editForm.graduationYear,
      gpa: editForm.gpa,
      location: editForm.location,
      bio: editForm.bio,
      avatar: editForm.avatar,
      links: {
        resumeUrl: editForm.resumeUrl,
        linkedin: editForm.linkedin,
        github: editForm.github,
        portfolio: editForm.portfolio,
      },
    });
    setIsEditingInfo(false);
  };

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;
    addStudentSkill(newSkill);
    setNewSkill({ name: '', level: 'Intermediate', category: 'Engineering' });
    setIsAddingSkill(false);
  };

  const handleAddAchievementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAch.title.trim()) return;
    addStudentAchievement({
      title: newAch.title,
      category: newAch.category,
      date: newAch.date || '2025',
      description: newAch.description,
      link: newAch.link || undefined,
    });
    setNewAch({ title: '', category: 'Project', date: '', description: '', link: '' });
    setIsAddingAchievement(false);
  };

  const handleChatWithAlumni = (alumniId: string) => {
    const target = alumni.find((a) => a.id === alumniId);
    if (target) {
      startOrOpenConversation(target);
    } else {
      setActiveTab('messages');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header Profile Banner */}
      <div className="bg-white rounded-3xl border border-slate-300 shadow-sm overflow-hidden">
        {/* Cover gradient */}
        <div className="h-36 sm:h-44 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 relative">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="px-3.5 py-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30 shadow-sm">
              Student Profile
            </span>
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-8 pt-0 relative bg-white">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-xl bg-white"
              />
              <div className="mt-2 sm:mt-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                    {student.name}
                  </h1>
                </div>
                <p className="text-sm sm:text-base font-bold text-indigo-900 mt-1">
                  {student.major} · <span className="text-slate-800">{student.degreeLevel} candidate</span>
                </p>
                <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs sm:text-sm text-slate-800 font-medium mt-2.5">
                  <span className="flex items-center gap-1.5 text-slate-900 font-semibold">
                    <GraduationCap className="w-4 h-4 text-indigo-700" />
                    <span>{student.university} (Class of {student.graduationYear})</span>
                  </span>
                  {student.gpa && (
                    <>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-800">
                        GPA: <strong className="text-slate-950 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded font-extrabold">{student.gpa}</strong>
                      </span>
                    </>
                  )}
                  {student.location && (
                    <>
                      <span className="text-slate-400">·</span>
                      <span className="flex items-center gap-1.5 text-slate-700">
                        <MapPin className="w-4 h-4 text-slate-600" />
                        {student.location}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setIsEditingInfo(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-sm transition flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4 text-slate-200" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs sm:text-sm font-bold shadow-sm transition flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-indigo-200" />
                <span>Messages with Alumni</span>
              </button>
            </div>
          </div>

          {/* Headline & Bio */}
          <div className="border-t border-slate-200 pt-5 mt-6">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
              Career Objective & Bio
            </h3>
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5">
              <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-normal">
                {student.bio || 'Add your bio to share your background with alumni mentors.'}
              </p>
            </div>

            {/* Quick Links & Documents */}
            <div className="mt-4 flex flex-wrap gap-2.5 text-xs sm:text-sm">
              {student.links.resumeUrl && (
                <a
                  href={student.links.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-900 text-white font-bold hover:bg-indigo-950 transition shadow-xs"
                >
                  <FileText className="w-4 h-4 text-indigo-200" />
                  <span>Resume / CV</span>
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-300 ml-0.5" />
                </a>
              )}
              {student.links.github && (
                <a
                  href={student.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition shadow-xs"
                >
                  <Github className="w-4 h-4 text-slate-300" />
                  <span>GitHub</span>
                </a>
              )}
              {student.links.linkedin && (
                <a
                  href={student.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-800 text-white font-bold hover:bg-sky-900 transition shadow-xs"
                >
                  <Linkedin className="w-4 h-4 text-sky-200" />
                  <span>LinkedIn</span>
                </a>
              )}
              {student.links.portfolio && (
                <a
                  href={student.links.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition shadow-xs"
                >
                  <Globe className="w-4 h-4 text-slate-300" />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. WHERE HE APPLIED: Job & Referral Applications Tracker */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">Where I Applied</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                {myApplications.length} Opportunities
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Track the status of your applications and alumni referral requests in real-time.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('jobs')}
            className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-xl transition flex items-center gap-1.5 w-fit"
          >
            <span>Explore More Referrals</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {myApplications.length === 0 ? (
          <div className="text-center py-10 px-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
            <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No applications yet</p>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              You haven't requested any job referrals yet. Browse the Referral Hub to connect with alumni at Google, Microsoft, Meta and more.
            </p>
            <button
              onClick={() => setActiveTab('jobs')}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold shadow-sm hover:bg-indigo-700 transition"
            >
              Browse Open Referrals
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myApplications.map((app) => {
              const statusColor =
                app.status === 'Referral Submitted'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : app.status === 'Interview Offered'
                  ? 'bg-violet-50 text-violet-700 border-violet-200'
                  : app.status === 'In Review'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : app.status === 'Not Selected'
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200';

              return (
                <div
                  key={app.id}
                  className="rounded-2xl border border-slate-200 p-5 bg-slate-50/40 hover:bg-white hover:shadow-md transition space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                          {app.company}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-1.5 leading-snug">
                          {app.jobTitle}
                        </h3>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${statusColor}`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="mt-3 text-xs text-slate-500 flex items-center gap-2">
                      <span>Referrer: <strong>{app.alumniName}</strong></span>
                      <span>·</span>
                      <span>Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                    </div>

                    {app.studentNote && (
                      <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-600">
                        <span className="font-semibold text-slate-800 block mb-0.5">My Note:</span>
                        <p className="line-clamp-2 italic">"{app.studentNote}"</p>
                      </div>
                    )}

                    {app.alumniFeedback && (
                      <div className="mt-3 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900">
                        <span className="font-bold flex items-center gap-1 text-emerald-800 mb-0.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          Feedback from {app.alumniName}:
                        </span>
                        <p className="leading-relaxed">{app.alumniFeedback}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-500 hover:text-indigo-600 font-medium flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      View Submitted Resume
                    </a>
                    <button
                      onClick={() => handleChatWithAlumni(app.alumniId)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3 h-3" />
                      Message Referrer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. POST SKILLS & EXPERTISE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">Technical Skills & Expertise</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Add your core programming languages, frameworks, and technologies to attract alumni referrals.
            </p>
          </div>
          <button
            onClick={() => setIsAddingSkill(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post / Add Skill</span>
          </button>
        </div>

        {student.skills.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No skills posted yet. Click "+ Post / Add Skill" above to highlight your expertise!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {student.skills.map((skill) => (
              <div
                key={skill.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between group hover:border-indigo-300 hover:bg-indigo-50/30 transition"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{skill.name}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span>{skill.category}</span>
                    <span>·</span>
                    <span className="font-semibold text-indigo-600">{skill.level}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeStudentSkill(skill.id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition"
                  title="Remove skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. POST ACHIEVEMENTS, PROJECTS & HONORS */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">Achievements & Projects</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Showcase hackathons won, research publications, open source repositories, and campus leadership.
            </p>
          </div>
          <button
            onClick={() => setIsAddingAchievement(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Achievement</span>
          </button>
        </div>

        {student.achievements.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No achievements posted yet. Add your projects and awards to stand out!
          </div>
        ) : (
          <div className="space-y-4">
            {student.achievements.map((ach) => (
              <div
                key={ach.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-sm transition flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-grow">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {ach.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{ach.title}</h3>
                    {ach.date && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {ach.date}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {ach.description}
                  </p>
                  {ach.link && (
                    <a
                      href={ach.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-semibold pt-1"
                    >
                      <span>View Project Demo / Reference</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => removeStudentAchievement(ach.id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 p-2 rounded-lg transition self-end sm:self-start"
                  title="Remove achievement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL 1: EDIT PERSONAL INFO */}
      {isEditingInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <button
              onClick={() => setIsEditingInfo(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Edit Student Personal Information</h3>
            <p className="text-xs text-slate-500 mb-5">Update your academic credentials, bio, and portfolio links.</p>

            <form onSubmit={handleSavePersonalInfo} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Headline / Target Roles</label>
                <input
                  type="text"
                  value={editForm.headline}
                  onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">University</label>
                  <input
                    type="text"
                    required
                    value={editForm.university}
                    onChange={(e) => setEditForm({ ...editForm, university: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Major / Department</label>
                  <input
                    type="text"
                    required
                    value={editForm.major}
                    onChange={(e) => setEditForm({ ...editForm, major: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Degree</label>
                  <select
                    value={editForm.degreeLevel}
                    onChange={(e) => setEditForm({ ...editForm, degreeLevel: e.target.value })}
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
                    value={editForm.graduationYear}
                    onChange={(e) => setEditForm({ ...editForm, graduationYear: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GPA</label>
                  <input
                    type="text"
                    value={editForm.gpa}
                    onChange={(e) => setEditForm({ ...editForm, gpa: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bio</label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Resume Link (Google Drive/PDF URL)</label>
                <input
                  type="text"
                  value={editForm.resumeUrl}
                  onChange={(e) => setEditForm({ ...editForm, resumeUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Link</label>
                  <input
                    type="text"
                    value={editForm.github}
                    onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Link</label>
                  <input
                    type="text"
                    value={editForm.linkedin}
                    onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingInfo(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD SKILL */}
      {isAddingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <button
              onClick={() => setIsAddingSkill(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Post a Technical Skill</h3>
            <p className="text-xs text-slate-500 mb-4">Add your technical proficiency to highlight to alumni.</p>

            <form onSubmit={handleAddSkillSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Systems, React, PyTorch"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Proficiency Level</label>
                <select
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Frontend">Frontend Development</option>
                  <option value="Backend">Backend & Systems</option>
                  <option value="AI/ML">AI & Machine Learning</option>
                  <option value="Database">Databases & Storage</option>
                  <option value="DevOps">Cloud & DevOps</option>
                  <option value="Mobile">Mobile Apps</option>
                  <option value="Soft Skills">Communication & Leadership</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md transition"
              >
                Add Skill to Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD ACHIEVEMENT */}
      {isAddingAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <button
              onClick={() => setIsAddingAchievement(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Post Achievement or Project</h3>
            <p className="text-xs text-slate-500 mb-4">Highlight competitions, awards, published papers, or top projects.</p>

            <form onSubmit={handleAddAchievementSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HackMIT 1st Place or Distributed Cache Project"
                  value={newAch.title}
                  onChange={(e) => setNewAch({ ...newAch, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newAch.category}
                    onChange={(e) => setNewAch({ ...newAch, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Project">Project</option>
                    <option value="Award">Award / Honor</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Research">Research / Paper</option>
                    <option value="Certification">Certification</option>
                    <option value="Club / Leadership">Club / Leadership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date / Period</label>
                  <input
                    type="text"
                    placeholder="e.g. Jan 2025"
                    value={newAch.date}
                    onChange={(e) => setNewAch({ ...newAch, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain what you built or accomplished, technologies utilized, and impact..."
                  value={newAch.description}
                  onChange={(e) => setNewAch({ ...newAch, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">External Link (Demo / Repo / Certificate URL)</label>
                <input
                  type="text"
                  placeholder="https://github.com/... or https://devpost.com/..."
                  value={newAch.link}
                  onChange={(e) => setNewAch({ ...newAch, link: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md transition"
              >
                Publish Achievement
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
