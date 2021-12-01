const db = require("../../db/db");
const { StatusCodes } = require('http-status-codes');

const newestLogic = require('../../controllerLogic/index.js').newest;

const controller = async (req, res) => {

    const obj = await newestLogic(false, req);

    let finalObj = {
        posts: []
    };

    for (let i = 0; i < obj.posts.length; i++) {
        let p = obj.posts[i];
        let postObj = {
            id: p.id,
            title: p.title,
            type: p.type,
            content: p.content,
            upvotes: p.upvotes,
            comments: p.comments,
            authorId: p.author,
            authorName: p.authorName,
            createdAt: p.createdAt
        };
        finalObj.posts.push(postObj);
    }

    res.status(StatusCodes.OK).json(finalObj);
}

module.exports = controller;