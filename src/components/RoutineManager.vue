<template>
    <div>
        <q-list stripped link separator no-border>
            <q-list-header inset>
                Rutines
                <q-btn round icon="ion-plus" class="on-right">
                    <q-tooltip>
                        Afegir rutina
                    </q-tooltip>
                </q-btn>
            </q-list-header>
            <q-item v-for="animal in data" :key="animal.name">
                <q-item-side>
                    <q-item-tile icon="ion-ios-paw" />
                </q-item-side>
                <q-item-main 
                    :label="animal | capitalize | isLovely" 
                    :sublabel="`Té ${animal.age} anys i fa ${animal.height} d'altura`"
                />
                <q-item-side>
                    <q-btn round icon="ion-close-round">
                        <q-tooltip>
                            Esborrar
                        </q-tooltip>    
                    </q-btn>
                    <q-btn round icon="ion-edit">
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
    QTooltip
} from 'quasar'

export default {
    components: {
        QList,
        QBtn,
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
            data: []
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
        }
    }
}
</script>

<style>

</style>
