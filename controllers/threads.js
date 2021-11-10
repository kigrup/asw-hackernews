const { StatusCodes } = require("http-status-codes");
const db = require("../db/db");
const ejs = require("ejs");
const moment = require("moment");

moment.updateLocale("es");

const threads = async (req, res) => {
  try {
      var seen = [];
    const comments = await db.contributions.findAll({
      attributes: [
        "id",
        "title",
        "type",
        "content",
        "upvotes",
        "comments",
        "author",
        "authorName",
        "createdAt",
      ],
      where: {
        type: "comment",
        author: req.user.id,
      },
      include: [db.users],
      order: [["createdAt", "DESC"]],
    });
        const populateComments = async (commentsObject, depth) => {
            for (
                let i = 0;
                i < commentsObject.length;
                i++
            ) 
            {            
            if(comments.includes(commentsObject[i]) && depth > 0)    //Eliminar comments repetidos
            {
                var index = comments.findIndex(comment => comment.dataValues.id == commentsObject[i].dataValues.id);
                seen[index] = true;
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
                        commentsObject[i].dataValues.contributions, depth++
                    );
                    }                
                }
            }          
        };
        for (let i = 0; i < comments.length; i++)
        {
            seen.push(false);
        }
        await populateComments(comments, 0);
        let interator = 0;
        while (iterator < comments.length){
            if (seen[iterator] == true) {
                comments.splice(iterator, 1);
                seen.splice(iterator, 1);
            }
            else {
                iterator++;
            }
        }
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
