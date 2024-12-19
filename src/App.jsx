import { useState, useEffect} from "react";
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";
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
  const characterIds = [1, 2, 3, 4, 5, 9, 36, 41, 88, 103, 127, 133, 224, 270, 271, 290];

    const handleCardClick = (clickedCharacter) => {
    if (clickedCharacter.clicked) {
      const resetCharacters = characters.map(
        character => ({ ...character, clicked: false })
      );
      setCharacters(resetCharacters);
      setScore(0);
      setCharacters(prevCharacters => shuffleArr(prevCharacters));
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
        const characterData = characterIds.map((id) => {
          const character = responseData.data[id].character
          return {
              name: character.name,
              img: character.images.jpg.image_url,
              clicked: false
            }
        })
      setCharacters(characterData);
 

    } catch (err) {
      console.log(err);
    }
    
  }

  useEffect(() => {
    getCharacters()
  }, [])
  
  return (
    <>
      <Header score={score} bestScore={bestScore} />
      <main className="main-container">
        {characters.map((character, index) => (
          <Card onClick={() => handleCardClick(character)} key={index}  character={character} />
        ))}

      </main>
    </>
  )
}

export default App
