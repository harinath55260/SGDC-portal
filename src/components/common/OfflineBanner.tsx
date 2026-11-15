import React from 'react';
import { usePWA } from '../../hooks/usePWA';
import { WifiOff } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOnline } = usePWA();

  if (isOnline) return null;

  return (
    <div className="bg-amber-600 text-white text-xs px-4 py-1.5 text-center flex items-center justify-center gap-2 font-medium z-50 sticky top-0 shadow-md">
      <WifiOff className="w-3.5 h-3.5" />
      <span>You are currently offline. Running in offline cached PWA mode. Cached materials and student records remain accessible.</span>
    </div>
  );
};
