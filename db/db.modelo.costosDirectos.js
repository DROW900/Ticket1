const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');
const ConceptosCostos = require('./db.modelo.conceptoCostos');
const Fechas = require('./db.modelo.fechas');
const Presupuestos = require('./db.modelo.presupuestos');

class CostosDirectos extends Model{}

CostosDirectos.init(
    {
        //Se definen los campos del modelo
        cantidad: {type: DataTypes.FLOAT, allowNull:false}
    },
    {
        sequelize,
        modelName: 'costosDirectos',
        timestamps: true
    });
CostosDirectos.Presupuestos = CostosDirectos.belongsTo(Presupuestos);
CostosDirectos.ConceptosCostos = CostosDirectos.belongsTo(ConceptosCostos);
CostosDirectos.Fechas = CostosDirectos.belongsTo(Fechas)
Presupuestos.hasMany(CostosDirectos)
Fechas.hasMany(CostosDirectos)
ConceptosCostos.hasMany(CostosDirectos)

module.exports = CostosDirectos;