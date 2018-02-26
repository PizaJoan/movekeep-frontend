<template>
    <div>
        <q-list 
            no-border 
            separator 
            highlight
        >
            <q-list-header align="center">
                Informació de {{ user.name }}
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
                            prefix="Penja una foto de perfil distinta"
                            url="/api/imageUpload"
                            name="image"
                            :multiple="false"
                            extenseions=".png.jpg.jpeg"
                            :additionalFields="[
                                {
                                    name: 'username',
                                    value: user.userName
                                }
                            ]"
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
                    label="Nom d'usuari:"
                />
            </q-item>
            <q-item>
                <q-item-side>
                    <q-item-tile icon="ion-email"></q-item-tile>
                </q-item-side>
                <q-item-main 
                    :sublabel="user.creationDate"
                    label="Data d'alta:"
                />
            </q-item>                         
        </q-list>
    </div>
</template>

<script>
import {
    QBtn,
    QList,
    QItemMain,
    QItem,
    QItemTile,
    QItemSide,
    QListHeader,
    QUploader,
    QField,
    LocalStorage
} from 'quasar'
export default {
    components: {
        QList,
        QField,
        QUploader,
        QBtn,
        QListHeader,
        QItemMain,
        QItem,
        QItemTile,
        QItemSide,
    },
    data() {
        return  {
            user: {
                name: '',
                userName: '',
                picture: '',
                creationDate: ''
            }
        }
    },
    mounted() {
        /*
            TODO add some fetching data to get the user information...(maybe)
        */

       this.user.userName = JSON.parse(atob(LocalStorage.get.item('access_token').split('.')[1])).name
       this.getInfo()
    },
    methods: {
        getInfo() {
            this.$http.get(`/api/getInfo/${this.user.userName}`).then(res => res.json(), console.log)
                .then(user => {
                    this.user.name = user.name
                    this.user.picture = user.pathToImage || 'http://simpleicon.com/wp-content/uploads/user-5.png'
                    this.user.creationDate = user.creationDate
            })
        },
        uploaded() {
            this.$refs.uploader._data.files.pop()
            //this.$refs.uploader.pop()
        }
    }
}
</script>

<style>

</style>
