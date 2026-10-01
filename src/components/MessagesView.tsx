import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Send,
  Search,
  User,
  GraduationCap,
  Briefcase,
  Sparkles,
  Phone,
  Video,
  Info,
  Clock,
  CheckCheck
} from 'lucide-react';

export const MessagesView: React.FC = () => {
  const {
    currentUser,
    conversations,
    messages,
    selectedConversationId,
    setSelectedConversationId,
    sendMessage,
    students,
    alumni,
    startOrOpenConversation,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [searchConv, setSearchConv] = useState('');
  const [isStartingNew, setIsStartingNew] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const targetName = currentUser?.role === 'student' ? c.alumniName : c.studentName;
    return targetName.toLowerCase().includes(searchConv.toLowerCase());
  });

  const activeConversation = conversations.find((c) => c.id === selectedConversationId) || conversations[0];
  const activeMessages = activeConversation ? messages[activeConversation.id] || [] : [];

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages.length, selectedConversationId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;

    sendMessage(activeConversation.id, inputText);
    const sentText = inputText;
    setInputText('');

    // If currentUser is student, simulate a helpful alumni mentor auto-reply after 1.5s
    if (currentUser?.role === 'student') {
      setTimeout(() => {
        let reply = `Thanks for reaching out! I received your message: "${sentText.slice(0, 30)}...". I am reviewing your profile and will get back to you with guidance shortly.`;
        if (sentText.toLowerCase().includes('resume')) {
          reply = `I would be happy to review your resume! Make sure your GitHub project links and quantifiable metric impacts are prominent.`;
        } else if (sentText.toLowerCase().includes('referral')) {
          reply = `Received your referral request! Checking with our hiring manager for open requisitions on our team.`;
        }
        sendMessage(activeConversation.id, reply);
      }, 1500);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    if (!activeConversation) return;
    sendMessage(activeConversation.id, prompt);
  };

  // Other participants in network to start new chats with
  const contactCandidates =
    currentUser?.role === 'student'
      ? alumni.filter((a) => !conversations.some((c) => c.alumniId === a.id && c.studentId === currentUser.id))
      : students.filter((s) => !conversations.some((c) => c.studentId === s.id && c.alumniId === currentUser?.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row h-[720px]">
        {/* Left Sidebar: Conversations List */}
        <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50/50">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-extrabold text-slate-900 text-lg">Messages</h2>
                <p className="text-xs text-slate-500">
                  Direct Student-Alumni Career Chat
                </p>
              </div>
              <button
                onClick={() => setIsStartingNew(!isStartingNew)}
                className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg transition"
              >
                {isStartingNew ? 'Cancel' : '+ New Chat'}
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchConv}
                onChange={(e) => setSearchConv(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
          </div>

          {/* New Chat selection list */}
          {isStartingNew ? (
            <div className="flex-grow overflow-y-auto p-3 space-y-2 bg-white">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
                {currentUser?.role === 'student' ? 'Choose an Alumni Mentor' : 'Choose a Student'}
              </p>
              {contactCandidates.length === 0 ? (
                <p className="text-xs text-slate-400 p-2">You already have active chats with all users!</p>
              ) : (
                contactCandidates.map((c: any) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      startOrOpenConversation(c);
                      setIsStartingNew(false);
                    }}
                    className="p-2.5 rounded-xl border border-slate-200/80 hover:bg-indigo-50/60 hover:border-indigo-200 cursor-pointer transition flex items-center gap-3"
                  >
                    <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-grow min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{c.name}</p>
                      <p className="text-[11px] text-indigo-600 truncate">
                        {c.role === 'alumni' ? `${c.currentTitle} @ ${c.currentCompany}` : `${c.major}, ${c.university}`}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Conversation threads */
            <div className="flex-grow overflow-y-auto divide-y divide-slate-100">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-12 px-4 text-slate-400 text-xs">
                  <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p>No conversations found.</p>
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const isSelected = activeConversation?.id === conv.id;
                  const isStudentView = currentUser?.role === 'student';
                  const otherName = isStudentView ? conv.alumniName : conv.studentName;
                  const otherAvatar = isStudentView ? conv.alumniAvatar : conv.studentAvatar;
                  const otherRole = isStudentView
                    ? `${conv.alumniTitle} @ ${conv.alumniCompany}`
                    : conv.studentMajor || 'Student Candidate';

                  return (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversationId(conv.id)}
                      className={`p-3.5 flex items-center gap-3 cursor-pointer transition ${
                        isSelected
                          ? 'bg-white border-l-4 border-indigo-600 shadow-xs'
                          : 'hover:bg-slate-100/80'
                      }`}
                    >
                      <img
                        src={otherAvatar}
                        alt={otherName}
                        className="w-11 h-11 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                      />
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{otherName}</h4>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {new Date(conv.lastMessageTimestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <p className="text-[11px] text-indigo-600 font-medium truncate">{otherRole}</p>
                        <p className="text-xs text-slate-500 truncate mt-0.5 font-normal">
                          {conv.lastMessage}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Right Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {activeConversation ? (
            <>
              {/* Active Conversation Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/40">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      currentUser?.role === 'student'
                        ? activeConversation.alumniAvatar
                        : activeConversation.studentAvatar
                    }
                    alt="Participant"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">
                        {currentUser?.role === 'student'
                          ? activeConversation.alumniName
                          : activeConversation.studentName}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                        {currentUser?.role === 'student' ? 'Alumni Referrer' : 'Student Candidate'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {currentUser?.role === 'student'
                        ? `${activeConversation.alumniTitle} at ${activeConversation.alumniCompany}`
                        : activeConversation.studentMajor}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="hidden sm:inline font-medium text-emerald-700">Online</span>
                </div>
              </div>

              {/* Message Thread */}
              <div className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/20">
                {activeMessages.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-slate-700">Start the conversation!</p>
                    <p className="mt-1">Say hello or choose one of the recommended starter prompts below.</p>
                  </div>
                ) : (
                  activeMessages.map((msg) => {
                    const isMe = msg.senderId === currentUser?.id;

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                          <span className="font-semibold text-slate-600">{msg.senderName}</span>
                          <span>·</span>
                          <span>
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        <div
                          className={`max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                            isMe
                              ? 'bg-indigo-600 text-white rounded-br-xs'
                              : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px]">
                <span className="font-bold text-slate-400 whitespace-nowrap">Suggested:</span>
                {currentUser?.role === 'student' ? (
                  <>
                    <button
                      onClick={() => handleQuickPrompt("Could you provide a few tips on your company's technical interview loop?")}
                      className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 rounded-lg whitespace-nowrap transition"
                    >
                      Interview loop tips?
                    </button>
                    <button
                      onClick={() => handleQuickPrompt("I submitted my referral application, would you have 10 mins to review my resume?")}
                      className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 rounded-lg whitespace-nowrap transition"
                    >
                      Resume review request
                    </button>
                    <button
                      onClick={() => handleQuickPrompt("What projects stand out most for new grads applying to your team?")}
                      className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 rounded-lg whitespace-nowrap transition"
                    >
                      Key project advice
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleQuickPrompt("Glad to connect! Send over your resume link and GitHub projects.")}
                      className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 rounded-lg whitespace-nowrap transition"
                    >
                      Send resume & GitHub
                    </button>
                    <button
                      onClick={() => handleQuickPrompt("I just submitted your referral to the hiring portal! Watch for the email.")}
                      className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 rounded-lg whitespace-nowrap transition"
                    >
                      Referral submitted confirmation
                    </button>
                    <button
                      onClick={() => handleQuickPrompt("Let's set up a 15-minute mock interview next Tuesday!")}
                      className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 rounded-lg whitespace-nowrap transition"
                    >
                      Offer mock interview
                    </button>
                  </>
                )}
              </div>

              {/* Message Input Box */}
              <div className="p-3 sm:p-4 border-t border-slate-200 bg-white">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type your message to alumni or student..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-grow px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <MessageSquare className="w-12 h-12 text-slate-300 mb-3" />
              <h3 className="text-base font-bold text-slate-700">No Conversation Selected</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Select a conversation from the left sidebar or start a new message to chat with alumni mentors and student candidates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
