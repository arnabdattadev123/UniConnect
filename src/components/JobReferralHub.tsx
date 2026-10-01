import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JobVacancy } from '../types';
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Users,
  Send,
  ExternalLink,
  Plus,
  X,
  FileText,
  AlertCircle
} from 'lucide-react';

interface JobReferralHubProps {
  onOpenAuth: () => void;
}

export const JobReferralHub: React.FC<JobReferralHubProps> = ({ onOpenAuth }) => {
  const {
    currentUser,
    jobs,
    applications,
    applyForJob,
    setActiveTab,
    startOrOpenConversation,
    alumni,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterMode, setFilterMode] = useState<string>('All');

  // Selected job for apply modal
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobVacancy | null>(null);
  const [studentNote, setStudentNote] = useState('');
  const [resumeUrl, setResumeUrl] = useState(
    currentUser?.role === 'student' ? currentUser.links.resumeUrl || '' : ''
  );
  const [applyFeedback, setApplyFeedback] = useState<{ error?: string; success?: boolean } | null>(
    null
  );

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.alumniName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'All' ? true : job.type === filterType;
    const matchesMode = filterMode === 'All' ? true : job.workMode === filterMode;

    return matchesSearch && matchesType && matchesMode;
  });

  const handleOpenApplyModal = (job: JobVacancy) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (currentUser.role !== 'student') {
      alert('You are currently viewing as Alumni. To apply or request referrals, switch to a Student account.');
      return;
    }
    setSelectedJobForApply(job);
    setStudentNote(`Hi ${job.alumniName}, I'm very excited about the ${job.title} opportunity at ${job.company}. My background aligns well with the team's technical needs and I'd love your referral!`);
    setResumeUrl(currentUser.links.resumeUrl || 'https://drive.google.com/my-resume.pdf');
    setApplyFeedback(null);
  };

  const handleConfirmApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForApply) return;

    if (!resumeUrl.trim()) {
      setApplyFeedback({ error: 'Please enter a valid link to your Resume / CV.' });
      return;
    }

    const res = applyForJob(selectedJobForApply.id, studentNote, resumeUrl);
    if (res.success) {
      setApplyFeedback({ success: true });
      setTimeout(() => {
        setSelectedJobForApply(null);
      }, 1400);
    } else {
      setApplyFeedback({ error: res.message });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white p-6 sm:p-10 shadow-xl overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-indigo-200 mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Direct Alumni Referrals & Vacancies</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Get Referred by Alumni Inside Your Dream Companies
          </h1>
          <p className="mt-2 text-indigo-100 text-xs sm:text-sm leading-relaxed max-w-xl">
            Skip the recruiter black hole. Verified alumni at Google, Microsoft, Meta, and Stripe review student profiles and submit warm internal referrals.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            {currentUser?.role === 'alumni' ? (
              <button
                onClick={() => setActiveTab('profile')}
                className="px-4 py-2.5 rounded-xl bg-white text-indigo-900 font-bold hover:bg-indigo-50 transition shadow-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-indigo-700" />
                <span>Post a Job Vacancy as Alumni</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  const input = document.getElementById('search-jobs-input');
                  if (input) input.focus();
                }}
                className="px-4 py-2.5 rounded-xl bg-white text-indigo-900 font-bold hover:bg-indigo-50 transition shadow-sm flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-indigo-700" />
                <span>Explore Open Referrals ({jobs.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Decorative blur */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-grow w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="search-jobs-input"
            type="text"
            placeholder="Search by job title, company (Google, Meta), alumni name, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Job Types</option>
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
            <option value="Co-op">Co-op</option>
          </select>

          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Work Modes</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
          <span>Active Opportunities ({filteredJobs.length})</span>
          <span>Verified Alumni Referrers</span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 text-slate-500">
            <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-base font-bold text-slate-800">No opportunities match your search</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredJobs.map((job) => {
              const alreadyApplied =
                currentUser?.role === 'student' &&
                applications.some(
                  (a) => a.jobId === job.id && a.studentId === currentUser.id
                );

              const userApplication =
                currentUser?.role === 'student'
                  ? applications.find(
                      (a) => a.jobId === job.id && a.studentId === currentUser.id
                    )
                  : null;

              const slotsLeft = Math.max(0, job.referralSlotsTotal - job.referralSlotsFilled);

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition space-y-4 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Company & Type */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg">
                        {job.company}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span>{job.type}</span>
                        <span>·</span>
                        <span>{job.workMode}</span>
                      </div>
                    </div>

                    {/* Role Title */}
                    <h3 className="text-lg font-bold text-slate-900 mt-2.5 leading-snug">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location} ({job.department})
                    </p>

                    {/* Description */}
                    <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Requirements Preview */}
                    <div className="mt-3 space-y-1">
                      {job.requirements.slice(0, 2).map((req, i) => (
                        <div key={i} className="text-xs text-slate-500 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                          <span className="truncate">{req}</span>
                        </div>
                      ))}
                    </div>

                    {/* Alumni Referrer Pill */}
                    <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={job.alumniAvatar}
                          alt={job.alumniName}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900 leading-tight">
                            {job.alumniName}
                          </p>
                          <p className="text-[11px] text-indigo-600 font-medium">
                            {job.alumniTitle}
                          </p>
                        </div>
                      </div>

                      <div className="text-right text-[11px]">
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {slotsLeft} slots open
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Deadline: {job.deadline}
                    </span>

                    {alreadyApplied ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Applied ({userApplication?.status})</span>
                        </span>
                        <button
                          onClick={() => setActiveTab('profile')}
                          className="text-xs text-indigo-600 hover:underline font-semibold"
                        >
                          View Status
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleOpenApplyModal(job)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Apply & Request Referral</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* APPLY / REFERRAL REQUEST MODAL */}
      {selectedJobForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <button
              onClick={() => setSelectedJobForApply(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Apply & Request Referral
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Your application details and note will be sent directly to <strong>{selectedJobForApply.alumniName}</strong> at {selectedJobForApply.company}.
            </p>

            <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 mb-4">
              <p className="text-xs font-bold text-indigo-950">{selectedJobForApply.title}</p>
              <p className="text-[11px] text-indigo-700">
                {selectedJobForApply.company} · {selectedJobForApply.location} ({selectedJobForApply.type})
              </p>
            </div>

            {applyFeedback?.error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{applyFeedback.error}</span>
              </div>
            )}

            {applyFeedback?.success ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">Application & Referral Sent!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your request has been delivered to {selectedJobForApply.alumniName}. You can track status on your Student Profile and in Messages!
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmApplication} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Resume Link (Google Drive / PDF URL) *
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="https://drive.google.com/..."
                      value={resumeUrl}
                      onChange={(e) => setResumeUrl(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Ensure the link has public viewing permissions.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pitch / Personal Note to {selectedJobForApply.alumniName} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Highlight why you're a great candidate, reference relevant projects or coursework, and express your interest..."
                    value={studentNote}
                    onChange={(e) => setStudentNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJobForApply(null)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Referral Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
