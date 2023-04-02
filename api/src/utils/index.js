
function activitiesNormalize(object){
  let activity = object.dataValues.activities.map(({dataValues:{id,name,difficulty,duration,season}})=>({id,name,difficulty,duration,season}))
      let result = Object.assign({},object.dataValues,{activities:activity});
      return result;
}

module.exports = {
  activitiesNormalize,

}