<template>
    <div class="row justify-center">
        <q-card flat class="col-md-6">
            <q-card-title align="center">
                <img alt="logo" class="responsive" width="100px" src="./../statics/logo-movekeep-working-png-big.png" />
                <h5>
                    <span v-if="this.id">Modificar rutina {{ this.title | capitalize }}</span>
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
                    :options="categories"
                    v-model="categoriesSelected"
                    @focus="$v.categoriesSelected.$touch()"
                    filter-placeholder="Cerca una categoria"
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
            <div v-for="exercise in exercises" :key="exercise.title" v-show="type">
                <q-field
                    :label="`Exercici ${exercises.indexOf(exercise) + 1}`"
                    :label-width="12"
                >
                    <div class="row justify-between">
                        <q-field 
                            class="col-md-5 col-xs-12"
                        >
                            <q-input
                                :float-label="type | typeRoutine"
                                v-model.trim="exercise.amount"
                                type="number"
                            />
                        </q-field>
                        <q-field class="col-md-5 col-xs-12">
                            <q-input
                                class="col-md-5 col-xs-12"
                                v-model.trim="exercise.description"
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
                                @click="removeExercise($event, exercise)"
                            />
                        </div> 
                    </div>
                </q-field>
            </div>
            <div class="row justify-around">
                <div align="left" class="col-md-6 col-xs-5">
                    <q-btn
                        @click="addExercise"
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
                        <span v-if="this.id">Modificar rutina</span>
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
            id: null,
            title: '',
            description: '',
            exercises: [
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

    created(){
        this.getCategories()
        this.id = this.$route.params.id
        if (this.id) this.getConcreteRoutine()
        this.$router.replace('/manage-routine')
    },
    methods: {
        addExercise(e) {
            e.preventDefault()
            this.exercises.push({
                repeticions: 0,
                descripcio: ''
            })
        },
        removeExercise(e, exercise) {
            e.preventDefault()
            this.exercises.splice(this.exercises.indexOf(exercise), 1)
        },
        putRoutine() {
            this.$http.put('/api/addRoutine', {
                id: this.id || null,
                title: this.title,
                description: this.description,
                type: this.type,
                exercises: this.exercises,
                categories: this.categoriesSelected.map(categorySelected => ({ id: categorySelected })),
                creationDate: date.formatDate(new Date(),'YYYY-MM-DD'),
                user: this.user
            }).then(res => this.$router.push('/my-routines'), console.log)
        },
        getCategories() {
            this.$http.get('/api/getCategoriesWithId').then(res => res.json(), console.log)
                .then(categories => {
                    categories.forEach(category => {
                        this.categories.push({ 
                            label: category.title, 
                            value: category.id
                        })
                    })
            })
        },
        getConcreteRoutine() {
            this.$http.get('/api/getRoutine', {
                params: {
                    routine: this.id,
                    username: this.user.userName
                }
            }).then(res => res.json(), console.log)
            .then(routine => {
                this.title = routine.title
                this.description = routine.description || ''
                this.type = routine.type
                this.exercises = routine.exercises
                this.categoriesSelected = routine.categories.map(category => category.id)
                this.$v.all.$touch()
            })
        }
    },
}
</script>

<style>

</style>
