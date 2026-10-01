import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StudentProfile, AlumniProfile } from '../types';
import {
  Users,
  Search,
  GraduationCap,
  Briefcase,
  MapPin,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Award,
  Code,
  X,
  FileText,
  Linkedin,
  Github
} from 'lucide-react';

export const DirectoryView: React.FC = () => {
  const { students, alumni, currentUser, startOrOpenConversation, setActiveTab } = useApp();

  const [activeTab, setDirectoryTab] = useState<'alumni' | 'students'>('alumni');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedUniv, setSelectedUniv] = useState('');

  // Selected profile for full inspection modal
  const [inspectedProfile, setInspectedProfile] = useState<StudentProfile | AlumniProfile | null>(null);

  // Filter alumni
  const filteredAlumni = alumni.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.currentCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.currentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.mentorshipTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCompany = selectedCompany ? a.currentCompany === selectedCompany : true;
    const matchesUniv = selectedUniv ? a.almaMater === selectedUniv : true;

    return matchesSearch && matchesCompany && matchesUniv;
  });

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.skills.some((sk) => sk.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesUniv = selectedUniv ? s.university === selectedUniv : true;

    return matchesSearch && matchesUniv;
  });

  const handleMessageUser = (target: StudentProfile | AlumniProfile) => {
    if (!currentUser) {
      alert('Please sign in to message network members.');
      return;
    }
    startOrOpenConversation(target);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Directory Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">University & Alumni Network</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Connect directly with verified graduates and ambitious student peers.
          </p>
        </div>

        {/* Directory Tab Switcher */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold self-start md:self-auto">
          <button
            onClick={() => setDirectoryTab('alumni')}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'alumni'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Alumni Directory ({alumni.length})</span>
          </button>

          <button
            onClick={() => setDirectoryTab('students')}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'students'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student Candidates ({students.length})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              activeTab === 'alumni'
                ? 'Search alumni by name, company, title, or mentorship topics...'
                : 'Search students by name, major, skills (e.g. React, PyTorch)...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-2">
          {activeTab === 'alumni' && (
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Companies</option>
              <option value="Google">Google</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Meta">Meta</option>
              <option value="Stripe">Stripe</option>
            </select>
          )}

          <select
            value={selectedUniv}
            onChange={(e) => setSelectedUniv(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Universities</option>
            <option value="Stanford University">Stanford</option>
            <option value="MIT">MIT</option>
            <option value="Harvard University">Harvard</option>
          </select>
        </div>
      </div>

      {/* ALUMNI DIRECTORY GRID */}
      {activeTab === 'alumni' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAlumni.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3.5">
                  <img
                    src={a.avatar}
                    alt={a.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 leading-snug">{a.name}</h3>
                    <p className="text-xs font-semibold text-indigo-600 mt-0.5">
                      {a.currentTitle}
                    </p>
                    <span className="inline-block text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md mt-1">
                      {a.currentCompany}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-500 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span>{a.almaMater} ('{a.graduationYear.slice(-2)})</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{a.location}</span>
                  </p>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {a.bio}
                </p>

                {/* Mentorship topics */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {a.mentorshipTopics.slice(0, 3).map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-semibold rounded-md"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setInspectedProfile(a)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleMessageUser(a)}
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* STUDENT DIRECTORY GRID */}
      {activeTab === 'students' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStudents.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3.5">
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 leading-snug">{s.name}</h3>
                    <p className="text-xs font-semibold text-indigo-600 mt-0.5">
                      {s.major}
                    </p>
                    <span className="inline-block text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md mt-1">
                      {s.university}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-500 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span>Class of {s.graduationYear} · {s.degreeLevel}</span>
                  </p>
                  {s.gpa && (
                    <p className="flex items-center gap-1.5 text-slate-600">
                      <span>GPA: <strong>{s.gpa}</strong></span>
                    </p>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {s.headline || s.bio}
                </p>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {s.skills.slice(0, 3).map((sk) => (
                    <span
                      key={sk.id}
                      className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md"
                    >
                      {sk.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setInspectedProfile(s)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleMessageUser(s)}
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* INSPECT PROFILE MODAL */}
      {inspectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <button
              onClick={() => setInspectedProfile(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-4">
              <img
                src={inspectedProfile.avatar}
                alt={inspectedProfile.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/20"
              />
              <div>
                <h3 className="text-xl font-bold text-slate-900">{inspectedProfile.name}</h3>
                <p className="text-xs font-semibold text-indigo-600">
                  {inspectedProfile.role === 'alumni'
                    ? `${inspectedProfile.currentTitle} at ${inspectedProfile.currentCompany}`
                    : `${inspectedProfile.major} · ${inspectedProfile.degreeLevel}`}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {inspectedProfile.role === 'alumni'
                    ? `${inspectedProfile.almaMater} (${inspectedProfile.graduationYear})`
                    : `${inspectedProfile.university} (Class of ${inspectedProfile.graduationYear})`}
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="mt-6 space-y-5 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Bio / Background
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {inspectedProfile.bio}
                </p>
              </div>

              {inspectedProfile.role === 'student' && (
                <>
                  {/* Skills */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {inspectedProfile.skills.map((sk) => (
                        <span
                          key={sk.id}
                          className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg"
                        >
                          {sk.name} · <span className="text-indigo-600 font-semibold">{sk.level}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Achievements & Projects
                    </h4>
                    <div className="space-y-2">
                      {inspectedProfile.achievements.map((ach) => (
                        <div
                          key={ach.id}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{ach.title}</span>
                            <span className="text-[10px] text-slate-400">{ach.date}</span>
                          </div>
                          <p className="text-slate-600">{ach.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {inspectedProfile.role === 'alumni' && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Mentorship & Referral Specialization
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {inspectedProfile.mentorshipTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-lg"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {inspectedProfile.location}
              </span>
              <button
                onClick={() => {
                  setInspectedProfile(null);
                  handleMessageUser(inspectedProfile);
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Start Direct Conversation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
