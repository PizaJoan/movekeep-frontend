import Vue from 'vue'
import VueRouter from 'vue-router'
import { LocalStorage } from 'quasar'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

const router =  new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  routes: [

    {
      path: '/',
      component: load('navigation/Logged'),
      children: [
        { path: 'account', component: load('Account'), meta: { requiresAuth: true} },
        { path: 'my-routines', component: load('RoutineManager'), meta: { requiresAuth: true} },
        { path: '', component: load('Index') },
        { path: 'manage-routine/:id', component: load('Routine'), meta: { requiresAuth: true} },
        { path: 'manage-routine', component: load('Routine'), meta: { requiresAuth: true} },
        { path: 'routines/:category', component: load('RoutineViewer') }
      ]
    },

    { 
      path: '/', 
      component: load('navigation/NotLogged'),
      children: [
        { path: 'login', component: load('Login') },
        { path: 'reset', component: load('Reset') },
        { path: 'create', component: load('CreateAccount') },
        //{ path: '*', component: load('History') }
      ]
    },
  
    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !LocalStorage.get.item('access_token')) {
        next()
    } else {
        next()
    }
})

export default router