// import something here
import VueResource from 'vue-resource'
import { LocalStorage } from 'quasar'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
    // something to do
    Vue.use(VueResource)

    Vue.http.interceptors.push(function (req, next) {
        if (LocalStorage.has('access_token')) req.headers.set('Authorization', `Bearer ${LocalStorage.get.item('access_token')}`)
        console.log(req, next)

        next()
    })
}
