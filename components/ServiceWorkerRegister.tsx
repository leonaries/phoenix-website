'use client';

import { useEffect } from 'react';

/**
 * Service Worker 注册组件
 * 自动注册 Service Worker，提供离线缓存功能
 *
 * 功能：
 * 1. 自动注册 Service Worker
 * 2. 监听更新事件，提示用户刷新
 * 3. 提供手动清除缓存功能（开发时使用）
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    // 仅在生产环境和支持 Service Worker 的浏览器中注册
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      // 页面加载完成后注册 Service Worker
      window.addEventListener('load', () => {
        registerServiceWorker();
      });
    }

    // 开发环境：提供清除缓存的快捷方式
    if (process.env.NODE_ENV === 'development') {
      // @ts-ignore - 添加全局方法用于开发调试
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

  return null; // 该组件不渲染任何内容
}

async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('[SW] Service Worker registered successfully:', registration.scope);

    // 检查更新
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // 新的 Service Worker 安装完成，提示用户刷新
          console.log('[SW] New content is available; please refresh.');

          // 可选：显示通知提示用户刷新页面
          if (window.confirm('网站有新版本可用，是否立即刷新？\nNew version available, refresh now?')) {
            // 通知新的 Service Worker 跳过等待，立即激活
            newWorker.postMessage({ type: 'SKIP_WAITING' });

            // 等待 Service Worker 激活后刷新页面
            navigator.serviceWorker.addEventListener('controllerchange', () => {
              window.location.reload();
            });
          }
        }
      });
    });

    // 定期检查更新（每小时检查一次）
    setInterval(() => {
      registration.update();
    }, 60 * 60 * 1000);

  } catch (error) {
    console.error('[SW] Service Worker registration failed:', error);
  }
}

// 监听来自 Service Worker 的消息
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'CACHE_CLEARED') {
      console.log('[SW] Cache has been cleared');
      alert('缓存已清除\nCache cleared');
    }
  });
}
