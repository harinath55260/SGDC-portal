import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Award, BookOpen, Users, Briefcase, Trophy, 
  Sparkles, CheckCircle2, ChevronRight, Calendar, Bell, 
  MapPin, Clock, ArrowUpRight, ShieldCheck, HeartHandshake, PhoneCall,
  Smartphone, Download, ZoomIn, X
} from 'lucide-react';
import { 
  COLLEGE_INFO, DEPARTMENTS, COURSES, NOTICES, EVENTS, 
  PLACEMENTS, CAMPUS_FACILITIES, SPORTS_ITEMS 
} from '../../services/collegeData';
import { useLanguage } from '../../context/LanguageContext';
import { usePWA } from '../../hooks/usePWA';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
  onOpenAI: () => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onOpenAI }) => {
  const { t } = useLanguage();
  const { installApp, isInstalled } = usePWA();
  const [zoomPhoto, setZoomPhoto] = useState<{ src: string; name: string; title: string } | null>(null);
  
  // Real slideshow images from original repository
  const heroSlides = [
    { url: '/images/college4.jpg', title: 'Main Academic Autonomous Campus', desc: 'State-of-the-art facilities for undergraduate excellence' },
    { url: '/images/college1.jpg', title: 'Modern Infrastructure & Classrooms', desc: 'Equipped with digital smart boards and high-speed Wi-Fi' },
    { url: '/images/college5.jpg', title: 'Cutting-Edge AI & Computer Labs', desc: 'High-performance computing for BCA-AI and Data Science' },
    { url: '/images/college6.jpg', title: 'Comprehensive Digital Library', desc: 'Over 35,000 reference volumes and IEEE digital subscriptions' },
    { url: '/images/college7.jpg', title: 'Collaborative Learning & Research', desc: 'Fostering innovation, skill building and teamwork' }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[580px] lg:min-h-[640px] flex items-center">
        {/* Slideshow background with crossfade */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
              } transform duration-7000`}
            >
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="max-w-3xl space-y-6">
            
            {/* Accreditation Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 backdrop-blur-md text-blue-300 text-xs font-semibold animate-fade-in">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                <span>{COLLEGE_INFO.society} • Estd. 1999 • NAAC & ISO Certified</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 backdrop-blur-md text-amber-300 text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>Top Biotech Institute of the Year 2025</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-outfit tracking-tight text-white leading-tight">
              Shri Gnanambica <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
                Degree College
              </span>
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-lg sm:text-xl font-medium text-slate-200 font-sans">
              (Autonomous) — Near R.T.C. Bus Stand, Madanapalle
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Permanently affiliated with Sri Venkateswara University (SVU), Tirupati. Offering 16 versatile undergraduate and postgraduate degrees with cutting-edge Biotechnology and AI laboratories, experienced doctorates, vibrant sports culture, and premier career placements.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={() => onNavigate('admissions')}
                className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{t('hero.btnAdmissions')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('login')}
                className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <span>{t('hero.btnLogin')}</span>
                <Users className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAI}
                className="w-full sm:w-auto justify-center px-5 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Ask College AI</span>
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="pt-6 flex items-center gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-blue-400' : 'w-2 bg-white/30'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
              <span className="text-xs text-slate-400 ml-2">
                {heroSlides[currentSlide].title}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* URGENT TICKER / NOTICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2.5 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 px-3.5 py-1.5 rounded-xl font-bold text-xs shrink-0 border border-rose-200 dark:border-rose-900">
            <Bell className="w-4 h-4 animate-bounce" />
            <span>Official Notice</span>
          </div>

          <div className="flex-1 text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium truncate">
            <strong>{NOTICES[0].title}</strong> — {NOTICES[0].description}
          </div>

          <button
            onClick={() => onNavigate('notices')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Notices</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* STATS OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {COLLEGE_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-400 transition-all text-center group"
            >
              <div className="text-2xl sm:text-3xl font-black text-blue-900 dark:text-blue-300 font-outfit group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ANDROID APP INSTALL PROMO SECTION */}
      {!isInstalled && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-blue-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 w-full md:w-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-2.5 flex items-center justify-center shrink-0 shadow-inner">
                <img src="/college1-logo.png" alt="SGDC Logo" className="w-full h-full object-contain" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Official Android App Ready • 100% Free</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-outfit text-white">
                  Download Official Android App (ఆండ్రాయిడ్ యాప్)
                </h3>
                <p className="text-xs sm:text-sm text-blue-200 max-w-xl leading-relaxed">
                  ఒకే క్లిక్‌తో మీ ఫోన్‌లో ఇన్‌స్టాల్ చేసుకోండి. అటెండెన్స్, ఎగ్జామ్ రిజల్ట్స్, నోటీసులు మరియు ఆఫ్ లైన్ పోర్టల్ ను పొందండి.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={installApp}
                className="w-full md:w-auto px-6 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 active:scale-95 text-white font-black text-sm rounded-2xl shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer ring-4 ring-emerald-500/20"
              >
                <Download className="w-5 h-5" />
                <span>⚡ 1-Click Install App (ఇప్పుడే ఇన్‌స్టాల్ చేయండి)</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* LEADERSHIP SECTION: CORRESPONDENT & PRINCIPAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
            Visionary Leadership • కళాశాల పాలకవర్గం & నాయకత్వం
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-outfit">
            Guiding Minds Towards Excellence
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            కళాశాల వ్యవస్థాపక కరస్పాండెంట్ మరియు ప్రిన్సిపాల్ గారి సమర్థవంతమైన మార్గదర్శకత్వంలో విద్యార్థుల ఉజ్వల భవిష్యత్తుకు భరోసా.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Correspondent Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-blue-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all flex flex-col sm:flex-row gap-6 items-center sm:items-start group">
            {/* Correspondent Photo Frame - Uncropped full display */}
            <div 
              onClick={() => setZoomPhoto({ src: '/correspondent.jpg', name: COLLEGE_INFO.correspondent.honorificName, title: COLLEGE_INFO.correspondent.title })}
              className="w-full sm:w-64 shrink-0 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border-2 border-blue-500/40 shadow-md relative group/photo cursor-pointer flex flex-col items-center justify-center p-2.5"
              title="Click to view full photo / పూర్తి ఫోటో చూడండి"
            >
              <div className="w-full h-52 sm:h-56 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-blue-100 dark:border-slate-700/60 p-1">
                <img
                  src="/correspondent.jpg"
                  alt={COLLEGE_INFO.correspondent.name}
                  className="w-full h-full object-contain object-center rounded-lg group-hover/photo:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallbackCount) {
                      target.dataset.fallbackCount = '1';
                      target.src = '/images/correspondent.jpg';
                    } else if (target.dataset.fallbackCount === '1') {
                      target.dataset.fallbackCount = '2';
                      target.src = '/correspondent.png';
                    }
                  }}
                />
              </div>
              <div className="mt-2.5 text-center w-full">
                <div className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                  Dr. R. Guru Prasad Sir
                </div>
                <div className="text-[11px] text-blue-600 dark:text-blue-400 font-bold mt-0.5">
                  కరస్పాండెంట్ & సెక్రటరీ
                </div>
                <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-300 font-bold bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                  <ZoomIn className="w-3 h-3" /> View Photo (పూర్తి ఫోటో)
                </div>
              </div>
            </div>

            <div className="space-y-3 text-center sm:text-left flex-1">
              <div>
                <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md">
                  {COLLEGE_INFO.correspondent.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-outfit mt-1.5">
                  {COLLEGE_INFO.correspondent.name}
                </h3>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {COLLEGE_INFO.correspondent.societyTitle}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {COLLEGE_INFO.correspondent.message}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer"
                >
                  <span>Read Full Vision & Leadership Message</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Principal Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-indigo-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all flex flex-col sm:flex-row gap-6 items-center sm:items-start group">
            {/* Principal Photo Frame */}
            <div 
              onClick={() => setZoomPhoto({ src: '/principal.jpg', name: COLLEGE_INFO.principal.name, title: COLLEGE_INFO.principal.title })}
              className="w-full sm:w-64 shrink-0 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border-2 border-indigo-500/40 shadow-md relative group/photo cursor-pointer flex flex-col items-center justify-center p-2.5"
              title="Click to view full photo / పూర్తి ఫోటో చూడండి"
            >
              <div className="w-full h-52 sm:h-56 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-indigo-100 dark:border-slate-700/60 p-1">
                <img
                  src="/principal.jpg"
                  alt={COLLEGE_INFO.principal.name}
                  className="w-full h-full object-contain object-top rounded-lg group-hover/photo:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallbackCount) {
                      target.dataset.fallbackCount = '1';
                      target.src = '/images/principal.jpg';
                    }
                  }}
                />
              </div>
              <div className="mt-2.5 text-center w-full">
                <div className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                  {COLLEGE_INFO.principal.name}
                </div>
                <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">
                  ప్రిన్సిపాల్ (Principal) • {COLLEGE_INFO.principal.qualification}
                </div>
                <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-indigo-600 dark:text-indigo-300 font-bold bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                  <ZoomIn className="w-3 h-3" /> View Photo (పూర్తి ఫోటో)
                </div>
              </div>
            </div>

            <div className="space-y-3 text-center sm:text-left flex-1">
              <div>
                <span className="text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-md">
                  {COLLEGE_INFO.principal.title} • {COLLEGE_INFO.principal.qualification}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-outfit mt-1.5">
                  {COLLEGE_INFO.principal.name}
                </h3>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Head of the Institution • 20+ Years Teaching Excellence
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {COLLEGE_INFO.principal.message}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer"
                >
                  <span>Read Principal's Message</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
              Academic Programs
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-outfit">
              Degrees Designed for Modern Industry
            </h2>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Explore All 7+ Degree Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.slice(0, 4).map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-blue-400 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
                    {course.duration}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {course.seats} Seats
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {course.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {course.eligibility}
                </p>

                {course.highlights && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {course.highlights.slice(0, 3).map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Annual Fee</div>
                  <div className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                    ₹{course.feePerYear.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('admissions')}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEPARTMENTS SPOTLIGHT */}
      <section className="bg-slate-100/70 dark:bg-slate-900/60 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
              Departments of Excellence
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-outfit">
              Distinguished Academic Divisions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Empowered by passionate doctorates, professors, and industry researchers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((dept) => (
              <div
                key={dept.id}
                onClick={() => onNavigate('departments')}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-blue-500 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg">
                    {dept.code}
                  </span>
                  <span className="text-xs text-slate-400">
                    {dept.facultyCount} Faculty • {dept.labsCount} Labs
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {dept.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {dept.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    HOD: <strong>{dept.hodName}</strong>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS FACILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
              Campus Life & Infrastructure
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-outfit">
              Everything You Need to Thrive
            </h2>
          </div>
          <button
            onClick={() => onNavigate('campus')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View All Facilities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAMPUS_FACILITIES.map((fac) => (
            <div
              key={fac.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {fac.tag}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {fac.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {fac.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPORTS GALLERY (PRESERVED FROM ORIGINAL SITE) */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
                Athletics & Physical Fitness
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">
                Vibrant Sports Culture
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                Our college encourages students to participate in Cricket, Football, Volleyball, and Athletics. Sports cultivate team spirit, physical fitness, and leadership.
              </p>
            </div>
            <button
              onClick={() => onNavigate('sports')}
              className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View Sports Gallery (12+ Photos)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SPORTS_ITEMS.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="group relative rounded-xl overflow-hidden aspect-square border border-slate-800 shadow-md cursor-pointer"
                onClick={() => onNavigate('sports')}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-end">
                  <span className="text-[10px] text-white font-medium line-clamp-2">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLACEMENT PARTNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4 text-center lg:text-left">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800">
              Campus Placements 2026
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-outfit">
              92% Placement Rate in Leading MNCs
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Our dedicated Placement & Training cell conducts intensive aptitude, coding hackathons, soft-skills training, and pooled interview drives with industry leaders.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('placements')}
                className="px-6 py-3 bg-white text-blue-950 font-bold rounded-xl text-xs shadow-md hover:bg-blue-50 transition-colors"
              >
                Explore Placements Portal
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
            {PLACEMENTS.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-left"
              >
                <div className="text-xs font-bold text-white">{p.company}</div>
                <div className="text-[11px] text-blue-200 mt-0.5 line-clamp-1">{p.role}</div>
                <div className="text-xs font-extrabold text-amber-300 mt-2">{p.package}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION / ADMISSION FORM LINK */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
          Ready to Begin Your Journey at SGDC?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Admissions are now open for the 2026-27 Academic Year. Submit your online registration form or visit our Madanapalle campus for personal counseling.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onNavigate('admissions')}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
          >
            Fill Online Admission Form
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-sm rounded-xl transition-colors"
          >
            Visit Campus & Contact Us
          </button>
        </div>
      </section>

      {/* Leadership Photo Zoom Modal */}
      {zoomPhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in" onClick={() => setZoomPhoto(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800 max-h-[70vh]">
              <img
                src={zoomPhoto.src}
                alt={zoomPhoto.name}
                className="w-full h-auto max-h-[65vh] object-contain rounded-xl"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.attempt) {
                    target.dataset.attempt = '1';
                    target.src = './images/correspondent.jpg';
                  } else if (target.dataset.attempt === '1') {
                    target.dataset.attempt = '2';
                    target.src = './correspondent.png';
                  }
                }}
              />
            </div>

            <div className="text-center pt-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{zoomPhoto.title}</span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-outfit mt-0.5">{zoomPhoto.name}</h3>
              <p className="text-xs text-slate-500">Shri Gnanambica Degree College (Autonomous), Madanapalle</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
