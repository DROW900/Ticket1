const modeloPresupuestos = require('../models/modelo.presupuestos')

module.exports.obtenerPresupuestos = async()=>{
    try {
        const resultados = await modeloPresupuestos.obtenerPresupuestos();
        return resultados    
    } catch (error) {
        throw error
    }
}