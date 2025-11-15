/**
 * 资源版本管理工具
 * 用于给静态资源（视频、帧序列）添加版本号，实现缓存更新控制
 *
 * 使用方式：
 * 1. 更新资源文件后，运行 `pnpm version:update` 更新版本号
 * 2. 在组件中使用 getVersionedUrl() 获取带版本号的 URL
 * 3. 浏览器会根据版本号变化重新请求资源
 */

// 当前资源版本号（每次更新资源时修改此版本号）
export const ASSET_VERSION = '1.0.0';

/**
 * 获取带版本号的资源 URL
 * @param path 资源路径，如 '/animations/last.webm'
 * @returns 带版本号的 URL，如 '/animations/last.webm?v=1.0.0'
 */
export function getVersionedUrl(path: string): string {
  // 如果已经有查询参数，使用 & 连接
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}v=${ASSET_VERSION}`;
}

/**
 * 获取带版本号的帧序列文件夹路径
 * @param folderPath 文件夹路径，如 '/frames/last_webp_frames'
 * @returns 带版本号的路径，如 '/frames/last_webp_frames?v=1.0.0'
 */
export function getVersionedFrameFolder(folderPath: string): string {
  return getVersionedUrl(folderPath);
}

/**
 * 批量获取带版本号的 URL
 * @param paths 资源路径数组
 * @returns 带版本号的 URL 数组
 */
export function getVersionedUrls(paths: string[]): string[] {
  return paths.map(getVersionedUrl);
}

/**
 * 解析版本号
 * @returns 版本号对象 { major, minor, patch }
 */
export function parseVersion(): { major: number; minor: number; patch: number } {
  const [major, minor, patch] = ASSET_VERSION.split('.').map(Number);
  return { major, minor, patch };
}

/**
 * 增加版本号
 * @param type 要增加的版本类型: 'major' | 'minor' | 'patch'
 * @returns 新的版本号字符串
 */
export function incrementVersion(type: 'major' | 'minor' | 'patch'): string {
  const { major, minor, patch } = parseVersion();

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      return ASSET_VERSION;
  }
}

// 预定义的资源路径常量
export const ASSET_PATHS = {
  // 视频资源
  VIDEO_TOTAL: '/animations/total.webm',
  VIDEO_LAST: '/animations/last.webm',
  VIDEO_TOTAL_MP4: '/animations/total.mp4',
  VIDEO_LAST_MP4: '/animations/last.mp4',

  // WebP 帧序列
  FRAMES_TOTAL: '/frames/total_webp_frames',
  FRAMES_LAST: '/frames/last_webp_frames',
} as const;

// 预定义的带版本号的资源 URL
export const VERSIONED_ASSETS = {
  VIDEO_TOTAL: getVersionedUrl(ASSET_PATHS.VIDEO_TOTAL),
  VIDEO_LAST: getVersionedUrl(ASSET_PATHS.VIDEO_LAST),
  VIDEO_TOTAL_MP4: getVersionedUrl(ASSET_PATHS.VIDEO_TOTAL_MP4),
  VIDEO_LAST_MP4: getVersionedUrl(ASSET_PATHS.VIDEO_LAST_MP4),
  FRAMES_TOTAL: getVersionedFrameFolder(ASSET_PATHS.FRAMES_TOTAL),
  FRAMES_LAST: getVersionedFrameFolder(ASSET_PATHS.FRAMES_LAST),
} as const;
