import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  DEMO_ATTENDANCE_SUMMARY, 
  DEMO_RESULTS, 
  DEMO_FEES, 
  ASSIGNMENTS, 
  WEEKLY_TIMETABLE, 
  NOTICES 
} from '../../services/collegeData';
import { 
  CheckSquare, Award, Clock, DollarSign, BookOpen, 
  Calendar, Bot, ArrowRight, AlertTriangle, FileText, 
  Sparkles, CheckCircle2, UserCheck, ShieldAlert 
} from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
  onOpenAI: () => void;
  onBack?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate, onOpenAI, onBack }) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const isLowAttendance = DEMO_ATTENDANCE_SUMMARY.overallPercentage < 75;
  const pendingAssignments = ASSIGNMENTS.filter(a => a.submissionStatus === 'pending');
  const pendingFee = DEMO_FEES.find(f => f.status === 'pending');
  const todayClasses = WEEKLY_TIMETABLE.filter(t => t.day === 'Monday').slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Student Dashboard
        </span>
      </div>

      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl font-black shadow-inner">
            {user?.name?.charAt(0) || 'H'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                Student Portal
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                Active Student
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit mt-0.5">
              {user?.name || 'K. Harinath'}
            </h1>
            <div className="text-xs text-blue-200 mt-1 flex flex-wrap gap-x-4 gap-y-1">
              <span><strong>ID:</strong> {user?.studentId || 'SGDC22BCA042'}</span>
              <span><strong>Roll:</strong> {user?.rollNo || '22042BCA'}</span>
              <span><strong>Course:</strong> {user?.course || 'BCA - Artificial Intelligence'}</span>
              <span><strong>Year:</strong> {user?.year || 3} (Sem {user?.semester || 6})</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => onNavigate('student-profile')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
          >
            View My Profile
          </button>
          <button
            onClick={onOpenAI}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Ask College AI</span>
          </button>
        </div>
      </div>

      {/* Low Attendance Warning (if applicable) */}
      {isLowAttendance && (
        <div className="bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 rounded-2xl p-4 flex items-center gap-3 text-rose-800 dark:text-rose-200 text-xs font-medium">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>
            <strong>Attendance Warning:</strong> Your attendance is currently {DEMO_ATTENDANCE_SUMMARY.overallPercentage}%, which is below the mandatory 75% autonomous criteria. Please contact HOD Mahesh Sir immediately.
          </span>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Attendance Card */}
        <div 
          onClick={() => onNavigate('student-attendance')}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-blue-400 cursor-pointer transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attendance</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white font-outfit">
              {DEMO_ATTENDANCE_SUMMARY.overallPercentage}%
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              ✓ Good (Requirement: 75%)
            </div>
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
            <span>View Subject Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* CGPA Card */}
        <div 
          onClick={() => onNavigate('student-results')}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-indigo-400 cursor-pointer transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current CGPA</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white font-outfit">
              8.86
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Sem 5 SGPA: <strong>9.15</strong> (Passed with Distinction)
            </div>
          </div>
          <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
            <span>View Semester Marksheets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Assignments Card */}
        <div 
          onClick={() => onNavigate('student-assignments')}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assignments</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white font-outfit">
              {pendingAssignments.length} Pending
            </div>
            <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">
              Solidity Smart Contract due in 4 days
            </div>
          </div>
          <div className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
            <span>Submit Assignments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Fees Due Card */}
        <div 
          onClick={() => onNavigate('student-fees')}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-rose-400 cursor-pointer transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fee Balance</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-3xl font-black text-rose-600 dark:text-rose-400 font-outfit">
              ₹{pendingFee ? pendingFee.pendingAmount.toLocaleString() : '0'}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Due Date: {pendingFee?.dueDate || 'Cleared'}
            </div>
          </div>
          <div className="text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
            <span>Pay Online / View Receipts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Quick Action Navigation Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white font-outfit">
          Student Quick Services
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Attendance', page: 'student-attendance', icon: CheckSquare, color: 'text-blue-500' },
            { label: 'Exam Results', page: 'student-results', icon: Award, color: 'text-indigo-500' },
            { label: 'Weekly Timetable', page: 'student-timetable', icon: Calendar, color: 'text-emerald-500' },
            { label: 'Fee Payments', page: 'student-fees', icon: DollarSign, color: 'text-rose-500' },
            { label: 'Assignments', page: 'student-assignments', icon: Clock, color: 'text-amber-500' },
            { label: 'Study Materials', page: 'student-materials', icon: BookOpen, color: 'text-purple-500' }
          ].map((act, i) => {
            const Icon = act.icon;
            return (
              <button
                key={i}
                onClick={() => onNavigate(act.page)}
                className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-blue-400 flex flex-col items-center justify-center gap-2 text-center group transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className={`w-5 h-5 ${act.color}`} />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {act.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: Today's Timetable & Urgent Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Today's Schedule */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              Today's Class Schedule (Monday)
            </h3>
            <button
              onClick={() => onNavigate('student-timetable')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Full Schedule
            </button>
          </div>

          <div className="space-y-3">
            {todayClasses.map((cls) => (
              <div
                key={cls.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {cls.subject}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Faculty: {cls.faculty} • {cls.room}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                  {cls.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Notices Ticker */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Notices & Circulars
            </h3>
            <button
              onClick={() => onNavigate('notices')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {NOTICES.slice(0, 3).map((n) => (
              <div
                key={n.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-rose-600 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-900">
                    {n.priority}
                  </span>
                  <span className="text-[10px] text-slate-400">{n.date}</span>
                </div>
                <div className="font-semibold text-xs text-slate-900 dark:text-white line-clamp-1">
                  {n.title}
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-1">
                  {n.description}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
