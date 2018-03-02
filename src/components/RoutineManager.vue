<template>
    <div>
        <q-list stripped link separator no-border>
            <q-list-header inset>
                Rutines
                <router-link to="/manage-routine">
                    <q-btn round color="primary" icon="ion-plus" class="on-right">
                        <q-tooltip>
                            Afegir rutina
                        </q-tooltip>
                    </q-btn>
                </router-link>
                <span v-if="this.$q.platform.is.desktop" class="on-right">Dins aquesta pantalla podrás afegir, modificar i esborrar les teves pròpies rutines</span>
            </q-list-header>
            <q-item-separator />
            <q-item v-for="routine in routines" :key="routine.id">
                <q-item-side>
                    <q-item-tile icon="ion-information-circled" />
                </q-item-side>
                <q-item-main>
                <q-item-tile label>Títol: {{ routine.title }}</q-item-tile>
                <q-item-tile sublabel>Rutina de: {{ routine.type | getTypeRoutine }}</q-item-tile>
                <q-item-tile sublabel>Creada el: {{ routine.creationDate }}</q-item-tile>
                </q-item-main>
                <q-item-side>
                    <q-btn round color="primary" icon="ion-close-round" @click="deleteRoutineCheck($event, routine)">
                        <q-tooltip>
                            Esborrar
                        </q-tooltip>    
                    </q-btn>
                    <q-btn round color="primary" icon="ion-edit" @click="$router.push(`/manage-routine/${routine.id}`)">
                        <q-tooltip>
                            Editar
                        </q-tooltip>
                    </q-btn>
                </q-item-side>
            </q-item>
        </q-list>
    </div>
</template>

<script>
import {
    QList,
    QListHeader, 
    QItem,
    QIcon,
    QItemMain,
    QItemSide,
    QItemTile,
    QBtn,
    QTooltip,
    QItemSeparator,
    Dialog,
    LocalStorage,
    Toast
} from 'quasar'

export default {
    components: {
        QList,
        QBtn,
        QItemSeparator,
        QItemSide,
        QIcon,
        QListHeader,
        QItem,
        QItemMain,
        QItemTile,
        QTooltip
    },
    data() {
        return {
            routines: [],
            userName: ''
        }
    },
    mounted() {
        this.getMyRoutines()
    },
    methods: {
        deleteRoutineCheck(e, routine) {
            Dialog.create({
                title: 'Estas segur que vols esborrar la rutina ' + routine.title,
                message: 'Alerta, un cop borrat no es pot recuperar!',
                buttons: [
                    {
                        label: 'CANCELAR',
                        handler() {
                        },
                        raised: true,
                        color: 'primary'
                    },
                    {
                        label: 'OK',
                        handler: () => {
                            let dialog = Dialog.create({
                               title: 'Esborrant...',
                                progress: { 
                                    indeterminate: true 
                                },
                                noButtons: true,
                            })

                            setTimeout(() => {
                                this.$http.delete('http://192.168.1.41:8080/routine/delete', {
                                    params: {
                                        routine: routine.id,
                                        username: this.userName
                                    }
                                }).then(res => {
                                    dialog.close()
                                    if (res.status == 200) Toast.create('Rutina borrada amb éxit')
                                    else Toast.create('No s\'ha pogut esborrar la rutina...')
                                    this.getMyRoutines()
                                }, console.log)
                            }, 300)
                        },
                        color: 'negative',
                        raised: true,
                    }
                ]
            })
        },
        getMyRoutines() {
            this.userName = JSON.parse(atob(LocalStorage.get.item('access_token').split('.')[1])).name

            this.$http.get(`http://192.168.1.41:8080/routine/user/${this.userName}`).then(res => res.json(), console.log)
                .then(myRoutines => this.routines = myRoutines)
        },
    }
}
</script>

<style>

</style>
