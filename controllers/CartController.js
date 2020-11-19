const { Cart, Product, Category } = require("../models/index");
const money = require("../helpers/money");

class CartController {

  static async addToCart(req, res, next) {
    try {
      const { ProductId } = req.body;
      const UserId = +req.userLoggedIn.id;
      let cartObj = {
        ProductId,
        UserId
      };
      const existCart = await Cart.findOne({where:{ProductId: cartObj.ProductId, UserId: cartObj.UserId, checkout: 'false'}, include: {model: Product, include: {model: Category}}})
      if (existCart) {
        if (existCart.quantity >= existCart.Product.stock) {
          throw { msg: `Running out of stock product!`, status: 400 };
        } else {
          const cart = await Cart.increment("quantity", {where: {id: existCart.id, checkout: 'false'}, returning: true})
          res.status(200).json(cart[0][0][0]);
        }
      } else {
        const product = await Product.findOne({where:{id: cartObj.ProductId}})
        if (product.stock <= 0) {
          throw { msg: `Running out of stock product!`, status: 400 };
        } else {
          const cart = await Cart.create(cartObj);
          res.status(201).json(cart);
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static async readCart(req, res, next) {
    try {
      const UserId = +req.userLoggedIn.id;
      const cart = await Cart.findAll({ where: { UserId, checkout: 'false' } ,order: [["id", "ASC"]], include: {model: Product, include: {model: Category}} });
      let total = 0;
      cart.forEach(product => {
        total += product.quantity * product.Product.price;
      });
      let totalFormatted = money(total);
      res.status(200).json({cart, total: totalFormatted});
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
      const checkStock = await Cart.findByPk(id, { order: [["id", "ASC"]], include: {model: Product, include: {model: Category}} });
      if (quantity > checkStock.Product.stock) {
        throw { msg: `Running out of stock product!`, status: 400 };
      } else {
        let cartObj = {
          quantity
        };
        const cart = await Cart.update(cartObj, { where: {id}, returning: true });
        res.status(200).json(cart[1][0]);
      }
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

  static async checkout(req, res, next) {
    try {
      let id = +req.params.id;
      const {quantity, ProductId} = req.body;
      const cart = await Cart.update({checkout: "true"}, {where: {id}})
      if (cart) {
        const product = await Product.findOne({where: {id: ProductId}});
        if (product) {
          let updateStockProduct = product.stock - quantity;
          const productCheckout = await Product.update({stock: updateStockProduct}, {where: {id: ProductId}});
          res.status(200).json({
            msg: `Successfully checkout products on your cart!`
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static async decrementQuantity(req, res, next) {
    try {
      let id = +req.params.id;
      const { quantity } = req.body;
      if (quantity <= 1) {
        throw { msg: `Minimum quantity is 1!`, status: 400 };
      } else {
        const cart = await Cart.decrement("quantity", {where: {id, checkout: 'false'}, returning: true})
        res.status(200).json(cart[0][0][0]);
      }
    } catch (err) {
      next(err);
    }
  }

  static async incrementQuantity(req, res, next) {
    try {
      let id = +req.params.id;
      const { quantity, ProductId } = req.body;
      const product = await Product.findOne({where:{id: ProductId}})
      if (quantity >= product.stock) {
        throw { msg: `Running out of stock product!`, status: 400 };
      } else {
        const cart = await Cart.increment("quantity", {where: {id, checkout: 'false'}, returning: true})
        res.status(200).json(cart[0][0][0]);
      }
    } catch (err) {
      next(err);
    }
  }

}

module.exports = CartController;