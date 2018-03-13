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
            <q-item v-for="routine in routines" :key="routine.id">
                <q-item-side>
                    <q-item-tile icon="ion-information-circled" />
                </q-item-side>
                <q-item-main @click.native="$router.push(`/manage-routine/${routine.id}`)">
                    <q-item-tile label lines="3">{{ $t('title') }}: {{ routine.title }}</q-item-tile>
                    <q-item-tile sublabel>{{ $t('routineOfSingular') }}: {{ routine.type | getTypeRoutine }}</q-item-tile>
                    <q-item-tile sublabel>{{ $t('date') }}: {{ routine.creationDate }}</q-item-tile>
                </q-item-main>
                <q-item-side right>
                    <template v-if="$q.platform.is.mobile">
                        <q-item-tile  icon="ion-close-round" size="1.5rem" @click="deleteRoutineCheck($event, routine)" />
                    </template>  
                    <template v-else>
                        <q-btn round color="primary" icon="ion-close-round" @click="deleteRoutineCheck($event, routine)" />
                    </template>      
                    <q-btn v-if="$q.platform.is.desktop" round color="primary" icon="ion-edit" @click="$router.push(`/manage-routine/${routine.id}`)" />
                </q-item-side>
            </q-item>
        </q-list>
    </q-page>
</template>

<script>
    export default {
    // name: 'PageName',
        data() {
            return {
                routines: [],
                userName: JSON.parse(atob(this.$q.localStorage.get.item('access_token').split('.')[1])).name
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
            getMyRoutines() {
                this.$http.get(`${process.env.API}/routine/user/${this.userName}`).then(res => res.json())
                    .then(myRoutines => this.routines = myRoutines)
            },

        }
    }
</script>

<style>
</style>
