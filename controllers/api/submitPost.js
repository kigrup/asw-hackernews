const db = require("../../db/db");
const { StatusCodes } = require('http-status-codes');
const postLogic = require('../controllerLogic/submit').post;


const post = async (req, res) => {
    try {
        await postLogic(true,req,res); //navegador
        res.redirect(`/item?id=${post.id}`);
        console.log(`published post with id ${post.id}`);
        res.redirect('/newest');
    }
    catch (e) {
        console.log('Error creating contribution');
        console.log(e.message);
        res.status(StatusCodes.BAD_REQUEST).json({error: ' Bad request '});
    }
}

module.exports = post;