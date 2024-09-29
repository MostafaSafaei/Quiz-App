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
            score: [],
            currentQuestion: {},
            clickToStart: false,
            playing: false,
            endGame: false,
            submitedModal: false,
            playerDetailModal: false,
            playerName: "",
            totalScore: 0,
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

        fetch('../db/Score.json')
        .then(res => res.json())
        .then(data => this.score = data)
    },

    methods: {
        startGame(){
            this.playing = true
            this.questionCounter = 0
            this.totalScore = 0
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
            //     // localStorage.setItem('finaltotalScore', this.totalScore)
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
                        this.totalScore++
                    }
                }
                this.tempSelectedAnswer = {}
                console.log(this.tempSelectedAnswer)
                console.log(this.userAnswers)
                console.log(this.totalScore)
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
        },
        submitQuiz(){

            let ind = null
            for(p in this.player){
                ind = this.player[p].id
            }
            let newPlayer = {
                id: ind + 1,
                name: this.playerName
            }

            fetch("../db/Player.json" , {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newPlayer)
            })
            console.log(newPlayer)

            let ind1 = null
            for(s in this.score){
                ind1 = this.score[s].id
            }

            for(ua in this.userAnswers){
                let newScore = {
                    id: ind1 + 1,
                    playerId: ind + 1,
                    answerId: this.userAnswers[ua].id
                }
                // fetch('../db/Score.json', {
                //     method: 'POST',
                //     headers: {'Content-Type': 'application/json'},
                //     body: JSON.stringify(newScore)
                // })
                console.log(newScore)
                ind1++
            }

            this.submitedModal = true

            setTimeout(() => {
                this.submitedModal = false
            }, 2500);

            this.playerName = ""
        },
        userDetail(player){
            this.playerDetailModal = true
        }
    },
})

app.mount('#app')