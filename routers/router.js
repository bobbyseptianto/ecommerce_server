const router = require('express').Router();
const routerUser = require("./router-user");
const routerProduct = require("./router-product");
const routerCategory = require("./router-category");
const routerCart = require("./router-cart");
const routerWishlist = require("./router-wishlist");
const ProductController = require("../controllers/ProductController");
const CategoryController = require("../controllers/CategoryController");

// User
router.use("/", routerUser);

// Product and Category for Customer
router.get("/productsCustomer", ProductController.readProducts);
router.get("/categoriesCustomer", CategoryController.readCategories);

// Products
router.use("/products", routerProduct);

// Categories
router.use("/categories", routerCategory);

// Carts
router.use("/carts", routerCart);

// Wishlist
router.use("/wishlist", routerWishlist);

module.exports = router;