
export default function ListCountries({list,hadlerFunction}){
  const lists = list.map(({id,name})=>{
    return(
      <li key={id}>
        <div>
          <h4>{name}</h4>
          <button onClick={(event)=>{
            hadlerFunction(event,id)}}>X</button>
        </div>
      </li>
    )
  })
  return(
    <ul>
      {lists}
    </ul>
  )
}