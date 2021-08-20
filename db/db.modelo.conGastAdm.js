const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');

class ConceptosGastosAdmin extends Model{}

ConceptosGastosAdmin.init(
    {
        //Se definen los campos del modelo
        titulo: {type: DataTypes.STRING(50), allowNull:false}
    },
    {
        sequelize,
        modelName: 'conceptosGastosAdmin',
        timestamps: true
    });

module.exports = ConceptosGastosAdmin;