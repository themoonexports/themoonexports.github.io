import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './resources/en/common.json';
import enNav from './resources/en/navigation.json';
import enProducts from './resources/en/products.json';
import deCommon from './resources/de/common.json';
import deNav from './resources/de/navigation.json';
import deProducts from './resources/de/products.json';
import frCommon from './resources/fr/common.json';
import frNav from './resources/fr/navigation.json';
import frProducts from './resources/fr/products.json';

const resources = {
  en: {
    common: enCommon,
    navigation: enNav,
    products: enProducts,
  },
  de: {
    common: deCommon,
    navigation: deNav,
    products: deProducts,
  },
  fr: {
    common: frCommon,
    navigation: frNav,
    products: frProducts,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    ns: ['common', 'navigation', 'products'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
