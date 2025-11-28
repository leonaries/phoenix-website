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
  // If the provided lang is not supported, use fallbackLng instead
  const useLang = supportedLangs.includes(lang as typeof supportedLangs[number]) ? lang : fallbackLng;

  const i18n = await initI18nServer(useLang);
  const translation = i18n.t(i18nKey, {
    ...(values || {}),
    ...(components ? { returnObjects: false } : {}),
  });

  return <>{translation || fallback || i18nKey}</>;
}
