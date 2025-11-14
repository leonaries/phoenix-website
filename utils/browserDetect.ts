/**
 * 浏览器检测工具
 * 用于判断是否为Safari浏览器，以便选择合适的动画格式
 */

export function isSafari(): boolean {
  if (typeof window === 'undefined') {
    return false; // SSR环境下默认返回false
  }

  const userAgent = window.navigator.userAgent;

  // 检测Safari浏览器（包括iOS Safari）
  // 排除Chrome和其他基于Webkit的浏览器
  return /Safari/.test(userAgent) && !/Chrome/.test(userAgent) && !/Chromium/.test(userAgent);
}

export function supportsWebM(): boolean {
  if (typeof window === 'undefined') {
    return false; // SSR环境下默认返回false
  }

  // 创建video元素测试WebM支持
  const video = document.createElement('video');
  return video.canPlayType('video/webm; codecs="vp9"') !== '';
}

/**
 * 获取推荐的动画格式
 * Safari或不支持WebM的浏览器使用帧序列，其他使用WebM视频
 */
export function getPreferredAnimationFormat(): 'frames' | 'webm' {
  if (typeof window === 'undefined') {
    return 'frames'; // SSR环境下默认使用帧序列
  }

  // Safari或不支持WebM的浏览器使用帧序列
  if (isSafari() || !supportsWebM()) {
    return 'frames';
  }

  return 'webm';
}