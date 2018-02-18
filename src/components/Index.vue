<template>
        <div class="row justify-center items-center content-center" id="big-container">
            <h5 class="col-12" align="center">Que volem aconseguir?</h5>
            <div class="col-md-4 col-xs-12">
                <q-card>
                    <q-card-media>
                        <img src="./../statics/positivisme.png" alt="positiu"/>
                    </q-card-media>
                    <q-card-title align="center">
                        Mantenir-se positiu
                        <q-icon name="ion-plus" size="2rem" class="on-right" />
                    </q-card-title>
                    <q-card-main>
                        <q-item-tile sublabel align="center">
                            Avui en día és necessari per mantenir una rutina de deport mantenir-se positiu
                            i amb ganes de seguir realitzant activitat física
                        </q-item-tile>
                    </q-card-main>
                </q-card>
            </div>
            <div class="col-md-4 col-xs-12">
                    <q-card>
                    <q-card-media>
                        <img src="./../statics/motivacio.png" alt="motivat">
                    </q-card-media>
                    <q-card-title align="center">
                        Estar motivat
                        <q-icon name="ion-android-happy" size="2rem" class="on-right" />
                    </q-card-title>
                    <q-card-main>
                        <q-item-tile sublabel align="center">
                            Amb una comunitat que volen ajudar no només compartint rutines
                            d'exercici de tot tipus i manera sino que també donant ànims
                        </q-item-tile>
                    </q-card-main>
                </q-card>
            </div>
            <div class="col-md-4 col-xs-12">
                <q-card>
                    <q-card-media>
                        <img src="./../statics/saludable.png" alt="saludable">
                    </q-card-media>
                    <q-card-title align="center"> 
                        Ser saludable
                        <q-icon name="ion-thumbsup" size="2rem" class="on-right" />
                    </q-card-title>
                    <q-card-main>
                        <q-item-tile sublabel align="center">
                            Gràcies a la comunitat i a les pròpies rutines et mantindràs saludable i milloraras la 
                            teva condició física
                        </q-item-tile>
                    </q-card-main>
                </q-card>
            </div>
            <div class="col-md-6 col-xs-12">
                <q-card>
                    <q-card-media>
                        <img src="./../statics/rutines.jpg" alt="rutines">
                    </q-card-media>
                    <q-card-title align="center">
                        Rutines
                        <q-icon name="ion-android-walk" size="2rem" class="on-right" />
                    </q-card-title>
                    <q-card-main>
                        <q-item-tile sublabel align="center">
                            Gràcies a la pròpia comunitat i a tu tindràs accés total a les rutines i 
                            podrás fer tantes com vulguis
                        </q-item-tile>
                    </q-card-main>
                </q-card>
            </div>
            <div class="col-md-6 col-xs-12">
                <q-card>
                    <q-card-media>
                        <img src="./../statics/possiblitats.png" alt="varietat">
                    </q-card-media>
                    <q-card-title align="center"> 
                        Varietat
                        <q-icon name="ion-ios-box" size="2rem" class="on-right" />
                    </q-card-title>
                    <q-card-main>
                        <q-item-tile sublabel align="center">
                            Ja que tots contribuïum la varietat de rutines és amplia separades per categoríes i
                            nivell de la mateixa
                        </q-item-tile>
                    </q-card-main>
                </q-card>
            </div>
            <div class="col-md-6 col-xs-12">
                <q-card>
                    <q-card-media>
                        <img src="./../statics/compromisos.png" alt="compromisos" class="imatge">
                    </q-card-media>
                    <q-card-title align="center">
                        <b>NO</b> compromisos
                        <q-icon name="ion-ios-clock" size="2rem" class="on-right" />
                    </q-card-title>
                    <q-card-main>
                        <q-item-tile sublabel align="center">
                            Dins aquesta app no es marca cap tipus d'objectiu menys el clar de mantenir-se
                            saludable i en moviment fent rutines
                        </q-item-tile>
                    </q-card-main>
                </q-card>
            </div>
            <div class="col-md-6 col-xs-12">
                <q-card>
                    <q-card-media>
                        <img src="./../statics/decideixes.png" alt="tu" class="imatge">
                    </q-card-media>
                    <q-card-title align="center"> 
                        <b>TU</b> decideixes
                        <q-icon name="ion-ios-body" size="2rem" class="on-right" />
                    </q-card-title>
                    <q-card-main>
                        <q-item-tile sublabel align="center">
                            Aquí tu ets qui marca el que vols fer realitzant rutines sense cap tipus d'entrenador
                            ni obligacions tu decideixes quan i com
                        </q-item-tile>
                    </q-card-main>
                </q-card>
            </div>
    </div>
</template>

<script>
import {
    QWindowResizeObservable,
    QCard,
    QIcon,
    QCardTitle,
    QCardMain,
    QCardMedia,
    QList,
    QListHeader,
    QItemMain,
    QItem,
    QItemTile,
    QItemSide,
} from 'quasar'

export default {
    components: {
        QWindowResizeObservable,
        QCard,
        QIcon,
        QCardTitle,
        QCardMain,
        QCardMedia,
        QList,
        QListHeader,
        QItemMain,
        QItem,
        QItemTile,
        QItemSide,
    },
    data() {
        return {
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style scoped>

</style>
