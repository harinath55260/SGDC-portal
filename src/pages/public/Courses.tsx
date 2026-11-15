import React, { useState } from 'react';
import { COURSES } from '../../services/collegeData';
import { BookOpen, Award, CheckCircle, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface CoursesProps {
  onNavigate: (page: string, params?: any) => void;
  onBack?: () => void;
}

export const Courses: React.FC<CoursesProps> = ({ onNavigate, onBack }) => {
  const [filterDept, setFilterDept] = useState<string>('all');

  const filteredCourses = filterDept === 'all' 
    ? COURSES 
    : COURSES.filter(c => c.department.toLowerCase().includes(filterDept.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Degree Offerings
        </span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          Undergraduate Degree Offerings 2026-27
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-outfit">
          Courses & Academic Programs
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Explore our autonomous degree courses designed with modern industry technologies, specialized laboratories, and guaranteed placement training.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { label: 'All Programs', id: 'all' },
          { label: 'Computer Science & AI', id: 'computer' },
          { label: 'Commerce & Management', id: 'commerce' },
          { label: 'Arts & Social Work', id: 'social' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterDept(f.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterDept === f.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((c) => (
          <div
            key={c.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-lg">
                  {c.duration}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {c.seats} Total Seats
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-outfit">
                  {c.name}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Dept of {c.department}
                </span>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Eligibility:</strong> {c.eligibility}
              </div>

              {c.highlights && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Focus Areas:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-md"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Annual Fee</div>
                <div className="text-lg font-black text-slate-900 dark:text-white">
                  ₹{c.feePerYear.toLocaleString()}
                </div>
              </div>
              <button
                onClick={() => onNavigate('admissions', { course: c.name })}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
