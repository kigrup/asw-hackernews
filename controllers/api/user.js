const db = require("../../db/db");
const { StatusCodes } = require('http-status-codes');

const userLogic = require('../../controllerLogic/user.js').user;

const controller = async (req, res) => {
    let obj = await userLogic(false, req, res);

    let finalObj = {
        user: {
            username: obj.renderObject.userProfile.username,
            id: obj.renderObject.userProfile.id,
            email: obj.renderObject.userProfile.email,
            about: obj.renderObject.userProfile.about,
            karma: obj.renderObject.userProfile.karma,
            createdAt: obj.renderObject.userProfile.createdAt
        }
    };

    res.status(StatusCodes.OK).json(finalObj);
}

module.exports = controller;