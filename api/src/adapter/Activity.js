const { Activity } = require('../db');

function getActivities(){
  return Activity.findAll({
    attributes:['id', 'name', 'difficulty', 'duration', 'season']
  })
  .then(activities=>{
    if(!activities.length){
      return activities
    }else{
      return activities.map(({dataValues})=>dataValues)
    }
  })
  .catch(error=>{
    console.error(error)
    throw {status:404,message:"Error en la base datos"}
  })
}

function postActivityDb(data){
  const {activity,countries} = data;
  return Activity.findOrCreate({
    where:activity
  }).then(([activityDb,create])=>{
    activityDb.addCountry(countries);
    return [activityDb,create];
  }).catch(error=>{
    console.error(error);
    throw {status:500,message:'Error al crear'};
  })
}

function getSeasonDb(){
  return (Activity.rawAttributes.season.values)
}

module.exports = {
  getActivities,
  postActivityDb,
  getSeasonDb,
}