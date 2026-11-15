import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { User, Phone, Mail, MapPin, Calendar, BookOpen, Shield, Save, CheckCircle2, Lock } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface StudentProfileProps {
  onBack?: () => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({ onBack }) => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useNotification();

  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [address, setAddress] = useState(user?.address || 'Gandhi Road, Madanapalle, Andhra Pradesh - 517325');
  const [guardianPhone, setGuardianPhone] = useState(user?.guardianPhone || '+91 94400 98765');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ phone, address, guardianPhone });
    setIsEditing(false);
    showToast('Your contact and address details have been saved!', 'success', 'Profile Updated');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Student Profile
        </span>
      </div>

      {/* Header */}
      <div>
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          Official Institutional Record
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-outfit mt-2">
          Student Profile Dossier
        </h1>
        <p className="text-xs text-slate-500">
          Shri Gnanambica Degree College (Autonomous), Madanapalle
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        
        {/* Top Info Banner */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100 dark:border-slate-800 text-center sm:text-left">
          <div className="w-24 h-24 rounded-3xl bg-blue-600 text-white font-black text-3xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            {user?.name?.charAt(0) || 'H'}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-outfit">
                {user?.name || 'K. Harinath'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                Verified Student
              </span>
            </div>
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              {user?.course || 'BCA - Artificial Intelligence'} • 3rd Year (Sem 6)
            </p>
            <p className="text-xs text-slate-400">
              Department of Computer Science • Autonomous Regulation Batch 2023-26
            </p>
          </div>
        </div>

        {/* Read-Only Academic Credentials (Locked for integrity) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              Academic Credentials (Read Only)
            </h3>
            <span className="text-[10px] text-slate-400">Maintained by College Administration</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-[10px] uppercase font-bold text-slate-400">Student ID</div>
              <div className="text-sm font-black font-mono text-slate-900 dark:text-white mt-0.5">
                {user?.studentId || 'SGDC22BCA042'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-[10px] uppercase font-bold text-slate-400">University Roll No</div>
              <div className="text-sm font-black font-mono text-slate-900 dark:text-white mt-0.5">
                {user?.rollNo || '22042BCA'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-[10px] uppercase font-bold text-slate-400">Program / Degree</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                BCA (Artificial Intelligence)
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-[10px] uppercase font-bold text-slate-400">Admission Year</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                2023 - 2026 Batch
              </div>
            </div>
          </div>
        </div>

        {/* Editable Personal & Contact Information */}
        <form onSubmit={handleSave} className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Contact & Residential Information
            </h3>
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Edit Permitted Information
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Institutional Email
              </label>
              <input
                type="email"
                disabled
                value={user?.email || 'harinath@sgnanambica.edu.in'}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/40 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Mobile Number
              </label>
              <input
                type="tel"
                disabled={!isEditing}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className={`w-full px-3.5 py-2 text-xs rounded-xl border ${
                  isEditing 
                    ? 'border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white' 
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Father / Guardian Name
              </label>
              <input
                type="text"
                disabled
                value={user?.fatherName || 'K. Ramamurthy'}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/40 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Parent / Guardian Contact Phone
              </label>
              <input
                type="tel"
                disabled={!isEditing}
                value={guardianPhone}
                onChange={e => setGuardianPhone(e.target.value)}
                className={`w-full px-3.5 py-2 text-xs rounded-xl border ${
                  isEditing 
                    ? 'border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white' 
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Residential Address
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={address}
              onChange={e => setAddress(e.target.value)}
              className={`w-full px-3.5 py-2 text-xs rounded-xl border ${
                isEditing 
                  ? 'border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white' 
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
              }`}
            />
          </div>

          {isEditing && (
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          )}
        </form>

      </div>

    </div>
  );
};
