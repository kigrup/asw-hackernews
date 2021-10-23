const { StatusCodes } = require('http-status-codes');
const Contribution = require('../db/models/Contribution');
const Constants = require('../utils/Constants');
const logger = require('../utils/logger');

const submit = async (req, res) => {
    try {
        res.render('pages/submit', {
            invalidTitle: req.query.invalidTitle,
        });
    } catch (e) {
        logger.info('Error on /submit');
        logger.info(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const post = async (req, res) => {
    try {
        const { title, url, text } = req.body;
        if (title === undefined || !title) {
            res.redirect(
                url.format({
                    pathname: 'http://hackers.hopto.org:13001/submit',
                    query: {
                        invalidTitle: true,
                    },
                })
            );
            return;
        }
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
        res.status(StatusCodes.OK).redirect('/');
    } catch (e) {
        logger.info('Error creating contribution');
        logger.info(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = { submit, post };
