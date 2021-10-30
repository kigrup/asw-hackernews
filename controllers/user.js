const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');

const user = async (req, res) => {
    try {
        const id = req.query.id;
        if (id === undefined || !id) {
            res.send('User id undefined in query');
        }
        const user = await db.users.findOne({
            where: {
                id: id,
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
