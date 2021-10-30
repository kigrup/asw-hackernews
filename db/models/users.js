'use strict';

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        about: {
            type: DataTypes.STRING,
        },
    });
    return Users;
};
