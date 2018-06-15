// import something here
import VueI18n from 'vue-i18n'

import cat from './../statics/traductions/cat.json'
import eng from './../statics/traductions/eng.json'
import esp from './../statics/traductions/esp.json'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
    // something to do
    Vue.use(VueI18n)

    app.i18n = new VueI18n({
        locale: 'es',
        fallbackLocale: 'en-uk',
        messages: {
            "es": esp,
            "ca": cat,
            "en-uk": eng
        },
        silentTranslationWarn: true
    })
}
