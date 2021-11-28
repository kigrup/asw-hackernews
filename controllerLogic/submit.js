const db = require('../db/db');
const Constants = require('../utils/Constants');

//body,params,query des de los dos

const post = async (fromBrowser, req, res) => {
    let userId;
    if (req.user || req.header('X-API-KEY') != undefined) {
        if (fromBrowser) userId = req.user.id;
        else userId = req.header('X-API-KEY')
    }
    const { title, url, text } = req.body;
    if (title === undefined || !title) {
        if (fromBrowser)
        {
            res.redirect("/submit?invalidTitle=true");
        }
        else res.send(res.json({error: "Invalid submit"}))
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
            res.redirect(`/item?id=${postCreated.id}`);
        }
        return;
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
        return;
    }
};

module.exports = post;