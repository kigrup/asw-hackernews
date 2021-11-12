const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');

const vote = async (req, res) => {
    try {
        const { id, how } = await req.query;
        if (id == undefined) {
            res.send('Null id in query');
            return;
        }
        if (how == undefined) {
            res.send('Null "how" parameter in query');
            return;
        }
        // Find contribution that user wants to like
        const contribution = await db.contributions.findOne({
            where: {
                id: id,
            },
        });

        if (contribution == undefined) {
            res.send('Invalid id in query');
            return;
        }

        // Get user and all of its liked contributions
        const fullUser = await db.users.findOne({
            where: {
                id: req.user.id,
            },
            include: [
                {
                    association: 'liked',
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
            for (let i = 0; i < fullUser.liked.length; i++){
                if (fullUser.liked[i].id == contribution.id) {
                    isLiked = true;
                }
                else {
                    likedContributions.push(fullUser.liked[i]);
                }
            }
            // && tiene un post con contribution.id
            if (how == 'up' && !isLiked) {
                await fullUser.addLiked(contribution);
                contribution.upvotes = contribution.upvotes + 1;
            } else if (how == 'un' && isLiked) {
                await fullUser.setLiked(likedContributions);
                contribution.upvotes = contribution.upvotes - 1;
            }
            else {
                console.log(`invalid vote`);
                res.redirect('back');
                return;
            }
            await contribution.save();
        }

        console.log(`voted successfully. votes count: ${likedContributions.length}`);
        res.redirect('back');
    } catch (e) {
        console.log('Error voting on /vote');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = { vote };
