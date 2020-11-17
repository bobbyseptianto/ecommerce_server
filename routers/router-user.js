const router = require('express').Router();
const UserController = require("../controllers/UserController");

// Admin
router.post("/loginAdmin", UserController.loginAdmin);

// Customer
router.post("/registerCustomer", UserController.registerCustomer);
router.post("/loginCustomer", UserController.loginCustomer);

module.exports = router;