const router = require('express').Router();
const routerUser = require("./router-user");
const routerProduct = require("./router-product");
const routerCategory = require("./router-category");
const routerCart = require("./router-cart");
const routerWishlist = require("./router-wishlist");
const authentication = require("../middlewares/authentication");

// User
router.use("/", routerUser);

// Authentication
router.use(authentication);

// Products
router.use("/products", routerProduct);

// Categories
router.use("/categories", routerCategory);

// Carts
router.use("/carts", routerCart);

// Wishlist
router.use("/wishlist", routerWishlist);

module.exports = router;