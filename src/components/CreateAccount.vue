<template>
  <div class="row carta">
      <q-card :flat="this.$q.platform.is.mobile" square class="col-lg-4">
          <q-card-title align="center">
                <q-tooltip class="my-tooltip" color="negative">
                    Anar a la pantalla principal
                </q-tooltip>                
                <router-link to="/">
                    <img class="responsive avatar" src="./../statics/logo-movekeep-working-png-big.png" alt="logo" />
                    <h5>
                        Compte nova
                    </h5>
                </router-link>
                <span slot="subtitle">Crear compte nova</span>
          </q-card-title>
          <q-card-main>

          </q-card-main>
      </q-card>
  </div>
</template>

<script>
import {
    QCard,
    QCardTitle,
    QTooltip,
    QCardMain,
    QInput,
} from 'quasar'

import {

} from 'vuelidate/lib/validators'

export default {
    components: {
        QCard,
        QCardTitle,
        QTooltip,
        QCardMain,
        QInput,
    }
}
</script>

<style>

</style>
