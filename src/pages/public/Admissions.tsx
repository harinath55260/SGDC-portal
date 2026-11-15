import React, { useState } from 'react';
import { 
  CheckCircle2, Download, Send, FileText, User, 
  Phone, Mail, Calendar, MapPin, BookOpen, Sparkles, RefreshCw 
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { COURSES } from '../../services/collegeData';
import { BackButton } from '../../components/common/BackButton';

interface AdmissionsProps {
  onBack?: () => void;
}

export const Admissions: React.FC<AdmissionsProps> = ({ onBack }) => {
  const { showToast } = useNotification();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    fatherName: '',
    motherName: '',
    gender: 'Male',
    mobile: '',
    email: '',
    dob: '',
    address: '',
    sscSchool: '',
    sscMarks: '9.2 GPA',
    interCollege: '',
    interMarks: '920 / 1000',
    course: 'BCA-AI',
    skills: ['Python', 'AI']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  const availableSkills = ['Python', 'AI', 'Java', 'HTML', 'SQL', 'C++', 'Data Science'];

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const appId = `SGDC-ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedAppId(appId);
      setIsSubmitting(false);

      // Save locally for admin review
      const existing = JSON.parse(localStorage.getItem('sgdc_admissions') || '[]');
      existing.unshift({
        id: appId,
        ...formData,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'pending'
      });
      localStorage.setItem('sgdc_admissions', JSON.stringify(existing));

      showToast(`Application ${appId} submitted successfully!`, 'success', 'Admission Registered');
    }, 800);
  };

  const handleDownloadCSV = () => {
    const headers = 'Application ID,First Name,Middle Name,Last Name,Father Name,Mother Name,Gender,Mobile,Email,DOB,Address,Course,Skills\n';
    const row = `${submittedAppId || 'SGDC-ADM-DEMO'},${formData.firstName},${formData.middleName},${formData.lastName},${formData.fatherName},${formData.motherName},${formData.gender},${formData.mobile},${formData.email},${formData.dob},"${formData.address}",${formData.course},"${formData.skills.join(';')}"\n`;
    const blob = new Blob([headers + row], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SGDC_Admission_${submittedAppId || 'Receipt'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Student Admissions 2026-27
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          Academic Year 2026-27 Registration
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
          Student Admission Application
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Please complete the registration form below. Eligible students will receive an admission offer letter and counseling schedule.
        </p>
      </div>

      {submittedAppId ? (
        /* Confirmation Screen */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-emerald-200 dark:border-emerald-800 shadow-xl text-center space-y-6 animate-scale-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Registration Successful
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              Welcome to Shri Gnanambica Degree College!
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Your application has been logged into the college admissions queue.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-md mx-auto text-left text-xs space-y-1.5">
            <div><strong>Application Number:</strong> <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{submittedAppId}</span></div>
            <div><strong>Applicant Name:</strong> {formData.firstName} {formData.lastName}</div>
            <div><strong>Selected Course:</strong> {formData.course}</div>
            <div><strong>Registered Mobile:</strong> {formData.mobile}</div>
            <div><strong>Email:</strong> {formData.email}</div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={handleDownloadCSV}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Application Receipt (CSV)
            </button>
            <button
              onClick={() => {
                setSubmittedAppId(null);
                setFormData({
                  firstName: '',
                  middleName: '',
                  lastName: '',
                  fatherName: '',
                  motherName: '',
                  gender: 'Male',
                  mobile: '',
                  email: '',
                  dob: '',
                  address: '',
                  sscSchool: '',
                  sscMarks: '9.2 GPA',
                  interCollege: '',
                  interMarks: '920 / 1000',
                  course: 'BCA-AI',
                  skills: ['Python', 'AI']
                });
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      ) : (
        /* Form */
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-md space-y-8"
        >
          {/* Personal Details */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-500" />
              1. Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sai"
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Middle Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kumar"
                  value={formData.middleName}
                  onChange={e => setFormData({ ...formData, middleName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Reddy"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Father Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Father's full name"
                  value={formData.fatherName}
                  onChange={e => setFormData({ ...formData, fatherName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mother Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mother's full name"
                  value={formData.motherName}
                  onChange={e => setFormData({ ...formData, motherName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Gender *
                </label>
                <div className="flex items-center gap-4 pt-2 text-xs">
                  {['Male', 'Female', 'Others'].map(g => (
                    <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={() => setFormData({ ...formData, gender: g as any })}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10 digit mobile"
                  value={formData.mobile}
                  onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dob}
                  onChange={e => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Permanent Residential Address *
              </label>
              <input
                type="text"
                required
                placeholder="Door No, Street, Village/Town, Mandal, District & Pincode"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Academic Records */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              2. Academic Background
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  10th / SSC School Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="High School Name, Town"
                  value={formData.sscSchool}
                  onChange={e => setFormData({ ...formData, sscSchool: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  12th / Intermediate Junior College Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Junior College Name, Location"
                  value={formData.interCollege}
                  onChange={e => setFormData({ ...formData, interCollege: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Course Choice & Technical Interests */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              3. Desired Degree & Skills
            </h3>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Select Undergraduate Course *
              </label>
              <select
                value={formData.course}
                onChange={e => setFormData({ ...formData, course: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                <option value="BCA-AI">BCA - Artificial Intelligence (Autonomous Flagship)</option>
                <option value="BCA-H">BCA (Honours in Computer Applications)</option>
                <option value="BSC">B.Sc. (Computer Science - MPCS / MECS / MSCS)</option>
                <option value="BBA">BBA (Bachelor of Business Administration)</option>
                <option value="BCOM">B.Com. (Computer Applications / General)</option>
                <option value="BSW">BSW (Bachelor of Social Work)</option>
                <option value="BA">B.A. (History, Economics, Political Science)</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Technical Interests & Existing Skills (Select all that apply):
              </label>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map(skill => (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      formData.skills.includes(skill)
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {formData.skills.includes(skill) ? '✓ ' : '+ '}
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="reset"
              onClick={() => {
                setFormData({
                  firstName: '',
                  middleName: '',
                  lastName: '',
                  fatherName: '',
                  motherName: '',
                  gender: 'Male',
                  mobile: '',
                  email: '',
                  dob: '',
                  address: '',
                  sscSchool: '',
                  sscMarks: '',
                  interCollege: '',
                  interMarks: '',
                  course: 'BCA-AI',
                  skills: []
                });
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              Reset Form
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Application...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Admission Form</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
