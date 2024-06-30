'use client'
import React, { useState } from "react";


export default function MainPage(props) {
  const handelAnswerCheck = (answerId, questionIndex) => {
    props.setHoldOneAnswer((prevHoldOneAnswer) => ({
      ...prevHoldOneAnswer,
      [questionIndex]: answerId,
    }));
    props.holdAnswer(answerId);
  };

  return (
    <div>
      <h2>Response Code: {props.responseCode}</h2>
      {props.error && <p>{props.error}</p>}
      <ul>
        {props.questions &&
          props.questions.length > 0 &&
          props.questions.map((question, index) => {
            return (
              <li key={index}>
                <strong>{question.question}</strong>
                <div>
                  {question.answers.map((answer, i) => (
                    <button
                      className="bg-white"
                      style={{
                        backgroundColor:
                          props.holdOneAnswer[index] === answer.id
                            ? "#59E391"
                            : "white",
                      }}
                      key={i}
                      onClick={() => handelAnswerCheck(answer.id, index)}
                    >
                      {answer.text}
                    </button>
                  ))}
                </div>
                <hr />
              </li>
            );
          })}
      </ul>
      <button onClick={props.checkAnswer}>Check Answers</button>
      <div>
        <h3>Result:{props.answerCheck}</h3>
      </div>
    </div>
  );
}
