const router = require('express').Router();
const UserController = require("../controllers/UserController");

router.post("/loginAdmin", UserController.loginAdmin);

module.exports = router;