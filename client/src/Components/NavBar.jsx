import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { useEffect } from "react";
import { countryContinents, countryFilterContinents, countryPagination, countryActiviti, countryFilterActivities, countryApi, countryOrder } from "../redux/actions";
import Select from "./Select";
import { Link } from "react-router-dom";

export default function NavBar() {
  const dispatch = useDispatch();
  const { continents, countriesApi, activities } = useSelector(store => store);
  useEffect(() => {
    dispatch(countryContinents());
    dispatch(countryActiviti());
  }, [countriesApi, dispatch]);

  function handlerFilterContinents(event) {
    event.preventDefault();
    if (event.target.value === "reset") {
      dispatch(countryApi("http://localhost:3001/countries"));
    }
    else {
      dispatch(countryFilterContinents(event.target.value));
      dispatch(countryPagination(countriesApi.length, 1));
    }
  }
  function handlerFilterActiviti(event) {
    event.preventDefault();
    if (event.target.value === "reset") {
      dispatch(countryApi("http://localhost:3001/countries"))
    }
    else {
      dispatch(countryFilterActivities(event.target.value));
      dispatch(countryPagination(countriesApi.length, 1));
    }
  }
  function handlerOrderName(event) {
    event.preventDefault();
    if (event.target.value === "reset") {
      dispatch(countryApi("http://localhost:3001/countries"))
    }
    else {
      dispatch(countryOrder(event.target.value));
      dispatch(countryPagination(countriesApi.length, 1));
    }
  }
  function handlerOrderPopulation(event) {
    event.preventDefault();
    if (event.target.value === "reset") {
      dispatch(countryApi("http://localhost:3001/countries"))
    }
    else {
      dispatch(countryOrder(event.target.value));
      dispatch(countryPagination(countriesApi.length, 1));
    }
  }
  return (
    <div>
      <SearchBar />
      <Link to={"/create"}><button>Crear</button></Link>
      <fieldset>
        <legend>Filtrar por continentes o actividades</legend>
        {continents.length ?
          <Select options={continents} functionDispatch={handlerFilterContinents} nameSelector="Continentes" /> :
          <Select options={[{ id: 1, name: "No hay informacion" }]} functionDispatch={handlerFilterContinents}
            nameSelector="No Hay informacion" />
        }
        {activities.length ?
          <Select options={activities} functionDispatch={handlerFilterActiviti} nameSelector="Actividades" /> :
          <Select options={[{ id: 1, name: "No hay actividades" }]} functionDispatch={handlerFilterContinents} nameSelector="No hay actividades" />
        }
      </fieldset>
      <fieldset>
        <legend>Ordenamiento por nombre o poblacion</legend>
        <Select options={[{ id: 'ASC', name: "Ascendente" }, { id: "DES", name: "Descendente" }]} functionDispatch={handlerOrderName} nameSelector="Nombre del pais" />
        <Select options={[{ id: "PASC", name: "Ascendente" }, { id: "PDES", name: "Descendente" }]} functionDispatch={handlerOrderPopulation} nameSelector="Cantidad de poblacion" />
      </fieldset>
    </div>
  )
}