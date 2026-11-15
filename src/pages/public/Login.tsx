import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { UserRole } from '../../types';
import { 
  LogIn, Lock, Mail, ShieldCheck, UserCheck, 
  GraduationCap, Users, ShieldAlert, Sparkles, RefreshCw 
} from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface LoginProps {
  onNavigate: (page: string) => void;
  onBack?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate, onBack }) => {
  const { loginWithEmail, loginWithGoogle, loginAsDemoRole, isLoading } = useAuth();
  const { showToast } = useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const ok = await loginWithEmail(email, password || 'password123');
    if (ok) {
      showToast(`Welcome! Logged in successfully.`, 'success', 'Portal Access');
      redirectToRole(selectedRole);
    }
  };

  const handleGoogleLogin = async () => {
    const ok = await loginWithGoogle();
    if (ok) {
      showToast(`Logged in with Google account!`, 'success', 'Google Authentication');
      onNavigate('student-dashboard');
    }
  };

  const handleQuickRole = (role: UserRole) => {
    loginAsDemoRole(role);
    showToast(`Logged in as ${role.toUpperCase()} (Demo Mode)`, 'info', 'Quick Role Switcher');
    redirectToRole(role);
  };

  const redirectToRole = (role: UserRole) => {
    switch (role) {
      case 'student': onNavigate('student-dashboard'); break;
      case 'faculty': onNavigate('faculty-dashboard'); break;
      case 'parent': onNavigate('parent-dashboard'); break;
      case 'admin': onNavigate('admin-dashboard'); break;
      default: onNavigate('student-dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6">
      
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium">
          Digital Campus Login
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-outfit">
          College Portal Login
        </h1>
        <p className="text-xs text-slate-500">
          Shri Gnanambica Degree College (Autonomous) Digital Campus
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        {/* Role Selector Tabs */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Select Your Role
          </label>
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            {(['student', 'faculty', 'parent', 'admin'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setSelectedRole(r);
                  if (r === 'student') setEmail('harinath@sgnanambica.edu.in');
                  else if (r === 'faculty') setEmail('mahesh@sgnanambica.edu.in');
                  else if (r === 'parent') setEmail('parent.harinath@sgnanambica.edu.in');
                  else if (r === 'admin') setEmail('admin@sgnanambica.edu.in');
                }}
                className={`py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                  selectedRole === r
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Institutional Email / ID
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={`${selectedRole}@sgnanambica.edu.in`}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Authenticating with Firebase...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to {selectedRole.toUpperCase()} Portal</span>
              </>
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
          <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-semibold text-slate-400 absolute">
            OR
          </span>
        </div>

        {/* Google Authentication Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 px-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2.5 shadow-2xs transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 10.02 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* 1-Click Instant Demo Role Access */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            1-Click Quick Demo Login:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickRole('student')}
              className="p-2 text-left bg-blue-50 dark:bg-blue-950/60 rounded-xl border border-blue-200 dark:border-blue-900 text-xs font-semibold text-blue-900 dark:text-blue-300 hover:bg-blue-100 transition-colors"
            >
              🎓 Student: K. Harinath
            </button>
            <button
              onClick={() => handleQuickRole('faculty')}
              className="p-2 text-left bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-900 text-xs font-semibold text-emerald-900 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
            >
              👨‍🏫 Faculty: Mahesh Sir (HOD)
            </button>
            <button
              onClick={() => handleQuickRole('parent')}
              className="p-2 text-left bg-purple-50 dark:bg-purple-950/60 rounded-xl border border-purple-200 dark:border-purple-900 text-xs font-semibold text-purple-900 dark:text-purple-300 hover:bg-purple-100 transition-colors"
            >
              👨‍👩‍👧 Parent: K. Ramamurthy
            </button>
            <button
              onClick={() => handleQuickRole('admin')}
              className="p-2 text-left bg-rose-50 dark:bg-rose-950/60 rounded-xl border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-900 dark:text-rose-300 hover:bg-rose-100 transition-colors"
            >
              ⚙️ Admin: College Admin
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
