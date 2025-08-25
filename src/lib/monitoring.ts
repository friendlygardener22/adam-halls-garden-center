// Monitoring and Analytics Configuration
export const MONITORING_CONFIG = {
  // Google Analytics
  GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX',
  
  // Vercel Analytics
  VERCEL_ANALYTICS_ENABLED: true,
  
  // Error Tracking
  ERROR_TRACKING_ENABLED: true,
  
  // Performance Monitoring
  PERFORMANCE_MONITORING_ENABLED: true,
  
  // User Interaction Tracking
  INTERACTION_TRACKING_ENABLED: true,
}

// Error tracking utility
export const trackError = (error: Error, context?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false,
      custom_parameter_1: context || 'unknown',
    });
  }
  console.error('Error tracked:', error, context);
};

// Performance tracking utility
export const trackPerformance = (metric: string, value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: metric,
      value: Math.round(value),
    });
  }
};

// User interaction tracking
export const trackInteraction = (action: string, label?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'engagement',
      event_label: label || action,
    });
  }
};

// Page view tracking
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', MONITORING_CONFIG.GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Custom event tracking
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Declare global gtag function
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
