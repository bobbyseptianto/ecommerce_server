const { Cart, Product, Category } = require("../models/index");

class CartController {

  static async addToCart(req, res, next) {
    try {
      const { ProductId } = req.body;
      const UserId = +req.userLoggedIn.id;
      let cartObj = {
        ProductId,
        UserId
      };
      const existCart = await Cart.findOne({where:{ProductId: cartObj.ProductId, UserId: cartObj.UserId}})
      if (existCart) {
        const cart = await Cart.increment("quantity", {where: {id: existCart.id}, returning: true})
        res.status(200).json(cart[0][0][0]);
      } else {
        const cart = await Cart.create(cartObj);
        res.status(201).json(cart);
      }
    } catch (err) {
      next(err);
    }
  }

  static async readCart(req, res, next) {
    try {
      const UserId = +req.userLoggedIn.id;
      const cart = await Cart.findAll({ where: { UserId } ,order: [["id", "ASC"]], include: {model: Product, include: {model: Category}} });
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  }

  static async readCartById(req, res, next) {
    try {
      let id = +req.params.id;
      const cart = await Cart.findByPk(id, { order: [["id", "ASC"]], include: {model: Product, include: {model: Category}} });
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  }

  static async updateCart(req, res, next) {
    try {
      let id = +req.params.id;
      const { quantity } = req.body;
      let cartObj = {
        quantity
      };
      const cart = await Cart.update(cartObj, { where: {id}, returning: true });
      res.status(200).json(cart[1][0]);
    } catch (err) {
      next(err);
    }
  }

  static async deleteCart(req, res, next) {
    try {
      let id = +req.params.id;
      const cart = await Cart.destroy({ where: {id} });
      res.status(200).json({
        msg: `Successfully remove a product on your cart!`
      });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = CartController;