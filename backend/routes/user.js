const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/signup", userController.signUp);
router.delete("/:userID", userController.delete);
router.post("/login", userController.login);

module.exports = router;
