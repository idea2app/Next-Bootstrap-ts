import {
  loadLanguageMapFrom,
  TranslationMap,
  TranslationModel,
} from 'mobx-i18n';
import { createContext } from 'react';

import zhCN from '../translation/zh-CN';

const i18nData = {
  'zh-CN': zhCN,
  'zh-TW': () => import('../translation/zh-TW'),
  'en-US': () => import('../translation/en-US'),
};
export type LanguageCode = keyof typeof i18nData;

export interface I18nProps {
  language: LanguageCode;
  languageMap: typeof zhCN;
}

export const createI18nStore = <N extends LanguageCode, K extends string>(
  language?: N,
  data?: TranslationMap<K>,
) => {
  const store = new TranslationModel({
    ...i18nData,
    ...(language && { [language]: data }),
  });

  if (language) store.currentLanguage = language;

  return store;
};

export const i18n = createI18nStore();

export const LanguageName: Record<LanguageCode, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'en-US': 'English',
};

export const I18nContext = createContext(i18n);

export const loadSSRLanguage = loadLanguageMapFrom.bind(null, i18nData);
