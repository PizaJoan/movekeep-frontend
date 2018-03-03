<template>
    <div>
      <div class="row justify-center separat">
            <q-btn
                color="primary"
                class="on-left"
                v-if="this.$q.platform.is.desktop"
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
                class="on-right"
                color="primary"
                @click="pdfExport"
                v-if="this.$q.platform.is.desktop"
            >
                Exportar PDF
            </q-btn>
        </div>
        <q-data-table
            ref="table"
            :data="routines"
            :config="config"
            :columns="columns"
            @refresh="getRoutines"
            @selection="saveSearch"
        >
        </q-data-table> 
    </div>
</template>

<script>
import {
    QDataTable,
    date,
    QBtn,
    Cookies
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
                        if (a > b) return -1
                        return a < b ? 1 : 0
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
                        if (a > b) return -1
                        return a < b ? 1 : 0
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
                        if (a > b) return -1
                        return a < b ? 1 : 0
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
        this.$refs.table.filtering.terms = Cookies.get('cerca') || ''
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
            this.$http.get(`${process.env.API}/routine/all/category/${this.$route.params.category}`)
                .then(res => res.json(), err => {
                    this.$router.push('/')
                }).then(routines => {
                    this.routines = routines.map(routine => ({
                            titol: routine.title,
                            author: routine.user.name,
                            tipus: this.$options.filters.getTypeRoutine(routine.type),
                            date: routine.creationDate
                        })
                    )
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
            let dataToExport = [`Rutines de: ${this.$options.filters.capitalize(this.$route.params.category)}`]
            this.routines.forEach((routine, i) => 
                dataToExport.push(`- Rutina ${i + 1}: ${routine.titol} ${routine.author} ${routine.tipus} ${routine.date}`))

            pdf.text(dataToExport, 15, 17)
            pdf.save(`routines-${this.$route.params.category}.pdf`)
        },
        saveSearch(e) {
            Cookies.set('cerca', this.$refs.table.filtering.terms)
        }
    }
}
</script>

<style scoped>

    .separat {
        padding: 10px;
    }

</style>
