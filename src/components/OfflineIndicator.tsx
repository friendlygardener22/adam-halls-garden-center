'use client';

import { useState, useEffect } from 'react';
import { WifiIcon, WifiIcon as WifiOffIcon } from '@heroicons/react/24/outline';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Set initial state
    setIsOnline(navigator.onLine);

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white px-4 py-2 text-center animate-slide-down">
      <div className="flex items-center justify-center space-x-2">
        <WifiOffIcon className="w-5 h-5" />
        <span className="text-sm font-medium">
          You're offline. Some features may be limited, but you can still browse cached content.
        </span>
      </div>
    </div>
  );
}
