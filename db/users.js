var pool = require('./connect');

const createUser = async (username, email) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query(
            `INSERT INTO Users(username, email) VALUES (?, ?)`,
            [username, email]
        );
        console.log(`Successfully created user: ${res}`);
    } catch (e) {
        throw new Error(e);
    } finally {
        if (conn) conn.end();
    }
};

module.exports = {
    createUser,
};
