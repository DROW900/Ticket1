const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors')
const midd = require('./middlewares/midd')
const sequelize = require('./db/db.conexion');
//Endpoints
const vistaUsuario = require('./app/views/vista.usuario')
const vistaPresupuesto = require('./app/views/vista.presupuestos')

//Modelos sequelize
const Usuarios = require ('./db/db.modelo.usuarios')
const Fechas = require('./db/db.modelo.fechas')
const Ingresos = require('./db/db.modelo.ingresos')
const Presupuestos = require('./db/db.modelo.presupuestos')
const ConceptosIngresos = require('./db/db.modelo.concepto-ingresos')
const CostosDirectos = require('./db/db.modelo.costosDirectos')
const ConceptosCostos = require('./db/db.modelo.conceptoCostos')
const GastosAdmin = require('./db/db.modelo.gastosAdmin')
const ConceptosGastosAdmin = require('./db/db.modelo.conGastAdm')
const PorcentajesRecursos = require('./db/db.modelo.porcentajesRec')
const RolesRecursos = require('./db/db.modelo.roles');
const PorcentajeRecursos = require('./db/db.modelo.porcentajesRec');

//Middleware globales
app.use(express.json())
app.use(cors())
app.use(midd.limiter)

//Configuraciones globales
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

//Se levanta el servidor
async function inicioServer(){
    try {
        await Usuarios.sync({alter: true})
        await Fechas.sync({alter: true})
        await Presupuestos.sync({alter: true})
        await ConceptosIngresos.sync({alter: true})
        await ConceptosCostos.sync({alter: true})
        await ConceptosGastosAdmin.sync({alter: true})
        await RolesRecursos.sync({alter: true})
        await Ingresos.sync({alter: true})
        await CostosDirectos.sync({alter: true})
        await GastosAdmin.sync({alter: true})
        await PorcentajeRecursos.sync({alter: true})
        await sequelize.authenticate()
        console.log('Se autenticó correctamente la DB')
        app.listen(process.env.PORT, function(){
            console.log(`Servidor inicializado en http://${process.env.HOST}:${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

inicioServer()

vistaUsuario(app)
vistaPresupuesto(app)