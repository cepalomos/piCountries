
export default function Card({flag,name,continents}){
  return(
    <div className="principal_card">
      <h1>{name}</h1>
      <img alt={name} src={flag}/>
      <h2>{continents}</h2>
    </div>
  )
}