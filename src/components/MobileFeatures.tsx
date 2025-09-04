'use client';

import { useState, useEffect } from 'react';
import { 
  CameraIcon, 
  MapPinIcon, 
  DevicePhoneMobileIcon,
  BellIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

interface MobileFeaturesProps {
  onLocationUpdate?: (location: { lat: number; lng: number }) => void;
  onPhotoCapture?: (photo: string) => void;
}

export default function MobileFeatures({ onLocationUpdate, onPhotoCapture }: MobileFeaturesProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [hasGPS, setHasGPS] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check if running on mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };

    // Check device capabilities
    const checkCapabilities = async () => {
      // Check camera
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCamera(true);
          stream.getTracks().forEach(track => track.stop());
        } catch (error) {
          setHasCamera(false);
        }
      }

      // Check GPS
      if ('geolocation' in navigator) {
        setHasGPS(true);
      }

      // Check notifications
      if ('Notification' in window) {
        setHasNotifications(true);
        setNotificationPermission(Notification.permission);
      }
    };

    checkMobile();
    checkCapabilities();
  }, []);

  // Get current location
  const getCurrentLocation = () => {
    if (!hasGPS) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setLocation(newLocation);
        onLocationUpdate?.(newLocation);
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Request notification permission
  const requestNotificationPermission = async () => {
    if (!hasNotifications) return;

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        // Show welcome notification
        new Notification('Welcome to Adam Hall\'s Garden Center!', {
          body: 'Get notified about new plants, care tips, and special offers.',
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-72x72.png'
        });
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  // Share app
  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Adam Hall\'s Garden Center',
          text: 'Check out this amazing garden center app!',
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Don't show on desktop
  if (!isMobile) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40 space-y-3">
      {/* Location Button */}
      {hasGPS && (
        <button
          onClick={getCurrentLocation}
          className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          title="Get current location"
        >
          <MapPinIcon className="w-6 h-6" />
        </button>
      )}

      {/* Camera Button */}
      {hasCamera && (
        <button
          onClick={() => onPhotoCapture?.('camera-access-requested')}
          className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          title="Take photo"
        >
          <CameraIcon className="w-6 h-6" />
        </button>
      )}

      {/* Notifications Button */}
      {hasNotifications && notificationPermission !== 'granted' && (
        <button
          onClick={requestNotificationPermission}
          className="w-12 h-12 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          title="Enable notifications"
        >
          <BellIcon className="w-6 h-6" />
        </button>
      )}

      {/* Share Button */}
      <button
        onClick={shareApp}
        className="w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
        title="Share app"
      >
        <ShareIcon className="w-6 h-6" />
      </button>

      {/* Mobile Indicator */}
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
        <DevicePhoneMobileIcon className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  );
}
