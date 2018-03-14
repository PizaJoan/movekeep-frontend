<template>
    <q-layout>
        <q-layout-footer>
            <q-toolbar>
                <q-toolbar-title>
                    <router-link to="/" tag="img" class="avatar" alt="logo" src="statics/logo-movekeep-png.png" /> 
                    Movekeep
                </q-toolbar-title>
                <span>
                    <span v-if="this.$q.platform.is.desktop">{{ this.$t('languages') | capitalize }}:</span> <q-btn @click.native="changeLang('es')">Es</q-btn> |
                    <q-btn @click.native="changeLang('ca')" tag="span" to="#" >Ca</q-btn> |
                    <q-btn @click.native="changeLang('en-uk')" tag="span" to="#" >En</q-btn>
                </span>
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
        },
        methods: {
            changeLang(lang) {
                if (lang) this.$q.localStorage.set('lang', lang)
                this.$i18n.locale = this.$q.localStorage.get.item('lang') || lang || this.$q.i18n.getLocale()
                import(`quasar-framework/i18n/${this.$i18n.locale}`).then(lang => {
                    this.$q.i18n.set(lang.default)
                })
            }
        },
        created() {
            this.changeLang()
        }
    }
</script>

<style>
</style>
