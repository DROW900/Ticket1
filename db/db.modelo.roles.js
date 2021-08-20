const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');

class RolesRecursos extends Model{}

RolesRecursos.init(
    {
        //Se definen los campos del modelo
        titulo: {type: DataTypes.STRING(50), allowNull:false},
        valor: {type: DataTypes.FLOAT, allowNull:false}
    },
    {
        sequelize,
        modelName: 'rolesRecursos',
        timestamps: true
    });

module.exports = RolesRecursos;