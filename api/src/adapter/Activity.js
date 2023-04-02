const { Activity } = require('../db');

function getActivities(){
  return Activity.findAll({
    includes:['id', 'name', 'difficulty', 'duration', 'season']
  })
  .then(activities=>{
    if(!activities.length){
      return activities
    }else{
      return activities.dataValues
    }
  })
  .catch(error=>{
    throw {status:404,message:"Error en la base datos"}
  })
}

module.exports = {
  getActivities
}