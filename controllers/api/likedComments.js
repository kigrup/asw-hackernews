const db = require("../../db/db");
const { StatusCodes } = require('http-status-codes');

const commentsLogic = require('../../controllerLogic/liked.js').comments;

const controller = async (req, res) => {

    const obj = await commentsLogic(false, req);
    
    let finalObj = {
        comments: []
    };

    for (let i = 0; i < obj.comments.length; i++) {
        let p = obj.comments[i];
        let commentObj = {
            id: p.id,
            content: p.content,
            upvotes: p.upvotes,
            replies: p.comments,
            authorId: p.author,
            authorName: p.authorName,
            createdAt: p.createdAt,
            inReplyTo: p.inReplyTo,
            root : p.root
        };
        finalObj.comments.push(commentObj);
    }

    res.status(StatusCodes.OK).json(finalObj);
}

module.exports = controller;