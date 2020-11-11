const router = require('express').Router();
const ProductController = require("../controllers/ProductController");
const {authorizationProduct} = require("../middlewares/authorization");

router.post("/", authorizationProduct, ProductController.createProduct);
router.get("/", authorizationProduct, ProductController.readProducts);
router.get("/:id", authorizationProduct, ProductController.readProductById);
router.put("/:id", authorizationProduct, ProductController.updateProduct);
router.delete("/:id", authorizationProduct, ProductController.deleteProduct);

module.exports = router;