import { COUNTRY_REQUEST, COUNTRY_SUCCESS, COUNTRY_FAILURE, COUNTRY_PAGINATION, COUNTRY_CONTINENTS, COUNTRY_FILTER_CON, COUNTRY_ACTIVITIES, COUNTRY_FILTER_ACT } from './actionTypes';

function countryRequest() {
  return { type: COUNTRY_REQUEST }
};

function countrySuccess(payload) {
  return {
    type: COUNTRY_SUCCESS,
    payload
  }
}

function countryFailure(payload) {
  return {
    type: COUNTRY_FAILURE,
    payload
  }
}

function countryApi(url) {
  return (dispatch) => {
    dispatch(countryRequest());
    fetch(url).then(res => res.json())
      .then(res => {
        if (!res.error) {
          dispatch(countrySuccess(res.body));
          dispatch(countryPagination(res.body.length, 1))
        }
        else
          throw res;
      })
      .catch(error => {
        dispatch(countryFailure(error))
      })
  }
}

function countryPage(star, end, pageNow, numberPages) {
  return {
    type: COUNTRY_PAGINATION,
    payload: { star, end, pageNow, numberPages },
  };
};

function countryPagination(arraylength, pageNow) {
  return (dispatch) => {
    const numberPages = Math.ceil(arraylength / 10);
    if (pageNow <= numberPages) {
      let star = (pageNow - 1) * 10;
      let end = star + 10;
      dispatch(countryPage(star, end, pageNow, numberPages));
    } else if (numberPages === 0) {
      dispatch(countryFailure({ error: true, body: "No hay informacion" }));
    }
  };
};

function countryContinents() {
  return {
    type: COUNTRY_CONTINENTS
  }
}

function countryFilterContinents(continent) {
  return {
    type: COUNTRY_FILTER_CON,
    payload: continent
  }
}

function countryActiviti(data) {
  return {
    type: COUNTRY_ACTIVITIES,
    payload: data
  }
}

function getActiviti() {
  return (dispatch) => {
    fetch("http://localhost:3001/activities")
      .then(res => res.json())
      .then(res => {
        if (res.error) 
        throw new Error(res.message);
        else
        dispatch(countryActiviti(res.body))
      }
      )
      .catch(error=>console.error(error));
  }
}

function countryFilterActivities(payload){
  return {
    type: COUNTRY_FILTER_ACT,
    payload
  }
}

export { countryApi, countryPagination, countryContinents, countryFilterContinents, getActiviti,countryFilterActivities }