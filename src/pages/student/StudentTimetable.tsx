import React, { useState } from 'react';
import { WEEKLY_TIMETABLE } from '../../services/collegeData';
import { Calendar, Clock, MapPin, User, BookOpen } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface StudentTimetableProps {
  onBack?: () => void;
}

export const StudentTimetable: React.FC<StudentTimetableProps> = ({ onBack }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const filteredSlots = WEEKLY_TIMETABLE.filter(s => s.day === selectedDay);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Class Schedule
        </span>
      </div>

      {/* Header */}
      <div>
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          Academic Class Schedule
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-outfit mt-2">
          Weekly Autonomous Timetable
        </h1>
        <p className="text-xs text-slate-500">
          BCA - Artificial Intelligence (Semester VI) • Academic Year 2026-27
        </p>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-x-auto">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`flex-1 min-w-[90px] py-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedDay === d
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Class Schedule Cards for Selected Day */}
      <div className="space-y-4">
        {filteredSlots.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No scheduled lecture periods for {selectedDay}.
          </div>
        ) : (
          filteredSlots.map((slot, idx) => (
            <div
              key={slot.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                  #{idx + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
                    {slot.subject}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-blue-500" />
                      {slot.faculty}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      {slot.room}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <div className="px-3.5 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{slot.time}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
