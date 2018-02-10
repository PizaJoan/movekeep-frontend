// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import Vuelidate from 'vuelidate'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework
Vue.use(Vuelidate)
Vue.use(VueResource)

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App').default)
  })
})

Vue.http.options.emulateJSON = true;

Vue.http.interceptors.push((req, next) => {
  req.headers.set('Access-Control-Allow-Origin', '*')
  next()
})

Vue.filter('capitalize', (animal) => {
  animal.name = animal.name.charAt(0).toUpperCase() + animal.name.slice(1)
  return animal
})

Vue.filter('isLovely', (animal) => {
  let tmp = `En ${animal.name} `
  return animal.lovely ? `${tmp} és carinyos` : `${tmp} no és molt carinyos`
})
