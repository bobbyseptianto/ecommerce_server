const { Product, Category } = require("../models/index");

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
        throw { msg: `Not authorized!`, status: 401 };
      }
    } else {
      if (req.userLoggedIn.role === 'admin') {
        next();
      } else {
        throw { msg: `Not authorized!`, status: 401 };
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
        throw { msg: `Not authorized!`, status: 401 };
      }
    } else {
      if (req.userLoggedIn.role === 'admin') {
        next();
      } else {
        throw { msg: `Not authorized!`, status: 401 };
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {authorizationProduct, authorizationCategory};