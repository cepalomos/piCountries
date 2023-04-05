import {COUNTRY_REQUEST,COUNTRY_SUCCESS,COUNTRY_FAILURE,COUNTRY_PAGINATION} from './actionTypes';

const initialState = {
  countries:[],
  loading:false,
  error:false,
  errorDetail:[],
  countriesApi:[],
  pageNow:1
}

function reducer(state=initialState,action){
  const{type,payload} = action;
  switch(type){
    case COUNTRY_REQUEST:
      return {
        ...state,
        loading:true,
        error:false,
      }
    case COUNTRY_FAILURE:
      return {
        ...state,
        loading:false,
        error:true,
        errorDetail:[...payload]
      }
    case COUNTRY_SUCCESS:
      return {
        ...state,
        loading:false,
        error:false,
        errorDetail:[],
        countries:[...payload],
        countryApi:[...payload]
      }
    case COUNTRY_PAGINATION:
      return {
        ...state,
        countries: state.countries.slice(payload.star,payload.end),
        pageNow:payload.pageNow
      }
    default:
      return state
  }
}

export default reducer;