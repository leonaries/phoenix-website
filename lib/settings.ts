// 语言配置
export const supportedLangs = ['en', 'zh'] as const;
export const fallbackLng = 'en';

export type SupportedLang = typeof supportedLangs[number];

// 语言信息配置
export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'zh', name: 'Chinese Simplified', flag: '🇨🇳', nativeName: '简体中文' },
] as const;
