import { useState, useEffect} from "react";
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";
import DisplayVictory from "./components/Victory.jsx";
import DisplayLose from "./components/Lose.jsx";
import StartPage from "./components/StartPage.jsx";
import "./styles/main.css";


function shuffleArr(arr) {
  let newArr = [...arr];
  let currentIndex = arr.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArr[currentIndex], newArr[randomIndex]] = [newArr[randomIndex], newArr[currentIndex]]
  }
  return newArr;
}

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [lost, setLost] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [maxScore, setMaxScore] = useState(null);
  const characterIds = [1, 2, 3, 4, 5, 9, 36, 41, 88, 103, 127, 133, 224, 270, 271, 290];


    const handleCardClick = (clickedCharacter) => {
    if (clickedCharacter.clicked) {
      const resetCharacters = characters.map(
        character => ({ ...character, clicked: false })
      );
      setCharacters(resetCharacters);
      setScore(0);
      setCharacters(prevCharacters => shuffleArr(prevCharacters));
      setLost(true);
    } else {
      const updatedCharacters = characters.map(character => {
        if (character.name === clickedCharacter.name) {
          return { ...character, clicked: true }
        }
        return character
      });
      setCharacters(updatedCharacters)
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        return newScore;
      })
      setCharacters(prevCharacters => shuffleArr(prevCharacters));
    }
    
    }

  const getCharacters = async () => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/269/characters`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch the data");
      }
      const responseData = await response.json();
      let selectedIds;
      if (difficulty === "easy") {
        selectedIds = characterIds.slice(0, 8);
        setMaxScore(8);
      } else if (difficulty === "medium") {
        selectedIds = characterIds.slice(0, 12);
        setMaxScore(12);
      } else if(difficulty === "hard") {
        selectedIds = characterIds;
        setMaxScore(16);
      } else {
        return
      }
        const characterData = selectedIds.map((id) => {
          const character = responseData.data[id].character
          return {
              name: character.name.split(",").join(" "),
              img: character.images.jpg.image_url,
              clicked: false
            }
        })
      setCharacters(characterData);
 

    } catch (err) {
      console.log(err);
    }
    
  }

  function playAgain() {
    setLost(false);
    setScore(0);
    setCharacters(prevCharacters => shuffleArr(prevCharacters));
  }


  useEffect(() => {
    if (difficulty) {
      getCharacters()
    }
  }, [difficulty])

  if (!difficulty) {
    return (
      <>
        <Header score={score} bestScore={bestScore} lost={lost} />
        <StartPage setDifficulty={setDifficulty} />
      </>
    )
  }
  return (
    <>
      <Header score={score} bestScore={bestScore} lost={lost} />
      <main className={score === maxScore || lost ? "main-container blured" : "main-container"}>
        {characters.map((character, index) => (
          <Card onClick={score === maxScore|| lost ? null : () => handleCardClick(character)} key={index}  character={character} />
        ))}
        
      </main>
      {score === maxScore && <DisplayVictory playAgain={playAgain} />}
      {lost && <DisplayLose playAgain={playAgain} />}
    </>
  )
}

export default App
