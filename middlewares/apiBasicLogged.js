const { StatusCodes } = require('http-status-codes');

const apiSelfLogged = async (req, res, next) => {
    if(!(req.params.userId != undefined)){
        req.status(StatusCodes.UNAUTHORIZED).send()
    }
    next();
};

module.exports = apiSelfLogged;