const db = require("../../db/db");
const { StatusCodes } = require('http-status-codes');
const postLogic = require('../../controllerLogic/submit.js').post;


const post = async (req, res) => {
    try {
        let dataObject = await postLogic(false,req,res);

        let finalObject = {
            post: {
                id: dataObject.id,
                title: dataObject.title,
                content: dataObject.content,
                author: dataObject.author
            }
        };

        res.status(dataObject.status == 'created' ? StatusCodes.CREATED : StatusCodes.OK).json(finalObject);
    }
    catch (e) {
        console.log('Error creating contribution');
        console.log(e.message);
        res.status(StatusCodes.BAD_REQUEST).json({error: 'Bad request'});
    }
}

module.exports = post;