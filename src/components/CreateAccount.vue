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
                        Compte nova
                    </h5>
                </router-link>
                <span slot="subtitle">Crear compte nova</span>
            </q-card-title>
            <q-card-main>
                <q-input
                    float-label="Nom d'usuari"
                    suffix="movekeep-user"
                    v-model="user"
                    @click="$v.user.$touch()"
                    :error="$v.user.$invalid && $v.user.$dirty"
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
                    :error="$v.mail.$invalid && $v.mail.$dirty"
                />
                <q-input 
                    float-label="Contrasenya"
                    v-model="password"
                    type="password"
                    @click="$v.password.$touch()"
                    :error="$v.password.$invalid && $v.password.$dirty"                    
                />
                <q-input 
                    float-label="Repetir contrasenya"
                    v-model="repeatPassword"
                    type="password"
                    @click="$v.repeatPassword.$touch()"
                    :error="$v.repeatPassword.$invalid && $v.repeatPassword.$dirty"
                />
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
    QInput 
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
        QInput
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
        password: {
            required,
            minLength: minLength(6)
        },
        repeatPassword: {
            required,
            sameAsPassword: sameAs('password')
        },
        mail: {
            required,
            email
        }
    }
}
</script>

<style>

</style>
