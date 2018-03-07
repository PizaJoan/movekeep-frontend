<template>
    <q-page class="flex column">
        <q-table
            :data="routines"
            :columns="config"
        />
    </q-page>
</template>

<script>
    export default {
        data() {
            return {
                routines: [],
                title: `Rutines de ${this.$options.filters.capitalize(this.$route.params.category)}`,
                config: [
                    {
                        name: 'title',
                        label: 'Title',
                        field: 'titol'
                    },
                    {
                        name: 'author',
                        label: 'Autor',
                        field: 'author'
                    },
                    {
                        name: 'tipus',
                        label: 'Tipus',
                        field: 'tipus'
                    },
                    {
                        name: 'date',
                        label: 'Data',
                        field: 'date'

                    }
                ],
            }
        },
        watch: {
            '$route.params.category': function(category) {
                this.getRoutines()
            }, 
        },
        mounted() {
            this.getRoutines()
        },
        methods: {
            getRoutines() {
                this.routines = []
                this.$http.get(`${process.env.API}/routine/all/category/${this.$route.params.category}`)
                    .then(res => res.json(), err => {
                        this.$q.notify({
                            type: 'negative',
                            message: 'No s\'han pogut carregar rutines...',
                            actions: [
                                {
                                    label: '',
                                    icon: 'ion-close',
                                    handler: () => { }
                                }
                            ]
                        })
                    }).then(routines => {
                        this.routines = routines.map(routine => ({
                                titol: routine.title,
                                author: routine.user.name,
                                tipus: this.$options.filters.getTypeRoutine(routine.type),
                                date: routine.creationDate
                            })
                        )
                    })
            }
        }
    }
</script>

<style>
</style>
