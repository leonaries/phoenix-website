/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // 暂时禁用静态导出模式以解决开发时的错误
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 抑制由浏览器扩展引起的 hydration 警告
  reactStrictMode: true,

  // 启用压缩
  compress: true,

  // Webpack 配置 - 支持 WebWorker
  webpack: (config, { isServer }) => {
    // 仅在客户端启用 Worker 支持
    if (!isServer) {
      // Next.js 15 原生支持通过 new Worker(new URL(..., import.meta.url))
      // 但需要确保文件系统层能正确处理 .ts 文件
      config.module.rules.push({
        test: /\.worker\.(js|ts)$/,
        use: {
          loader: 'worker-loader',
          options: {
            filename: 'static/[hash].worker.js',
          }
        }
      });

      // 确保 Worker 文件被正确处理
      config.output = {
        ...config.output,
        globalObject: 'self',
      };
    }

    return config;
  },

  // 配置静态资源缓存头
  async headers() {
    return [
      // 视频文件缓存策略（WebM/MP4）
      {
        source: '/animations/:path*.(webm|mp4)',
        headers: [
          {
            key: 'Cache-Control',
            // max-age: 浏览器缓存1年
            // s-maxage: CDN缓存1年
            // immutable: 告诉浏览器资源永不改变
            value: 'public, max-age=31536000, s-maxage=31536000, immutable'
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes' // 支持视频Range请求
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff' // 安全头
          }
        ]
      },
      // WebP帧序列缓存策略
      {
        source: '/frames/:path*.(webp|png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, s-maxage=31536000, immutable'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      },
      // 静态图片资源
      {
        source: '/img/:path*.(jpg|jpeg|png|gif|svg|webp|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // Next.js 静态资源（带hash）
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // WebWorker 文件缓存策略
      {
        source: '/workers/:path*.(js|ts)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ]
  },

  // 在生产环境中抑制 hydration 错误（由浏览器扩展引起）
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
}

module.exports = nextConfig