'use client';

import { useEffect } from 'react';

/**
 * Service Worker registration component
 * Automatically registers Service Worker and provides offline caching functionality
 *
 * Features:
 * 1. Automatic Service Worker registration
 * 2. Listen for update events and prompt user to refresh
 * 3. Provide manual cache clear functionality (for development use)
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    // Only register in production environment and browsers that support Service Worker
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      // Register Service Worker after page load
      window.addEventListener('load', () => {
        registerServiceWorker();
      });
    }

    // Development environment: Provide shortcut for clearing cache
    if (process.env.NODE_ENV === 'development') {
      // @ts-ignore - Add global method for development debugging
      window.clearSWCache = () => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.controller?.postMessage({
            type: 'CLEAR_CACHE',
          });
          console.log('[SW] Cache clear request sent');
        }
      };
      console.log('[SW] Development mode: Use window.clearSWCache() to clear cache');
    }
  }, []);

  return null; // This component renders nothing
}

async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('[SW] Service Worker registered successfully:', registration.scope);

    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New Service Worker installed, prompt user to refresh
          console.log('[SW] New content is available; please refresh.');

          // Optional: Display notification to prompt user to refresh page
          if (window.confirm('New version available, refresh now?\nNew version available, refresh now?')) {
            // Notify new Service Worker to skip waiting and activate immediately
            newWorker.postMessage({ type: 'SKIP_WAITING' });

            // Refresh page after Service Worker activation
            navigator.serviceWorker.addEventListener('controllerchange', () => {
              window.location.reload();
            });
          }
        }
      });
    });

    // Check for updates periodically (once per hour)
    setInterval(() => {
      registration.update();
    }, 60 * 60 * 1000);

  } catch (error) {
    console.error('[SW] Service Worker registration failed:', error);
  }
}

// Listen for messages from Service Worker
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'CACHE_CLEARED') {
      console.log('[SW] Cache has been cleared');
      alert('Cache cleared\nCache cleared');
    }
  });
}
