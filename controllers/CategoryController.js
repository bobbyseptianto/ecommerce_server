const { Category } = require("../models/index");

class CategoryController {

  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      const UserId = +req.userLoggedIn.id;
      let categoryObj = {
        name,
        UserId
      };
      const category = await Category.create(categoryObj);
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async readCategories(req, res, next) {
    try {
      const categories = await Category.findAll({ order: [["id", "ASC"]] });
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      let id = +req.params.id;
      const category = await Category.destroy({ where: {id} });
      res.status(200).json({
        msg: `Successfully delete a category!`
      });
    } catch (err) {
      next(err);
    }
  }
  
}

module.exports = CategoryController;