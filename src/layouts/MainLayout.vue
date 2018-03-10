<template>
    <q-layout
        view="hhh LpR fff"
    >
        <q-layout-header>
            <q-toolbar>
                <q-tabs class="col-md-12">
                    <router-link to="/" tag="img" v-if="$q.platform.is.desktop" slot="title" class="avatar self-center" src="statics/logo-movekeep-png.png" alt="logo" />
                    <q-tab 
                        slot="title" 
                        @click="leftDrawer = !leftDrawer" 
                        icon="ion-navicon-round"
                        label="Explora"
                        hide="label"
                    />
                    <q-route-tab 
                        to="/"
                        default 
                        label="Inici" 
                        slot="title"
                        icon="ion-home"
                        hide="label"
                    />
                    <q-route-tab 
                        to="/account" 
                        label="Compte" 
                        slot="title"
                        icon="ion-person"
                        hide="label"
                    />
                    <q-route-tab
                        to="/my-routines"
                        label="Rutines"
                        slot="title"
                        hide="label"
                        icon="ion-stats-bars"
                    />
                    <q-tab 
                        label="Tancar sesió"
                        slot="title"
                        icon="ion-android-exit"
                        @click="logOut"
                        hide="label"
                    />
              </q-tabs>
            </q-toolbar>
        </q-layout-header>
        <q-layout-footer>
            <q-toolbar color="primary">
                <img class="avatar" alt="logo" src="statics/logo-movekeep-png.png" /> 
                <q-toolbar-title>
                    Movekeep
                </q-toolbar-title>
                <span>
                    Languages: <q-btn @click.native="changeLang('es')">Es</q-btn> |
                    <q-btn @click.native="changeLang('ca')" tag="span" to="#" >Ca</q-btn> |
                    <q-btn @click.native="changeLang('en-uk')" tag="span" to="#" >En</q-btn>
                </span>
            </q-toolbar>
        </q-layout-footer>
        <q-layout-drawer
            side="left"
            v-model="leftDrawer"
        >
            <q-scroll-area class="fit">
                <q-list no-border separator>
                    <q-list-header>Categories</q-list-header>
                    <q-item item v-for="category in categories" :key="category.title" :to="`/routines/${category.title.toLowerCase()}`">
                        <q-item-side icon="ion-android-list" />
                        <q-item-main :sublabel="category.title">Veure rutines de {{ category.title }}</q-item-main>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-layout-drawer>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
    export default {
        data () {
            return {
                leftDrawer: true,
                categories: []
              }
          },
        methods: {
            logOut() {
                this.$q.localStorage.clear()
                this.$router.push('/')
            },
            changeLang(lang) {
                import(`quasar-framework/i18n/${lang}`).then(lang => {
                    this.$q.i18n.set(lang.default)
                }) 
            }
        },
        mounted() {
            console.log(this.$q.i18n.getLocale())
            this.$http.get(`${process.env.API}/category/all`).then(res => res.json(), console.log)
                .then(categories => this.categories = categories)
        }    
  }
</script>

<style>
</style>
