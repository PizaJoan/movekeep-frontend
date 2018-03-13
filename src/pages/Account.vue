<template>
    <q-page>
        <q-list 
            no-border 
            separator 
            highlight
        >
            <q-list-header align="center">
                {{ this.$t('info') | capitalize }} {{ user.name }}
            </q-list-header>
            <q-item>
                <q-item-side>
                    <q-item-side avatar>
                        <img :src="user.picture | getUserPic" alt="userpic" class="avatar" />
                    </q-item-side>
                </q-item-side>
                <q-item-main>
                        <q-uploader
                            ref="uploader"
                            :stack-label="this.$t('changePhoto')"
                            :url="uploadURL"
                            name="image"
                            method="PUT"
                            :multiple="false"
                            extenseions=".png.jpg.jpeg"
                            hide-upload-progress
                            hide-underline
                            :additionalFields="[
                                {
                                    name: 'username',
                                    value: user.userName
                                }
                            ]"
                            :headers="{
                                'authorization': `Bearer ${user.access}`    
                            }"
                            @finish="getInfo"
                            @uploaded="uploaded"
                        />
                </q-item-main>
            </q-item>
            <q-item>
                <q-item-side>
                    <q-item-tile icon="ion-person"></q-item-tile>
                </q-item-side>
                <q-item-main 
                    :sublabel="user.userName"
                    :label="`${this.$options.filters.capitalize(this.$t('userName'))}:`"
                />
            </q-item>
            <q-item>
                <q-item-side>
                    <q-item-tile icon="ion-email"></q-item-tile>
                </q-item-side>
                <q-item-main 
                    :sublabel="user.creationDate"
                    :label="`${this.$options.filters.capitalize(this.$t('creationDate'))}:`"
                />
            </q-item>                         
        </q-list>
    </q-page>
</template>

<script>
    export default {
        // name: 'PageName',
        data() {
            return  {
                user: {
                    name: '',
                    userName: '',
                    picture: '',
                    creationDate: '',
                    access: this.$q.localStorage.get.item('access_token')
                },
                uploadURL: `${process.env.API}/user/image`
            }
        },
        mounted() {
            this.user.userName = JSON.parse(atob(this.$q.localStorage.get.item('access_token').split('.')[1])).name
            this.getInfo()
        },
        methods: {
            uploaded() {
                this.$refs.uploader._data.files.pop()
            },
            getInfo() {
                this.$http.get(`${process.env.API}/user/info/${this.user.userName}`).then(res => res.json(), this.fail)
                    .then(user => {
                        this.user.name = user.name
                        this.user.picture = user.pathToImage || 'http://simpleicon.com/wp-content/uploads/user-5.png'
                        this.user.creationDate = user.creationDate
                })
            },
            fail(err) {
                this.$q.notify({
                    type: 'negative',
                    message: 'No s\'ha pogut pujar l\'imatge',
                    actions: [
                        {
                            label: '',
                            icon: 'ion-close',
                            handler: () => {}
                        }
                    ]
                })
            }
        }
    }
</script>

<style>
</style>
