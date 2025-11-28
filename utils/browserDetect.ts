/**
 * Browser detection utility
 * Used to determine browser type and capabilities for selecting appropriate animation formats
 */

export function isSafari(): boolean {
  if (typeof window === 'undefined') {
    return false; // Default to false in SSR environment
  }

  const userAgent = window.navigator.userAgent;

  // Detect Safari browser (including iOS Safari)
  // Exclude Chrome and other Webkit-based browsers
  return /Safari/.test(userAgent) && !/Chrome/.test(userAgent) && !/Chromium/.test(userAgent);
}

/**
 * Detect if device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') {
    return false; // Default to false in SSR environment
  }

  const userAgent = window.navigator.userAgent;

  // Detect mobile device User-Agent
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

/**
 * Detect if device is mobile Safari (iOS Safari)
 */
export function isMobileSafari(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const userAgent = window.navigator.userAgent;

  // Detect iOS Safari: must be Safari and must be mobile device
  const isIOSDevice = /iPhone|iPad|iPod/i.test(userAgent);

  // Must contain Safari keyword, but cannot contain Chrome/Chromium/CriOS/FxiOS/EdgiOS
  // CriOS = Chrome on iOS, FxiOS = Firefox on iOS, EdgiOS = Edge on iOS
  const isSafariBrowser = /Safari/.test(userAgent)
    && !/Chrome/.test(userAgent)
    && !/Chromium/.test(userAgent)
    && !/CriOS/.test(userAgent)
    && !/FxiOS/.test(userAgent)
    && !/EdgiOS/.test(userAgent);

  const result = isIOSDevice && isSafariBrowser;

  // Output detection results in development mode
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
 * Detect if device is Android
 */
export function isAndroid(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const userAgent = window.navigator.userAgent;
  const result = /Android/i.test(userAgent);

  // Output detection results in development mode
  if (process.env.NODE_ENV === 'development') {
    console.log('[isAndroid] Detection:', {
      userAgent,
      result
    });
  }

  return result;
}

/**
 * Detect if browser supports WebM video format
 * Support for VP8 or VP9 codecs is considered supported
 */
export function supportsWebM(): boolean {
  if (typeof window === 'undefined') {
    return false; // Default to false in SSR environment
  }

  const video = document.createElement('video');

  // Check multiple WebM support methods
  const basicSupport = video.canPlayType('video/webm') !== '';
  const vp8Support = video.canPlayType('video/webm; codecs="vp8"') !== '';
  const vp9Support = video.canPlayType('video/webm; codecs="vp9"') !== '';

  const isSupported = basicSupport || vp8Support || vp9Support;

  // Output detailed information in development mode
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
 * Get recommended animation format
 *
 * Detection priority:
 * 1. Mobile + supports WebM → use WebM (saves bandwidth)
 * 2. Desktop Chrome/Firefox/Edge → use WebM
 * 3. Safari (desktop/mobile) → use frame sequences (lazy loading optimization)
 * 4. Other legacy browsers → use frame sequences
 */
export function getPreferredAnimationFormat(): 'frames' | 'webm' {
  if (typeof window === 'undefined') {
    return 'frames'; // Default to frame sequences in SSR environment
  }

  const mobile = isMobile();
  const safari = isSafari();
  const webmSupport = supportsWebM();

  // Mobile prioritizes video (smaller files, saves bandwidth)
  if (mobile && webmSupport) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Animation Format] Mobile + WebM supported → using webm');
    }
    return 'webm';
  }

  // Safari uses frame sequences (with lazy loading optimization)
  if (safari) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Animation Format] Safari detected → using frames (lazy loading)');
    }
    return 'frames';
  }

  // Browsers that don't support WebM use frame sequences
  if (!webmSupport) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Animation Format] WebM not supported → using frames');
    }
    return 'frames';
  }

  // Other cases (desktop Chrome/Firefox/Edge) use WebM
  if (process.env.NODE_ENV === 'development') {
    console.log('[Animation Format] Desktop + WebM supported → using webm');
  }
  return 'webm';
}