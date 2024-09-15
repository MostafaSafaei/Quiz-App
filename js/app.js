const app = Vue.createApp({

    data() {
        return {
            questions: [],
            answers: [],
            player: [],
            currentQuestion: {},
            acceptingAnswers: true,
            score: 0,
            questionCounter: 0,

        }
    },

    mounted() {
        
    },

    methods: {
        getNewQuestion(){
            this.questionCounter++
            const questionIndex = Math.floor(Math.random() * this.questions.length)
            this.currentQuestion = this.questions[questionIndex]
            
        }
    },
})

app.mount('#app')