const { StatusCodes } = require('http-status-codes');
const Contribution = require('../db/models/User');
const Constants = require('../Constants');

const submit = async (req, res) => {
    try {
        res.status(StatusCodes.OK).send(
            `What would you like to say to the world?`
        );
    } catch (e) {
        console.log('Error on /submit');
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const contribution = async (req, res) => {
    const { type, title, url, text } = req.body;
    try {
        const user = await Contribution.create({
            title: title,
            url: url,
            text: text,
        });
        res.status(StatusCodes.OK).redirect(Constants.BASE_URL);
    } catch (e) {
        console.log('Error creating contribution');
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = { submit, contribution };
