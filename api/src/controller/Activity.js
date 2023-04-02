const response = require('../network/Response');
const {getActivities,postActivityDb} = require('../adapter/Activity');

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

async function postActivity(req,res,next){
  const data = req.body;
  try {
    const [activity,create] = await postActivityDb(data);
    if(!create){
      response.success(req,res,{message:"Se agregaron a la actividad los paises"},200);
    }else{
      response.success(req,res,activity,201)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getActiviti,
  postActivity
}