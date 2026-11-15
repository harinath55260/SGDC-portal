import React from 'react';
import { INSTITUTIONAL_CELLS, COLLEGE_INFO } from '../../services/collegeData';
import { 
  ShieldAlert, HeartHandshake, Award, Flag, 
  Briefcase, Lightbulb, Phone, Mail, CheckCircle2, ShieldCheck 
} from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface CommitteesProps {
  onBack?: () => void;
}

export const Committees: React.FC<CommitteesProps> = ({ onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Statutory Bodies & Cells
        </span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          Statutory Bodies & Student Support
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-outfit">
          Committees, Cells & Statutory Units
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Operating under the regulatory mandates of UGC, APSCHE, and Sri Venkateswara University to ensure student safety, gender equity, academic quality, discipline, and community development.
        </p>
      </div>

      {/* ISO & Awards Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-8 border border-blue-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-5 h-5 text-amber-400" />
            <span>National Recognition 2025</span>
          </div>
          <h3 className="text-2xl font-bold font-outfit">
            Top Biotech Institute of the Year 2025
          </h3>
          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            Conferred by <em>The Academic Insights</em> in recognition of Shri Gnanambica Degree College's advanced molecular biology labs, gene cloning research infrastructure, and high graduate placements in bio-pharma corporations.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
            <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/20">B.Sc. Biotechnology (BtBC)</span>
            <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/20">Research & Gene Labs</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-8 border border-emerald-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Quality & Environmental Standards</span>
          </div>
          <h3 className="text-2xl font-bold font-outfit">
            ISO Tri-Certifications & NAAC
          </h3>
          <ul className="text-xs sm:text-sm text-emerald-100 space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>ISO 9001:2015:</strong> Quality Management System</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>ISO 14001:2015:</strong> Environmental & Green Campus Management</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>ISO 50001:2011:</strong> Energy Management & Solar Grid Compliance</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>NAAC Accredited:</strong> Autonomous Institution under SVU Tirupati</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Committees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INSTITUTIONAL_CELLS.map((cell) => (
          <div
            key={cell.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-md">
                  {cell.badge}
                </span>
                <span className="text-xs text-slate-400 font-semibold">Active Body</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-outfit">
                  {cell.name}
                </h3>
                <div className="text-xs text-slate-500 font-semibold mt-1">
                  Lead / Convener: <strong className="text-slate-800 dark:text-slate-200">{cell.head}</strong>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {cell.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1 text-slate-500">
              <div className="flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400">
                <Phone className="w-3.5 h-3.5" />
                <span>{cell.helpline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Anti-Ragging Statutory Declaration */}
      <div className="bg-rose-50 dark:bg-rose-950/40 rounded-3xl p-8 border border-rose-200 dark:border-rose-900/60 space-y-4 text-xs sm:text-sm text-rose-900 dark:text-rose-200">
        <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold uppercase tracking-wider text-xs">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          <span>Statutory Warning on Anti-Ragging</span>
        </div>
        <p className="leading-relaxed">
          As per the UGC Regulations on curbing the menace of Ragging in Higher Educational Institutions, 2009, ragging in any form inside or outside the college campus is strictly prohibited and punishable under Indian Penal Code. Any student found guilty will face immediate rustication, police FIR registration, and debarment from university examinations.
        </p>
        <div className="flex flex-wrap gap-4 font-bold text-rose-700 dark:text-rose-300 pt-2">
          <span>National Anti-Ragging Toll Free Helpline: 1800-180-5522</span>
          <span>• College Squad: 08571-223199</span>
        </div>
      </div>

    </div>
  );
};
