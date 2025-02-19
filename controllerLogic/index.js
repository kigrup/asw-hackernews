const db = require('../db/db');
const ejs = require('ejs');
const moment = require('moment');
moment.updateLocale('es');

const index = async(fromBrowser, req) => 
{
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
        user: {},
    };
    let userId;
    if (fromBrowser && req.isAuthenticated()) {
        userId = req.user.id;
    }
    if (userId != undefined || req.header('X-API-KEY') != undefined) {
        renderObject.loggedIn = true;
        if (!fromBrowser)
            userId = req.header('X-API-KEY');
        const loggeduser = await db.users.findOne({
            where: {
                id: userId
            },
            include: [
                {
                    association: 'liked',
                    model: db.contributions,
                },
            ],
        });
        renderObject.user = loggeduser;
        for (let l = 0; l < loggeduser.liked.length; l++) {
            for (let p = 0; p < posts.length; p++) {
                if (loggeduser.liked[l].id == posts[p].id) {
                    posts[p].isLiked = true;
                }
            }
        }
    }
    return renderObject;
}

const newest = async (fromBrowser, req) => {
    let postTypes = {};
    let url;
    if (req.url.includes('/ask')) {
        url = '/ask';
    } else if (req.url.includes('/newest')) {
        url = '/newest';
    }
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
        user: {},
    };
    let userId;
    if (fromBrowser && req.isAuthenticated()) {
        userId = req.user.id;
    }
    if (userId != undefined || req.header('X-API-KEY') != undefined) {
        renderObject.loggedIn = true;
        if (!fromBrowser) 
            userId = req.header('X-API-KEY');
        const loggeduser = await db.users.findOne({
            where: {
                id: userId,
            },
            include: [
                {
                    association: 'liked',
                    model: db.contributions,
                },
            ],
        });
        renderObject.user = loggeduser;
        for (let l = 0; l < loggeduser.liked.length; l++) {
            for (let p = 0; p < posts.length; p++) {
                if (loggeduser.liked[l].id == posts[p].id) {
                    posts[p].isLiked = true;
                }
            }
        }
    }
    return renderObject;
}

module.exports = {index,newest};