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
            baseUrl: require('../utils/Constants').BASE_URL,
            user: {},
        };
        if (req.isAuthenticated()) {
            renderObject.loggedIn = true;
            const loggeduser = await db.users.findOne({
                where: {
                    id: req.user.id,
                },
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
        let postTypes = [];
        console.log(`/newest request from: ${req.url}`);
        const url = await req.url;
        if (req.url == '/ask') {
            postTypes.push({ type: 'post/text' });
        } else if (req.url == '/newest') {
            postTypes.push({ type: 'post/url' });
            postTypes.push({ type: 'post/text' });
        }
        let whereClause = { [db.Sequelize.Op.or]: postTypes };
        if (req.query.by != undefined) {
            whereClause.author = req.query.by;
        }

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
                type: {
                    [Op.or]: {
                        [Op.eq]: 'post/text',
                        [Op.eq]: 'post/url',
                    },
                },
                author: {
                    [Op.eq]: '101908718141570741187',
                },
            },
            include: [db.users],
            order: [['createdAt', 'DESC']],
        });
        posts.forEach(async (post) => {
            const postAuthor = await db.users.findOne({
                attributes: ['id', 'username'],
                where: {
                    id: post.author,
                },
            });
            post.authorName = postAuthor.username;
        });
        let renderObject = {
            posts: posts,
            moment: moment,
            loggedIn: false,
            baseUrl: require('../utils/Constants').BASE_URL,
            user: {},
        };
        if (req.isAuthenticated()) {
            renderObject.loggedIn = true;
            const loggeduser = await db.users.findOne({
                where: {
                    id: req.user.id,
                },
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

module.exports = { index, newest };
