import {COUNTRY_REQUEST,COUNTRY_SUCCESS,COUNTRY_FAILURE,COUNTRY_PAGINATION,COUNTRY_CONTINENTS,COUNTRY_FILTER_CON,COUNTRY_ACTIVITIES,COUNTRY_FILTER_ACT} from './actionTypes';

const initialState = {
  countries:[],
  loading:false,
  error:false,
  errorDetail:[],
  countriesApi:[],
  pageNow:1,
  numberPages:1,
  continents:[],
  activities:[]
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
        errorDetail:payload
      }
    case COUNTRY_SUCCESS:
      return {
        ...state,
        loading:false,
        error:false,
        errorDetail:[],
        countriesApi:[...payload]
      }
    case COUNTRY_PAGINATION:
      return {
        ...state,
        countries: state.countriesApi.slice(payload.star,payload.end),
        pageNow:payload.pageNow,
        numberPages:payload.numberPages
      }
    case COUNTRY_CONTINENTS:
      return {
        ...state,
        continents:state.countriesApi.reduce((filter,{continents:element})=>{
          if(!filter[element]){
            filter[element] = true;
            filter.continents.push({id:element,name:element});
          }
          return filter
        },{continents:[]}).continents
      }
    case COUNTRY_FILTER_CON:
      return {
        ...state,
        countriesApi:state.countriesApi.filter(({continents})=>continents === payload)
      }
    case COUNTRY_ACTIVITIES:
      return {
        ...state,
        activities: payload??[]
      }
    case COUNTRY_FILTER_ACT:
      return{
        ...state,
        countriesApi:state.countriesApi.filter(({activities})=>activities.some(({id})=>id === payload))
      }
    default:
      return {...state}
  }
}

export default reducer;