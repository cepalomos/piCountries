import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Form.css';
import { countryContinents, countryCreateReset, getSeason, postActivity } from '../redux/actions';
import Select from '../Components/Select';
import ListCountries from '../Components/ListCountries';
import { Link } from 'react-router-dom'
import Creado from '../Components/Creado';

function Form() {
  const dispatch = useDispatch();
  const { season: seasonDb, countriesApi, continents, countryPost, create, presentation } = useSelector(state => state);
  const [countries, setCountries] = useState([{ id: 1, name: "No hay informacion" }]);
  const [data, setData] = useState({ countries: [] });
  const [isNameValid, setIsNameValid] = useState(true);
  const [isDifficultyValid, setIsDifficultyValid] = useState(true);
  const [isDurationValid, setIsDurationValid] = useState(true);
  const [submitButton, setSubmitButton] = useState(false);

  function hadlerSumit(event) {
    event.preventDefault();
    const { name, difficulty, duration, season, countries } = data;
    dispatch(postActivity({ activity: { name, difficulty, duration, season }, countries }));
  }

  useEffect(() => {
    dispatch(getSeason());
    dispatch(countryCreateReset());
  }, [dispatch]);

  useEffect(() => {
    dispatch(countryContinents())
  }, [countriesApi, dispatch])

  useEffect(() => {
    if (isDifficultyValid && isDurationValid && isNameValid && !!data['countries'].length && data['season'] && data['season'] !== "reset") {
      setSubmitButton(true);
    } else {
      setSubmitButton(false);
    }
  }, [data, isNameValid, isDifficultyValid, isDurationValid])

  const options = ((seasonDb) => {
    if (seasonDb) {
      return seasonDb
    } else {
      return [{ id: 1, name: "No hay datos" }]
    }
  })(seasonDb);

  function hadlerName(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
    setIsNameValid(/[a-zA-Z ]{2,254}/.test(event.target.value))
  }

  function hadlerDifficulty(event) {
    const { target: { value, name } } = event
    setData({
      ...data,
      [name]: value
    });
    setIsDifficultyValid(value < 0 ? false : value > 5 ? false : true)
  }
  function hadlerDuration(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
    setIsDurationValid(/^(0\.([1-9]\d*|[0-9]\d{0,1})|[1-9]\d?(\.\d+)?|1\d{2}(\.\d+)?|200(\.0+)?)$/.test(event.target.value))
  }

  function hadlerSeason(event) {
    setData({
      ...data,
      season: event.target.value
    })
  }

  function hadlerCountinens(event) {
    if (event.target.value !== "reset")
      setCountries(countriesApi.filter(({ continents: ele }) => ele === event.target.value));
  }
  function hadlerCountries(event) {
    if (event.target.value !== "reset" && !data.countries.includes(event.target.value)) {
      setData({
        ...data,
        countries: [...data.countries, event.target.value]
      })
    }
  }
  function hadlerCountinensDelete(event, id) {
    event.preventDefault();
    setData({
      ...data,
      countries: data.countries.filter(ele => ele !== id)
    })
  }
  function creationOtherActivity(event) {
    event.preventDefault();
    setData({ countries: [] });
    dispatch(countryCreateReset());
  }
  return (
    <>
      {presentation ? <>
        <Creado create={create} data={countryPost} />
        <button onClick={creationOtherActivity}>Crear Otra Actividad</button>
        <Link to={'/home'}><button>Home</button></Link>
      </>
        : (<form autoComplete='off' onSubmit={hadlerSumit}>
          <label htmlFor='name'>Nombre</label>
          <input type='text' id='name' name='name' placeholder='Escribe el nombre de la actividad nueva' value={data["name"]} onChange={hadlerName} className={isNameValid ? 'valid' : 'invalid'} />
          <label htmlFor='difficulty'>Dificultad</label>
          <input id='difficulty' name='difficulty' placeholder='Ingresa la dificultad entre 1.0 y 5' value={data["difficulty"]} onChange={hadlerDifficulty} className={isDifficultyValid ? 'valid' : 'invalid'} />
          <label htmlFor='duration'>Duracion</label>
          <input id='duration' name='duration' placeholder='Ingresa la duracion en horas' value={data['duration']} onChange={hadlerDuration} className={isDurationValid ? 'valid' : 'invalid'} />
          <fieldset>
            <legend>Temporada</legend>
            <Select options={options} nameSelector='Season' functionDispatch={hadlerSeason} />
          </fieldset>
          <fieldset>
            <legend>Paises</legend>
            <Select options={continents} functionDispatch={hadlerCountinens} nameSelector='Continentes' />
            <Select options={countries} nameSelector='Paises' functionDispatch={hadlerCountries} />
            <div>
              {data.countries.length && <ListCountries list={countriesApi.filter(({ id }) => data.countries.includes(id))} hadlerFunction={hadlerCountinensDelete} />}
            </div>
          </fieldset>
          <input type='submit' disabled={!submitButton} />
          <Link to={'/home'}><button>Cancelar</button></Link>
        </form>)}
    </>
  )
}

export default Form