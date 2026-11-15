import React, { useState } from 'react';
import { DEMO_ATTENDANCE_SUMMARY } from '../../services/collegeData';
import { CheckSquare, AlertTriangle, Calendar, Award, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface StudentAttendanceProps {
  onBack?: () => void;
}

export const StudentAttendance: React.FC<StudentAttendanceProps> = ({ onBack }) => {
  const [filterMonth, setFilterMonth] = useState('all');

  const { overallPercentage, totalClassesHeld, classesAttended, classesAbsent, subjects, recentLogs } = DEMO_ATTENDANCE_SUMMARY;
  const isLowAttendance = overallPercentage < 75;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Attendance Record
        </span>
      </div>

      {/* Header */}
      <div>
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          Academic Attendance Register
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-outfit mt-2">
          Autonomous Attendance Record
        </h1>
        <p className="text-xs text-slate-500">
          Semester VI • BCA - Artificial Intelligence (Batch 2023-26)
        </p>
      </div>

      {/* Warning if below 75% */}
      {isLowAttendance ? (
        <div className="bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-900 p-5 rounded-3xl flex items-center gap-4 text-xs text-rose-900 dark:text-rose-200">
          <AlertTriangle className="w-8 h-8 text-rose-600 shrink-0" />
          <div>
            <strong className="text-sm font-bold block mb-1">Attendance Condonation Warning</strong>
            Your total attendance is {overallPercentage}%. Autonomous regulations require minimum 75% attendance to obtain the Semester End Examination Hall Ticket. Please meet HOD Mahesh Sir.
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4 rounded-3xl flex items-center gap-3 text-xs text-emerald-900 dark:text-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            <strong>Excellent Standing:</strong> Your current attendance is <strong>{overallPercentage}%</strong>, well above the 75% autonomous threshold. You are in good standing for examinations.
          </span>
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400 font-outfit">
            {overallPercentage}%
          </div>
          <div className="text-xs text-slate-500 font-semibold mt-1">Overall Percentage</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <div className="text-3xl font-black text-slate-900 dark:text-white font-outfit">
            {totalClassesHeld}
          </div>
          <div className="text-xs text-slate-500 font-semibold mt-1">Total Classes Held</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-outfit">
            {classesAttended}
          </div>
          <div className="text-xs text-slate-500 font-semibold mt-1">Classes Present</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <div className="text-3xl font-black text-rose-600 dark:text-rose-400 font-outfit">
            {classesAbsent}
          </div>
          <div className="text-xs text-slate-500 font-semibold mt-1">Classes Absent</div>
        </div>
      </div>

      {/* Subject-Wise Attendance Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-outfit">
              Subject-Wise Attendance Breakdown
            </h3>
            <p className="text-xs text-slate-500">
              Evaluated and verified by respective course professors
            </p>
          </div>
          <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg font-semibold">
            {subjects.length} Subjects
          </span>
        </div>

        <div className="space-y-4">
          {subjects.map((sub) => {
            const isSubLow = sub.percentage < 75;
            return (
              <div
                key={sub.subjectCode}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                        {sub.subjectCode}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {sub.subjectName}
                      </h4>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Faculty: {sub.faculty}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className={`text-base font-black ${isSubLow ? 'text-rose-600' : 'text-slate-900 dark:text-white'}`}>
                        {sub.percentage}%
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {sub.attendedClasses} / {sub.totalClasses} Classes
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                      isSubLow 
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' 
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {isSubLow ? 'Condonation' : 'Eligible'}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isSubLow ? 'bg-rose-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${sub.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Attendance Session Logs */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
          Recent Biometric & Class Log History
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {recentLogs.map((log, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {log.status === 'present' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                )}
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{log.subject}</div>
                  <div className="text-[10px] text-slate-400">{log.date} at {log.time}</div>
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                log.status === 'present' 
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300' 
                  : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
              }`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
