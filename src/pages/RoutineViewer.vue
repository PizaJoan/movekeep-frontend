<template>
    <q-page class="flex column">
        <q-table
            :data="routines"
            :columns="config"
            :rows-per-page-options="[5, 10, 15, 20]"
            :filter="filter"
            :loading="loading"
        >
            <template slot="top" slot-scope="props">
                <h5 class="col-md-6 col-xs-12">{{ title }}</h5>
                <q-search
                    v-model="filter"
                    class="col-md-6 col-xs-12"
                />
            </template>
        </q-table>
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
                        field: 'titol',
                        required: true,
                        sortable: true,
                        align: 'center'
                    },
                    {
                        name: 'author',
                        label: 'Autor',
                        field: 'author',
                        required: true,
                        sortable: true,
                        align: 'center'
                    },
                    {
                        name: 'tipus',
                        label: 'Tipus',
                        field: 'tipus',
                        required: true,
                        sortable: true,
                        align: 'center'
                    },
                    {
                        name: 'date',
                        label: 'Data',
                        field: 'date',
                        required: true,
                        sortable: true,
                        align: 'center',
                        sort: (a,b) => new Date(b) - new Date(a)
                    }
                ],
                filter: '',
                loading: false
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
                this.loading = !this.loading
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
                        }))
                        this.loading = !this.loading
                    })
            },
        }
    }
</script>

<style>
</style>
