<template>
    <q-layout>
        <q-layout-footer>
            <q-toolbar>
                <q-toolbar-title>
                    <router-link to="/" tag="img" class="logo-footer" src="statics/logo-movekeep-working-png-big.png" alt="logo" />
                    Movekeep
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

<style scoped>

    .logo-footer {
        width: 25px;
    } 

</style>
