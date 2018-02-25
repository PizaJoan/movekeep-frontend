<template>
  <div>
      <q-data-table
        :data="routines"
        :config="config"
        :columns="columns"
        @refresh="getRoutines"
        @rowclick="veureRutina"
      >

      </q-data-table>
  </div>
</template>

<script>
import {
    QDataTable,
    date
} from 'quasar'

export default {
    components: {
        QDataTable,
    },
    data() {
        return {
            routines: [],
            config: {
                rowHeight: '50px',
                title: `Rutines de ${this.$route.params.category}`,
                refresh: true,
                columnPicker: true,
                noHeader: false,
                pagination: {
                    rowsPerPage: 10,
                    options: [ 5, 10, 15, 20]
                },
                labels: {
                    columns: 'Mostra',
                    allCols: 'Totes les columnes',
                    search: 'Cerca',
                },
                messages: {
                    noData: 'No tenim resultats...',
                    noDataAfterFiltering: 'No s\'han trobat resultats...'
                }
            },
            columns: [
                {
                    label: 'Titol rutina',
                    field: 'titol',
                    width: '100px', 
                    filter: true,
                    type: 'string',
                    sort: true,
                    sorc(a, b) {
                        return a - b
                    }
                },
                {
                    label: 'Nom autor',
                    field: 'author',
                    width: '100px',
                    filter: true,
                    type: 'string',
                    sort: true,
                    sort(a, b) {
                        return a - b
                    }
                },
                {
                    label: 'Tipus',
                    field: 'tipus',
                    width: '100px',
                    format(type, row) {
                        return type.charAt(0).toUpperCase() + type.slice(1)
                    },
                    filter: true,
                    type: 'string',
                    sort: true,
                    sort(a, b) {
                        return a - b
                    }
                },
                {
                    label: 'Data de creació',
                    field: 'date',
                    width: '100px',
                    format(data, row) {
                        return date.formatDate(data, 'DD/MM/YYYY')
                    },
                    filter: true,
                    type: 'date',
                    sort: true,
                    sort(a, b) {
                        return (new Date(b) - new Date(a))
                    }
                }
            ]
        }
    },
    mounted() {
        this.getRoutines()
    },
    methods: {
        getRoutines(done) {
            this.routines = []
            this.$http.get(`/api/getRoutinesByCategory/${this.$route.params.category}`)
                .then(res => res.json(), err => {
                    this.$router.push('/')
                }).then(routines => {
                    console.log(routines)
                    routines.forEach((routine, i) => {
                        this.routines.push({
                            titol: routine.title,
                            author: routine.user.name,
                            tipus: routine.type,
                            date: routine.creationDate
                        })
                    })
                    if (done) done()
                })
        },
        veureRutina(row) {
            console.log(row)
        }
    }
}
</script>

<style>

</style>
