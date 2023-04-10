import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { getCountryDetail } from '../redux/actions';
import '../css/Detail.css';

function Detail() {
  const { id } = useParams();
  const { country, error, errorDetail } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(function () {
    dispatch(getCountryDetail(id))
  }, [dispatch, id])
  return (
    <>
    { error ?
      <Error detalil={errorDetail}></Error>:
      <section>
      {!country.id ? <Loading /> :
        <main className='detail-contenedor'>
          <h1 className='detail-title'>{country.name}</h1>
          <div className='detail-flag'>
            <img src={country.flag} alt={country.name} className='detail-img'/>
          </div>
          <div className='detail-country'>
            <h3 className='detail-subtitle'>{`La capital de este pais ${country.capital}`}</h3>
            <h3 className='detail-subtitle'>{`Esta en el continente ${country.continents}`}</h3>
            <h3 className='detail-subtitle'>{`Esta en la subregion ${country.subregion}`}</h3>
            <h3 className='detail-subtitle'>{`Tiene un area de ${country.area}Km^2`}</h3>
            <h3 className='detail-subtitle'>{`Tiene una poblacion de ${country.population} personas`}</h3>
          </div>
          <div className='detail-activity'>
            {country.activities.length ?
              <ul>
                {country.activities.map(({ id, name, difficulty, duration, season }) => (
                <li key={id} className='detail-li'>
                  <h3 className='detail-subtitle'>{name}</h3>
                  <p className='detail-paraphrase'>{`Esta actividad tiene una dificultad de ${difficulty}, y para realizar esta se requiere un tiempo de ${duration} horas y se puede realizar en la temporada de ${season ?? "Verano"}`}</p>
                </li>))}
              </ul>
              :
              <h3 className='detail-subtitle'>No hay actividades para este pais</h3>}
          </div>
        </main>
      }
      <Link to={"/home"} className='detail-link'><button className='detail-button'>Home</button></Link>
    </section>}
    </>
  )
}

export default Detail