import { COUNTRY_REQUEST, COUNTRY_SUCCESS, COUNTRY_FAILURE, COUNTRY_PAGINATION, COUNTRY_CONTINENTS, COUNTRY_FILTER_CON, COUNTRY_ACTIVITIES, COUNTRY_FILTER_ACT, COUNTRY_ORDER_ASC, COUNTRY_ORDER_DES, COUNTRY_ORDER_PASC, COUNTRY_ORDER_PDES, COUNTRY_SEASON, COUNTRY_CREATE, COUNTRY_CREATE_RESET, COUNTRY_DETAIL } from './actionTypes';

const initialState = {
  countries: [],
  loading: false,
  error: false,
  errorDetail: [],
  countriesApi: [],
  pageNow: 1,
  numberPages: 1,
  continents: [],
  activities: [],
  season: [{id:1,name:"No hay informacion"}],
  create:false,
  countryPost:{},
  presentation:false,
  country:{}
}

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case COUNTRY_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case COUNTRY_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorDetail: payload
      }
    case COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorDetail: [],
        countriesApi: [...payload]
      }
    case COUNTRY_PAGINATION:
      return {
        ...state,
        countries: state.countriesApi.slice(payload.star, payload.end),
        pageNow: payload.pageNow,
        numberPages: payload.numberPages
      }
    case COUNTRY_CONTINENTS:
      return {
        ...state,
        continents: state.countriesApi.reduce((filter, { continents: element }) => {
          if (!filter[element]) {
            filter[element] = true;
            filter.continents.push({ id: element, name: element });
          }
          return filter
        }, { continents: [] }).continents
      }
    case COUNTRY_FILTER_CON:
      return {
        ...state,
        countriesApi: state.countriesApi.filter(({ continents }) => continents === payload)
      }
    case COUNTRY_ACTIVITIES:
      return {
        ...state,
        activities: state.countriesApi.reduce((activiti, { activities: element }) => {
          for (const act of element) {
            if (!activiti[act.id]) {
              activiti[act.id] = true;
              activiti.activities.push(act)
            }
          }
          return activiti
        }, { activities: [] }).activities
      }
    case COUNTRY_FILTER_ACT:
      return {
        ...state,
        countriesApi: state.countriesApi.filter(({ activities }) => activities.some(({ id }) => id === payload))
      }
    case COUNTRY_ORDER_ASC:
      return {
        ...state,
        countriesApi: [...state.countriesApi.sort(({ name: a }, { name: b }) => a > b ? 1 : a < b ? -1 : 0)]
      }
    case COUNTRY_ORDER_DES:
      return {
        ...state,
        countriesApi: [...state.countriesApi.sort(({ name: a }, { name: b }) => a < b ? 1 : a > b ? -1 : 0)]
      }
    case COUNTRY_ORDER_PASC:
      return {
        ...state,
        countriesApi: [...state.countriesApi.sort(({ population: a }, { population: b }) => a - b)]
      }
    case COUNTRY_ORDER_PDES:
      return {
        ...state,
        countriesApi: [...state.countriesApi.sort(({ population: a }, { population: b }) => b - a)]
      }
    case COUNTRY_SEASON:
      return {
        ...state,
        season: payload
      }
    case COUNTRY_CREATE:
      return {
        ...state,
        create:payload.create,
        countryPost:payload.countryDb,
        presentation:true
      }
    case COUNTRY_CREATE_RESET:
      return{
        ...state,
        create:false,
        countryPost:[],
        presentation:false
      }
    case COUNTRY_DETAIL:
      return{
        ...state,
        country:payload
      }
    default:
      return { ...state }
  }
}

export default reducer;