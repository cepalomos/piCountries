const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("activity",{
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4,
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    difficulty:{
      type:DataTypes.FLOAT,
      allowNull:false,
      validate: {
        isWithinRange(value) {
          if (value <= 1 || value >= 5) {
            throw new Error('El valor de la dificultad debe estar entre 1 y 5');
          }
        }
      }
    },
    duration:{
      type:DataTypes.FLOAT,
    },
    season:{
      type:DataTypes.ENUM("Verano","Otoño","Invierno","Primavera"),
      defaultValue:"Verano"
    },
  })
}