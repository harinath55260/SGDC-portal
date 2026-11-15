import React, { useState } from 'react';
import { usePWA } from '../../hooks/usePWA';
import { Download, Smartphone, X, CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export const PWAInstallBanner: React.FC = () => {
  const { 
    isInstalled, 
    installApp, 
    showAndroidGuide, 
    setShowAndroidGuide, 
    showAutoInstallPrompt, 
    dismissPrompt 
  } = usePWA();
  const [minimized, setMinimized] = useState(false);

  // If already installed, don't show install prompts
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* 1. AUTO-OPEN IMMEDIATE INSTALL NOTIFICATION MODAL / BOTTOM SHEET (Opens instantly on app open) */}
      {showAutoInstallPrompt && !minimized && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 sm:p-7 border border-blue-400/40 dark:border-slate-700 shadow-2xl relative space-y-5 animate-slide-up">
            
            {/* Close / Dismiss */}
            <button
              onClick={dismissPrompt}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              title="Dismiss / తర్వాత చూడండి"
            >
              <X className="w-5 h-5" />
            </button>

            {/* App Branding & Notification Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 p-2 shadow-lg shadow-blue-600/30 flex items-center justify-center shrink-0 border-2 border-white dark:border-slate-800">
                <img 
                  src="/college1-logo.png" 
                  alt="SGDC Logo" 
                  className="w-full h-full object-contain" 
                  onError={(e) => {
                    // Fallback to icon if logo fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex-1 pr-6">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wide">
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                  <span>Official Android App • 100% Free</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white font-outfit leading-tight mt-1">
                  Shri Gnanambica College
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Digital Campus Mobile App (Autonomous)
                </p>
              </div>
            </div>

            {/* Value Proposition in Telugu & English */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/80 dark:to-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-4 text-xs space-y-2">
              <div className="font-extrabold text-blue-900 dark:text-blue-200 flex items-center gap-1.5 text-sm">
                <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>ఈ యాప్‌ను మీ మొబైల్ లో ఇన్‌స్టాల్ చేసుకోండి</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                ప్లే స్టోర్ తో పనిలేకుండా ఒకే క్లిక్ తో మీ ఫోన్ లో ఇన్‌స్టాల్ అవుతుంది. అటెండెన్స్, ఎగ్జామ్ రిజల్ట్స్, నోటీసులు మరియు ఆఫ్ లైన్ పోర్టల్ ను వేగంగా పొందండి.
              </p>
              <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-semibold text-blue-800 dark:text-blue-300">
                <span className="flex items-center gap-1">✓ One-Tap Instant Launch</span>
                <span className="flex items-center gap-1">✓ Works 100% Offline</span>
                <span className="flex items-center gap-1">✓ Live Exam Alerts</span>
                <span className="flex items-center gap-1">✓ Zero Memory Usage</span>
              </div>
            </div>

            {/* ONE-CLICK INSTALL PRIMARY ACTION BUTTON */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  installApp();
                }}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 active:scale-98 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-blue-600/40 transition-all cursor-pointer ring-4 ring-blue-500/20 animate-pulse"
              >
                <Download className="w-5 h-5 text-white" />
                <span>⚡ 1-Click Install Now / ఇప్పుడే ఇన్‌స్టాల్ చేయండి</span>
              </button>

              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  onClick={() => setShowAndroidGuide(true)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>How to install? (సహాయం)</span>
                </button>

                <button
                  onClick={dismissPrompt}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium py-1 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  తర్వాత (Continue to Web)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. STICKY TOP NOTIFICATION BANNER (Mobile Screen Top Notice Bar) */}
      <div className="md:hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-3 py-2 border-b border-blue-500/40 shadow-sm flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="font-bold truncate text-[11px]">
            📲 Install SGDC Mobile App • 1-క్లిక్ ఇన్‌స్టాల్
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={installApp}
            className="px-2.5 py-1 bg-blue-500 hover:bg-blue-400 active:scale-95 text-white rounded-lg text-[11px] font-black shadow-xs flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3 h-3" />
            <span>Install</span>
          </button>
        </div>
      </div>

      {/* 3. STEP-BY-STEP ANDROID & MOBILE INSTALLATION GUIDE MODAL */}
      {showAndroidGuide && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-6">
            <button
              onClick={() => setShowAndroidGuide(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg p-2 shrink-0">
                <img src="/college1-logo.png" alt="SGDC Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Android App & PWA
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white font-outfit">
                  SGDC College App
                </h3>
                <p className="text-xs text-slate-500">
                  Shri Gnanambica Degree College (Autonomous)
                </p>
              </div>
            </div>

            {/* Telugu & English instruction badge */}
            <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-3.5 text-xs text-blue-900 dark:text-blue-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-blue-700 dark:text-blue-300">
                <ShieldCheck className="w-4 h-4" />
                <span>ఆండ్రాయిడ్ ఫోన్ లో యాప్ ఇన్‌స్టాల్ చేసుకునే విధానం:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                కింది 3 సులభమైన దశలతో మీ ఫోన్ హోమ్ స్క్రీన్‌పై సాధారణ ఆండ్రాయిడ్ యాప్ లాగా ఇన్‌స్టాల్ చేసుకోండి:
              </p>
            </div>

            {/* Step-by-step Android installation instructions */}
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    Chrome Browser లో 3 చుక్కలు (⋮) నొక్కండి
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Tap the <strong>three dots menu (⋮)</strong> at top right corner of Chrome browser.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    "Install app" లేదా "Add to Home screen" ఎంచుకోండి
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    "Install" బటన్ నొక్కండి
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    యాప్ మీ ఫోన్ హోమ్ స్క్రీన్‌పై ఐకాన్‌గా వెంటనే సేవ్ అవుతుంది!
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setShowAndroidGuide(false);
                  installApp();
                }}
                className="flex-1 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>⚡ 1-Click Install Now</span>
              </button>
              <button
                onClick={() => setShowAndroidGuide(false)}
                className="py-3.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

