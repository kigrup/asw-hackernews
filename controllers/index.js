const { StatusCodes } = require('http-status-codes');
const Contribution = require('../db/models/Contribution');
const logger = require('../utils/logger');
const ejs = require('ejs');

const index = async (req, res) => {
    var response = 'Publications: \n';
    try {
        const posts = await Contribution.findAll({
            where: {
                type: 'post',
            },
            attributes: ['title', 'text', 'url'],
        });
        posts.forEach((post) => {
            response += `${post.title} ${
                post.text === undefined || post.text == ''
                    ? post.url
                    : post.text
            } \r\n\r\n`;
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
