const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');

const itemLogic = require('../controllerLogic/item').item;
const commentLogic = require('../controllerLogic/item').comment;

const item = async (req, res) => {
    try {
        let dataObject = await itemLogic(true, req, res);
        res.render('pages/item', dataObject);
    } catch (e) {
        console.log('Error on /item');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const comment = async (req, res) => {
    try {
        let o = await commentLogic(true, req,res);
        //console.log(`commented: ${require('util').inspect(reply, false, 3, false)}`);
        res.redirect(`/item?id=${o.idd}`);
    } catch (e) {
        console.log('Error on /item/comment');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }

    
};

module.exports = { item, comment };



