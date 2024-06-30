'use client'
import Image from "next/image";
import React, {useState, useEffect} from "react";
import IntroPage from "./components/landingPage"
import MainPage from "./components/mainPage"
import {nanoid} from "nanoid"


export default function Home() {
  const [currentPage, setCurrentPage] = useState("intro")
  const [questions, setQuestions]= useState([])
  const [responseCode, setResponseCode] = useState(null)
  const [error, setError] = useState(null)
  const [answerCheck, setAnswerCheck] = useState("")
  const [holdOneAnswer, setHoldOneAnswer] = useState({})
  const [decodedCorrectAnswer, setDecodedCorrectAnswer] = useState(null)
  const [decodedIncorrectAnswer, setDecodedIncorrectAnswer] = useState([])
  const [loading, setLoading] = useState(false)

  const decodeHtml = (html) => {
      var txt = document.createElement("textarea")
      txt.innerHTML = html
      return txt.value
  }

  const getApi = async () => {
    setLoading(true)
    try{
        const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        const data = await res.json()
        console.log(data)
        if(data.response_code === 0){
            const decodedQuestions = data.results.map((item) => {
                const decodeCorrectAnswer = decodeHtml(item.correct_answer)
                const decodeIncorrectAnswer = item.incorrect_answers.map(decodeHtml)
                setDecodedCorrectAnswer(decodeCorrectAnswer)
                setDecodedIncorrectAnswer(decodeIncorrectAnswer)
                const answers = shuffleArray([decodeCorrectAnswer, ...decodeIncorrectAnswer])
                return{
                    ...item,
                    question : decodeHtml(item.question),
                    answers: answers.map((answer, index) => ({
                        id: nanoid(),
                        text: answer,
                        isCorrect: answer === decodeCorrectAnswer,
                        isHeld: false
                    }))
                }
            })
            setQuestions(decodedQuestions)
            setResponseCode(data.response_code)
        }else{
            setError("API rate limit exceeds")
            setResponseCode(data.response_code)
        }
    }catch(error){
        console.log("Error fetching the API data:", error)
        setError("Error fetching data from the API")
    }
    setLoading(false)
  }
  useEffect(() =>{
      getApi()
  }, [])
  
  function shuffleArray(array) {
      for(let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
  function holdAnswer(id){
      setQuestions(prevQuestions => prevQuestions.map(question => {
          return{
              ...question,
              answers: question.answers.map(answer => {
                  return answer.id === id?
                  {...answer, isHeld: !answer.isHeld}
                  : answer
              })
          }
      }))
  }
  function checkAnswer(){
      let correctCount = 0;
      for(let i=0;i<questions.length;i++){
          const question = questions[i]
          let anyAnswerSelected = false
          for(let j =0;j<question.answers.length; j++){
              const answer = question.answers[j]
              if(answer.isCorrect && holdOneAnswer[i] === answer.id){
                  correctCount ++
              }
              if(holdOneAnswer[i] === answer.id){
                  anyAnswerSelected = true
              }
          }
          if(!anyAnswerSelected){
              console.log("attempt all the questions")
          }
      }
      setAnswerCheck(`you scored ${correctCount}/${questions.length} correct answers`)
  }
  function resetGame(){
        setQuestions([])
        setResponseCode(null)
        setError(null)
        setAnswerCheck("")
        setHoldOneAnswer({})
        setDecodedCorrectAnswer(null)
        setDecodedIncorrectAnswer([])
        getApi()
  }
  return(
    <main>
        {currentPage === "intro"?(
             <IntroPage
             onStartQuiz = {() => setCurrentPage("main")}
         />):(
            <MainPage
            responseCode = {responseCode}
            questions = {questions}
            error={error}
            holdAnswer = {holdAnswer}
            checkAnswer = {checkAnswer}
            answerCheck = {answerCheck}
            holdOneAnswer = {holdOneAnswer}
            setHoldOneAnswer = {setHoldOneAnswer}
            decodedCorrectAnswer = {decodedCorrectAnswer}
            decodedIncorrectAnswer = {decodedIncorrectAnswer}
            resetGame = {resetGame}
            loading = {loading}
        />
         )
        }
    </main>
)
}