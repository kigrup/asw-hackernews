const { StatusCodes } = require('http-status-codes');
const db = require('../db/db');
const ejs = require('ejs');
const moment = require('moment');

const threadsLogic = require('../controllerLogic/threads').threads;

moment.updateLocale('es');

const threads = async (req, res) => {
    try {
        var localauthor;
        if (req.query.by !== undefined) {
            localauthor = await req.query.by;
        } else if (req.isAuthenticated()) {
            localauthor = req.user.id;
        } else {
            res.redirect('/login');
            return;
        }
        let renderObject = await threadsLogic(localauthor, req);
        res.render('pages/threads', renderObject);
    } catch (e) {
        console.log('Issue in Threads');
        console.log(e.message);
        res.status(StatusCodes.OK).send('Error');
    }
};

module.exports = threads;


