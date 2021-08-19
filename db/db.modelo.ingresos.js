const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');
const ConceptosIngresos = require('./db.modelo.concepto-ingresos');
const Fechas = require('./db.modelo.fechas');

class Ingresos extends Model{}

Ingresos.init(
    {
        //Se definen los campos del modelo
        cantidad: {type: DataTypes.FLOAT, allowNull:false}
    },
    {
        sequelize,
        modelName: 'ingresos',
        timestamps: true
    });
Ingresos.ConceptoIngresos = Ingresos.belongsTo(ConceptosIngresos);
Ingresos.Fechas = Ingresos.belongsTo(Fechas)
Fechas.hasMany(Ingresos)
ConceptosIngresos.hasMany(Ingresos)

module.exports = Ingresos;