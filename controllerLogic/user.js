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
            return {
                error: "invalid user id",
            };
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
            return {
                error: "invalid user id",
            };
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
        if (req.header("X-API-KEY") == id) {
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
    } else {
        if (req.header("X-API-KEY") != undefined) {
            renderObject.loggedIn = true;
            const loggeduser = await db.users.findOne({
                where: {
                    id: req.header("X-API-KEY"),
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
    } else {
        if (about == undefined) {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: "No about provided",
            });
            return {
                error: "No about provided",
            };
        }
        if (req.header("X-API-KEY") == undefined) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                error: "You're not logged in",
            });
            return {
                error: "not logged",
            };
        } else if (req.header("X-API-KEY") != req.params.userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                error: "You can only modify your profile",
            });
            return {
                error: "you can only modify your profile",
            };
        } else {
            authorObject = await db.users.findOne({
                where: {
                    id: req.params.userId,
                },
            });
            if (authorObject == undefined) {
                res.status(StatusCodes.NOT_FOUND).json({
                    error: "User not found",
                });
                return {
                    error: "user not found",
                };
            }
        }
    }
    console.log(`about = ${about}`);
    if (about != undefined) {
        authorObject.about = about;
        authorObject.save();
        console.log(`saved authorObject with about = ${about}`);
    }
    return {};
};

module.exports = { user, modify };
