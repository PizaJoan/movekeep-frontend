<template>
    <q-page padding>
        <!-- content -->
    </q-page>
</template>

<script>
export default {
    // name: 'PageName',
    data() {
        return  {
            routine: ''
        }
    },
    mounted() {
        let { user, id } = this.$route.params
        this.$http.get(`${process.env.API}/routine/get`,{
            params: {
                routine: id,
                username: user
            }
        }).then(res => res.json(), this.goBack)
        .then(routine => this.routine = routine)
    },
    methods: {
        goBack(err) {
            this.$router.go(-1)
        }
    }
}
</script>

<style>
</style>
