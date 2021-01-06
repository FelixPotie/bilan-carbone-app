import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      /* translation file path */
      loadPath: '/assets/i18n/{{ns}}/{{lng}}.json'
    },
    fallbackLng: 'en',
    debug: true,
    /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
    ns: ['general','homePage'],
    defaultNS: 'general',
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      wait: true,
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
    }
  })

export default i18n