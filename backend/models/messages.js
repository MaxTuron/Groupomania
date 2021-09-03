'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class messages extends Model {
    }
    messages.init({
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        urlImage: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'messages',
    });
    return messages;
};