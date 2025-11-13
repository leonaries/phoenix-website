'use client';

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nClient from '@/lib/i18nclient';

export function I18nProviderClient({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (i18nClient.language !== lang) {
      i18nClient.changeLanguage(lang);
    }
  }, [lang]);

  return <I18nextProvider i18n={i18nClient}>{children}</I18nextProvider>;
}

