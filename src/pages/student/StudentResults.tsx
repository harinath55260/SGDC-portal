import React, { useState } from 'react';
import { DEMO_RESULTS } from '../../services/collegeData';
import { Award, Printer, Download, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface StudentResultsProps {
  onBack?: () => void;
}

export const StudentResults: React.FC<StudentResultsProps> = ({ onBack }) => {
  const [selectedSem, setSelectedSem] = useState<number>(5);

  const activeResult = DEMO_RESULTS.find(r => r.semester === selectedSem) || DEMO_RESULTS[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Semester Grade Sheets
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
            Autonomous Examination Wing
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-outfit mt-2">
            Semester Grade Sheets & Marks
          </h1>
          <p className="text-xs text-slate-500">
            Shri Gnanambica Degree College (Autonomous), Madanapalle
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-2 self-start sm:self-auto transition-all hover:scale-105"
        >
          <Printer className="w-4 h-4" />
          <span>Print Official Grade Sheet</span>
        </button>
      </div>

      {/* Semester Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl max-w-sm">
        {DEMO_RESULTS.map((res) => (
          <button
            key={res.semester}
            onClick={() => setSelectedSem(res.semester)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedSem === res.semester
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Semester {res.semester} Grade Card
          </button>
        ))}
      </div>

      {/* Official Autonomous Grade Sheet Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 print:border-none print:shadow-none">
        
        {/* Institutional Grade Card Header */}
        <div className="text-center pb-6 border-b border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-center gap-3">
            <img src="/college1-logo.png" alt="SGDC Logo" className="w-12 h-12 object-contain" />
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl font-black font-outfit text-slate-900 dark:text-white leading-tight">
                Shri Gnanambica Degree College
              </h2>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                Autonomous Institution • Affiliated to Sri Venkateswara University
              </div>
            </div>
          </div>
          <div className="text-xs font-bold text-slate-600 dark:text-slate-300 pt-1">
            STATEMENT OF MARKS & GRADES — SEMESTER {activeResult.semester} EXAMINATION
          </div>
        </div>

        {/* Student Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Student Name</span>
            <strong className="text-slate-800 dark:text-slate-200">K. Harinath</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Hall Ticket / Roll No</span>
            <strong className="font-mono text-slate-800 dark:text-slate-200">22042BCA</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Degree & Branch</span>
            <strong className="text-slate-800 dark:text-slate-200">BCA (Artificial Intelligence)</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Academic Year</span>
            <strong className="text-slate-800 dark:text-slate-200">{activeResult.academicYear}</strong>
          </div>
        </div>

        {/* Detailed Marks Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider">
                <th className="p-3">Course Code</th>
                <th className="p-3">Subject Title</th>
                <th className="p-3 text-center">Credits</th>
                <th className="p-3 text-center">CIE (30)</th>
                <th className="p-3 text-center">SEE (70)</th>
                <th className="p-3 text-center">Total (100)</th>
                <th className="p-3 text-center">Grade</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {activeResult.subjects.map((sub) => (
                <tr key={sub.code} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{sub.code}</td>
                  <td className="p-3 font-semibold">{sub.name}</td>
                  <td className="p-3 text-center font-medium">{sub.credits}</td>
                  <td className="p-3 text-center font-medium">{sub.internalMarks}</td>
                  <td className="p-3 text-center font-medium">{sub.semesterMarks}</td>
                  <td className="p-3 text-center font-bold text-slate-900 dark:text-white">{sub.totalMarks}</td>
                  <td className="p-3 text-center font-black text-blue-600 dark:text-blue-400">{sub.grade}</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      PASS
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* GPA Summary and Autonomous Stamp */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-center">
              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 block">Semester SGPA</span>
              <span className="text-2xl font-black text-blue-950 dark:text-blue-200 font-outfit">{activeResult.sgpa}</span>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-center">
              <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">Cumulative CGPA</span>
              <span className="text-2xl font-black text-indigo-950 dark:text-indigo-200 font-outfit">{activeResult.cgpa}</span>
            </div>

            <div className="text-xs text-slate-500">
              <div>Result: <strong className="text-emerald-600">PASSED FIRST CLASS WITH DISTINCTION</strong></div>
              <div>Total Credits Earned: <strong>{activeResult.totalCredits}</strong></div>
            </div>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <div className="text-xs font-serif italic text-slate-400">Digitally Verified & Sealed</div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Controller of Examinations</div>
            <div className="text-[10px] text-slate-400">Shri Gnanambica Degree College, Madanapalle</div>
          </div>
        </div>

      </div>

    </div>
  );
};
