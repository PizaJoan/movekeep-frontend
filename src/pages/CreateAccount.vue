<template>
    <q-page class="flex flex-center">
        <q-card :flat="this.$q.platform.is.mobile" square class="col-lg-4 col-xs-12">
            <q-card-title align="center">              
                <router-link to="/" tag="img" class="responsive" width="100px" src="./../statics/logo-movekeep-working-png-big.png" alt="logo" />
                <h5 class="no-marge">
                    {{ this.$t('create') | capitalize }} {{ this.$t('account').toLowerCase() }}
                </h5>
            </q-card-title>
            <q-card-main>
                <q-field 
                    :error="$v.user.$error"
                >
                    <q-input
                        :float-label="this.$t('userName') | capitalize"
                        suffix="ex: movekeep-user"
                        v-model="user"
                        @click="$v.user.$touch()"
                        @focus="$v.user.$touch()"
                    />
                </q-field>    
                <q-field
                    :error="$v.name.$error"
                    class="marge-top"
                >
                    <q-input
                        :float-label="this.$t('fullName') | capitalize"
                        suffix="ex: Movekeep User"
                        v-model="name"
                        @click="$v.name.$touch()"
                        @focus="$v.name.$touch()"
                    />
                </q-field>
                <q-field 
                    class="marge-top"
                    :error="$v.password.$error" 
                    :error-label="this.$t('fields.password.password.error')"
                >
                    <q-input 
                        :float-label="this.$t('password') | capitalize"
                        v-model="password"
                        type="password"
                        @click="$v.password.$touch()"
                        @focus="$v.password.$touch()"
                    />
                </q-field>
                <q-field 
                    class="marge-top"
                    :error="$v.repeatPassword.$error"
                    :error-label="this.$t('fields.password.repeat.error')"
                >
                    <q-input 
                        :float-label="`${$options.filters.capitalize(this.$t('repeat'))} ${this.$t('password')}`"
                        v-model="repeatPassword"
                        type="password"
                        @click="$v.repeatPassword.$touch()"
                        @focus="$v.repeatPassword.$touch()"
                    />
                </q-field>
                <div class="flex flex-center marge-top">
                    <q-btn  
                        color="primary"
                        :disable="$v.all.$error || !$v.all.$dirty"
                        @click="createUser($event).catch(error)"
                    >
                        {{ this.$t('send') }}
                    </q-btn>
                </div>
            </q-card-main>
        </q-card>
    </q-page>
</template>

<script>

    import {
        required,
        minLength,
        sameAs
    } from 'vuelidate/lib/validators'

    import { date } from 'quasar'

    export default {
    // name: 'PageName',
        data() {
            return {
                user: '',
                name: '',
                password: '',
                repeatPassword: '',
            }
        },
        validations: {
            user: {
                required
            },
            name: {
                required
            },
            password: {
                required,
                minLength: minLength(6)
            },
            repeatPassword: {
                required,
                sameAsPassword: sameAs('password')
            },
            all: [ 'user', 'password', 'repeatPassword' ]
        },
        methods: {
            async createUser(e) {
                e.preventDefault()

                let auth = await this.$http.post(`${process.env.AUTH}/create-user`, {
                    username: this.user,
                    password: this.password
                })

                this.$q.localStorage.set('access_token', auth.headers.map.authorization[0].replace(/Bearer /, ''))
                this.$q.localStorage.set('refresh_token', auth.body)

                let apiUser = await this.$http.post(`${process.env.API}/user/add`, {
                    userName: this.user,
                    name: this.name,
                    creationDate: date.formatDate(new Date(), 'YYYY-MM-DD')
                })
            },
            error(err) {
                this.$q.notify({
                    type: 'negative',
                    message: 'El nom d\'usuari ja existeix',
                    actions: [
                        {
                            label: '',
                            icon: 'ion-close',
                            handler: () => { }
                        }
                    ]
                })
                this.user = ''
            }
        },
    }
</script>

<style>
</style>
