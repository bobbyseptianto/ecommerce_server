const router = require('express').Router();
const CartController = require("../controllers/CartController");
const {authenticationCustomer} = require("../middlewares/authentication");
const {authorizationCart} = require("../middlewares/authorization");

// Authentication
router.use(authenticationCustomer);

router.post("/", authorizationCart, CartController.addToCart);
router.get("/", authorizationCart, CartController.readCart);
router.get("/:id", authorizationCart, CartController.readCartById);
router.put("/:id", authorizationCart, CartController.updateCart);
router.delete("/:id", authorizationCart, CartController.deleteCart);

module.exports = router;