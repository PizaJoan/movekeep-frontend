// import something here
import VueI18n from 'vue-i18n'


// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.use(VueI18n)

  app.i18n = new VueI18n({
      locale: 'es',
      fallbackLocale: 'en',
      /*messages: {
        "es": {
            "title": "Categorias"
        },
        "ca": {
            "title": "Categories"
        },
        "en-uk": {
            "title": "Categories"            
        }
      }*/
  })
}
