const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');

class Fechas extends Model{}

Fechas.init(
    {
        //Se definen los campos del modelo
        mes: {type: DataTypes.INTEGER, allowNull:false},
        anio: {type: DataTypes.INTEGER, allowNull: false}
    },
    {
        sequelize,
        modelName: 'fechas',
        timestamps: true
    });
module.exports = Fechas;