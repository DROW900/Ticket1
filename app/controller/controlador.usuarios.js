const modeloUsuario = require('../models/modelo.usuarios.js')
const jwt = require('jsonwebtoken')

module.exports.validarUsuario = async(datos)=>{
    try {
        const resultado = await modeloUsuario.validarUsuario(datos)
        return resultado
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.generaToken = async(data) => {
    const resultado = jwt.sign({
            data
        }, process.env.SECRET_KEY) //Tiempo maximo 15 minutos de validez
    return resultado
}

module.exports.verificacionUsuario = async(token) => {
    const resultado = jwt.verify(token, process.env.SECRET_KEY)
    if (resultado) {
        return resultado
    } else {
        throw new Error('Token no valido!')
    }
}