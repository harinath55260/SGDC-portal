import React from 'react';
import { COLLEGE_INFO } from '../../services/collegeData';
import { Award, CheckCircle2, Shield, HeartHandshake, BookOpen, Users, Compass } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface AboutProps {
  onBack?: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous)
        </span>
      </div>

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          Established in {COLLEGE_INFO.established} • Autonomous
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-outfit">
          About Shri Gnanambica Degree College
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {COLLEGE_INFO.aboutText}
        </p>
      </div>

      {/* Campus Hero Image */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl max-h-96 relative">
        <img
          src="/images/college4.jpg"
          alt="Shri Gnanambica Degree College Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-6 sm:p-10">
          <div className="text-white">
            <h3 className="text-xl sm:text-2xl font-bold font-outfit">An Abode of Learning in Madanapalle</h3>
            <p className="text-xs sm:text-sm text-slate-200">Shri Gnanambica Degree College Main Academic Complex</p>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-outfit">Our Vision</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To emerge as a premier autonomous center of higher education in Rayalaseema, fostering academic rigor, digital innovation, moral integrity, and social responsibility to transform rural and suburban youth into globally competent professionals.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-outfit">Our Mission</h3>
          <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Deliver contemporary industry-aligned curricula in Artificial Intelligence, Computer Science, and Commerce.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Provide experiential laboratory training, research orientation, and ethical character development.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Encourage sportsmanship, physical fitness, and civic duty across all student cohorts.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Leadership Bios */}
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-outfit">
            Institutional Leadership
          </h2>
        </div>

        {/* Correspondent Full Bio */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-blue-100 dark:border-slate-800 shadow-md flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-full sm:w-64 h-56 sm:h-64 shrink-0 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border-2 border-blue-500/30 dark:border-slate-700 shadow-md flex items-center justify-center p-2">
            <img
              src="/correspondent.jpg"
              alt={COLLEGE_INFO.correspondent.name}
              className="w-full h-full object-contain object-center rounded-xl"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fallbackCount) {
                  target.dataset.fallbackCount = '1';
                  target.src = '/images/correspondent.jpg';
                } else if (target.dataset.fallbackCount === '1') {
                  target.dataset.fallbackCount = '2';
                  target.src = '/correspondent.png';
                }
              }}
            />
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded-md">
                Correspondent & Secretary
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-outfit mt-1">{COLLEGE_INFO.correspondent.name}</h3>
              <div className="text-xs text-slate-500">{COLLEGE_INFO.correspondent.societyTitle}</div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {COLLEGE_INFO.correspondent.message}
            </p>
          </div>
        </div>

        {/* Principal Full Bio */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-indigo-100 dark:border-slate-800 shadow-md flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-full sm:w-64 h-56 sm:h-64 shrink-0 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border-2 border-indigo-500/30 dark:border-slate-700 shadow-md flex items-center justify-center p-2">
            <img
              src="/principal.jpg"
              alt={COLLEGE_INFO.principal.name}
              className="w-full h-full object-contain object-top rounded-xl"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fallbackCount) {
                  target.dataset.fallbackCount = '1';
                  target.src = '/images/principal.jpg';
                }
              }}
            />
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 rounded-md">
                {COLLEGE_INFO.principal.title} • {COLLEGE_INFO.principal.qualification}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-outfit mt-1">{COLLEGE_INFO.principal.name}</h3>
              <div className="text-xs text-slate-500">Principal & Head of Academic Council</div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {COLLEGE_INFO.principal.message}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
