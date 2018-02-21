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
                        <img :src="user.picture" alt="userpic" class="avatar" />
                    </q-item-side>
                </q-item-side>
                <q-item-main 
                    label="Foto de perfil"
                />
                <q-item-side>
                    <q-btn round icon="ion-edit" color="primary" disable />
                </q-item-side>
            </q-item>
            <q-item>
                <q-item-side>
                    <q-item-tile icon="ion-person"></q-item-tile>
                </q-item-side>
                <q-item-main 
                    :sublabel="user.userName"
                    label="Nom d'usuari:"
                />
                <q-item-side>
                    <q-btn round icon="ion-edit" color="primary" disable />
                </q-item-side>
            </q-item>
            <q-item>
                <q-item-side>
                    <q-item-tile icon="ion-email"></q-item-tile>
                </q-item-side>
                <q-item-main 
                    :sublabel="user.mail"
                    label="Correu electronic:"
                />
                <q-item-side>
                    <q-btn round icon="ion-edit" color="primary" disable />
                </q-item-side>
            </q-item>
            <q-item>
                <q-item-side>
                    <q-item-tile icon="ion-heart"></q-item-tile>
                </q-item-side>
                <q-item-main 
                    :sublabel="user.score.toString()"
                    label="Puntuació:"
                />
                <q-item-side v-if="$q.platform.is.desktop">
                    Aquí veus el nº de vots que has obtingut dins les teves rutines
                </q-item-side>
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
} from 'quasar'
export default {
    components: {
        QList,
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
                name: 'Joan Pizà Ferrà',
                userName: 'jpizaf',
                mail: 'jpizaf@gmail.com',
                score: 100,
                picture: 'http://simpleicon.com/wp-content/uploads/user-5.png'
            }
        }
    },
    mounted() {
        /*
            TODO add some fetching data to get the user information...(maybe)
        */
       this.$http.get('/api/getInfo', {
            params: { 
               username: 'jpizaf'
            }
        }).then(res => res.json(), console.log)
        .then(user => {
           this.user.name = user.name
           this.user.userName = user.userName,
           this.user.score = user.points
        })
    },
}
</script>

<style>

</style>
