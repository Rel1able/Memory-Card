import "../styles/header.css";

export default function Header({ score, bestScore, lost }) {
    return (
        <>
            <div className={score === 16 || lost ? "header-container blured" : "header-container"}>
                <div className="title-desc">
                    <header>Bleach Memory Game</header>
                    <p>Get points by clicking on an image but don't click on any more than once!</p>
                </div>
                
                <div className="score-board">
                    <div className="score">Score {score}</div>
                    <div className="best-score">Best Score {bestScore}</div>
                </div>
                
        </div>
            
        </>
    )
}