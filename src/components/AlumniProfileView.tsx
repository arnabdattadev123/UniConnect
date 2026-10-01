import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JobVacancy, ApplicationStatus, StudentProfile } from '../types';
import {
  Briefcase,
  Building2,
  GraduationCap,
  MapPin,
  Clock,
  Plus,
  Edit3,
  MessageSquare,
  Users,
  CheckCircle,
  FileText,
  ExternalLink,
  Trash2,
  X,
  Share2,
  Send,
  Linkedin,
  Github,
  Globe,
  Tag
} from 'lucide-react';

export const AlumniProfileView: React.FC = () => {
  const {
    currentUser,
    updateAlumniProfile,
    jobs,
    postJobVacancy,
    applications,
    updateApplicationStatus,
    students,
    startOrOpenConversation,
    setActiveTab,
  } = useApp();

  if (!currentUser || currentUser.role !== 'alumni') {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p className="text-slate-600">Please sign in as alumni to view this profile.</p>
      </div>
    );
  }

  const alumni = currentUser;

  // Modals state
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isPostingJob, setIsPostingJob] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'vacancies' | 'applicants'>('vacancies');

  // Personal Info Form
  const [editForm, setEditForm] = useState({
    name: alumni.name,
    headline: alumni.headline,
    currentCompany: alumni.currentCompany,
    currentTitle: alumni.currentTitle,
    almaMater: alumni.almaMater,
    graduationYear: alumni.graduationYear,
    industry: alumni.industry,
    experienceYears: alumni.experienceYears,
    location: alumni.location,
    bio: alumni.bio,
    avatar: alumni.avatar,
    mentorshipTopics: alumni.mentorshipTopics.join(', '),
    linkedin: alumni.links.linkedin || '',
    github: alumni.links.github || '',
    portfolio: alumni.links.portfolio || '',
    isAvailableForReferrals: alumni.isAvailableForReferrals,
    isAvailableForMentoring: alumni.isAvailableForMentoring,
  });

  // Post Vacancy Form
  const [jobForm, setJobForm] = useState<{
    title: string;
    company: string;
    department: string;
    location: string;
    workMode: JobVacancy['workMode'];
    type: JobVacancy['type'];
    experienceLevel: JobVacancy['experienceLevel'];
    description: string;
    requirementsText: string;
    referralSlotsTotal: number;
    deadline: string;
    externalLink: string;
  }>({
    title: '',
    company: alumni.currentCompany,
    department: 'Engineering',
    location: alumni.location || 'Remote / Hybrid',
    workMode: 'Hybrid',
    type: 'Internship',
    experienceLevel: 'Intern',
    description: '',
    requirementsText: 'Solid knowledge of Data Structures and Algorithms\nExperience in modern programming language\nStrong communication & problem solving',
    referralSlotsTotal: 3,
    deadline: 'May 31, 2026',
    externalLink: '',
  });

  // Jobs posted by this alumni
  const myJobs = jobs.filter((j) => j.alumniId === alumni.id);

  // Applications received by this alumni
  const myReceivedApplications = applications.filter((app) => app.alumniId === alumni.id);

  // Handler for Personal Info Save
  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const topics = editForm.mentorshipTopics
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    updateAlumniProfile({
      name: editForm.name,
      headline: editForm.headline,
      currentCompany: editForm.currentCompany,
      currentTitle: editForm.currentTitle,
      almaMater: editForm.almaMater,
      graduationYear: editForm.graduationYear,
      industry: editForm.industry,
      experienceYears: editForm.experienceYears,
      location: editForm.location,
      bio: editForm.bio,
      avatar: editForm.avatar,
      mentorshipTopics: topics,
      links: {
        linkedin: editForm.linkedin,
        github: editForm.github,
        portfolio: editForm.portfolio,
      },
      isAvailableForReferrals: editForm.isAvailableForReferrals,
      isAvailableForMentoring: editForm.isAvailableForMentoring,
    });
    setIsEditingInfo(false);
  };

  // Handler for New Job Post
  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title.trim() || !jobForm.company.trim() || !jobForm.description.trim()) {
      return;
    }

    const reqs = jobForm.requirementsText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    postJobVacancy({
      title: jobForm.title,
      company: jobForm.company,
      department: jobForm.department,
      location: jobForm.location,
      workMode: jobForm.workMode,
      type: jobForm.type,
      experienceLevel: jobForm.experienceLevel,
      description: jobForm.description,
      requirements: reqs.length > 0 ? reqs : ['Passion for technology and continuous learning'],
      referralSlotsTotal: Number(jobForm.referralSlotsTotal) || 3,
      deadline: jobForm.deadline || 'Ongoing',
      externalLink: jobForm.externalLink || undefined,
    });

    setIsPostingJob(false);
    setActiveSubTab('vacancies');
    // Reset form
    setJobForm({
      title: '',
      company: alumni.currentCompany,
      department: 'Engineering',
      location: alumni.location || 'Remote / Hybrid',
      workMode: 'Hybrid',
      type: 'Internship',
      experienceLevel: 'Intern',
      description: '',
      requirementsText: 'Solid knowledge of Data Structures and Algorithms\nExperience in modern programming language\nStrong communication & problem solving',
      referralSlotsTotal: 3,
      deadline: 'May 31, 2026',
      externalLink: '',
    });
  };

  const handleChatWithStudent = (studentId: string) => {
    const targetStudent = students.find((s) => s.id === studentId);
    if (targetStudent) {
      startOrOpenConversation(targetStudent);
    } else {
      setActiveTab('messages');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Alumni Profile Header */}
      <div className="bg-white rounded-3xl border border-slate-300 shadow-sm overflow-hidden">
        {/* Cover Banner */}
        <div className="h-36 sm:h-44 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 relative">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="px-3.5 py-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30 shadow-sm">
              Alumni Mentorship Profile
            </span>
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-8 pt-0 relative bg-white">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              <img
                src={alumni.avatar}
                alt={alumni.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-xl bg-white"
              />
              <div className="mt-2 sm:mt-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                    {alumni.name}
                  </h1>
                </div>
                <p className="text-sm sm:text-base font-bold text-indigo-900 mt-1">
                  {alumni.currentTitle} @ <strong className="text-slate-950 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded font-extrabold">{alumni.currentCompany}</strong>
                </p>
                <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs sm:text-sm text-slate-800 font-medium mt-2.5">
                  <span className="flex items-center gap-1.5 text-slate-900 font-semibold">
                    <GraduationCap className="w-4 h-4 text-indigo-700" />
                    Alma Mater: {alumni.almaMater} ('{alumni.graduationYear.slice(-2)})
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="flex items-center gap-1.5 text-slate-800">
                    <Briefcase className="w-4 h-4 text-slate-600" />
                    {alumni.experienceYears} Experience
                  </span>
                  {alumni.location && (
                    <>
                      <span className="text-slate-400">·</span>
                      <span className="flex items-center gap-1.5 text-slate-700">
                        <MapPin className="w-4 h-4 text-slate-600" />
                        {alumni.location}
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
                <span>Edit Personal Info</span>
              </button>
              <button
                onClick={() => setIsPostingJob(true)}
                className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs sm:text-sm font-bold shadow-sm transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-indigo-200" />
                <span>Post Vacancy / Referral</span>
              </button>
            </div>
          </div>

          {/* Mentorship & Bio Information */}
          <div className="border-t border-slate-200 pt-5 mt-6 space-y-4">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                About Me & Mentorship Style
              </h3>
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5">
                <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-normal">
                  {alumni.bio || 'Add your mentorship background and career journey.'}
                </p>
              </div>
            </div>

            {/* Mentorship topics */}
            {alumni.mentorshipTopics && alumni.mentorshipTopics.length > 0 && (
              <div>
                <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                  Areas of Mentorship & Guidance
                </h4>
                <div className="flex flex-wrap gap-2">
                  {alumni.mentorshipTopics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-indigo-100 text-indigo-950 text-xs font-bold border border-indigo-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Availability Badges & Links */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs text-emerald-900 font-bold bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  {alumni.isAvailableForReferrals ? 'Accepting Referral Requests' : 'Referrals Paused'}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-indigo-950 font-bold bg-indigo-100 border border-indigo-300 px-3 py-1.5 rounded-xl">
                  <MessageSquare className="w-4 h-4 text-indigo-700" />
                  {alumni.isAvailableForMentoring ? 'Open to 1-on-1 Chats' : 'Chat Unavailable'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {alumni.links.linkedin && (
                  <a
                    href={alumni.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-sky-800 hover:bg-sky-900 text-white text-xs transition shadow-xs"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {alumni.links.github && (
                  <a
                    href={alumni.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs transition shadow-xs"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. JOB VACANCIES & APPLICANTS MANAGEMENT SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900">Referrals & Vacancies Hub</h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Sub-tabs */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
              <button
                onClick={() => setActiveSubTab('vacancies')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeSubTab === 'vacancies'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                My Posted Openings ({myJobs.length})
              </button>
              <button
                onClick={() => setActiveSubTab('applicants')}
                className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  activeSubTab === 'applicants'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Student Applicants</span>
                {myReceivedApplications.length > 0 && (
                  <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">
                    {myReceivedApplications.length}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={() => setIsPostingJob(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post New Opportunity</span>
            </button>
          </div>
        </div>

        {/* SUBTAB 1: POSTED VACANCIES */}
        {activeSubTab === 'vacancies' && (
          <div className="pt-6">
            {myJobs.length === 0 ? (
              <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">No opportunities posted yet</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Help students break into top tech firms by posting active job vacancies or referral openings.
                </p>
                <button
                  onClick={() => setIsPostingJob(true)}
                  className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-sm transition"
                >
                  Post Your First Job or Referral
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {myJobs.map((job) => {
                  const jobApplicants = applications.filter((app) => app.jobId === job.id);

                  return (
                    <div
                      key={job.id}
                      className="rounded-2xl border border-slate-200 p-6 bg-slate-50/40 hover:bg-white hover:shadow-md transition space-y-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
                            {job.company}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            {job.type} · {job.workMode}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mt-2">{job.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{job.department} · {job.location}</p>

                        <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                          {job.description}
                        </p>

                        {/* Requirements */}
                        <div className="mt-3 space-y-1">
                          {job.requirements.slice(0, 2).map((req, i) => (
                            <div key={i} className="text-xs text-slate-500 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                              <span className="truncate">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                        <div className="text-xs text-slate-500">
                          <span className="font-semibold text-indigo-700">{job.referralSlotsFilled}</span> of{' '}
                          <span>{job.referralSlotsTotal} referral slots taken</span>
                        </div>

                        <button
                          onClick={() => setActiveSubTab('applicants')}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-lg text-xs font-semibold transition flex items-center gap-1"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>{jobApplicants.length} Applicants</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 2: STUDENT APPLICANTS */}
        {activeSubTab === 'applicants' && (
          <div className="pt-6">
            {myReceivedApplications.length === 0 ? (
              <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">No applicants yet</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  When students apply or request referrals for your posted jobs, their profiles and resumes will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {myReceivedApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-sm transition space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={app.studentAvatar}
                          alt={app.studentName}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-slate-900">{app.studentName}</h3>
                            <span className="text-[11px] text-slate-500">
                              {app.studentUniversity} ('{app.studentGradYear.slice(-2)})
                            </span>
                          </div>
                          <p className="text-xs text-indigo-600 font-semibold">{app.studentMajor}</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Applied for: <strong>{app.jobTitle}</strong> ({app.company})
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Status Select */}
                        <div className="flex items-center gap-1.5">
                          <label className="text-[11px] font-semibold text-slate-500">Status:</label>
                          <select
                            value={app.status}
                            onChange={(e) =>
                              updateApplicationStatus(app.id, e.target.value as ApplicationStatus)
                            }
                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="Pending Review">Pending Review</option>
                            <option value="In Review">In Review</option>
                            <option value="Referral Submitted">Referral Submitted</option>
                            <option value="Interview Offered">Interview Offered</option>
                            <option value="Not Selected">Not Selected</option>
                          </select>
                        </div>

                        <button
                          onClick={() => handleChatWithStudent(app.studentId)}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Chat with Student</span>
                        </button>
                      </div>
                    </div>

                    {/* Student note & resume */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600">
                        <span className="font-semibold text-slate-800 block mb-1">Student's Pitch / Note:</span>
                        <p className="italic leading-relaxed">"{app.studentNote}"</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
                        <div>
                          <span className="font-semibold text-slate-800 block mb-1">Application Resume:</span>
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View Submitted Resume / PDF</span>
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </a>
                        </div>

                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Add feedback / referral confirmation note..."
                            defaultValue={app.alumniFeedback || ''}
                            onBlur={(e) =>
                              updateApplicationStatus(app.id, app.status, e.target.value)
                            }
                            className="flex-grow text-[11px] px-2.5 py-1 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                          <span className="text-[10px] text-slate-400">Auto-saves</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. MESSAGING SHORTCUT CARD */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-indigo-200 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Direct Student & Alumni Conversations</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">Stay connected with promising students</h3>
          <p className="text-indigo-100 text-xs sm:text-sm max-w-lg leading-relaxed">
            Answer questions about technical loops, offer mock interview guidance, or confirm referral submission directly.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('messages')}
          className="px-5 py-3 rounded-xl bg-white text-indigo-800 font-bold text-xs sm:text-sm hover:bg-indigo-50 shadow-md transition flex items-center gap-2 shrink-0"
        >
          <Send className="w-4 h-4" />
          <span>Open Messages Hub</span>
        </button>
      </div>

      {/* MODAL 1: EDIT ALUMNI PERSONAL INFO */}
      {isEditingInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <button
              onClick={() => setIsEditingInfo(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Edit Alumni Personal Information</h3>
            <p className="text-xs text-slate-500 mb-5">Update your current company, title, mentorship topics, and links.</p>

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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Company</label>
                  <input
                    type="text"
                    required
                    value={editForm.currentCompany}
                    onChange={(e) => setEditForm({ ...editForm, currentCompany: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Title / Role</label>
                  <input
                    type="text"
                    required
                    value={editForm.currentTitle}
                    onChange={(e) => setEditForm({ ...editForm, currentTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Alma Mater (University)</label>
                  <input
                    type="text"
                    required
                    value={editForm.almaMater}
                    onChange={(e) => setEditForm({ ...editForm, almaMater: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Year</label>
                  <input
                    type="text"
                    value={editForm.graduationYear}
                    onChange={(e) => setEditForm({ ...editForm, graduationYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Industry / Field</label>
                  <input
                    type="text"
                    value={editForm.industry}
                    onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Years</label>
                  <input
                    type="text"
                    value={editForm.experienceYears}
                    onChange={(e) => setEditForm({ ...editForm, experienceYears: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
                <input
                  type="text"
                  value={editForm.headline}
                  onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mentorship Topics (Comma-separated)</label>
                <input
                  type="text"
                  value={editForm.mentorshipTopics}
                  onChange={(e) => setEditForm({ ...editForm, mentorshipTopics: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bio / Mentorship Philosophy</label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={editForm.linkedin}
                    onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={editForm.github}
                    onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={editForm.isAvailableForReferrals}
                    onChange={(e) => setEditForm({ ...editForm, isAvailableForReferrals: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Accepting job referral requests</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={editForm.isAvailableForMentoring}
                    onChange={(e) => setEditForm({ ...editForm, isAvailableForMentoring: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Open for 1-on-1 chats</span>
                </label>
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

      {/* MODAL 2: POST JOB VACANCY & REFERRAL */}
      {isPostingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <button
              onClick={() => setIsPostingJob(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Post Job Vacancy / Referral Opportunity</h3>
            <p className="text-xs text-slate-500 mb-5">
              Publish an active opening at your company for student applicants.
            </p>

            <form onSubmit={handlePostJobSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Opportunity Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Software Engineer Intern - Summer 2026"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.company}
                    onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department / Team</label>
                  <input
                    type="text"
                    placeholder="e.g. Cloud Infra / AI Platform"
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Type</label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value as any })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Co-op">Co-op</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Work Mode</label>
                  <select
                    value={jobForm.workMode}
                    onChange={(e) => setJobForm({ ...jobForm, workMode: e.target.value as any })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Experience</label>
                  <select
                    value={jobForm.experienceLevel}
                    onChange={(e) => setJobForm({ ...jobForm, experienceLevel: e.target.value as any })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Intern">Intern</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Mountain View, CA or Remote"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Referral Slots Available</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={jobForm.referralSlotsTotal}
                    onChange={(e) => setJobForm({ ...jobForm, referralSlotsTotal: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Description & Project Scope *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail what the team does, day-to-day responsibilities, and team culture..."
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Requirements (One per line)</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Enrolled in CS or related STEM degree&#10;Proficiency in Go, Python, or C++&#10;Knowledge of operating systems"
                  value={jobForm.requirementsText}
                  onChange={(e) => setJobForm({ ...jobForm, requirementsText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Deadline (or Target Date)</label>
                  <input
                    type="text"
                    placeholder="e.g. May 31, 2026"
                    value={jobForm.deadline}
                    onChange={(e) => setJobForm({ ...jobForm, deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Official Job Posting URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="https://careers.google.com/..."
                    value={jobForm.externalLink}
                    onChange={(e) => setJobForm({ ...jobForm, externalLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsPostingJob(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md transition"
                >
                  Publish Vacancy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
