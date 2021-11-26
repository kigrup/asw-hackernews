const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');
import {
    item as itemLogic
    ,comment as commentLogic
} from "../controllerLogic/item";


const item = async (req, res) => {
    try {
        
        let dataObject = await itemLogic(req, res);
        res.render('pages/item', dataObject);
    } catch (e) {
        console.log('Error on /item');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const comment = async (req, res) => {
    try {
        
        await commentLogic(req,res);

        //console.log(`commented: ${require('util').inspect(reply, false, 3, false)}`);

        res.redirect(`/item?id=${id}`);
    } catch (e) {
        console.log('Error on /item/comment');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }

    
};

module.exports = { item, comment };



