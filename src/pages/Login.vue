<template>
    <q-page class="flex flex-center">
        <q-card :flat="this.$q.platform.is.mobile" square class="col-lg-4 col-xs-12">
            <q-card-title align="center">            
                <router-link to="/" tag="img" class="responsive" width="100px" src="./../statics/logo-movekeep-working-png-big.png" alt="logo" />
                <h5 class="no-marge">
                    Login
                </h5>
                <span slot="subtitle">Formulari Login</span>
            </q-card-title>
            <q-card-main> 
                <q-field  
                    :error="$v.user.$error"
                    >
                    <q-input
                        v-model.trim="user" 
                        type="text"
                        float-label="Nom d'usuari"
                        name="user"
                        @click="$v.user.$touch()"
                        @focus="$v.user.$touch()"
                        />
                </q-field>
                <q-field
                    class="marge-top"
                    :error="$v.password.$error"
                >
                    <q-input 
                        v-model.trim="password"
                        type="password" 
                        float-label="Contrasenya"
                        no-pass-toggle
                        name="password"
                        @keydown.enter="checkLogin"
                        @click="$v.password.$touch()"
                        @focus="$v.password.$touch()"
                        />
                </q-field>
                <div class="row justify-between marge-top">
                    <router-link class="text-blue-5 marge-top" to="create">Creat compte</router-link>
                    <q-btn color="primary" big @click="checkLogin" :disable="!user || !password">
                        Enviar
                    </q-btn>
                </div>
            </q-card-main>
        </q-card>
    </q-page>
</template>

<script>
    import { required } from 'vuelidate/lib/validators'

    export default {
        data() {
            return {
                user: '',
                password: ''
            }
        },
        validations: {
            user: {
                required
            },
            password: {
                required
            }
        },
        methods: {
            checkLogin(e) {
                e.preventDefault()
                this.$http.post(`${process.env.AUTH}/token-local`, {
                    username: this.user,
                    password: this.password
                }).then(res => {
                    this.$q.localStorage.set('access_token', res.headers.map.authorization[0].replace(/Bearer /, ''))
                    this.$q.localStorage.set('refresh_token', res.body)
                    this.$router.push('/my-routines')
                }, this.checkCredentials)
            },
            checkCredentials() {
                this.$q.notify({
                    type: 'negative',
                    message: 'L\'usuari o la contrasenya no són correctes',
                    actions: [
                        {
                            label: '',
                            icon: 'ion-close',
                            handler: () => {

                            }
                        }
                    ]
                })
                this.password = ''
            },
        },
        mounted() {
            if (this.$q.localStorage.has('access_token')) {
                this.$http.post(`${process.env.AUTH}/verify-token`).then(res => res.json(), err => {
                    this.$q.localStorage.clear()
                }).then(response => {
                    if (response === 'OK') this.$router.push('/my-routines')
                })
            }
        }
    }
</script>

<style>
</style>
