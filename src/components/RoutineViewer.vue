<template>
  <div>
        <q-btn
            color="primary"
        >
            <excel 
                :data="routines"
                :fields="{
                        'Titol rutina': 'titol',
                        'Autor rutina': 'author',
                        'Temps/Repeticions': 'tipus',
                        'Data creacio': 'date'
                    }"
                name="rutines.xls"
                type="xls"
            >
                Exportar Excel
            </excel>
        </q-btn>  
        <q-btn
            color="primary"
            @click="pdfExport"
        >
            Exportar PDF
        </q-btn>
        <q-data-table
            ref="table"
            :data="routines"
            :config="config"
            :columns="columns"
            @refresh="getRoutines"
        >
        </q-data-table> 
  </div>
</template>

<script>
import {
    QDataTable,
    date,
    QBtn,
    LocalStorage,
} from 'quasar'

import JsonExcel from 'vue-json-excel'

import jsPDF from 'jsPDF'

export default {
    components: {
        QDataTable,
        Excel: JsonExcel,
        QBtn
    },
    data() {
        return {
            routines: [],
            config: {
                rowHeight: '50px',
                title: '',
                refresh: true,
                columnPicker: true,
                pagination: {
                    rowsPerPage: 5,
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
                    sort(a, b) {
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
                    label: 'Temps/Repeticions',
                    field: 'tipus',
                    width: '100px',
                    filter: true,
                    type: 'string',
                    sort: true,
                    sort(a, b) {
                        return a > b ? 1 : -1
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
                },
            ],
        }
    },
    mounted() {
        this.getRoutines()
        this.$refs.table.filtering.terms = LocalStorage.get.item('last_search') || ''
    },
    computed: {
        customSearch: function() {
            let cerca = this.$refs.table.filtering.terms
            LocalStorage.set('last_search', cerca)
            if (cerca.length < 1) LocalStorage.remove('last_search')
            return cerca
        }
    },
    watch: {
        '$route.params.category': function(category) {
            this.getRoutines()
        }, 
    },
    methods: {
        getRoutines(done) {
            this.config.title = `Rutines de ${this.$options.filters.capitalize(this.$route.params.category)}`
            this.routines = []
            this.$http.get(`/api/getRoutinesByCategory/${this.$route.params.category}`)
                .then(res => res.json(), err => {
                    this.$router.push('/')
                }).then(routines => {
                    routines.forEach((routine, i) => {
                        this.routines.push({
                            titol: routine.title,
                            author: routine.user.name,
                            tipus: this.$options.filters.getTypeRoutine(routine.type),
                            date: routine.creationDate
                        })
                    })
                    if (done) done()
                })
        },
        veureRutina(row) {
            //TODO implementar la funcionalitat per vure la rutina en sí per la próxima entrega
            console.log(row)
        },
        pdfExport(e) {
            e.preventDefault()
            let pdf = new jsPDF()
        /*

            let taula = document.createElement('table')
            let tr = document.createElement('tr')
            this.columns.forEach(col => {
                let th = document.createElement('th')
                th.innerHTML = col.label
                tr.appendChild(th)
            })
            taula.appendChild(tr)

            this.routines.forEach(routine => {
                let tr = document.createElement('tr')
                
                let titol = document.createElement('td')
                titol.innerHTML = routine.titol

                let author = document.createElement('td')
                author.innerHTML = routine.author

                let tipus = document.createElement('td')
                tipus.innerHTML = routine.tipus

                let date = document.createElement('td')
                date.innerHTML = routine.date

                tr.appendChild(titol)
                tr.appendChild(author)
                tr.appendChild(tipus)
                tr.appendChild(date)
                taula.appendChild(tr)
            })
        */
            let dataToExport = [`Rutines de: ${this.$options.filters.capitalize(this.$route.params.category)}`]
            this.routines.forEach((routine, i) => dataToExport.push(`- Rutina ${i + 1}: ${routine.titol} ${routine.author} ${routine.tipus} ${routine.date}`))

            pdf.text(dataToExport, 15, 17)
            pdf.save(`routines-${this.$route.params.category}.pdf`)
        },
        change(e) {
            console.log(e)
        }
    }
}
</script>

<style>

</style>
