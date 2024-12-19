import { useState, useEffect} from "react";
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";
import "./styles/main.css";



const response = await fetch(`https://api.jikan.moe/v4/anime/269/characters`)
const responseData = await response.json();
console.log(responseData);
console.log(responseData.data[1].character)

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [characters, setCharacters] = useState([]);
  const characterIds = [1, 4, 6, 7, 5, 7];


  const getCharacters = async () => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/269/characters`)
      const responseData = await response.json();
        const characterData = characterIds.map((id) => {
          const character = responseData.data[id].character
          return {
              name: character.name,
              img: character.images.jpg.image_url
            }
        })
      setCharacters(characterData);
      console.log(characters);

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
          <Card key={index}  character={character} />
        ))}

      </main>
    </>
  )
}

export default App
