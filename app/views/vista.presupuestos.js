const controladorPresupuestos = require('../controller/controlador.presupuestos.js')
const midd = require('../../middlewares/midd.usuarios')
const middPres = require('../../middlewares/midd.presupuesto')

module.exports = async(app) =>{
    app.get('/presupuestos', async(req, res) =>{
        try {
            res.render('presupuestos')
        } catch (error) {
            console.log(error)
            res.status(500).json("Error: No se pudo renderizar la pagina correspondiente. Contacte con el desarrollador" )
        }
    })
    app.get('/crearPresupuesto', async(req, res)=>{
        try {
            res.render('crear')
        } catch (error) {
            console.log(error)
            res.status(500).json('Error: No se pudo renderizar la pagina. Contacte con el desarrollador')
        }
    })
    
    app.get('/obtenerPresupuestos', async(req,res)=>{
        try {
            resultados = await controladorPresupuestos.obtenerPresupuestos();
            res.status(200).json(resultados)
        } catch (error) {
            res.status(500).json('Ocurrió un error al obtener los registros')
        }
    })

    app.post('/registrarPresupuesto',midd.usuarioValido,middPres.chequeaPresupuesto,async(req,res)=>{
        try {
            let resultado = await controladorPresupuestos.registrarPresupuesto(req.body)     
            res.status(200).json('resultado')     
        } catch (error) {
            console.log(error)
            res.status(500).json('Ocurrió un error al procesar la información')
        }
    })

    app.delete('/eliminarPresupuesto/:idPresupuesto',midd.usuarioValido, async(req,res)=>{
        try {
            let resultados = await controladorPresupuestos.eliminarPresupuesto(req.params.idPresupuesto)
            res.status(200).json(resultados)
        } catch (error) {
            res.status(500).json('Ocurrió un error al eliminar el registro')
        }
    })

    app.get('/obtenerInfo/:idPresupuesto', async(req,res)=>{
        try {
            const resultado = await controladorPresupuestos.obtenerInfo(req.params.idPresupuesto)
            res.status(200).json(resultado)
        } catch (error) {
            console.log(error)
            res.status(500).json('Ocurrió un problema al obtener la información')
        }
    })
}