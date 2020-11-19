const router = require('express').Router();
const CartController = require("../controllers/CartController");
const {authenticationCustomer} = require("../middlewares/authentication");
const {authorizationCart} = require("../middlewares/authorization");

// Authentication
router.use(authenticationCustomer);

router.post("/", authorizationCart, CartController.addToCart);
router.get("/", authorizationCart, CartController.readCart);
router.get("/:id", authorizationCart, CartController.readCartById);
router.patch("/:id", authorizationCart, CartController.updateCart);
router.put("/:id", authorizationCart, CartController.checkout);
router.patch("/:id/decrementQuantity", authorizationCart, CartController.decrementQuantity);
router.patch("/:id/incrementQuantity", authorizationCart, CartController.incrementQuantity);
router.delete("/:id", authorizationCart, CartController.deleteCart);

module.exports = router;