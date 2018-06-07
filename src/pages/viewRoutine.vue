<template>
    <q-page padding>
        <q-card flat>
            <transition
                enter-active-class="animated fadeInRight"
            >   
                <div v-if="!!routine.exercises">
                    <q-card-title>
                        <h4>{{ routine.title }} - <span class="gray">{{ routine.user.name }}</span></h4>
                    </q-card-title>  
                    <q-card-main>
                        <h6 class="gray">{{ $t('description') | capitalize }}</h6> 
                        <p>{{ routine.description }}</p>
                    </q-card-main>
                    <q-card-separator />
                    <q-card-main>
                        <h6 class="gray">{{ $tc('exercise', routine.exercises.lenght) | capitalize }}</h6> 
                        <q-list no-border>
                            <q-item v-for="(exercise, index) in routine.exercises" :key="index">
                                {{ exercise.description }}
                            </q-item>
                        </q-list>
                        <q-card-separator />
                        <h6 class="gray">{{ $t('comments') | capitalize }}</h6>
                        <template v-if="comments.lenght">
                            <q-list no-border>
                                <q-item v-for="comment in comments" :key="comment.id">
                                    
                                </q-item>        
                            </q-list>
                        </template>
                        <template v-else>
                            <p>{{ $t('no-comments') }}</p>
                        </template>
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
            comments: [],
            socket: '',
            stompClient: ''
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
            // this.connect()
        })
    },
    methods: {
        goBack(err) {
            this.$router.go(-1)
        },
        connect() {
            this.socket = new SockJS(process.env.WEBSOCK)
            this.stompClient = Stomp.over(this.socket, { debug: !process.env.PROD })
            this.stompClient.connect({}, (frame) => {
                this.sendComment()
                this.stompClient.subscribe('/get-comments/get', this.updateComments)
            })
        },
        sendComment(comment) {
            this.updateComments(comment)
            this.stompClient.send('/send-comments/insert', JSON.stringify(this.comments[this.comments.length - 1]), {})
        },
        updateComments(frame) {
            if (!comment || !this.comments.length) this.comments.push({ routine: { id: this.routine.id } })
            else this.comments.push(comment)
        }
    }
}
</script>

<style lang="scss" scoped>

    .gray {
        color: darken(white, 63%);
    }

</style>

