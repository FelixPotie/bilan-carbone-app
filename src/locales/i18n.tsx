import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng:'fr-FR',
    fallbackLng:(code) => {
      if (!code || code === 'en') return ['en-US'];
      const fallbacks = [code];
      return fallbacks},
    backend: {
      /* translation file path */
      loadPath: '/assets/i18n/{{ns}}/{{lng}}.json'
    },
    debug: false,
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