'use client';

import { useEffect } from 'react';

interface YandexMetrikaProps {
  counterId?: string;
}

/**
 * Yandex.Metrika 分析组件
 *
 * 功能:
 * - 页面浏览追踪
 * - 用户行为分析 (点击热图、webvisor)
 * - 电商数据追踪
 * - 链接追踪
 *
 * 使用方式:
 * <YandexMetrika counterId="105534931" />
 */
export default function YandexMetrika({ counterId = '105534931' }: YandexMetrikaProps) {
  // 仅在生产环境启用
  const isProduction = process.env.NODE_ENV === 'production';

  useEffect(() => {
    if (!isProduction) {
      console.log('[YandexMetrika] Disabled in development mode');
      return;
    }

    // 防止重复初始化
    if (typeof window !== 'undefined' && (window as any).ym) {
      console.log('[YandexMetrika] Already initialized');
      return;
    }

    // 加载 Yandex.Metrika 脚本
    (function(m: any, e: any, t: any, r: any, i: any, k: any, a: any) {
      m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date().getTime();

      // 检查脚本是否已存在
      for (var j = 0; j < e.scripts.length; j++) {
        if (e.scripts[j].src === r) { return; }
      }

      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    // 初始化 Yandex.Metrika
    (window as any).ym(counterId, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      ecommerce: 'dataLayer'
    });

    console.log('[YandexMetrika] Initialized with counter ID:', counterId);
  }, [counterId, isProduction]);

  // 渲染 noscript 降级方案
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
