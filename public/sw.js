/**
 * Service Worker for Phoenix Website
 * 提供离线缓存功能，优化资源加载性能
 *
 * 缓存策略：
 * 1. 视频资源（WebM/MP4）：Cache First - 优先使用缓存，失败时从网络获取
 * 2. 帧序列（WebP/PNG）：Cache First - 优先使用缓存
 * 3. 静态资源（JS/CSS/图片）：Stale While Revalidate - 使用缓存同时后台更新
 * 4. HTML页面：Network First - 优先网络，失败时使用缓存
 *
 * 更新版本号时，旧缓存会被清理
 */

const CACHE_VERSION = '1.0.0';
const CACHE_NAME = `phoenix-cache-v${CACHE_VERSION}`;

// 需要预缓存的核心资源（首次安装时缓存）
const PRECACHE_URLS = [
  '/',
  '/en/',
  '/zh/',
];

// 缓存策略配置
const CACHE_STRATEGIES = {
  // 视频资源：Cache First（优先缓存，视频文件大，能缓存就缓存）
  videos: {
    pattern: /\.(webm|mp4)$/,
    strategy: 'cache-first',
  },
  // 帧序列：Cache First（大量小文件，缓存优先）
  frames: {
    pattern: /\/frames\/.*\.(webp|png)$/,
    strategy: 'cache-first',
  },
  // 静态资源：Stale While Revalidate（使用缓存，后台更新）
  static: {
    pattern: /\.(js|css|woff2?|ttf|eot|svg|jpg|jpeg|gif|ico)$/,
    strategy: 'stale-while-revalidate',
  },
  // Next.js 静态资源
  nextStatic: {
    pattern: /\/_next\/static\//,
    strategy: 'stale-while-revalidate',
  },
  // HTML 页面：Network First（优先网络，确保内容最新）
  html: {
    pattern: /\.html$|\/$/,
    strategy: 'network-first',
  },
};

// Service Worker 安装事件
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker, version:', CACHE_VERSION);

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Precaching core resources');
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[SW] Precache failed for some resources:', err);
        // 不阻止安装，即使预缓存失败
      });
    }).then(() => {
      // 立即激活新的 Service Worker
      return self.skipWaiting();
    })
  );
});

// Service Worker 激活事件
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker, version:', CACHE_VERSION);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // 删除旧版本缓存
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // 立即控制所有客户端
      return self.clients.claim();
    })
  );
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 只处理同源请求
  if (url.origin !== location.origin) {
    return;
  }

  // 只处理 GET 请求
  if (request.method !== 'GET') {
    return;
  }

  // 检查 URL 参数中的版本号（如果有版本号，说明资源已更新）
  const hasVersion = url.searchParams.has('v');

  // 根据资源类型选择缓存策略
  let strategy = null;
  for (const [key, config] of Object.entries(CACHE_STRATEGIES)) {
    if (config.pattern.test(url.pathname)) {
      strategy = config.strategy;
      break;
    }
  }

  // 如果没有匹配的策略，使用默认的网络优先策略
  if (!strategy) {
    strategy = 'network-first';
  }

  // 执行相应的缓存策略
  switch (strategy) {
    case 'cache-first':
      event.respondWith(cacheFirst(request, hasVersion));
      break;
    case 'network-first':
      event.respondWith(networkFirst(request));
      break;
    case 'stale-while-revalidate':
      event.respondWith(staleWhileRevalidate(request));
      break;
    default:
      // 默认策略：直接从网络获取
      event.respondWith(fetch(request));
  }
});

/**
 * Cache First 策略
 * 优先从缓存获取，缓存未命中时从网络获取并缓存
 * 适用于：大文件、不常更新的资源（视频、帧序列）
 */
async function cacheFirst(request, hasVersion) {
  const cache = await caches.open(CACHE_NAME);

  // 如果有版本号，优先尝试网络（说明资源可能已更新）
  if (hasVersion) {
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        // 缓存新版本
        cache.put(request, networkResponse.clone());
        return networkResponse;
      }
    } catch (error) {
      console.warn('[SW] Network fetch failed, trying cache:', error);
    }
  }

  // 尝试从缓存获取
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // 缓存未命中，从网络获取
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // 缓存响应
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first strategy failed:', error);
    throw error;
  }
}

/**
 * Network First 策略
 * 优先从网络获取，网络失败时从缓存获取
 * 适用于：HTML 页面、API 请求
 */
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // 更新缓存
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('[SW] Network failed, trying cache:', error);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

/**
 * Stale While Revalidate 策略
 * 立即返回缓存（如果有），同时在后台更新缓存
 * 适用于：静态资源（JS、CSS、图片）
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);

  // 立即返回缓存
  const cachedResponse = await cache.match(request);

  // 同时在后台更新缓存
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch((error) => {
    console.warn('[SW] Background fetch failed:', error);
  });

  // 如果有缓存，立即返回；否则等待网络响应
  return cachedResponse || fetchPromise;
}

// 监听消息事件（用于手动清除缓存等操作）
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.delete(CACHE_NAME).then(() => {
        return self.clients.matchAll();
      }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'CACHE_CLEARED' });
        });
      })
    );
  }
});
