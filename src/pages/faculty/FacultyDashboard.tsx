import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  Users, CheckSquare, Clock, BookOpen, PlusCircle, 
  Award, FileText, CheckCircle2, AlertCircle, Sparkles, Send 
} from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface FacultyDashboardProps {
  onBack?: () => void;
}

export const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { showToast } = useNotification();

  // Faculty Class Attendance state for quick roll call
  const [studentsList, setStudentsList] = useState([
    { roll: '22042BCA', name: 'K. Harinath', status: 'present' },
    { roll: '22043BCA', name: 'B. Sai Teja', status: 'present' },
    { roll: '22044BCA', name: 'C. Meena Kumari', status: 'present' },
    { roll: '22045BCA', name: 'D. Vinay Kumar', status: 'absent' },
    { roll: '22046BCA', name: 'E. Kavya Sri', status: 'present' },
    { roll: '22047BCA', name: 'F. Rajesh Reddy', status: 'present' }
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'assignment' | 'material'>('overview');
  
  // New assignment form state
  const [newAsgTitle, setNewAsgTitle] = useState('');
  const [newAsgSub, setNewAsgSub] = useState('Deep Learning & Neural Networks');
  const [newAsgDue, setNewAsgDue] = useState('2026-10-25');
  const [newAsgMarks, setNewAsgMarks] = useState(25);

  const toggleStudentStatus = (roll: string) => {
    setStudentsList(prev => prev.map(s => {
      if (s.roll === roll) {
        return { ...s, status: s.status === 'present' ? 'absent' : 'present' };
      }
      return s;
    }));
  };

  const handleSaveAttendance = () => {
    const presentCount = studentsList.filter(s => s.status === 'present').length;
    showToast(`Attendance saved for BCA-AI Sem 6: ${presentCount}/${studentsList.length} students present.`, 'success', 'Roll Call Recorded');
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsgTitle.trim()) return;
    showToast(`New Assignment "${newAsgTitle}" assigned to BCA-AI Semester 6!`, 'success', 'Assignment Created');
    setNewAsgTitle('');
    setActiveTab('overview');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Faculty Portal
        </span>
      </div>

      {/* Faculty Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl font-black shadow-inner">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                Faculty Portal
              </span>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                HOD Computer Science
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit mt-0.5">
              Prof. Mahesh Sir (HOD)
            </h1>
            <div className="text-xs text-emerald-200 mt-1 flex flex-wrap gap-x-4">
              <span>Department of Computer Science & AI</span>
              <span>• Classes: BCA-AI (Sem 6), BSc (CS)</span>
              <span>• Room: CS HOD Cabin</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('attendance')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Mark Today's Attendance</span>
          </button>
          <button
            onClick={() => setActiveTab('assignment')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Assignment</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl max-w-md">
        {[
          { label: 'Overview', id: 'overview' },
          { label: 'Mark Attendance', id: 'attendance' },
          { label: 'Post Assignment', id: 'assignment' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-400 font-bold uppercase">Active Cohorts</div>
              <div className="text-3xl font-black text-slate-900 dark:text-white font-outfit mt-1">2 Classes</div>
              <div className="text-xs text-slate-500 mt-1">BCA-AI Sem 6 & BSc CS</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-400 font-bold uppercase">Enrolled Students</div>
              <div className="text-3xl font-black text-slate-900 dark:text-white font-outfit mt-1">118</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1">Average Attendance: 86.4%</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-400 font-bold uppercase">Pending Evaluations</div>
              <div className="text-3xl font-black text-amber-600 font-outfit mt-1">14 Papers</div>
              <div className="text-xs text-slate-500 mt-1">Big Data Spark Lab Submissions</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-400 font-bold uppercase">Class Materials</div>
              <div className="text-3xl font-black text-blue-600 font-outfit mt-1">24 Files</div>
              <div className="text-xs text-slate-500 mt-1">Notes, manuals & question banks</div>
            </div>
          </div>

          {/* Today's Teaching Schedule */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
              Assigned Classes for Today
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-blue-600">09:30 AM - 10:30 AM</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-1">Deep Learning (BCA601)</div>
                  <div className="text-xs text-slate-500">Room 204 • BCA-AI Sem 6 (60 Students)</div>
                </div>
                <button
                  onClick={() => setActiveTab('attendance')}
                  className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-emerald-500"
                >
                  Mark Attendance
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-indigo-600">01:30 PM - 04:30 PM</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-1">AI Capstone Lab (BCA605)</div>
                  <div className="text-xs text-slate-500">AI Lab 2 • Project Mentorship Group</div>
                </div>
                <button
                  onClick={() => setActiveTab('assignment')}
                  className="px-3.5 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-500"
                >
                  Manage Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Roll Call Tab */}
      {activeTab === 'attendance' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase">Live Digital Roll Call</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                BCA - Artificial Intelligence (Semester 6) — Deep Learning
              </h2>
              <p className="text-xs text-slate-500">
                Tap on student name or status pill to toggle Present / Absent.
              </p>
            </div>

            <button
              onClick={handleSaveAttendance}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Lock Attendance</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {studentsList.map((stu) => (
              <div key={stu.roll} className="py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                    {stu.roll}
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {stu.name}
                  </span>
                </div>

                <button
                  onClick={() => toggleStudentStatus(stu.roll)}
                  className={`px-4 py-1.5 rounded-xl font-bold transition-colors ${
                    stu.status === 'present'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                >
                  {stu.status === 'present' ? '✓ Present' : '✗ Absent'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Post Assignment Tab */}
      {activeTab === 'assignment' && (
        <form onSubmit={handleCreateAssignment} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-w-2xl mx-auto animate-fade-in">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase">Faculty Task</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Create New Course Assignment
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Assignment Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Implementation of YOLO Object Detection in PyTorch"
              value={newAsgTitle}
              onChange={e => setNewAsgTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Subject Course
              </label>
              <select
                value={newAsgSub}
                onChange={e => setNewAsgSub(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="Deep Learning & Neural Networks">Deep Learning & Neural Networks</option>
                <option value="Big Data Analytics">Big Data Analytics</option>
                <option value="AI Capstone Project Lab">AI Capstone Project Lab</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Submission Due Date
              </label>
              <input
                type="date"
                required
                value={newAsgDue}
                onChange={e => setNewAsgDue(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>Publish Assignment to Students</span>
          </button>
        </form>
      )}

    </div>
  );
};
