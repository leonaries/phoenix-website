import i18n from 'i18next';

import en from '../public/locales/en/translation.json';
import zh from '../public/locales/zh/translation.json';
import ja from '../public/locales/ja/translation.json';
import ko from '../public/locales/ko/translation.json';

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  ja: { translation: ja },
  ko: { translation: ko },
};

export async function initI18nServer(lang: string) {
  const instance = i18n.createInstance();
  await instance.init({
    lng: lang,
    fallbackLng: 'en',
    resources,
    interpolation: { escapeValue: false },
  });
  return instance;
}
