const router = require('express').Router();
const routerUser = require("./router-user");
const routerProduct = require("./router-product");
const routerCategory = require("./router-category");
const authentication = require("../middlewares/authentication");

// User
router.use("/", routerUser);

// Authentication
router.use(authentication);

// Product
router.use("/products", routerProduct);

// Categories
router.use("/categories", routerCategory);

module.exports = router;