<template>
    <q-page class="flex justify-center">
        <q-card flat class="col-md-6 col-xs-12">
            <transition
                enter-active-class="animated fadeInRight"
            >
                <div v-if="!loading">
                    <q-card-title align="center">
                        <img alt="logo" class="responsive" width="100px" src="./../statics/logo-movekeep-working-png-big.png" />
                        <h5>
                            <span v-if="this.id">{{ this.$t('modify') | capitalize }} {{ this.$t('routine') }} {{ this.title | capitalize }}</span>
                            <span v-else>{{ this.$t('add') | capitalize }} {{ this.$t('routina') }}</span>
                        </h5>
                    </q-card-title>
                    <q-card-main>
                        <q-field
                            :error="$v.title.$error"
                            :error-label="this.$t('fields.title.error')"
                            :helper="this.$t('fields.title.info')"
                        >
                            <q-input 
                                v-model.trim="title"
                                type="text"
                                :float-label="this.$t('title')"
                                @click="$v.title.$touch()"
                                @focus="$v.title.$touch()"
                            />
                        </q-field>
                        <q-field
                            :error="this.$v.description.$error"
                            :helper="this.$t('fields.description.info')"
                            :error-label="this.$t('fields.description.error')"
                            class="marge-top"
                        >
                            <q-input 
                                v-model.trim="description"
                                type="textarea"
                                :float-label="this.$t('description') | capitalize"
                                :max-height="50"  
                                @click="$v.description.$touch()" 
                                @focus="$v.description.$touch()"                 
                            />
                        </q-field>
                        <q-field
                            :error="this.$v.categoriesSelected.$error"
                            :helper="this.$t('fields.categories.info')"
                            :error-label="this.$t('fields.categories.error')"
                            class="marge-top"
                        >
                            <q-select
                                multiple
                                filter
                                :options="categories"
                                v-model="categoriesSelected"
                                @focus="$v.categoriesSelected.$touch()"
                                :filter-placeholder="this.$t('fields.categories.placeholder')"
                                :float-label="this.$t('categories')"
                            />

                        </q-field>
                        <q-field
                            :helper="this.$t('fields.type.info')"
                            :error-label="this.$t('fields.type.error')"
                            :error="this.$v.type.$error"
                            class="marge-top"
                        >
                            <q-option-group
                                type="radio"
                                v-model="type"
                                inline
                                @input="$v.type.$touch()"
                                :options="[
                                    { label: this.$t('time'), value: 'time'},
                                    { label: this.$t('reps'), value: 'reps'},
                                ]"
                            />
                        </q-field>
                        <div class="column">
                            <div class="column marge-top" v-for="exercise in exercises" :key="exercise.title" v-show="type">
                                <span>{{ $t('exercise') | capitalize }}  {{ exercises.indexOf(exercise) + 1 }}</span>
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
                                            :float-label="$t('description') | capitalize"
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
                                    {{ this.$t('add') }} {{ this.$t('exercise') }}
                                </q-btn>
                            </div>
                            <div align="right" class="col-md-6 col-xs-5">
                                <q-btn
                                    color="primary"
                                    :disable="$v.all.$error || !$v.all.$dirty"
                                    @click="putRoutine"
                                >
                                    <span v-if="this.id">{{ this.$t('modify') }} {{ this.$t('routine') }}</span>
                                    <span v-else>{{ this.$t('add') }} {{ this.$t('routine') }}</span>
                                </q-btn>
                            </div>
                        </div>    
                    </q-card-main>
                </div>
            </transition>
            <q-inner-loading :visible="loading">
                <q-spinner-mat size="50px" color="primary"></q-spinner-mat>
            </q-inner-loading>
        </q-card>
    </q-page>
</template>

<script>

    import { required, maxLength, minLength } from 'vuelidate/lib/validators'

    import { date } from 'quasar'

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
                creationDate: undefined,
                loading: false
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
                e && e.preventDefault()
                this.exercises.push({
                    amount: 0,
                    description: ''
                })
            },
            removeExercise(e, exercise) {
                e.preventDefault()
                this.exercises.splice(this.exercises.indexOf(exercise), 1)
            },
            putRoutine() {
                this.exercises = this.exercises.filter(exercise => exercise.amount && exercise.description)
                if (this.exercises.length) {
                    this.loading = !this.loading
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
                } else {
                    this.type = ''
                    this.addExercise()
                    this.$v.type.$touch()
                }
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
                this.loading = !this.loading
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
                    this.loading = !this.loading
                    this.$router.replace('/manage-routine')
                })
            }
        },
    }
</script>

<style>
</style>
