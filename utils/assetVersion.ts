/**
 * Asset version management utility
 * Used to add version numbers to static assets (videos, frame sequences) for cache update control
 *
 * Usage:
 * 1. After updating asset files, run `pnpm version:update` to update version number
 * 2. Use getVersionedUrl() in components to get versioned URLs
 * 3. Browser will re-request assets based on version number changes
 */

// Current asset version number (modify this version number when updating assets)
export const ASSET_VERSION = '1.0.0';

/**
 * Get versioned asset URL
 * @param path Asset path, e.g. '/animations/last.webm'
 * @returns Versioned URL, e.g. '/animations/last.webm?v=1.0.0'
 */
export function getVersionedUrl(path: string): string {
  // If query parameters already exist, use & to connect
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}v=${ASSET_VERSION}`;
}

/**
 * Get versioned frame sequence folder path
 * @param folderPath Folder path, e.g. '/frames/last_webp_frames'
 * @returns Versioned path, e.g. '/frames/last_webp_frames?v=1.0.0'
 */
export function getVersionedFrameFolder(folderPath: string): string {
  return getVersionedUrl(folderPath);
}

/**
 * Batch get versioned URLs
 * @param paths Array of asset paths
 * @returns Array of versioned URLs
 */
export function getVersionedUrls(paths: string[]): string[] {
  return paths.map(getVersionedUrl);
}

/**
 * Parse version number
 * @returns Version object { major, minor, patch }
 */
export function parseVersion(): { major: number; minor: number; patch: number } {
  const [major, minor, patch] = ASSET_VERSION.split('.').map(Number);
  return { major, minor, patch };
}

/**
 * Increment version number
 * @param type Version type to increment: 'major' | 'minor' | 'patch'
 * @returns New version string
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

// Predefined asset path constants
export const ASSET_PATHS = {
  // Video assets
  VIDEO_TOTAL: '/animations/total.webm',
  VIDEO_LAST: '/animations/last.webm',
  VIDEO_TOTAL_MP4: '/animations/total.mp4',
  VIDEO_LAST_MP4: '/animations/last.mp4',

  // WebP frame sequences
  FRAMES_TOTAL: '/frames/total_webp_frames',
  FRAMES_LAST: '/frames/last_webp_frames',

  // Mobile dapp frame sequences (for iOS Safari only)
  FRAMES_DAPP_MOBILE: '/frames/last_webp_dapp_frames',
} as const;

// Predefined versioned asset URLs
export const VERSIONED_ASSETS = {
  VIDEO_TOTAL: getVersionedUrl(ASSET_PATHS.VIDEO_TOTAL),
  VIDEO_LAST: getVersionedUrl(ASSET_PATHS.VIDEO_LAST),
  VIDEO_TOTAL_MP4: getVersionedUrl(ASSET_PATHS.VIDEO_TOTAL_MP4),
  VIDEO_LAST_MP4: getVersionedUrl(ASSET_PATHS.VIDEO_LAST_MP4),
  FRAMES_TOTAL: getVersionedFrameFolder(ASSET_PATHS.FRAMES_TOTAL),
  FRAMES_LAST: getVersionedFrameFolder(ASSET_PATHS.FRAMES_LAST),
  FRAMES_DAPP_MOBILE: getVersionedFrameFolder(ASSET_PATHS.FRAMES_DAPP_MOBILE),
} as const;
