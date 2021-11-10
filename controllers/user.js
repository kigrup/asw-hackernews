const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');
const moment = require('moment');

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
        let renderObject = {
            moment: moment,
            loggedIn: false,
            baseUrl: require('../utils/Constants').BASE_URL,
            user:{}
        };
        const authorObject;
        if(!req.isAuthenticated()){
            res.redirect('/login');
            return;
        }
        else{
            renderObject.loggedIn = true;
            authorObject= await db.users.findOne({
                where: {
                    id: req.user.id,
                }
            });
            renderObject.user = authorObject;
        }

        const { about } = req.body;
        
        if (about !== undefined ) {
            authorObject.about = about;
            authorObject.save();
        }

        res.redirect(`/user?id=${id}`);

        
    } catch (e) {
        console.log('Error modfiying about');
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

module.exports = {user, modify};
