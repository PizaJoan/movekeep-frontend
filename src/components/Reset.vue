<template>
    <div>
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
    </div>
</template>

<script>
import { 
    QInput,
    QBtn, 
    QIcon 
} from 'quasar'

export default {
    components: {
        QInput,
        QBtn,
        QIcon
    },
    data() {
        return {
            mail: ''
        }
    }
}
</script>

<style>

</style>
