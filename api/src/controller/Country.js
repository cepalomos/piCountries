const { getApi, createCountries, getDB, getId, getName } = require('../adapter/Country');
const response = require('../network/Response');

async function getCountrys(req, res, next) {
  const { name } = req.query
  let dataDB = [];
  try {
    if (name) {
      const data = await getName(name);
      console.log(data);
      if (!data ) {
        throw { status: 404, message: 'No se encontro nada en la base de datos' }
      }
      response.success(req, res, data, 200)
    } else {
      dataDB = await getDB();
      if (!dataDB.length) {
        const countries = await getApi();
        await createCountries(countries);
        dataDB = await getDB();
      }
      response.success(req, res, dataDB, 200);
    }
  } catch (error) {
    next(error)
  }
}

async function getCountryId(req, res, next) {
  const id = req.params.id.toUpperCase();
  try {
    const country = await getId(id);
    if (!country.id) {
      throw { status: 404, message: "No existe en la base de datos" }
    }
    response.success(req, res, country, 200);
  } catch (error) {
    next(error);
  }
}


module.exports = {
  getCountrys,
  getCountryId
}