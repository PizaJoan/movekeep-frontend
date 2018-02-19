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
                        <router-link class="text-blue-5" to="reset">Recuperar Contrasenya</router-link>
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
        //TODO add methods for login validation
        checkLogin(e) {
            e.preventDefault()
            /*if (!this.user || !this.password) {
                return checkCredentials
            } */
            //TODO this is not good but will fix later...
            this.$http.post('/api/token-local', {
                username: this.user,
                password: this.password
            }).then(res => {

                console.log(res/* res.headers.map.authorization[0].split(' ')[1]*/)
                //LocalStorage.set('token', res.headers.map.authorization[0].split(' ')[1])
            }, error => {
                console.log(error)
                this.checkCredentials()
            })
        },
        checkCredentials() {
            console.log('aajahah')
            Toast.create('L\'usuari o la contrasenya no són correctes')
            //this.$v.user.$touch()
            //this.$v.password.$reset()
            this.password = ''
        },
        checkKey(e) {
            //console.log(e)
            if (e.key === 'Enter') document.querySelector('#bottom button').click()
        }
    },
    mounted() {
        //console.log(LocalStorage.get.item('token'))
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
