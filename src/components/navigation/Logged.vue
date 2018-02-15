<template>
    <q-layout
        view="hhh LpR fff"
        ref="layout"
    >
        <q-toolbar slot="header">
            <!--q-btn @click="$refs.layout.toggleLeft()"  big>
                <q-icon name="menu" />
                Explora
            </q-btn-->
            <q-tabs class="col-md-12">
                <img v-if="$q.platform.is.desktop" slot="title" class="avatar self-center" src="./../../statics/logo-movekeep-png.png" alt="logo" />
                <q-tab 
                    slot="title" 
                    @click="$refs.layout.toggleLeft()" 
                    label="Explora"
                    icon="ion-navicon-round"
                    hide="label"
                >
                    <!--q-btn @click="$refs.layout.toggleLeft()"  big>
                        <q-icon name="menu" />
                    </q-btn-->
                 </q-tab> 
                <q-route-tab 
                    to="/" 
                    default 
                    label="Inici" 
                    slot="title"
                    icon="ion-home"
                    hide="label"
                >
                    <!--router-link to="/" class="text-blanc self-center">
                            <!--h5 v-if="this.$q.platform.is.desktop"-->
                            
                            <!--/h5-->
                    <!--/router-link-->
                </q-route-tab>
                <q-route-tab 
                    to="/login" 
                    label="Compte" 
                    slot="title"
                    icon="ion-person"
                    hide="label"
                >
                    <!--router-link to="/login" class="text-blanc self-center on-right"-->
                            <!--h5 v-if="this.$q.platform.is.desktop"-->
                        
                            <!--/h5-->
                    <!--/router-link-->
                </q-route-tab>
                <q-route-tab 
                    slot="title"
                    label="Historial"
                    to="/history"
                    icon="ion-ios-clock"
                    hide="label"
                >
                    <!--router-link to="/history" class="text-blanc self-center on-right"-->
                            <!--h5 v-if="this.$q.platform.is.desktop"-->
                    
                            <!--/h5-->
                    <!--/router-link-->
                </q-route-tab>                        
                <q-route-tab 
                    to="/logoff" 
                    label="Tancar sesió"
                    slot="title"
                    icon="ion-android-exit"
                    hide="label"
                >
                    <!--router-link to="/logoff" class="self-center text-blanc on-right"-->
                          
                    <!--/router-link-->
                </q-route-tab>
            </q-tabs>
            <!--q-btn icon="ion-android-exit" >
                <!--q-icon name="ion-android-exit" /-->
                <!--Tancar sesió-->
            <!--/q-btn-->
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
        <div class="row justify-center">
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
        click(e) {
            console.log(e, this)
            e.preventDefault()
            
        } 
    }
}
</script>

<style>
</style>
