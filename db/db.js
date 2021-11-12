'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/data/database.sqlite',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./models/users')(sequelize, Sequelize);
db.contributions = require('./models/contributions')(sequelize, Sequelize);

db.users.hasMany(db.contributions, { foreignKey: 'author' });
db.contributions.belongsTo(db.users, { foreignKey: 'author' });
db.contributions.hasMany(db.contributions, { foreignKey: 'inReplyTo' });
db.contributions.belongsToMany(db.users, {
    through: 'UserLikes',
    as: 'likers',
    foreignKey: 'contribution_id',
});
db.users.belongsToMany(db.contributions, {
    through: 'UserLikes',
    as: 'liked',
    foreignKey: 'user_id',
});

db.Op = Sequelize.Op;

module.exports = db;
