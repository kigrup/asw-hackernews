const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');

const item = async (req, res) => {
    try {
        const id = req.query.id;
        if (id === undefined || !id || id < 1) {
            res.send('Invalid id in query');
        }
        // Get first comment
        const post = await db.contributions.findOne({
            where: {
                id: id,
            },
            include: [db.contributions],
        });

        // Get first level of childs

        //console.log(require('util').inspect(post, false, 3, false));
        if (post == undefined) {
            res.send('Item not found');
            return;
        }

        let comments = await db.contributions.findAll({
            where: {
                inReplyTo: id,
            },
            include: [db.contributions],
        });
        // Recursively get all childs' comments

        const populateComments = async (commentsObject) => {
            for (let i = 0; i < commentsObject.length; i++) {
                child = await db.contributions.findOne({
                    where: {
                        id: commentsObject[i].dataValues.id,
                    },
                    include: [db.contributions],
                });
                commentsObject[i] = child;
                if (child.dataValues.contributions !== undefined) {
                    await populateComments(
                        commentsObject[i].dataValues.contributions
                    );
                }
            }
        };

        await populateComments(comments);

        const setIsLiked = async (user, commentsObject) => {
            for (let i = 0; i < commentsObject.length; i++) {
                for (let l = 0; l < user.liked.length; l++) {
                    if (
                        commentsObject[i].dataValues.id ==
                        user.liked[l].dataValues.id
                    ) {
                        commentsObject[i].dataValues.isLiked = true;
                        commentsObject[i].isLiked = true;
                    } else if (
                        user.liked[l].dataValues.id == post.dataValues.id ||
                        user.liked[l].dataValues.id == post.id
                    ) {
                        console.log(`found root post as liked`);
                        post.dataValues.isLiked = true;
                        post.isLiked = true;
                    }
                }
                await setIsLiked(
                    user,
                    commentsObject[i].dataValues.contributions
                );
            }
        };

        let loggedUser;
        if (req.user) {
            loggedUser = await db.users.findOne({
                where: {
                    id: req.user.id,
                },
                include: [
                    {
                        association: 'liked',
                        model: db.contributions,
                    },
                ],
            });
            await setIsLiked(loggedUser, comments);
            for (let l = 0; l < loggedUser.liked.length; l++) {
                if (post.id == loggedUser.liked[l].id) {
                    post.isLiked = true;
                    post.dataValues.isLiked = true;
                    console.log('found post in liked');
                }
            }
        }
        let rootPost = post;
        while (rootPost.inReplyTo != undefined) {
            rootPost = await db.contributions.findOne({
                where: {
                    id: rootPost.inReplyTo
                }
            });
        }
        //console.log(`rootpost: ${require('util').inspect(rootPost, false, 3, false)}`);
        //console.log(`post: ${require('util').inspect(post, false, 3, false)}`);
        let dataObject = {
            post: post,
            comments: comments,
            moment: require('moment'),
            loggedIn: false,
            user: {},
            rootPost: rootPost,
        };
        if (req.user) {
            dataObject.loggedIn = true;
            dataObject.user = loggedUser;
        }
        res.render('pages/item', dataObject);
    } catch (e) {
        console.log('Error on /item');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const comment = async (req, res) => {
    try {
        if (!req.user) {
            res.redirect('/login');
        }
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
        //console.log(`commenting onto: ${require('util').inspect(contribution, false, 3, false)}`);
        //console.log(`with user: ${require('util').inspect(req.user, false, 5, false)}`);
        const authorObject = await db.users.findOne({
            where: {
                id: req.user.id,
            },
        });

        let root;
        if (contribution.type == 'comment') {
            root = contribution.root;
        }
        else {
            root = contribution.id;
        }
        parentContribution = contribution;
        parentContribution.comments = parentContribution.comments + 1;
        parentContribution.save();
        while (parentContribution.inReplyTo != undefined) {
            parentContribution = await db.contributions.findOne({
                where: {
                    id: parentContribution.inReplyTo
                }
            })
            parentContribution.comments = parentContribution.comments + 1;
            parentContribution.save();
        }
        const reply = await db.contributions.create({
            type: 'comment',
            content: content,
            inReplyTo: id,
            author: req.user.id,
            authorName: authorObject.dataValues.username,
            deep: contribution.deep + 1,
            root: root
        });

        //console.log(`commented: ${require('util').inspect(reply, false, 3, false)}`);

        res.redirect(`/item?id=${id}`);
    } catch (e) {
        console.log('Error on /item/comment');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = { item, comment };
