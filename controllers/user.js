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
        let renderObject = {
            user: user,
            loggedIn: false,
        }
        if (req.user && req.user.id == id) {
            logged = 'Logged';
            renderObject.loggedIn = true;
        }
        res.render(`pages/user${logged}`, renderObject);

    } catch (e) {
        console.log('Error on /user');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

const modify = async (req, res) => {
    try {
        if(!req.isAuthenticated()){
            res.redirect('/login')
        }
        const { about } = req.body;
        
        const authorObject = await db.users.findOne({
            where: {
                id: req.user.id,
            }
        });

        if (about !== undefined ) {
            authorObject.about = about;
            authorObject.save();
        }
        const author = await db.users.findOne({
            where: {
                id: req.user.id,
            }
        });
        console.log("authorObject.about");
        console.log(author.about);
        
    } catch (e) {
        console.log('Error modfiying about');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = {user, modify};
