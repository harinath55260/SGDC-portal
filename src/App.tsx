/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { ToastContainer } from './components/common/ToastContainer';
import { OfflineBanner } from './components/common/OfflineBanner';
import { PWAInstallBanner } from './components/common/PWAInstallBanner';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { AIChatDrawer } from './components/ai/AIChatDrawer';

// Public Pages
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { Academics } from './pages/public/Academics';
import { Departments } from './pages/public/Departments';
import { Courses } from './pages/public/Courses';
import { Committees } from './pages/public/Committees';
import { Admissions } from './pages/public/Admissions';
import { Campus } from './pages/public/Campus';
import { Sports } from './pages/public/Sports';
import { Placements } from './pages/public/Placements';
import { Events } from './pages/public/Events';
import { Notices } from './pages/public/Notices';
import { Gallery } from './pages/public/Gallery';
import { Contact } from './pages/public/Contact';
import { Login } from './pages/public/Login';

// Student Portal Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfile } from './pages/student/StudentProfile';
import { StudentAttendance } from './pages/student/StudentAttendance';
import { StudentResults } from './pages/student/StudentResults';
import { StudentFees } from './pages/student/StudentFees';
import { StudentTimetable } from './pages/student/StudentTimetable';
import { StudentAssignments } from './pages/student/StudentAssignments';
import { StudentMaterials } from './pages/student/StudentMaterials';

// Faculty, Parent & Admin Pages
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { ParentDashboard } from './pages/parent/ParentDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';

import { Bot, MessageSquare, ArrowLeft, Home as HomeIcon } from 'lucide-react';

function AppContent() {
  const { user, isAuthenticated, role } = useAuth();
  
  // Hash-based routing to ensure 100% compatibility with GitHub Pages (/college-website2026/#path)
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').trim();
    return hash || 'home';
  };

  const [activePage, setActivePage] = useState<string>(getInitialPage);
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.replace('#', '').trim();
      if (page) setActivePage(page);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleGoBack = () => {
    if (historyStack.length > 0) {
      const prev = historyStack[historyStack.length - 1];
      setHistoryStack(old => old.slice(0, -1));
      setActivePage(prev);
      window.location.hash = `#${prev}`;
    } else {
      setActivePage('home');
      window.location.hash = '#home';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: string, params?: any) => {
    // Role guard checks:
    if (page.startsWith('admin') && role !== 'admin') {
      setActivePage('login');
      window.location.hash = '#login';
      return;
    }

    if (page.startsWith('faculty') && role !== 'faculty' && role !== 'admin') {
      setActivePage('login');
      window.location.hash = '#login';
      return;
    }

    if (page.startsWith('parent') && role !== 'parent' && role !== 'admin') {
      setActivePage('login');
      window.location.hash = '#login';
      return;
    }

    if (page !== activePage) {
      setHistoryStack(prev => [...prev, activePage]);
    }

    setActivePage(page);
    window.location.hash = `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut: CMD+K or CTRL+K opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Render Page Switcher
  const renderPage = () => {
    switch (activePage) {
      // Public Pages
      case 'home':
        return <Home onNavigate={navigateTo} onOpenAI={() => setAiDrawerOpen(true)} />;
      case 'about':
        return <About onBack={handleGoBack} />;
      case 'academics':
        return <Academics onBack={handleGoBack} />;
      case 'departments':
        return <Departments onBack={handleGoBack} />;
      case 'courses':
        return <Courses onNavigate={navigateTo} onBack={handleGoBack} />;
      case 'committees':
        return <Committees onBack={handleGoBack} />;
      case 'admissions':
        return <Admissions onBack={handleGoBack} />;
      case 'campus':
        return <Campus onBack={handleGoBack} />;
      case 'sports':
        return <Sports onBack={handleGoBack} />;
      case 'placements':
        return <Placements onNavigate={navigateTo} onBack={handleGoBack} />;
      case 'events':
        return <Events onBack={handleGoBack} />;
      case 'notices':
        return <Notices onBack={handleGoBack} />;
      case 'gallery':
        return <Gallery onBack={handleGoBack} />;
      case 'contact':
        return <Contact onBack={handleGoBack} />;
      case 'login':
        return <Login onNavigate={navigateTo} onBack={handleGoBack} />;

      // Student Portal Pages
      case 'student-dashboard':
        return <StudentDashboard onNavigate={navigateTo} onOpenAI={() => setAiDrawerOpen(true)} onBack={handleGoBack} />;
      case 'student-profile':
        return <StudentProfile onBack={handleGoBack} />;
      case 'student-attendance':
        return <StudentAttendance onBack={handleGoBack} />;
      case 'student-results':
        return <StudentResults onBack={handleGoBack} />;
      case 'student-fees':
        return <StudentFees onBack={handleGoBack} />;
      case 'student-timetable':
        return <StudentTimetable onBack={handleGoBack} />;
      case 'student-assignments':
        return <StudentAssignments onBack={handleGoBack} />;
      case 'student-materials':
        return <StudentMaterials onBack={handleGoBack} />;

      // Other Role Dashboards
      case 'faculty-dashboard':
        return <FacultyDashboard onBack={handleGoBack} />;
      case 'parent-dashboard':
        return <ParentDashboard onBack={handleGoBack} />;
      case 'admin-dashboard':
        return <AdminDashboard onBack={handleGoBack} />;

      default:
        return <Home onNavigate={navigateTo} onOpenAI={() => setAiDrawerOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-blue-600 selection:text-white">
      
      {/* Offline Alert Banner if network drops */}
      <OfflineBanner />

      {/* Global Navigation Bar */}
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenAI={() => setAiDrawerOpen(true)}
      />

      {/* Prominent Back Arrow Sub-Bar for Each Opened Page */}
      {activePage !== 'home' && (
        <div className="sticky top-18 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-blue-200/60 dark:border-slate-800 py-2.5 px-4 sm:px-6 lg:px-8 shadow-xs animate-fade-in">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md group cursor-pointer active:scale-95"
              title="Go back to previous page / వెనుకకు వెళ్లండి"
              aria-label="Go back to previous page"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>← Back / వెనుకకు</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <button 
                onClick={() => navigateTo('home')}
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <HomeIcon className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <span>/</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold capitalize">
                {activePage.replace('-', ' ')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Quick Back Button (Always accessible when scrolling any non-home page) */}
      {activePage !== 'home' && (
        <button
          onClick={handleGoBack}
          className="fixed bottom-20 left-4 z-40 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-3.5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs sm:text-sm border-2 border-white/30 backdrop-blur-sm transition-all group cursor-pointer hover:shadow-blue-500/30"
          title="Go back / వెనుకకు వెళ్లండి"
          aria-label="Back to previous page"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
      )}

      {/* Main Content Area - with mobile bottom safe padding so bottom nav doesn't cover content */}
      <main className="flex-1 pb-24 md:pb-0">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Mobile Bottom Navigation (Visible on mobile screens) */}
      <MobileBottomNav
        activePage={activePage}
        onNavigate={navigateTo}
        onOpenAI={() => setAiDrawerOpen(true)}
      />

      {/* Floating AI Assistant Trigger (Desktop) */}
      <button
        onClick={() => setAiDrawerOpen(true)}
        className="hidden md:flex fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white p-3.5 rounded-full shadow-2xl items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group border-2 border-white dark:border-slate-800"
        title="Open Shri Gnanambica College AI Assistant"
      >
        <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold pr-1">Ask College AI</span>
      </button>

      {/* AI Assistant Drawer Modal */}
      <AIChatDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={navigateTo}
      />

      {/* PWA Install Banner */}
      <PWAInstallBanner />

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
