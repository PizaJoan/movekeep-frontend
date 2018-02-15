<template>
    <div class="row carta">
        <q-card :flat="this.$q.platform.is.mobile" square class="col-lg-4">
            <q-card-title align="center">
                <q-tooltip class="my-tooltip" color="negative">
                    Anar a la pantalla principal
                </q-tooltip>                
                <router-link to="/">
                    <img class="responsive avatar" src="./../statics/logo-movekeep-working-png-big.png" alt="logo" />
                    <h5>
                        Nou compte
                    </h5>
                </router-link>
                <span slot="subtitle">Crear nou compte</span>
            </q-card-title>
            <q-card-main>
                <q-input
                    float-label="Nom d'usuari"
                    suffix="movekeep-user"
                    v-model="user"
                    @click="$v.user.$touch()"
                    @focus="$v.user.$touch()"
                    :error="$v.user.$error"
                />
                <q-input
                    float-label="Nom complet"
                    suffix="Movekeep User"
                    v-model="name"
                />
                <q-input 
                    float-label="E-mail"
                    suffix="yourmail@movekeep.com"
                    v-model="mail"
                    type="email"
                    @click="$v.mail.$touch()"
                    @focus="$v.mail.$touch()"
                    :error="$v.mail.$error"
                />
                <q-input 
                    float-label="Contrasenya"
                    v-model="password"
                    type="password"
                    @click="$v.password.$touch()"
                    @focus="$v.password.$touch()"
                    :error="$v.password.$error"                    
                />
                <q-input 
                    float-label="Repetir contrasenya"
                    v-model="repeatPassword"
                    type="password"
                    @click="$v.repeatPassword.$touch()"
                    @focus="$v.repeatPassword.$touch()"
                    :error="$v.repeatPassword.$error"
                />
                <div id="boto-formulari">
                    <q-btn 
                        align="center" 
                        color="primary"
                        :disable="$v.all.$error || !$v.all.$dirty"
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
} from 'quasar'

import {
    required,
    sameAs,
    email,
    minLength
} from 'vuelidate/lib/validators'

export default {
    components: {
        QCard,
        QCardTitle,
        QTooltip,
        QCardMain,
        QInput,
        QBtn
    },
    data() {
        return {
            user: '',
            name: '',
            password: '',
            repeatPassword: '',
            mail: '',
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
    }
}
</script>

<style scoped>

    #boto-formulari {
        display: flex;
        justify-content: center;
    }

</style>
