import { createI18n } from 'vue-i18n';

const messages = {
    pl: {
        message: {}
    },
    en: {
        message: {}
    }
}
const i18n = createI18n({
    locale: 'pl',
    fallbackLocale: 'pl',
    globalInjection: true,
    missing: (locale, key) => {
        return key;
    },
    messages
})
export default i18n
