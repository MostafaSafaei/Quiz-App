const app = Vue.createApp({

    data() {
        return {
            quiz: [],
            questions: [],
            avalableQuestions: [],
            answers: [],
            tempAnswer: [],
            // bullet:['A','B','C','D'],
            player: [],
            currentQuestion: {},
            playing: false,
            endGame: false,
            score: 0,
            questionCounter: 0,
            maxQuestion: 10,
            tempSelectedAnswer: {},
            userAnswers: [],
        }
    },

    mounted() {
        fetch('../db/Quiz.json')
        .then(res => res.json())
        .then(data => this.quiz = data)

        fetch('../db/Question.json')
        .then(res => res.json())
        .then(data => this.questions = data)

        fetch('../db/Answer.json')
        .then(res => res.json())
        .then(data => this.answers = data)

        fetch('../db/Player.json')
        .then(res => res.json())
        .then(data => this.player = data)
    },

    methods: {
        startGame(){
            this.playing = true
            this.questionCounter = 0
            this.score = 0
            this.tempAnswer = []
            this.currentQuestion = this.questions[this.questionCounter]
            for(a in this.answers){
                if(this.currentQuestion.id === this.answers[a].questionId){
                    this.tempAnswer.push(this.answers[a])
                }
            }
            this.questions = [...this.questions]
            this.nextQuestion()
        },
        nextQuestion(){
            // if(this.questions.lengh === 0 || this.questionCounter >= this.maxQuestion){
            //     // localStorage.setItem('finalScore', this.score)
            //     // go toend page
            //     this.endGame = true
            // }

            // this.questionCounter++
            // const questionIndex = Math.floor(Math.random() * this.questions.length)
            // this.currentQuestion = this.questions[questionIndex]
            
            this.tempAnswer = []
            if(this.maxQuestion > this.questionCounter){
                this.currentQuestion = this.questions[this.questionCounter]
                for(a in this.answers){
                    if(this.currentQuestion.id === this.answers[a].questionId){
                        this.tempAnswer.push(this.answers[a])
                    }
                }
                this.questionCounter++
                // console.log(this.currentQuestion)
                console.log(this.questionCounter)
                if(!this.isEmptyObject(this.tempSelectedAnswer)){
                    this.userAnswers.push(this.tempSelectedAnswer)
                    if(this.tempSelectedAnswer.correct == true){
                        this.score++
                    }
                }
                this.tempSelectedAnswer = {}
                console.log(this.userAnswers)
                console.log(this.score)
            }
            else{
                this.endGame = true
            }
        },
        previous(){
            if(this.questionCounter > 1){
                this.currentQuestion = {}
                this.tempAnswer = []
                this.questionCounter--
                this.currentQuestion = this.questions[this.questionCounter-1]
                for(a in this.answers){
                    if(this.currentQuestion.id === this.answers[a].questionId){
                        this.tempAnswer.push(this.answers[a])
                    }
                }
            }
            console.log(this.questionCounter)
        },
        selectAnswer(answer){
            this.tempSelectedAnswer = {}
            this.tempSelectedAnswer = answer
        },
        isEmptyObject(obj){
            return JSON.stringify(obj) === '{}';
        }
    },
})

app.mount('#app')