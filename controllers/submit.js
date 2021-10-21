const { StatusCodes } = require('http-status-codes');
const Contribution = require('../db/models/Contribution');
const Constants = require('../utils/Constants');
const logger = require('../utils/logger');

const submit = async (req, res) => {
    try {
        res.status(StatusCodes.OK).send(
            `What would you like to say to the world?`
        );
    } catch (e) {
        logger.info('Error on /submit');
        logger.info(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const post = async (req, res) => {
    try {
        const { title, url, text } = req.body;
        var contentType, content;
        if (url === undefined || url == '') {
            contentType = 'post/text';
            content = text;
        } else {
            contentType = 'post/url';
            content = url;
        }
        const post = await Contribution.create({
            type: contentType,
            title: title,
            content: content,
        });
        res.status(StatusCodes.OK).redirect(Constants.BASE_URL);
    } catch (e) {
        logger.info('Error creating contribution');
        logger.info(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = { submit, post };
