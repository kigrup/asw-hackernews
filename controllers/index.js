const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');
const ejs = require('ejs');
const moment = require('moment');
moment.updateLocale('es');

import {
    index as indexLogic,
    newest as newestLogic
} from "../controllerLogic/index";


const index = async (req, res) => {
    try {
        let renderObject = await indexLogic(req);
        res.render('pages/index', renderObject);
    } catch (e) {
        console.log('Issue in index');
        console.log(e.message);
        res.status(StatusCodes.OK).send('Error');
    }
};

const newest = async (req, res) => {
    try {
        let renderObject = await newestLogic(req);
        res.render('pages/index', renderObject);
    } catch (e) {
        console.log('Issue in index');
        console.log(e.message);
        res.status(StatusCodes.OK).send('Error');
    }

    
};

module.exports = { index, newest };
