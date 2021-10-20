const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/data/database.sqlite',
});

module.exports = sequelize;
