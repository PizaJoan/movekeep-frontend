<template>
    <div class="row carta">
        <q-card :flat="this.$q.platform.is.mobile" square class="col-lg-4">
            <q-card-title align="center">
                <q-tooltip class="my-tooltip" color="negative">
                    Anar a la pantalla principal
                </q-tooltip>                
                <router-link to="/">
                    <img class="responsive" width="100px" src="./../statics/logo-movekeep-working-png-big.png" alt="logo" />
                    <h5>
                        Login
                    </h5>
                </router-link>
                <span slot="subtitle">Formulari Login</span>
            </q-card-title>
            <q-card-main @keypress="checkKey"> 
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
                    :error="$v.password.$error"
                >
                    <q-input 
                        v-model.trim="password" 
                        type="password" 
                        float-label="Contrasenya"
                        no-pass-toggle
                        name="password"
                        @click="$v.password.$touch()"
                        @focus="$v.password.$touch()"
                        />
                </q-field>
                <div id="bottom">
                    <div id="bottom-links">
                        <router-link class="text-blue-5" to="create">Creat compte</router-link>
                    </div>    
                    <q-btn color="primary" big @click="checkLogin" :disable="!user || !password">
                        Enviar
                    </q-btn>
                </div>
            </q-card-main>
        </q-card>
    </div>
</template>

<script>

import { 
    QInput,
    QCardSeparator, 
    QBtn, 
    QIcon,
    QCard,
    QCardTitle,
    QCardMain,
    QTooltip,
    Toast,
    QField,
    LocalStorage
} from 'quasar'

import {
    required,
    minLength
} from 'vuelidate/lib/validators'

export default {
    components: {
        QField,
        QInput,
        QCardSeparator,
        QBtn,
        QIcon,
        QCard,
        QCardTitle,
        QCardMain,
        QTooltip,
        Toast
    },
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
            this.$http.post('http://192.168.1.41:3000/token-local', {
                username: this.user,
                password: this.password
            }).then(res => {
                LocalStorage.set('access_token', res.headers.map.authorization[0].replace(/Bearer /, ''))
                LocalStorage.set('refresh_token', res.body)
                this.$router.push('/my-routines')
            }, error => {
                this.checkCredentials()
            })
        },
        checkCredentials() {
            Toast.create('L\'usuari o la contrasenya no són correctes')
            this.password = ''
        },
        checkKey(e) {
            if (e.key === 'Enter') document.querySelector('#bottom button').click()
        }
    },
    mounted() {
        if (LocalStorage.get.item('access_token')) {
            this.$http.post('http://192.168.1.41:3000/verify-token').then(res => res.json(), console.log)
                .then(response => {
                    if (response === 'OK') this.$router.push('/my-routines')
                })
        }
    }
}

</script>

<style scoped>

    #bottom {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        flex-flow: row;
    }

    #bottom-links {
        display: flex;
        flex-flow: column;
    }
    
</style>
