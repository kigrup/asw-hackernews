const db = require("../../db/db");
const { StatusCodes } = require("http-status-codes");

const itemLogic = require("../../controllerLogic/item.js").item;

const controller = async (req, res) => {
    const obj = await itemLogic(false, req, res);

    let finalObj = {
        item: {
            id: obj.post.id,
            type: obj.post.type,
            content: obj.post.content,
            upvotes: obj.post.upvotes,
            authorId: obj.post.author,
            authorName: obj.post.authorName,
            createdAt: obj.post.createdAt,
            repliesCount: obj.post.comments,
            replies: []
        }
    }
    if (obj.post.type != 'comment') {
        finalObj.item.type = obj.post.type;
    }
    else {
        finalObj.item.inReplyTo = obj.post.inReplyTo;
        finalObj.item.root = obj.post.root;
    }
    /*
    const populateComments = (array) => {
        for (let i = 0; i < )
    }
    populateComments(finalObj);
    */

    res.status(StatusCodes.OK).json(finalObj);
};

module.exports = controller;
