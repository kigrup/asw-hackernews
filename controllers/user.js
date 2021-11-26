const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');
const moment = require('moment');

import { 
    user as userLogic,
    modify as modifyLogic
 } from "../controllerLogic/user";


 
const user = async (req, res) => {
    try {
        const id = req.query.id;
        if (id == undefined || !id) {
            res.send('User id undefined in query');
        }
        let { logged, renderObject } = await userLogic(id, req);
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

