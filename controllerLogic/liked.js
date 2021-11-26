const db = require("../db/db");
const ejs = require("ejs");
const moment = require("moment");

moment.updateLocale("es");

const posts = async(req) => {
    let fullUser = await db.users.findOne({
        where: {
            id: req.user.id,
        },
        include: [
            {
                association: 'liked',
                model: db.contributions,
                where: {
                    type: {
                        [db.Op.like]: 'post/%',
                    }
                },
                order: [
                    [db.contributions, 'createdAt', 'DESC']
                ],
            },
        ],
    });
    if (fullUser == undefined) {
        fullUser = await db.users.findOne({
            where: {
                id: req.user.id,
            },
        });
        fullUser.liked = [];
        fullUser.dataValues.liked = [];
    }
    fullUser.dataValues.liked.sort(function (a, b) {
        return b.dataValues.createdAt - a.dataValues.createdAt;
    });
    //console.log(`FULLUSER : ${require("util").inspect(fullUser, false, 4, false)}`);
    //console.log(`REQ.USER : ${require("util").inspect(req.user, false, 4, false)}`);
    if (fullUser.dataValues.liked != undefined) {
        for (let i = 0; i < fullUser.dataValues.liked.length; i++) {
            fullUser.dataValues.liked[i].isLiked = true;
            fullUser.dataValues.liked[i].dataValues.isLiked = true;
            fullUser.dataValues.liked[i].deep = 0;
            fullUser.dataValues.liked[i].dataValues.deep = 0;
        }
    }
    fullUser.displayName = req.user.displayName;
    fullUser.dataValues.displayName = req.user.displayName;
    let renderObject = {
        posts: fullUser.dataValues.liked,
        moment: moment,
        loggedIn: true,
        user: fullUser,
    };
    return renderObject;
}

const comments = async(req) => {
    let fullUser = await db.users.findOne({
        where: {
            id: req.user.id,
        },
        include: [
            {
                association: 'liked',
                model: db.contributions,
                where: {
                    type: 'comment'
                },
                order: [
                    [db.contributions, 'createdAt', 'DESC']
                ],
            },
        ],
    });
    if (fullUser == undefined) {
        fullUser = await db.users.findOne({
            where: {
                id: req.user.id,
            },
        });
        fullUser.liked = [];
        fullUser.dataValues.liked = [];
    }
    fullUser.dataValues.liked.sort(function (a, b) {
        return b.dataValues.createdAt - a.dataValues.createdAt;
    });
    //console.log(`FULLUSER : ${require("util").inspect(fullUser, false, 4, false)}`);
    //console.log(`REQ.USER : ${require("util").inspect(req.user, false, 4, false)}`);
    if (fullUser.dataValues.liked != undefined) {
        for (let i = 0; i < fullUser.dataValues.liked.length; i++) {
            fullUser.dataValues.liked[i].isLiked = true;
            fullUser.dataValues.liked[i].dataValues.isLiked = true;
            fullUser.dataValues.liked[i].deep = 0;
            fullUser.dataValues.liked[i].dataValues.deep = 0;
        }
    }
    fullUser.displayName = req.user.displayName;
    fullUser.dataValues.displayName = req.user.displayName;
    const post = { deep: 0 };
    let renderObject = {
        post: post,
        comments: fullUser.dataValues.liked,
        moment: moment,
        loggedIn: true,
        user: fullUser,
    };
    return renderObject;
}

module.exports = {posts,comments};