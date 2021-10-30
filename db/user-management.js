const db = require('./db');
const utils = require('../utils/utils');

const authenticateGloggedInUser = async (user) => {
    try {
        console.log(
            `User authenticated successfully, checking if registered...`
        );
        // See if user is already registered
        const registeredUser = await db.users.findOne({
            where: {
                id: user.id,
            },
        });
        console.log(`user found: ${registeredUser}`);
        if (registeredUser === undefined) {
            console.log(`User is not registered, creating new User...`);
            let email = user.emails[0].value;
            const newUser = await db.users.create({
                id: user.id,
                username: utils.emailToUsername(email),
                email: email,
            });
            console.log(`New User created successfully.`);
        } else {
            console.log(`User was already registered.`);
        }
    } catch (e) {
        console.log(`Issues in authenticateGloggedInUser:`);
        console.log(e.message);
    }
};

module.exports = { authenticateGloggedInUser };
