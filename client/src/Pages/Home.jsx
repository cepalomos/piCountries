import React, { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {countryApi, } from '../redux/actions';
import Cards from '../Components/Cards';
import Loading from '../Components/Loading';
import Pagination from '../Components/Pagination';
import Error from '../Components/Error';
import NavBar from '../Components/NavBar';

function Home() {
  const dispatch = useDispatch();
  const {loading,error,errorDetail,countries,pageNow,countriesApi,numberPages} = useSelector(state=>state);

  useEffect(()=>{
    dispatch(countryApi("http://localhost:3001/countries"));
  },[dispatch]);
  return (
    <>
      <NavBar/>
      {error && <Error detalil={errorDetail}/>}
      {loading && !error && (<Loading/>)}
      {!loading && !error && countries.length && (<Cards countries={countries}/>)}
      {!error && !loading && <Pagination pageNow={pageNow} arrayLength={countriesApi.length} maxPages={numberPages}/>}
    </>
  )
}

export default Home