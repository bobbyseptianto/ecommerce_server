const router = require('express').Router();
const WishlistController = require("../controllers/WishlistController");
const {authenticationCustomer} = require("../middlewares/authentication");
const {authorizationWishlist} = require("../middlewares/authorization");

// Authentication
router.use(authenticationCustomer);

router.post("/", authorizationWishlist, WishlistController.addToWishlist);
router.get("/", authorizationWishlist, WishlistController.readWishlist);
router.delete("/:id", authorizationWishlist, WishlistController.deleteWishlist);

module.exports = router;