'use client'
import React, { useState } from "react";


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
    <div>
      {/* <h2>Response Code: {props.responseCode}</h2> */}
      {/* {props.error && <p>{props.error}</p>} */}
      {props.loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <div>
          {props.questions && props.questions.length > 0 && props.questions.map((question, index) => {
            return (
              <div key={index}>
                <div className="font-semibold">{question.question}</div>
                <div>
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
          {!props.loading && (
            <button onClick={handleCheckAnswer}>{submitButton}</button>
          )}
        </>
      )}
      <div>
        <h3>{props.answerCheck}</h3>
      </div>
    </div>
  );
}