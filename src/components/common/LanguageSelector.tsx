import React from 'react';
import { useLanguage, LanguageCode } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative inline-flex items-center">
      <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2 pointer-events-none" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as LanguageCode)}
        className="pl-7 pr-2 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none"
      >
        <option value="en">English</option>
        <option value="te">తెలుగు (Telugu)</option>
        <option value="hi">हिंदी (Hindi)</option>
      </select>
    </div>
  );
};
