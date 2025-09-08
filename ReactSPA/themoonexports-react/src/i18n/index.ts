import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: require('./locales/en.json'),
  },
  de: {
    translation: require('./locales/de.json'),
  },
  fr: {
    translation: require('./locales/fr.json'),
  },
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18next;