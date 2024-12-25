import "../styles/victory.css"
export default function DisplayVictory({playAgain, changeDifficulty}) {
    return (
        <div className="victory-container">
            <h2>Congratulations, you won!</h2>
            <div className="end-game-buttons">
                <button className="play-again-btn" onClick={playAgain}>Play again</button>
                <button className="change-difficulty-btn" onClick={changeDifficulty}>Select difficulty</button>
            </div>
        </div>
    )
}


