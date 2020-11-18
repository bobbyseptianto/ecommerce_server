const router = require('express').Router();
const ProductController = require("../controllers/ProductController");
const {authenticationAdmin} = require("../middlewares/authentication");
const {authorizationProduct} = require("../middlewares/authorization");

// Authentication
router.use(authenticationAdmin);

router.post("/", authorizationProduct, ProductController.createProduct);
router.get("/", authorizationProduct, ProductController.readProducts);
router.get("/:id", authorizationProduct, ProductController.readProductById);
router.put("/:id", authorizationProduct, ProductController.updateProduct);
router.delete("/:id", authorizationProduct, ProductController.deleteProduct);

module.exports = router;