/**
 * RTL (Right-to-Left) utility functions for Arabic and other RTL languages
 */

/**
 * Check if a language code is RTL
 */
export function isRTL(lang: string): boolean {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  return rtlLanguages.includes(lang);
}

/**
 * Get text direction based on language
 */
export function getTextDirection(lang: string): 'rtl' | 'ltr' {
  return isRTL(lang) ? 'rtl' : 'ltr';
}

/**
 * RTL-aware class names helper
 * Automatically reverses flex direction, margins, paddings for RTL
 */
export function rtlClass(baseClass: string, rtlClass: string, lang: string): string {
  return isRTL(lang) ? rtlClass : baseClass;
}

/**
 * Conditional RTL classes for Tailwind
 * Usage: cn(rtlClasses('ml-4', 'mr-4', lang))
 */
export function rtlClasses(ltrClass: string, rtlClass: string, lang: string): string {
  return isRTL(lang) ? rtlClass : ltrClass;
}

/**
 * Get flex direction class based on language
 */
export function getFlexDirection(lang: string, reverse: boolean = false): string {
  const isRtl = isRTL(lang);
  if (reverse) {
    return isRtl ? 'flex-row' : 'flex-row-reverse';
  }
  return isRtl ? 'flex-row-reverse' : 'flex-row';
}

/**
 * Get text alignment class based on language
 */
export function getTextAlign(align: 'left' | 'right' | 'center', lang: string): string {
  if (align === 'center') return 'text-center';
  
  const isRtl = isRTL(lang);
  if (align === 'left') {
    return isRtl ? 'text-right' : 'text-left';
  }
  return isRtl ? 'text-left' : 'text-right';
}

/**
 * Get margin class for RTL
 */
export function getMargin(side: 'l' | 'r', size: string, lang: string): string {
  const isRtl = isRTL(lang);
  if (side === 'l') {
    return isRtl ? `mr-${size}` : `ml-${size}`;
  }
  return isRtl ? `ml-${size}` : `mr-${size}`;
}

/**
 * Get padding class for RTL
 */
export function getPadding(side: 'l' | 'r', size: string, lang: string): string {
  const isRtl = isRTL(lang);
  if (side === 'l') {
    return isRtl ? `pr-${size}` : `pl-${size}`;
  }
  return isRtl ? `pl-${size}` : `pr-${size}`;
}
