const router = require('express').Router();
const CategoryController = require("../controllers/CategoryController");
const {authorizationCategory} = require("../middlewares/authorization");

router.post("/", authorizationCategory, CategoryController.createCategory);
router.get("/", authorizationCategory, CategoryController.readCategories);
router.delete("/:id", authorizationCategory, CategoryController.deleteCategory);

module.exports = router;