import '../css/ListCountries.css';

export default function ListCountries({list,hadlerFunction}){
  const lists = list.map(({id,name})=>{
    return(
      <li key={id} className='container-second'>
        <div className="item-container">
          <h4 className="item-title">{name}</h4>
          <button onClick={(event)=>{
            hadlerFunction(event,id)}}
            className="item-button">X</button>
        </div>
      </li>
    )
  })
  return(
    <ul className="listcountries-container">
      {lists}
    </ul>
  )
}