const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');
const ejs = require('ejs');
const moment = require('moment');

moment.updateLocale('es');

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
                type: 'comment',
                author: req.user.id
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
        res.redirect(`/threads?id=${req.user.id}`, renderObject);
    } catch (e) {
        console.log('Issue in Threads');
        console.log(e.message);
        res.status(StatusCodes.OK).send('Error');
    }
};

module.exports = threads;