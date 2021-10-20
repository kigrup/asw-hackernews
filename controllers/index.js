const { StatusCodes } = require('http-status-codes');
const Contribution = require('../db/models/Contribution');

const index = async (req, res) => {
    const response = 'Publications: \n';
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
            } \n`;
        });

        res.status(StatusCodes.OK).send(response);
    } catch (e) {}
};

const newest = async (req, res) => {
    res.status(StatusCodes.OK).send('Casa dulce casa /newest');
};

module.exports = { index, newest };
