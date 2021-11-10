const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');
const ejs = require('ejs');
const moment = require('moment');

moment.updateLocale('es');

const index = async (req, res) => {
    try {
        const posts = await db.contributions.findAll({
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
                type: 'post/url',
            },
            include: [db.users],
            order: [['upvotes', 'DESC']],
        });
        let renderObject = {
            posts: posts,
            moment: moment,
            loggedIn: false,
            baseUrl: require('../utils/Constants').BASE_URL
        };
        if (req.isAuthenticated()) {
            renderObject.loggedIn = true;
            const loggeduser = await db.users.findOne({
                where: {
                    id: req.user.id,
                }
            });
            renderObject.user = loggeduser;
        }
        res.render('pages/index', renderObject);
    } catch (e) {
        console.log('Issue in index');
        console.log(e.message);
        res.status(StatusCodes.OK).send('Error');
    }
};

const newest = async (req, res) => {
    try {
        const posts = await db.contributions.findAll({
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
                [db.Sequelize.Op.or]: [
                    { type: 'post/text' },
                    { type: 'post/url' },
                ],
            },
            include: [db.users],
            order: [['createdAt', 'DESC']],
        });
        posts.forEach(async post => {
            const postAuthor = await db.users.findOne({
                attributes: [
                    'id',
                    'username',
                ],
                where: {
                    id: post.author
                }
            })
            post.authorName = postAuthor.username;
        });
        let renderObject = {
            posts: posts,
            moment: moment,
            loggedIn: false,
            baseUrl: require('../utils/Constants').BASE_URL
        };
        if (req.isAuthenticated()) {
            renderObject.loggedIn = true;
            renderObject.user = req.user;
        }
        res.render('pages/index', renderObject);
    } catch (e) {
        console.log('Issue in index');
        console.log(e.message);
        res.status(StatusCodes.OK).send('Error');
    }
};

module.exports = { index, newest };
