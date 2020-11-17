const router = require('express').Router();
const WishlistController = require("../controllers/WishlistController");
const {authorizationWishlist} = require("../middlewares/authorization");

router.post("/", authorizationWishlist, WishlistController.addToWishlist);
router.get("/", authorizationWishlist, WishlistController.readWishlist);
router.delete("/:id", authorizationWishlist, WishlistController.deleteWishlist);

module.exports = router;