'use strict';
const {
  Model, ValidationError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {foreignKey: "UserId"})
      Cart.belongsTo(models.Product, {foreignKey: "ProductId"})
    }
  };
  Cart.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: [0],
          msg: 'Quantity must be greater than or equal 0!'
        },
        isNumeric: {
          args: true,
          msg: 'Quantity is required and must be an Integer!'
        }
      }
    },
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.quantity = 1
      }
    },
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};