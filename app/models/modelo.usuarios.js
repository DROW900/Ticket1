const Usuarios = require('../../db/db.modelo.usuarios')

module.exports.validarUsuario = async(datos) => {
    try {
        let login = [datos.usuario, datos.contrasenia];
        let resultado = await Usuarios.findOne({where: {usuario: login[0], contrasenia: login[1], status: 1}})
        if (resultado != undefined) {
            return resultado;
        }else{
            throw new Error('Usuario o contraseña incorrectos')
        }
    } catch (error) {
        throw new Error(error)
    }
}