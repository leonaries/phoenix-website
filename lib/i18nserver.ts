import i18n from 'i18next';

import en from '../public/locales/en/translation.json';
import zh from '../public/locales/zh/translation.json';

const resources = {
  en: { translation: en },
  zh: { translation: zh },
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
