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
                        Nou compte
                    </h5>
                </router-link>
                <span slot="subtitle">Crear nou compte
                    (*) camp requerit
                </span>
            </q-card-title>
            <q-card-main>
                <q-field 
                    :error="$v.user.$error"    
                >
                    <q-input
                        float-label="* Nom d'usuari"
                        suffix="ex: movekeep-user"
                        v-model="user"
                        @click="$v.user.$touch()"
                        @focus="$v.user.$touch()"
                    />
                </q-field>    
                <q-field>
                    <q-input
                        float-label="Nom complet"
                        suffix="ex: Movekeep User"
                        v-model="name"
                    />
                </q-field>
                <q-field 
                    :error="$v.mail.$error"
                >
                    <q-input 
                        float-label="* E-mail"
                        suffix="ex: yourmail@movekeep.com"
                        v-model="mail"
                        type="email"
                        @click="$v.mail.$touch()"
                        @focus="$v.mail.$touch()"
                    />
                </q-field>
                <q-field 
                    :error="$v.password.$error" 
                    error-label="La contrasenya ha de tenir mínim 6 caràcters"
                >
                    <q-input 
                        float-label="* Contrasenya"
                        v-model="password"
                        type="password"
                        @click="$v.password.$touch()"
                        @focus="$v.password.$touch()"
                    />
                </q-field>
                <q-field 
                    :error="$v.repeatPassword.$error"
                    error-label="Les contrasenyes han de coincidir"
                >
                    <q-input 
                        float-label="* Repetir contrasenya"
                        v-model="repeatPassword"
                        type="password"
                        @click="$v.repeatPassword.$touch()"
                        @focus="$v.repeatPassword.$touch()"
                    />
                </q-field>
                <div id="boto-formulari">
                    <q-btn 
                        align="center" 
                        color="primary"
                        :disable="$v.all.$error || !$v.all.$dirty"
                        @click="createUser"
                    >
                        Enviar
                    </q-btn>
                </div>                    
                <!-- 
                    Possible opció de penjar una foto...
                <q-input 
                />
                -->
            </q-card-main>
        </q-card>
    </div>
</template>

<script>
import { 
    QCard, 
    QCardTitle, 
    QTooltip, 
    QCardMain, 
    QInput,
    QBtn,
    QField
} from 'quasar'

import {
    required,
    sameAs,
    email,
    minLength
} from 'vuelidate/lib/validators'

import moment from 'moment'

export default {
    components: {
        QCard,
        QCardTitle,
        QTooltip,
        QCardMain,
        QInput,
        QBtn,
        QField
    },
    data() {
        return {
            user: '',
            name: '',
            password: '',
            repeatPassword: '',
            mail: '',
            ajuda: '*Aques camp es requerit'
        }
    },
    validations: {
        user: {
            required
        },
        mail: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6)
        },
        repeatPassword: {
            required,
            sameAsPassword: sameAs('password')
        },
        all: [ 'user', 'mail', 'password', 'repeatPassword' ]
    },
    methods: {
        createUser(e) {
            e.preventDefault()
            this.$http.put('/api/addUser', {
                userName: this.user,
                name: this.name,
                creationDate: moment().format('YYYY-MM-DD')
            }).then(console.log, console.log)
        }
    }
}
</script>

<style scoped>

    #boto-formulari {
        display: flex;
        justify-content: center;
    }

</style>
