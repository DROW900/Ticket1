const controladorUsuarios = require('../app/controller/controlador.usuarios')

module.exports.usuarioValido = async(req, res, next) => {
    try {
        if (req.headers.authorization != undefined) {
            const token = req.headers.authorization.split(' ')[1]
            console.log(token);
            let verificado = await controladorUsuarios.verificacionUsuario(token)
            console.log(verificado)
            req.params.usuario = verificado.data
            return next()
        } else {
            throw new Error('Este es un sistema seguro y requiere autorización')
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message })
    }
}