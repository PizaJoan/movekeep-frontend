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
            <q-item v-for="animal in data" :key="animal.name">
                <q-item-side>
                    <q-item-tile icon="ion-ios-paw" />
                </q-item-side>
                <q-item-main 
                    :label="animal | capitalize | isLovely" 
                    :sublabel="`Té ${animal.age} anys i fa ${animal.height} d'altura`"
                />
                <q-item-side>
                    <q-btn round color="primary" icon="ion-close-round" @click="deleteRoutineCheck($event, animal)">
                        <q-tooltip>
                            Esborrar
                        </q-tooltip>    
                    </q-btn>
                    <q-btn round color="primary" icon="ion-edit" @click="$router.push(`/manage-routine/${animal.name.toLowerCase()}`)">
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
            data: [],
            requesting: {
                indeterminate: false
            }
        }
    },
    mounted() {
        this.someMethod()
    },
    methods: {
        someMethod() {
            this.data = [
                {
                    name: 'mimi',
                    age: '1',
                    lovely: true,
                    height: 20
                },
                {
                    name: 'dog',
                    age: '2',
                    lovely: true,
                    height: 100
                }
            ]
        },
        deleteRoutineCheck: (e, routine) => {
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
                                dialog.close()
                            },  1000)
                        },
                        color: 'negative',
                        raised: true,
                    }
                ]
            })
        },
    }
}
</script>

<style>

</style>
