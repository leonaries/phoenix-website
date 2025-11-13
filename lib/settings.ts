// 语言配置
export const supportedLangs = ['en', 'zh', 'zh-TW', 'ja', 'ko', 'fr', 'de', 'es', 'pt-BR', 'pt', 'ru', 'ar'] as const;
export const fallbackLng = 'en';

export type SupportedLang = typeof supportedLangs[number];

// 语言信息配置
export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'zh', name: 'Chinese Simplified', flag: '🇨🇳', nativeName: '简体中文' },
  { code: 'zh-TW', name: 'Chinese Traditional', flag: '🇹🇼', nativeName: '繁體中文' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', flag: '🇧🇷', nativeName: 'Português (Brasil)' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
] as const;
