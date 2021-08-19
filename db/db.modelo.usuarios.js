const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');

class Usuarios extends Model{}

Usuarios.init(
    {
        //Se definen los campos del modelo
        nombre: {type: DataTypes.STRING(50), allowNull:false},
        primerApellido: {type: DataTypes.STRING(50), allowNull:false},
        segundoApellido: {type: DataTypes.STRING(50), allowNull:false},
        email: {type: DataTypes.STRING(100), allowNull:false},
        usuario: {type: DataTypes.STRING(50), allowNull: false},
        status: {type: DataTypes.INTEGER, allowNull: false},
        contrasenia: {type: DataTypes.STRING(50), allowNull:false},
        direccion: {type: DataTypes.STRING(50), allowNull:false},
        telefono: {type: DataTypes.STRING(50), allowNull:false}
    },
    {
        sequelize,
        modelName: 'usuarios',
        timestamps: true
    });
module.exports = Usuarios;