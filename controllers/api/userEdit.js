const db = require("../../db/db");
const { StatusCodes } = require('http-status-codes');

const userLogic = require('../../controllerLogic/user.js').user;

const userEdit = async (req, res) => {

    await userLogic(false, req, res);
    
    let obj = await db.users.findOne({
        where: {
            id: req.params.id,
        },
    });

    let finalObj = {
        user: {
            about: obj.dataValues.userProfile.about,
            
        }
    };

    res.status(StatusCodes.OK).json(finalObj);
}

module.exports = controller;