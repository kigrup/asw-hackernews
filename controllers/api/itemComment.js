const db = require("../../db/db");
const { StatusCodes } = require('http-status-codes');

const commentLogic = require("../../controllerLogic/item.js").comment;

const controller = async (req, res) => {
    try
    {
        let dataObject = await commentLogic (false,req,res);
        let finalObject = {
            comment: {
                id: dataObject.dataValues.id,
                type: dataObject.dataValues.type,
                content: dataObject.dataValues.content,
                author: dataObject.dataValues.authorName,
                upvotes: dataObject.dataValues.upvotes,
                createdAt: dataObject.dataValues.createdAt
            }
        };
        res.status(StatusCodes.CREATED).json(finalObject);
    }
    catch (e) {
        console.log('Error creating comment');
        console.log(e.message);
        res.status(StatusCodes.BAD_REQUEST).json({error: 'Bad request'});
    }  
}

module.exports = controller;