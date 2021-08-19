const rateLimit = require("express-rate-limit");


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10000, // limit each IP to 100 requests per windowMs
    message: 'Usted exedió el limite de accesos a la API'
});


module.exports = {limiter} 