/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { StudentProfileView } from './components/StudentProfileView';
import { AlumniProfileView } from './components/AlumniProfileView';
import { JobReferralHub } from './components/JobReferralHub';
import { MessagesView } from './components/MessagesView';
import { DirectoryView } from './components/DirectoryView';
import {
  GraduationCap,
  Briefcase,
  Users,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  FileCheck
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentUser, activeTab, setActiveTab, quickLoginAs } = useApp();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authDefaultRole, setAuthDefaultRole] = useState<'student' | 'alumni'>('student');
  const [authDefaultMode, setAuthDefaultMode] = useState<'signin' | 'signup'>('signin');

  const openAuthWith = (role: 'student' | 'alumni', mode: 'signin' | 'signup') => {
    setAuthDefaultRole(role);
    setAuthDefaultMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navigation */}
      <Navbar onOpenAuth={() => openAuthWith('student', 'signin')} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {!currentUser ? (
          /* Landing & Welcome Gate for Unauthenticated Users */
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
            {/* Hero */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>The Premier Student & Alumni Career Network</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Connect with Alumni. Land Referrals. Fast-Track Your Career.
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                UniConnect bridges current university students directly with working graduates at Google, Microsoft, Meta, and Stripe for 1-on-1 mentorship, resume reviews, and internal job referrals.
              </p>
            </div>

            {/* Split Sign In / Sign Up Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Card 1: Student Portal */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition flex flex-col justify-between space-y-6 group">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Join as a Student</h2>
                    <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                      For Current Undergrads, Masters & PhDs
                    </p>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Post your technical skills & notable achievements</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Request internal job referrals from alumni at dream companies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Track where you applied with live status updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Direct 1-on-1 chat with alumni mentors</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => openAuthWith('student', 'signin')}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>Sign In as Student</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openAuthWith('student', 'signup')}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs transition"
                  >
                    Create New Student Account
                  </button>
                  <button
                    onClick={() => {
                      quickLoginAs('student', 'student-alex');
                      setActiveTab('profile');
                    }}
                    className="w-full text-center text-xs text-indigo-600 hover:underline font-semibold py-1"
                  >
                    ⚡ Test 1-Click Demo (Alex Morgan, Stanford CS)
                  </button>
                </div>
              </div>

              {/* Card 2: Alumni Portal */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition flex flex-col justify-between space-y-6 group">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Join as an Alumni</h2>
                    <p className="text-xs text-violet-600 font-semibold mt-0.5">
                      For Working Graduates & Industry Professionals
                    </p>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Post job vacancies & referral openings at your company</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Review student applicants, portfolios, and resumes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Update application statuses and send feedback notes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Chat directly with juniors to give interview guidance</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => openAuthWith('alumni', 'signin')}
                    className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>Sign In as Alumni</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openAuthWith('alumni', 'signup')}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs transition"
                  >
                    Create New Alumni Account
                  </button>
                  <button
                    onClick={() => {
                      quickLoginAs('alumni', 'alumni-sarah');
                      setActiveTab('profile');
                    }}
                    className="w-full text-center text-xs text-violet-600 hover:underline font-semibold py-1"
                  >
                    ⚡ Test 1-Click Demo (Sarah Chen, Google SWE)
                  </button>
                </div>
              </div>
            </div>

            {/* Platform Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-center">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <p className="text-2xl font-extrabold text-indigo-600">3,400+</p>
                <p className="text-xs text-slate-500 mt-1">Verified Alumni</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <p className="text-2xl font-extrabold text-indigo-600">850+</p>
                <p className="text-xs text-slate-500 mt-1">Referrals Submitted</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <p className="text-2xl font-extrabold text-indigo-600">120+</p>
                <p className="text-xs text-slate-500 mt-1">Universities Covered</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <p className="text-2xl font-extrabold text-indigo-600">98%</p>
                <p className="text-xs text-slate-500 mt-1">Alumni Response Rate</p>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Tab Views */
          <div>
            {activeTab === 'profile' && (
              currentUser.role === 'student' ? <StudentProfileView /> : <AlumniProfileView />
            )}

            {activeTab === 'jobs' && (
              <JobReferralHub onOpenAuth={() => openAuthWith('student', 'signin')} />
            )}

            {activeTab === 'messages' && (
              <MessagesView />
            )}

            {activeTab === 'directory' && (
              <DirectoryView />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">UniConnect</span>
            <span>· Campus to Career Bridge</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span>Student & Alumni Network</span>
            <span>·</span>
            <span>Direct Referrals & Mentorship</span>
            <span>·</span>
            <span>Stanford · MIT · Harvard & More</span>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authDefaultMode}
        defaultRole={authDefaultRole}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
