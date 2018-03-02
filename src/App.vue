<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
/*
 * Root component
 */
export default {}
</script>

<style>
    .toolbar-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo-footer {
        width: 25px;
    } 

    .carta {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: calc(20vh - 50px);
    }

</style>
