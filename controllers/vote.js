const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');

const vote = async (req, res) => {
    try {
        const id = req.query.id;
        if (id == undefined) {
            res.send('Null id in query');
        }
        // Find contribution that user wants to like
        const contribution = await db.contributions.findOne({
            where: {
                id: id,
            }
        });

        if (contribution == undefined)
            res.send('Invalid id in query');

        // Get user and all of its liked contributions
        const fullUser = await db.users.findOne({
            where: {
                id: req.user.id,
            },
            include: [
                {
                    association: 'liked',
                    model: db.contributions,
                }
            ],
        });

        post.upvotes = upvotes+1;
        await post.save();
  
        console.log(`voted`);
        res.status(StatusCodes.OK).redirect('/newest');

    } catch (e) {
        console.log('Error voting on /vote');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const unvote = async (req, res) => {
    try {
        const id = req.query.id;
        if (id === undefined || !id || id < 1) {
            res.send('Invalid id in query');
        }
        const put = await db.contributions.findOne({
            where: {
                id: id,
            },
            include: [db.contributions],
        });

        if (req.isAuthenticated()) {
            renderObject.loggedIn = true;
            renderObject.user = req.user;
        }
  
        put.upvotes = upvotes+1;
        await put.save();
        
        console.log(`voted`);
        res.status(StatusCodes.OK).redirect('/newest');

    } catch (e) {
        console.log('Error unvoting at /vote');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = { vote, unvote };