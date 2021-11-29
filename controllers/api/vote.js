const db = require("../../db/db");
const { StatusCodes } = require('http-status-codes');

const voteLogic = require("../../controllerLogic/vote.js").vote;

const controller = async (req, res) => {
    try
    {
        voteLogic(false, req, res);
        
        const obj = await db.contributions.findOne({
            where: {
                id: req.params.itemId,
            },
            //include: [db.users]
        });
        let finalObj;
        if (obj.dataValues.type == "comment")
        {
            finalObj = {
                comment: {
                    id: obj.dataValues.id,
                    type: obj.dataValues.type,
                    content: obj.dataValues.content,
                    upvotes: obj.dataValues.upvotes,                
                    authorName: obj.dataValues.authorName,
                    createdAt: obj.dataValues.createdAt,               
                }
            }
        }
        else
        {
            finalObj = {
                post: {
                    id: obj.dataValues.id,
                    content: obj.dataValues.content,
                    upvotes: obj.dataValues.upvotes,                
                    authorName: obj.dataValues.authorName,
                    createdAt: obj.dataValues.createdAt,               
                }
            }
        }       
        res.status(StatusCodes.OK).json(finalObj);       
    }
    catch(e)
    {
        console.log('Error');
        console.log(e.message);
        res.status(StatusCodes.NOT_FOUND).json({error: 'Not found'});
    }
   
}

module.exports = controller;