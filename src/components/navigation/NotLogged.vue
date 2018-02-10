<template>
    <q-layout>
        <router-view />
        <q-toolbar slot="footer">
            <q-toolbar-title>
                Footer &copy Joan Pizà Ferrà
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
