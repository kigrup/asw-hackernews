const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');
const ejs = require('ejs');
const moment = require('moment');

moment.updateLocale('es');


const threads = async (req, res) => {
    try {        
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

        const populateComments = async (commentsObject) => {
            for (
                let i = 0;
                i < commentsObject.length;
                i++
            ) 
            {
            if(comments.includes(commentsObject[i]))    //Eliminar comments repetidos
            {
                var index = comments.findIndex(comment => comment.dataValues.id == commentsObject[i].dataValues.id);
                comments.splice(index,1);
            }
                {
                    child = await db.contributions.findOne({
                    where: {
                        id: commentsObject[i].dataValues.id,
                    },
                    include: [db.contributions],
                });
                commentsObject[i] = child;
                //console.log('CHILD:');
                //console.log(require('util').inspect(child, false, 6, false));
                if (child.dataValues.contributions !== undefined) 
                    {
                    console.log('------POPULATING COMMENT---------');
                    console.log(child.dataValues.content);
                    await populateComments(
                        commentsObject[i].dataValues.contributions
                    );
                    }                
                }
            }
        };
        populateComments(comments);
        
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
        res.render('pages/threads', renderObject);
    } catch (e) {
        console.log('Issue in Threads');
        console.log(e.message);
        res.status(StatusCodes.OK).send('Error');
    }
};

module.exports = threads;