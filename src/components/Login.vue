<template>
    <div id="lay" class="row">
        <q-card :flat="this.$q.platform.is.mobile" square class="col-lg-4">
            <q-card-title align="center">
                <h5>
                    <q-icon name="ion-person" /> 
                    Login
                </h5>
                <span slot="subtitle">Formulari Login</span>   
            </q-card-title>
            <q-card-main>
                <q-input 
                    v-model.trim="text" 
                    float-label="Nom d'usuari" 
                    @input="test()" 
                    :error="!this.$v.text.required"
                    />
                <q-input 
                    v-model.trim="password" 
                    type="password" 
                    float-label="Contrasenya"
                    :error="!this.$v.password.required"
                    />
                <div id="bottom">
                    <router-link class="text-blue-5" to="reset">Recuperar Contrasenya</router-link>
                    <q-btn color="primary" big>
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
        Toast,
        QCardTitle,
        QCardMain,
        required,
        minLength
    },
    data() {
        return {
            text: '',
            password: ''
        }
    },
    validations: {
        text: {
            required
        },
        password: {
            required
        }
    },
    methods: {
        //TODO add methods for login validation
        test() {
            if (!this.$v.text.required) {
                
            }
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
