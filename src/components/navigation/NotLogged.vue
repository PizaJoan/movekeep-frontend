<template>
    <q-layout>
        <router-view />
        <q-toolbar slot="footer">
            <q-toolbar-title class="toolbar-flex">
                <router-link to="/">
                    <img class="logo-footer" alr="logo" src="./../../statics/logo-movekeep-png.png" /> 
                </router-link>
                    
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
} from 'quasar'

export default {
    components: {
        QLayout,
        QToolbar,
        QToolbarTitle,
    }
}
</script>

<style>

</style>
