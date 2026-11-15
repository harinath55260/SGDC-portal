import React, { useState } from 'react';
import { COURSES } from '../../services/collegeData';
import { BookOpen, Calendar, Award, CheckCircle, FileText, ChevronDown, ChevronUp, Download, Laptop, Library, ExternalLink, ShieldCheck, HeartHandshake } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface AcademicsProps {
  onBack?: () => void;
}

export const Academics: React.FC<AcademicsProps> = ({ onBack }) => {
  const bcaAi = COURSES.find(c => c.id === 'bca-ai');
  const [expandedSemester, setExpandedSemester] = useState<number | null>(6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Academic Regulations & LMS
        </span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          Autonomous Academic Regulations & LMS 2026
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-outfit">
          Academics & Autonomous Syllabi
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Choice Based Credit System (CBCS) aligned with national AICTE/UGC standards, featuring deep industry-led curricula in computing, intelligence systems, and business.
        </p>
      </div>

      {/* Flagship BCA - AI Syllabi Accordion (Detailed from original website) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
              Autonomous Flagship Program
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-outfit mt-1">
              BCA - Artificial Intelligence (All 6 Semesters)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Complete semester-by-semester subject curriculum from original Shri Gnanambica records.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-lg font-semibold">
              3 Years • 140+ Credits
            </span>
          </div>
        </div>

        {/* Semesters 1 to 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bcaAi?.syllabus?.map((sem) => (
            <div
              key={sem.semester}
              className={`rounded-2xl border p-5 transition-all ${
                expandedSemester === sem.semester
                  ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 shadow-sm'
                  : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedSemester(expandedSemester === sem.semester ? null : sem.semester)}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    S{sem.semester}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Semester {sem.semester}
                  </h3>
                </div>
                {expandedSemester === sem.semester ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/60 space-y-2">
                {sem.subjects.map((sub, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Autonomous Evaluation System */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-slate-900 dark:text-white">Continuous Internal Evaluation (CIE)</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            30 Marks per theory subject comprising mid-term examinations, regular assignment submissions, seminars, and laboratory work.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-slate-900 dark:text-white">Semester End Examination (SEE)</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            70 Marks comprehensive external autonomous examination evaluated by panel of external university moderators.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-slate-900 dark:text-white">Attendance Mandate</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Strict 75% attendance rule is enforced across all autonomous programs. Automated portal warnings notify students and parents.
          </p>
        </div>
      </div>

      {/* Official College LMS (Learning Management System) & E-Library Portal */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
              Original College Feature • shrignanambicacollege.edu.in
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit">
              College LMS (Learning Management System) & E-Library
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 max-w-2xl leading-relaxed">
              Access digital textbook repositories, lecture video archives, unit question banks, and autonomous semester study modules.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="http://shrignanambicacollege.edu.in/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-blue-900 font-bold text-xs hover:bg-blue-50 transition-all shadow-md"
            >
              <span>Visit Official Portal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center text-blue-300">
              <Library className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">E-Books & Textbooks</h4>
            <p className="text-xs text-blue-200">12,000+ reference e-books and national digital library links.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/30 flex items-center justify-center text-indigo-300">
              <Laptop className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">Lecture Notes & PPTs</h4>
            <p className="text-xs text-blue-200">Faculty-curated lesson plans and PowerPoint slide decks.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center text-emerald-300">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">Question Banks</h4>
            <p className="text-xs text-blue-200">Previous 5 years autonomous semester question papers with solutions.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/30 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">Lab Manuals & Code</h4>
            <p className="text-xs text-blue-200">Python, AI, C, Java, and Science laboratory experiment manuals.</p>
          </div>
        </div>
      </div>

      {/* Unnat Bharat Abhiyan (UBA) Initiative Card */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-3xl p-6 sm:p-8 border border-emerald-200 dark:border-emerald-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" />
            <span>Govt. of India Initiative • Participating Institute</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-950 dark:text-emerald-100 font-outfit">
            Unnat Bharat Abhiyan (UBA) Rural Cell
          </h3>
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 max-w-2xl leading-relaxed">
            Shri Gnanambica Degree College actively participates in the Unnat Bharat Abhiyan (UBA) initiative, adopting 5 rural villages in the Madanapalle region for digital literacy, women health awareness, and water conservation workshops.
          </p>
        </div>
        <div className="shrink-0 bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-sm text-center">
          <span className="text-[10px] uppercase font-bold text-slate-500">Adopted Villages</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">5 Clusters</div>
          <span className="text-[10px] text-slate-500">Madanapalle Mandal</span>
        </div>
      </div>

    </div>
  );
};
