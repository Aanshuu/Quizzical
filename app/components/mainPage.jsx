'use client'
import React, { useState } from "react";
import Navbar from "./Navbar";

export default function MainPage(props) {
  const handleAnswerCheck = (answerId, questionIndex) => {
    props.setHoldOneAnswer((prevHoldOneAnswer) => ({
      ...prevHoldOneAnswer,
      [questionIndex]: answerId,
    }));
    props.holdAnswer(answerId);
  };

  const [buttonState, setButtonState] = useState(false);
  const [answerStatus, setAnswerStatus] = useState({});
  const [submitButton, setSubmitButton] = useState("Check Answers");

  const handleCheckAnswer = () => {
    if(submitButton === "Play Again"){
      props.resetGame()
      setSubmitButton("Check Answers")
    }else{
      const status = {}
      props.questions.forEach((question, questionIndex) => {
        const correctAnswerId = question.answers.find((answer) => answer.isCorrect).id;
        question.answers.forEach((answer) => {
          const key = `${questionIndex}-${answer.id}`;
          if(answer.id === correctAnswerId){
            if(props.holdOneAnswer[questionIndex] === answer.id){
              status[key] = "#6CBF8F";
            }else{
              status[key] = "#6CBF8F";
            }
          }else if(props.holdOneAnswer[questionIndex] === answer.id){
            status[key] = "#F8BCBC";
          }
        })
      })
      setAnswerStatus(status);
      setButtonState(true);
      props.checkAnswer();
      setSubmitButton("Play Again");
    }
  }
    
  console.log(props.error)

  return (
    <div className="h-screen">
      {/* <h2>Response Code: {props.responseCode}</h2> */}
      {/* {props.error && <p>{props.error}</p>} */}
      {props.loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <div>
          <Navbar averageScore={props.averageScore} setUser={props.setUser}/>
            <div className="flex flex-col items-center w-full">
              {props.questions && props.questions.length > 0 && props.questions.map((question, index) => {
                return (
                  <div key={index} className="flex flex-col items-start justify-start w-3/4 mb-2 p-2 border border-gray-300 rounded-md">
                    <div className="font-semibold">{question.question}</div>
                    <div className="flex flex-wrap">
                      {question.answers.map((answer, i) => (
                        <button className="p-2 m-2 border-2 border-black rounded-lg"
                          style={{
                            backgroundColor: 
                              buttonState && answerStatus[`${index}-${answer.id}`]
                              ? answerStatus[`${index}-${answer.id}`]
                              : (props.holdOneAnswer[index] === answer.id ? "#D6DBF5" : "white"),
                          }}
                          key={i}
                          onClick={() => handleAnswerCheck(answer.id, index)}
                        >
                          {answer.text}
                        </button>
                      ))}
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center items-start">
            {!props.loading && (
              <button
              className="bg-[#4D5B9E] px-5 py-2 border-2 rounded-2xl text-white text-md" 
              onClick={handleCheckAnswer}>{submitButton}</button>
            )}
          </div>
        </>
      )}
      <div>
        <h3 className="flex justify-center items-start font-semibold">{props.answerCheck}</h3>
      </div>
    </div>
  );
}