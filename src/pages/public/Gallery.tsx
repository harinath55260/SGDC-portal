import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../../services/collegeData';
import { X, ZoomIn, Camera } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface GalleryProps {
  onBack?: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onBack }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Campus Photo Gallery
        </span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          Campus Tour & Archives
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-outfit">
          College Photo Gallery
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          High-definition photography capturing the dynamic campus life, research laboratories, smart lecture theaters, library, and grand celebrations at SGDC Madanapalle.
        </p>
      </div>

      {/* Gallery Grid (All 12 Real Campus Images Preserved from Repository) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {GALLERY_IMAGES.map((img) => (
          <div
            key={img.id}
            onClick={() => setSelectedImg(img.url)}
            className="group relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl cursor-pointer bg-slate-900 aspect-4/3 transition-all"
          >
            <img
              src={img.url}
              alt={img.caption}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <span className="text-xs font-bold text-white leading-tight">
                {img.caption}
              </span>
              <span className="text-[10px] text-blue-300 mt-1 flex items-center gap-1 font-semibold">
                <ZoomIn className="w-3 h-3" /> Click to enlarge
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedImg(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-blue-400 text-sm font-bold flex items-center gap-1"
            >
              <X className="w-6 h-6" /> Close
            </button>
            <img
              src={selectedImg}
              alt="Enlarged view"
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl border border-slate-700 shadow-2xl"
            />
          </div>
        </div>
      )}

    </div>
  );
};
