const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');
const Presupuestos = require('./db.modelo.presupuestos');

class ConceptosIngresos extends Model{}

ConceptosIngresos.init(
    {
        //Se definen los campos del modelo
        titulo: {type: DataTypes.STRING(50), allowNull:false}
    },
    {
        sequelize,
        modelName: 'conceptos_ingresos',
        timestamps: true
    });
ConceptosIngresos.Presupuestos = ConceptosIngresos.belongsTo(Presupuestos);
Presupuestos.hasMany(ConceptosIngresos);
module.exports = ConceptosIngresos;