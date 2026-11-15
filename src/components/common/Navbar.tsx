import React, { useState } from 'react';
import { 
  Menu, X, Search, Bell, LogIn, LogOut, LayoutDashboard, 
  ChevronDown, GraduationCap, Phone, MapPin, User, ShieldCheck,
  Smartphone, Download
} from 'lucide-react';
import { COLLEGE_INFO } from '../../services/collegeData';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { usePWA } from '../../hooks/usePWA';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenSearch: () => void;
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, onOpenSearch, onOpenAI }) => {
  const { user, isAuthenticated, logout, role } = useAuth();
  const { t } = useLanguage();
  const { unreadCount, notifications, markAsRead } = useNotification();
  const { isInstalled, installApp } = usePWA();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'academics', label: t('nav.academics') },
    { id: 'departments', label: t('nav.departments') },
    { id: 'courses', label: t('nav.courses') },
    { id: 'committees', label: 'Committees & Cells' },
    { id: 'admissions', label: t('nav.admissions') },
    { id: 'campus', label: t('nav.campus') },
    { id: 'sports', label: t('nav.sports') },
    { id: 'placements', label: t('nav.placements') },
    { id: 'events', label: t('nav.events') },
    { id: 'notices', label: t('nav.notices') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const handleLinkClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  const getDashboardTarget = () => {
    if (!role) return 'login';
    switch (role) {
      case 'student': return 'student-dashboard';
      case 'faculty': return 'faculty-dashboard';
      case 'parent': return 'parent-dashboard';
      case 'admin': return 'admin-dashboard';
      default: return 'student-dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white text-xs py-1.5 px-4 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-blue-200">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            Madanapalle, Andhra Pradesh (Autonomous)
          </span>
          <span className="flex items-center gap-1.5 text-blue-200">
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            {COLLEGE_INFO.phone.split('/')[0]}
          </span>
          <span className="text-amber-300 font-medium bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
            ★ NAAC Accredited • Affiliated to SVU
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-300">
            Founder & Correspondent: <strong className="text-white">Sri R. Guru Prasad</strong>
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">
            Developer: <a href="https://github.com/harinath55260" target="_blank" rel="noreferrer" className="text-blue-300 hover:underline">K. Harinath</a>
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & College Identity */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0 min-w-0"
          >
            <img 
              src="/college1-logo.png" 
              alt="Shri Gnanambica Degree College Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-xl shadow-xs group-hover:scale-105 transition-transform shrink-0"
              onError={(e) => {
                // fallback if image not ready
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="min-w-0">
              <div className="text-sm sm:text-base md:text-lg font-black tracking-tight text-blue-950 dark:text-blue-200 font-outfit leading-tight truncate">
                <span className="sm:hidden">SGDC College</span>
                <span className="hidden sm:inline">Shri Gnanambica Degree College</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span className="bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 px-1.5 py-0.2 rounded uppercase text-[9px] sm:text-[10px] tracking-wider font-bold">
                  Autonomous
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-normal text-[11px] hidden sm:inline">
                  Madanapalle
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.slice(0, 8).map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activePage === link.id
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Dropdown for More Links */}
            <div className="relative group">
              <button className="px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1">
                More <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full right-0 mt-1 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-1.5 hidden group-hover:block animate-fade-in">
                {navLinks.slice(8).map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className="w-full text-left px-3 py-2 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Direct 1-Click Install App Button (Visible on mobile & desktop if not installed) */}
            {!isInstalled && (
              <button
                onClick={installApp}
                className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-extrabold text-[11px] sm:text-xs flex items-center gap-1 shadow-xs transition-all cursor-pointer animate-pulse"
                title="Install Android App / యాప్ ఇన్‌స్టాల్"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
            )}

            {/* Search Trigger (Desktop/Tablet) */}
            <button
              onClick={onOpenSearch}
              title="Search College Portal"
              className="hidden sm:flex p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Selector */}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notifDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-scale-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                      Notifications ({unreadCount} new)
                    </span>
                    <button 
                      onClick={() => setNotifDropdownOpen(false)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Close
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.slice(0, 4).map((n) => (
                      <div 
                        key={n.id}
                        onClick={() => {
                          markAsRead(n.id);
                          if (n.link) onNavigate(n.link);
                          setNotifDropdownOpen(false);
                        }}
                        className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                          n.read 
                            ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300' 
                            : 'bg-blue-50/80 dark:bg-blue-950/60 text-slate-800 dark:text-slate-100 font-medium border-l-2 border-blue-600'
                        }`}
                      >
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{n.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{n.message}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{n.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Auth / Dashboard Button */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 hover:border-blue-400 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1 leading-none">
                      {user.name}
                    </div>
                    <span className="text-[10px] uppercase font-semibold text-blue-600 dark:text-blue-400">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-scale-in">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{user.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                      <span className="inline-block mt-1 text-[10px] bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full font-semibold capitalize">
                        {user.role} Portal
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onNavigate(getDashboardTarget());
                        setUserMenuOpen(false);
                      }}
                      className="w-full mt-1.5 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-500" />
                      Dashboard
                    </button>

                    {user.role === 'student' && (
                      <button
                        onClick={() => {
                          onNavigate('student-profile');
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600"
                      >
                        <User className="w-4 h-4 text-indigo-500" />
                        My Profile
                      </button>
                    )}

                    <button
                      onClick={async () => {
                        await logout();
                        setUserMenuOpen(false);
                        onNavigate('home');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Portal</span> Login
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto animate-slide-down">
          {/* Quick Android App Install banner in mobile menu */}
          {!isInstalled && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                installApp();
              }}
              className="w-full mb-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>Install Official Android App (యాప్ ఇన్‌స్టాల్)</span>
            </button>
          )}

          {/* Quick AI & Search Bar */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs flex items-center gap-2"
            >
              <Search className="w-3.5 h-3.5 text-blue-500" /> Search portal...
            </button>
            <div className="shrink-0">
              <LanguageSelector />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pb-4 border-b border-slate-100 dark:border-slate-800">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  activePage === link.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Quick Portal Switcher for Testing */}
          <div className="mt-4 pt-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Quick Role Portals
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { onNavigate('student-dashboard'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded-xl bg-blue-50 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-blue-900 dark:text-blue-300 font-semibold"
              >
                🎓 Student Portal
              </button>
              <button
                onClick={() => { onNavigate('faculty-dashboard'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded-xl bg-emerald-50 dark:bg-slate-800/80 border border-emerald-200 dark:border-slate-700 text-xs text-emerald-900 dark:text-emerald-300 font-semibold"
              >
                👨‍🏫 Faculty Portal
              </button>
              <button
                onClick={() => { onNavigate('parent-dashboard'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded-xl bg-purple-50 dark:bg-slate-800/80 border border-purple-200 dark:border-slate-700 text-xs text-purple-900 dark:text-purple-300 font-semibold"
              >
                👨‍👩‍👧 Parent Portal
              </button>
              <button
                onClick={() => { onNavigate('admin-dashboard'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded-xl bg-rose-50 dark:bg-slate-800/80 border border-rose-200 dark:border-slate-700 text-xs text-rose-900 dark:text-rose-300 font-semibold"
              >
                ⚙️ Admin Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
