<i18n>
{
    "es": {
        "label": "Rutinas de",
        "tableTitle": "Titulo",
        "tableAuthor": "Autor",
        "tableType": "Tipo",
        "tableDate": "Fecha"
    },
    "ca": {
        "label": "Rutines de",
        "tableTitle": "Títol",
        "tableAuthor": "Autor",
        "tableType": "Tipus",
        "tableDate": "Data"
    },
    "en-uk": {
        "label": "Routines of",
        "tableTitle": "Title",
        "tableAuthor": "Author",
        "tableType": "Type",
        "tableDate": "Date"
    }
}
</i18n>

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
                <h5 class="col-md-6 col-xs-12">{{ `${$t('label')} ${$options.filters.capitalize($route.params.category)}` }}</h5>
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
                config: [
                    {
                        name: 'title',
                        label: 'title',
                        field: 'titol',
                        required: true,
                        sortable: true,
                        align: 'center'
                    },
                    {
                        name: 'author',
                        label: this.$t('tableAuthor'),
                        field: 'author',
                        required: true,
                        sortable: true,
                        align: 'center'
                    },
                    {
                        name: 'tipus',
                        label: this.$t('tableType'),
                        field: 'tipus',
                        required: true,
                        sortable: true,
                        align: 'center'
                    },
                    {
                        name: 'date',
                        label: this.$t('tableDate'),
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
            }
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
