<template>
    <q-page class="flex column">
        <q-table
            :data="routines"
            :columns="config"
            :filter="filter"
            :loading="loading"
            :pagination="{ rowsPerPage: 20, page: 1 }"
        >
            <template slot="top" slot-scope="props">
                <h5 class="col-md-6 col-xs-12">{{ `${$t('routineOf')} ${$options.filters.capitalize($route.params.category)}` }}</h5>
                <q-search
                    v-model="filter"
                    class="col-md-6 col-xs-12"
                />
            </template>
            <q-tr slot="body" slot-scope="props" :props="props" @click.native="viewRoutine(props.row)" class="cursor-pointer">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                    {{ col.value }} 
                </q-td>
            </q-tr>
        </q-table>
    </q-page>
</template>

<script>
    export default {
        data() {
            return {
                routines: [],
                config: [
                    {
                        name: 'title',
                        label: '',
                        field: 'titol',
                        required: true,
                        sortable: true,
                        align: 'center'
                    },
                    {
                        name: 'author',
                        label: '',
                        field: 'author',
                        required: true,
                        sortable: true,
                        align: 'center'
                    },
                    {
                        name: 'tipus',
                        label: '',
                        field: 'tipus',
                        required: true,
                        sortable: true,
                        align: 'center'
                    },
                    {
                        name: 'date',
                        label: '',
                        field: 'date',
                        required: true,
                        sortable: true,
                        align: 'center',
                        sort: (a,b) => new Date(b) - new Date(a)
                    }
                ],
                filter: '',
                loading: false,
            }
        },
        watch: {
            '$route.params.category': function(category) {
                this.getRoutines()
            },
            '$i18n.locale': function(lang) {
                this.setFields()
            }
        },
        mounted() {
            this.setFields()
            this.getRoutines()
        },
        methods: {
            setFields() {
                this.config[0].label = this.$t('title')
                this.config[1].label = this.$t('author')
                this.config[2].label = this.$t('type')
                this.config[3].label = this.$t('date')
            },
            getRoutines() {
                this.loading = !this.loading
                this.routines = []
                this.$http.get(`${process.env.API}/routine/all/category/${this.$route.params.category}`)
                    .then(res => res.json(), err => {
                        this.$q.notify({
                            type: 'negative',
                            message: 'Error',
                            actions: [
                                {
                                    label: '',
                                    icon: 'ion-close',
                                    handler: () => { }
                                }
                            ]
                        })
                        this.loading = !this.loading
                    }).then(routines => {
                        this.routines = routines.map(routine => ({
                            id: routine.id,
                            username: routine.user.userName,
                            titol: routine.title,
                            author: routine.user.name,
                            tipus: this.$options.filters.getTypeRoutine(routine.type),
                            date: routine.creationDate
                        }))
                        this.loading = !this.loading
                    })
            },
            viewRoutine(routine) {
                this.$router.push(`/view-routine/${routine.username}/${routine.id}`)
            }
        }
    }
</script>

<style>
</style>
