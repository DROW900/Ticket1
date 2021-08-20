const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');
const Fechas = require('./db.modelo.fechas');
const Presupuestos = require('./db.modelo.presupuestos');
const RolesRecursos = require('./db.modelo.roles');

class PorcentajeRecursos extends Model{}

PorcentajeRecursos.init(
    {
        //Se definen los campos del modelo
        porcentaje:{type: DataTypes.INTEGER, allowNull:false}
    },
    {
        sequelize,
        modelName: 'porcentajeRecursos',
        timestamps: true
    });

PorcentajeRecursos.Presupuestos = PorcentajeRecursos.belongsTo(Presupuestos)
PorcentajeRecursos.Fechas = PorcentajeRecursos.belongsTo(Fechas)
PorcentajeRecursos.RolesRecursos = PorcentajeRecursos.belongsTo(RolesRecursos)
Fechas.hasMany(PorcentajeRecursos)
Presupuestos.hasMany(PorcentajeRecursos);
RolesRecursos.hasMany(PorcentajeRecursos);
module.exports = PorcentajeRecursos;