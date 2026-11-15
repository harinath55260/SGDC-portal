import React from 'react';
import { Home, CheckSquare, Award, Bell, User, Bot } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

interface MobileBottomNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenAI: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activePage, onNavigate, onOpenAI }) => {
  const { isAuthenticated, role } = useAuth();

  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 pt-1.5 shadow-2xl flex items-center justify-around"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      {/* Home */}
      <button
        onClick={() => onNavigate('home')}
        className={`flex-1 flex flex-col items-center py-1 px-1 rounded-xl text-[10px] font-medium transition-all active:scale-90 cursor-pointer ${
          activePage === 'home'
            ? 'text-blue-600 dark:text-blue-400 font-extrabold'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <Home className={`w-5 h-5 mb-0.5 ${activePage === 'home' ? 'stroke-[2.5]' : ''}`} />
        <span className="truncate">Home</span>
      </button>

      {/* Attendance */}
      <button
        onClick={() => onNavigate(isAuthenticated ? 'student-attendance' : 'login')}
        className={`flex-1 flex flex-col items-center py-1 px-1 rounded-xl text-[10px] font-medium transition-all active:scale-90 cursor-pointer ${
          activePage === 'student-attendance'
            ? 'text-blue-600 dark:text-blue-400 font-extrabold'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <CheckSquare className={`w-5 h-5 mb-0.5 ${activePage === 'student-attendance' ? 'stroke-[2.5]' : ''}`} />
        <span className="truncate">Attendance</span>
      </button>

      {/* AI Center Action Button (Elevated) */}
      <div className="flex-1 flex justify-center">
        <button
          onClick={onOpenAI}
          className="flex flex-col items-center -mt-6 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white p-3 rounded-full shadow-lg shadow-blue-600/40 hover:scale-105 active:scale-95 transition-transform border-4 border-slate-50 dark:border-slate-950 cursor-pointer"
          title="College AI Assistant"
        >
          <Bot className="w-5 h-5" />
        </button>
      </div>

      {/* Results */}
      <button
        onClick={() => onNavigate(isAuthenticated ? 'student-results' : 'login')}
        className={`flex-1 flex flex-col items-center py-1 px-1 rounded-xl text-[10px] font-medium transition-all active:scale-90 cursor-pointer ${
          activePage === 'student-results'
            ? 'text-blue-600 dark:text-blue-400 font-extrabold'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <Award className={`w-5 h-5 mb-0.5 ${activePage === 'student-results' ? 'stroke-[2.5]' : ''}`} />
        <span className="truncate">Results</span>
      </button>

      {/* Profile / Portal */}
      <button
        onClick={() => onNavigate(isAuthenticated ? (role === 'student' ? 'student-profile' : `${role}-dashboard`) : 'login')}
        className={`flex-1 flex flex-col items-center py-1 px-1 rounded-xl text-[10px] font-medium transition-all active:scale-90 cursor-pointer ${
          activePage.includes('dashboard') || activePage.includes('profile') || activePage === 'login'
            ? 'text-blue-600 dark:text-blue-400 font-extrabold'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <User className={`w-5 h-5 mb-0.5 ${activePage.includes('dashboard') || activePage.includes('profile') || activePage === 'login' ? 'stroke-[2.5]' : ''}`} />
        <span className="truncate">{isAuthenticated ? 'Portal' : 'Login'}</span>
      </button>
    </div>
  );
};
