import { useState } from "react";
import { useDispatch } from "react-redux"
import { countryApi } from "../redux/actions";

export default function SearchBar(){
  const URL = "http://localhost:3001/countries?name=";
  const dispatch = useDispatch();
  const [country,setConuntry] = useState("");

  function handlerSearch(event){
    event.preventDefault();
    dispatch(countryApi(URL+country));
  }
  return(
    <>
      <input 
      type="text" 
      onChange={({target:{value}})=>setConuntry(value)}
      value={country}
      />
      <button onClick={handlerSearch}>Buscar</button>
    </>
  )
}