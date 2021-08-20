const {modeloPresupuesto} = require('./midd.modeloPresupuesto')
const Joi = require('joi');

module.exports.chequeaPresupuesto = async(req,res,next)=>{
    try {
        let resultado = await Joi.attempt(req.body, modeloPresupuesto)
        return next()
    } catch (error) {
        console.log('Error al verificar los datos')
        res.status(500).json('Los datos ingresados son incorrectos, verifique la información' + error)
    }
}