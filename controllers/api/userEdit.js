const db = require("../../db/db");
const { StatusCodes } = require('http-status-codes');

const userLogic = require('../../controllerLogic/user.js').user;

const userEdit = async (req, res) => {

    await userLogic(false, req, res);
    res.redirect(`/api/user${req.params.id}`)

}

module.exports = userEdit;