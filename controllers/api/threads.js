const db = require("../../db/db");
const { StatusCodes } = require('http-status-codes');
const threadsLogic = require('../../controllerLogic/threads.js').threads;

const threads = async (req, res) => {
    try {
        let dataObject = await threadsLogic(false,req,res);
        let finalObj = {
            threads: {
                id: dataObject.comments.id,
                title: dataObject.comments.title,
                content: dataObject.comments.content,
                author: dataObject.comments.author
            }
        };
        res.status(StatusCodes.OK).json(finalObj);
    }
    catch (e) {
        console.log('Error in Threads');
        console.log(e.message);
        res.status(StatusCodes.BAD_REQUEST).json({error: ' Bad request '});
    }
}

module.exports = threads;