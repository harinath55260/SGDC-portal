import React, { useState } from 'react';
import { ASSIGNMENTS } from '../../services/collegeData';
import { useNotification } from '../../context/NotificationContext';
import { Assignment } from '../../types';
import { Clock, CheckCircle2, Upload, FileText, Award, Calendar, ArrowRight } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface StudentAssignmentsProps {
  onBack?: () => void;
}

export const StudentAssignments: React.FC<StudentAssignmentsProps> = ({ onBack }) => {
  const { showToast } = useNotification();
  const [assignments, setAssignments] = useState<Assignment[]>(ASSIGNMENTS);
  const [submittingItem, setSubmittingItem] = useState<Assignment | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingItem) return;

    setAssignments(prev => prev.map(a => {
      if (a.id === submittingItem.id) {
        return {
          ...a,
          submitted: true,
          submissionStatus: 'submitted'
        };
      }
      return a;
    }));

    showToast(`Assignment "${submittingItem.title}" uploaded successfully!`, 'success', 'Assignment Submitted');
    setSubmittingItem(null);
    setSubmissionNotes('');
    setSelectedFileName('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Coursework Assignments
        </span>
      </div>

      {/* Header */}
      <div>
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-900">
          Continuous Internal Evaluation (CIE)
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-outfit mt-2">
          Coursework & Lab Assignments
        </h1>
        <p className="text-xs text-slate-500">
          Upload and review assignment grades evaluated by course faculty.
        </p>
      </div>

      {/* Assignment Cards */}
      <div className="space-y-6">
        {assignments.map((asg) => (
          <div
            key={asg.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded-lg">
                  {asg.subject}
                </span>
                <span className="text-xs text-slate-500">
                  Assigned by: <strong>{asg.assignedBy}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Due: {asg.dueDate}</span>
                </div>
                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
                  {asg.totalMarks} Marks
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-outfit">
                {asg.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {asg.description}
              </p>
            </div>

            {/* Evaluation Status Banner */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                {asg.submissionStatus === 'graded' ? (
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Graded: {asg.myMarks} / {asg.totalMarks} Marks
                    </span>
                    {asg.myFeedback && (
                      <p className="text-xs text-slate-500 italic mt-1">
                        "<strong>Faculty Feedback:</strong> {asg.myFeedback}"
                      </p>
                    )}
                  </div>
                ) : asg.submissionStatus === 'submitted' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Submitted — Awaiting Professor Evaluation
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    <Clock className="w-4 h-4 text-amber-600" />
                    Pending Submission
                  </span>
                )}
              </div>

              {asg.submissionStatus === 'pending' ? (
                <button
                  onClick={() => setSubmittingItem(asg)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <Upload className="w-4 h-4" />
                  <span>Submit Assignment</span>
                </button>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-xl text-xs font-semibold cursor-default"
                >
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {submittingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Submit Coursework
              </h3>
              <button onClick={() => setSubmittingItem(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950 text-xs text-blue-900 dark:text-blue-300">
              <strong>{submittingItem.title}</strong>
              <div className="text-[11px] text-blue-700 dark:text-blue-400 mt-0.5">
                Course: {submittingItem.subject} • Due: {submittingItem.dueDate}
              </div>
            </div>

            <form onSubmit={handleSubmitAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Attach Solution File (PDF, ZIP, IPYNB, DOCX)
                </label>
                <input
                  type="file"
                  required
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFileName(e.target.files[0].name);
                    }
                  }}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Submission Notes / Code Repository Link
                </label>
                <textarea
                  rows={3}
                  placeholder="Paste GitHub repository URL, test outputs, or notes for the faculty..."
                  value={submissionNotes}
                  onChange={e => setSubmissionNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSubmittingItem(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Confirm & Upload Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
