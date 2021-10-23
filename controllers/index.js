const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');
const logger = require('../utils/logger');
const ejs = require('ejs');
const moment = require('moment');

moment.updateLocale('es');

const index = async (req, res) => {
    try {
        const posts = await db.contributions.findAll({
            attributes: [
                'id',
                'title',
                'type',
                'content',
                'upvotes',
                'comments',
                'author',
                'createdAt',
            ],
            include: [db.users],
            order: ['upvotes'],
        });
        console.log(require('util').inspect(posts, false, 5, false));
        res.render('pages/index', {
            posts: posts,
            moment: moment,
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
