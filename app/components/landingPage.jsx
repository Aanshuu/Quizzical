'use client'
import React from "react"

export default function IntroPage(props){
    return(
        <div className="flex flex-col justify-center items-center h-screen gap-5">
            <h1 className="text-4xl text-[#293264] font-medium">Quizzical</h1>
            <h3 className="text-[#293264] font-medium text-sm sm:text-lg">Start the game to know your general knowledge</h3>
            <button className="bg-[#4D5B9E] px-8 py-3 border-2 rounded-lg text-white text-2xl" onClick={props.onStartQuiz}>Start Quiz</button>
        </div>
    )
}