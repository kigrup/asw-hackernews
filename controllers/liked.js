const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');
const ejs = require('ejs');
const moment = require('moment');

moment.updateLocale('es');

const posts = async (req, res) => {
    try {
        const user = await db.users.findOne({
            where: {
                id: req.user.id
            }
        });

        const post = await db.contributions.findOne({
            where: {
                id: 1
            }
        });

        user.addContributions(post);

        

        console.log(`USER: ${require('util').inspect(user, true, 4, false)}`);
        // Listar todos los posts del usuario 
    } catch (e) {
        console.log('Issue in liked/posts');
        console.log(e.message);
        res.status(StatusCodes.OK).send('Error');
    }
};

const comments = async (req, res) => {
    try {
        
    } catch (e) {
        console.log('Issue in liked/comments');
        console.log(e.message);
        res.status(StatusCodes.OK).send('Error');
    }
};

module.exports = { posts, comments };
