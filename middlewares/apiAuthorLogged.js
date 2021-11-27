const { StatusCodes } = require('http-status-codes');

const apiAuthorLogged = async (req, res, next) => {
    if(!(req.body.author == req.header("X-API-KEY"))){
        req.status(StatusCodes.UNAUTHORIZED).send()
    }
    next();
};

module.exports = apiAuthorLogged;