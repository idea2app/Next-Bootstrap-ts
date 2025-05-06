import { IncomingHttpHeaders } from 'http';
import {
  parseCookie,
  parseLanguageHeader,
  TranslationMap,
  TranslationModel,
} from 'mobx-i18n';
import { createContext } from 'react';

import zhCN from '../translation/zh-CN';

export const i18nData = {
  'zh-CN': zhCN,
  'zh-TW': () => import('../translation/zh-TW'),
  'en-US': () => import('../translation/en-US'),
};
export type LanguageCode = keyof typeof i18nData;

export const createI18nStore = <N extends LanguageCode, K extends string>(
  language?: N,
  data?: TranslationMap<K>,
) =>
  new TranslationModel({ ...i18nData, ...(language && { [language]: data }) });

export const i18n = createI18nStore();

export const LanguageName: Record<LanguageCode, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'en-US': 'English',
};

export const I18nContext = createContext(i18n);

export const loadLanguage = async ({
  'accept-language': acceptLanguage,
  cookie,
}: IncomingHttpHeaders) => {
  const { language } = parseCookie(cookie || ''),
    languages = parseLanguageHeader(acceptLanguage || '');

  const languageData = await i18n.loadLanguages(
    [language, ...languages].filter(Boolean),
  );

  return { language: i18n.currentLanguage, languageData };
};
