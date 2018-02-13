<template>
    <q-layout
        view="hhh LpR fff"
        ref="layout"
    >
        <q-toolbar slot="header" class="row items-stretch content-center">
            <q-btn big flat @click="$refs.layout.toggleLeft()">
                <q-icon name="menu" />
            </q-btn>
            <router-link to="/" class="text-blanc self-center">
                <!--h5 v-if="this.$q.platform.is.desktop"-->
                    Inici
                <!--/h5-->
            </router-link>
            <router-link to="/login" class="text-blanc self-center on-right">
                <!--h5 v-if="this.$q.platform.is.desktop"-->
                    Compte
                <!--/h5-->
            </router-link>
            <router-link to="/history" class="text-blanc self-center on-right">
                <!--h5 v-if="this.$q.platform.is.desktop"-->
                    Historial
                <!--/h5-->
            </router-link>
            <router-link to="/logoff" class="self-center text-blanc on-right">
                Tancar sesió
            </router-link>
        </q-toolbar>

        <div slot="left">
            <q-list no-border separator>
                <q-list-header>Seccions</q-list-header>
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
        <div class="row justify-center no-scroll">
                <router-view />
        </div>
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
        QItemMain
    },
    mounted() {
    },
    methods: {

    }
}
</script>

<style>

   .text-blanc {
       color: white;
   } 


</style>
