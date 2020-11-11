const { Product, Category } = require("../models/index");

class ProductController {

  static async createProduct(req, res, next) {
    try {
      const { name, image_url, description, price, stock, CategoryId } = req.body;
      const UserId = +req.userLoggedIn.id;
      let productObj = {
        name,
        image_url,
        description,
        price,
        stock,
        CategoryId,
        UserId
      };
      const product = await Product.create(productObj);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async readProducts(req, res, next) {
    try {
      const products = await Product.findAll({ order: [["id", "ASC"]], include: Category });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async readProductById(req, res, next) {
    try {
      let id = +req.params.id;
      const product = await Product.findByPk(id, { order: [["id", "ASC"]], include: Category });
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      let id = +req.params.id;
      const { name, image_url, description, price, stock, CategoryId } = req.body;
      let productObj = {
        name,
        image_url,
        description,
        price,
        stock,
        CategoryId
      };
      const product = await Product.update(productObj, { where: {id}, returning: true });
      res.status(200).json(product[1][0]);
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      let id = +req.params.id;
      const product = await Product.destroy({ where: {id} });
      res.status(200).json({
        msg: `Successfully delete a product!`
      });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = ProductController;