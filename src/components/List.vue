<template>
    <div>
        <q-list stripped link separator no-border>
            <q-list-header>Animals</q-list-header>
            <q-item v-for="animal in data" :key="animal.name">
                <q-item-side>
                    <q-item-tile icon="ion-ios-paw" />
                </q-item-side>
                <q-item-main 
                    :label="animal | capitalize | isLovely" 
                    :sublabel="`Té ${animal.age} anys i fa ${animal.height} d'altura`"
                />
                <q-item-side>
                    Editar
                    <q-btn rounded>
                        <q-icon name="ion-plus" />
                    </q-btn>
                    <q-btn rounded>
                        <q-icon name="ion-edit" />
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
    QBtn
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
        QItemTile
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
                    lovely: false,
                    height: 100
                }
            ]
        }
    }
}
</script>

<style>

</style>
