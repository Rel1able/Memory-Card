import "../styles/lose.css"
export default function DisplayLose({playAgain, changeDifficulty}) {
    return (
        <div className="lose-container">
            <h2>GAME OVER</h2>
            <div className="end-game-buttons">
                <button className="play-again-btn" onClick={playAgain}>Play again</button>
                <button className="change-difficulty-btn" onClick={changeDifficulty}>Select difficulty</button>
            </div>  
            
        </div>
    )
}