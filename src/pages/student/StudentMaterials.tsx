import React, { useState } from 'react';
import { STUDY_MATERIALS } from '../../services/collegeData';
import { FileText, Download, Filter, BookOpen, Video, FileCheck, ExternalLink } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface StudentMaterialsProps {
  onBack?: () => void;
}

export const StudentMaterials: React.FC<StudentMaterialsProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const categories = ['all', 'Notes', 'Question Papers', 'Lab Materials', 'PPT', 'PDF'];

  const filteredMaterials = STUDY_MATERIALS.filter(m => {
    const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || 
                          m.subject.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Learning Repository
        </span>
      </div>

      {/* Header */}
      <div>
        <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest bg-purple-50 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-900">
          Digital Learning Repository
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-outfit mt-2">
          Study Materials & Question Papers
        </h1>
        <p className="text-xs text-slate-500">
          Curated notes, laboratory guides, previous years question papers and slides.
        </p>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Types' : cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Filter by subject or title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-60 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Materials List */}
      <div className="space-y-4">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-md">
                    {mat.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    Sem {mat.semester} • {mat.subject}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
                  {mat.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                  {mat.description}
                </p>
                <div className="text-[11px] text-slate-400 pt-1">
                  Uploaded by: <strong>{mat.uploadedBy}</strong> on {mat.uploadedDate} {mat.fileSize && `• ${mat.fileSize}`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <a
                href={mat.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Open / Download</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
