import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Briefcase,
  MessageSquare,
  Users,
  User,
  LogOut,
  ChevronDown,
  ArrowRightLeft,
  Sparkles,
  Search
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const {
    currentUser,
    logout,
    activeTab,
    setActiveTab,
    conversations,
    quickLoginAs,
  } = useApp();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  // Total unread/conversation count
  const unreadCount = conversations.length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => setActiveTab('jobs')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 bg-clip-text text-transparent">
                UniConnect
              </span>
              <span className="text-xs text-slate-500 block -mt-1 font-medium">
                Student & Alumni Bridge
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          {currentUser && (
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <button
                onClick={() => setActiveTab('jobs')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'jobs'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Job & Referrals</span>
              </button>

              <button
                onClick={() => setActiveTab('directory')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'directory'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Network Directory</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  activeTab === 'messages'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Messages</span>
                {unreadCount > 0 && (
                  <span className="bg-indigo-600 text-white text-[11px] font-semibold px-1.5 py-0.2 rounded-full leading-tight">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </button>
            </nav>
          )}

          {/* Right Action / Auth & Profile */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                {/* 1-Click Role Switcher Demo Tool */}
                <div className="relative">
                  <button
                    onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition"
                    title="Quick demo switcher between Student & Alumni accounts"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="hidden sm:inline">Switch Role</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">
                      {currentUser.role}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {roleSwitcherOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase">
                        Instant Demo Switch
                      </div>
                      <button
                        onClick={() => {
                          quickLoginAs('student', 'student-alex');
                          setRoleSwitcherOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-indigo-50 transition flex items-center gap-2 ${
                          currentUser.role === 'student' && currentUser.name === 'Alex Morgan'
                            ? 'font-bold text-indigo-700 bg-indigo-50/60'
                            : 'text-slate-700'
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                          AM
                        </div>
                        <div>
                          <p className="font-semibold">Alex Morgan (Student)</p>
                          <p className="text-[11px] text-slate-500">Stanford CS '26 · Candidate</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          quickLoginAs('alumni', 'alumni-sarah');
                          setRoleSwitcherOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-indigo-50 transition flex items-center gap-2 ${
                          currentUser.role === 'alumni' && currentUser.name === 'Sarah Chen'
                            ? 'font-bold text-indigo-700 bg-indigo-50/60'
                            : 'text-slate-700'
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                          SC
                        </div>
                        <div>
                          <p className="font-semibold">Sarah Chen (Alumni)</p>
                          <p className="text-[11px] text-slate-500">Senior SWE @ Google · Referrer</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          quickLoginAs('alumni', 'alumni-marcus');
                          setRoleSwitcherOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-indigo-50 transition flex items-center gap-2 ${
                          currentUser.role === 'alumni' && currentUser.name === 'Marcus Vance'
                            ? 'font-bold text-indigo-700 bg-indigo-50/60'
                            : 'text-slate-700'
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-[10px] font-bold">
                          MV
                        </div>
                        <div>
                          <p className="font-semibold">Marcus Vance (Alumni)</p>
                          <p className="text-[11px] text-slate-500">Principal PM @ Microsoft</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* Profile Pill & Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                    />
                    <div className="hidden lg:block text-left text-xs">
                      <span className="font-bold text-slate-800 block truncate max-w-[130px]">
                        {currentUser.name}
                      </span>
                      <span className="text-[10px] text-slate-500 capitalize">
                        {currentUser.role === 'student' ? 'Student' : 'Alumni'}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('profile');
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                      >
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        View Full Profile
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('messages');
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                        Messages & Inquiries
                      </button>
                      <div className="border-t border-slate-100 my-1"></div>
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-2"
              >
                <span>Sign In / Sign Up</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar */}
        {currentUser && (
          <div className="md:hidden flex justify-around py-2 border-t border-slate-200">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex flex-col items-center py-1 px-3 text-xs font-medium ${
                activeTab === 'jobs' ? 'text-indigo-600' : 'text-slate-600'
              }`}
            >
              <Briefcase className="w-4 h-4 mb-0.5" />
              <span>Jobs</span>
            </button>
            <button
              onClick={() => setActiveTab('directory')}
              className={`flex flex-col items-center py-1 px-3 text-xs font-medium ${
                activeTab === 'directory' ? 'text-indigo-600' : 'text-slate-600'
              }`}
            >
              <Users className="w-4 h-4 mb-0.5" />
              <span>Directory</span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex flex-col items-center py-1 px-3 text-xs font-medium relative ${
                activeTab === 'messages' ? 'text-indigo-600' : 'text-slate-600'
              }`}
            >
              <MessageSquare className="w-4 h-4 mb-0.5" />
              <span>Chat</span>
              {unreadCount > 0 && (
                <span className="absolute top-0 right-3 bg-indigo-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center py-1 px-3 text-xs font-medium ${
                activeTab === 'profile' ? 'text-indigo-600' : 'text-slate-600'
              }`}
            >
              <User className="w-4 h-4 mb-0.5" />
              <span>Profile</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
