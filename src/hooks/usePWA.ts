import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showAndroidGuide, setShowAndroidGuide] = useState(false);
  const [showAutoInstallPrompt, setShowAutoInstallPrompt] = useState(false);

  useEffect(() => {
    // Check if already in standalone display mode
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://');

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Auto-prompt notification on mobile / browser open if not already dismissed in this session
    const hasDismissed = sessionStorage.getItem('sgdc_install_dismissed') === 'true';
    if (!hasDismissed) {
      const timer = setTimeout(() => {
        setShowAutoInstallPrompt(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setIsInstallable(true);

      // If user hasn't dismissed, make sure the install prompt is visible
      const hasDismissed = sessionStorage.getItem('sgdc_install_dismissed') === 'true';
      if (!hasDismissed) {
        setShowAutoInstallPrompt(true);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      setShowAutoInstallPrompt(false);
      setShowAndroidGuide(false);
      sessionStorage.setItem('sgdc_install_dismissed', 'true');
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.warn('ServiceWorker registration error:', err);
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const installApp = useCallback(async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          setShowAutoInstallPrompt(false);
          setShowAndroidGuide(false);
        }
        setDeferredPrompt(null);
        setIsInstallable(false);
      } catch (e) {
        console.warn('Install prompt error:', e);
        setShowAndroidGuide(true);
      }
    } else {
      // If browser has not fired beforeinstallprompt yet or iOS/older Chrome
      setShowAndroidGuide(true);
    }
  }, [deferredPrompt]);

  const dismissPrompt = useCallback(() => {
    setShowAutoInstallPrompt(false);
    sessionStorage.setItem('sgdc_install_dismissed', 'true');
  }, []);

  return {
    isInstallable,
    isInstalled,
    isOnline,
    installApp,
    showAndroidGuide,
    setShowAndroidGuide,
    showAutoInstallPrompt,
    setShowAutoInstallPrompt,
    dismissPrompt
  };
}

