<template>
  <div>
      {{ routines }}
  </div>
</template>

<script>
export default {
    data() {
        return {
            routines: []
        }
    },
    mounted() {
        this.$http.get(`/api/getRoutinesByCategory/${this.$route.params.category}`)
            .then(res => res.json(), err => {
                this.$router.push('/')
            }).then(routines => {
                console.log(routines)
                this.routines = routines
            })
    }
}
</script>

<style>

</style>
