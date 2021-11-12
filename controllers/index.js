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
                include: ['liked']
            });
            renderObject.user = loggeduser;
            for (let l = 0; l < loggeduser.liked.length; l++) {
                for (let p = 0; p < posts.length; p++) {
                    if (loggeduser.liked[l].id == posts[p].id){
                        posts[p].isLiked = true;
                    }
                    else {
                        posts[p].isLiked = false;
                    }
                }
            }
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
        let postTypes = {};
        const url = await req.url.match(/[^?]*/);
        console.log(`/newest request from: ${url}`);
        if (url == '/ask') {
            postTypes = {
                [db.Op.eq]: 'post/text',
            };
        } else if (url == '/newest') {
            postTypes = {
                [db.Op.like]: 'post/%',
            };
        }
        let whereClause = {
            type: postTypes,
        };
        if (req.query.by != undefined) {
            console.log('received by parameter in query');
            whereClause.author = {
                [db.Op.eq]: req.query.by,
            };
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
            where: whereClause,
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
            for (let l = 0; l < loggeduser.liked.length; l++) {
                for (let p = 0; p < posts.length; p++) {
                    if (loggeduser.liked[l].id == posts[p].id){
                        posts[p].isLiked = true;
                    }
                    else {
                        posts[p].isLiked = false;
                    }
                }
            }
        }
        res.render('pages/index', renderObject);
    } catch (e) {
        console.log('Issue in index');
        console.log(e.message);
        res.status(StatusCodes.OK).send('Error');
    }
};

module.exports = { index, newest };
