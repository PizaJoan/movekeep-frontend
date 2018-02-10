<template>
    <q-layout
        view="hHh LpR fff"
        ref="layout"
    >
        <q-toolbar slot="header" class="row items-stretch content-center">
            <q-btn big flat @click="$refs.layout.toggleLeft()">
                <q-icon name="menu" />
            </q-btn>
            <router-link to="/" class="text-white self-center">
                    Inici
            </router-link>
            <router-link to="/login" class="text-white self-center">
                    Compte
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
        <router-view />
        <q-toolbar slot="footer">
            <q-toolbar-title>
                Footer © Joan Pizà Ferrà
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
    QTab
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
    }
}
</script>

<style>

</style>
