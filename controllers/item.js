const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');

const item = async (req, res) => {
    try {
        const id = req.query.id;
        if (id === undefined || !id || id < 1) {
            res.send('Invalid id in query');
        }
        const post = await db.contributions.findOne({
            where: {
                id: id,
            },
            include: [db.contributions],
        });
        var comments = {};

        const baseComments = await db.contributions.findAll({
            where: {
                id: post.inReplyTo,
            },
        });
        baseComments.forEach((comment) => {});
        res.render('pages/item', {
            post: post,
            comments: baseComments,
            moment: require('moment'),
        });
    } catch (e) {
        console.log('Error on /item');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = item;
