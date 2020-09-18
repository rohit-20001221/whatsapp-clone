const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const upload = require("../middleware/fileUpload");

router.post("/signup", upload.single("profile_pic"), userController.signUp);
router.delete("/:userID", userController.delete);
router.post("/login", userController.login);

module.exports = router;
