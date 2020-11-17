'use strict';
const {
  Model, ValidationError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {foreignKey: "UserId"});
      Product.belongsTo(models.Category, {foreignKey: "CategoryId"});
      Product.hasMany(models.Cart, {foreignKey: "ProductId"})
      Product.hasMany(models.Wishlist, {foreignKey: "ProductId"})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Name is required!`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image URL is required!"
        },
        isUrl: {
          args: true,
          msg: "Wrong image URL format!"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Description is required!`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Price must be greater than or equal 0!'
        },
        isNumeric: {
          args: true,
          msg: 'Price is required and must be an Integer!'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Stock must be greater than or equal 0!'
        },
        isNumeric: {
          args: true,
          msg: 'Stock is required and must be an Integer!'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Category is required!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};