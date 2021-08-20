const Joi = require('joi')

module.exports = {
    modeloPresupuesto : Joi.object().keys({
        nombreProyecto: Joi.string().required(),
        version: Joi.string().required(),
        conceptosIng: Joi.array().items(Joi.string()),
        conceptosGastos: Joi.array().items(Joi.string()),
        conceptoCostos: Joi.array().items(Joi.string()),
        rolesRecursos: Joi.array().items(Joi.object({
            nombre: Joi.string(),
            precio: Joi.number()
        })),
        fechas: Joi.array().items(Joi.object({
            mes: Joi.number(),
            anio: Joi.number(),
            ingresos: Joi.array().items(Joi.number()),
            gastos: Joi.array().items(Joi.number()),
            costos: Joi.array().items(Joi.number()),
            roles: Joi.array().items(Joi.number()),
        }))

    }).with('nombreProyecto', 'version')
};
