const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');
const ConceptosCostos = require('./db.modelo.concepto-costos');
const Fechas = require('./db.modelo.fechas');

class CostosDirectos extends Model{}

CostosDirectos.init(
    {
        //Se definen los campos del modelo
        cantidad: {type: DataTypes.FLOAT, allowNull:false}
    },
    {
        sequelize,
        modelName: 'ingresos',
        timestamps: true
    });
CostosDirectos.ConceptosCostos = CostosDirectos.belongsTo(ConceptosCostos);
CostosDirectos.Fechas = CostosDirectos.belongsTo(Fechas)
Fechas.hasMany(CostosDirectos)
ConceptosCostos.hasMany(CostosDirectos)

module.exports = CostosDirectos;