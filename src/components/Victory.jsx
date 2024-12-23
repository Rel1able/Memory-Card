import "../styles/victory.css"
export default function DisplayVictory({playAgain}) {
    return (
        <div className="victory-container">
            <h2>Congratulations, you won!</h2>
            <button className="play-again-btn" onClick={playAgain}>Play again</button>
        </div>
    )
}


