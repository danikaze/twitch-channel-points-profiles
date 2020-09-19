import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import { detectLang } from './detect-lang';
import { resources } from '../locales';

const FALLBACK_LANG = 'en';
const supportedLngs = Object.keys(resources);

if (!supportedLngs.includes(FALLBACK_LANG)) {
  throw new Error(
    `FALLBACK_LANG (${FALLBACK_LANG}) is not defined in the locales`
  );
}

i18n.use(initReactI18next).init({
  resources,
  supportedLngs,
  lng: detectLang(),
  fallbackLng: FALLBACK_LANG,
});

async function changeLanguage(lang: string): Promise<void> {
  let language = FALLBACK_LANG;

  if (lang) {
    language = i18n.getDataByLanguage(lang) ? lang : lang.split('-')[0];
  }

  await i18n.changeLanguage(language);
}

export { changeLanguage, useTranslation };
