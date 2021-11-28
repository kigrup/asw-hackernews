const db = require("../../db/db");
const { StatusCodes } = require('http-status-codes');
const postLogic = require('../../controllerLogic/submit.js').post;


const post = async (req, res) => {
    try {
        let dataObject = await postLogic(false,req,res);
        console.log(`published post with id ${post.id}`);

        let finalObject = {

        };

        res.status(StatusCodes.CREATED).json(dataObject);
    }
    catch (e) {
        console.log('Error creating contribution');
        console.log(e.message);
        res.status(StatusCodes.BAD_REQUEST).json({error: 'Bad request'});
    }
}

module.exports = post;