const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'mariadb',
    port: 3306,
    user: 'user',
    password: 'p4ssw0rd',
    database: 'hackernews',
    connectionLimit: 15,
    acquireTimeout: 300000,
});

module.exports = pool;
