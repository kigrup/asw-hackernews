const db = require('./db');
const utils = require('../utils/utils');

const authenticateGloggedInUser = async (user) => {
    try {
        // See if user is already registered
        const registeredUser = await db.users.findOne({
            where: {
                id: user.id,
            },
        });
        if (registeredUser === undefined) {
            let email = user.emails[0].value;
            const newUser = await db.users.create({
                id: user.id,
                username: utils.emailToUsername(email),
                email: email,
            });
            console.log(`registerd user from first logged session`);
        }
    } catch (e) {
        console.log(`Issues in authenticateGloggedInUser:`);
        console.log(e.message);
    }
};

module.exports = authenticateGloggedInUser;
