<template>
    <div id="lay" class="row">
        <q-card :flat="this.$q.platform.is.mobile" square class="col-lg-4">
            <q-card-title align="center">
                <q-tooltip class="my-tooltip" color="negative">
                    Anar a la pantalla principal
                </q-tooltip>
                <router-link to="/" hover="Anar a la pantalla principal">
                    <h5>
                        <q-icon name="ion-person" /> 
                        Login
                    </h5>
                </router-link>
                <span slot="subtitle">Formulari Login</span>   
            </q-card-title>
            <q-card-main>
                <q-input
                    v-model.trim="user" 
                    type="text"
                    float-label="Nom d'usuari"
                    name="user"
                    @click="$v.user.$touch()"
                    :error="$v.user.$invalid && $v.user.$dirty"
                    />
                <q-input 
                    v-model.trim="password" 
                    type="password" 
                    float-label="Contrasenya"
                    no-pass-toggle
                    name="password"
                    @click="$v.password.$touch()"
                    :error="$v.password.$invalid && $v.password.$dirty"
                    />
                <div id="bottom">
                    <router-link class="text-blue-5" to="reset">Recuperar Contrasenya</router-link>
                    <q-btn color="primary" big @click="checkLogin">
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
    Toast
} from 'quasar'

import {
    required,
    minLength
} from 'vuelidate/lib/validators'

export default {
    components: {
        QInput,
        QCardSeparator,
        QBtn,
        QIcon,
        QCard,
        QCardTitle,
        QCardMain,
        required,
        minLength,
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
            if (!this.user || !this.password) {
                Toast.create('Has d\'emplenar tant l\'usuari com la contrasenya')
                this.$v.user.$touch()
                this.$v.password.$touch()
                return
            }
            //TODO this is not good but will fix later...
            this.$http.post('/api/login', {
                user: this.user,
                password: this.password
            }).then(res => {
                console.log(res)
            }, error => {
                console.log(error)
            })
        }
    }
}

</script>

<style scoped>

    #lay {
        display: flex;
        height: calc(100vh - 50px);
        justify-content: center;
        align-items: center;
    }

    #bottom {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
    }
    
</style>
