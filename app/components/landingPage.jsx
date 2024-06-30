'use client'
import React from "react"

export default function IntroPage(props){
    return(
        <div>
            <h1 className="game-name">Quizzical</h1>
            <h3 className="game-description">Start the game to know yourself</h3>
            <button className="start-button" onClick={props.onStartQuiz}>Start Quiz</button>
        </div>
    )
}