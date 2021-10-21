const { StatusCodes } = require('http-status-codes');
const Contribution = require('../db/models/Contribution');
const logger = require('../utils/logger');
const ejs = require('ejs');

const index = async (req, res) => {
    try {
        const posts = await Contribution.findAll({
            attributes: ['id', 'title', 'type', 'content'],
        });
        res.render('pages/index', {
            posts: posts,
        });
    } catch (e) {
        logger.info('Issue in index');
        logger.info(e.message);
        res.status(StatusCodes.OK).send('Error');
    }
};

const newest = async (req, res) => {
    res.status(StatusCodes.OK).send('Casa dulce casa /newest');
};

module.exports = { index, newest };
