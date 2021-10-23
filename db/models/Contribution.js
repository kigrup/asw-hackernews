const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../connect');

class Contribution extends Model {}

Contribution.init(
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
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        modelName: 'Contribution',
        initialAutoIncrement: 20000,
    }
);

module.exports = Contribution;
