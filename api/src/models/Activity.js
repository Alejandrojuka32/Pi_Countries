const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define("activity",{
        name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        dificultad:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        duracion:{
            type: DataTypes.INTEGER
        },
        temporada:{
            type: DataTypes.ENUM("Verano","Otoño","Primavera","Invierno"),
            allowNull:false
        }
    })
}