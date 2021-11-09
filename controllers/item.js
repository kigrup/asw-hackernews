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

        console.log('item post: ');
        console.log(require('util').inspect(post, false, 3, false));
        if (post == undefined) {
            res.send('Item not found');
        }

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

        let dataObject = {
            post: post,
            comments: comments,
            moment: require('moment'),
            loggedIn: false,
        };
        if (req.user) {
            dataObject.loggedIn = true;
            dataObject.user = req.user;
        }
        res.render('pages/item');
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
