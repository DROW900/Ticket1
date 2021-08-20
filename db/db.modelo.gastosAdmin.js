const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Presupuestos = require('./db.modelo.presupuestos')
const conceptosGastosAdmin = require('./db.modelo.conGastAdm');
const Fechas = require('./db.modelo.fechas');

class GastosAdmin extends Model{}

GastosAdmin.init(
    {
        //Se definen los campos del modelo
        cantidad: {type: DataTypes.FLOAT, allowNull:false}
    },
    {
        sequelize,
        modelName: 'gastosAdmin',
        timestamps: true
    });

    GastosAdmin.Presupuestos = GastosAdmin.belongsTo(Presupuestos)
    GastosAdmin.conceptosGastosAdmin = GastosAdmin.belongsTo(conceptosGastosAdmin);
    GastosAdmin.Fechas = GastosAdmin.belongsTo(Fechas);
    Presupuestos.hasMany(GastosAdmin);
    conceptosGastosAdmin.hasMany(GastosAdmin);
    Fechas.hasMany(GastosAdmin);
    
module.exports = GastosAdmin;