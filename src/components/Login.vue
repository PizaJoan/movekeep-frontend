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
                <q-input v-model="text" float-label="Nom d'usuari"/>
                <q-input v-model="password" type="password" float-label="Contrasenya"/>
                <div id="bottom">
                    <router-link to="reset">Recuperar Contrasenya</router-link>
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
    QCardMain
} from 'quasar'

export default {
    components: {
        QInput,
        QCardSeparator,
        QBtn,
        QIcon,
        QCard,
        QCardTitle,
        QCardMain
    },
    data() {
        return {
            text: '',
            password: ''
        }
    },
    methods: {
        //TODO add methods for login validation
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
