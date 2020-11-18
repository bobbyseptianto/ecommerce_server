const { Product, Category, Cart, Wishlist } = require("../models/index");

async function authorizationProduct(req, res, next) {
  try {
    let id = +req.params.id;
    if (id) {
      const product = await Product.findByPk(id);
      if (!product) {
        throw { msg: `Error not found!`, status: 404 };
      } else if (product.UserId === req.userLoggedIn.id && req.userLoggedIn.role === 'admin') {
        next();
      } else {
        throw { msg: `Authentication failed!`, status: 401 };
      }
    } else {
      if (req.userLoggedIn.role === 'admin') {
        next();
      } else {
        throw { msg: `Authentication failed!`, status: 401 };
      }
    }
  } catch (err) {
    next(err);
  }
}

async function authorizationCategory(req, res, next) {
  try {
    let id = +req.params.id;
    if (id) {
      const category = await Category.findByPk(id);
      if (!category) {
        throw { msg: `Error not found!`, status: 404 };
      } else if (category.UserId === req.userLoggedIn.id && req.userLoggedIn.role === 'admin') {
        next();
      } else {
        throw { msg: `Authentication failed!`, status: 401 };
      }
    } else {
      if (req.userLoggedIn.role === 'admin') {
        next();
      } else {
        throw { msg: `Authentication failed!`, status: 401 };
      }
    }
  } catch (err) {
    next(err);
  }
}

async function authorizationCart(req, res, next) {
  try {
    let id = +req.params.id;
    if (id) {
      const cart = await Cart.findByPk(id);
      if (!cart) {
        throw { msg: `Error not found!`, status: 404 };
      } else if (cart.UserId === req.userLoggedIn.id && req.userLoggedIn.role === 'customer') {
        next();
      } else {
        throw { msg: `Authentication failed!`, status: 401 };
      }
    } else {
      if (req.userLoggedIn.role === 'customer') {
        next();
      } else {
        throw { msg: `Authentication failed!`, status: 401 };
      }
    }
  } catch (err) {
    next(err);
  }
}

async function authorizationWishlist(req, res, next) {
  console.log('masuk');
  try {
    let id = +req.params.id;
    if (id) {
      const wishlist = await Wishlist.findByPk(id);
      if (!wishlist) {
        throw { msg: `Error not found!`, status: 404 };
      } else if (wishlist.UserId === req.userLoggedIn.id && req.userLoggedIn.role === 'customer') {
        next();
      } else {
        throw { msg: `Authentication failed!`, status: 401 };
      }
    } else {
      if (req.userLoggedIn.role === 'customer') {
        next();
      } else {
        throw { msg: `Authentication failed!`, status: 401 };
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {authorizationProduct, authorizationCategory, authorizationCart, authorizationWishlist};