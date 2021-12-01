const { StatusCodes } = require('http-status-codes');

const apiBasicLogged = async (req, res, next) => {
    if(req.header("X-API-KEY") == undefined){
        res.status(StatusCodes.UNAUTHORIZED).send()
    }
    else {
        next();
    }
};

module.exports = apiBasicLogged;