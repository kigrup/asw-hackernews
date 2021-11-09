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
            renderObject.user = req.user;
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

const threads = async (req, res) => {
    try {
        const { id, content } = req.body;
        console.log(`starting comment thread id: ${id} content: ${content}`);
        if (id === undefined || !id) {
            res.send('Id undefined in body');
        } else if (content === undefined || !content) {
            res.send('Message undefined in body');
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
                'createdAt',
            ],
            where: {
                type: 'comment'
            },
            include: [db.users],
            order: [['createdAt', 'DESC']],
        });
        let renderObject = {
            comments: comments,
            moment: moment,
            loggedIn: false,
            baseUrl: require('../utils/Constants').BASE_URL
        };
        if (req.isAuthenticated()) {
            renderObject.loggedIn = true;
            renderObject.user = req.user;
        }
        res.redirect(`threads?id=${id}`, renderObject);
    } catch (e) {
        console.log('Issue in Threads');
        console.log(e.message);
        res.status(StatusCodes.OK).send('Error');
    }
};

module.exports = { index, newest, threads };
