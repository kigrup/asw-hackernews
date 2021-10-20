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
        logger.info(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const post = async (req, res) => {
    try {
        const { title, url, text } = req.body;
        const user = await Contribution.create({
            type: 'post',
            title: title,
            url: url,
            text: text,
        });
        res.status(StatusCodes.OK).redirect(Constants.BASE_URL);
    } catch (e) {
        logger.info('Error creating contribution');
        logger.info(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = { submit, post };
