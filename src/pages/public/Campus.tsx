import React from 'react';
import { CAMPUS_FACILITIES } from '../../services/collegeData';
import { Wifi, Cpu, BookOpen, Trophy, ShieldCheck, HeartPulse } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface CampusProps {
  onBack?: () => void;
}

export const Campus: React.FC<CampusProps> = ({ onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Campus & Infrastructure
        </span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          World-Class Infrastructure
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-outfit">
          Campus Facilities & Environment
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Sprawling eco-friendly campus located in Madanapalle, equipped with advanced research computing labs, central digital library, high-speed Wi-Fi, and athletic grounds.
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CAMPUS_FACILITIES.map((fac) => (
          <div
            key={fac.id}
            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all group"
          >
            <div className="h-52 overflow-hidden relative">
              <img
                src={fac.image}
                alt={fac.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg">
                {fac.tag}
              </span>
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-outfit">
                {fac.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {fac.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Key Highlights Banner */}
      <div className="bg-slate-100 dark:bg-slate-800/60 rounded-3xl p-8 border border-slate-200 dark:border-slate-700/60">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 text-center">
          Campus Amenities at a Glance
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          {[
            { label: 'Gigabit Wi-Fi', icon: Wifi },
            { label: 'AI & GPU Labs', icon: Cpu },
            { label: 'DELNET E-Library', icon: BookOpen },
            { label: 'Cricket Stadium', icon: Trophy },
            { label: '24/7 CCTV & Security', icon: ShieldCheck },
            { label: 'First Aid & Health', icon: HeartPulse }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto" />
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
