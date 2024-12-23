import "../styles/lose.css"
export default function DisplayLose({playAgain}) {
    return (
        <div className="lose-container">
            <h2>GAME OVER</h2>
            <button className="play-again-btn" onClick={playAgain}>Play again</button>
        </div>
    )
}