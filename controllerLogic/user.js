const db = require("../db/db");
const moment = require("moment");
const { StatusCodes } = require("http-status-codes");

const user = async (fromBrowser, req, res) => {
    let id;
    if (fromBrowser) {
        id = req.query.id;
    } else {
        id = req.params.userId;
    }
    if (id == undefined || !id) {
        if (fromBrowser) {
            res.send("User id undefined in query");
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: "Invalid user ID",
            });
        }
    }
    const user = await db.users.findOne({
        where: {
            id: id,
        },
    });
    if (user == undefined) {
        if (fromBrowser) {
            res.send("Invalid user id");
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: "Invalid user ID",
            });
        }
    }
    let logged = "";
    let renderObject = {
        user: {},
        loggedIn: false,
        moment: moment,
        userProfile: user,
    };
    if (fromBrowser) {
        if (req.user && req.user.id == id) {
            logged = "Logged";
        }
    } else {
        if (req.header("X-API-HEADER") == id) {
            logged = "Logged";
        }
    }
    if (fromBrowser) {
        if (req.isAuthenticated()) {
            renderObject.loggedIn = true;
            const loggeduser = await db.users.findOne({
                where: {
                    id: req.user.id,
                },
            });
            renderObject.user = loggeduser;
        }
    }
    else {
        if (req.header("X-API-HEADER") != undefined) {
            renderObject.loggedIn = true;
            const loggeduser = await db.users.findOne({
                where: {
                    id: req.header("X-API-HEADER"),
                },
            });
            renderObject.user = loggeduser;
        }
    }
    return { logged, renderObject };
};

const modify = async (fromBrowser, req, res) => {
    const { about } = req.body;
    let authorObject;
    if (fromBrowser) {
        if (!req.isAuthenticated()) {
            res.redirect("/login");
            return;
        } else {
            authorObject = await db.users.findOne({
                where: {
                    id: req.user.id,
                },
            });
        }
    }
    else {
        if (req.header("X-API-HEADER") == undefined) {
            res.status(StatusCodes.UNAUTHORIZED).json({ error: "You're not logged in"});
            return;
        } 
        else if (req.header("X-API-HEADER") != req.params.userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({ error: "You can only modify your profile"});
            return;
        } else {
            authorObject = await db.users.findOne({
                where: {
                    id: req.params.userId,
                },
            });
        }
    }
    if (about !== undefined) {
        authorObject.about = about;
        authorObject.save();
    }
};

module.exports = { user, modify };
