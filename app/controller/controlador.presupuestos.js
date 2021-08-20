const modeloPresupuestos = require('../models/modelo.presupuestos')

module.exports.obtenerPresupuestos = async()=>{
    try {
        const resultados = await modeloPresupuestos.obtenerPresupuestos();
        return resultados    
    } catch (error) {
        throw error
    }
}

module.exports.registrarPresupuesto = async(datos)=>{
    try {
        const resultado = await modeloPresupuestos.registrarPresupuesto(datos);
        return resultado
    } catch (error) {
        throw error
    }
}

module.exports.eliminarPresupuesto = async(idPresupuesto)=>{
    try {
        const resultado = await modeloPresupuestos.eliminarPresupuesto(idPresupuesto)
        return resultado
    } catch (error) {
        throw error
    }
}