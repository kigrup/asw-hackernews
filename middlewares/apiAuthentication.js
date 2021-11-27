const { StatusCodes } = require('http-status-codes');

const apiauth = async (req, res, next) => {
    // TODO IMPLEMENTAR
    // mirar req.header(API-KEY)
    next();
};

module.exports = apiauth;
