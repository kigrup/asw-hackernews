const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');

const user = async (req, res) => {
    try {
        const id = req.query.id;
        if (id == undefined || !id) {
            res.send('User id undefined in query');
        }
        const user = await db.users.findOne({
            where: {
                id: id,
            },
        });
        let logged = '';
        if (req.user && req.user.id == id) {
            logged = 'Logged';
        }
        res.render(`pages/user${logged}`, {
            user: user,
        });
    } catch (e) {
        console.log('Error on /user');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = user;
