

const initialState = {
  countries:[],
  loading:false,
  error:false,
  errorDetail:[],
  countriesApi:[]
}

function reducer(state=initialState,action){
  switch(action.type){
    default:
      return {...state}
  }
}

export default reducer;