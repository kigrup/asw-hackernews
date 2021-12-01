const db = require("../../db/db");
const { StatusCodes } = require("http-status-codes");

const itemLogic = require("../../controllerLogic/item.js").item;

const controller = async (req, res) => {
    const obj = await itemLogic(false, req, res);
    if (obj.error != undefined) {
        res.status(obj.error == 'Id invalid' ? StatusCodes.BAD_REQUEST : StatusCodes.NOT_FOUND).json(obj.error);
        return;
    }
    let finalObj = {
        item: {
            id: obj.post.id,
            title: obj.post.title,
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
    populateComments(obj.comments, finalObj.item.replies);

    res.status(StatusCodes.OK).json(finalObj);
};

module.exports = controller;
