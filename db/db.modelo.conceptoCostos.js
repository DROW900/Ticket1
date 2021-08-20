const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');

class ConceptosCostos extends Model{}

ConceptosCostos.init(
    {
        //Se definen los campos del modelo
        titulo: {type: DataTypes.STRING(50), allowNull:false}
    },
    {
        sequelize,
        modelName: 'conceptosCostos',
        timestamps: true
    });
    
module.exports = ConceptosCostos;