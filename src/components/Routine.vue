<template>
    <div>
        <q-card flat>
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
                    v-model.trim="title"
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
                    v-model.trim="description"
                    type="textarea"
                    float-label="Breu descripció"
                    :max-height="50"                    
                />
            </q-field>
            <q-field
                helper="Selecciona la/les categoríes de la rutina"
            >
                <q-select
                    v-if="$q.platform.is.desktop"
                    multiple
                    filter
                    filter-placeholder="Cerca una categoria"
                    :options="categories"
                    v-model="categoriesSelected"
                    float-label="Categories seleccionades"
                />
                <q-dialog-select 
                    v-else
                    multiple
                    :options="categories"
                    v-model="categoriesSelected"
                    title="Categories"
                    ok-label="Selecciona"
                    cancel-label="Cancelar"
                    float-label="Categories seleccionades"                
                />
            </q-field>
            <q-field
                helper="Marca l'opció si la teva rutina va per temps o per repeticions"
            >
                <q-option-group
                    type="radio"
                    v-model="type"
                    inline
                    :options="[
                        { label:'De temps', value: 'time'},
                        { label:'De repeticions', value: 'reps'},
                    ]"
                />
            </q-field>
            <div v-for="exercice in exercices" :key="exercice.title" class="column">
                <q-field
                    :helper="`Exercici ${exercices.indexOf(exercice) + 1}`"
                >
                    <q-input
                        v-model.trim="exercice.number"
                        type="number"
                    />
                    <q-input
                        v-model.trim="exercice.description"
                        type="text"
                    />
                </q-field>
            </div>
            <q-btn
                @click="addExercice"
                color="primary"
                big
            >
                Afegir exercici
            </q-btn>
          </q-card-main>
      </q-card>
  </div>
</template>

<script>
import {
    QCard,
    QCardTitle,
    QOptionGroup,
    QCardMain,
    QField,
    QInput,
    QBtn,
    QDialogSelect,
    QSelect,
} from 'quasar'

export default {
    components: {
        QCard,
        QBtn,
        QDialogSelect,
        QCardTitle,
        QCardMain,
        QOptionGroup,
        QField,
        QInput,
        QSelect,
    },
    data() {
        return {
            title: '',
            description: '',
            exercices: [
                {
                    number: 0,
                    description: '',

                },
                {
                    number: 0,
                    description: '',

                }
            ],
            type: '',
            categories: [
                { label: 'Braços', value: 'arms' },
                { label: 'Cames', value: 'legs' },
                { label: 'Pit', value: 'chest' }
            ],
            categoriesSelected: [

            ]
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
    },
    methods: {
        addExercice(e) {
            e.preventDefault()
            this.exercicis.push({
                repeticions: 0,
                descripcio: ''
            })
        }
    }

}
</script>

<style>

</style>
