const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');

class ConceptosIngresos extends Model{}

ConceptosIngresos.init(
    {
        //Se definen los campos del modelo
        titulo: {type: DataTypes.STRING(50), allowNull:false}
    },
    {
        sequelize,
        modelName: 'conceptosIngresos',
        timestamps: true
    });
module.exports = ConceptosIngresos;