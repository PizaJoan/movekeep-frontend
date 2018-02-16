<template>
    <div class="row carta">
        <q-card :flat="this.$q.platform.is.mobile" class="col-6 col-xs-12">
            <q-card-title align="center">
                <img alt="logo" class="avatar responsive" src="./../statics/logo-movekeep-working-png-big.png" />
                <h5>
                    <span v-if="$route.params.id">Modificar rutina {{ $route.params.id }}</span>
                    <span v-else>Afegir rutina nova</span>
                </h5>
            </q-card-title>
            <q-card-main>
            <q-field
                helper="Títol de la rutina"
            >
                <q-input 
                    v-model.trim="titol"
                    type="text"
                    float-label="Títol"
                />
            </q-field>
            <q-field
                helper="Describeix la teva rutina breument"
            >
            <!--
                !!!!!!! Validate will be that this field only allows max 160 characters in total!!!!!!!!!
            -->
                <q-input 
                    v-model.trim="descripcio"
                    type="textarea"
                    float-label="Breu descripció"
                    :max-height="50"                    
                />
            </q-field>
            <div v-for="exercici in exercicis" :key="exercici.titol">
                <q-field

                >
                    <q-input
                        :float-label="`Exercici ${exercicis.indexOf(exercici) + 1}`"
                        v-model.trim="exercici.repeticions"
                    />
                </q-field>
            </div>
          </q-card-main>
      </q-card>
  </div>
</template>

<script>
import {
    QCard,
    QCardTitle,
    QCardMain,
    QField,
    QInput,
} from 'quasar'

export default {
    components: {
        QCard,
        QCardTitle,
        QCardMain,
        QField,
        QInput,
    },
    data() {
        return {
            titol: '',
            descripcio: '',
            exercicis: [
                {
                    repeticions: 0,
                    descripcio: '',

                },
                {
                    repeticions: 0,
                    descripcio: '',

                }
            ],
        }
    },
    /* 
        TODO need to check if there is a parameter from the url to fetch 
        the data from the actual routine and be able modify
    */
    beforeRouteEnter(to, from, next) {
        console.log(to, from, next)
        if (!to.params.id) next()
        next()
    }

}
</script>

<style>

</style>
