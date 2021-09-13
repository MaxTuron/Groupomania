'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
  }
  user.init({
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      unique: true
    },
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};