import "../styles/startPage.css"
export default function StartPage({setDifficulty}) {
    return ( 
        <div className="start-page-container">
            <div className="buttons">
                <button onClick={() => setDifficulty("easy")}>Easy</button>
                <button onClick={() => setDifficulty("medium")}>Medium</button>
                <button onClick={() => setDifficulty("hard")}>Hard</button>
            </div>
        </div>
    )
}