'use strict';

module.exports = (sequelize, DataTypes) => {
    const Contributions = sequelize.define(
        'contribution',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
            },
            content: {
                type: DataTypes.STRING,
            },
            upvotes: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            comments: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            author: {
                type: DataTypes.STRING,
            },
            authorName: {
                type: DataTypes.STRING,
            },
            inReplyTo: {
                type: DataTypes.INTEGER,
            },
            deep: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            root: {
                type: DataTypes.INTEGER,
                defaultValue: -1
            }
        },
        {
            initialAutoIncrement: 20000,
        }
    );
    return Contributions;
};
