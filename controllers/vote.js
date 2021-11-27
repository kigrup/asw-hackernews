const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');

const voteLogic = require('../controllerLogic/vote').vote;

const vote = async (req, res) => {
    try {
        voteLogic(req, res);
    } catch (e) {
        console.log('Error voting on /vote');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = { vote };
