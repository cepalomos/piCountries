import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { useEffect } from "react";
import { countryContinents, countryFilterContinents, countryPagination, getActiviti,countryFilterActivities,countryApi } from "../redux/actions";
import Select from "./Select";

export default function NavBar(){
  const dispatch = useDispatch();
  const {continents,countriesApi,activities} = useSelector(store=>store);
  useEffect(()=>{
    dispatch(countryContinents());
    dispatch(getActiviti());
  },[countriesApi,dispatch]);

  function handlerFilterContinents(event){
    event.preventDefault();
    if(event.target.value === "reset"){
      dispatch(countryApi("http://localhost:3001/countries"));
    }
    else{
      dispatch(countryFilterContinents(event.target.value));
      dispatch(countryPagination(countriesApi.length,1));
    }
  }
  function handlerFilterActiviti(event){
    event.preventDefault();
    if(event.target.value === "reset"){
      dispatch(countryApi("http://localhost:3001/countries"))
    }
    else{
      dispatch(countryFilterActivities(event.target.value));
      dispatch(countryPagination(countriesApi.length,1));
    }
  }
  return(
    <div>
      <SearchBar/>
      {continents.length? 
      <Select options={continents} functionDispatch={handlerFilterContinents} nameSelector="Continentes"/>:
      <Select options={[{id:1,name:"No hay informacion"}]} functionDispatch={handlerFilterContinents}
      nameSelector="No Hay informacion"/>
      }
      {activities.length?
      <Select options={activities} functionDispatch={handlerFilterActiviti} nameSelector="Actividades"/>:
      <Select options={[{id:1,name:"No hay actividades"}]} functionDispatch={handlerFilterContinents} nameSelector="No hay actividades"/>
      }  
    
    </div>
  )
}