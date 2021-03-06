<template>
    <q-page padding>
        <q-card flat>
            <transition
                enter-active-class="animated fadeInRight"
            >   
                <div v-if="!!routine.exercises">
                    <q-card-title>
                        <h4>{{ routine.title }} - <span class="grey">{{ routine.user.name }}</span></h4>
                    </q-card-title>  
                    <q-card-main>
                        <h6 class="grey">{{ $t('description') | capitalize }}</h6> 
                        <p>{{ routine.description }}</p>
                    </q-card-main>
                    <q-card-separator />
                    <q-card-main>
                        <h6 class="grey">{{ $tc('exercise', routine.exercises.lenght) | capitalize }}</h6> 
                        <q-list no-border>
                            <q-item v-for="(exercise, index) in routine.exercises" :key="index">
                                <q-item-main>
                                    {{ exercise.description }}
                                </q-item-main>
                                <q-item-side>
                                    {{ exercise.amount }} {{ $t(`${routine.type}routine`) | capitalize }}
                                </q-item-side>
                            </q-item>
                        </q-list>
                        <template v-if="this.isLogged()">
                        <q-card-separator />
                            <q-field
                                class="q-mt-sm"
                                :label-width="12"
                                :label="$t('routine-comments.add')"
                            >
                                <q-input
                                    inverted
                                    class="black-text"
                                    color="white"
                                    type="textarea"
                                    v-model="currentComment"
                                    :disable="loadingSendComment"
                                    ref="commentInput"
                                    maxlength="255"
                                    placeholder="Max 255"
                                />
                            </q-field>
                            <div class="row justify-center">
                                <q-btn
                                    @click.native="sendComment(currentComment.trim())"
                                    class="q-mt-sm"
                                    color="primary"
                                    :loading="loadingSendComment"
                                    :disabled="!currentComment.length"
                                >
                                    {{ $t('send') | capitalize}}
                                </q-btn>
                            </div>
                        </template>
                        <q-card-separator class="q-mt-md" />
                        <h6 class="grey">{{ $t('comments') | capitalize }}</h6>
                        <template v-if="comments.length">
                            <q-list 
                                separator
                                no-border
                            >
                                <q-item v-for="comment in comments" :key="comment.id" multiline>
                                    <q-item-main
                                    >
                                        <q-item-tile label>
                                            <q-icon name="ion-person" />
                                            {{ comment.user.name }}
                                            <span class="float-right" v-if="$q.platform.is.mobile">{{ comment.date }}</span>
                                        </q-item-tile>
                                        <q-item-tile sublabel :lines="comment.content / 20">
                                            {{ comment.content | addSpaces($q.platform.is.mobile) }}
                                        </q-item-tile>
                                    </q-item-main>
                                    <q-item-side v-if="$q.platform.is.desktop">
                                        {{ comment.date }}
                                    </q-item-side>
                                </q-item>        
                            </q-list>
                        </template>
                        <template v-else>
                            <p class="grey text-center">{{ $t('no-comments') }}</p>
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
            stompClient: '',
            currentComment: '',
            loadingSendComment: false,
            loadingComments: false
        }
    },
    mounted() {
        this.loadingComments = !this.loadingComments
        let { user, id } = this.$route.params
        this.$http.get(`${process.env.API}/routine/get/`,{
            params: {
                routine: id,
                username: user
            }
        }).then(res => res.json(), this.goBack)
        .then(routine => {
            this.comments = routine.comments
            delete routine.comments
            this.routine = routine
            this.loadingComments = !this.loadingComments
            this.connect()
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
                this.stompClient.subscribe('/get-comments/get', this.updateComments)
            })
        },
        sendComment(comment) {
            this.loadingSendComment = true
            this.stompClient.send('/send-comments/insert', JSON.stringify({
                id: null,
                user: { userName: JSON.parse(atob(this.$q.localStorage.get.item('access_token').split('.')[1])).name },
                routine: { id: this.routine.id },
                content: comment,
                date: null
            }), {})
            this.$refs.commentInput.clear()
        },
        updateComments(frame) {
            let comment = JSON.parse(frame.body)
            this.comments.push(comment)
            this.loadingSendComment = false
        },
        isLogged() {
            return this.$q.localStorage.has('access_token') && this.$q.localStorage.has('refresh_token')
        }
    },
    filters: {
        addSpaces(comment, platform) {
            let maxlength = platform ? 50 : 150
            if (comment.includes(' ') || comment.length <= maxlength) return comment
            else {
                let tmpComment = Object.assign({}, comment)
                return comment.split('').map((letter, i) => {
                    if (i % Math.round(Math.random() * 10) == 0) letter += ' '
                    return letter
                }).join('')
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    .grey {
        color: darken(white, 63%);
    }

    h6 {
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .black-text {
        color: black !important;
    }

</style>

