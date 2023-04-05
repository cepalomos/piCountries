import React, { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {countryApi,countryPagination} from '../redux/actions';
import Cards from '../Components/Cards';

function Home() {
  const dispatch = useDispatch();
  const {loading,error,errorDetail,countries,pageNow,countriesApi} = useSelector(state=>state);

  useEffect(()=>{
    if(!countriesApi.length)
    dispatch(countryApi());
  },[]);

  useEffect(()=>{
    if(countries.length){
      dispatch(countryPagination(countries.length,1))
    }
  },[pageNow]);

  return (
    <>
      {!loading && !error && countries.length && (<Cards countries={countries}/>)}
    </>
  )
}

export default Home