'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Request.hasMany(models.RequestedItem)
      Request.belongsTo(models.User)
    }
  }
  Request.init({
    status: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'user id required' },
        notNull: { msg: 'user id required' }
      }
    }
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};