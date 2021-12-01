const db = require('../db/db');
const Constants = require('../utils/Constants');

//body,params,query des de los dos

const post = async (fromBrowser, req, res) => {
    let userId;
    if (req.user != undefined || req.header('X-API-KEY') != undefined) {
        if (fromBrowser) {
            userId = req.user.id;
        }
        else {
            userId = req.header('X-API-KEY');
        }
    }
    let { title, url, text } = req.body;
    if (url == undefined) {
        url = "";
    }
    if (title === undefined || !title) {
        if (fromBrowser)
        {
            res.redirect("/submit?invalidTitle=true");
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).json({error: 'invalid title'});
        }
        return;
    }
    var contentType, content;
    if (url === undefined || url == "") {
        contentType = "post/text";
        content = text;
    } else {
        contentType = "post/url";
        content = url;
    }
    const authorObject = await db.users.findOne({
        where: {
            id: userId,
        },
    });

    let postsCreated = await db.contributions.count({
        where: {
            type: "post/url",
            content: url,
        },
    });

    if (postsCreated > 0) {
        let postCreated = await db.contributions.findOne({
            where: {
                type: "post/url",
                content: url,
            },
        });
        if (fromBrowser) {
            console.log(`redirecting to ${`/item?id=${postCreated.id}`}`);
            res.redirect(`/item?id=${postCreated.id}`);
            return;
        }
        else {
            postCreated.status = 'retrieved';
            return postCreated;
        }
    }
    const post = await db.contributions.create({
        type: contentType,
        title: title,
        content: content,
        author: userId,
        authorName: authorObject.dataValues.username,
        deep: 0,
    });
    if (text !== undefined && text != "" && contentType == "post/url") {
        const comment = await db.contributions.create({
            type: "comment",
            content: text,
            author: userId,
            authorName: authorObject.dataValues.username,
            deep: 1,
            inReplyTo: post.id,
        });
        post.comments = 1;
        post.save();
        if (fromBrowser) {
            res.redirect(`/item?id=${post.id}`);
            return;
        }
    }
    if (fromBrowser) {
        res.redirect('/newest');
        return;
    }
    post.status = 'created';
    return post;
};

module.exports = { post };