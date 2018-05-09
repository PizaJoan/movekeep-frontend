// import something here
import VueResource from 'vue-resource'
import { LocalStorage } from 'quasar'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
    // something to do
    Vue.use(VueResource)

    Vue.http.interceptors.push(function (req, next) {
        if (LocalStorage.has('access_token')) req.headers.set('Authorization', `Bearer ${LocalStorage.get.item('access_token')}`)
        next(res => {
            if (res.status === 401 && !res.url.includes('token-local')) {
                return new Promise(resolve => {
                    this.$http.post(`${process.env.AUTH}/refresh-token`, {
                        refresh: LocalStorage.get.item('refresh_token')
                    }).then(res => {
                        LocalStorage.set('access_token', res.headers.map.authorization[0].replace(/Bearer /, ''))
                        LocalStorage.set('refresh_token', res.body)
                        resolve(Vue.http(req))
                    }, error => {
                        LocalStorage.clear()
                        this.$router.push('/login')
                    })
                })
            }
        })
    })
}
