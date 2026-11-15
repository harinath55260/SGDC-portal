import React, { useState } from 'react';
import { NOTICES } from '../../services/collegeData';
import { Bell, AlertTriangle, Info, Calendar, Download, Pin, Filter, Search } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface NoticesProps {
  onBack?: () => void;
}

export const Notices: React.FC<NoticesProps> = ({ onBack }) => {
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'urgent' | 'important' | 'normal'>('all');
  const [search, setSearch] = useState('');

  const filteredNotices = NOTICES.filter(n => {
    const matchesPriority = priorityFilter === 'all' || n.priority === priorityFilter;
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || 
                          n.description.toLowerCase().includes(search.toLowerCase()) ||
                          n.department.toLowerCase().includes(search.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Official Circulars & Notices
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest bg-rose-50 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900">
          Official College Circulars
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
          Autonomous Circulars & Notices
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Verified administrative, academic, examination, and placement announcements issued by SGDC college authorities.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: 'All Circulars', val: 'all' },
            { label: '🔴 Urgent', val: 'urgent' },
            { label: '🟡 Important', val: 'important' },
            { label: '🔵 Normal', val: 'normal' }
          ].map((btn) => (
            <button
              key={btn.val}
              onClick={() => setPriorityFilter(btn.val as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                priorityFilter === btn.val
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search circulars..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No notices match your selected filter criteria.
          </div>
        ) : (
          filteredNotices.map((n) => {
            let badgeBg = 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900';
            if (n.priority === 'urgent') {
              badgeBg = 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900';
            } else if (n.priority === 'important') {
              badgeBg = 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900';
            }

            return (
              <div
                key={n.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-400 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full border ${badgeBg}`}>
                      {n.priority}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Dept: <strong>{n.department}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>{n.date}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
                  {n.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {n.description}
                </p>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Issued by: <strong className="text-slate-700 dark:text-slate-300">{n.author}</strong>
                  </span>

                  <button
                    onClick={() => {
                      alert(`Official Notification Document for "${n.title}" will be downloaded.`);
                    }}
                    className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Circular</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
