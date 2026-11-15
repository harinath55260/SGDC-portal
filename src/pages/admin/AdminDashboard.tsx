import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { AdmissionApplication } from '../../types';
import { 
  COLLEGE_INFO, DEPARTMENTS, FACULTY_MEMBERS, NOTICES, 
  EVENTS, PLACEMENTS, INITIAL_ADMISSIONS 
} from '../../services/collegeData';
import { 
  ShieldCheck, Users, GraduationCap, Building2, Bell, 
  Calendar, Briefcase, Plus, Trash2, CheckCircle2, 
  XCircle, Search, Edit3, Download, Sparkles 
} from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface AdminDashboardProps {
  onBack?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { showToast } = useNotification();

  const [activeTab, setActiveTab] = useState<'overview' | 'admissions' | 'notices' | 'students' | 'faculty'>('overview');
  
  // Admissions state (loads from localStorage or initial)
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(() => {
    const saved = localStorage.getItem('sgdc_admissions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_ADMISSIONS;
  });

  // Notices state
  const [notices, setNotices] = useState(NOTICES);

  // New notice form
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeDept, setNewNoticeDept] = useState('Controller of Examinations');
  const [newNoticePriority, setNewNoticePriority] = useState<'urgent' | 'important' | 'normal'>('important');
  const [newNoticeDesc, setNewNoticeDesc] = useState('');

  const handleApproveAdmission = (id: string) => {
    const updated: AdmissionApplication[] = admissions.map(a => 
      a.id === id ? { ...a, status: 'approved' as const } : a
    );
    setAdmissions(updated);
    localStorage.setItem('sgdc_admissions', JSON.stringify(updated));
    showToast(`Application ${id} approved! Provisional admission letter generated.`, 'success', 'Admission Approved');
  };

  const handleRejectAdmission = (id: string) => {
    const updated: AdmissionApplication[] = admissions.map(a => 
      a.id === id ? { ...a, status: 'rejected' as const } : a
    );
    setAdmissions(updated);
    localStorage.setItem('sgdc_admissions', JSON.stringify(updated));
    showToast(`Application ${id} marked as rejected.`, 'info', 'Status Updated');
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim()) return;

    const newN = {
      id: `not-${Date.now()}`,
      title: newNoticeTitle,
      description: newNoticeDesc,
      department: newNoticeDept,
      priority: newNoticePriority,
      date: new Date().toISOString().split('T')[0],
      author: 'Principal / Admin Desk'
    };

    setNotices([newN, ...notices]);
    setNewNoticeTitle('');
    setNewNoticeDesc('');
    showToast(`Notice published across digital portals!`, 'success', 'Notice Published');
  };

  const handleDeleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    showToast('Notice circular removed.', 'info', 'Notice Deleted');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Admin Control Center
        </span>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl font-black shadow-inner">
            <ShieldCheck className="w-8 h-8 text-rose-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
                Autonomous Administration
              </span>
              <span className="text-[10px] bg-rose-500/30 text-rose-200 border border-rose-400/40 px-2 py-0.5 rounded-full font-bold">
                Super Admin Access
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit mt-0.5">
              Digital Campus Control Center
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Shri Gnanambica Degree College (Autonomous) • Madanapalle
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('admissions')}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-colors"
          >
            Review Admissions ({admissions.filter(a => a.status === 'pending').length} New)
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-x-auto">
        {[
          { label: 'System Overview', id: 'overview' },
          { label: `Admissions Queue (${admissions.length})`, id: 'admissions' },
          { label: `Manage Notices (${notices.length})`, id: 'notices' },
          { label: 'Faculty Dossiers', id: 'faculty' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs font-bold text-slate-400 uppercase">Total Students</div>
              <div className="text-3xl font-black text-slate-900 dark:text-white font-outfit mt-1">2,840</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1">98.2% Enrolled & Verified</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs font-bold text-slate-400 uppercase">Faculty Strength</div>
              <div className="text-3xl font-black text-slate-900 dark:text-white font-outfit mt-1">114</div>
              <div className="text-xs text-slate-500 mt-1">Across 6 academic divisions</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs font-bold text-slate-400 uppercase">Campus Placements</div>
              <div className="text-3xl font-black text-emerald-600 font-outfit mt-1">380+</div>
              <div className="text-xs text-slate-500 mt-1">Highest: ₹7.5 LPA</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs font-bold text-slate-400 uppercase">Admissions Received</div>
              <div className="text-3xl font-black text-blue-600 font-outfit mt-1">450+</div>
              <div className="text-xs text-slate-500 mt-1">Academic Year 2026-27</div>
            </div>
          </div>
        </div>
      )}

      {/* Admissions Management Queue */}
      {activeTab === 'admissions' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Online Student Admissions Review Queue
              </h2>
              <p className="text-xs text-slate-500">
                Review candidate registrations submitted via the Admissions 2026 portal.
              </p>
            </div>
            <span className="text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-lg">
              {admissions.length} Applications Total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase text-[10px] font-bold">
                  <th className="p-3">App ID</th>
                  <th className="p-3">Applicant Name</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {admissions.map((adm) => (
                  <tr key={adm.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{adm.id}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      {adm.firstName} {adm.lastName}
                    </td>
                    <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">{adm.course}</td>
                    <td className="p-3 text-slate-500">{adm.mobile} • {adm.email}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        adm.status === 'approved' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                          : adm.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {adm.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {adm.status === 'pending' && (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleApproveAdmission(adm.id)}
                            className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg"
                            title="Approve Admission"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleRejectAdmission(adm.id)}
                            className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg"
                            title="Reject"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                      {adm.status !== 'pending' && (
                        <span className="text-slate-400 font-medium">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notices Management */}
      {activeTab === 'notices' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          {/* Post New Notice Form */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Publish New Autonomous Notice
            </h3>

            <form onSubmit={handleCreateNotice} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Supplementary Exam Hall Tickets"
                  value={newNoticeTitle}
                  onChange={e => setNewNoticeTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Issuing Department</label>
                <select
                  value={newNoticeDept}
                  onChange={e => setNewNoticeDept(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="Controller of Examinations">Controller of Examinations</option>
                  <option value="Principal Office">Principal Office</option>
                  <option value="Placement & Career Cell">Placement & Career Cell</option>
                  <option value="Accounts Office">Accounts Office</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Notice Priority</label>
                <select
                  value={newNoticePriority}
                  onChange={e => setNewNoticePriority(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="urgent">🔴 Urgent</option>
                  <option value="important">🟡 Important</option>
                  <option value="normal">🔵 Normal</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Description / Content *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Type official circular description..."
                  value={newNoticeDesc}
                  onChange={e => setNewNoticeDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md"
              >
                Publish Notice
              </button>
            </form>
          </div>

          {/* Current Notices List */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Active Official Notices ({notices.length})
            </h3>
            {notices.map((n) => (
              <div
                key={n.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4"
              >
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold uppercase text-[10px] text-rose-600">[{n.priority}]</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{n.title}</strong>
                  </div>
                  <p className="text-slate-500 line-clamp-2">{n.description}</p>
                  <div className="text-[10px] text-slate-400">{n.date} • {n.department}</div>
                </div>

                <button
                  onClick={() => handleDeleteNotice(n.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors shrink-0"
                  title="Delete Notice"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Faculty Dossiers */}
      {activeTab === 'faculty' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Faculty Academic Dossiers & Profiles
              </h2>
              <p className="text-xs text-slate-500">
                Maintained records for autonomous UGC/NAAC academic audits.
              </p>
            </div>
            <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
              {FACULTY_MEMBERS.length} Registered Professors
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FACULTY_MEMBERS.map((fac) => (
              <div key={fac.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <div className="font-bold text-sm text-slate-900 dark:text-white">{fac.name}</div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{fac.designation}</div>
                <div className="text-xs text-slate-500">{fac.departmentName} • {fac.qualification}</div>
                {fac.pdfProfile && (
                  <a
                    href={fac.pdfProfile}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View Official Dossier PDF ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
