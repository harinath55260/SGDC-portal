import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Building2, User, Bell, Calendar, Briefcase, FileText, ArrowRight } from 'lucide-react';
import { COURSES, DEPARTMENTS, FACULTY_MEMBERS, NOTICES, EVENTS, PLACEMENTS, STUDY_MATERIALS } from '../../services/collegeData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, params?: any) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return null;

    const matchedCourses = COURSES.filter(c => 
      c.name.toLowerCase().includes(q) || c.department.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedFaculty = FACULTY_MEMBERS.filter(f => 
      f.name.toLowerCase().includes(q) || f.departmentName.toLowerCase().includes(q) || f.specialization?.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedDepts = DEPARTMENTS.filter(d => 
      d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q)
    ).slice(0, 2);

    const matchedNotices = NOTICES.filter(n => 
      n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedEvents = EVENTS.filter(e => 
      e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
    ).slice(0, 2);

    const matchedPlacements = PLACEMENTS.filter(p => 
      p.company.toLowerCase().includes(q) || p.role.toLowerCase().includes(q)
    ).slice(0, 2);

    const matchedMaterials = STUDY_MATERIALS.filter(m => 
      m.title.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q)
    ).slice(0, 2);

    const total = 
      matchedCourses.length + 
      matchedFaculty.length + 
      matchedDepts.length + 
      matchedNotices.length + 
      matchedEvents.length + 
      matchedPlacements.length + 
      matchedMaterials.length;

    return {
      total,
      courses: matchedCourses,
      faculty: matchedFaculty,
      departments: matchedDepts,
      notices: matchedNotices,
      events: matchedEvents,
      placements: matchedPlacements,
      materials: matchedMaterials
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[75vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, faculty, departments, notices, events, placements..."
            className="w-full bg-transparent text-sm md:text-base text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-4">
          {!searchResults && (
            <div className="py-12 text-center text-slate-400 text-sm">
              Type at least 2 characters to search across Shri Gnanambica College portal.
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['BCA-AI', 'Mahesh Sir', 'Admissions', 'Placements', 'Autonomous Timetable'].map(t => (
                  <button
                    key={t}
                    onClick={() => setQuery(t)}
                    className="px-2.5 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchResults && searchResults.total === 0 && (
            <div className="py-10 text-center text-slate-500 text-sm">
              No matching records found for "{query}". Try checking your spelling or search another keyword.
            </div>
          )}

          {searchResults && searchResults.total > 0 && (
            <>
              {/* Courses */}
              {searchResults.courses.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" /> Courses & Programs
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.courses.map(course => (
                      <div
                        key={course.id}
                        onClick={() => { onNavigate('courses'); onClose(); }}
                        className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {course.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {course.duration} • {course.department}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Faculty */}
              {searchResults.faculty.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-500" /> Faculty Members
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.faculty.map(f => (
                      <div
                        key={f.id}
                        onClick={() => { onNavigate('departments'); onClose(); }}
                        className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {f.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {f.designation} • Dept. of {f.departmentName}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notices */}
              {searchResults.notices.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-rose-500" /> Official Notices
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.notices.map(n => (
                      <div
                        key={n.id}
                        onClick={() => { onNavigate('notices'); onClose(); }}
                        className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-rose-600 dark:group-hover:text-rose-400">
                            {n.title}
                          </div>
                          <div className="text-xs text-slate-500">
                            {n.date} • {n.department}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Placements */}
              {searchResults.placements.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-500" /> Placements & Careers
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.placements.map(p => (
                      <div
                        key={p.id}
                        onClick={() => { onNavigate('placements'); onClose(); }}
                        className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                            {p.company} — {p.role}
                          </div>
                          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            Package: {p.package}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
