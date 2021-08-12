'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {

    static associate(models) {
      models.message.belongsTo(models.user, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  message.init({
    idUSERS: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};