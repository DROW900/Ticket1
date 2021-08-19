const controladorUsuarios = require('../controller/controlador.usuarios.js')

module.exports = async(app) =>{
    app.get('/login', async(req, res) =>{
        try {
            res.render('login')
        } catch (error) {
            console.log(error)
            res.status(500).json("Error: No se pudo renderizar la pagina correspondiente. Contacte con el desarrollador" )
        }
    })

    app.post('/login', async(req, res) => {
        try {
            let resultado = await controladorUsuarios.validarUsuario(req.body)
            if (resultado != undefined) {
                let validacion = await controladorUsuarios.generaToken(req.body)
                res.status(200).json(validacion);
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    })  
} 