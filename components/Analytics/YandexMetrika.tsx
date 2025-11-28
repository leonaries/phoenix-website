'use client';

import { useEffect } from 'react';

interface YandexMetrikaProps {
  counterId?: string;
}

/**
 * Yandex.Metrika analytics component
 *
 * Features:
 * - Page view tracking
 * - User behavior analysis (click heatmap, webvisor)
 * - E-commerce data tracking
 * - Link tracking
 *
 * Usage:
 * <YandexMetrika counterId="105534931" />
 */
export default function YandexMetrika({ counterId = '105534931' }: YandexMetrikaProps) {
  // Enable only in production environment
  const isProduction = process.env.NODE_ENV === 'production';

  useEffect(() => {
    if (!isProduction) {
      console.log('[YandexMetrika] Disabled in development mode');
      return;
    }

    // Prevent duplicate initialization
    if (typeof window !== 'undefined' && (window as any).ym) {
      console.log('[YandexMetrika] Already initialized');
      return;
    }

    // Load Yandex.Metrika script
    (function(m: any, e: any, t: any, r: any, i: any) {
      m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date().getTime();

      // Check if script already exists
      for (var j = 0; j < e.scripts.length; j++) {
        if (e.scripts[j].src === r) { return; }
      }

      const k = e.createElement(t);
      const a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    // Initialize Yandex.Metrika
    (window as any).ym(counterId, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      ecommerce: 'dataLayer'
    });

    console.log('[YandexMetrika] Initialized with counter ID:', counterId);
  }, [counterId, isProduction]);

  // Render noscript fallback
  if (!isProduction) {
    return null;
  }

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${counterId}`}
          style={{ position: 'absolute', left: '-9999px' }}
          alt=""
        />
      </div>
    </noscript>
  );
}
