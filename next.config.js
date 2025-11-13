/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // 暂时禁用静态导出模式以解决开发时的错误
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 抑制由浏览器扩展引起的 hydration 警告
  reactStrictMode: true,
  // 在生产环境中抑制 hydration 错误（由浏览器扩展引起）
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
}

module.exports = nextConfig