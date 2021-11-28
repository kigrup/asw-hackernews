const { StatusCodes } = require('http-status-codes');

const apiSelfLogged = async (req, res, next) => {
    if(req.params.userId == undefined){
        res.status(StatusCodes.UNAUTHORIZED).send()
    }
    else {
        next();
    }
};

module.exports = apiSelfLogged;