<template>
    <div class="row justify-center">
        <q-card flat class="col-md-6">
            <q-card-title align="center">
                <img alt="logo" class="responsive" width="100px" src="./../statics/logo-movekeep-working-png-big.png" />
                <h5>
                    <span v-if="$route.params.id">Modificar rutina {{ $route.params.id | capitalize }}</span>
                    <span v-else>Afegir rutina nova</span>
                </h5>
            </q-card-title>
            <q-card-main>
            <q-field
                helper="Títol de la rutina"
                :error="$v.title.$error"
                error-label="Aquest camp s'ha d'emplenar"
            >
                <q-input 
                    v-model.trim="title"
                    type="text"
                    float-label="Títol"
                    @click="$v.title.$touch()"
                    @focus="$v.title.$touch()"
                />
            </q-field>
            <q-field
                :error="$v.description.$error"
                helper="Describeix la teva rutina breument"
                error-label="Máxim 300 caràcters"
            >
            <!--
                !!!!!!! Validate will be that this field only allows max 160 characters in total!!!!!!!!!
            -->
                <q-input 
                    v-model.trim="description"
                    type="textarea"
                    float-label="Breu descripció"
                    :max-height="50"  
                    @click="$v.description.$touch()" 
                    @focus="$v.description.$touch()"                 
                />
            </q-field>
            <q-field
                helper="Selecciona la/les categoríes de la rutina"
                :error="$v.categoriesSelected.$error"
                error-label="N'has de triar al manco 1"
            >
                <q-select
                    v-if="$q.platform.is.desktop"
                    multiple
                    filter
                    v-model="categoriesSelected"
                    @focus="$v.categoriesSelected.$touch()"
                    filter-placeholder="Cerca una categoria"
                    :options="categories"
                    float-label="Categories seleccionades"
                />
                <q-dialog-select 
                    v-else
                    multiple
                    :options="categories"
                    v-model="categoriesSelected"
                    @focus="$v.categoriesSelected.$touch()"
                    title="Categories"
                    ok-label="Selecciona"
                    cancel-label="Cancelar"
                    float-label="Categories seleccionades"                
                />
            </q-field>
            <q-field
                helper="Marca l'opció si la teva rutina va per temps o per repeticions"
                error-label="Has de triar qualcuna opció"
                :error="$v.type.$error"
            >
                <q-option-group
                    type="radio"
                    v-model="type"
                    inline
                    @change="$v.type.$touch()"
                    :options="[
                        { label:'De temps', value: 'time'},
                        { label:'De repeticions', value: 'reps'},
                    ]"
                />
            </q-field>
            <div v-for="exercice in exercices" :key="exercice.title" v-show="type">
                <q-field
                    :label="`Exercici ${exercices.indexOf(exercice) + 1}`"
                    :label-width="1"
                >
                    <div class="row justify-between">
                        <q-field class="col-md-5 col-xs-12">
                            <q-input
                                :float-label="type | typeRoutine"
                                v-model.trim="exercice.amount"
                                type="number"
                            />
                        </q-field>
                        <q-field class="col-md-5 col-xs-12">
                            <q-input
                                class="col-md-5 col-xs-12"
                                v-model.trim="exercice.description"
                                type="text"
                                float-label="Descripció exercici"
                            />
                        </q-field>
                        <div class="row col-md-1">
                            <q-btn 
                                class="col-md-12"
                                :round="$q.platform.is.desktop"
                                icon="ion-close"
                                color="primary"
                                @click="removeExercice($event, exercice)"
                            />
                        </div> 
                    </div>
                </q-field>
            </div>
            <div class="row justify-around">
                <div align="left" class="col-md-6 col-xs-5">
                    <q-btn
                        @click="addExercice"
                        color="primary"
                    >
                        Afegir exercici
                    </q-btn>
                </div>
                <div align="right" class="col-md-6 col-xs-5">
                    <q-btn
                        color="primary"
                        big
                        :disable="$v.all.$error || !$v.all.$dirty"
                        @click="putRoutine"
                    >
                        <span v-if="$route.params.id">Modificar rutina</span>
                        <span v-else>Afegir rutina</span>
                    </q-btn>
                </div>
            </div>    
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
    LocalStorage,
    date
} from 'quasar'

import { 
    required,
    maxLength,
    minLength 
} from 'vuelidate/lib/validators'


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
                    amount: 0,
                    description: '',

                }
            ],
            type: '',
            categories: [],
            categoriesSelected: [],
            user: {
                userName: JSON.parse(atob(LocalStorage.get.item('access_token').split('.')[1])).name
            }
        }
    },
    validations: {
        title: {
            required
        },
        description: {
            maxLength: maxLength(300)
        },
        categoriesSelected: {
            required,
            minLength: minLength(1),
        },
        type: {
            required
        },
        all: ['title', 'description', 'categoriesSelected', 'type']
    },
    /* 
        TODO need to check if there is a parameter from the url to fetch 
        the data from the actual routine and be able modify
    */
    mounted() {
        this.getCategories()
        if (this.$route.params.id) this.getConcreteRoutine()
    },
    methods: {
        addExercice(e) {
            e.preventDefault()
            this.exercices.push({
                repeticions: 0,
                descripcio: ''
            })
        },
        removeExercice(e, exercice) {
            e.preventDefault()
            this.exercices.splice(this.exercices.indexOf(exercice), 1)
        },
        putRoutine() {
            this.$http.put('/api/addRoutine', {
                title: this.title,
                description: this.description,
                type: this.type,
                exercises: this.exercices,
                categories: this.categoriesSelected,
                creationDate: date.formatDate(new Date(),'YYYY-MM-DD'),
                user: this.user
            }).then(console.log, console.log)
        },
        getCategories() {
            this.$http.get('/api/getCategories').then(res => res.json(), console.log)
                .then(categories => {
                    categories.forEach((category, i) => {
                        this.categories.push({ 
                            label: category.title, 
                            value: {
                                id: i+1,
                                title: category.title
                            } 
                        })
                    })
            })
        },
        getConcreteRoutine() {
            this.$http.get('/api/getRoutine', {
                params: {
                    routine: this.$route.params.id,
                    username: this.user.userName
                }
            }).then(res => console.log(res), console.log)
            .then(rutina => {
                console.log(rutina)
                this.title = routine.title
                this.description = rutina.description || ''
                this.type = routine.type
                this.exercices = routine.exercices
                this.categoriesSelected = routine.categories
            })
        }
    },
}
</script>

<style>

</style>
