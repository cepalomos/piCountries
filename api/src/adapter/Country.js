const API_URL = "https://restcountries.com/v3/all"
const axios = require('axios');
const {Country,Activity} = require('../db');

function getApi(){
  return axios(API_URL)
  .then(({data})=>data.map(({cca3:id,capital,translations:{spa:{official:name}},flags,continents,subregion,area,population})=>{
    let country = {
      id,
      name,
      flag:flags[0],
      continents:continents.join('-'),
      capital:capital?capital[0]:"No hay informacion",
      subregion:subregion??"No hay informacion",
      area,
      population
    }
    return country;
  })).catch((error)=>console.error(error));
}

function createCountries(contriesArray){
  return Country.bulkCreate(contriesArray).catch(error=>{
    console.error("[Error en base de datos]",error);
    throw {status:500,message:"Falla en la base de datos"}});
}

function getDB(){
  return Country.findAll({
    attributes: ['id', 'name', 'flag','continents'],
    include: [{
      model: Activity
    }]
  }).then((countries)=>{
    return countries.reduce((normalize,country)=>{
      const activities = country.dataValues.activities.map(({dataValues:name})=>({name}));
      return [...normalize,{...country.dataValues,activities}];
    },[])
  }).catch(error=>{
    console.log("[error getDB]",error);
    throw {status:500,message:"Error en la base de datos"}
  })
}

module.exports = {
  getApi,
  createCountries,
  getDB
}