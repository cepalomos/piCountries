const response = require('../network/Response');
const {getActivities} = require('../adapter/Activity');

async function getActiviti(req,res,next){
  try {
    const activities = await getActivities();
    if(!activities.length){
      throw {status:404,message:"No hay actividades"}
    }
    response.success(req,res,activities,200)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getActiviti
}