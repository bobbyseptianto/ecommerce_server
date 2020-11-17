const { Wishlist, Product, Category } = require("../models/index");

class WishlistController {

  static async addToWishlist(req, res, next) {
    try {
      const { ProductId } = req.body;
      const UserId = +req.userLoggedIn.id;
      let wishlistObj = {
        ProductId,
        UserId
      };
      const existProductInWishlist = await Wishlist.findOne({where:{ProductId: wishlistObj.ProductId, UserId: wishlistObj.UserId}})
      if (existProductInWishlist) {
        res.status(200).json(existProductInWishlist);
      } else {
        const wishlist = await Wishlist.create(wishlistObj);
        res.status(201).json(wishlist);
      }
    } catch (err) {
      next(err);
    }
  }

  static async readWishlist(req, res, next) {
    try {
      const UserId = +req.userLoggedIn.id;
      const wishlist = await Wishlist.findAll({ where: { UserId } ,order: [["id", "ASC"]], include: {model: Product, include: {model: Category}}});
      res.status(200).json(wishlist);
    } catch (err) {
      next(err);
    }
  }

  static async deleteWishlist(req, res, next) {
    try {
      let id = +req.params.id;
      const deletedWishlist = await Wishlist.destroy({where: {id}});
      res.status(200).json({ msg: `Successfully delete your wishlist product!`});
    } catch (err) {
      next(err);
    }
  }

}

module.exports = WishlistController;