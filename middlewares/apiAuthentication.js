const { StatusCodes } = require('http-status-codes');

const apiauth = async (req, res, next) => {
    // TODO IMPLEMENTAR
    // mirar req.header(API-KEY)
    // si falla la autenticación haces:
    // req.status(StatusCodes.UNAUTHORIZED).send();
    // si todo va bien haces:
    next();
};

module.exports = apiauth;
