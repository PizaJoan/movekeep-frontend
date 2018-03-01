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
import { LocalStorage } from 'quasar'

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

//Vue.http.options.emulateJSON = true;
/*

    // Maybe this will be the way to add allways the token to the api \\
if (LocalStorage.get.item('access_token')) {
    Vue.http.headers.common['Authorization'] = `Bearer ${LocalStorage.get.item('token')}`
}

*/
Vue.http.interceptors.push((req, next) => {
    if (LocalStorage.get.item('access_token')) {
            //console.log('eee')
            //next('/login')
            req.headers.set('authorization', `Bearer ${LocalStorage.get.item('access_token')}`)
    }
    //console.log(req
    //console.log(req, next)
    next()
})

Vue.filter('typeRoutine', (type) => {
    switch(type) {
        case 'time':
            return 'Temps en segons*'
        case 'reps':
            return 'Nº Repeticions*'
        default:
            return ''
    }  
})

Vue.filter('getTypeRoutine', type => {
    switch(type) {
        case 'time':
            return 'Temps'
        case 'reps':
            return 'Repeticions'
        default:
            return ''
    } 
})

Vue.filter('capitalize', (title) => {
    if (!title) return ''
    title = title.toString()
    return title.charAt(0).toUpperCase() + title.slice(1)
})

Vue.filter('getUserPic', (path) => {
    if (path.includes('http://')) return path
    return `http://localhost:8080${path}`
})