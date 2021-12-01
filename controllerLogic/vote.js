const db = require("../db/db");
const { StatusCodes } = require('http-status-codes');

const vote = async (fromBrowser, req, res) => {
    let id, how;
    if (fromBrowser) {
        id = await req.query.id;
        how = await req.query.how;
    }
    else {
        id = req.params.itemId;
        how = req.query.how;
    }
    if (id == undefined) {
        if (fromBrowser) res.send("Null id in query");
        else {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: "Invalid user ID",
            });
            return {
                error: 'invalid user id'
            }
        }
        return;
    }
    if (how == undefined) {
        if (fromBrowser) res.send('Null "how" parameter in query');
        else {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: "Invalid how parameter",
            });
            return {
                error: 'invalid how parameter'
            }
        }
        return;
    }
    // Find contribution that user wants to like
    const contribution = await db.contributions.findOne({
        where: {
            id: id,
        },
        //include: [db.users]
    });

    //console.log(`voting contribution ${require('util').inspect(contribution, false, 7, false)}`);

    if (contribution == undefined) {
        if (fromBrowser) res.send("Invalid id in query");
        else {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: "Invalid user ID",
            });
            return {
                error: 'invalid user id'
            }
        }
        return;
    }
    let userId;
    if (fromBrowser) {
        userId = req.user.id;
    }
    else {
        userId = req.header('X-API-KEY');
    }
    // Get user and all of its liked contributions
    const fullUser = await db.users.findOne({
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

    // TODO: si how = unvote, contribution.upvotes-- y borrar la entrada de UserLikes
    // sino
    // TODO: si how = vote, contribution.upvotes++ y añadir la entrada así:
    let likedContributions = [];
    if (fullUser != undefined) {
        let isLiked = false;
        for (let i = 0; i < fullUser.liked.length; i++) {
            if (fullUser.liked[i].id == contribution.id) {
                isLiked = true;
            } else {
                likedContributions.push(fullUser.liked[i]);
            }
        }
        const author = await db.users.findOne({
            where: {
                id: contribution.author,
            },
        });
        if (how == "up" && !isLiked) {
            await fullUser.addLiked(contribution);
            contribution.upvotes = contribution.upvotes + 1;
            author.karma = author.karma + 1;
        } else if (how == "un" && isLiked) {
            await fullUser.setLiked(likedContributions);
            contribution.upvotes = contribution.upvotes - 1;
            author.karma = author.karma - 1;
        } 
        else 
        {
            console.log(`invalid vote`);
            if (fromBrowser) 
            {
                if (req.session.prevUrl) {
                    res.redirect(req.session.prevUrl);
                    return;
                } else {
                    res.redirect("back");
                    return;
                }
            }
            else {
                if (how == "up" || how == "un") {
                    return {};
                }
                else {
                    res.status(StatusCodes.BAD_REQUEST).send();
                    return {
                        error: 'invalid how parameter'
                    }
                }
            }
        }
        await contribution.save();
        await fullUser.save();
        await author.save();
    }
    console.log(
        `voted successfully. votes count: ${likedContributions.length}`
    );
    if(fromBrowser)
    {
        if (req.session.prevUrl) {
            res.redirect(req.session.prevUrl);
            return;
        } else {
            res.redirect("back");
            return;
        }
    }
    return {

    };
};

module.exports = {vote};