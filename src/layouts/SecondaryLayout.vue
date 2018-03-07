<template>
    <q-layout>
        <q-layout-footer>
            <q-toolbar>
                <q-toolbar-title>
                    <router-link to="/" tag="img" class="avatar" alt="logo" src="statics/logo-movekeep-png.png" /> 
                    <span>Movekeep</span>
                </q-toolbar-title>
            </q-toolbar>
        </q-layout-footer>

        <q-page-container>
            <router-view />
        </q-page-container>

    </q-layout>
</template>

<script>
    export default {
        data () {
            return {
                leftDrawer: true
            }
        }
    }
</script>

<style>
</style>
