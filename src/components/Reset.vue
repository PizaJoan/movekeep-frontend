<template>
    <div id="carta" class="row">
        <q-card :flat="this.$q.platform.is.mobile" class="col-lg-4">
            <q-card-title align="center">
                <q-tooltip class="my-tooltip" color="negative">
                    Anar a la pantalla principal
                </q-tooltip>                
                <router-link to="/">
                    <img src="./../statics/logo-movekeep-png.png" />
                    <h5>
                        <!--q-icon name="ion-email" /-->
                        Reiniciar contrasenya
                    </h5>    
                </router-link>
                <span slot="subtitle">Correu del compte</span>   
            </q-card-title>
            <q-card-main>
                <q-input 
                v-model="mail" 
                suffix="example@example.com" 
                type="email" 
                float-label="Email"
                @click="$v.mail.$touch()"
                :error="$v.mail.$invalid && $v.mail.$dirty"
                />
                <q-btn color="primary" big @click="checkSend">
                    <!--q-icon name="send"/-->
                    Enviar
                </q-btn>
            </q-card-main>
        </q-card>
    </div>
</template>

<script>
import { 
    QCard,
    QCardTitle,
    QCardMain,
    QInput,
    QBtn, 
    QIcon,
    QTooltip,
    Toast
} from 'quasar'

import {
    required
} from 'vuelidate/lib/validators'

export default {
    components: {
        QInput,
        QCard,
        QCardTitle,
        QCardMain,
        QBtn,
        QIcon,
        QTooltip,
        Toast
    },
    validations: {
        mail: {
            required
        } 
    },
    data() {
        return {
            mail: '',
        }
    },
    methods: {
        checkSend(e) {
            e.preventDefault()
            if (!this.mail) {
                Toast.create('Has d\'emplenar el camp de mail')
                this.$v.mail.$touch()
                return
            }
        }
    }
}
</script>

<style scoped>

    #carta {
        display: flex;
        height: calc(100vh - 50px);
        justify-content: center;
        align-items: center;
    }

</style>
