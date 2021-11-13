const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');
const ejs = require('ejs');
const moment = require('moment');

moment.updateLocale('es');

const threads = async (req, res) => {
    try {
        var localauthor;
        if (req.query.by !== undefined) {
            localauthor = await req.query.by;
        } else if (req.isAuthenticated()) {
            localauthor = req.user.id;
        } else {
            res.redirect('/login');
            return;
        }
        const comments = await db.contributions.findAll({
            attributes: [
                'id',
                'title',
                'type',
                'content',
                'upvotes',
                'comments',
                'author',
                'authorName',
                'createdAt',
            ],
            where: {
                type: 'comment',
                author: localauthor,
            },
            include: [db.users],
            order: [['createdAt', 'DESC']],
        });
        var repliesIds = [];
        const populateComments = async (commentsObject, depth) => {
            for (let i = 0; i < commentsObject.length; i++) {
                {
                    child = await db.contributions.findOne({
                        where: {
                            id: commentsObject[i].dataValues.id,
                        },
                        include: [db.contributions],
                    });
                    child.dataValues.deep = depth;
                    commentsObject[i] = child;
                    if (depth > 1) {
                        repliesIds.push(commentsObject[i].dataValues.id);
                    }
                    //console.log('CHILD:');
                    //console.log(require('util').inspect(child, false, 6, false));
                    if (child.dataValues.contributions !== undefined) {
                        console.log('------POPULATING COMMENT---------');
                        console.log(child.dataValues.content);
                        await populateComments(
                            commentsObject[i].dataValues.contributions,
                            depth + 1
                        );
                    }
                }
            }
        };
        await populateComments(comments, 1);
        var uniqueComments = [];
        for (let i = 0; i < comments.length; i++) {
            if (!repliesIds.includes(comments[i].dataValues.id)) {
                uniqueComments.push(comments[i]);
            }
        }

        const post = { deep: 0 }; // dummy object to read indentation
        let renderObject = {
            post: post,
            comments: uniqueComments,
            moment: moment,
            loggedIn: false,
            user: {},
        };

        const setIsLiked = async (user, commentsObject) => {
            for (let i = 0; i < commentsObject.length; i++) {
                for (let l = 0; l < user.liked.length; l++) {
                    if (
                        commentsObject[i].dataValues.id ==
                        user.liked[l].dataValues.id
                    ) {
                        commentsObject[i].dataValues.isLiked = true;
                        commentsObject[i].isLiked = true;
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
            await setIsLiked(loggedUser, uniqueComments);
            renderObject.comments = uniqueComments;
            renderObject.loggedIn = true;
            renderObject.user = loggedUser;
        }
        res.render('pages/threads', renderObject);
    } catch (e) {
        console.log('Issue in Threads');
        console.log(e.message);
        res.status(StatusCodes.OK).send('Error');
    }
};

module.exports = threads;
