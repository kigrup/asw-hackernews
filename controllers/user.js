const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');

const user = async (req, res) => {
    try {
        const name = req.query.name;
        if (name === undefined || !name) {
            res.send('User undefined in query');
        }
        const user = await db.users.findOne({
            where: {
                username: name,
            },
        });
        res.send(`username: ${user.username} email: ${user.email}`);
    } catch (e) {
        console.log('Error on /user');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = user;
