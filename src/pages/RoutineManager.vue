<template>
    <q-page>
        <q-list stripped link separator no-border>
            <q-list-header inset>
                {{ this.$t('routines') }}
                <router-link to="/manage-routine">
                    <template v-if="this.$q.platform.is.mobile">
                        <q-icon name="ion-plus" color="info" size="1.5rem" class="on-right" />
                    </template>
                    <template v-else>
                        <q-btn round color="primary" icon="ion-plus" class="on-right" />
                    </template>
                </router-link>
                <span v-if="this.$q.platform.is.desktop" class="on-right">{{ this.$t('manager.explain') }}</span>
            </q-list-header>
            <q-item-separator />
            <transition
                appear
                enter-active-class="animated fadeInRight"
            >
                <div v-if="!loading">
                    <q-item v-for="routine in routines" :key="routine.id">
                        <q-item-side>
                            <q-item-tile icon="ion-information-circled" />
                        </q-item-side>
                        <q-item-main @click.native="!routine.activeButton && $q.platform.is.mobile && $router.push(`/manage-routine/${routine.id}`)">
                            <q-item-tile label lines="3">{{ $t('title') }}: {{ routine.title }}</q-item-tile>
                            <q-item-tile sublabel>{{ $t('routineOfSingular') }}: {{ routine.type | getTypeRoutine }}</q-item-tile>
                            <q-item-tile sublabel>{{ $t('date') }}: {{ routine.creationDate }}</q-item-tile>
                        </q-item-main>
                        <q-item-side right>
                            <template v-if="$q.platform.is.mobile">
                                <q-item-tile icon="ion-close-round" size="1.5rem" @click.native="!routine.activeButton && deleteRoutineCheck($event, routine)" />
                            </template>  
                            <template v-else>
                                <q-btn round :loading="routine.activeButton" color="primary" icon="ion-close-round" @click="deleteRoutineCheck($event, routine)" />
                            </template>      
                            <q-btn :loading="routine.activeButton" v-if="$q.platform.is.desktop" round color="primary" icon="ion-edit" @click="$router.push(`/manage-routine/${routine.id}`)" />
                        </q-item-side>
                    </q-item>
                </div>
            </transition>
            <q-inner-loading :visible="loading">
                <q-spinner-mat size="50px" color="primary"></q-spinner-mat>
            </q-inner-loading>
        </q-list>
    </q-page>
</template>

<script>
    export default {
    // name: 'PageName',
        data() {
            return {
                routines: [],
                userName: JSON.parse(atob(this.$q.localStorage.get.item('access_token').split('.')[1])).name,
                loading: false,
            }
        },
        mounted() {
            this.getMyRoutines()
        },
        methods: {
            deleteRoutineCheck(e, routine) {
                this.$q.dialog({
                    title: 'Estas segur que vols esborrar la rutina ' + routine.title,
                    message: 'Alerta, un cop borrat no es pot recuperar!',
                    ok: { 
                        label: 'Borrar', 
                        color: 'negative'
                    },
                    cancel: 'Cancelar'
                }).then(() => {
                    routine.activeButton = !routine.activeButton
                    let esborrant = this.$q.notify({
                        type: 'info',
                        message: 'Esborrant rutina...',
                    })
                    this.$http.delete(`${process.env.API}/routine/delete`, {
                        params: {
                            routine: routine.id,
                            username: this.userName
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            esborrant()
                            this.$q.notify({
                                type: 'info',
                                message: 'Rutina esborrada',
                                actions: [
                                    {
                                        label: '',
                                        icon: 'ion-close',
                                        handler: () => {}
                                    }
                                ]
                            })
                        } else {
                            esborrant()
                            this.$q.notify({
                                type: 'negative',
                                message: 'No s\'ha pogut esborrar la rutina...',
                                actions: [
                                    {
                                        label: '',
                                        icon: 'ion-close',
                                        handler: () => {}
                                    }
                                ]
                            })
                        }
                        this.getMyRoutines()
                    })
                })
            },
            async getMyRoutines() {
                this.loading = !this.loading
                try {
                    let routinesToJson = await this.$http.get(`${process.env.API}/routine/user/${this.userName}`)
                    let routines = await routinesToJson.json()
                    this.routines = routines.map(routine => {
                        routine.activeButton = false
                        return routine
                    })
                } finally {
                    this.loading = !this.loading
                }
            },

        }
    }
</script>

<style>
</style>
