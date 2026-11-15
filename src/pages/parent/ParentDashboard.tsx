import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  DEMO_ATTENDANCE_SUMMARY, 
  DEMO_RESULTS, 
  DEMO_FEES, 
  ASSIGNMENTS, 
  NOTICES 
} from '../../services/collegeData';
import { 
  UserCheck, Award, CheckSquare, DollarSign, Clock, 
  AlertTriangle, Bell, Calendar, Phone, Mail, ShieldCheck 
} from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface ParentDashboardProps {
  onBack?: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ onBack }) => {
  const { user } = useAuth();

  const linkedStudent = {
    name: 'K. Harinath',
    roll: '22042BCA',
    studentId: 'SGDC22BCA042',
    course: 'BCA - Artificial Intelligence',
    year: '3rd Year (Semester VI)',
    department: 'Computer Science',
    mentor: 'Prof. Mahesh Sir (HOD)'
  };

  const pendingFee = DEMO_FEES.find(f => f.status === 'pending');
  const recentResult = DEMO_RESULTS[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Parent Monitoring Portal
        </span>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl font-black shadow-inner">
            P
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                Parent Portal
              </span>
              <span className="text-[10px] bg-purple-500/30 text-purple-200 border border-purple-400/40 px-2 py-0.5 rounded-full font-bold">
                Linked Student Verified
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit mt-0.5">
              Welcome, {user?.name || 'K. Ramamurthy'}
            </h1>
            <p className="text-xs text-purple-200 mt-1">
              Monitoring Ward: <strong>{linkedStudent.name}</strong> ({linkedStudent.roll})
            </p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs space-y-1">
          <div className="text-purple-200 font-bold uppercase text-[10px]">Faculty Mentor Contact:</div>
          <div className="font-semibold">{linkedStudent.mentor}</div>
          <div className="text-[11px] text-purple-200">Cabin: CS HOD Block</div>
        </div>
      </div>

      {/* Ward Status Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Attendance */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Ward Attendance</span>
            <CheckSquare className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-outfit my-2">
            {DEMO_ATTENDANCE_SUMMARY.overallPercentage}%
          </div>
          <div className="text-xs text-emerald-600 font-semibold">
            ✓ Regular (Above 75% Requirement)
          </div>
        </div>

        {/* CGPA */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Cumulative CGPA</span>
            <Award className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-outfit my-2">
            {recentResult.cgpa}
          </div>
          <div className="text-xs text-slate-500">
            Sem 5 SGPA: <strong>{recentResult.sgpa}</strong> (Distinction)
          </div>
        </div>

        {/* Fees */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Fee Status</span>
            <DollarSign className="w-5 h-5 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-rose-600 font-outfit my-2">
            ₹{pendingFee ? pendingFee.pendingAmount.toLocaleString() : '0'}
          </div>
          <div className="text-xs text-rose-500 font-semibold">
            Autonomous Exam Fee (Due 15 Oct)
          </div>
        </div>

        {/* Assignments */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Coursework</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-outfit my-2">
            {ASSIGNMENTS.filter(a => a.submitted).length} / {ASSIGNMENTS.length} Done
          </div>
          <div className="text-xs text-slate-500">
            Latest Grade: 24/25 in Deep Learning
          </div>
        </div>

      </div>

      {/* Linked Student Dossier Summary */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-outfit">
          Ward Enrollment Dossier
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-slate-400 font-bold block mb-0.5">Full Name</span>
            <strong className="text-slate-800 dark:text-slate-200">{linkedStudent.name}</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-slate-400 font-bold block mb-0.5">Roll Number</span>
            <strong className="font-mono text-slate-800 dark:text-slate-200">{linkedStudent.roll}</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-slate-400 font-bold block mb-0.5">Degree Program</span>
            <strong className="text-slate-800 dark:text-slate-200">{linkedStudent.course}</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-slate-400 font-bold block mb-0.5">Current Standing</span>
            <strong className="text-slate-800 dark:text-slate-200">{linkedStudent.year}</strong>
          </div>
        </div>
      </div>

      {/* Autonomous Examination Schedule Notification for Parents */}
      <div className="bg-blue-50 dark:bg-blue-950/40 rounded-3xl p-6 border border-blue-200 dark:border-blue-900/60 flex items-start gap-4">
        <Bell className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-blue-950 dark:text-blue-200 text-sm">
            Autonomous Semester VI Examination Notice
          </h4>
          <p className="text-blue-900 dark:text-blue-300 leading-relaxed">
            Parents are notified that autonomous end-semester exams will begin from October 20, 2026. Hall tickets have been made available on the student portal. Please ensure all outstanding fee dues are cleared before the exam commencement.
          </p>
        </div>
      </div>

    </div>
  );
};
