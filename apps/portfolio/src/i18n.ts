import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    welcome: 'Welcome',
    description: 'This is a multilingual app.',
  },
  'tl-PH': {
    welcome: 'Maligayang pagdating',
    description: 'Ito ay isang app na maraming wika.',
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
