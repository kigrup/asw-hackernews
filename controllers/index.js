const { StatusCodes } = require('http-status-codes');
const Contribution = require('../db/models/Contribution');
const logger = require('../utils/logger');

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
                post.text === undefined ? post.url : post.text
            } \r\n`;
        });

        res.status(StatusCodes.OK).send(response);
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
