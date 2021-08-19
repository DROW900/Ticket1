const controladorPresupuestos = require('../controller/controlador.presupuestos.js')

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
            
        }
    })
}