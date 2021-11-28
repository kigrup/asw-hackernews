const { StatusCodes } = require('http-status-codes');

const apiAuthorLogged = async (req, res, next) => {
    if(req.body.author != req.header("X-API-KEY")){
        res.status(StatusCodes.UNAUTHORIZED).send()
    }
    else {
        next();
    }
};

module.exports = apiAuthorLogged;