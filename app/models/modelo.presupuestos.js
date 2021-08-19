const Presupuestos = require('../../db/db.modelo.presupuestos')

module.exports.obtenerPresupuestos = async()=>{
    try {
        const resultados = await Presupuestos.findAll({where:{status: 1}})
        return resultados
    } catch (error) {
        throw new Error('Ocurrió un error desde el modelo: ' + error)
    }
}