import { COUNTRY_REQUEST, COUNTRY_SUCCESS, COUNTRY_FAILURE, COUNTRY_PAGINATION, COUNTRY_CONTINENTS, COUNTRY_FILTER_CON, COUNTRY_ACTIVITIES, COUNTRY_FILTER_ACT, COUNTRY_ORDER_ASC, COUNTRY_ORDER_DES, COUNTRY_ORDER_PASC, COUNTRY_ORDER_PDES, COUNTRY_SEASON, COUNTRY_CREATE, COUNTRY_CREATE_RESET } from './actionTypes';

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

// function getActiviti() {
//   return (dispatch) => {
//     fetch("http://localhost:3001/activities")
//       .then(res => res.json())
//       .then(res => {
//         if (res.error) 
//         throw new Error(res.message);
//         else
//         dispatch(countryActiviti(res.body))
//       }
//       )
//       .catch(error=>console.error(error));
//   }
// }

function countryFilterActivities(payload) {
  return {
    type: COUNTRY_FILTER_ACT,
    payload
  }
}

const countryPasc = () => {
  return { type: COUNTRY_ORDER_PASC };
};
const countryAsc = () => {
  return { type: COUNTRY_ORDER_ASC };
};
const countryDes = () => {
  return { type: COUNTRY_ORDER_DES };
};
const countryPdes = () => {
  return { type: COUNTRY_ORDER_PDES };
};

const countryOrder = (option) => {
  return (dispatch) => {
    switch (option) {
      case "ASC":
        return dispatch(countryAsc());
      case "PASC":
        return dispatch(countryPasc());
      case "PDES":
        return dispatch(countryPdes());
      case "DES":
        return dispatch(countryDes());
      default:
        dispatch(countryAsc());
    }
  };
};

function countrySeason(payload) {
  return {
    type: COUNTRY_SEASON,
    payload
  }
}

function getSeason() {
  return function (dispatch) {
    fetch('http://localhost:3001/activities/season')
      .then(res => res.json())
      .then(res => {
        const aux = res.body.map(season => ({ id: season, name: season }))
        dispatch(countrySeason(aux));
      })
      .then(() => {dispatch(countryApi("http://localhost:3001/countries"))})
      .catch(error => console.error(error));
  }
}

function countryCreate(payload){
  return {
    type:COUNTRY_CREATE,
    payload
  }
}

function postActivity(data){
  return function(dispatch){
    fetch("http://localhost:3001/activities",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(res=>{
      if(res.error){
        throw new Error("Error al crear la actividad")
      }else{
        if(res.body.id){
          dispatch(countryCreate({create:true,countryDb:res.body}))
        }else{
          dispatch(countryCreate({create:false,countryDb:res.body}))
        }
      }
    })
    .catch(error=>{
      console.error(error);
      dispatch(countryFailure([{status:500,message:error.message??"Error desconocido"}]))
    })
  }
}

function countryCreateReset(){
  return {
    type:COUNTRY_CREATE_RESET,
  }
}

export { countryApi, countryPagination, countryContinents, countryFilterContinents, countryActiviti, countryFilterActivities, countryOrder, getSeason, postActivity, countryCreateReset}