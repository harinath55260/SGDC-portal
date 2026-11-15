import React, { useState } from 'react';
import { DEPARTMENTS, FACULTY_MEMBERS } from '../../services/collegeData';
import { FileText, Download, User, ExternalLink, GraduationCap, Award, BookOpen, X, Mail, Phone, Clock } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';
import { FacultyMember } from '../../types';

interface DepartmentsProps {
  onBack?: () => void;
}

export const Departments: React.FC<DepartmentsProps> = ({ onBack }) => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>('cs');
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  const activeDept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];
  const deptFaculty = FACULTY_MEMBERS.filter(f => f.departmentId === selectedDeptId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Faculty Directory
        </span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          Faculty & Academic Divisions
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-outfit">
          Departments & Distinguished Faculty
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Select a department below to view its academic profile, research facilities, and download faculty resume dossiers.
        </p>
      </div>

      {/* Department Tabs Bar (Enhanced version of showDept from original site) */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl max-w-3xl mx-auto border border-slate-200 dark:border-slate-700">
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setSelectedDeptId(dept.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedDeptId === dept.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            {dept.name.split('&')[0].trim()}
          </button>
        ))}
      </div>

      {/* Selected Department Overview Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Department Details</span>
            <h2 className="text-2xl font-extrabold font-outfit mt-0.5">{activeDept.name}</h2>
            <p className="text-xs sm:text-sm text-blue-200 mt-2 max-w-2xl">{activeDept.description}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20">
            <div>
              <div className="text-[10px] uppercase font-bold text-blue-300">Head of Department</div>
              <div className="text-sm font-bold text-white">{activeDept.hodName}</div>
              <div className="text-xs text-blue-200">{activeDept.hodQualification}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Members Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-outfit">
            Faculty Members ({deptFaculty.length})
          </h3>
          <span className="text-xs text-slate-500">
            Click on any faculty dossier to view original verified profile PDF
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deptFaculty.map((fac) => (
            <div
              key={fac.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-base">
                    {fac.name.charAt(0)}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    {fac.experience || 'Experienced'}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {fac.name}
                  </h4>
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                    {fac.designation}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {fac.qualification}
                  </div>
                </div>

                {fac.specialization && (
                  <div className="text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <strong>Specialization:</strong> {fac.specialization}
                  </div>
                )}
              </div>

              {/* Verified PDF link (from original site) */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                {fac.pdfProfile ? (
                  <a
                    href={fac.pdfProfile}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-blue-700 dark:text-blue-300 text-xs font-bold transition-colors shadow-2xs"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Profile PDF</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                ) : (
                  <button
                    onClick={() => setSelectedFaculty(fac)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    <span>View Faculty Profile</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedFaculty(fac)}
                  title="View full bio"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 hover:text-blue-600 text-xs font-bold transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Profile Modal Dossier */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-6">
            <button
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold font-outfit shadow-md">
                {selectedFaculty.name.charAt(0)}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {selectedFaculty.departmentName}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-outfit">
                  {selectedFaculty.name}
                </h3>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {selectedFaculty.designation}
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/50">
                <span className="text-slate-500 font-medium">Qualification:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedFaculty.qualification}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/50">
                <span className="text-slate-500 font-medium">Teaching Experience:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedFaculty.experience || '8+ Years'}</span>
              </div>
              {selectedFaculty.specialization && (
                <div className="py-1.5 border-b border-slate-100 dark:border-slate-800/50">
                  <span className="text-slate-500 font-medium block mb-1">Key Research & Specialization:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{selectedFaculty.specialization}</span>
                </div>
              )}
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-500 font-medium">Institution:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">Shri Gnanambica Degree College</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {selectedFaculty.pdfProfile ? (
                <a
                  href={selectedFaculty.pdfProfile}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Verified PDF Profile</span>
                </a>
              ) : null}
              <button
                onClick={() => setSelectedFaculty(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
