const db = require("../db/db");
const { StatusCodes } = require("http-status-codes");

const item = async (fromBrowser, req, res) => {
    let id;
    if (fromBrowser) id = req.query.id;
    else id = req.params.itemId;
    if (id === undefined || !id || id < 1) {
        if (fromBrowser) {
            res.send("Invalid id in query");
            return;
        } else {
            return {
                error: 'Id invalid'
            }
        }
    }
    // Get first comment
    const post = await db.contributions.findOne({
        where: {
            id: id,
        },
        include: [db.contributions],
    });

    // Get first level of childs

    //console.log(require('util').inspect(post, false, 3, false));
    if (post == undefined) {
        if (fromBrowser) {
            res.send("Item not found");
            return;
        }
        else {
            return {
                error: 'Item not found'
            }
        }
    }

    let comments = await db.contributions.findAll({
        where: {
            inReplyTo: id,
        },
        include: [db.contributions],
    });
    // Recursively get all childs' comments
    const populateComments = async (commentsObject) => {
        for (let i = 0; i < commentsObject.length; i++) {
            child = await db.contributions.findOne({
                where: {
                    id: commentsObject[i].dataValues.id,
                },
                include: [db.contributions],
            });
            commentsObject[i] = child;
            if (child.dataValues.contributions !== undefined) {
                await populateComments(
                    commentsObject[i].dataValues.contributions
                );
            }
        }
    };
    await populateComments(comments);

    let loggedUser;
    let userId;
    if (req.user || req.header("X-API-KEY") != undefined) {
        if (fromBrowser) userId = req.user.id;
        else userId = req.header("X-API-KEY");
        loggedUser = await db.users.findOne({
            where: {
                id: userId,
            },
            include: [
                {
                    association: "liked",
                    model: db.contributions,
                },
            ],
        });
        const setIsLiked = async (user, commentsObject) => {
            for (let i = 0; i < commentsObject.length; i++) {
                for (let l = 0; l < user.liked.length; l++) {
                    if (
                        commentsObject[i].dataValues.id ==
                        user.liked[l].dataValues.id
                    ) {
                        commentsObject[i].dataValues.isLiked = true;
                        commentsObject[i].isLiked = true;
                    } else if (
                        user.liked[l].dataValues.id == post.dataValues.id ||
                        user.liked[l].dataValues.id == post.id
                    ) {
                        console.log(`found root post as liked`);
                        post.dataValues.isLiked = true;
                        post.isLiked = true;
                    }
                }
                await setIsLiked(
                    user,
                    commentsObject[i].dataValues.contributions
                );
            }
        };
        await setIsLiked(loggedUser, comments);
        for (let l = 0; l < loggedUser.liked.length; l++) {
            if (post.id == loggedUser.liked[l].id) {
                post.isLiked = true;
                post.dataValues.isLiked = true;
                console.log("found post in liked");
            }
        }
    }
    let rootPost = post;
    while (rootPost.inReplyTo != undefined) {
        rootPost = await db.contributions.findOne({
            where: {
                id: rootPost.inReplyTo,
            },
        });
    }
    //console.log(`rootpost: ${require('util').inspect(rootPost, false, 3, false)}`);
    //console.log(`post: ${require('util').inspect(post, false, 3, false)}`);
    let dataObject = {
        post: post,
        comments: comments,
        moment: require("moment"),
        loggedIn: false,
        user: {},
        rootPost: rootPost,
    };
    if (req.user || req.header("X-API-KEY") != undefined) {
        dataObject.loggedIn = true;
        dataObject.user = loggedUser;
    }
    return dataObject;
};

const comment = async (fromBrowser, req, res) => {
    if (req.user == undefined && req.header("X-API-KEY") == undefined) {
        if (fromBrowser) {
            res.redirect("/login");
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                error: "Not logged in",
            });
        }
        return;
    }
    let id, content;
    if (fromBrowser){
        id = req.body.id;
    } else {
        id = req.params.itemId;
    }
    console.log(require('util').inspect(req.body, false, 5, false));
    content = req.body.content;
    console.log(`starting comment id: ${id} content: ${content}`);
    if (id == undefined) {
        if (fromBrowser) {
            res.send("Id undefined in body");
            return;
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: "Id invalid",
            });
            return {
                error: "Id undefined"
            };
        }
    } else if (content == undefined) {
        if (fromBrowser) {
            res.send("Message undefined in body");
            return;
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: "Message not defined in body",
            });
            return {
                error: "Message undefined"
            };
        }
        
    }
    const contribution = await db.contributions.findOne({
        where: {
            id: id,
        },
    });
    let userId;
    if (fromBrowser) {
        userId = req.user.id;
    } else {
        userId = req.header("X-API-KEY");
    }
    //console.log(`commenting onto: ${require('util').inspect(contribution, false, 3, false)}`);
    //console.log(`with user: ${require('util').inspect(req.user, false, 5, false)}`);
    const authorObject = await db.users.findOne({
        where: {
            id: userId,
        },
    });

    let root;
    if (contribution.type == "comment") {
        root = contribution.root;
    } else {
        root = contribution.id;
    }
    parentContribution = contribution;
    parentContribution.comments = parentContribution.comments + 1;
    parentContribution.save();
    while (parentContribution.inReplyTo != undefined) {
        parentContribution = await db.contributions.findOne({
            where: {
                id: parentContribution.inReplyTo,
            },
        });
        parentContribution.comments = parentContribution.comments + 1;
        parentContribution.save();
    }
    const reply = await db.contributions.create({
        type: "comment",
        content: content,
        inReplyTo: id,
        author: userId,
        authorName: authorObject.dataValues.username,
        deep: contribution.deep + 1,
        root: root,
    });
    reply.idd = id;
    return reply;
};

module.exports = { item, comment };
