const db = require("../../db/db");
const { StatusCodes } = require('http-status-codes');
const threadsLogic = require('../../controllerLogic/threads.js').threads;

const threads = async (req, res) => {
    try {
        var localauthor;
        if (req.params.userId != undefined) {
            localauthor = req.params.userId;
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({error:"Specify a user"});
            return;
        }
        let obj = await threadsLogic(false,localauthor,req);
        let finalObj = {
            comments: []
        };
        const populateComments = (originArray, endObject) => {
            for (let i = 0; i < originArray.length; i++) {
                let comment = {
                    id: originArray[i].id,
                    content: originArray[i].content,
                    upvotes: originArray[i].upvotes,
                    authorId: originArray[i].author,
                    authorName: originArray[i].authorName,
                    createdAt: originArray[i].createdAt,
                };
                endObject.push(comment);
                if (originArray[i].contributions != undefined) {
                    endObject[i].replies = [];
                    populateComments(originArray[i].contributions, endObject[i].replies);
                }
            }
        }
        populateComments(obj.comments, finalObj.comments);
        res.status(StatusCodes.OK).json(finalObj);
    }
    catch (e) {
        console.log('Error in Threads');
        console.log(e.message);
        res.status(StatusCodes.BAD_REQUEST).json({error: ' Bad request '});
    }
}

module.exports = threads;