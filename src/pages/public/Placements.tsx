import React, { useState } from 'react';
import { PLACEMENTS } from '../../services/collegeData';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Briefcase, Building, MapPin, Calendar, CheckCircle2, Clock, Send, Sparkles } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface PlacementsProps {
  onNavigate: (page: string) => void;
  onBack?: () => void;
}

export const Placements: React.FC<PlacementsProps> = ({ onNavigate, onBack }) => {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useNotification();
  const [placementList, setPlacementList] = useState(PLACEMENTS);

  const handleApply = (id: string, company: string) => {
    if (!isAuthenticated) {
      showToast('Please login to your Student Portal to apply for placement drives.', 'info', 'Authentication Required');
      onNavigate('login');
      return;
    }

    setPlacementList(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, applied: true, status: 'Applied' };
      }
      return p;
    }));

    showToast(`Application successfully submitted for ${company}!`, 'success', 'Applied to Drive');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Training & Placement Cell
        </span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          Career Guidance & Campus Recruitment Cell
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-outfit">
          Placement Opportunities & Drives
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Over 65 premier tech corporations, financial institutions, and analytics firms recruit our autonomous degree students annually.
        </p>
      </div>

      {/* Recruiter Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Highest Package', val: '₹7.5 LPA' },
          { label: 'Average Package', val: '₹4.6 LPA' },
          { label: 'Total Offers (2025-26)', val: '380+' },
          { label: 'Recruiting Companies', val: '65+' }
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-outfit">{s.val}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Active Drives Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-outfit">
            Active Campus Recruitment Drives ({placementList.length})
          </h2>
          <span className="text-xs text-slate-500">
            For final year BCA, B.Sc, BBA & B.Com students
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {placementList.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-blue-600 text-base">
                      {p.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-outfit">
                        {p.company}
                      </h3>
                      <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {p.role}
                      </div>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {p.package}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-2">
                    <strong className="text-slate-900 dark:text-white shrink-0">Eligibility:</strong>
                    <span>{p.eligibility}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <strong className="text-slate-900 dark:text-white shrink-0">Locations:</strong>
                    <span>{p.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <strong className="text-slate-900 dark:text-white shrink-0">Process:</strong>
                    <span>{p.selectionProcess}</span>
                  </div>
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold pt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Application Deadline: {p.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400">Status: </span>
                  {p.applied ? (
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900">
                      ✓ {p.status || 'Applied'}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500 font-medium">Open for Application</span>
                  )}
                </div>

                {p.applied ? (
                  <button
                    disabled
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-bold rounded-xl cursor-default"
                  >
                    Application Registered
                  </button>
                ) : (
                  <button
                    onClick={() => handleApply(p.id, p.company)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all hover:scale-105 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply Now</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
