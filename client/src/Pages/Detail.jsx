import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { getCountryDetail } from '../redux/actions';

function Detail() {
  const { id } = useParams();
  const { country, error } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(function () {
    dispatch(getCountryDetail(id))
  }, [dispatch, id])
  return (
    <>
    { error ?
      <Error></Error>:
      <section>
      {!country.id ? <Loading /> :
        <>
          <h1>{country.name}</h1>
          <div>
            <img src={country.flag} alt={country.name} />
          </div>
          <div>
            <h3>{`Esta en el continente ${country.continents}`}</h3>
            <h3>{`La capital de este pais ${country.capital}`}</h3>
            <h3>{`Esta en la subregion ${country.subregion}`}</h3>
            <h3>{`Tiene un area de ${country.area}Km^2`}</h3>
            <h3>{`Tiene una poblacion de ${country.population} personas`}</h3>
          </div>
          <div>
            {country.activities.length ?
              <ul>
                {country.activities.map(({ id, name, difficulty, duration, season }) => (<li key={id}>
                  <h3>{name}</h3>
                  <p>{`Esta actividad tiene una dificultad de ${difficulty}, y para realizar esta se requiere un tiempo de ${duration} horas y se puede realizar en la temporada de ${season ?? "Verano"}`}</p>
                </li>))}
              </ul>
              :
              <h3>No hay actividades para este pais</h3>}
          </div>
        </>
      }
      <Link to={"/home"}><button>Home</button></Link>
    </section>}
    </>
  )
}

export default Detail