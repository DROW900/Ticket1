const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');
const Usuarios = require('./db.modelo.usuarios');

class Presupuestos extends Model{}

Presupuestos.init(
    {
        //Se definen los campos del modelo
        nombreProyecto: {type: DataTypes.STRING(50), allowNull:false},
        version: {type: DataTypes.STRING(10), allowNull: false},
        status: {type: DataTypes.INTEGER, allowNull: false}
    },
    {
        sequelize,
        modelName: 'presupuestos',
        timestamps: true
    });
Presupuestos.Usuarios = Presupuestos.belongsTo(Usuarios)
Usuarios.hasMany(Presupuestos);
module.exports = Presupuestos;