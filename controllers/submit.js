const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');
const Constants = require('../utils/Constants');

const postLogic = require('../controllerLogic/submit');

const submit = async (req, res) => {
    try {
        res.render('pages/submit', {
            invalidTitle: req.query.invalidTitle,
        });
    } catch (e) {
        console.log('Error on /submit');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const post = async (req, res) => {
    try {
        postLogic(true, req, res);
    } catch (e) {
        console.log('Error creating contribution');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = { submit, post };
