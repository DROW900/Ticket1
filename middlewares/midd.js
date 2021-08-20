const rateLimit = require("express-rate-limit");


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10000, //Limite de consultas por dirección
    message: 'Usted exedió el limite de accesos a la API'
});


module.exports = {limiter} 