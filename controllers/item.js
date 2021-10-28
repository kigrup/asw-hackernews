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

        let comments = await db.contributions.findAll({
            where: {
                inReplyTo: id,
            },
            include: [db.contributions],
        });
        const populateComments = (commentsObject) => {
            for (
                let i = 0;
                i < commentsObject.contributions.dataValues.length;
                i++
            ) {
                child = db.contributions.findOne({
                    where: {
                        id: id,
                    },
                    include: [db.contributions],
                });
                commentsObject.contributions.dataValues[i] = child;
                if (child.contributions.dataValues !== undefined) {
                    populateComments(
                        commentsObject.contributions.dataValues[i]
                    );
                }
            }
        };
        // feach comment

        console.log('INSPECTION:');
        console.log(require('util').inspect(comments, false, 5, false));

        res.render('pages/item', {
            post: post,
            comments: comments,
            moment: require('moment'),
        });
    } catch (e) {
        console.log('Error on /item');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const comment = async (req, res) => {
    try {
        const { id, content } = req.body;
        console.log(`starting comment id: ${id} content: ${content}`);
        if (id === undefined || !id) {
            res.send('Id undefined in body');
        } else if (content === undefined || !content) {
            res.send('Message undefined in body');
        }
        const contribution = await db.contributions.findOne({
            where: {
                id: id,
            },
        });
        const reply = await db.contributions.create({
            type: 'comment',
            content: content,
            inReplyTo: id,
            author: 'raulplesa',
            deep: contribution.deep + 1,
        });
        res.redirect(`/item?id=${id}`);
    } catch (e) {
        console.log('Error on /item/comment');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = { item, comment };
