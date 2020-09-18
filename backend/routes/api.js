const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../middleware/jwt");
const upload = require("../middleware/fileUpload");
const apiController = require("../controllers/api");

router.post(
  "/create/room",
  jwtMiddleware,
  upload.single("room_image"),
  apiController.createRoom
);
router.post("/add/room", jwtMiddleware, apiController.addToRoom);

module.exports = router;
