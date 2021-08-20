const {Op} = require('sequelize')
const Presupuestos = require('../../db/db.modelo.presupuestos')
const ConceptosIngresos = require('../../db/db.modelo.concepto-ingresos')
const Ingresos = require('../../db/db.modelo.ingresos')
const Fechas = require('../../db/db.modelo.fechas')
const ConceptosGastosAdmin = require('../../db/db.modelo.conGastAdm')
const ConceptosCostos = require('../../db/db.modelo.conceptoCostos')
const CostosDirectos = require('../../db/db.modelo.costosDirectos')
const GastosAdmin = require('../../db/db.modelo.gastosAdmin')
const RolesRecursos = require('../../db/db.modelo.roles')
const PorcentajeRecursos = require('../../db/db.modelo.porcentajesRec')

module.exports.obtenerPresupuestos = async()=>{
    try {
        const resultados = await Presupuestos.findAll({where:{status: 1}})
        return resultados
    } catch (error) {
        throw new Error('Ocurrió un error desde el modelo: ' + error)
    }
}

module.exports.eliminarPresupuesto = async(idPresupuesto)=>{
    try {
        const resultado = await Presupuestos.update({status: 0}, {where:{id: idPresupuesto}})
        return resultado
    } catch (error) {
        console.log('Ocurrió un error desde el modelo ' + error)
        throw new Error(error)
    }
}


module.exports.registrarPresupuesto = async(datos)=>{
    try {
        const datosPresupuesto = [datos.nombreProyecto,datos.version,1]
        const conceptosIngresos = datos.conceptosIng;
        const conceptosGastos = datos.conceptosGastos;
        const conceptosCostos = datos.conceptoCostos;
        const rolesRecursos = datos.rolesRecursos;
        //Se crea primero el presupuesto para obtener el identificador con el que se relacionaran los datos como ingresos, costos, etc.
        const presupuesto = await Presupuestos.create({nombreProyecto:datosPresupuesto[0], version:datosPresupuesto[1], status:datosPresupuesto[2]})
        let idPresupuesto = presupuesto.id

        //Se crean las fechas con el fin de obtener los identificadores y así almacenarlos en un arreglo con el fin de utilizarlos posteriormente
        let fechas = [];
        for(let i = 0; i  < datos.fechas.length; i++){
            let resultado = await Fechas.findOrCreate({where: {[Op.and]:[{mes:datos.fechas[i].mes},{anio:datos.fechas[i].anio}]}, defaults:{anio:datos.fechas[i].anio, mes:datos.fechas[i].mes}})
            fechas.push(resultado[0].id)
        }

        //Una vez tenido el identificador del presupuesto y los de las fechas, se ciclan los elementos que se vayan a ir ingresando
        /******* Ingresos *******/
        for(let i = 0; i < conceptosIngresos.length; i++){
            let resultado = await ConceptosIngresos.findOrCreate({where:{titulo: conceptosIngresos[i]}, defaults:{titulo: conceptosIngresos[i]}})
            for(let j = 0; j < fechas.length; j++){
                let resultado2 = await Ingresos.create({cantidad: datos.fechas[j].ingresos[i], presupuestoId:idPresupuesto, conceptosIngresoId:resultado[0].id, fechaId:fechas[j]})
            }
        }
        /******* Gastos Admin *******/
        for(let i = 0; i < conceptosGastos.length; i++){
            let resultado = await ConceptosGastosAdmin.findOrCreate({where:{titulo: conceptosGastos[i]}, defaults:{titulo: conceptosGastos[i]}})
            for(let j = 0; j < fechas.length; j++){
                let resultado2 = await GastosAdmin.create({cantidad: datos.fechas[j].gastos[i], presupuestoId:idPresupuesto, conceptosGastosAdminId:resultado[0].id, fechaId:fechas[j]})
            }
        }

        /******* Costos *******/
        for(let i = 0; i < conceptosCostos.length; i++){
            let resultado = await ConceptosCostos.findOrCreate({where:{titulo: conceptosCostos[i]}, defaults:{titulo: conceptosCostos[i]}})
            for(let j = 0; j < fechas.length; j++){
                let resultado2 = await CostosDirectos.create({cantidad: datos.fechas[j].costos[i], presupuestoId:idPresupuesto, conceptosCostoId:resultado[0].id, fechaId:fechas[j]})
            }
        }

        /******* Recursos *******/
        for(let i = 0; i < rolesRecursos.length; i++){
            let resultado = await RolesRecursos.findOrCreate({where: {[Op.and]:[{titulo: rolesRecursos[i].nombre},{valor:rolesRecursos[i].precio}]}, defaults:{titulo: rolesRecursos[i].nombre, valor:rolesRecursos[i].precio}})
            for(let j = 0; j < fechas.length; j++){
                let resultado2 = await PorcentajeRecursos.create({porcentaje: datos.fechas[j].roles[i], presupuestoId:idPresupuesto, rolesRecursoId:resultado[0].id, fechaId:fechas[j]})
            }
        }

        return 1;
    } catch (error) {
        throw new Error(error)
    }
}