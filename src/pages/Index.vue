<template>
    <q-page>
        <h5 class="col-12" align="center">{{ this.$t('index.title') }}</h5>
        <div class="row justify-center">
            <div class="col-md-4 col-xl-3 col-xs-12">
                <q-card class="separation-card">
                    <q-card-media>
                        <img src="statics/positivisme.png" alt="positiu" class="imatge"/>
                    </q-card-media>
                    <q-card-title align="center">
                        {{ this.$t('index.card1.title') }}
                        <q-icon name="ion-plus" class="on-right" />
                    </q-card-title>
                    <q-card-main>
                        <q-item-tile sublabel align="center">
                           {{ this.$t('index.card1.content') }}
                        </q-item-tile>
                    </q-card-main>
                </q-card>
            </div>
            <div class="col-md-4 col-xl-3 col-xs-12">
                <q-card class="separation-card">
                    <q-card-media>
                        <img src="statics/motivacio.jpg" alt="motivat" class="imatge"/>
                    </q-card-media>
                    <q-card-title align="center">
                        {{ this.$t('index.card2.title') }}
                        <q-icon name="ion-android-happy" class="on-right" />
                    </q-card-title>
                    <q-card-main>
                        <q-item-tile sublabel align="center">
                            {{ this.$t('index.card2.content') }}
                        </q-item-tile>
                    </q-card-main>
                </q-card>
            </div>
            <div class="col-md-4 col-xl-3 col-xs-12">
                <q-card class="separation-card">
                    <q-card-media>
                        <img src="statics/saludable.png" alt="saludable" class="imatge"/>
                    </q-card-media>
                    <q-card-title align="center"> 
                        {{ this.$t('index.card3.title') }}
                        <q-icon name="ion-thumbsup" class="on-right" />
                    </q-card-title>
                    <q-card-main>
                        <q-item-tile sublabel align="center">
                            {{ this.$t('index.card3.content') }}
                        </q-item-tile>
                    </q-card-main>
                </q-card>
            </div>
        </div>
        <div class="row justify-center">
            <div class="col-md-6 col-xl-4 col-xs-12">
                <q-card class="separation-card">
                    <q-card-media>
                        <img src="statics/rutines.png" alt="rutines" class="imatge-2" />
                    </q-card-media>
                    <q-card-title align="center">
                        {{ this.$t('index.card4.title') }}
                        <q-icon name="ion-android-walk" class="on-right" />
                    </q-card-title>
                    <q-card-main>
                        <q-item-tile sublabel align="center">
                            {{ this.$t('index.card4.content') }}
                        </q-item-tile>
                    </q-card-main>
                </q-card>
            </div>
            <div class="col-md-6 col-xl-4 col-xs-12">
                <q-card class="separation-card">
                    <q-card-media>
                        <img src="statics/possiblitats.jpg" alt="varietat" class="imatge-2" />
                    </q-card-media>
                    <q-card-title align="center"> 
                        {{ this.$t('index.card5.title') }}
                        <q-icon name="ion-ios-box" class="on-right" />
                    </q-card-title>
                    <q-card-main>
                        <q-item-tile sublabel align="center">
                            {{ this.$t('index.card5.content') }} 
                        </q-item-tile>
                    </q-card-main>
                </q-card>
            </div>
        </div>
        <div class="row justify-center separation">
            <div class="col-md-6 col-xl-4 col-xs-12">
                <q-card class="separation-card">
                    <q-card-media>
                        <img src="statics/compromisos.png" alt="compromisos" class="imatge-2" />
                    </q-card-media>
                    <q-card-title align="center">
                        <b>NO</b> {{ this.$t('index.card6.title') }}
                        <q-icon name="ion-ios-clock" class="on-right" />
                    </q-card-title>
                    <q-card-main>
                        <q-item-tile sublabel align="center">
                            {{ this.$t('index.card6.content') }}
                        </q-item-tile>
                    </q-card-main>
                </q-card>
              </div>
              <div class="col-md-6 col-xl-4 col-xs-12">
                <q-card class="separation-card">
                    <q-card-media>
                        <img src="statics/decideixes.jpg" alt="tu" class="imatge-2" />
                    </q-card-media>
                    <q-card-title align="center"> 
                        <b>{{ this.$t('you').toUpperCase() }}</b> {{ this.$t('index.card7.title') }}
                        <q-icon name="ion-ios-body" class="on-right" />
                    </q-card-title>
                    <q-card-main>
                        <q-item-tile sublabel align="center">
                            {{ this.$t('index.card7.content') }}
                        </q-item-tile>
                    </q-card-main>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
    export default {
        name: 'PageIndex',
    };
</script>

<style scoped>

    .imatge {
        width: 100%;
        height: 260px;
    }

    .imatge-2 {
        width: 100%;
        height: 300px;
    }

    .separation-card {
      margin: 8px;
    }

</style>
