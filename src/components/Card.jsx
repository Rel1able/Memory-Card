import "../styles/main.css"
import "../index.css"

export default function Card({ character, onClick }) {


    return (
        <div onClick={onClick} className="card" key={character.name}>
            <img src={character.img} alt={character.name}/>
            <p>{character.name}</p>
        </div>
    )
}