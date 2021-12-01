const db = require("../../db/db");
const { StatusCodes } = require('http-status-codes');

const userLogic = require('../../controllerLogic/user.js').modify;

const userEdit = async (req, res) => {
    let obj = await userLogic(false, req, res);
    if (obj.error != undefined) {
        return;
    }
    res.status(StatusCodes.OK).send();
}

module.exports = userEdit;