<template>
    <q-page padding>
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
                    error-label="Aquest camp s'ha d'emplenar i màxim 40 caràcters"
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
                    class="marge-top"
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
                    class="marge-top"
                >
                    <q-select
                        multiple
                        filter
                        :options="categories"
                        v-model="categoriesSelected"
                        @focus="$v.categoriesSelected.$touch()"
                        filter-placeholder="Cerca una categoria"
                        float-label="Categories seleccionades"
                    />

                </q-field>
                <q-field
                    helper="Marca l'opció si la teva rutina va per temps o per repeticions"
                    error-label="Has de triar qualcuna opció"
                    :error="$v.type.$error"
                    class="marge-top"
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
                <div class="column">
                    <div class="column marge-top" v-for="exercise in exercises" :key="exercise.title" v-show="type">
                        <span>{{`Exercici ${exercises.indexOf(exercise) + 1}`}}</span>
                        <div class="row justify-between marge-top">
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
                                    size="0.75rem"
                                    icon="ion-close"
                                    color="primary"
                                    @click="removeExercise($event, exercise)"
                                />
                            </div> 
                        </div>
                    </div>
                </div>
                <div class="row justify-around marge-top">
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
                            :disable="this.$v.all.$error || !this.$v.all.$dirty"
                            @click="putRoutine"
                        >
                            <span v-if="this.id">Modificar rutina</span>
                            <span v-else>Afegir rutina</span>
                        </q-btn>
                    </div>
                </div>    
            </q-card-main>
        </q-card>
    </q-page>
</template>

<script>

    import { required, maxLength, minLength } from 'vuelidate/lib/validators'

    export default {
        // name: 'PageName',
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
                    userName: JSON.parse(atob(this.$q.localStorage.get.item('access_token').split('.')[1])).name
                },
                creationDate: undefined
            }
        },
        validations: {
            title: {
                required,
                maxLength: maxLength(40)
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
        },
        methods: {
            addExercise(e) {
                e.preventDefault()
                this.exercises.push({
                    amount: 0,
                    descripcio: ''
                })
            },
            removeExercise(e, exercise) {
                e.preventDefault()
                this.exercises.splice(this.exercises.indexOf(exercise), 1)
            },
            putRoutine() {
                this.$http.post(`${process.env.API}/routine/add`, {
                    id: this.id || null,
                    title: this.title,
                    description: this.description,
                    type: this.type,
                    exercises: this.exercises,
                    categories: this.categoriesSelected.map(categorySelected => ({ id: categorySelected })),
                    creationDate: this.creationDate || date.formatDate(new Date(),'YYYY-MM-DD'),
                    user: this.user
                }).then(res => this.$router.push('/my-routines'), err => this.$router.push('/login'))
            },
            getCategories() {
                this.$http.get(`${process.env.API}/category/all/id`).then(res => res.json(), err => this.$router.push('/login'))
                    .then(categories => {
                        this.categories = categories.map(category => (
                            { 
                                label: category.title, 
                                value: category.id
                            }
                        )
                    )
                })
            },
            getConcreteRoutine() {
                this.$http.get(`${process.env.API}/routine/get`, {
                    params: {
                        routine: this.id,
                        username: this.user.userName
                    }
                }).then(res => res.json())
                .then(routine => {
                    this.title = routine.title
                    this.description = routine.description || ''
                    this.type = routine.type
                    this.exercises = routine.exercises
                    this.categoriesSelected = routine.categories.map(category => category.id)
                    this.creationDate = routine.creationDate
                    this.$v.all.$touch()
                    this.$router.replace('/manage-routine')
                })
            }
        },
    }
</script>

<style>
</style>
