<template>
    <div id="carta" class="row">
        <q-card :flat="this.$q.platform.is.mobile" class="col-lg-4">
            <q-card-title align="center">
                <h5>
                    <q-icon name="ion-email" />
                    Reiniciar contrasenya
                </h5>
                <span slot="subtitle">Correu del compte</span>
            </q-card-title>
            <q-card-main>
                <q-input 
                v-model="mail" 
                suffix="example@example.com" 
                type="email" 
                float-label="Email"
                :before="[
                    {
                        icon: 'mail',
                        handler() {
                            
                            //Do suff later...
                        }
                    }
                ]"
                />
                <q-btn color="primary">
                    <q-icon name="send"/>
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
    QIcon 
} from 'quasar'

export default {
    components: {
        QInput,
        QCard,
        QCardTitle,
        QCardMain,
        QBtn,
        QIcon
    },
    data() {
        return {
            mail: '',
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
