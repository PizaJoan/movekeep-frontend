<template>
    <q-layout
        view="hhh LpR fff"
        ref="layout"
    >
        <q-toolbar slot="header">
            <q-tabs class="col-md-12">
                <img v-if="$q.platform.is.desktop" slot="title" class="avatar self-center" src="./../../statics/logo-movekeep-png.png" alt="logo" />
                <q-tab 
                    slot="title" 
                    @click="$refs.layout.toggleLeft()" 
                    label="Explora"
                    icon="ion-navicon-round"
                    hide="label"
                >
                 </q-tab> 
                <q-route-tab 
                    to="/"
                    default 
                    label="Inici" 
                    slot="title"
                    icon="ion-home"
                    hide="label"
                >
                </q-route-tab>
                <q-route-tab 
                    to="/account" 
                    label="Compte" 
                    slot="title"
                    icon="ion-person"
                    hide="label"
                >
                </q-route-tab>
                <q-route-tab
                    to="/my-routines"
                    label="Rutines"
                    slot="title"
                    hide="label"
                    icon="ion-stats-bars"
                >
                </q-route-tab>
                <q-route-tab 
                    slot="title"
                    label="Historial"
                    to="/history"
                    icon="ion-ios-clock"
                    hide="label"
                >
                </q-route-tab>                        
                <q-tab 
                    label="Tancar sesió"
                    slot="title"
                    icon="ion-android-exit"
                    @click="logOut"
                    hide="label"
                >
                </q-tab>
            </q-tabs>
        </q-toolbar>

        <div slot="left">
            <q-list no-border separator>
                <q-list-header>Categories</q-list-header>
                <q-side-link item v-for="category in categories" :key="category.title" :to="`/routines/${category.title.toLowerCase()}`">
                    <q-item-side icon="ion-android-list" />
                    <q-item-main :sublabel="category.title">Veure rutines de {{ category.title }}</q-item-main>
                </q-side-link>
            </q-list>
        </div>
        <router-view />
        <q-toolbar slot="footer">
            <q-toolbar-title class="toolbar-flex">
                <img class="logo-footer" alr="logo" src="./../../statics/logo-movekeep-png.png" /> 
                Movekeep
            </q-toolbar-title>
        </q-toolbar>
    </q-layout>
</template>

<script>
import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QList,
    QSideLink,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QIcon,
    QTabs,
    QTab,
    QRouteTab,
    QTabPane,
    LocalStorage
} from 'quasar'

export default {
    components: {
        QLayout,
        QTabs,
        QTab,
        QIcon,
        QToolbar,
        QToolbarTitle,
        QBtn,
        QList,
        QSideLink,
        QListHeader,
        QItem,
        QItemSide,
        QItemMain,
        QRouteTab,
        QTabPane
    },
    data() {
        return {
            categories: []
        }
    },
    mounted() {
        this.$http.get('/api/getCategories').then(response => response.json(), error => {
            console.log(error)
        }).then(categories => {
            console.log(categories)
            this.categories = categories
        })
    },
    methods: {
        logOut(e) {
            console.log(e)
            LocalStorage.clear()
            this.$router.push('/')
        }
    }
}
</script>

<style>
</style>
