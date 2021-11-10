const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');
const Constants = require('../utils/Constants');

const submit = async (req, res) => {
    try {
        res.render('pages/submit', {
            invalidTitle: req.query.invalidTitle,
        });
    } catch (e) {
        console.log('Error on /submit');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const post = async (req, res) => {
    let userId = req.user.id;
    try {
        const { title, url, text } = req.body;
        if (title === undefined || !title) {
            res.redirect('/submit?invalidTitle=true');
            return;
        }
        var contentType, content;
        if (url === undefined || url == '') {
            contentType = 'post/text';
            content = text;
        } else {
            contentType = 'post/url';
            content = url;
        }
        const authorObject = await db.users.findOne({
            where: {
                id: userId,
            }
        });

        const post = await db.contributions.create({
            type: contentType,
            title: title,
            content: content,
            author: userId,
            authorName: authorObject.dataValues.username,
            deep: 0,
        });
        console.log(`published post with id ${post.id}`);
        res.status(StatusCodes.OK).redirect('/');
    } catch (e) {
        console.log('Error creating contribution');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = { submit, post };
