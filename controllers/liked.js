const { StatusCodes } = require("http-status-codes");
const db = require("../db/db");
const ejs = require("ejs");
const moment = require("moment");

const postsLogic = require('../controllerLogic/liked').posts;
const commentsLogic = require('../controllerLogic/liked').comments;

moment.updateLocale("es");

const posts = async (req, res) => {
    try {
        let renderObject = await postsLogic(true, req);
        res.render('pages/index', renderObject);
    } catch (e) {
        console.log("Issue in liked/posts");
        console.log(e.message);
        res.status(StatusCodes.OK).send("Error");
    }
};

const comments = async (req, res) => {
    try {
        let renderObject = await commentsLogic(true, req);
        res.render('pages/likedcomments', renderObject);
        //console.log(`USER WITH INCLUDE: ${require("util").inspect(fullUser, false, 4, false)}`);
    } catch (e) {
        console.log("Issue in liked/comments");
        console.log(e.message);
        res.status(StatusCodes.OK).send("Error");
    }

};

module.exports = { posts, comments };
