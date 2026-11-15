import React, { useState } from 'react';
import { SPORTS_ITEMS } from '../../services/collegeData';
import { Trophy, Award, Medal, Users, X, ChevronRight } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface SportsProps {
  onBack?: () => void;
}

export const Sports: React.FC<SportsProps> = ({ onBack }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Sports Activities
        </span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-900">
          Sports & Physical Education
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-outfit">
          Sports Activities & Athletics
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Our college encourages students to participate in various sports like Cricket, Football, Volleyball, Kabaddi, Badminton, and Athletics. Sports cultivate physical endurance, discipline, camaraderie, and strategic leadership.
        </p>
      </div>

      {/* Sports Gallery (All 12 Real Images Preserved from Original Repository) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-outfit">
            SGDC Sports Photo Gallery
          </h2>
          <span className="text-xs text-slate-500">
            Click on any photo to enlarge
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SPORTS_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item.img)}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl cursor-pointer bg-slate-900 aspect-4/3 transition-all"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <span className="text-xs font-bold text-white leading-tight">
                  {item.title}
                </span>
                <span className="text-[10px] text-amber-300 mt-1 flex items-center gap-1">
                  View Full Size <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements / Annual Sports Meet */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl text-center md:text-left">
          <span className="text-xs font-bold text-amber-200 uppercase tracking-widest bg-amber-900/60 px-3 py-1 rounded-full">
            Championship Honors
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-outfit">
            Inter-Collegiate Champions 2025-26
          </h3>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            SGDC student athletes secured the Sri Venkateswara University Rayalaseema Cricket Trophy, Gold Medals in 100m sprint, and runners-up in State Level Volleyball Championship.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 shrink-0 text-center">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <Trophy className="w-8 h-8 text-amber-300 mx-auto mb-1" />
            <div className="text-2xl font-black">140+</div>
            <div className="text-[10px] uppercase font-semibold text-amber-200">Medals Won</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <Medal className="w-8 h-8 text-amber-300 mx-auto mb-1" />
            <div className="text-2xl font-black">18</div>
            <div className="text-[10px] uppercase font-semibold text-amber-200">District Cups</div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-amber-400 text-sm font-bold flex items-center gap-1"
            >
              <X className="w-6 h-6" /> Close
            </button>
            <img
              src={selectedPhoto}
              alt="Enlarged sports photograph"
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl border border-slate-700 shadow-2xl"
            />
          </div>
        </div>
      )}

    </div>
  );
};
