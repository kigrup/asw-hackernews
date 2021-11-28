const db = require("../../db/db");
const { StatusCodes } = require('http-status-codes');
const postLogic = require('../../controllerLogic/submit.js').post;


const post = async (req, res) => {
    try {
        let dataObject = await postLogic(false,req,res);
        console.log(`published post with id ${post.id}`);

        let finalObject = {
            post: {
                id: dataObject.post.id,
                title: dataObject.post.title,
                content: dataObject.post.content,
                author: dataObject.post.author
            }
        };

        res.status(StatusCodes.CREATED).json(finalObject);
    }
    catch (e) {
        console.log('Error creating contribution');
        console.log(e.message);
        res.status(StatusCodes.BAD_REQUEST).json({error: 'Bad request'});
    }
}

module.exports = post;