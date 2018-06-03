<template>
    <q-page padding>
        <q-card flat>
            <transition
                enter-active-class="animated fadeInRight"
            >   
                <div v-if="!!routine.exercises">
                    <q-card-title>
                        {{ routine.title }} - <span class="gray">{{ routine.user.name }}</span>
                    </q-card-title>  
                    <q-card-main>
                        <h6 class="gray">{{ $t('description') | capitalize }}</h6> 
                        <p>{{ routine.description }}</p>
                    </q-card-main>
                    <q-card-separator />
                    <q-card-main>
                        <h6 class="gray">{{ $tc('exercise', routine.exercises.lenght) | capitalize }}</h6> 
                        <p>Test</p>
                    </q-card-main>
                </div>
            </transition>
            <q-inner-loading :visible="!routine.exercises">
                <q-spinner-mat size="50px" color="primary"></q-spinner-mat>
            </q-inner-loading>
        </q-card>
    </q-page>
</template>

<script>
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

export default {
    // name: 'PageName',
    data() {
        return  {
            routine: '',
            comments: []
        }
    },
    mounted() {
        let { user, id } = this.$route.params
        this.$http.get(`${process.env.API}/routine/get/`,{
            params: {
                routine: id,
                username: user
            }
        }).then(res => res.json(), this.goBack)
        .then(routine => {
            this.routine = routine
            this.connect()
        })
    },
    methods: {
        goBack(err) {
            this.$router.go(-1)
        },
        connect() {
            this.socket = new SockJS(process.env.WEBSOCK)
            this.stompClient = Stomp.over(this.socket)
            this.stompClient.connect({}, (frame) => {
                this.sendComment()
                this.stompClient.subscribe('/get-comments/get', (res) => {
                    console.log('RES: ', res)
                })
            })
        },
        sendComment(comment) {
            console.log(this.comments)
            if (!comment) this.comments.push({ routine: { id: this.routine.id } })
            else this.comments.push(comment)
            this.stompClient.send('/send-comments/insert', JSON.stringify(this.comments[this.comments.length - 1]), {})
        }
    }
}
</script>

<style lang="scss" scoped>

    .gray {
        color: darken(white, 63%);
    }

</style>

