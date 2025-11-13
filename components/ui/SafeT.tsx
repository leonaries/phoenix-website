import React from 'react';
import { fallbackLng, supportedLangs } from "@/lib/settings";
import { initI18nServer } from "@/lib/i18nserver";

interface SafeTProps {
  i18nKey: string;
  fallback?: string;
  lang: string;
  values?: Record<string, any>;
  components?: React.ReactNode[];
}

export default async function SafeT({
  i18nKey,
  fallback = "",
  lang,
  values,
  components,
}: SafeTProps) {
  // 如果传入的lang不支持，则用fallbackLng代替
  const useLang = supportedLangs.includes(lang as typeof supportedLangs[number]) ? lang : fallbackLng;

  const i18n = await initI18nServer(useLang);
  const translation = i18n.t(i18nKey, {
    ...(values || {}),
    ...(components ? { returnObjects: false } : {}),
  });

  return <>{translation || fallback || i18nKey}</>;
}
