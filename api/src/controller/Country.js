const { getApi, createCountries, getDB } = require('../adapter/Country');
const response = require('../network/Response');

async function getCountrys(req, res, next) {
  let dataDB = [];
  try {
    dataDB = await getDB();
    if(!dataDB.length){
      const countries = await getApi();
      await createCountries(countries);
      dataDB = await getDB();
    }
    response.success(req,res,dataDB,200);
  } catch (error) {
    next(error)
  }
}


module.exports = {
  getCountrys,
}