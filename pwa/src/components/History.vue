<template>
  <div class="row carta">
      <q-card :flat="$q.platform.is.mobile">
          <q-card-title>
              <span align="center">Estam treballant aquest apartat...</span>
          </q-card-title>
          <q-card-main align="center" class="row justify-around">
                <q-btn @click="$router.go(-1)" color="primary">
                    Enrrere
                </q-btn>
                <q-btn @click="$router.push('/')" color="primary">
                    Principal
                </q-btn>
          </q-card-main>
      </q-card>
  </div>
</template>

<script>
import {
    QCard,
    QCardTitle,
    QBtn,
    QCardMain
} from 'quasar'

export default {
    components: {
        QCard,
        QCardTitle,
        QBtn,
        QCardMain
    }
}
</script>

<style>

</style>
