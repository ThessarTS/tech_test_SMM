'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestedItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RequestedItem.belongsTo(models.Item)
      RequestedItem.belongsTo(models.Request)
    }
  }
  RequestedItem.init({
    RequestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'request id required' },
        notNull: { msg: 'request id required' }
      }
    },
    ItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'item id required' },
        notNull: { msg: 'item id required' }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'quantity required' },
        notNull: { msg: 'quantity required' }
      }
    },
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RequestedItem',
  });
  return RequestedItem;
};