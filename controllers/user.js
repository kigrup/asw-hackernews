const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');

const userLogic = require('../controllerLogic/user').user;
const modifyLogic = require('../controllerLogic/user').modify;

const user = async (req, res) => {
    try {
        let { logged, renderObject } = await userLogic(req);
        res.render(`pages/user${logged}`, renderObject);
    } catch (e) {
        console.log('Error on /user');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const modify = async (req, res) => {
    try {
        let authorObject;
        if(!req.isAuthenticated()){
            res.redirect('/login');
            return;
        }
        else{
            authorObject= await db.users.findOne({
                where: {
                    id: req.user.id,
                }
            });
        }

        modifyLogic(req, authorObject);

        res.redirect(`/user?id=${req.user.id}`);

        
    } catch (e) {
        console.log('Error modfiying about');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = {user, modify};

