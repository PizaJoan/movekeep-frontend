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
                    to="/routines"
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
                <q-route-tab 
                    to="/logoff" 
                    label="Tancar sesió"
                    slot="title"
                    icon="ion-android-exit"
                    hide="label"
                >
                </q-route-tab>
            </q-tabs>
        </q-toolbar>

        <div slot="left">
            <q-list no-border separator>
                <q-list-header>Categories</q-list-header>
                <q-side-link item to="/login">
                    <q-item-side icon="face"/>
                    <q-item-main sublabel="Login">Pantalla login</q-item-main>
                </q-side-link>
                <q-side-link item to="/reset">
                    <q-item-side icon="mail"/>
                    <q-item-main sublabel="Reset">Pantalla reset</q-item-main>
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
    QTabPane
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
    mounted() {
    },
    methods: {
    }
}
</script>

<style>
</style>
