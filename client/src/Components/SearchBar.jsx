import { useState } from "react";
import { useDispatch } from "react-redux"
import { countryApi } from "../redux/actions";
import '../css/SearchBar.css';

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
      placeholder="Introdusca el pais a buscar o iniciales"
      className="searchbar-input"
      />
      <button onClick={handlerSearch} >Buscar</button>
    </>
  )
}