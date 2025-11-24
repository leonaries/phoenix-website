/**
 * 浏览器检测工具
 * 用于判断浏览器类型和能力，以便选择合适的动画格式
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

/**
 * 检测是否为移动设备
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') {
    return false; // SSR环境下默认返回false
  }

  const userAgent = window.navigator.userAgent;

  // 检测移动设备的User-Agent
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

/**
 * 检测是否为移动端 Safari（iOS Safari）
 */
export function isMobileSafari(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const userAgent = window.navigator.userAgent;

  // 检测 iOS Safari：必须是 Safari 且必须是移动设备
  const isIOSDevice = /iPhone|iPad|iPod/i.test(userAgent);

  // 必须包含 Safari 关键字，但不能包含 Chrome/Chromium/CriOS/FxiOS/EdgiOS
  // CriOS = Chrome on iOS, FxiOS = Firefox on iOS, EdgiOS = Edge on iOS
  const isSafariBrowser = /Safari/.test(userAgent)
    && !/Chrome/.test(userAgent)
    && !/Chromium/.test(userAgent)
    && !/CriOS/.test(userAgent)
    && !/FxiOS/.test(userAgent)
    && !/EdgiOS/.test(userAgent);

  const result = isIOSDevice && isSafariBrowser;

  // 开发模式下输出检测结果
  if (process.env.NODE_ENV === 'development') {
    console.log('[isMobileSafari] Detection:', {
      userAgent,
      isIOSDevice,
      isSafariBrowser,
      result
    });
  }

  return result;
}

/**
 * 检测浏览器是否支持 WebM 视频格式
 * 支持 VP8 或 VP9 编解码器都视为支持
 */
export function supportsWebM(): boolean {
  if (typeof window === 'undefined') {
    return false; // SSR环境下默认返回false
  }

  const video = document.createElement('video');

  // 检查多种 WebM 支持方式
  const basicSupport = video.canPlayType('video/webm') !== '';
  const vp8Support = video.canPlayType('video/webm; codecs="vp8"') !== '';
  const vp9Support = video.canPlayType('video/webm; codecs="vp9"') !== '';

  const isSupported = basicSupport || vp8Support || vp9Support;

  // 开发模式下输出详细信息
  if (process.env.NODE_ENV === 'development') {
    console.log('[WebM Detection]', {
      basicSupport,
      vp8Support,
      vp9Support,
      finalResult: isSupported,
      userAgent: navigator.userAgent
    });
  }

  return isSupported;
}

/**
 * 获取推荐的动画格式
 *
 * 检测优先级：
 * 1. 移动端 + 支持 WebM → 使用 WebM（节省流量）
 * 2. 桌面 Chrome/Firefox/Edge → 使用 WebM
 * 3. Safari（桌面/移动） → 使用帧序列（懒加载优化）
 * 4. 其他旧浏览器 → 使用帧序列
 */
export function getPreferredAnimationFormat(): 'frames' | 'webm' {
  if (typeof window === 'undefined') {
    return 'frames'; // SSR环境下默认使用帧序列
  }

  const mobile = isMobile();
  const safari = isSafari();
  const webmSupport = supportsWebM();

  // 移动端优先使用视频（文件更小，流量更省）
  if (mobile && webmSupport) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Animation Format] Mobile + WebM supported → using webm');
    }
    return 'webm';
  }

  // Safari 使用帧序列（配合懒加载优化）
  if (safari) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Animation Format] Safari detected → using frames (lazy loading)');
    }
    return 'frames';
  }

  // 不支持 WebM 的浏览器使用帧序列
  if (!webmSupport) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Animation Format] WebM not supported → using frames');
    }
    return 'frames';
  }

  // 其他情况（桌面 Chrome/Firefox/Edge）使用 WebM
  if (process.env.NODE_ENV === 'development') {
    console.log('[Animation Format] Desktop + WebM supported → using webm');
  }
  return 'webm';
}