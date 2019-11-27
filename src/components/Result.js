import React from 'react'

const Result = ({score, playAgain}) =>{
    return (
        <div className="score-board">
            <div className="score">Your score is {score} / 5 of correct scores</div>
            <button className="playBtn" onClick={playAgain} >Play Again!</button>
            
        </div>
    )
}

export default Result
