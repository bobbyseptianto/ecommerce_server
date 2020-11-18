const router = require('express').Router();
const CategoryController = require("../controllers/CategoryController");
const {authenticationAdmin} = require("../middlewares/authentication");
const {authorizationCategory} = require("../middlewares/authorization");

// Authentication
router.use(authenticationAdmin);

router.post("/", authorizationCategory, CategoryController.createCategory);
router.get("/", authorizationCategory, CategoryController.readCategories);
router.delete("/:id", authorizationCategory, CategoryController.deleteCategory);

module.exports = router;