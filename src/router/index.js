import Vue from 'vue';
import VueRouter from 'vue-router';
import { LocalStorage} from 'quasar'

import routes from './routes';

Vue.use(VueRouter);

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth || record.meta.oauthRedirect) && !LocalStorage.get.item('access_token')) {
        if (to.query.access && to.query.refresh) {
            let access_token = to.query.access
            let refresh_token = to.query.refresh
            LocalStorage.set('access_token', access_token)
            LocalStorage.set('refresh_token', refresh_token)
            next()
        }
        next('/login')
    } else {
        next()
    }
})

export default Router;
