// lib/i18nClient.ts
'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../public/locales/en/translation.json';
import zh from '../public/locales/zh/translation.json';

const resources = {
  en: { translation: en },
  zh: { translation: zh },
};

function detectLang(): string {
  // 1. First get language parameter from URL (e.g., /zh/...)
  if (typeof window !== 'undefined') {
    const pathLang = window.location.pathname.split('/')[1];
    if (resources[pathLang as keyof typeof resources]) {
      return pathLang;
    }

    // 2. Next try to get from cookie
    const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]*)/);
    if (match && resources[match[1] as keyof typeof resources]) {
      return match[1];
    }
  }

  return 'en'; // fallback
}

const i18nClient = i18n.createInstance();



i18nClient
  .use(initReactI18next)
  .init({
    resources,
    lng: detectLang(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18nClient;