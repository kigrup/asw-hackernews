const db = require("../../db/db");
const { StatusCodes } = require('http-status-codes');

const userLogic = require('../../controllerLogic/user.js').user;

const controller = async (req, res) => {
    await userLogic(false, req, res);
    
    let obj = await db.users.findOne({
        where: {
            id: req.params.id,
        },
    });

    let finalObj = {
        user: {
            username: obj.dataValues.userProfile.username,
            id: obj.dataValues.userProfile.id,
            email: obj.dataValues.userProfile.email,
            about: obj.dataValues.userProfile.about,
            karma: obj.dataValues.userProfile.karma,
            createdAt: obj.dataValues.userProfile.createdAt
        }
    };

    res.status(StatusCodes.OK).json(finalObj);
}

module.exports = controller;