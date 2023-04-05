import {COUNTRY_REQUEST,COUNTRY_SUCCESS,COUNTRY_FAILURE,COUNTRY_PAGINATION} from './actionTypes';

function countryRequest(){
  return { type:COUNTRY_REQUEST}
};

function countrySuccess(payload){
  return {
    type:COUNTRY_SUCCESS,
    payload
  }
}

function countryFailure(payload){
  return {
    type:COUNTRY_FAILURE,
    payload
  }
}

function countryApi(){
  return (dispatch) => {
    dispatch(countryRequest());
    fetch("http://localhost:3001/countries").then(res=>res.json())
    .then(res=>{
      if(!res.error){
      dispatch(countrySuccess(res.body));
      dispatch(countryPagination(res.body.length,1))}
      else
      throw res;
    })
    .catch(error=>{
      dispatch(countryFailure(error))
    })
  }
}

function country_page( star, end, pageNow){
  return {
    type: COUNTRY_PAGINATION,
    payload: { star, end, pageNow },
  };
};

function countryPagination(arraylength, pageNow) {
  return (dispatch) => {
    const numberPages = Math.ceil(arraylength / 10);
    if (pageNow <= numberPages) {
      let star = (pageNow - 1) * 10;
      let end = star + 10;
      dispatch(country_page(star, end, pageNow));
    } else if (numberPages === 0) {
      dispatch(countryFailure({error:true,body:"No hay informacion"}));
    }
  };
};

export {countryApi,countryPagination}