const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');
const Presupuestos = require('./db.modelo.presupuestos');

class ConceptosCostos extends Model{}

ConceptosCostos.init(
    {
        //Se definen los campos del modelo
        titulo: {type: DataTypes.STRING(50), allowNull:false}
    },
    {
        sequelize,
        modelName: 'conceptos_ingresos',
        timestamps: true
    });
ConceptosCostos.Presupuestos = ConceptosCostos.belongsTo(Presupuestos);
Presupuestos.hasMany(ConceptosCostos);
module.exports = ConceptosCostos;