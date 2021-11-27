const db = require("../db/db");
const moment = require("moment");

const user = async (id, req) => {
    const id = req.query.id;
    if (id == undefined || !id) {
        res.send("User id undefined in query");
    }
    const user = await db.users.findOne({
        where: {
            id: id,
        },
    });
    let logged = "";
    let renderObject = {
        user: {},
        loggedIn: false,
        moment: moment,
        userProfile: user,
    };
    if (req.user && req.user.id == id) {
        logged = "Logged";
    }
    if (req.isAuthenticated()) {
        renderObject.loggedIn = true;
        const loggeduser = await db.users.findOne({
            where: {
                id: req.user.id,
            },
        });
        renderObject.user = loggeduser;
    }
    return { logged, renderObject };
};

const modify = async (req, authorObject) => {
    const { about } = req.body;

    if (about !== undefined) {
        authorObject.about = about;
        authorObject.save();
    }
};

module.exports = { user, modify };
