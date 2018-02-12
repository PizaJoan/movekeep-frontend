<template>
    <div>
        <!--q-card flat>
            <q-card-title align="center">
                Que volem aconseguir?
            </q-card-title>
            <q-card-main>
                    <q-card>
                        <q-card-title>
                            Mantenir-se positiu
                        </q-card-title>
                        <q-card-main>
                            <q-item-tile sublabel lines="4">
                                Avui en día és necessari per mantenir una rutina de deport mantenir-se positiu
                                i amb ganes de seguir realitzant activitat física
                            </q-item-tile>
                        </q-card-main>
                    </q-card>
                    <q-card>
                        <q-card-title>
                            Estar motivat
                        </q-card-title>
                        <q-card-main>
                            <q-item-tile sublabel>
                                Amb una comunitat agradable de persones que volen ajudar no només compartint rutines
                                d'exercici de tot tipus i manera sino que també donant ànims
                            </q-item-tile>
                        </q-card-main>
                    </q-card>
                    <q-card>
                        <q-card-title>
                            Ser saludable
                        </q-card-title>
                        <q-card-main>

                        </q-card-main>
                    </q-card>
            </q-card-main>
        </q-card -->
        <q-list no-border>
            <q-list-header align="center">
                Que volem aconseguir?
            </q-list-header>
            <q-list-header align="center">
                    Crear comunitat
            </q-list-header>
            <q-item>
                <q-item-main>
                    <q-item-tile label>
                        Mantenir-se positiu
                    </q-item-tile>
                    <q-item-tile sublabel>
                        Avui en día és necessari per mantenir una rutina de deport mantenir-se positiu
                        i amb ganes de seguir realitzant activitat física
                    </q-item-tile>
                </q-item-main>
                <q-item-main>
                    <q-item-tile align="center" label>
                        Estar motivat
                    </q-item-tile>
                    <q-item-tile sublabel>
                        Amb una comunitat agradable de persones que volen ajudar no només compartint rutines
                        d'exercici de tot tipus i manera sino que també donant ànims
                    </q-item-tile>
                </q-item-main>
                <q-item-main>
                    <q-item-tile label>
                        Ser saludable
                    </q-item-tile>
                    <q-item-tile sublabel>
                        Gràcies a la comunitat i a les pròpies rutines et mantindràs saludable i milloraras la 
                        teva condició física
                    </q-item-tile>
                </q-item-main>
            </q-item>
            <q-list-header align="center">
                    Ajudar-te
            </q-list-header>
            <q-item>
                <q-item-main>
                    <q-item-tile label>
                        Rutines
                    </q-item-tile>
                    <q-item-tile sublabel>
                        Gràcies a la pròpia comunitat i a tu tindràs accés total a les rutines i 
                        podrás fer tantes com vulguis
                    </q-item-tile>
                </q-item-main>
                <q-item-main>
                    <q-item-tile label>
                        Varietat
                    </q-item-tile>
                    <q-item-tile sublabel>
                        Ja que tots contribuïum la varietat de rutines és amplia separades per categoríes i
                        nivell de la mateixa
                    </q-item-tile>
                </q-item-main>
            </q-item>
            <q-list-header align="center">
                    Sense compromisos
            </q-list-header>
            <q-item>
                <q-item-main>
                    <q-item-tile label>
                        No compromisos
                    </q-item-tile>
                    <q-item-tile sublabel>
                        Dins aquesta app no es marca cap tipus d'objectiu menys el clar de mantenir-se
                        saludable i en moviment fent rutines
                    </q-item-tile>
                </q-item-main>
                <q-item-main>
                    <q-item-tile label>
                        Tu decideixes
                    </q-item-tile>
                    <q-item-tile sublabel>
                        Aquí tu ets qui marca el que vols fer realitzant rutines sense cap tipus d'entrenador
                        ni obligacions tu decideixes quan i com
                    </q-item-tile>
                </q-item-main>
            </q-item>
        </q-list>
    </div>

</template>

<script>
import {
    QCard, 
    QCardTitle, 
    QCardMain, 
    QCardMedia,
    QList,
    QListHeader,
    QItemMain,
    QItem,
    QItemTile,
    QItemSide
} from 'quasar'

export default {
    components: {
        QCard,
        QCardTitle,
        QCardMain,
        QCardMedia,
        QList,
        QListHeader,
        QItemMain,
        QItem,
        QItemTile,
        QItemSide
    }
}
</script>

<style>

</style>
