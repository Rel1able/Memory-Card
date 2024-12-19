export default function Card({ character }) {
    return (
        <div className="card" key={character.name}>
            <img src={character.img} alt={character.name}/>
            <p>{character.name}</p>
        </div>
    )
}