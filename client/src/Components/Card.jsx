import '../css/Card.css';

export default function Card({flag,name,continents}){
  return(
    <div className="principal_card" style={{backgroundImage: `url(${flag})`}}>
      <h1 className='card_title'>{name}</h1>
      <h2 className='card_subtitle'>{continents}</h2>
    </div>
  )
}