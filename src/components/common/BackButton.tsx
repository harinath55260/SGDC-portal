import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, label = 'Back', className = '' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '#home';
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-xs sm:text-sm transition-all shadow-xs group cursor-pointer ${className}`}
      aria-label="Go back to previous page"
    >
      <ArrowLeft className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-white group-hover:-translate-x-1 transition-transform" />
      <span>← {label}</span>
    </button>
  );
};
